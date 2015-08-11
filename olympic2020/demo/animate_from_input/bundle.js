(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

document.addEventListener('DOMContentLoaded', function () {
    var wrapper = document.querySelector('#wrapper');
    var WIDTH = +getComputedStyle(document.querySelector('.container')).width.replace('px', '');
    var PADDING = +getComputedStyle(document.querySelector('.container')).paddingLeft.replace('px', '');
    var SIZE = WIDTH - PADDING * 2;
    var size = SIZE > 1500 ? 1500 : SIZE;
    var MARGIN = size / 15;
    var sizeS = MARGIN * 3;

    var init = '109';
    var olms = [];
    olms.push(new Olympic2020(init[0], { size: sizeS }));
    olms.push(new Olympic2020(init[1], { size: sizeS }));
    olms.push(new Olympic2020(init[2], { size: sizeS }));
    olms.forEach(function (e) {
        e.dom.style.margin = MARGIN + 'px';
    });

    var input = document.querySelector('#user-input');
    var ALL_VALID_CHARS = Olympic2020.ALL_VALID_CHARS;

    olms.forEach(function (olm) {
        wrapper.appendChild(olm.dom);
    });

    input.addEventListener('input', function (e) {
        var str = (init + e.target.value).slice(-3);
        [].forEach.call(str, function (c, idx) {
            olms[idx].to(c);
        });
    });
});

},{}]},{},[1]);
