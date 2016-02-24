'use strict';

import OKBlock from './OKBlock.js';

const _EMBLEMS_PROP      = Symbol();
const _DISPLAY_TIME_PROP = Symbol();
const _IS_ANIMATING_PROP = Symbol();
const _RESUME_PROP       = Symbol();
const _LOOP_PROP         = Symbol();
const _RANDOM_PROP       = Symbol();
const _CANSELLER_PROP    = Symbol();

class OKBlocksGroup {
    constructor(chars, options = {}) {
        let { length, displayTime, loop = false, random = false } = options;
        this[_IS_ANIMATING_PROP]  =   false;
        this[_RESUME_PROP]        =   null;
        this[_CANSELLER_PROP]     =   () => {};

        // --- options ---
        this.displayTime          =   (displayTime | 0) || 1500;
        this.loop                 =   loop;
        this.random               =   random;

        if (typeof chars === 'string') {
            if (typeof length !== 'number' ||  chars.length < length) {
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

        let emblems = _transformToOKBlockArray(chars, options);

        if (emblems) {
            this[_EMBLEMS_PROP] = emblems;
        } else {
            throw new Error('OKBlocksGroup arguments expect string or array of OKBlock.');
        }
    }

    toString() {
        return this.emblems.map(e => e.char).join('');
    }

    map(str) {
        this.emblems.forEach((emblem, idx) => {
            let c = str[idx];
            if (!c) { c = ' '; }
            emblem.to(c);
        });
    }

    appendTo(parent) {
        var frag = this.emblems.reduce((f, e) => {
            f.appendChild(e.dom);
            return f;
        }, document.createDocumentFragment());
        parent.appendChild(frag);
    }

    stopAnimate() {
        this[_IS_ANIMATING_PROP] = false;
    }

    resumeAnimate() {
        this[_IS_ANIMATING_PROP] = true;
        this[_RESUME_PROP]();
    }

    animateFromString(str, opt) {
        let strArr;
        if (typeof str === 'string') {
            let len = this.emblems.length;
            strArr = [].reduce.call(str, (arr, s, idx) => {
                if (idx % len === 0) { arr.push(''); }
                arr[idx / len | 0] += s;
                return arr;
            }, []);
        } else if (Array.isArray(str) && str.every(s => typeof s === 'string')) {
            strArr = str;
        } else {
            console.error('OKBlocksGroup#animateFromString first argument should be string or array of string.');
        }

        _animateFromStringArray.call(this, strArr, opt);
    }

    animateFromStringArray(strArr, opt) {
        _animateFromStringArray.call(this, strArr, opt);
    }

    /*
     * Setter and Getter
     */

    // --- options ---
    set options({ length, displayTime, loop, random, size, duration, easing, pedal } = {}) {
        this.length      = length;
        this.displayTime = displayTime;
        this.loop        = loop;
        this.random      = random;

        // change emblems options
        this.size        = size;
        this.duration    = duration;
        this.easing      = easing;
        this.pedal       = pedal;
    }
    get options() {
        return {
            length:      this.length,
            displayTime: this.displayTime,
            loop:        this.loop,
            random:      this.random,

            // emblems options
            size:        this.size,
            duration:    this.duration,
            easing:      this.easing,
            pedal:       this.pedal
        };
    }

    // --- length ---
    set length(lenNew) {
        if (lenNew == null) { return; }
        let emblems = this[_EMBLEMS_PROP];
        let lenOld  = emblems.length;

        if (lenNew > lenOld) {
            let blankArr = Array.from({ length: lenNew - lenOld }, () => new OKBlock(' ', { pattern: emblems.slice(-1)[0].pattern }));
            this[_EMBLEMS_PROP] = emblems.concat(blankArr);
        } else if (lenNew < lenOld) {
            this[_EMBLEMS_PROP] = emblems.slice(0, lenNew);
        }
    }
    get length() { return this[_EMBLEMS_PROP].length; }

    // --- displayTime ---
    set displayTime(time) {
        if (time == null) { return; }
        if (typeof time === 'number' && time > 0) {
            this[_DISPLAY_TIME_PROP] = time;
        } else {
            console.error('OKBlocksGroup.displayTime should be type of positive number.');
        }
    }
    get displayTime() { return this[_DISPLAY_TIME_PROP]; }

    // --- loop ---
    set loop(bool) {
        if (bool == null) { return; }
        this[_LOOP_PROP] = bool;
    }
    get loop() { return this[_LOOP_PROP]; }

    // --- random ---
    set random(bool) {
        if (bool == null) { return; }
        this[_RANDOM_PROP] = bool;
    }
    get random() { return this[_RANDOM_PROP]; }

    // --- size ---
    set size(size)     { this[_EMBLEMS_PROP].forEach(emb => emb.size = size); }
    get size()         { return this[_EMBLEMS_PROP].map(emb => emb.size); }

    // --- duration ---
    set duration(time) { this[_EMBLEMS_PROP].forEach(emb => emb.duration = time); }
    get duration()     { return this[_EMBLEMS_PROP].map(emb => emb.duration); }

    // --- easing ---
    set easing(val)    { this[_EMBLEMS_PROP].forEach(emb => emb.easing = val); }
    get easing()       { return this[_EMBLEMS_PROP].map(emb => emb.easing); }

    // --- pedal ---
    set pedal(val)     { this[_EMBLEMS_PROP].forEach(emb => emb.pedal = val); }
    get pedal()        { return this[_EMBLEMS_PROP].map(emb => emb.pedal); }

    // --- emblems ---
    get emblems() { return this[_EMBLEMS_PROP]; }

    // --- isAnimating ---
    get isAnimating() { return this[_IS_ANIMATING_PROP]; }
}

function _transformToOKBlockArray(arg, opt) { // (string | [OKBlock], object) => [OKBlock] | false

    let res;
    switch (typeof arg) {
    case 'string':
        res = [].map.call(arg, c => new OKBlock(c, opt));
        break;
    case 'object':
        if (Array.isArray(arg) && arg.every(o => o instanceof OKBlock)) {
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

function _animateFromStringArray(strArr,opt) {
    this[_CANSELLER_PROP](); // cansel before animation.

    this[_IS_ANIMATING_PROP] = true;
    this[_RESUME_PROP]       = null;
    this.options             = opt;

    strArr.reduce((p, s, idx) => {
        let isLast = idx === strArr.length - 1;
        return p.then(() => {
            return new Promise((resolve, reject) => {
                this[_CANSELLER_PROP] = reject;
                if (this[_RANDOM_PROP]) {
                    let _s = strArr[Math.random() * strArr.length | 0];
                    this.map(_s);
                } else {
                    this.map(s);
                }
                if (isLast) {
                    if (this.loop) {
                        setTimeout(() => {
                            _animateFromStringArray.call(this, strArr);
                            resolve();
                        }, this.displayTime);
                        return;
                    } else {
                        this[_IS_ANIMATING_PROP] = false;
                        return;
                    }
                }
                if (!this[_IS_ANIMATING_PROP]) {
                    this[_RESUME_PROP] = resolve;
                } else {
                    setTimeout(resolve, this.displayTime);
                }
            });
        });
    }, Promise.resolve()).catch(() => { console.log('cansel before animation.'); });
}


export default OKBlocksGroup;
