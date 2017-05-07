(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

var _embed_helper = require('./helpers/embed_helper.js');

var _require = require('@all-user/ok-blocks'),
    OKBlock = _require.OKBlock;

require('@all-user/ok-patterns-olympic2020')(OKBlock);


var PATTERN = 'Olympic2020';
document.addEventListener('DOMContentLoaded', function () {
  var wrapper = document.querySelector('#wrapper');
  var messageInput = document.querySelector('#message');
  var embedOutput = document.querySelector('#embed-output');
  var genButton = document.querySelector('#generate-button');
  var codeButton = document.querySelector('#embed-button');

  var TITLE_COPY = 'tokyo  2020   olympic';
  var SHORT_COPY = 'hi!!   ';
  var DATE_COPY = '8/9:sun';
  var BLANK_COPY = '       ';
  var LONG_COPY = 'olympicparalympicgame';
  var COPYS = [TITLE_COPY, LONG_COPY, SHORT_COPY, BLANK_COPY, '1234567890    ', BLANK_COPY, DATE_COPY, 'happy  day!', BLANK_COPY, 'hello  world!!'];

  if (messageInput == null) {
    throw new Error('#message is not found.');
  }
  messageInput.textContent = COPYS.join('\n');

  if (wrapper == null) {
    throw new Error('#wrapper is not found.');
  }
  var params = {
    pattern: PATTERN,
    vertical: 3,
    horizon: 7,
    display: 1500,
    duration: 1000,
    msg: COPYS
  };
  (0, _embed_helper.clickButtonHandler)(params, wrapper);

  if (genButton == null) {
    throw new Error('#generate-button is not found.');
  }
  genButton.addEventListener('click', function () {
    var options = (0, _embed_helper.getInputValues)();
    options.pattern = PATTERN;
    (0, _embed_helper.clickButtonHandler)(options, wrapper);
    window.scroll(0, 0);
  });

  if (codeButton == null) {
    throw new Error('#embed-button is not found.');
  }
  codeButton.addEventListener('click', function () {
    var embedCode = genEmbedCode();
    if (embedOutput == null) {
      throw new Error('#embed-output is not found');
    }
    if (!(embedOutput instanceof HTMLInputElement)) {
      console.error('#embed-output sould be HTMLInputElement.');
      return;
    }
    embedOutput.value = embedCode;
  });
});

function genEmbedCode() {
  var _getInputValues = (0, _embed_helper.getInputValues)(),
      width = _getInputValues.width,
      height = _getInputValues.height,
      vertical = _getInputValues.vertical,
      horizon = _getInputValues.horizon,
      display = _getInputValues.display,
      duration = _getInputValues.duration,
      msg = _getInputValues.msg;

  if (typeof width !== 'string' || typeof height !== 'string') {
    throw new Error('height and width should be css string(e.g., 100vw).');
  }
  return '<iframe style="width:' + width + ';height:' + height + ';border:none;" src="https://all-user.github.io/ok-blocks/demos/Olympic2020/embed_response/index.html?vertical=' + vertical + '&horizon=' + horizon + '&display=' + display + '&duration=' + duration + '&msg=' + fixedEncodeURIComponent(msg) + '&pattern=' + PATTERN + '"></iframe>';
}

function fixedEncodeURIComponent(str) {
  return encodeURIComponent(str.join(',')).replace(/[!'()*]/g, function (c) {
    return '%' + c.charCodeAt(0).toString(16);
  });
}

},{"./helpers/embed_helper.js":3,"@all-user/ok-blocks":"@all-user/ok-blocks","@all-user/ok-patterns-olympic2020":"@all-user/ok-patterns-olympic2020"}],2:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
function computedStyles() {
  var container = document.querySelector('.container');
  if (container == null) {
    throw new Error('.container is not found.');
  }
  var Styles = getComputedStyle(container);
  var WIDTH = +Styles.width.replace('px', '');
  var PADDING = +Styles.paddingLeft.replace('px', '');
  var SIZE = WIDTH - PADDING * 2;

  return { WIDTH: WIDTH, PADDING: PADDING, SIZE: SIZE };
}

exports.computedStyles = computedStyles;

},{}],3:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getInputValues = exports.clickButtonHandler = undefined;

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _computed_styles = require('./computed_styles.js');

var _require = require('@all-user/ok-blocks'),
    OKBlocksGroup = _require.OKBlocksGroup;

var forms = {};

function getInputValues() {
  forms.verticalInput = forms.verticalInput || document.querySelector('#vertical');
  forms.horizonInput = forms.horizonInput || document.querySelector('#horizon');
  forms.displayInput = forms.displayInput || document.querySelector('#display');
  forms.durationInput = forms.durationInput || document.querySelector('#duration');
  forms.messageInput = forms.messageInput || document.querySelector('#message');
  forms.iWidthInput = forms.iWidthInput || document.querySelector('#i-width');
  forms.iHeightInput = forms.iHeightInput || document.querySelector('#i-height');

  var vertical = forms.verticalInput.value | 0;
  var horizon = forms.horizonInput.value | 0;
  var display = forms.displayInput.value | 0;
  var duration = forms.durationInput.value | 0;
  var msg = forms.messageInput.value.split('\n');
  var width = forms.iWidthInput.value;
  var height = forms.iHeightInput.value;

  return { vertical: vertical, horizon: horizon, display: display, duration: duration, msg: msg, width: width, height: height };
}

function clickButtonHandler(params, wrapper) {
  var msg = params.msg;


  if ((typeof params === 'undefined' ? 'undefined' : _typeof(params)) !== 'object') {
    new Error('clickButtonHandler arg expect type is object.');
  }

  while (wrapper.firstChild) {
    wrapper.removeChild(wrapper.firstChild);
  }

  var group = generateSignboard(params);
  group.appendTo(wrapper);

  wrapper.addEventListener('click', function () {
    if (group.isAnimating) {
      group.stopAnimate.call(group);
    } else {
      group.resumeAnimate.call(group);
    }
  });

  msg.push(msg.shift());

  setTimeout(function () {
    group.animateFromString(params.msg, { loop: true });
  }, group.blocks[0].displayTime);
}

function generateSignboard(params) {
  // object => OKBlocksGroup
  var _computedStyles = (0, _computed_styles.computedStyles)(),
      SIZE = _computedStyles.SIZE;

  var pattern = params.pattern,
      vertical = params.vertical,
      horizon = params.horizon,
      display = params.display,
      duration = params.duration,
      msg = params.msg;


  vertical = vertical || 3;
  horizon = horizon || 7;
  display = display || 1500;
  var margin = SIZE / (horizon * 5);
  var emblemSize = margin * 3;

  var group = new OKBlocksGroup(msg[0], { pattern: pattern, length: vertical * horizon, size: emblemSize, displayTime: display, duration: duration });

  group.blocks.forEach(function (e) {
    e.dom.style.margin = margin + 'px';
  });

  return group;
}

exports.clickButtonHandler = clickButtonHandler;
exports.getInputValues = getInputValues;

},{"./computed_styles.js":2,"@all-user/ok-blocks":"@all-user/ok-blocks"}]},{},[1]);
