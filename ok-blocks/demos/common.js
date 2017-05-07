require=(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var OKBlock = function () {
  _createClass(OKBlock, null, [{
    key: 'factory',
    value: function factory(c, options) {
      if (options.pattern == null) {
        throw new Error('options.pattern is not set.');
      }
      if (this.patterns[options.pattern] == null) {
        throw new Error(options.pattern + ' pattern is undefined.');
      }
      return new this.patterns[options.pattern]._Class(c, options);
    }
  }]);

  function OKBlock(c, options) {
    _classCallCheck(this, OKBlock);

    if (options.pattern == null) {
      throw new Error('options.pattern is not set.');
    }
    if (this.constructor.patterns[options.pattern] == null) {
      throw new Error(options.pattern + ' pattern is undefined.');
    }

    this.pattern = options.pattern;
    this.patternDefinition = this.constructor.patterns[this.pattern];
    this.isAnimating = false;
    this.resumeAnimate = null;
    this.char = null;
    this.dom = _createDom.call(this);
    this.cancelAnimation = function () {};

    var _options = Object.assign({}, this.patternDefinition._DEFAULT_OPTIONS, options);
    var size = _options.size,
        displayTime = _options.displayTime,
        duration = _options.duration,
        easing = _options.easing,
        loop = _options.loop,
        random = _options.random,
        distinct = _options.distinct;

    // --- options ---

    this.displayTime = +displayTime;
    this.duration = +duration;
    this.loop = !!loop;
    this.random = !!random;
    this.easing = easing || 'cubic-bezier(.26,.92,.41,.98)';
    this.distinct = !!distinct;

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
      if (!this.patternDefinition._formationTable[_c]) {
        return false;
      }
      if (this.char === _c) {
        return false;
      }
      _changeStyle.call(this, _c);
      this.char = _c;
      return true;
    }
  }, {
    key: 'appendTo',
    value: function appendTo(parent) {
      parent.appendChild(this.dom);
    }
  }, {
    key: 'stopAnimate',
    value: function stopAnimate() {
      this.isAnimating = false;
    }
  }, {
    key: 'resumeAnimate',
    value: function resumeAnimate() {
      if (typeof this.resumeAnimate === 'function') {
        this.isAnimating = true;
        this.resumeAnimate();
      }
    }
  }, {
    key: 'animateFromString',
    value: function animateFromString(str) {
      var _this = this;

      var opt = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};


      this.isAnimating = true;
      this.resumeAnimate = null;
      this.options = opt;

      [].concat(_toConsumableArray(str)).reduce(function (p, c, idx) {
        // p = Promise.resolve(); c = str[idx];
        var isLast = idx === str.length - 1;
        return p.then(function () {
          return new Promise(function (resolve, reject) {
            _this.cancelAnimation = reject;
            if (_this._random) {
              var _c = str[Math.random() * str.length | 0];
              _this.to(_c);
            } else {
              _this.to(c);
            }
            if (isLast) {
              if (_this._loop) {
                setTimeout(function () {
                  resolve();
                  _this.animateFromString.call(_this, str);
                }, _this._displayTime);
              } else {
                setTimeout(reject, _this._displayTime);
              }
              return;
            }
            if (!_this.isAnimating) {
              _this.resumeAnimate = resolve;
            } else {
              setTimeout(resolve, _this._displayTime);
            }
          });
        });
      }, Promise.resolve()).catch(function (err) {
        _this.isAnimating = false;
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
      var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      var size = options.size,
          displayTime = options.displayTime,
          duration = options.duration,
          easing = options.easing,
          loop = options.loop,
          random = options.random,
          distinct = options.distinct;

      if (size != null) {
        this.size = size;
      }
      if (displayTime != null) {
        this.displayTime = displayTime;
      }
      if (duration != null) {
        this.duration = duration;
      }
      if (easing != null) {
        this.easing = easing;
      }
      if (loop != null) {
        this.loop = loop;
      }
      if (random != null) {
        this.random = random;
      }
      if (distinct != null) {
        this.distinct = distinct;
      }
    },
    get: function get() {
      var size = this.size,
          displayTime = this.displayTime,
          duration = this.duration,
          easing = this.easing,
          loop = this.loop,
          random = this.random,
          distinct = this.distinct;

      return { size: size, displayTime: displayTime, duration: duration, easing: easing, loop: loop, random: random, distinct: distinct };
    }

    // --- size ---

  }, {
    key: 'size',
    set: function set(size) {
      if (size == null) {
        return;
      }
      if (typeof size === 'number' && size >= 0) {
        var domStyle = this.dom.style;
        domStyle.width = size + 'px';
        domStyle.height = size + 'px';
      } else {
        console.error('OKBlock.size should zero or positive number.');
      }
    },
    get: function get() {
      return +this.dom.style.width.replace('px', '');
    }

    // --- displayTime ---

  }, {
    key: 'displayTime',
    set: function set(time) {
      if (time == null) {
        return;
      }
      if (typeof time === 'number' && time > 0) {
        this._displayTime = time;
      } else {
        console.error('OKBlock.displayTime should be positive number.');
      }
    },
    get: function get() {
      return this._displayTime;
    }

    // --- duration ---

  }, {
    key: 'duration',
    set: function set(time) {
      if (time == null) {
        return;
      }
      if (typeof time === 'number' && time >= 0) {
        this._duration = time;
        _updateTransitionConfig.call(this);
      } else {
        console.error('OKBlock.duration should be zero or positive number.', time);
      }
    },
    get: function get() {
      return this._duration;
    }

    // --- easing ---

  }, {
    key: 'easing',
    set: function set(val) {
      if (val == null) {
        return;
      }
      this._eaasing = val;
      _updateTransitionConfig.call(this);
    },
    get: function get() {
      return this._eaasing;
    }

    // --- loop ---

  }, {
    key: 'loop',
    set: function set(bool) {
      if (bool == null) {
        return;
      }
      this._loop = bool;
    },
    get: function get() {
      return this._loop;
    }

    // --- random ---

  }, {
    key: 'random',
    set: function set(bool) {
      if (bool == null) {
        return;
      }
      this._random = bool;
    },
    get: function get() {
      return this._random;
    }

    // --- distinct ---

  }, {
    key: 'distinct',
    set: function set(bool) {
      if (bool == null) {
        return;
      }
      this._distinct = bool;
    },
    get: function get() {
      return this._distinct;
    }

    // --- allValidChars ---

  }, {
    key: 'allValidChars',
    get: function get() {
      return Object.keys(this.patternDefinition._formationTable);
    }
  }], [{
    key: 'define',
    value: function define(name, patternDefinition) {
      if (!('_DEFAULT_OPTIONS' in patternDefinition) || !('_BASE_DOM' in patternDefinition) || !('_TRANSITION_PROPS' in patternDefinition) || !('_formationTable' in patternDefinition) || !('_Class' in patternDefinition)) {
        console.error('Pattern is invalid.');
      }
      this.patterns[name] = patternDefinition;
    }
  }]);

  return OKBlock;
}();

