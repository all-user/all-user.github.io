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
    olms.push(new OKBlock(init[0], { size: sizeS, pattern: 'Olympic2020' }));
//     olms.push(new OKBlock(init[1], { size: sizeS }));
//     olms.push(new OKBlock(init[2], { size: sizeS }));
//     olms.push(new OKBlock(init[3], { size: sizeS }));
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
