'use strict'

import { computedStyles } from './helpers/computed_styles.js';

document.addEventListener('DOMContentLoaded', () => {
    let wrapper    = document.querySelector('#wrapper');
    const { SIZE } = computedStyles();
    let size       = SIZE > 675 ? 675 : SIZE;
    const MARGIN   = size / 5;
    let sizeS      = MARGIN * 3;

    let init = 't';
    let olms = [];
    olms.push(new Emblem(init[0], { pattern: 'Lines', size: sizeS }));
//     olms.push(new Emblem(init[1], { pattern: 'Lines', size: sizeS }));
//     olms.push(new Emblem(init[2], { pattern: 'Lines', size: sizeS }));
//     olms.push(new Emblem(init[3], { pattern: 'Lines', size: sizeS }));
    olms.forEach(e => { e.dom.style.margin = `${ MARGIN }px auto`; });

    let input   = document.querySelector('#user-input');
    const allValidChars = olms[0].allValidChars;

    olms.forEach(olm => {
        wrapper.appendChild(olm.dom);
    });

    input.addEventListener('input', e => {
        let str = (init + e.target.value).slice(-init.length);
        [].forEach.call(str, (c, idx) => {
            olms[idx].to(c);
        });
    });
});