function _createDom() {
  return this.patternDefinition._BASE_DOM.cloneNode(true);
}

function _changeStyle(c) {
  // @bind this
  var oldC = this.char;
  var newFormation = this.patternDefinition._formationTable[c];
  if (!newFormation) {
    return;
  }
  var diffFormation = void 0;
  if (oldC) {
    var oldFormation = this.patternDefinition._formationTable[oldC];
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
  [].concat(_toConsumableArray(this.dom.childNodes)).forEach(function (node, idx) {
    if (!(node instanceof HTMLElement)) {
      return;
    }
    var formation = diffFormation[idx];
    if (!formation) {
      return;
    }
    var pos = void 0;
    if (Array.isArray(formation)) {
      pos = formation[1];
      var _formation = formation[0];
      node.className = _formation + ' ' + pos;
    } else {
      pos = _FORMATION_POS_TABLE[idx + (idx / 3 | 0)];
      node.className = formation + ' ' + pos;
    }
    if (node.classList.contains('rotate-default')) {
      return;
    }
    node.classList.add(_ROTATE_TABLE[Math.random() * 4 | 0]);
  });
}

function _updateTransitionConfig() {
  var _this2 = this;

  // @bind this
  var val = this.patternDefinition._TRANSITION_PROPS.map(function (prop) {
    return prop + ' ' + _this2._duration + 'ms ' + _this2._eaasing;
  }).join(',');

  _updateStyle(this.dom.childNodes);

  function _updateStyle(list) {
    [].concat(_toConsumableArray(list)).forEach(function (node) {
      if (node instanceof HTMLElement) {
        node.style.transition = val;
        if (node.firstChild) {
          _updateStyle(node.childNodes);
        }
      } else {
        // $FlowFixMe
        console.error('node must be HTMLElement. ' + node);
      }
    });
  }
}

OKBlock.patterns = {}; // initialized in OKBlock.define


var _ROTATE_TABLE = ['rotate0', 'rotate90', 'rotate180', 'rotate270'];
var _FORMATION_POS_TABLE = ['pos_0_0', 'pos_1_0', 'pos_2_0', 'pos_3_0', 'pos_0_1', 'pos_1_1', 'pos_2_1', 'pos_3_1', 'pos_0_2', 'pos_1_2', 'pos_2_2', 'pos_3_2'];

exports.default = OKBlock;
},{}],2:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _OKBlock = require('./OKBlock.js');

