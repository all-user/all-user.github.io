(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

var _computed_styles = require('./helpers/computed_styles.js');

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

var _require = require('@all-user/ok-blocks');

var OKBlock = _require.OKBlock;

require('@all-user/ok-patterns-olympic2020')(OKBlock);

document.addEventListener('DOMContentLoaded', function () {
  var wrapper = document.querySelector('#wrapper');

  var _computedStyles = (0, _computed_styles.computedStyles)();

  var SIZE = _computedStyles.SIZE;

  var size = SIZE > 675 ? 675 : SIZE;
  var MARGIN = size / 5;
  var sizeS = MARGIN * 3;

  var init = 't';
  var olms = [];
  olms.push(new OKBlock(init[0], { size: sizeS, pattern: 'Olympic2020' }));
  //     olms.push(new OKBlock(init[1], { size: sizeS }));
  //     olms.push(new OKBlock(init[2], { size: sizeS }));
  //     olms.push(new OKBlock(init[3], { size: sizeS }));
  olms.forEach(function (e) {
    e.dom.style.margin = MARGIN + 'px auto';
  });

  var input = document.querySelector('#user-input');

  olms.forEach(function (olm) {
    wrapper.appendChild(olm.dom);
  });

  input.addEventListener('input', function (e) {
    var str = (init + e.target.value).slice(-init.length);
    [].concat(_toConsumableArray(str)).forEach(function (c, idx) {
      olms[idx].to(c);
    });
  });
});

},{"./helpers/computed_styles.js":2,"@all-user/ok-blocks":"@all-user/ok-blocks","@all-user/ok-patterns-olympic2020":"@all-user/ok-patterns-olympic2020"}],2:[function(require,module,exports){
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

},{}]},{},[1]);
