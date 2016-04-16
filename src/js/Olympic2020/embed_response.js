let { OKBlock } = require('@all-user/ok-blocks');
require('@all-user/ok-patterns-olympic2020')(OKBlock);
import { clickButtonHandler } from './helpers/embed_helper.js';

document.addEventListener('DOMContentLoaded', () => {
  let pairs  = decodeURIComponent(location.search.slice(1)).split('&');
  let params = pairs.reduce((params, s) => {
    let keyValue = s.split('=');
    params[keyValue[0]] = keyValue[1];
    return params;
  }, {});

  params.msg = params.msg.split(',');

  clickButtonHandler(params, document.querySelector('#wrapper'));
});