var _OKBlock2 = _interopRequireDefault(_OKBlock);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var OKBlocksGroup = function () {
  function OKBlocksGroup(chars) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : { pattern: null };

    _classCallCheck(this, OKBlocksGroup);

    var length = options.length,
        displayTime = options.displayTime,
        _options$loop = options.loop,
        loop = _options$loop === undefined ? false : _options$loop,
        _options$random = options.random,
        random = _options$random === undefined ? false : _options$random;

    this.isAnimating = false;
    this.resumeAnimation = null;
    this.cancelAnimation = function () {};

    // --- options ---
    if (displayTime && typeof displayTime === 'number') {
      this.displayTime = displayTime | 0;
    } else {
      this.displayTime = 1500;
    }
    this.loop = loop;
    this.random = random;

    if (typeof chars === 'string') {
      if (typeof length === 'number') {
        if (chars.length < length) {
          for (var i = chars.length; i < length; i++) {
            chars += ' ';
          }
        } else if (chars.length > length) {
          chars = chars.slice(0, length);
        }
      }
    } else {
      throw new Error('OKBlocksGroup constructor first argument should be string.');
    }

    delete options.loop;
    delete options.displayTime;
    delete options.random;

    var blocks = _transformToOKBlockArray(chars, options);

    if (blocks) {
      this.blocks = blocks;
    } else {
      throw new Error('OKBlocksGroup arguments expect string or array of OKBlock.');
    }
  }

  _createClass(OKBlocksGroup, [{
    key: 'toString',
    value: function toString() {
      return this.blocks.map(function (e) {
        return e.char;
      }).join('');
    }
  }, {
    key: 'map',
    value: function map(str) {
      this.blocks.forEach(function (emblem, idx) {
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
      var frag = this.blocks.reduce(function (f, e) {
        f.appendChild(e.dom);
        return f;
      }, document.createDocumentFragment());
      parent.appendChild(frag);
    }
  }, {
    key: 'stopAnimate',
    value: function stopAnimate() {
      this.isAnimating = false;
    }
  }, {
    key: 'resumeAnimate',
    value: function resumeAnimate() {
      if (typeof this.resumeAnimation === 'function') {
        this.isAnimating = true;
        this.resumeAnimation();
      }
    }
  }, {
    key: 'animateFromString',
    value: function animateFromString(str, opt) {
      var strArr = void 0;
      if (typeof str === 'string') {
        var len = this.blocks.length;
        strArr = [].concat(_toConsumableArray(str)).reduce(function (arr, s, idx) {
          if (idx % len === 0) {
            arr.push('');
          }
          arr[idx / len | 0] += s;
          return arr;
        }, []);
      } else if (Array.isArray(str) && str.every(function (s) {
        return typeof s === 'string';
      })) {
        strArr = str;
      } else {
        console.error('OKBlocksGroup#animateFromString first argument should be string or array of string.');
        return;
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
      var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      var length = options.length,
          size = options.size,
          displayTime = options.displayTime,
          duration = options.duration,
          easing = options.easing,
          loop = options.loop,
          random = options.random,
          distinct = options.distinct;

      if (length != null) {
        this.length = length;
      }
      if (size != null) {
        this.size = size;
      }
      if (displayTime != null) {
        this.displayTime = displayTime;
      }
      if (duration != null) {
        this.duration = duration;
      }
      if (easing != null) {
        this.easing = easing;
      }
      if (loop != null) {
        this.loop = loop;
      }
      if (random != null) {
        this.random = random;
      }
      if (distinct != null) {
        this.distinct = distinct;
      }
    },
    get: function get() {
      var length = this.length,
          displayTime = this.displayTime,
          loop = this.loop,
          random = this.random,
          size = this.size,
          duration = this.duration,
          easing = this.easing,
          distinct = this.distinct;

      return { length: length, displayTime: displayTime, loop: loop, random: random, size: size, duration: duration, easing: easing, distinct: distinct };
    }

    // --- length ---

  }, {
    key: 'length',
    set: function set(lenNew) {
      if (lenNew == null) {
        return;
      }
      var blocks = this.blocks;
      var lenOld = blocks.length;

      if (lenNew > lenOld) {
        var blankArr = Array.from({ length: lenNew - lenOld }, function () {
          return _OKBlock2.default.factory(' ', { pattern: blocks.slice(-1)[0].pattern });
        });
        this.blocks = blocks.concat(blankArr);
      } else if (lenNew < lenOld) {
        this.blocks = blocks.slice(0, lenNew);
      }
    },
    get: function get() {
      return this.blocks.length;
    }

    // --- displayTime ---

  }, {
    key: 'displayTime',
    set: function set(time) {
      if (time == null) {
        return;
      }
      if (typeof time === 'number' && time > 0) {
        this._displayTime = time;
      } else {
        console.error('OKBlocksGroup.displayTime should be positive number.');
      }
    },
    get: function get() {
      return this._displayTime;
    }

    // --- loop ---

  }, {
    key: 'loop',
    set: function set(bool) {
      if (bool == null) {
        return;
      }
      this._loop = bool;
    },
    get: function get() {
      return this._loop;
    }

    // --- random ---

  }, {
    key: 'random',
    set: function set(bool) {
      if (bool == null) {
        return;
      }
      this._random = bool;
    },
    get: function get() {
      return this._random;
    }

    // --- size ---

  }, {
    key: 'size',
    set: function set(size) {
      this.blocks.forEach(function (emb) {
        return emb.size = size;
      });
    },
    get: function get() {
      return this.blocks.map(function (emb) {
        return emb.size;
      });
    }

    // --- duration ---

  }, {
    key: 'duration',
    set: function set(time) {
      this.blocks.forEach(function (emb) {
        return emb.duration = time;
      });
    },
    get: function get() {
      return this.blocks.map(function (emb) {
        return emb.duration;
      });
    }

    // --- easing ---

  }, {
    key: 'easing',
    set: function set(val) {
      this.blocks.forEach(function (emb) {
        return emb.easing = val;
      });
    },
    get: function get() {
      return this.blocks.map(function (emb) {
        return emb.easing;
      });
    }

    // --- distinct ---

  }, {
    key: 'distinct',
    set: function set(val) {
      this.blocks.forEach(function (emb) {
        return emb.distinct = val;
      });
    },
    get: function get() {
      return this.blocks.map(function (emb) {
        return emb.distinct;
      });
    }
  }]);

  return OKBlocksGroup;
}();

function _transformToOKBlockArray(arg, opt) {

  var res = void 0;
  switch (typeof arg === 'undefined' ? 'undefined' : _typeof(arg)) {
    case 'string':
      res = [].concat(_toConsumableArray(arg)).map(function (c) {
        return _OKBlock2.default.factory(c, opt);
      });
      break;
    case 'object':
      if (Array.isArray(arg) && arg.every(function (o) {
        return o instanceof _OKBlock2.default;
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

function _animateFromStringArray(strArr) {
  var _this = this;

  var opt = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

  this.cancelAnimation(); // cansel before animation.

  this.isAnimating = true;
  this.resumeAnimation = null;
  this.options = opt;

  strArr.reduce(function (p, s, idx) {
    var isLast = idx === strArr.length - 1;
    return p.then(function () {
      return new Promise(function (resolve, reject) {
        _this.cancelAnimation = reject;
        if (_this.random) {
          var _s = strArr[Math.random() * strArr.length | 0];
          _this.map(_s);
        } else {
          _this.map(s);
        }
        if (isLast) {
          if (_this.loop) {
            setTimeout(function () {
              resolve();
              _animateFromStringArray.call(_this, strArr);
            }, _this.displayTime);
          } else {
            _this.isAnimating = false;
          }
          return;
        }
        if (!_this.isAnimating) {
          _this.resumeAnimation = resolve;
        } else {
          setTimeout(resolve, _this.displayTime);
        }
      });
    });
  }, Promise.resolve()).catch(function (err) {
    _this.isAnimating = false;
    console.log('OKBlocksGroup: cansel before animation.');
    console.log(err);
  });
}

exports.default = OKBlocksGroup;
},{"./OKBlock.js":1}],"@all-user/ok-blocks":[function(require,module,exports){
'use strict';

var _OKBlock = require('./OKBlock.js');

var _OKBlock2 = _interopRequireDefault(_OKBlock);

var _OKBlocksGroup = require('./OKBlocksGroup.js');

var _OKBlocksGroup2 = _interopRequireDefault(_OKBlocksGroup);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

module.exports = {
  OKBlock: _OKBlock2.default,
  OKBlocksGroup: _OKBlocksGroup2.default
};
},{"./OKBlock.js":1,"./OKBlocksGroup.js":2}],"@all-user/ok-patterns-lines":[function(require,module,exports){
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

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
    var i = _arr[_i];
    var whiteBox = whiteBoxBase.cloneNode();
    whiteBox.className = 'whitebox pos_' + i;
    whiteBoxWrapper.appendChild(whiteBox);
  }

  part.appendChild(whiteBoxWrapper);

  // in emmet syntax.
  // div.wrapper > div.part * 9
  for (var _i2 = 0; _i2 < 9; _i2++) {
    var _part = part.cloneNode(true);
    _part.classList.add('pos_' + _i2 % 3 + '_' + (_i2 / 3 | 0));
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

module.exports = function (OKBlockBase) {
  /*
   * advanced properties
   */

  var ExtendedByLinesPattern = function (_OKBlockBase) {
    _inherits(ExtendedByLinesPattern, _OKBlockBase);

    function ExtendedByLinesPattern(c, options) {
      _classCallCheck(this, ExtendedByLinesPattern);

      var _this = _possibleConstructorReturn(this, (ExtendedByLinesPattern.__proto__ || Object.getPrototypeOf(ExtendedByLinesPattern)).call(this, c, options));

      _this._weight = 3;
      return _this;
    }

    _createClass(ExtendedByLinesPattern, [{
      key: 'bolder',
      value: function bolder() {
        this.weight = this._weight + 1;
      }
    }, {
      key: 'lighter',
      value: function lighter() {
        this.weight = this._weight - 1;
      }
    }, {
      key: 'weight',
      get: function get() {
        return this._weight;
      },
      set: function set(n) {
        if (n > this.constructor.WEIGHT_LIMIT || n < 0) {
          return;
        }
        if (this._weight === n) {
          return;
        }
        this.dom.classList.add('weight_' + n);
        this.dom.classList.remove('weight_' + this._weight);
        this._weight = n;
      }
    }, {
      key: 'lineColor',
      get: function get() {
        return this._lineColor;
      },
      set: function set(color) {
        [].concat(_toConsumableArray(this.dom.querySelectorAll('.part'))).forEach(function (p) {
          p.style.backgroundColor = color;
        });
        this._lineColor = color;
      }
    }, {
      key: 'paddingColor',
      get: function get() {
        return this._paddingColor;
      },
      set: function set(color) {
        [].concat(_toConsumableArray(this.dom.querySelectorAll('.whitebox'))).forEach(function (p) {
          p.style.backgroundColor = color;
        });
        this._paddingColor = color;
      }
    }]);

    return ExtendedByLinesPattern;
  }(OKBlockBase);

  ExtendedByLinesPattern.WEIGHT_LIMIT = 6;

  var definition = { _DEFAULT_OPTIONS: _DEFAULT_OPTIONS, _BASE_DOM: _BASE_DOM, _TRANSITION_PROPS: _TRANSITION_PROPS, _formationTable: _formationTable, _Class: ExtendedByLinesPattern };
  OKBlockBase.define('Lines', definition);

  return ExtendedByLinesPattern;
};
},{}],"@all-user/ok-patterns-olympic2020":[function(require,module,exports){
'use strict';

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

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

module.exports = function (OKBlockBase) {
  var ExtendedByOlympic2020Pattern = function (_OKBlockBase) {
    _inherits(ExtendedByOlympic2020Pattern, _OKBlockBase);

    function ExtendedByOlympic2020Pattern() {
      _classCallCheck(this, ExtendedByOlympic2020Pattern);

      return _possibleConstructorReturn(this, (ExtendedByOlympic2020Pattern.__proto__ || Object.getPrototypeOf(ExtendedByOlympic2020Pattern)).apply(this, arguments));
    }

    return ExtendedByOlympic2020Pattern;
  }(OKBlockBase);

  var definition = { _DEFAULT_OPTIONS: _DEFAULT_OPTIONS, _BASE_DOM: _BASE_DOM, _TRANSITION_PROPS: _TRANSITION_PROPS, _formationTable: _formationTable, _Class: ExtendedByOlympic2020Pattern };
  OKBlockBase.define('Olympic2020', definition);
  return function (_OKBlockBase2) {
    _inherits(_class, _OKBlockBase2);

    function _class() {
      _classCallCheck(this, _class);

      return _possibleConstructorReturn(this, (_class.__proto__ || Object.getPrototypeOf(_class)).apply(this, arguments));
    }

    return _class;
  }(OKBlockBase);
};
},{}]},{},[]);
