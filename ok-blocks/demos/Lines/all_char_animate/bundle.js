(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

var _computed_styles = require('./helpers/computed_styles.js');

var _require = require('@all-user/ok-blocks');

var OKBlock = _require.OKBlock;

require('@all-user/ok-patterns-lines')(OKBlock);

document.addEventListener('DOMContentLoaded', function () {
  var wrapper = document.querySelector('#wrapper');
  var olms = [];

  var _computedStyles = (0, _computed_styles.computedStyles)();

  var SIZE = _computedStyles.SIZE;

  var size = SIZE > 500 ? 500 : SIZE;
  var MARGIN = size / 15;
  var sizeL = size - MARGIN * 2;
  var sizeS = MARGIN * 3;

  olms.push(new OKBlock('a', { pattern: 'Lines', size: sizeS, displayTime: 3111, random: true }));
  olms.push(new OKBlock('z', { pattern: 'Lines', size: sizeS, displayTime: 6399, random: true }));
  olms.push(new OKBlock('t', { pattern: 'Lines', size: sizeS, displayTime: 1477, random: true }));
  olms.forEach(function (e) {
    e.dom.style.margin = MARGIN + 'px';
  });

  var bigOKBlock = new OKBlock('/', { pattern: 'Lines', size: sizeL, displayTime: 1000, duration: 200 });
  bigOKBlock.dom.style.margin = MARGIN + 'px';
  olms.push(bigOKBlock);

  var allValidChars = bigOKBlock.allValidChars;

  olms.forEach(function (olm) {
    olm.dom.addEventListener('click', function () {
      if (olm.isAnimating) {
        olm.stopAnimate.call(olm);
      } else {
        olm.resumeAnimate.call(olm);
      }
    });

    wrapper.appendChild(olm.dom);

    setTimeout(function () {
      olm.animateFromString(allValidChars, { loop: true });
    }, 1000);
  });
});

},{"./helpers/computed_styles.js":2,"@all-user/ok-blocks":"@all-user/ok-blocks","@all-user/ok-patterns-lines":"@all-user/ok-patterns-lines"}],2:[function(require,module,exports){
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
