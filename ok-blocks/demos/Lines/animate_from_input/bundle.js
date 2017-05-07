(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

var _computed_styles = require('./helpers/computed_styles.js');

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

var _require = require('@all-user/ok-blocks'),
    OKBlock = _require.OKBlock;

require('@all-user/ok-patterns-lines')(OKBlock);

document.addEventListener('DOMContentLoaded', function () {
  var wrapper = document.querySelector('#wrapper');

  var _computedStyles = (0, _computed_styles.computedStyles)(),
      SIZE = _computedStyles.SIZE;

  var size = SIZE > 675 ? 675 : SIZE;
  var MARGIN = size / 5;
  var sizeS = MARGIN * 3;

  var init = 't';
  var olms = [];
  olms.push(OKBlock.factory(init[0], { pattern: 'Lines', size: sizeS }));
  //     olms.push(OKBlock.factory(init[1], { pattern: 'Lines', size: sizeS }));
  //     olms.push(OKBlock.factory(init[2], { pattern: 'Lines', size: sizeS }));
  //     olms.push(OKBlock.factory(init[3], { pattern: 'Lines', size: sizeS }));
  olms.forEach(function (e) {
    e.dom.style.margin = MARGIN + 'px auto';
  });
  olms.forEach(function (olm) {
    if (wrapper == null) {
      throw new Error('#wrapper is not found.');
    }
    wrapper.appendChild(olm.dom);
  });

  var input = document.querySelector('#user-input');
  if (input == null) {
    throw new Error('#user-input is not found.');
  }
  input.addEventListener('input', function (e) {
    if (e.target !== input) {
      console.error('event.target is not equal #user-input.');
      return;
    }
    if (e.target instanceof HTMLInputElement) {
      e.target;
    } else {
      return;
    }
    var str = (init + e.target.value).slice(-init.length);
    [].concat(_toConsumableArray(str)).forEach(function (c, idx) {
      olms[idx].to(c);
    });
  });
});

},{"./helpers/computed_styles.js":2,"@all-user/ok-blocks":"@all-user/ok-blocks","@all-user/ok-patterns-lines":"@all-user/ok-patterns-lines"}],2:[function(require,module,exports){
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

},{}]},{},[1]);
