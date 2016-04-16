import { computedStyles } from './helpers/computed_styles.js';
let { OKBlock } = require('@all-user/ok-blocks');
require('@all-user/ok-patterns-lines')(OKBlock);

document.addEventListener('DOMContentLoaded', () => {
  let wrapper    = document.querySelector('#wrapper');
  const { SIZE } = computedStyles();
  let size       = SIZE > 675 ? 675 : SIZE;
  const MARGIN   = size / 5;
  let sizeS      = MARGIN * 3;

  let init = 't';
  let olms = [];
  olms.push(new OKBlock(init[0], { pattern: 'Lines', size: sizeS }));
//     olms.push(new OKBlock(init[1], { pattern: 'Lines', size: sizeS }));
//     olms.push(new OKBlock(init[2], { pattern: 'Lines', size: sizeS }));
//     olms.push(new OKBlock(init[3], { pattern: 'Lines', size: sizeS }));
  olms.forEach(e => { e.dom.style.margin = `${ MARGIN }px auto`; });

  let input = document.querySelector('#user-input');

  olms.forEach(olm => {
    wrapper.appendChild(olm.dom);
  });

  input.addEventListener('input', e => {
    let str = (init + e.target.value).slice(-init.length);
    [...str].forEach((c, idx) => {
      olms[idx].to(c);
    });
  });
});