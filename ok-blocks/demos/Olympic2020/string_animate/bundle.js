(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
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

},{}],2:[function(require,module,exports){
'use strict';

var _computed_styles = require('./helpers/computed_styles.js');

var _require = require('@all-user/ok-blocks'),
    OKBlock = _require.OKBlock,
    OKBlocksGroup = _require.OKBlocksGroup;

require('@all-user/ok-patterns-olympic2020')(OKBlock);

document.addEventListener('DOMContentLoaded', function () {
  var wrapper = document.querySelector('#wrapper');

  var _computedStyles = (0, _computed_styles.computedStyles)(),
      SIZE = _computedStyles.SIZE;

  var MARGIN = SIZE / 35;
  var EMBLEM_SIZE = MARGIN * 3;
  var TITLE_COPY = 'tokyo  2020   olympic';
  var SHORT_COPY = 'hi!!   ';
  var DATE_COPY = '8/9:sun';
  var BLANK_COPY = '       ';
  var LONG_COPY = 'olympicparalympicgame';
  var COPYS = [TITLE_COPY, LONG_COPY, SHORT_COPY, '1234567890    ', BLANK_COPY, DATE_COPY, 'happy     day!', BLANK_COPY, 'hello  world!!', BLANK_COPY];

  var group = new OKBlocksGroup(TITLE_COPY, { pattern: 'Olympic2020', length: 21, size: EMBLEM_SIZE, displayTime: 1500 });

  group.blocks.forEach(function (e) {
    e.dom.style.margin = MARGIN + 'px';
  });

  if (wrapper == null) {
    throw new Error('#wrapper is not found.');
  }
  group.appendTo(wrapper);

  wrapper.addEventListener('click', function () {
    if (group.isAnimating) {
      group.stopAnimate.call(group);
    } else {
      group.resumeAnimate.call(group);
    }
  });

  group.animateFromString(COPYS, { loop: true });

  window.group = group;
});

},{"./helpers/computed_styles.js":1,"@all-user/ok-blocks":"@all-user/ok-blocks","@all-user/ok-patterns-olympic2020":"@all-user/ok-patterns-olympic2020"}]},{},[2]);
