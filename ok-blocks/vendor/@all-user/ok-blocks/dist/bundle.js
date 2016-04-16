require=function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s}({1:[function(require,module,exports){module.exports=extend;var hasOwnProperty=Object.prototype.hasOwnProperty;function extend(){var target={};for(var i=0;i<arguments.length;i++){var source=arguments[i];for(var key in source){if(hasOwnProperty.call(source,key)){target[key]=source[key]}}}return target}},{}],2:[function(require,module,exports){"use strict";var _createClass=function(){function defineProperties(target,props){for(var i=0;i<props.length;i++){var descriptor=props[i];descriptor.enumerable=descriptor.enumerable||false;descriptor.configurable=true;if("value"in descriptor)descriptor.writable=true;Object.defineProperty(target,descriptor.key,descriptor)}}return function(Constructor,protoProps,staticProps){if(protoProps)defineProperties(Constructor.prototype,protoProps);if(staticProps)defineProperties(Constructor,staticProps);return Constructor}}();function _toConsumableArray(arr){if(Array.isArray(arr)){for(var i=0,arr2=Array(arr.length);i<arr.length;i++){arr2[i]=arr[i]}return arr2}else{return Array.from(arr)}}function _classCallCheck(instance,Constructor){if(!(instance instanceof Constructor)){throw new TypeError("Cannot call a class as a function")}}var extend=require("xtend");var _PATTERN_NAME_PROP=Symbol();var _PATTERN_PROP=Symbol();var _CHAR_PROP=Symbol();var _DOM_PROP=Symbol();var _DISPLAY_TIME_PROP=Symbol();var _DURATION_PROP=Symbol();var _EASING_PROP=Symbol();var _IS_ANIMATING_PROP=Symbol();var _RESUME_PROP=Symbol();var _LOOP_PROP=Symbol();var _RANDOM_PROP=Symbol();var _PEDAL_PROP=Symbol();var _CANSELLER_PROP=Symbol();var patterns={};var OKBlock=function(){function OKBlock(c){var options=arguments.length<=1||arguments[1]===undefined?{}:arguments[1];_classCallCheck(this,OKBlock);if(options.pattern==null){console.error("options.pattern is not set.")}if(patterns[options.pattern]==null){console.error(options.pattern+" pattern is undefined.");return}this[_PATTERN_NAME_PROP]=options.pattern;this[_PATTERN_PROP]=patterns[options.pattern];this[_IS_ANIMATING_PROP]=false;this[_RESUME_PROP]=null;this[_CHAR_PROP]=null;this[_DOM_PROP]=_createDom.call(this);this[_CANSELLER_PROP]=function(){};options=extend(this[_PATTERN_PROP]._DEFAULT_OPTIONS,options);var _options=options;var size=_options.size;var displayTime=_options.displayTime;var duration=_options.duration;var easing=_options.easing;var loop=_options.loop;var random=_options.random;var pedal=_options.pedal;this.displayTime=displayTime;this.duration=duration;this.loop=loop;this.random=random;this.easing=easing||"cubic-bezier(.26,.92,.41,.98)";this.pedal=pedal;if(typeof size==="number"&&size>=0){this.size=size}else{this.size=100}this.to(c)}_createClass(OKBlock,[{key:"to",value:function to(c){var _c=c&&c.toLowerCase&&c.toLowerCase();if(!this[_PATTERN_PROP]._formationTable[_c]){return false}if(this[_CHAR_PROP]===_c){return false}_changeStyle.call(this,_c);this[_CHAR_PROP]=_c;return true}},{key:"appendTo",value:function appendTo(parent){parent.appendChild(this[_DOM_PROP])}},{key:"stopAnimate",value:function stopAnimate(){this[_IS_ANIMATING_PROP]=false}},{key:"resumeAnimate",value:function resumeAnimate(){this[_IS_ANIMATING_PROP]=true;this[_RESUME_PROP]()}},{key:"animateFromString",value:function animateFromString(str,opt){var _this=this;this[_IS_ANIMATING_PROP]=true;this[_RESUME_PROP]=null;this.options=opt;[].concat(_toConsumableArray(str)).reduce(function(p,c,idx){var isLast=idx===str.length-1;return p.then(function(){return new Promise(function(resolve,reject){_this[_CANSELLER_PROP]=reject;if(_this[_RANDOM_PROP]){var _c=str[Math.random()*str.length|0];_this.to(_c)}else{_this.to(c)}if(isLast){if(_this[_LOOP_PROP]){setTimeout(function(){_this.animateFromString.call(_this,str);resolve()},_this[_DISPLAY_TIME_PROP]);return}else{setTimeout(reject,_this[_DISPLAY_TIME_PROP]);return}}if(!_this[_IS_ANIMATING_PROP]){_this[_RESUME_PROP]=resolve}else{setTimeout(resolve,_this[_DISPLAY_TIME_PROP])}})})},Promise.resolve()).catch(function(){_this[_IS_ANIMATING_PROP]=false})}},{key:"options",set:function set(){var options=arguments.length<=0||arguments[0]===undefined?{}:arguments[0];Object.assign(this,options)},get:function get(){var size=this.size;var displayTime=this.displayTime;var duration=this.duration;var easing=this.easing;var loop=this.loop;var random=this.random;var pedal=this.pedal;return{size:size,displayTime:displayTime,duration:duration,easing:easing,loop:loop,random:random,pedal:pedal}}},{key:"size",set:function set(size){if(size==null){return}if(typeof size==="number"&&size>=0){var domStyle=this[_DOM_PROP].style;domStyle.width=size+"px";domStyle.height=size+"px"}else{console.error("OKBlock.size should zero or positive number.")}},get:function get(){return+this[_DOM_PROP].style.width.replace("px","")}},{key:"displayTime",set:function set(time){if(time==null){return}if(typeof time==="number"&&time>0){this[_DISPLAY_TIME_PROP]=time}else{console.error("OKBlock.displayTime should be positive number.")}},get:function get(){return this[_DISPLAY_TIME_PROP]}},{key:"duration",set:function set(time){if(time==null){return}if(typeof time==="number"&&time>=0){this[_DURATION_PROP]=time;_updateTransitionConfig.call(this)}else{console.error("OKBlock.duration should be zero or positive number.")}},get:function get(){return this[_DURATION_PROP]}},{key:"easing",set:function set(val){if(val==null){return}this[_EASING_PROP]=val;_updateTransitionConfig.call(this)},get:function get(){return this[_EASING_PROP]}},{key:"loop",set:function set(bool){if(bool==null){return}this[_LOOP_PROP]=bool},get:function get(){return this[_LOOP_PROP]}},{key:"random",set:function set(bool){if(bool==null){return}this[_RANDOM_PROP]=bool},get:function get(){return this[_RANDOM_PROP]}},{key:"pedal",set:function set(bool){if(bool==null){return}this[_PEDAL_PROP]=bool},get:function get(){return this[_PEDAL_PROP]}},{key:"pattern",get:function get(){return this[_PATTERN_NAME_PROP]}},{key:"dom",get:function get(){return this[_DOM_PROP]}},{key:"char",get:function get(){return this[_CHAR_PROP]}},{key:"isAnimating",get:function get(){return this[_IS_ANIMATING_PROP]}},{key:"allValidChars",get:function get(){return Object.keys(this[_PATTERN_PROP]._formationTable)}}],[{key:"define",value:function define(name,obj){if(!("_DEFAULT_OPTIONS"in obj)||!("_BASE_DOM"in obj)||!("_TRANSITION_PROPS"in obj)||!("_formationTable"in obj)){console.error("Pattern is invalid.")}patterns[name]=obj}}]);return OKBlock}();function _createDom(){return this[_PATTERN_PROP]._BASE_DOM.cloneNode(true)}function _changeStyle(c){var oldC=this[_CHAR_PROP];var oldFormation=this[_PATTERN_PROP]._formationTable[oldC];var newFormation=this[_PATTERN_PROP]._formationTable[c];if(!newFormation){return}var diffFormation=void 0;if(oldC){diffFormation=newFormation.map(function(newStr,idx){var oldStr=oldFormation[idx];var newStrIsArr=Array.isArray(newStr);var oldStrIsArr=Array.isArray(oldStr);if(newStrIsArr&&oldStrIsArr){var strIsNotEq=newStr[0]!==oldStr[0];var posIsNotEq=newStr[1]!==oldStr[1];return strIsNotEq||posIsNotEq?newStr:false}else{if(newStrIsArr||oldStrIsArr){return newStr}return newStr!==oldStr?newStr:false}})}else{diffFormation=newFormation}[].concat(_toConsumableArray(this[_DOM_PROP].childNodes)).forEach(function(node,idx){var formation=diffFormation[idx];var specifyPos=Array.isArray(formation);if(!formation){return}var pos=void 0;if(specifyPos){pos=formation[1]}else{pos="pos_"+idx%3+"_"+(idx/3|0)}node.className=(specifyPos?formation[0]:formation)+" "+pos;if(node.classList.contains("rotate-default")){return}node.classList.add(_ROTATE_TABLE[Math.random()*4|0])})}function _updateTransitionConfig(){var _this2=this;var val=this[_PATTERN_PROP]._TRANSITION_PROPS.reduce(function(str,prop,idx){return""+str+(idx?",":"")+" "+prop+" "+_this2[_DURATION_PROP]+"ms "+_this2[_EASING_PROP]},"");_updateStyle(this[_DOM_PROP].childNodes);function _updateStyle(list){[].concat(_toConsumableArray(list)).forEach(function(node){node.style.transition=val;if(node.firstChild){_updateStyle(node.childNodes)}})}}var _ROTATE_TABLE=["rotate0","rotate90","rotate180","rotate270"];module.exports=OKBlock},{xtend:1}],3:[function(require,module,exports){"use strict";var _typeof=typeof Symbol==="function"&&typeof Symbol.iterator==="symbol"?function(obj){return typeof obj}:function(obj){return obj&&typeof Symbol==="function"&&obj.constructor===Symbol?"symbol":typeof obj};var _createClass=function(){function defineProperties(target,props){for(var i=0;i<props.length;i++){var descriptor=props[i];descriptor.enumerable=descriptor.enumerable||false;descriptor.configurable=true;if("value"in descriptor)descriptor.writable=true;Object.defineProperty(target,descriptor.key,descriptor)}}return function(Constructor,protoProps,staticProps){if(protoProps)defineProperties(Constructor.prototype,protoProps);if(staticProps)defineProperties(Constructor,staticProps);return Constructor}}();function _toConsumableArray(arr){if(Array.isArray(arr)){for(var i=0,arr2=Array(arr.length);i<arr.length;i++){arr2[i]=arr[i]}return arr2}else{return Array.from(arr)}}function _classCallCheck(instance,Constructor){if(!(instance instanceof Constructor)){throw new TypeError("Cannot call a class as a function")}}var OKBlock=require("./OKBlock.js");var _EMBLEMS_PROP=Symbol();var _DISPLAY_TIME_PROP=Symbol();var _IS_ANIMATING_PROP=Symbol();var _RESUME_PROP=Symbol();var _LOOP_PROP=Symbol();var _RANDOM_PROP=Symbol();var _CANSELLER_PROP=Symbol();var OKBlocksGroup=function(){function OKBlocksGroup(chars){var options=arguments.length<=1||arguments[1]===undefined?{}:arguments[1];_classCallCheck(this,OKBlocksGroup);var length=options.length;var displayTime=options.displayTime;var _options$loop=options.loop;var loop=_options$loop===undefined?false:_options$loop;var _options$random=options.random;var random=_options$random===undefined?false:_options$random;this[_IS_ANIMATING_PROP]=false;this[_RESUME_PROP]=null;this[_CANSELLER_PROP]=function(){};this.displayTime=displayTime|0||1500;this.loop=loop;this.random=random;if(typeof chars==="string"){if(typeof length!=="number"||chars.length<length){for(var i=chars.length;i<length;i++){chars+=" "}}else if(length!=null&&chars.length>length){chars=chars.slice(0,length)}}else{console.error("OKBlocksGroup constructor first argument should be string.")}delete options.loop;delete options.displayTime;delete options.random;var emblems=_transformToOKBlockArray(chars,options);if(emblems){this[_EMBLEMS_PROP]=emblems}else{throw new Error("OKBlocksGroup arguments expect string or array of OKBlock.")}}_createClass(OKBlocksGroup,[{key:"toString",value:function toString(){return this.emblems.map(function(e){return e.char}).join("")}},{key:"map",value:function map(str){this.emblems.forEach(function(emblem,idx){var c=str[idx];if(!c){c=" "}emblem.to(c)})}},{key:"appendTo",value:function appendTo(parent){var frag=this.emblems.reduce(function(f,e){f.appendChild(e.dom);return f},document.createDocumentFragment());parent.appendChild(frag)}},{key:"stopAnimate",value:function stopAnimate(){this[_IS_ANIMATING_PROP]=false}},{key:"resumeAnimate",value:function resumeAnimate(){this[_IS_ANIMATING_PROP]=true;this[_RESUME_PROP]()}},{key:"animateFromString",value:function animateFromString(str,opt){var _this=this;var strArr=void 0;if(typeof str==="string"){(function(){var len=_this.emblems.length;strArr=[].concat(_toConsumableArray(str)).reduce(function(arr,s,idx){if(idx%len===0){arr.push("")}arr[idx/len|0]+=s;return arr},[])})()}else if(Array.isArray(str)&&str.every(function(s){return typeof s==="string"})){strArr=str}else{console.error("OKBlocksGroup#animateFromString first argument should be string or array of string.")}_animateFromStringArray.call(this,strArr,opt)}},{key:"animateFromStringArray",value:function animateFromStringArray(strArr,opt){_animateFromStringArray.call(this,strArr,opt)}},{key:"options",set:function set(){var options=arguments.length<=0||arguments[0]===undefined?{}:arguments[0];Object.assign(this,options)},get:function get(){var length=this.length;var displayTime=this.displayTime;var loop=this.loop;var random=this.random;var size=this.size;var duration=this.duration;var easing=this.easing;var pedal=this.pedal;return{length:length,displayTime:displayTime,loop:loop,random:random,size:size,duration:duration,easing:easing,pedal:pedal}}},{key:"length",set:function set(lenNew){if(lenNew==null){return}var emblems=this[_EMBLEMS_PROP];var lenOld=emblems.length;if(lenNew>lenOld){var blankArr=Array.from({length:lenNew-lenOld},function(){return new OKBlock(" ",{pattern:emblems.slice(-1)[0].pattern})});this[_EMBLEMS_PROP]=emblems.concat(blankArr)}else if(lenNew<lenOld){this[_EMBLEMS_PROP]=emblems.slice(0,lenNew)}},get:function get(){return this[_EMBLEMS_PROP].length}},{key:"displayTime",set:function set(time){if(time==null){return}if(typeof time==="number"&&time>0){this[_DISPLAY_TIME_PROP]=time}else{console.error("OKBlocksGroup.displayTime should be positive number.")}},get:function get(){return this[_DISPLAY_TIME_PROP]}},{key:"loop",set:function set(bool){if(bool==null){return}this[_LOOP_PROP]=bool},get:function get(){return this[_LOOP_PROP]}},{key:"random",set:function set(bool){if(bool==null){return}this[_RANDOM_PROP]=bool},get:function get(){return this[_RANDOM_PROP]}},{key:"size",set:function set(size){this[_EMBLEMS_PROP].forEach(function(emb){return emb.size=size})},get:function get(){return this[_EMBLEMS_PROP].map(function(emb){return emb.size})}},{key:"duration",set:function set(time){this[_EMBLEMS_PROP].forEach(function(emb){return emb.duration=time})},get:function get(){return this[_EMBLEMS_PROP].map(function(emb){return emb.duration})}},{key:"easing",set:function set(val){this[_EMBLEMS_PROP].forEach(function(emb){return emb.easing=val})},get:function get(){return this[_EMBLEMS_PROP].map(function(emb){return emb.easing})}},{key:"pedal",set:function set(val){this[_EMBLEMS_PROP].forEach(function(emb){return emb.pedal=val})},get:function get(){return this[_EMBLEMS_PROP].map(function(emb){return emb.pedal})}},{key:"emblems",get:function get(){return this[_EMBLEMS_PROP]}},{key:"isAnimating",get:function get(){return this[_IS_ANIMATING_PROP]}}]);return OKBlocksGroup}();function _transformToOKBlockArray(arg,opt){var res=void 0;switch(typeof arg==="undefined"?"undefined":_typeof(arg)){case"string":res=[].concat(_toConsumableArray(arg)).map(function(c){return new OKBlock(c,opt)});break;case"object":if(Array.isArray(arg)&&arg.every(function(o){return o instanceof OKBlock})){res=arg}else{res=false}break;default:res=false}return res}function _animateFromStringArray(strArr,opt){var _this2=this;this[_CANSELLER_PROP]();this[_IS_ANIMATING_PROP]=true;this[_RESUME_PROP]=null;this.options=opt;strArr.reduce(function(p,s,idx){var isLast=idx===strArr.length-1;return p.then(function(){return new Promise(function(resolve,reject){_this2[_CANSELLER_PROP]=reject;if(_this2[_RANDOM_PROP]){var _s=strArr[Math.random()*strArr.length|0];_this2.map(_s)}else{_this2.map(s)}if(isLast){if(_this2.loop){setTimeout(function(){_animateFromStringArray.call(_this2,strArr);resolve()},_this2.displayTime);return}else{_this2[_IS_ANIMATING_PROP]=false;return}}if(!_this2[_IS_ANIMATING_PROP]){_this2[_RESUME_PROP]=resolve}else{setTimeout(resolve,_this2.displayTime)}})})},Promise.resolve()).catch(function(){console.log("cansel before animation.")})}module.exports=OKBlocksGroup},{"./OKBlock.js":2}],"@all-user/ok-blocks":[function(require,module,exports){"use strict";module.exports.OKBlock=require("./OKBlock.js");module.exports.OKBlocksGroup=require("./OKBlocksGroup.js")},{"./OKBlock.js":2,"./OKBlocksGroup.js":3}]},{},[]);