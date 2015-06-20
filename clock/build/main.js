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
                          // @options.vsync     Boolean  = false  - vsync mode.
                          // @options.wait      Number   = 16.666 - setInterval(tick, wait)
                          // @options.pulse     Number   = 0.0    - overwrite delta time(unit: ms)(range of oscillation time).
                          // @options.spike     Function = null   - generate an irregular pulse(arrhythmia).
                          // @options.start     Boolean  = false  - auto start.
                          // @options.offset    Number   = 0.0    - timeStamp offset.
                          // @options.transform Function = null   - transform timeStamp and deltaTime.
                          // @desc Master Clock.
//{@dev
    if (!global["BENCHMARK"]) {
        $valid($type(ticks, "TickFunctionArray|omit"), Clock, "ticks");
        $valid($type(options, "Object|omit"), Clock, "options");
        $valid($keys(options, "vsync|wait|pulse|spike|start|offset|transform"), Clock, "options");
        if (options) {
            $valid($type(options.vsync,     "Boolean|omit"),  Clock, "options.vsync");
            $valid($type(options.wait,      "Number|omit"),   Clock, "options.wait");
            $valid($type(options.pulse,     "Number|omit"),   Clock, "options.pulse");
            $valid($type(options.spike,     "Function|omit"), Clock, "options.spike");
            $valid($type(options.start,     "Boolean|omit"),  Clock, "options.start");
            $valid($type(options.offset,    "Number|omit"),   Clock, "options.offset");
            $valid($type(options.transform, "Function|omit"), Clock, "options.transform");
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
    this._slaves      = [];                         // ClockInstanceArray. [clock, ...]
    this._exportTicks = _callTicks.bind(this);      // Function - _callTicks.bind(this)

    // --- transform ---
    this._transform = options["transform"] || null; // Function - transform time stamp and elapsed.

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
    "slaves":       { "get":   function()     { return this._slaves; } },
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
    var arg0 = timeStamp;

    if (this._transform) {
        arg0 = this._transform(timeStamp, deltaTime);
    }

    // --- callback tick function ---
    for (var i = 0, iz = this._ticks.length; i < iz; ++i) {
        var tick = this._ticks[i];
        if (tick) {
            tick(arg0, deltaTime);
        } else {
            garbage = true;
        }
    }
    if (garbage) {
        this.ticks = _shrink(this._ticks);
    }

    // --- callback slaves tick function ---
    var iz;
    if (iz = this._slaves.length) {
        var garbage = false;

        for (var i = 0; i < iz; ++i) {
            var slave = this._slaves[i];
            if (slave) {
                _callTicks.call(slave, timeStamp, deltaTime);
            } else {
                garbage = true;
            }
        }
        if (garbage) {
            this._slaves = _shrink(this._slaves);
        }
    }
}

function _shrink(arr) { // @arg Array - ticks or slaves.
                        // @ret Array - dense array.
    var denseArray = [];
    for (var i = 0, iz = arr.length; i < iz; ++i) {
        if (arr[i]) {
            denseArray.push(arr[i]);
        }
    }
    return denseArray;
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
                                  // @desc delegate calling ticks to external clock.
    if (this._master === master) {
        return;
    }
    if (this._master) {
        this["internal"]();
    }

    this["stop"]();

    master._slaves.push(this);
    this._master = master;
}

function Clock_internal() { // @desc release from external clock.
    if (!this._master) {
        return;
    }

    var pos = this._master._slaves.indexOf(this);
    if (pos >= 0) {
        this._master._slaves[pos] = null;
    }
    this._master = null;
}

return Clock; // return entity

});

},{}],2:[function(require,module,exports){
var Clock, ClockView, _constructDOM, _counter, _face, _genTransformProp, _hand, _mode, _span, _transformProp, _update;

Clock = require('../node_modules/uupaa.clock.js/lib/Clock');

_face = _hand = _mode = _counter = _span = null;

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

document.addEventListener('DOMContentLoaded', function() {
  var _, cntStyle, faceStyle, handStyle, i, modeStyle, spanStyle;
  _face = document.createElement('div');
  _hand = document.createElement('div');
  _mode = document.createElement('div');
  _counter = document.createElement('div');
  _span = document.createElement('span');
  faceStyle = _face.style;
  handStyle = _hand.style;
  modeStyle = _mode.style;
  cntStyle = _counter.style;
  spanStyle = _span.style;
  faceStyle.display = handStyle.display = modeStyle.display = cntStyle.display = 'block';
  faceStyle.position = handStyle.position = modeStyle.position = cntStyle.position = 'absolute';
  faceStyle.width = faceStyle.height = handStyle.height = '80px';
  handStyle.width = '5px';
  modeStyle.width = modeStyle.height = modeStyle.lineHeight = '80px';
  modeStyle.fontSize = '50px';
  modeStyle.textAlign = 'center';
  modeStyle.fontFamily = 'sans-serif';
  modeStyle.opacity = '.3';
  modeStyle.zIndex = '100';
  cntStyle.width = spanStyle.width = '140px';
  cntStyle.left = cntStyle.right = '-1000px';
  cntStyle.margin = '0 auto';
  cntStyle.height = '36px';
  cntStyle.bottom = '-44px';
  cntStyle.textAlign = 'center';
  spanStyle.height = spanStyle.lineHeight = '12px';
  spanStyle.fontSize = '10px';
  spanStyle.fontFamily = 'Courier, "Courier New", monospace';
  spanStyle.color = 'black';
  spanStyle.background = 'white';
  spanStyle.display = 'inline-block';
  spanStyle.position = 'relative';
  for (_ = i = 0; i <= 2; _ = ++i) {
    _counter.appendChild(_span.cloneNode());
  }
  _counter.firstChild.style.color = '#f20';
  handStyle.left = handStyle.right = 0;
  handStyle.margin = '0 auto';
  handStyle.zIndex = '200';
  faceStyle.background = 'url(clock_scale.png) no-repeat';
  handStyle.background = 'url(clock_hand.png) no-repeat';
  faceStyle.backgroundSize = '80px 80px';
  handStyle.backgroundSize = '5px 80px';
  faceStyle.cursor = 'pointer';
  _face.appendChild(_hand);
  _face.appendChild(_mode);
  return _face.appendChild(_counter);
});

_constructDOM = function(x, y) {
  var cnt, face;
  face = _face.cloneNode(true);
  cnt = face.lastChild;
  face.style.left = x + 'px';
  face.style.top = y + 'px';
  this.dom = face;
  this._handStyle = face.firstChild.style;
  this._caption = cnt.firstChild;
  this._txt1 = cnt.children[1];
  this._txt2 = cnt.lastChild;
  return this._mode = face.children[1];
};

_update = function(info) {
  var _fps, _sec;
  this._handStyle[_transformProp] = "rotate3d(0,0,1," + (info.totalCoefficient % info.goalFPS * (this._APS / info.goalFPS)) + "deg)";
  _sec = ("00000000" + (this.clock.lastTimeStamp | 0)).slice(-8);
  this._txt1.textContent = 'sec: ' + _sec.slice(0, 5) + '.' + _sec.slice(-3);
  _fps = ("00000000" + (info.FPS * 1000 | 0)).slice(-8);
  return this._txt2.textContent = 'fps: ' + _fps.slice(0, 5) + '.' + _fps.slice(-3);
};

ClockView = (function() {
  function ClockView(APS, x, y, stage, clockOptions, caption) {
    if (_transformProp == null) {
      _transformProp = _genTransformProp();
    }
    this.clock = new Clock([], clockOptions);
    this.stage = stage;
    this.update = _update.bind(this);
    this._APS = APS;
    _constructDOM.call(this, x, y);
    this._caption.textContent = caption;
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


},{"../node_modules/uupaa.clock.js/lib/Clock":1}],3:[function(require,module,exports){
var ClockView, TimeInfo;

ClockView = require('./clock-view');

TimeInfo = require('./time-info');

document.addEventListener('DOMContentLoaded', function() {
  var $internal, _date, _now, aps, c, captions, clocks, fps, handler, i, j, k, len, len1, m_c, opt, options, results, s_c, spike, stage, t0, t1, t2, t3, t4, t5;
  stage = document.querySelector('#stage');
  aps = 360;
  fps = 180;
  spike = function(ts, pulse, cnt) {
    if (cnt % 10 === 0) {
      return pulse * 2;
    } else {
      return pulse;
    }
  };
  options = [
    {
      transform: (t0 = new TimeInfo(fps)).getInfo.bind(t0)
    }, {
      vsync: true,
      transform: (t1 = new TimeInfo(fps)).getInfo.bind(t1)
    }, {
      wait: 100,
      transform: (t2 = new TimeInfo(fps)).getInfo.bind(t2)
    }, {
      vsync: true,
      pulse: 4,
      transform: (t3 = new TimeInfo(fps)).getInfo.bind(t3)
    }, {
      wait: 100,
      pulse: 20,
      spike: spike,
      transform: (t4 = new TimeInfo(fps)).getInfo.bind(t4)
    }, {
      wait: 4,
      transform: (t5 = new TimeInfo(fps)).getInfo.bind(t5)
    }
  ];
  captions = ['no options', 'vsync', 'wait=100', 'vsync,pulse=4', 'wait=100,pulse=20,spike', 'wait=4'];
  _date = typeof performance !== "undefined" && performance !== null ? performance : Date;
  _now = _date.now();
  t0.getInfo(_now);
  t1.getInfo(_now);
  t2.getInfo(_now);
  t3.getInfo(_now);
  t4.getInfo(_now);
  t5.getInfo(_now);
  clocks = [];
  m_c = '#f20';
  s_c = '#3d4';
  for (i = j = 0, len = options.length; j < len; i = ++j) {
    opt = options[i];
    c = new ClockView(aps, 35 + i * 150 % 300, 35 + (i / 2 | 0) * 150, stage, opt, captions[i]);
    handler = function() {
      var k, len1, ref, slave;
      this.clock.internal();
      this._mode.textContent = 'M';
      this._mode.style.color = m_c;
      ref = clocks.filter((function(_this) {
        return function(c) {
          return c !== _this;
        };
      })(this));
      for (i = k = 0, len1 = ref.length; k < len1; i = ++k) {
        slave = ref[i];
        slave.clock.external(this.clock);
        slave._mode.textContent = 'S';
        slave._mode.style.color = s_c;
      }
      return this.clock.start();
    };
    c.dom.addEventListener('click', handler.bind(c));
    clocks.push(c);
  }
  $internal = document.querySelector('#internal');
  $internal.addEventListener('click', function() {
    var k, len1, results;
    results = [];
    for (k = 0, len1 = clocks.length; k < len1; k++) {
      c = clocks[k];
      c.clock.internal();
      c.clock.start();
      results.push(c._mode.textContent = '');
    }
    return results;
  });
  results = [];
  for (k = 0, len1 = clocks.length; k < len1; k++) {
    c = clocks[k];
    results.push(c.start());
  }
  return results;
});


},{"./clock-view":2,"./time-info":4}],4:[function(require,module,exports){

/**
* 安定したFPSを擬似的に表現するための時間に関する情報を提供するクラス<br>
* フレーム度に、前フレームからの経過時間を計測し実現したいFPSとの誤差を計算する
* @class TimeInfo
* @constructor
* `TimeInfo`のインスタンスを生成する
* @param {Number} goalFPS
 */
var TimeInfo;

TimeInfo = (function() {
  function TimeInfo(goalFPS) {
    this.goalFPS = goalFPS;
    this.oldTime = 0;
    this.paused = true;
    this.innerCount = 0;
    this.totalFPS = 0;
    this.totalCoefficient = 0;
  }


  /** @method getInfo */

  TimeInfo.prototype.getInfo = function(ts) {
    var FPS, coefficient, elapsed, newTime;
    if (this.paused === true) {
      this.paused = false;
      this.oldTime = ts || performance.now();
      return {
        elapsed: 0,
        coefficient: 0,
        FPS: 0,
        averageFPS: 0,
        averageCoefficient: 0
      };
    }
    newTime = ts || performance.now();
    elapsed = newTime - this.oldTime;
    this.oldTime = newTime;
    FPS = 1000 / elapsed;
    this.innerCount++;
    this.totalFPS += FPS;
    coefficient = this.goalFPS / FPS;
    this.totalCoefficient += coefficient;
    return {
      goalFPS: this.goalFPS,
      elapsed: elapsed,
      coefficient: coefficient,
      totalCoefficient: this.totalCoefficient,
      FPS: FPS,
      averageFPS: this.totalFPS / this.innerCount,
      averageCoefficient: this.totalCoefficient / this.innerCount
    };
  };


  /** @method pause */

  TimeInfo.prototype.pause = function() {
    return this.paused = true;
  };

  return TimeInfo;

})();

module.exports = TimeInfo;


},{}]},{},[3]);
