(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

var _embed_helper = require('./helpers/embed_helper.js');

var _require = require('@all-user/ok-blocks');

var OKBlock = _require.OKBlock;

require('@all-user/ok-patterns-lines')(OKBlock);


document.addEventListener('DOMContentLoaded', function () {
  var pairs = decodeURIComponent(location.search.slice(1)).split('&');
  var params = pairs.reduce(function (params, s) {
    var keyValue = s.split('=');
    params[keyValue[0]] = keyValue[1];
    return params;
  }, {});

  params.msg = params.msg.split(',');

  (0, _embed_helper.clickButtonHandler)(params, document.querySelector('#wrapper'));
});

},{"./helpers/embed_helper.js":3,"@all-user/ok-blocks":"@all-user/ok-blocks","@all-user/ok-patterns-lines":"@all-user/ok-patterns-lines"}],2:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
function computedStyles() {
  var WIDTH = +getComputedStyle(document.querySelector('.container')).width.replace('px', '');
  var PADDING = +getComputedStyle(document.querySelector('.container')).paddingLeft.replace('px', '');
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

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

var _computed_styles = require('./computed_styles.js');

var _require = require('@all-user/ok-blocks');

var OKBlocksGroup = _require.OKBlocksGroup;


var UP_KEY = 75;
var DOWN_KEY = 74;

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

  document.addEventListener('keydown', function (e) {
    switch (e.keyCode) {
      case UP_KEY:
        group.emblems.forEach(function (emb) {
          emb.bolder();
        });
        break;
      case DOWN_KEY:
        group.emblems.forEach(function (emb) {
          emb.lighter();
        });
        break;
    }
  });

  setTimeout(function () {
    group.animateFromString(msg, { loop: true });
  }, group.emblems[0].displayTime);
}

function generateSignboard(params) {
  // object => OKBlocksGroup

  var _computedStyles = (0, _computed_styles.computedStyles)();

  var SIZE = _computedStyles.SIZE;


  if (!(typeof params === 'undefined' ? 'undefined' : _typeof(params)) === 'object') {
    return;
  }

  var pattern = params.pattern;
  var vertical = params.vertical;
  var horizon = params.horizon;
  var display = params.display;
  var duration = params.duration;
  var msg = params.msg;


  vertical = vertical || 3;
  horizon = horizon || 7;
  display = display || 1500;
  var margin = SIZE / (horizon * 5);
  var emblemSize = margin * 3;

  var group = new OKBlocksGroup(msg[0], { pattern: pattern, length: vertical * horizon, size: emblemSize, displayTime: display, duration: duration });

  group.emblems.forEach(function (e) {
    e.dom.style.margin = margin + 'px';
  });

  return group;
}

exports.clickButtonHandler = clickButtonHandler;
exports.getInputValues = getInputValues;

},{"./computed_styles.js":2,"@all-user/ok-blocks":"@all-user/ok-blocks"}]},{},[1]);
