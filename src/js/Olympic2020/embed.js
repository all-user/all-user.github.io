let { OKBlock } = require('@all-user/ok-blocks');
require('@all-user/ok-patterns-olympic2020')(OKBlock);
import { clickButtonHandler, getInputValues } from './helpers/embed_helper.js';

const PATTERN     = 'Olympic2020';
document.addEventListener('DOMContentLoaded', () => {
  let wrapper       = document.querySelector('#wrapper');
  let messageInput  = document.querySelector('#message');
  let embedOutput   = document.querySelector('#embed-output');
  let genButton     = document.querySelector('#generate-button');
  let codeButton    = document.querySelector('#embed-button');

  const TITLE_COPY  = 'tokyo  2020   olympic';
  const SHORT_COPY  = 'hi!!   ';
  const DATE_COPY   = '8/9:sun';
  const BLANK_COPY  = '       ';
  const LONG_COPY   = 'olympicparalympicgame';
  const COPYS       = [
    TITLE_COPY,
    LONG_COPY,
    SHORT_COPY,
    BLANK_COPY,
    '1234567890    ',
    BLANK_COPY,
    DATE_COPY,
    'happy  day!',
    BLANK_COPY,
    'hello  world!!'
  ];

  let params = {
    pattern: PATTERN,
    vertical: 3,
    horizon: 7,
    display: 1500,
    duration: 1000,
    msg: COPYS
  };

  messageInput.textContent = COPYS.join('\n');

  clickButtonHandler(params, wrapper);

  genButton.addEventListener('click', () => {
    let options = getInputValues();
    options.pattern = PATTERN;
    clickButtonHandler(options, wrapper);
    scroll(0, 0);
  });

  codeButton.addEventListener('click', () => {
    let embedCode = genEmbedCode();
    embedOutput.value = embedCode;
  });
});

function genEmbedCode() {
  let { width, height, vertical, horizon, display, duration, msg } = getInputValues();
  return `<iframe style="width:${ width };height:${ height };border:none;" src="https://all-user.github.io/ok-blocks/demos/Olympic2020/embed_response/index.html?vertical=${ vertical }&horizon=${ horizon }&display=${ display }&duration=${ duration }&msg=${ fixedEncodeURIComponent(msg) }&pattern=${ PATTERN }"></iframe>`;
}

function fixedEncodeURIComponent(str) {
  return encodeURIComponent(str).replace(/[!'()*]/g, function(c) {
    return '%' + c.charCodeAt(0).toString(16);
  });
}
