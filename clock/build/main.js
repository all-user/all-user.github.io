(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
(function moduleExporter(name, closure) {
"use strict";

var entity = GLOBAL["WebModule"]["exports"](name, closure);

if (typeof module !== "undefined") {
    module["exports"] = entity;
}
return entity;

})("Clock", function moduleClosure(global) {
"use strict";

/*
| API                         | iOS      | Chrome | IE  | Android |
|-----------------------------|----------|--------|-----|---------|
| webkitRequestAnimationFrame | 6.0+     | YES    | 10+ | 4.4+    |
| requestAnimationFrame       | 7.0+     | YES    | 10+ | 4.4+    |
| performance.now()           | 8.0 only | YES    | 10+ | 4.4+    |
 */

/*
var clock = new Clock([tick], { vsync: true, start: true });

function tick(timeStamp,   // @arg Number - current time
              deltaTime) { // @arg Number - delta time
    update();
}
 */

// --- dependency modules ----------------------------------
// --- define / local variables ----------------------------
var RAF   = global["requestAnimationFrame"] ||
            global["webkitRequestAnimationFrame"] ||
            function(fn) { return setTimeout(fn, 1000 / 60, 0); };
var RAF_X = global["cancelAnimationFrame"]  ||
            global["webkitCancelAnimationFrame"] ||
            function(id) { clearTimeout(id); };

// --- class / interfaces ----------------------------------
function Clock(ticks,     // @arg TickFunctionArray = [] - [tick, ...]
               options) { // @arg Object = {} - { vsync, wait, pulse, spike, start, offset }
                          // @options.vsync  Boolean  = false  - vsync mode.
                          // @options.wait   Number   = 16.666 - setInterval(tick, wait)
                          // @options.pulse  Number   = 0.0    - overwrite delta time(unit: ms)(range of oscillation time).
                          // @options.spike  Function = null   - generate an irregular pulse(arrhythmia).
                          // @options.start  Boolean  = false  - auto start.
                          // @options.offset Number   = 0.0    - timeStamp offset.
                          // @desc Master Clock.
//{@dev
    if (!global["BENCHMARK"]) {
        $valid($type(ticks, "TickFunctionArray|omit"), Clock, "ticks");
        $valid($type(options, "Object|omit"), Clock, "options");
        $valid($keys(options, "vsync|wait|pulse|spike|start|offset"), Clock, "options");
        if (options) {
            $valid($type(options.vsync,  "Boolean|omit"),  Clock, "options.vsync");
            $valid($type(options.wait,   "Number|omit"),   Clock, "options.wait");
            $valid($type(options.pulse,  "Number|omit"),   Clock, "options.pulse");
            $valid($type(options.spike,  "Function|omit"), Clock, "options.spike");
            $valid($type(options.start,  "Boolean|omit"),  Clock, "options.start");
            $valid($type(options.offset, "Number|omit"),   Clock, "options.offset");
        }
    }
//}@dev

    options = options || {};

    this._ticks    = [];                            // TickFunctionArray. [tick, ...]
    this._vsync    = options["vsync"] || false;     // Boolean  - vsync mode
    this._wait     = options["wait"]  || 1000 / 60; // Number   - setInterval(tick, wait)
    this._pulse    = options["pulse"] || 0.0;       // Number   - overwrite delta time(range of oscillation time).
    this._spike    = options["spike"] || null;      // Function - generate an irregular pulse(arrhythmia).
    this._active   = false;                         // Boolean  - active state.
    this._counter  = 0;                             // Integer  - pulse generate counter.
    this._timerID  = 0;                             // Integer  - timer id.
    this._baseTime = 0;                             // Number   - offset from zero.
    this._timeOffset = options["offset"] || 0.0;    // Number   - timeStamp offset.
    this._enterFrame = _enterFrame.bind(this);      // Function - _enterFrame.bind(this)
    this._lastTimeStamp = 0;                        // Number   - last time stamp.

    // --- slave mode ---
    this._master      = null;                       // Clock    - external master clock.
    this._exportTicks = _callTicks.bind(this);      // Function - _callTicks.bind(this)

    // --- get base time ---
    if (this._vsync) {
        RAF((function(timeStamp) { this._baseTime = timeStamp || Date.now(); }).bind(this));
    } else {
        this._baseTime = Date.now();
    }

    // --- init ---
    (ticks || []).forEach(Clock_on, this);

    if (options["start"]) {
        this["start"]();
    }
}

Clock["repository"] = "https://github.com/uupaa/Clock.js"; // GitHub repository URL.
Clock["prototype"] = Object.create(Clock, {
    "constructor":  { "value": Clock       }, // new Clock(options:Object = {}):Clock
    "active":       { "get":   function()  { return this._active; } },
    "start":        { "value": Clock_start }, // Clock#start():this
    "stop":         { "value": Clock_stop  }, // Clock#stop():this
    // --- register / unregister tick functions ---
    "on":           { "value": Clock_on    }, // Clock#on(tick:Function):void
    "off":          { "value": Clock_off   }, // Clock#off(tick:Function):void
    "has":          { "value": function(v) { return this._ticks.indexOf(v) >= 0; } },
    "clear":        { "value": Clock_clear }, // Clock#clear():void
    // --- utility ---
    "now":          { "value": function()  { return Date.now() - this._baseTime; } },
    "lastTimeStamp":{ "get":   function()  { return this._lastTimeStamp + this._timeOffset; } },
    "ticks":        { "get":   function()  { return this._ticks; } },
    // --- slave mode ---
    "master":       { "get":   function()     { return this._master; } },
    "external":     { "value": Clock_external }, // Clock#external(master:Clock):void
    "internal":     { "value": Clock_internal }, // Clock#internal():void
});

// --- implements ------------------------------------------
function _enterFrame(highResTimeStamp) { // @arg DOMHighResTimeStamp|undefined - requestAnimationFrame give us timeStamp.
                                         // @bind this
    if (!this._active) {
        return;
    }
    if (this._vsync) {
        this._timerID = RAF(this._enterFrame);
    }
    if (!this._ticks.length) {
        return;
    }

    // setInterval or setTimeout does not give us the highResTimeStamp.
    var timeStamp = (highResTimeStamp || Date.now()) - this._baseTime; // current time stamp.
    var deltaTime = 0;     // elapsed time since the last frame.

    if (this._pulse) {
        var pulse = this._pulse;

        if (this._spike) {
            pulse = this._spike(timeStamp, pulse, this._counter);
        }
        // --- adjust timeStamp and deltaTime ---
        if (this._counter++) {
            timeStamp = pulse + this._lastTimeStamp;
        }
        deltaTime = pulse;
    } else {
        deltaTime = timeStamp - this._lastTimeStamp;
    }

    this._lastTimeStamp = timeStamp; // update lastTimeStamp

    timeStamp += this._timeOffset;

    _callTicks.call(this, timeStamp, deltaTime);
}


function _callTicks(timeStamp, deltaTime) { // @bind this
    var garbage = false; // functions that are no longer needed.

    // --- callback tick function ---
    for (var i = 0, iz = this._ticks.length; i < iz; ++i) {
        var tick = this._ticks[i];
        if (tick) {
            tick(timeStamp, deltaTime);
        } else {
            garbage = true;
        }
    }
    if (garbage) {
        _shrink.call(this);
    }
}

function _shrink() { // @bind this
    var denseArray = [];
    for (var i = 0, iz = this._ticks.length; i < iz; ++i) {
        if (this._ticks[i]) {
            denseArray.push(this._ticks[i]);
        }
    }
    this._ticks = denseArray; // overwrite
}

function Clock_start() {
    if (!this._active) {
        this._active = true;
        this._timerID = this._vsync ? RAF(this._enterFrame)
                                    : setInterval(this._enterFrame, this._wait, 0);
    }
}

function Clock_stop() {
    if (this._active) {
        this._active = false;
        if (this._vsync) {
            RAF_X(this._timerID);
        } else {
            clearInterval(this._timerID);
        }
        this._timerID = 0;
    }
}

function Clock_on(tick) { // @arg Function - tick(timeStamp:Number, deltaTime:Number):void
                          // @desc register callback.
    if ( !this["has"](tick) ) { // ignore already registered function.
        this._ticks.push(tick);
    }
}

function Clock_off(tick) { // @arg Function - registered tick function.
                           // @desc unregister callback.
    var pos = this._ticks.indexOf(tick);
    if (pos >= 0) {
        this._ticks[pos] = null;
    }
}

function Clock_clear() { // @desc clear all ticks.
    for (var i = 0, iz = this._ticks.length; i < iz; ++i) {
        this._ticks[i] = null;
    }
}

function Clock_external(master) { // @arg Clock
    if (this._master === master) {
        return;
    }
    if (this._master) {
        this["internal"]();
    }

    this["stop"]();

    this._master = master;
    this._master["on"](this._exportTicks);
}

function Clock_internal() { // @desc release from external clock.
    if (!this._master) {
        return;
    }

    this._master["off"](this._exportTicks);
    this._master = null;
}

return Clock; // return entity

});


},{}],2:[function(require,module,exports){
var Clock, ClockView, _constructDOM, _genTransformProp, _transformProp, _update;

Clock = require('../../Clock.js/lib/Clock');

_transformProp = null;

_genTransformProp = function() {
  var b, p, r, ref, ref1, ref2, ref3;
  b = document.body.style;
  r = 'ransform';
  p = null;
    if ((ref = (ref1 = (ref2 = (ref3 = b[p = 't' + r]) != null ? ref3 : b[p = 'webkitT' + r]) != null ? ref2 : b[p = 'mozT' + r]) != null ? ref1 : b[p = 'msT' + r]) != null) {
    ref;
  } else {
    b[p = 'oT' + r];
  };
  return p;
};

_constructDOM = function(x, y) {
  var face, faceStyle, hand, handStyle;
  face = document.createElement('div');
  hand = document.createElement('div');
  faceStyle = face.style;
  handStyle = hand.style;
  faceStyle.display = handStyle.display = 'block';
  faceStyle.position = handStyle.position = 'absolute';
  faceStyle.width = faceStyle.height = handStyle.height = '80px';
  handStyle.width = '5px';
  faceStyle.left = x + 'px';
  faceStyle.top = y + 'px';
  handStyle.left = handStyle.right = 0;
  handStyle.margin = '0 auto';
  faceStyle.background = 'url(clock_scale.png) no-repeat';
  handStyle.background = 'url(clock_hand.png) no-repeat';
  faceStyle.backgroundSize = '80px 80px';
  handStyle.backgroundSize = '5px 80px';
  face.appendChild(hand);
  this.dom = face;
  return this._handStyle = handStyle;
};

_update = function() {
  this._angle = (this._angle + 2) % 360;
  return this._handStyle[_transformProp] = "rotate3d(0,0,1," + this._angle + "deg)";
};

ClockView = (function() {
  function ClockView(x, y, stage, clockOptions) {
    if (_transformProp == null) {
      _transformProp = _genTransformProp();
    }
    this.clock = new Clock([], clockOptions);
    this.stage = stage;
    this.update = _update.bind(this);
    this._angle = 0;
    _constructDOM.call(this, x, y);
    this.stage.appendChild(this.dom);
  }

  ClockView.prototype.start = function() {
    this.clock.on(this.update);
    return this.clock.start();
  };

  ClockView.prototype.stop = function() {
    this.clock.off(this.update);
    return this.clock.stop();
  };

  return ClockView;

})();

module.exports = ClockView;


},{"../../Clock.js/lib/Clock":1}],3:[function(require,module,exports){
var ClockView;

ClockView = require('./clock-view');

document.addEventListener('DOMContentLoaded', function() {
  var c, clocks, handler, i, j, k, len, len1, opt, options, results, stage;
  stage = document.querySelector('#stage');
  options = [
    {}, {
      vsync: true
    }, {
      wait: 100,
      pulse: 20
    }, {
      vsync: true,
      wait: 100,
      pulse: 20
    }
  ];
  clocks = [];
  for (i = j = 0, len = options.length; j < len; i = ++j) {
    opt = options[i];
    c = new ClockView(35 + i * 150 % 300, 35 + (i / 2 | 0) * 150, stage, opt);
    handler = function() {
      var k, len1, ref, slave;
      this.clock.internal();
      ref = clocks.filter((function(_this) {
        return function(c) {
          return c !== _this;
        };
      })(this));
      for (i = k = 0, len1 = ref.length; k < len1; i = ++k) {
        slave = ref[i];
        slave.clock.external(this.clock);
      }
      return this.clock.start();
    };
    c.dom.addEventListener('click', handler.bind(c));
    clocks.push(c);
  }
  results = [];
  for (k = 0, len1 = clocks.length; k < len1; k++) {
    c = clocks[k];
    results.push(c.start());
  }
  return results;
});


},{"./clock-view":2}]},{},[3]);
