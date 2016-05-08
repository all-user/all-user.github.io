require=(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var extend = require('xtend');

var _PATTERN_NAME_PROP = Symbol();
var _PATTERN_PROP = Symbol();
var _CHAR_PROP = Symbol();
var _DOM_PROP = Symbol();
var _DISPLAY_TIME_PROP = Symbol();
var _DURATION_PROP = Symbol();
var _EASING_PROP = Symbol();
var _IS_ANIMATING_PROP = Symbol();
var _RESUME_PROP = Symbol();
var _LOOP_PROP = Symbol();
var _RANDOM_PROP = Symbol();
var _PEDAL_PROP = Symbol();
var _CANSELLER_PROP = Symbol();

var patterns = {}; // initialized in OKBlock.define

var OKBlock = function () {
  function OKBlock(c) {
    var options = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

    _classCallCheck(this, OKBlock);

    if (options.pattern == null) {
      console.error('options.pattern is not set.');
    }
    if (patterns[options.pattern] == null) {
      console.error(options.pattern + ' pattern is undefined.');return;
    }

    this[_PATTERN_NAME_PROP] = options.pattern;
    this[_PATTERN_PROP] = patterns[options.pattern];
    this[_IS_ANIMATING_PROP] = false;
    this[_RESUME_PROP] = null;
    this[_CHAR_PROP] = null;
    this[_DOM_PROP] = _createDom.call(this);
    this[_CANSELLER_PROP] = function () {};

    options = extend(this[_PATTERN_PROP]._DEFAULT_OPTIONS, options);
    var _options = options;
    var size = _options.size;
    var displayTime = _options.displayTime;
    var duration = _options.duration;
    var easing = _options.easing;
    var loop = _options.loop;
    var random = _options.random;
    var pedal = _options.pedal;

    // --- options ---

    this.displayTime = +displayTime;
    this.duration = +duration;
    this.loop = loop;
    this.random = random;
    this.easing = easing || 'cubic-bezier(.26,.92,.41,.98)';
    this.pedal = pedal;

    if (typeof size === 'number' && size >= 0) {
      this.size = size;
    } else {
      this.size = 100;
    }

    this.to(c);
  }

  _createClass(OKBlock, [{
    key: 'to',
    value: function to(c) {
      var _c = c && c.toLowerCase && c.toLowerCase();
      if (!this[_PATTERN_PROP]._formationTable[_c]) {
        return false;
      }
      if (this[_CHAR_PROP] === _c) {
        return false;
      }
      _changeStyle.call(this, _c);
      this[_CHAR_PROP] = _c;
      return true;
    }
  }, {
    key: 'appendTo',
    value: function appendTo(parent) {
      parent.appendChild(this[_DOM_PROP]);
    }
  }, {
    key: 'stopAnimate',
    value: function stopAnimate() {
      this[_IS_ANIMATING_PROP] = false;
    }
  }, {
    key: 'resumeAnimate',
    value: function resumeAnimate() {
      this[_IS_ANIMATING_PROP] = true;
      this[_RESUME_PROP]();
    }
  }, {
    key: 'animateFromString',
    value: function animateFromString(str, opt) {
      var _this = this;

      this[_IS_ANIMATING_PROP] = true;
      this[_RESUME_PROP] = null;
      this.options = opt;

      [].concat(_toConsumableArray(str)).reduce(function (p, c, idx) {
        // p = Promise.resolve(); c = str[idx];
        var isLast = idx === str.length - 1;
        return p.then(function () {
          return new Promise(function (resolve, reject) {
            _this[_CANSELLER_PROP] = reject;
            if (_this[_RANDOM_PROP]) {
              var _c = str[Math.random() * str.length | 0];
              _this.to(_c);
            } else {
              _this.to(c);
            }
            if (isLast) {
              if (_this[_LOOP_PROP]) {
                setTimeout(function () {
                  resolve();
                  _this.animateFromString.call(_this, str);
                }, _this[_DISPLAY_TIME_PROP]);
              } else {
                setTimeout(reject, _this[_DISPLAY_TIME_PROP]);
              }
              return;
            }
            if (!_this[_IS_ANIMATING_PROP]) {
              _this[_RESUME_PROP] = resolve;
            } else {
              setTimeout(resolve, _this[_DISPLAY_TIME_PROP]);
            }
          });
        });
      }, Promise.resolve()).catch(function (err) {
        _this[_IS_ANIMATING_PROP] = false;
        console.log('OKBlock: cansel before animation.');
        console.log(err);
      });
    }

    /**
     * Setter and Getter
     */

    // --- options ---

  }, {
    key: 'options',
    set: function set() {
      var options = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

      Object.assign(this, options);
    },
    get: function get() {
      var size = this.size;
      var displayTime = this.displayTime;
      var duration = this.duration;
      var easing = this.easing;
      var loop = this.loop;
      var random = this.random;
      var pedal = this.pedal;

      return { size: size, displayTime: displayTime, duration: duration, easing: easing, loop: loop, random: random, pedal: pedal };
    }

    // --- size ---

  }, {
    key: 'size',
    set: function set(size) {
      if (size == null) {
        return;
      }
      if (typeof size === 'number' && size >= 0) {
        var domStyle = this[_DOM_PROP].style;
        domStyle.width = size + 'px';
        domStyle.height = size + 'px';
      } else {
        console.error('OKBlock.size should zero or positive number.');
      }
    },
    get: function get() {
      return +this[_DOM_PROP].style.width.replace('px', '');
    }

    // --- displayTime ---

  }, {
    key: 'displayTime',
    set: function set(time) {
      if (time == null) {
        return;
      }
      if (typeof time === 'number' && time > 0) {
        this[_DISPLAY_TIME_PROP] = time;
      } else {
        console.error('OKBlock.displayTime should be positive number.');
      }
    },
    get: function get() {
      return this[_DISPLAY_TIME_PROP];
    }

    // --- duration ---

  }, {
    key: 'duration',
    set: function set(time) {
      if (time == null) {
        return;
      }
      if (typeof time === 'number' && time >= 0) {
        this[_DURATION_PROP] = time;
        _updateTransitionConfig.call(this);
      } else {
        console.error('OKBlock.duration should be zero or positive number.', time);
      }
    },
    get: function get() {
      return this[_DURATION_PROP];
    }

    // --- easing ---

  }, {
    key: 'easing',
    set: function set(val) {
      if (val == null) {
        return;
      }
      this[_EASING_PROP] = val;
      _updateTransitionConfig.call(this);
    },
    get: function get() {
      return this[_EASING_PROP];
    }

    // --- loop ---

  }, {
    key: 'loop',
    set: function set(bool) {
      if (bool == null) {
        return;
      }
      this[_LOOP_PROP] = bool;
    },
    get: function get() {
      return this[_LOOP_PROP];
    }

    // --- random ---

  }, {
    key: 'random',
    set: function set(bool) {
      if (bool == null) {
        return;
      }
      this[_RANDOM_PROP] = bool;
    },
    get: function get() {
      return this[_RANDOM_PROP];
    }

    // --- pedal ---

  }, {
    key: 'pedal',
    set: function set(bool) {
      if (bool == null) {
        return;
      }
      this[_PEDAL_PROP] = bool;
    },
    get: function get() {
      return this[_PEDAL_PROP];
    }

    // --- pattern ---

  }, {
    key: 'pattern',
    get: function get() {
      return this[_PATTERN_NAME_PROP];
    }

    // --- dom ---

  }, {
    key: 'dom',
    get: function get() {
      return this[_DOM_PROP];
    }

    // --- char ---

  }, {
    key: 'char',
    get: function get() {
      return this[_CHAR_PROP];
    }

    // --- isAnimating ---

  }, {
    key: 'isAnimating',
    get: function get() {
      return this[_IS_ANIMATING_PROP];
    }

    // --- allValidChars ---

  }, {
    key: 'allValidChars',
    get: function get() {
      return Object.keys(this[_PATTERN_PROP]._formationTable);
    }
  }], [{
    key: 'define',
    value: function define(name, obj) {
      if (!('_DEFAULT_OPTIONS' in obj) || !('_BASE_DOM' in obj) || !('_TRANSITION_PROPS' in obj) || !('_formationTable' in obj)) {
        console.error('Pattern is invalid.');
      }
      patterns[name] = obj;
    }
  }]);

  return OKBlock;
}();

function _createDom() {
  return this[_PATTERN_PROP]._BASE_DOM.cloneNode(true);
}

function _changeStyle(c) {
  // @bind this
  var oldC = this[_CHAR_PROP];
  var oldFormation = this[_PATTERN_PROP]._formationTable[oldC];
  var newFormation = this[_PATTERN_PROP]._formationTable[c];
  if (!newFormation) {
    return;
  }
  var diffFormation = void 0;
  if (oldC) {
    diffFormation = newFormation.map(function (newStr, idx) {
      var oldStr = oldFormation[idx];
      var newStrIsArr = Array.isArray(newStr);
      var oldStrIsArr = Array.isArray(oldStr);
      if (newStrIsArr && oldStrIsArr) {
        var strIsNotEq = newStr[0] !== oldStr[0];
        var posIsNotEq = newStr[1] !== oldStr[1];
        return strIsNotEq || posIsNotEq ? newStr : false;
      } else {
        if (newStrIsArr || oldStrIsArr) {
          return newStr;
        }
        return newStr !== oldStr ? newStr : false;
      }
    });
  } else {
    diffFormation = newFormation;
  }
  [].concat(_toConsumableArray(this[_DOM_PROP].childNodes)).forEach(function (node, idx) {
    var formation = diffFormation[idx];
    var specifyPos = Array.isArray(formation);
    if (!formation) {
      return;
    }
    var pos = void 0;
    if (specifyPos) {
      pos = formation[1];
    } else {
      pos = 'pos_' + idx % 3 + '_' + (idx / 3 | 0);
    }
    node.className = (specifyPos ? formation[0] : formation) + ' ' + pos;
    if (node.classList.contains('rotate-default')) {
      return;
    }
    node.classList.add(_ROTATE_TABLE[Math.random() * 4 | 0]);
  });
}

function _updateTransitionConfig() {
  var _this2 = this;

  // @bind this
  var val = this[_PATTERN_PROP]._TRANSITION_PROPS.reduce(function (str, prop, idx) {
    return '' + str + (idx ? ',' : '') + ' ' + prop + ' ' + _this2[_DURATION_PROP] + 'ms ' + _this2[_EASING_PROP];
  }, '');

  _updateStyle(this[_DOM_PROP].childNodes);

  function _updateStyle(list) {
    [].concat(_toConsumableArray(list)).forEach(function (node) {
      node.style.transition = val;
      if (node.firstChild) {
        _updateStyle(node.childNodes);
      }
    });
  }
}

var _ROTATE_TABLE = ['rotate0', 'rotate90', 'rotate180', 'rotate270'];

module.exports = OKBlock;
},{"xtend":6}],2:[function(require,module,exports){
'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var OKBlock = require('./OKBlock.js');

var _EMBLEMS_PROP = Symbol();
var _DISPLAY_TIME_PROP = Symbol();
var _IS_ANIMATING_PROP = Symbol();
var _RESUME_PROP = Symbol();
var _LOOP_PROP = Symbol();
var _RANDOM_PROP = Symbol();
var _CANSELLER_PROP = Symbol();

var OKBlocksGroup = function () {
  function OKBlocksGroup(chars) {
    var options = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

    _classCallCheck(this, OKBlocksGroup);

    var length = options.length;
    var displayTime = options.displayTime;
    var _options$loop = options.loop;
    var loop = _options$loop === undefined ? false : _options$loop;
    var _options$random = options.random;
    var random = _options$random === undefined ? false : _options$random;

    this[_IS_ANIMATING_PROP] = false;
    this[_RESUME_PROP] = null;
    this[_CANSELLER_PROP] = function () {};

    // --- options ---
    this.displayTime = displayTime | 0 || 1500;
    this.loop = loop;
    this.random = random;

    if (typeof chars === 'string') {
      if (typeof length !== 'number' || chars.length < length) {
        for (var i = chars.length; i < length; i++) {
          chars += ' ';
        }
      } else if (length != null && chars.length > length) {
        chars = chars.slice(0, length);
      }
    } else {
      console.error('OKBlocksGroup constructor first argument should be string.');
    }

    delete options.loop;
    delete options.displayTime;
    delete options.random;

    var emblems = _transformToOKBlockArray(chars, options);

    if (emblems) {
      this[_EMBLEMS_PROP] = emblems;
    } else {
      throw new Error('OKBlocksGroup arguments expect string or array of OKBlock.');
    }
  }

  _createClass(OKBlocksGroup, [{
    key: 'toString',
    value: function toString() {
      return this.emblems.map(function (e) {
        return e.char;
      }).join('');
    }
  }, {
    key: 'map',
    value: function map(str) {
      this.emblems.forEach(function (emblem, idx) {
        var c = str[idx];
        if (!c) {
          c = ' ';
        }
        emblem.to(c);
      });
    }
  }, {
    key: 'appendTo',
    value: function appendTo(parent) {
      var frag = this.emblems.reduce(function (f, e) {
        f.appendChild(e.dom);
        return f;
      }, document.createDocumentFragment());
      parent.appendChild(frag);
    }
  }, {
    key: 'stopAnimate',
    value: function stopAnimate() {
      this[_IS_ANIMATING_PROP] = false;
    }
  }, {
    key: 'resumeAnimate',
    value: function resumeAnimate() {
      this[_IS_ANIMATING_PROP] = true;
      this[_RESUME_PROP]();
    }
  }, {
    key: 'animateFromString',
    value: function animateFromString(str, opt) {
      var _this = this;

      var strArr = void 0;
      if (typeof str === 'string') {
        (function () {
          var len = _this.emblems.length;
          strArr = [].concat(_toConsumableArray(str)).reduce(function (arr, s, idx) {
            if (idx % len === 0) {
              arr.push('');
            }
            arr[idx / len | 0] += s;
            return arr;
          }, []);
        })();
      } else if (Array.isArray(str) && str.every(function (s) {
        return typeof s === 'string';
      })) {
        strArr = str;
      } else {
        console.error('OKBlocksGroup#animateFromString first argument should be string or array of string.');
      }

      _animateFromStringArray.call(this, strArr, opt);
    }
  }, {
    key: 'animateFromStringArray',
    value: function animateFromStringArray(strArr, opt) {
      _animateFromStringArray.call(this, strArr, opt);
    }

    /*
     * Setter and Getter
     */

    // --- options ---

  }, {
    key: 'options',
    set: function set() {
      var options = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

      Object.assign(this, options);
    },
    get: function get() {
      var length = this.length;
      var displayTime = this.displayTime;
      var loop = this.loop;
      var random = this.random;
      var size = this.size;
      var duration = this.duration;
      var easing = this.easing;
      var pedal = this.pedal;

      return { length: length, displayTime: displayTime, loop: loop, random: random, size: size, duration: duration, easing: easing, pedal: pedal };
    }

    // --- length ---

  }, {
    key: 'length',
    set: function set(lenNew) {
      if (lenNew == null) {
        return;
      }
      var emblems = this[_EMBLEMS_PROP];
      var lenOld = emblems.length;

      if (lenNew > lenOld) {
        var blankArr = Array.from({ length: lenNew - lenOld }, function () {
          return new OKBlock(' ', { pattern: emblems.slice(-1)[0].pattern });
        });
        this[_EMBLEMS_PROP] = emblems.concat(blankArr);
      } else if (lenNew < lenOld) {
        this[_EMBLEMS_PROP] = emblems.slice(0, lenNew);
      }
    },
    get: function get() {
      return this[_EMBLEMS_PROP].length;
    }

    // --- displayTime ---

  }, {
    key: 'displayTime',
    set: function set(time) {
      if (time == null) {
        return;
      }
      if (typeof time === 'number' && time > 0) {
        this[_DISPLAY_TIME_PROP] = time;
      } else {
        console.error('OKBlocksGroup.displayTime should be positive number.');
      }
    },
    get: function get() {
      return this[_DISPLAY_TIME_PROP];
    }

    // --- loop ---

  }, {
    key: 'loop',
    set: function set(bool) {
      if (bool == null) {
        return;
      }
      this[_LOOP_PROP] = bool;
    },
    get: function get() {
      return this[_LOOP_PROP];
    }

    // --- random ---

  }, {
    key: 'random',
    set: function set(bool) {
      if (bool == null) {
        return;
      }
      this[_RANDOM_PROP] = bool;
    },
    get: function get() {
      return this[_RANDOM_PROP];
    }

    // --- size ---

  }, {
    key: 'size',
    set: function set(size) {
      this[_EMBLEMS_PROP].forEach(function (emb) {
        return emb.size = size;
      });
    },
    get: function get() {
      return this[_EMBLEMS_PROP].map(function (emb) {
        return emb.size;
      });
    }

    // --- duration ---

  }, {
    key: 'duration',
    set: function set(time) {
      this[_EMBLEMS_PROP].forEach(function (emb) {
        return emb.duration = time;
      });
    },
    get: function get() {
      return this[_EMBLEMS_PROP].map(function (emb) {
        return emb.duration;
      });
    }

    // --- easing ---

  }, {
    key: 'easing',
    set: function set(val) {
      this[_EMBLEMS_PROP].forEach(function (emb) {
        return emb.easing = val;
      });
    },
    get: function get() {
      return this[_EMBLEMS_PROP].map(function (emb) {
        return emb.easing;
      });
    }

    // --- pedal ---

  }, {
    key: 'pedal',
    set: function set(val) {
      this[_EMBLEMS_PROP].forEach(function (emb) {
        return emb.pedal = val;
      });
    },
    get: function get() {
      return this[_EMBLEMS_PROP].map(function (emb) {
        return emb.pedal;
      });
    }

    // --- emblems ---

  }, {
    key: 'emblems',
    get: function get() {
      return this[_EMBLEMS_PROP];
    }

    // --- isAnimating ---

  }, {
    key: 'isAnimating',
    get: function get() {
      return this[_IS_ANIMATING_PROP];
    }
  }]);

  return OKBlocksGroup;
}();

function _transformToOKBlockArray(arg, opt) {
  // (string | [OKBlock], object) => [OKBlock] | false

  var res = void 0;
  switch (typeof arg === 'undefined' ? 'undefined' : _typeof(arg)) {
    case 'string':
      res = [].concat(_toConsumableArray(arg)).map(function (c) {
        return new OKBlock(c, opt);
      });
      break;
    case 'object':
      if (Array.isArray(arg) && arg.every(function (o) {
        return o instanceof OKBlock;
      })) {
        res = arg;
      } else {
        res = false;
      }
      break;
    default:
      res = false;
  }

  return res;
}

function _animateFromStringArray(strArr, opt) {
  var _this2 = this;

  this[_CANSELLER_PROP](); // cansel before animation.

  this[_IS_ANIMATING_PROP] = true;
  this[_RESUME_PROP] = null;
  this.options = opt;

  strArr.reduce(function (p, s, idx) {
    var isLast = idx === strArr.length - 1;
    return p.then(function () {
      return new Promise(function (resolve, reject) {
        _this2[_CANSELLER_PROP] = reject;
        if (_this2[_RANDOM_PROP]) {
          var _s = strArr[Math.random() * strArr.length | 0];
          _this2.map(_s);
        } else {
          _this2.map(s);
        }
        if (isLast) {
          if (_this2.loop) {
            setTimeout(function () {
              resolve();
              _animateFromStringArray.call(_this2, strArr);
            }, _this2.displayTime);
          } else {
            _this2[_IS_ANIMATING_PROP] = false;
          }
          return;
        }
        if (!_this2[_IS_ANIMATING_PROP]) {
          _this2[_RESUME_PROP] = resolve;
        } else {
          setTimeout(resolve, _this2.displayTime);
        }
      });
    });
  }, Promise.resolve()).catch(function (err) {
    _this2[_IS_ANIMATING_PROP] = false;
    console.log('OKBlocksGroup: cansel before animation.');
    console.log(err);
  });
}

module.exports = OKBlocksGroup;
},{"./OKBlock.js":1}],3:[function(require,module,exports){
'use strict';

module.exports.OKBlock = require('./OKBlock.js');
module.exports.OKBlocksGroup = require('./OKBlocksGroup.js');
},{"./OKBlock.js":1,"./OKBlocksGroup.js":2}],4:[function(require,module,exports){
'use strict';

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

/*
 * default options
 */

var _DEFAULT_OPTIONS = {
  displayTime: 1500,
  duration: 200,
  loop: false,
  random: false,
  pedal: true
};

/*
 * DOM in instance of OKBlock.
 */
var _BASE_DOM = function () {
  var wrapper = document.createElement('div');
  var part = document.createElement('div');
  var whiteBoxWrapper = document.createElement('div');
  var whiteBoxBase = document.createElement('div');
  var docFrag = document.createDocumentFragment();

  wrapper.className = 'lines-emblem weight_3';
  part.className = 'part';
  whiteBoxWrapper.className = 'whitebox-wrapper';

  // in emmet syntax.
  // div.whitebox-wrapper > div.whitebox * 4
  var _arr = [0, 1, 2, 3];
  for (var _i = 0; _i < _arr.length; _i++) {
    var _i2 = _arr[_i];
    var whiteBox = whiteBoxBase.cloneNode();
    whiteBox.className = 'whitebox pos_' + _i2;
    whiteBoxWrapper.appendChild(whiteBox);
  }

  part.appendChild(whiteBoxWrapper);

  // in emmet syntax.
  // div.wrapper > div.part * 9
  for (var i = 0; i < 9; i++) {
    var _part = part.cloneNode(true);
    _part.classList.add('pos_' + i % 3 + '_' + (i / 3 | 0));
    docFrag.appendChild(_part);
  }
  wrapper.appendChild(docFrag);

  return wrapper;
}();

/*
 * Parts className table.
 */
var _I_R0 = 'part i-shaped rotate0 rotate-default';
var _I_R90 = 'part i-shaped rotate90 rotate-default';
var _L_R0 = 'part l-shaped rotate0 rotate-default';
var _L_R90 = 'part l-shaped rotate90 rotate-default';
var _L_R180 = 'part l-shaped rotate180 rotate-default';
var _L_R270 = 'part l-shaped rotate270 rotate-default';
var _L_RD_R0 = 'part l-shaped-radius rotate0 rotate-default';
var _L_RD_R90 = 'part l-shaped-radius rotate90 rotate-default';
var _L_RD_R180 = 'part l-shaped-radius rotate180 rotate-default';
var _L_RD_R270 = 'part l-shaped-radius rotate270 rotate-default';
var _T_R0 = 'part t-shaped rotate0 rotate-default';
var _T_R90 = 'part t-shaped rotate90 rotate-default';
var _T_R180 = 'part t-shaped rotate180 rotate-default';
var _T_R270 = 'part t-shaped rotate270 rotate-default';
var _T_RD_R0 = 'part t-shaped-radius rotate0 rotate-default';
var _T_RD_R90 = 'part t-shaped-radius rotate90 rotate-default';
var _T_RD_R180 = 'part t-shaped-radius rotate180 rotate-default';
var _T_RD_R270 = 'part t-shaped-radius rotate270 rotate-default';
var _T_LRD_R0 = 'part t-shaped-l-radius rotate0 rotate-default';
var _T_LRD_R90 = 'part t-shaped-l-radius rotate90 rotate-default';
var _T_LRD_R180 = 'part t-shaped-l-radius rotate180 rotate-default';
var _T_LRD_R270 = 'part t-shaped-l-radius rotate270 rotate-default';
var _T_RRD_R0 = 'part t-shaped-r-radius rotate0 rotate-default';
var _T_RRD_R90 = 'part t-shaped-r-radius rotate90 rotate-default';
var _T_RRD_R180 = 'part t-shaped-r-radius rotate180 rotate-default';
var _T_RRD_R270 = 'part t-shaped-r-radius rotate270 rotate-default';
var _D_R0 = 'part dash-shaped rotate0 rotate-default';
var _D_R90 = 'part dash-shaped rotate90 rotate-default';
var _D_R180 = 'part dash-shaped rotate180 rotate-default';
var _D_R270 = 'part dash-shaped rotate270 rotate-default';
var _C_R0 = 'part cross-shaped rotate0 rotate-default';
var _C_RD_R0 = 'part cross-shaped-radius rotate0 rotate-default';
var _C_3RD_R0 = 'part cross-shaped-3-radius rotate0 rotate-default';
var _C_3RD_R90 = 'part cross-shaped-3-radius rotate90 rotate-default';
var _C_3RD_R180 = 'part cross-shaped-3-radius rotate180 rotate-default';
var _C_3RD_R270 = 'part cross-shaped-3-radius rotate270 rotate-default';
var _C_1RD_R0 = 'part cross-shaped-1-radius rotate0 rotate-default';
var _C_1RD_R90 = 'part cross-shaped-1-radius rotate90 rotate-default';
var _C_1RD_R180 = 'part cross-shaped-1-radius rotate180 rotate-default';
var _C_1RD_R270 = 'part cross-shaped-1-radius rotate270 rotate-default';
var _C_2RD_R0 = 'part cross-shaped-2-radius rotate0 rotate-default';
var _C_2RD_R90 = 'part cross-shaped-2-radius rotate90 rotate-default';
var _C_2RD_R180 = 'part cross-shaped-2-radius rotate180 rotate-default';
var _C_2RD_R270 = 'part cross-shaped-2-radius rotate270 rotate-default';
var _C_DRD_R0 = 'part cross-shaped-diagonal-radius rotate0 rotate-default';
var _C_DRD_R90 = 'part cross-shaped-diagonal-radius rotate90 rotate-default';
var _BL = 'part blank';

/*
 * Formation settings of all characters.
 */
var _formationTable = {
  'a': [_L_R90, _I_R90, _L_R180, _T_R270, _I_R90, _T_R90, _D_R0, _BL, _D_R0],
  'b': [_L_R90, _I_R90, _L_RD_R180, _T_R270, _I_R90, _T_RD_R90, _L_R0, _I_R90, _L_RD_R270],
  'c': [_L_RD_R90, _I_R90, _D_R270, _I_R0, _BL, _BL, _L_RD_R0, _I_R90, _D_R270],
  'd': [_L_R90, _I_R90, _L_RD_R180, _I_R0, _BL, _I_R0, _L_R0, _I_R90, _L_RD_R270],
  'e': [_L_R90, _I_R90, _D_R270, _T_R270, _I_R90, _BL, _L_R0, _I_R90, _D_R270],
  'f': [_L_R90, _I_R90, _D_R270, _T_R270, _I_R90, _BL, _D_R0, _BL, _BL],
  'g': [_L_R90, _I_R90, _D_R270, _I_R0, _BL, _L_RD_R180, _L_RD_R0, _I_R90, _L_R270],
  'h': [_D_R180, _BL, _D_R180, _T_R270, _I_R90, _T_R90, _D_R0, _BL, _D_R0],
  'i': [_BL, _D_R180, _BL, _BL, _I_R0, _BL, _BL, _D_R0, _BL],
  'j': [_BL, _BL, _D_R180, _BL, _BL, _I_R0, _L_RD_R0, _I_R90, _L_RD_R270],
  'k': [_D_R180, _L_RD_R90, _D_R270, _T_R270, _T_RD_R90, _BL, _D_R0, _L_RD_R0, _D_R270],
  'l': [_D_R180, _BL, _BL, _I_R0, _BL, _BL, _L_R0, _I_R90, _D_R270],
  'm': [_L_R90, _T_R0, _L_RD_R180, _I_R0, _D_R0, _I_R0, _D_R0, _BL, _D_R0],
  'n': [_L_R90, _I_R90, _L_RD_R180, _I_R0, _BL, _I_R0, _D_R0, _BL, _D_R0],
  'o': [_L_R90, _I_R90, _L_R180, _I_R0, _BL, _I_R0, _L_R0, _I_R90, _L_R270],
  'p': [_L_R90, _I_R90, _L_RD_R180, _T_R270, _I_R90, _L_RD_R270, _D_R0, _BL, _BL],
  'q': [_L_R90, _I_R90, _L_R180, _I_R0, _BL, _I_R0, _L_R0, _I_R90, _T_RRD_R90],
  'r': [_L_R90, _I_R90, _L_RD_R180, _T_R270, _I_R90, _T_RD_R90, _D_R0, _BL, _D_R0],
  's': [_L_RD_R90, _I_R90, _D_R270, _L_RD_R0, _I_R90, _L_R180, _D_R90, _I_R90, _L_R270],
  't': [_D_R90, _T_R0, _D_R270, _BL, _I_R0, _BL, _BL, _D_R0, _BL],
  'u': [_D_R180, _BL, _D_R180, _I_R0, _BL, _I_R0, _L_RD_R0, _I_R90, _L_RD_R270],
  'v': [_D_R180, _BL, _D_R180, _I_R0, _BL, _I_R0, _T_LRD_R270, _I_R90, _L_RD_R270],
  'w': [_D_R180, _BL, _D_R180, _I_R0, _I_R0, _I_R0, _T_LRD_R270, _C_DRD_R0, _L_RD_R270],
  'x': [_D_R90, _T_RD_R0, _D_R270, _BL, _I_R0, _BL, _D_R90, _T_RD_R180, _D_R270],
  'y': [_D_R180, _BL, _D_R180, _L_RD_R0, _T_R0, _L_R270, _BL, _D_R0, _BL],
  'z': [_D_R90, _I_R90, _L_R180, _L_RD_R90, _C_DRD_R90, _L_RD_R270, _L_R0, _I_R90, _D_R270],
  '1': [_BL, _BL, _BL, _BL, _T_LRD_R90, _BL, _BL, _D_R0, _BL],
  '2': [_D_R90, _I_R90, _L_RD_R180, _L_RD_R90, _I_R90, _L_RD_R270, _L_R0, _I_R90, _D_R270],
  '3': [_D_R90, _I_R90, _L_RD_R180, _BL, _I_R90, _T_RD_R90, _D_R90, _I_R90, _L_RD_R270],
  '4': [_D_R180, _BL, _D_R180, _L_RD_R0, _I_R90, _C_R0, _BL, _BL, _D_R0],
  '5': [_L_R90, _I_R90, _D_R270, _L_R0, _I_R90, _L_RD_R180, _L_RD_R0, _I_R90, _L_RD_R270],
  '6': [_L_RD_R90, _I_R90, _D_R270, _T_LRD_R270, _I_R90, _L_RD_R180, _L_RD_R0, _I_R90, _L_RD_R270],
  '7': [_L_RD_R90, _I_R90, _L_R180, _BL, _BL, _I_R0, _BL, _BL, _D_R0],
  '8': [_L_RD_R90, _I_R90, _L_RD_R180, _T_RD_R270, _I_R90, _T_RD_R90, _L_RD_R0, _I_R90, _L_RD_R270],
  '9': [_L_RD_R90, _I_R90, _L_RD_R180, _L_RD_R0, _I_R90, _T_RD_R90, _D_R90, _I_R90, _L_RD_R270],
  '0': [_L_RD_R90, _I_R90, _L_RD_R180, _I_R0, _BL, _I_R0, _L_RD_R0, _I_R90, _L_RD_R270],
  '+': [_BL, _D_R180, _BL, _D_R90, _C_R0, _D_R270, _BL, _D_R0, _BL],
  '-': [_BL, _BL, _BL, _D_R90, _I_R90, _D_R270, _BL, _BL, _BL],
  '*': [_BL, _BL, _BL, _BL, _C_RD_R0, _BL, _BL, _BL, _BL],
  '%': [_D_R180, _L_RD_R90, _BL, _BL, _I_R0, _BL, _BL, _L_RD_R270, _D_R0],
  '.': [_BL, _BL, _BL, _BL, _BL, _BL, _BL, _D_R0, _BL],
  ',': [_BL, _BL, _BL, _BL, _BL, _BL, _BL, _T_RD_R90, _BL],
  ':': [_BL, _D_R180, _BL, _BL, _BL, _BL, _BL, _D_R0, _BL],
  ';': [_BL, _D_R180, _BL, _BL, _BL, _BL, _BL, _T_RD_R90, _BL],
  '/': [_BL, _L_RD_R90, _BL, _BL, _I_R0, _BL, _BL, _L_RD_R270, _BL],
  '\\': [_BL, _L_RD_R180, _BL, _BL, _I_R0, _BL, _BL, _L_RD_R0, _BL],
  '{': [_BL, _L_RD_R90, _BL, _BL, _T_RD_R90, _BL, _BL, _L_RD_R0, _BL],
  '}': [_BL, _L_RD_R180, _BL, _BL, _T_RD_R270, _BL, _BL, _L_RD_R270, _BL],
  '[': [_BL, _L_R90, _BL, _BL, _I_R0, _BL, _BL, _L_R0, _BL],
  ']': [_BL, _L_R180, _BL, _BL, _I_R0, _BL, _BL, _L_R270, _BL],
  '#': [_BL, _BL, _BL, _C_R0, _C_R0, _BL, _C_R0, _C_R0, _BL],
  '(': [_BL, _L_RD_R90, _BL, _BL, _I_R0, _BL, _BL, _L_RD_R0, _BL],
  ')': [_BL, _L_RD_R180, _BL, _BL, _I_R0, _BL, _BL, _L_RD_R270, _BL],
  '!': [_BL, _D_R180, _BL, _BL, _I_R0, _BL, _BL, _D_R180, _BL],
  '?': [_L_RD_R90, _I_R90, _L_RD_R180, _BL, _L_RD_R90, _L_RD_R270, _BL, _D_R180, _BL],
  '\'': [_BL, _L_RD_R270, _BL, _BL, _BL, _BL, _BL, _BL, _BL],
  '"': [_L_RD_R270, _L_RD_R270, _BL, _BL, _BL, _BL, _BL, _BL, _BL],
  '$': [_L_RD_R90, _C_2RD_R0, _L_RD_R180, _L_RD_R0, _C_RD_R0, _L_RD_R180, _L_RD_R0, _C_2RD_R180, _L_RD_R270],
  '&': [_BL, _L_RD_R90, _L_RD_R180, _L_RD_R90, _T_RD_R180, _T_RD_R90, _L_RD_R0, _I_R90, _C_R0],
  '=': [_BL, _BL, _BL, _D_R90, _I_R90, _D_R270, _D_R90, _I_R90, _D_R270],
  '_': [_BL, _BL, _BL, _BL, _BL, _BL, _D_R90, _I_R90, _D_R270],
  '^': [_L_R90, _T_RD_R180, _L_R180, _D_R0, _BL, _D_R0, _BL, _BL, _BL],
  '|': [_BL, _I_R0, _BL, _BL, _I_R0, _BL, _BL, _I_R0, _BL],
  '`': [_BL, _L_RD_R180, _BL, _BL, _BL, _BL, _BL, _BL, _BL],
  '~': [_L_RD_R90, _L_RD_R180, _D_R180, _D_R0, _L_RD_R0, _L_RD_R270, _BL, _BL, _BL],
  '<': [_L_RD_R90, _I_R90, _D_R270, _T_RD_R90, _BL, _BL, _L_RD_R0, _I_R90, _D_R270],
  '>': [_D_R90, _I_R90, _L_RD_R180, _BL, _BL, _T_RD_R270, _D_R90, _I_R90, _L_RD_R270],
  '@': [_L_RD_R90, _I_R90, _L_RD_R180, _L_RD_R90, _L_RD_R180, _I_R0, _L_RD_R0, _T_LRD_R180, _L_RD_R270],
  ' ': [_BL, _BL, _BL, _BL, _BL, _BL, _BL, _BL, _BL]
};

/*
 * Transition settings.
 */
var _TRANSITION_PROPS = ['width', 'height', 'background-color', 'border-radius'];

module.exports = function (OKBlock) {
  OKBlock.define('Lines', { _DEFAULT_OPTIONS: _DEFAULT_OPTIONS, _BASE_DOM: _BASE_DOM, _TRANSITION_PROPS: _TRANSITION_PROPS, _formationTable: _formationTable });

  /*
   * advanced properties
   */

  var WEIGHT_PROP = Symbol();
  var WEIGHT_LIMIT_PROP = Symbol();

  Object.defineProperty(OKBlock.prototype, 'weight', {
    get: function get() {
      return this[WEIGHT_PROP];
    },
    set: function set(n) {
      if (n > this[WEIGHT_LIMIT_PROP] || n < 0) {
        return;
      }
      if (this[WEIGHT_PROP] === n) {
        return;
      }
      this.dom.classList.add('weight_' + n);
      this.dom.classList.remove('weight_' + this[WEIGHT_PROP]);
      this[WEIGHT_PROP] = n;
    }
  });

  OKBlock.prototype.bolder = function () {
    this.weight = this[WEIGHT_PROP] + 1;
  };

  OKBlock.prototype.lighter = function () {
    this.weight = this[WEIGHT_PROP] - 1;
  };

  OKBlock.prototype[WEIGHT_PROP] = 3;

  Object.defineProperty(OKBlock.prototype, WEIGHT_LIMIT_PROP, {
    value: 6
  });

  var LINE_COLOR_PROP = Symbol();
  var PAD_COLOR_PROP = Symbol();
  Object.defineProperty(OKBlock.prototype, 'lineColor', {
    get: function get() {
      return this[LINE_COLOR_PROP];
    },
    set: function set(color) {
      [].concat(_toConsumableArray(this.dom.querySelectorAll('.part'))).forEach(function (p) {
        p.style.backgroundColor = color;
      });
      this[LINE_COLOR_PROP] = color;
    }
  });

  Object.defineProperty(OKBlock.prototype, 'paddingColor', {
    get: function get() {
      return this[PAD_COLOR_PROP];
    },
    set: function set(color) {
      [].concat(_toConsumableArray(this.dom.querySelectorAll('.whitebox'))).forEach(function (p) {
        p.style.backgroundColor = color;
      });
      this[PAD_COLOR_PROP] = color;
    }
  });

  return OKBlock;
};
},{}],5:[function(require,module,exports){
'use strict';

/*
 * default options
 */

var _DEFAULT_OPTIONS = {
  displayTime: 1500,
  duration: 1000,
  loop: false,
  random: false,
  pedal: true
};

/*
 * Base of DOM, use to clone into instance of OKBlock.
 */
var _BASE_DOM = function () {
  var wrapper = document.createElement('div');
  var part = document.createElement('div');
  var whiteCircleW = document.createElement('div');
  var whiteCircle = document.createElement('div');
  var docFrag = document.createDocumentFragment();

  wrapper.className = 'olympic-emblem';
  part.className = 'part';
  whiteCircleW.className = 'white_circle_wrapper';
  whiteCircle.className = 'white_circle';

  whiteCircleW.appendChild(whiteCircle);
  part.appendChild(whiteCircleW);

  // in emmet syntax.
  // div.wrapper > div.part * 9
  for (var i = 0; i < 9; i++) {
    var _part = part.cloneNode(true);
    _part.classList.add('pos_' + i % 3 + '_' + (i / 3 | 0));
    docFrag.appendChild(_part);
  }
  wrapper.appendChild(docFrag);

  return wrapper;
}();

/*
 * Parts className table.
 */
var _G_R0 = 'part arc gold rotate0 rotate-default';
var _G_R90 = 'part arc gold rotate90 rotate-default';
var _G_R180 = 'part arc gold rotate180 rotate-default';
var _G_R270 = 'part arc gold rotate270 rotate-default';
var _S_R0 = 'part arc silver rotate0 rotate-default';
var _S_R90 = 'part arc silver rotate90 rotate-default';
var _S_R180 = 'part arc silver rotate180 rotate-default';
var _S_R270 = 'part arc silver rotate270 rotate-default';
var _P1 = 'part pole1 gray';
var _P2_V = 'part pole2_v gray';
var _P2_H = 'part pole2_h gray';
var _P3_V = 'part pole3_v gray';
var _P3_H = 'part pole3_h gray';
var _C_S = 'part circle_s red';
var _C_L = 'part circle_l red';
var _BL = 'part blank';

/*
 * Formation settings of all characters.
 */
var _formationTable = {
  'a': [_G_R180, _P1, _G_R270, _S_R0, _C_S, _S_R90, _P1, _BL, _P1],
  'b': [_BL, _P3_V, _G_R90, _BL, _BL, _S_R90, _BL, _BL, _S_R180],
  'c': [_S_R180, _P1, _G_R90, _P1, _BL, _BL, _G_R90, _P1, _S_R180],
  'd': [_P3_V, _S_R90, _G_R270, _BL, _BL, _P1, _BL, _G_R180, _S_R0],
  'e': [_BL, _P3_V, _G_R90, _BL, _BL, _C_S, _BL, _BL, _S_R180],
  'f': [_BL, _P3_V, _S_R90, _BL, _BL, _C_S, _BL, _BL, _BL],
  'g': [_P3_V, _G_R0, _BL, _BL, _BL, _S_R90, _BL, _C_S, _G_R180],
  'h': [_P3_V, _BL, _P3_V, _BL, _C_S, _BL, _BL, _BL, _BL],
  'i': [_BL, _C_S, _BL, _BL, _P2_V, _BL, _BL, _BL, _BL],
  'j': [_BL, _BL, _P2_V, _BL, _BL, _BL, _S_R90, _C_S, _G_R180],
  'k': [_P3_V, _BL, _G_R0, _BL, _C_S, _BL, _BL, _BL, _S_R270],
  'l': [_P3_V, _BL, _BL, _BL, _BL, _BL, _BL, _C_S, _G_R180],
  'm': [_G_R270, _BL, _S_R180, _P2_V, _C_S, _P2_V, _BL, _BL, _BL],
  'n': [_P3_V, _G_R270, _P3_V, _BL, _C_S, _BL, _BL, _S_R90, _BL],
  'o': [_S_R180, _P1, _G_R270, _P1, _BL, _P1, _G_R90, _P1, _S_R0],
  'p': [_P3_V, _C_S, _G_R90, _BL, _S_R270, _BL, _BL, _BL, _BL],
  'q': [_S_R180, _P1, _G_R270, _P1, _BL, _P1, _G_R90, _P1, _C_S],
  'r': [_P3_V, _C_S, _S_R90, _BL, _P1, _S_R180, _BL, _BL, _G_R270],
  's': [_G_R180, _P3_V, _S_R90, _S_R90, _BL, _BL, _G_R270, _BL, _C_S],
  't': [_G_R0, _P3_V, _C_S, _BL, _BL, _BL, _BL, _BL, _S_R180],
  'u': [_P2_V, _BL, _C_S, _P1, _BL, _P1, _G_R90, _P1, _S_R0],
  'v': [_S_R270, _BL, _S_R180, _G_R90, _BL, _G_R0, _BL, _P1, _BL],
  'w': [_S_R270, _BL, _G_R180, _S_R270, _P1, _G_R180, _G_R90, _BL, _S_R0],
  'x': [_G_R90, _BL, _S_R0, _BL, _P1, _BL, _S_R180, _BL, _G_R270],
  'y': [_G_R270, _BL, _S_R180, _BL, _C_S, _BL, _BL, _P1, _BL],
  'z': [_G_R0, _P1, _S_R0, _BL, _C_S, _BL, _S_R180, _P1, _S_R180],
  '1': [_G_R180, _P3_V, _BL, _BL, _BL, _BL, _BL, _BL, _BL],
  '2': [_S_R0, _P3_V, _G_R270, _BL, _BL, _S_R0, _C_S, _BL, _G_R180],
  '3': [_G_R0, _P1, _G_R270, _BL, _C_S, _BL, _S_R270, _P1, _S_R0],
  '4': [_BL, _S_R180, _BL, _G_R180, _C_S, _P1, _BL, _P1, _BL],
  '5': [_BL, _P1, _S_R0, _BL, _G_R90, _P1, _BL, _C_S, _S_R180],
  '6': [_BL, _S_R0, _BL, _BL, _P2_V, _G_R90, _BL, _BL, _S_R180],
  '7': [_G_R0, _C_S, _P3_V, _BL, _BL, _BL, _BL, _BL, _BL],
  '8': [_S_R0, _C_S, _S_R90, _G_R0, _BL, _G_R90, _S_R270, _BL, _S_R180],
  '9': [_G_R0, _P2_V, _BL, _S_R270, _BL, _BL, _BL, _G_R180, _BL],
  '0': [_C_L, _BL, _BL, _BL, _BL, _BL, _BL, _BL, _BL],
  '!': [_P2_V, _BL, _BL, _BL, _BL, _BL, _C_S, _BL, _BL],
  '.': [_BL, _BL, _BL, _BL, _BL, _BL, _P1, _BL, _BL],
  "'": [_P1, _BL, _BL, _G_R0, _BL, _BL, _BL, _BL, _BL],
  ':': [_P1, _BL, _BL, _BL, _BL, _BL, _P1, _BL, _BL],
  ';': [_P1, _BL, _BL, _BL, _BL, _BL, _C_S, _BL, _BL],
  '/': [[_G_R0, 'pos_3_0'], _BL, _S_R180, _BL, _S_R180, _G_R0, _S_R180, _G_R0, _BL],
  '_': [_BL, _BL, _BL, _BL, _BL, _BL, _P2_H, _BL, _BL],
  ' ': [_BL, _BL, _BL, _BL, _BL, _BL, _BL, _BL, _BL]
};

/*
 * Transition settings.
 */
var _TRANSITION_PROPS = ['top', 'left', 'background-color', 'border-radius'];

module.exports = function (OKBlock) {
  OKBlock.define('Olympic2020', { _DEFAULT_OPTIONS: _DEFAULT_OPTIONS, _BASE_DOM: _BASE_DOM, _TRANSITION_PROPS: _TRANSITION_PROPS, _formationTable: _formationTable });
  return OKBlock;
};
},{}],6:[function(require,module,exports){
module.exports = extend

var hasOwnProperty = Object.prototype.hasOwnProperty;

function extend() {
    var target = {}

    for (var i = 0; i < arguments.length; i++) {
        var source = arguments[i]

        for (var key in source) {
            if (hasOwnProperty.call(source, key)) {
                target[key] = source[key]
            }
        }
    }

    return target
}

},{}],"@all-user/ok-blocks":[function(require,module,exports){
module.exports = require('./lib');

},{"./lib":3}],"@all-user/ok-patterns-lines":[function(require,module,exports){
arguments[4]["@all-user/ok-blocks"][0].apply(exports,arguments)
},{"./lib":4,"dup":"@all-user/ok-blocks"}],"@all-user/ok-patterns-olympic2020":[function(require,module,exports){
arguments[4]["@all-user/ok-blocks"][0].apply(exports,arguments)
},{"./lib":5,"dup":"@all-user/ok-blocks"}]},{},[]);
