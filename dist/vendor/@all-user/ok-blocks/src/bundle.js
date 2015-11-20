(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
module.exports = { "default": require("core-js/library/fn/array/from"), __esModule: true };
},{"core-js/library/fn/array/from":9}],2:[function(require,module,exports){
module.exports = { "default": require("core-js/library/fn/object/define-property"), __esModule: true };
},{"core-js/library/fn/object/define-property":10}],3:[function(require,module,exports){
module.exports = { "default": require("core-js/library/fn/object/keys"), __esModule: true };
},{"core-js/library/fn/object/keys":11}],4:[function(require,module,exports){
module.exports = { "default": require("core-js/library/fn/promise"), __esModule: true };
},{"core-js/library/fn/promise":12}],5:[function(require,module,exports){
module.exports = { "default": require("core-js/library/fn/symbol"), __esModule: true };
},{"core-js/library/fn/symbol":13}],6:[function(require,module,exports){
"use strict";

exports["default"] = function (instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
};

exports.__esModule = true;
},{}],7:[function(require,module,exports){
"use strict";

var _Object$defineProperty = require("babel-runtime/core-js/object/define-property")["default"];

exports["default"] = (function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;

      _Object$defineProperty(target, descriptor.key, descriptor);
    }
  }

  return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);
    if (staticProps) defineProperties(Constructor, staticProps);
    return Constructor;
  };
})();

exports.__esModule = true;
},{"babel-runtime/core-js/object/define-property":2}],8:[function(require,module,exports){
"use strict";

exports["default"] = function (obj) {
  return obj && obj.__esModule ? obj : {
    "default": obj
  };
};

exports.__esModule = true;
},{}],9:[function(require,module,exports){
require('../../modules/es6.string.iterator');
require('../../modules/es6.array.from');
module.exports = require('../../modules/$.core').Array.from;
},{"../../modules/$.core":19,"../../modules/es6.array.from":68,"../../modules/es6.string.iterator":73}],10:[function(require,module,exports){
var $ = require('../../modules/$');
module.exports = function defineProperty(it, key, desc){
  return $.setDesc(it, key, desc);
};
},{"../../modules/$":44}],11:[function(require,module,exports){
require('../../modules/es6.object.keys');
module.exports = require('../../modules/$.core').Object.keys;
},{"../../modules/$.core":19,"../../modules/es6.object.keys":70}],12:[function(require,module,exports){
require('../modules/es6.object.to-string');
require('../modules/es6.string.iterator');
require('../modules/web.dom.iterable');
require('../modules/es6.promise');
module.exports = require('../modules/$.core').Promise;
},{"../modules/$.core":19,"../modules/es6.object.to-string":71,"../modules/es6.promise":72,"../modules/es6.string.iterator":73,"../modules/web.dom.iterable":75}],13:[function(require,module,exports){
require('../../modules/es6.symbol');
require('../../modules/es6.object.to-string');
module.exports = require('../../modules/$.core').Symbol;
},{"../../modules/$.core":19,"../../modules/es6.object.to-string":71,"../../modules/es6.symbol":74}],14:[function(require,module,exports){
module.exports = function(it){
  if(typeof it != 'function')throw TypeError(it + ' is not a function!');
  return it;
};
},{}],15:[function(require,module,exports){
module.exports = function(){ /* empty */ };
},{}],16:[function(require,module,exports){
var isObject = require('./$.is-object');
module.exports = function(it){
  if(!isObject(it))throw TypeError(it + ' is not an object!');
  return it;
};
},{"./$.is-object":37}],17:[function(require,module,exports){
// getting tag from 19.1.3.6 Object.prototype.toString()
var cof = require('./$.cof')
  , TAG = require('./$.wks')('toStringTag')
  // ES3 wrong here
  , ARG = cof(function(){ return arguments; }()) == 'Arguments';

module.exports = function(it){
  var O, T, B;
  return it === undefined ? 'Undefined' : it === null ? 'Null'
    // @@toStringTag case
    : typeof (T = (O = Object(it))[TAG]) == 'string' ? T
    // builtinTag case
    : ARG ? cof(O)
    // ES3 arguments fallback
    : (B = cof(O)) == 'Object' && typeof O.callee == 'function' ? 'Arguments' : B;
};
},{"./$.cof":18,"./$.wks":66}],18:[function(require,module,exports){
var toString = {}.toString;

module.exports = function(it){
  return toString.call(it).slice(8, -1);
};
},{}],19:[function(require,module,exports){
var core = module.exports = {version: '1.2.6'};
if(typeof __e == 'number')__e = core; // eslint-disable-line no-undef
},{}],20:[function(require,module,exports){
// optional / simple context binding
var aFunction = require('./$.a-function');
module.exports = function(fn, that, length){
  aFunction(fn);
  if(that === undefined)return fn;
  switch(length){
    case 1: return function(a){
      return fn.call(that, a);
    };
    case 2: return function(a, b){
      return fn.call(that, a, b);
    };
    case 3: return function(a, b, c){
      return fn.call(that, a, b, c);
    };
  }
  return function(/* ...args */){
    return fn.apply(that, arguments);
  };
};
},{"./$.a-function":14}],21:[function(require,module,exports){
// 7.2.1 RequireObjectCoercible(argument)
module.exports = function(it){
  if(it == undefined)throw TypeError("Can't call method on  " + it);
  return it;
};
},{}],22:[function(require,module,exports){
// Thank's IE8 for his funny defineProperty
module.exports = !require('./$.fails')(function(){
  return Object.defineProperty({}, 'a', {get: function(){ return 7; }}).a != 7;
});
},{"./$.fails":26}],23:[function(require,module,exports){
var isObject = require('./$.is-object')
  , document = require('./$.global').document
  // in old IE typeof document.createElement is 'object'
  , is = isObject(document) && isObject(document.createElement);
module.exports = function(it){
  return is ? document.createElement(it) : {};
};
},{"./$.global":29,"./$.is-object":37}],24:[function(require,module,exports){
// all enumerable object keys, includes symbols
var $ = require('./$');
module.exports = function(it){
  var keys       = $.getKeys(it)
    , getSymbols = $.getSymbols;
  if(getSymbols){
    var symbols = getSymbols(it)
      , isEnum  = $.isEnum
      , i       = 0
      , key;
    while(symbols.length > i)if(isEnum.call(it, key = symbols[i++]))keys.push(key);
  }
  return keys;
};
},{"./$":44}],25:[function(require,module,exports){
var global    = require('./$.global')
  , core      = require('./$.core')
  , ctx       = require('./$.ctx')
  , PROTOTYPE = 'prototype';

var $export = function(type, name, source){
  var IS_FORCED = type & $export.F
    , IS_GLOBAL = type & $export.G
    , IS_STATIC = type & $export.S
    , IS_PROTO  = type & $export.P
    , IS_BIND   = type & $export.B
    , IS_WRAP   = type & $export.W
    , exports   = IS_GLOBAL ? core : core[name] || (core[name] = {})
    , target    = IS_GLOBAL ? global : IS_STATIC ? global[name] : (global[name] || {})[PROTOTYPE]
    , key, own, out;
  if(IS_GLOBAL)source = name;
  for(key in source){
    // contains in native
    own = !IS_FORCED && target && key in target;
    if(own && key in exports)continue;
    // export native or passed
    out = own ? target[key] : source[key];
    // prevent global pollution for namespaces
    exports[key] = IS_GLOBAL && typeof target[key] != 'function' ? source[key]
    // bind timers to global for call from export context
    : IS_BIND && own ? ctx(out, global)
    // wrap global constructors for prevent change them in library
    : IS_WRAP && target[key] == out ? (function(C){
      var F = function(param){
        return this instanceof C ? new C(param) : C(param);
      };
      F[PROTOTYPE] = C[PROTOTYPE];
      return F;
    // make static versions for prototype methods
    })(out) : IS_PROTO && typeof out == 'function' ? ctx(Function.call, out) : out;
    if(IS_PROTO)(exports[PROTOTYPE] || (exports[PROTOTYPE] = {}))[key] = out;
  }
};
// type bitmap
$export.F = 1;  // forced
$export.G = 2;  // global
$export.S = 4;  // static
$export.P = 8;  // proto
$export.B = 16; // bind
$export.W = 32; // wrap
module.exports = $export;
},{"./$.core":19,"./$.ctx":20,"./$.global":29}],26:[function(require,module,exports){
module.exports = function(exec){
  try {
    return !!exec();
  } catch(e){
    return true;
  }
};
},{}],27:[function(require,module,exports){
var ctx         = require('./$.ctx')
  , call        = require('./$.iter-call')
  , isArrayIter = require('./$.is-array-iter')
  , anObject    = require('./$.an-object')
  , toLength    = require('./$.to-length')
  , getIterFn   = require('./core.get-iterator-method');
module.exports = function(iterable, entries, fn, that){
  var iterFn = getIterFn(iterable)
    , f      = ctx(fn, that, entries ? 2 : 1)
    , index  = 0
    , length, step, iterator;
  if(typeof iterFn != 'function')throw TypeError(iterable + ' is not iterable!');
  // fast case for arrays with default iterator
  if(isArrayIter(iterFn))for(length = toLength(iterable.length); length > index; index++){
    entries ? f(anObject(step = iterable[index])[0], step[1]) : f(iterable[index]);
  } else for(iterator = iterFn.call(iterable); !(step = iterator.next()).done; ){
    call(iterator, f, step.value, entries);
  }
};
},{"./$.an-object":16,"./$.ctx":20,"./$.is-array-iter":35,"./$.iter-call":38,"./$.to-length":63,"./core.get-iterator-method":67}],28:[function(require,module,exports){
// fallback for IE11 buggy Object.getOwnPropertyNames with iframe and window
var toIObject = require('./$.to-iobject')
  , getNames  = require('./$').getNames
  , toString  = {}.toString;

var windowNames = typeof window == 'object' && Object.getOwnPropertyNames
  ? Object.getOwnPropertyNames(window) : [];

var getWindowNames = function(it){
  try {
    return getNames(it);
  } catch(e){
    return windowNames.slice();
  }
};

module.exports.get = function getOwnPropertyNames(it){
  if(windowNames && toString.call(it) == '[object Window]')return getWindowNames(it);
  return getNames(toIObject(it));
};
},{"./$":44,"./$.to-iobject":62}],29:[function(require,module,exports){
// https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
var global = module.exports = typeof window != 'undefined' && window.Math == Math
  ? window : typeof self != 'undefined' && self.Math == Math ? self : Function('return this')();
if(typeof __g == 'number')__g = global; // eslint-disable-line no-undef
},{}],30:[function(require,module,exports){
var hasOwnProperty = {}.hasOwnProperty;
module.exports = function(it, key){
  return hasOwnProperty.call(it, key);
};
},{}],31:[function(require,module,exports){
var $          = require('./$')
  , createDesc = require('./$.property-desc');
module.exports = require('./$.descriptors') ? function(object, key, value){
  return $.setDesc(object, key, createDesc(1, value));
} : function(object, key, value){
  object[key] = value;
  return object;
};
},{"./$":44,"./$.descriptors":22,"./$.property-desc":49}],32:[function(require,module,exports){
module.exports = require('./$.global').document && document.documentElement;
},{"./$.global":29}],33:[function(require,module,exports){
// fast apply, http://jsperf.lnkit.com/fast-apply/5
module.exports = function(fn, args, that){
  var un = that === undefined;
  switch(args.length){
    case 0: return un ? fn()
                      : fn.call(that);
    case 1: return un ? fn(args[0])
                      : fn.call(that, args[0]);
    case 2: return un ? fn(args[0], args[1])
                      : fn.call(that, args[0], args[1]);
    case 3: return un ? fn(args[0], args[1], args[2])
                      : fn.call(that, args[0], args[1], args[2]);
    case 4: return un ? fn(args[0], args[1], args[2], args[3])
                      : fn.call(that, args[0], args[1], args[2], args[3]);
  } return              fn.apply(that, args);
};
},{}],34:[function(require,module,exports){
// fallback for non-array-like ES3 and non-enumerable old V8 strings
var cof = require('./$.cof');
module.exports = Object('z').propertyIsEnumerable(0) ? Object : function(it){
  return cof(it) == 'String' ? it.split('') : Object(it);
};
},{"./$.cof":18}],35:[function(require,module,exports){
// check on default Array iterator
var Iterators  = require('./$.iterators')
  , ITERATOR   = require('./$.wks')('iterator')
  , ArrayProto = Array.prototype;

module.exports = function(it){
  return it !== undefined && (Iterators.Array === it || ArrayProto[ITERATOR] === it);
};
},{"./$.iterators":43,"./$.wks":66}],36:[function(require,module,exports){
// 7.2.2 IsArray(argument)
var cof = require('./$.cof');
module.exports = Array.isArray || function(arg){
  return cof(arg) == 'Array';
};
},{"./$.cof":18}],37:[function(require,module,exports){
module.exports = function(it){
  return typeof it === 'object' ? it !== null : typeof it === 'function';
};
},{}],38:[function(require,module,exports){
// call something on iterator step with safe closing on error
var anObject = require('./$.an-object');
module.exports = function(iterator, fn, value, entries){
  try {
    return entries ? fn(anObject(value)[0], value[1]) : fn(value);
  // 7.4.6 IteratorClose(iterator, completion)
  } catch(e){
    var ret = iterator['return'];
    if(ret !== undefined)anObject(ret.call(iterator));
    throw e;
  }
};
},{"./$.an-object":16}],39:[function(require,module,exports){
'use strict';
var $              = require('./$')
  , descriptor     = require('./$.property-desc')
  , setToStringTag = require('./$.set-to-string-tag')
  , IteratorPrototype = {};

// 25.1.2.1.1 %IteratorPrototype%[@@iterator]()
require('./$.hide')(IteratorPrototype, require('./$.wks')('iterator'), function(){ return this; });

module.exports = function(Constructor, NAME, next){
  Constructor.prototype = $.create(IteratorPrototype, {next: descriptor(1, next)});
  setToStringTag(Constructor, NAME + ' Iterator');
};
},{"./$":44,"./$.hide":31,"./$.property-desc":49,"./$.set-to-string-tag":55,"./$.wks":66}],40:[function(require,module,exports){
'use strict';
var LIBRARY        = require('./$.library')
  , $export        = require('./$.export')
  , redefine       = require('./$.redefine')
  , hide           = require('./$.hide')
  , has            = require('./$.has')
  , Iterators      = require('./$.iterators')
  , $iterCreate    = require('./$.iter-create')
  , setToStringTag = require('./$.set-to-string-tag')
  , getProto       = require('./$').getProto
  , ITERATOR       = require('./$.wks')('iterator')
  , BUGGY          = !([].keys && 'next' in [].keys()) // Safari has buggy iterators w/o `next`
  , FF_ITERATOR    = '@@iterator'
  , KEYS           = 'keys'
  , VALUES         = 'values';

var returnThis = function(){ return this; };

module.exports = function(Base, NAME, Constructor, next, DEFAULT, IS_SET, FORCED){
  $iterCreate(Constructor, NAME, next);
  var getMethod = function(kind){
    if(!BUGGY && kind in proto)return proto[kind];
    switch(kind){
      case KEYS: return function keys(){ return new Constructor(this, kind); };
      case VALUES: return function values(){ return new Constructor(this, kind); };
    } return function entries(){ return new Constructor(this, kind); };
  };
  var TAG        = NAME + ' Iterator'
    , DEF_VALUES = DEFAULT == VALUES
    , VALUES_BUG = false
    , proto      = Base.prototype
    , $native    = proto[ITERATOR] || proto[FF_ITERATOR] || DEFAULT && proto[DEFAULT]
    , $default   = $native || getMethod(DEFAULT)
    , methods, key;
  // Fix native
  if($native){
    var IteratorPrototype = getProto($default.call(new Base));
    // Set @@toStringTag to native iterators
    setToStringTag(IteratorPrototype, TAG, true);
    // FF fix
    if(!LIBRARY && has(proto, FF_ITERATOR))hide(IteratorPrototype, ITERATOR, returnThis);
    // fix Array#{values, @@iterator}.name in V8 / FF
    if(DEF_VALUES && $native.name !== VALUES){
      VALUES_BUG = true;
      $default = function values(){ return $native.call(this); };
    }
  }
  // Define iterator
  if((!LIBRARY || FORCED) && (BUGGY || VALUES_BUG || !proto[ITERATOR])){
    hide(proto, ITERATOR, $default);
  }
  // Plug for library
  Iterators[NAME] = $default;
  Iterators[TAG]  = returnThis;
  if(DEFAULT){
    methods = {
      values:  DEF_VALUES  ? $default : getMethod(VALUES),
      keys:    IS_SET      ? $default : getMethod(KEYS),
      entries: !DEF_VALUES ? $default : getMethod('entries')
    };
    if(FORCED)for(key in methods){
      if(!(key in proto))redefine(proto, key, methods[key]);
    } else $export($export.P + $export.F * (BUGGY || VALUES_BUG), NAME, methods);
  }
  return methods;
};
},{"./$":44,"./$.export":25,"./$.has":30,"./$.hide":31,"./$.iter-create":39,"./$.iterators":43,"./$.library":46,"./$.redefine":51,"./$.set-to-string-tag":55,"./$.wks":66}],41:[function(require,module,exports){
var ITERATOR     = require('./$.wks')('iterator')
  , SAFE_CLOSING = false;

try {
  var riter = [7][ITERATOR]();
  riter['return'] = function(){ SAFE_CLOSING = true; };
  Array.from(riter, function(){ throw 2; });
} catch(e){ /* empty */ }

module.exports = function(exec, skipClosing){
  if(!skipClosing && !SAFE_CLOSING)return false;
  var safe = false;
  try {
    var arr  = [7]
      , iter = arr[ITERATOR]();
    iter.next = function(){ safe = true; };
    arr[ITERATOR] = function(){ return iter; };
    exec(arr);
  } catch(e){ /* empty */ }
  return safe;
};
},{"./$.wks":66}],42:[function(require,module,exports){
module.exports = function(done, value){
  return {value: value, done: !!done};
};
},{}],43:[function(require,module,exports){
module.exports = {};
},{}],44:[function(require,module,exports){
var $Object = Object;
module.exports = {
  create:     $Object.create,
  getProto:   $Object.getPrototypeOf,
  isEnum:     {}.propertyIsEnumerable,
  getDesc:    $Object.getOwnPropertyDescriptor,
  setDesc:    $Object.defineProperty,
  setDescs:   $Object.defineProperties,
  getKeys:    $Object.keys,
  getNames:   $Object.getOwnPropertyNames,
  getSymbols: $Object.getOwnPropertySymbols,
  each:       [].forEach
};
},{}],45:[function(require,module,exports){
var $         = require('./$')
  , toIObject = require('./$.to-iobject');
module.exports = function(object, el){
  var O      = toIObject(object)
    , keys   = $.getKeys(O)
    , length = keys.length
    , index  = 0
    , key;
  while(length > index)if(O[key = keys[index++]] === el)return key;
};
},{"./$":44,"./$.to-iobject":62}],46:[function(require,module,exports){
module.exports = true;
},{}],47:[function(require,module,exports){
var global    = require('./$.global')
  , macrotask = require('./$.task').set
  , Observer  = global.MutationObserver || global.WebKitMutationObserver
  , process   = global.process
  , Promise   = global.Promise
  , isNode    = require('./$.cof')(process) == 'process'
  , head, last, notify;

var flush = function(){
  var parent, domain, fn;
  if(isNode && (parent = process.domain)){
    process.domain = null;
    parent.exit();
  }
  while(head){
    domain = head.domain;
    fn     = head.fn;
    if(domain)domain.enter();
    fn(); // <- currently we use it only for Promise - try / catch not required
    if(domain)domain.exit();
    head = head.next;
  } last = undefined;
  if(parent)parent.enter();
};

// Node.js
if(isNode){
  notify = function(){
    process.nextTick(flush);
  };
// browsers with MutationObserver
} else if(Observer){
  var toggle = 1
    , node   = document.createTextNode('');
  new Observer(flush).observe(node, {characterData: true}); // eslint-disable-line no-new
  notify = function(){
    node.data = toggle = -toggle;
  };
// environments with maybe non-completely correct, but existent Promise
} else if(Promise && Promise.resolve){
  notify = function(){
    Promise.resolve().then(flush);
  };
// for other environments - macrotask based on:
// - setImmediate
// - MessageChannel
// - window.postMessag
// - onreadystatechange
// - setTimeout
} else {
  notify = function(){
    // strange IE + webpack dev server bug - use .call(global)
    macrotask.call(global, flush);
  };
}

module.exports = function asap(fn){
  var task = {fn: fn, next: undefined, domain: isNode && process.domain};
  if(last)last.next = task;
  if(!head){
    head = task;
    notify();
  } last = task;
};
},{"./$.cof":18,"./$.global":29,"./$.task":60}],48:[function(require,module,exports){
// most Object methods by ES6 should accept primitives
var $export = require('./$.export')
  , core    = require('./$.core')
  , fails   = require('./$.fails');
module.exports = function(KEY, exec){
  var fn  = (core.Object || {})[KEY] || Object[KEY]
    , exp = {};
  exp[KEY] = exec(fn);
  $export($export.S + $export.F * fails(function(){ fn(1); }), 'Object', exp);
};
},{"./$.core":19,"./$.export":25,"./$.fails":26}],49:[function(require,module,exports){
module.exports = function(bitmap, value){
  return {
    enumerable  : !(bitmap & 1),
    configurable: !(bitmap & 2),
    writable    : !(bitmap & 4),
    value       : value
  };
};
},{}],50:[function(require,module,exports){
var redefine = require('./$.redefine');
module.exports = function(target, src){
  for(var key in src)redefine(target, key, src[key]);
  return target;
};
},{"./$.redefine":51}],51:[function(require,module,exports){
module.exports = require('./$.hide');
},{"./$.hide":31}],52:[function(require,module,exports){
// 7.2.9 SameValue(x, y)
module.exports = Object.is || function is(x, y){
  return x === y ? x !== 0 || 1 / x === 1 / y : x != x && y != y;
};
},{}],53:[function(require,module,exports){
// Works with __proto__ only. Old v8 can't work with null proto objects.
/* eslint-disable no-proto */
var getDesc  = require('./$').getDesc
  , isObject = require('./$.is-object')
  , anObject = require('./$.an-object');
var check = function(O, proto){
  anObject(O);
  if(!isObject(proto) && proto !== null)throw TypeError(proto + ": can't set as prototype!");
};
module.exports = {
  set: Object.setPrototypeOf || ('__proto__' in {} ? // eslint-disable-line
    function(test, buggy, set){
      try {
        set = require('./$.ctx')(Function.call, getDesc(Object.prototype, '__proto__').set, 2);
        set(test, []);
        buggy = !(test instanceof Array);
      } catch(e){ buggy = true; }
      return function setPrototypeOf(O, proto){
        check(O, proto);
        if(buggy)O.__proto__ = proto;
        else set(O, proto);
        return O;
      };
    }({}, false) : undefined),
  check: check
};
},{"./$":44,"./$.an-object":16,"./$.ctx":20,"./$.is-object":37}],54:[function(require,module,exports){
'use strict';
var core        = require('./$.core')
  , $           = require('./$')
  , DESCRIPTORS = require('./$.descriptors')
  , SPECIES     = require('./$.wks')('species');

module.exports = function(KEY){
  var C = core[KEY];
  if(DESCRIPTORS && C && !C[SPECIES])$.setDesc(C, SPECIES, {
    configurable: true,
    get: function(){ return this; }
  });
};
},{"./$":44,"./$.core":19,"./$.descriptors":22,"./$.wks":66}],55:[function(require,module,exports){
var def = require('./$').setDesc
  , has = require('./$.has')
  , TAG = require('./$.wks')('toStringTag');

module.exports = function(it, tag, stat){
  if(it && !has(it = stat ? it : it.prototype, TAG))def(it, TAG, {configurable: true, value: tag});
};
},{"./$":44,"./$.has":30,"./$.wks":66}],56:[function(require,module,exports){
var global = require('./$.global')
  , SHARED = '__core-js_shared__'
  , store  = global[SHARED] || (global[SHARED] = {});
module.exports = function(key){
  return store[key] || (store[key] = {});
};
},{"./$.global":29}],57:[function(require,module,exports){
// 7.3.20 SpeciesConstructor(O, defaultConstructor)
var anObject  = require('./$.an-object')
  , aFunction = require('./$.a-function')
  , SPECIES   = require('./$.wks')('species');
module.exports = function(O, D){
  var C = anObject(O).constructor, S;
  return C === undefined || (S = anObject(C)[SPECIES]) == undefined ? D : aFunction(S);
};
},{"./$.a-function":14,"./$.an-object":16,"./$.wks":66}],58:[function(require,module,exports){
module.exports = function(it, Constructor, name){
  if(!(it instanceof Constructor))throw TypeError(name + ": use the 'new' operator!");
  return it;
};
},{}],59:[function(require,module,exports){
var toInteger = require('./$.to-integer')
  , defined   = require('./$.defined');
// true  -> String#at
// false -> String#codePointAt
module.exports = function(TO_STRING){
  return function(that, pos){
    var s = String(defined(that))
      , i = toInteger(pos)
      , l = s.length
      , a, b;
    if(i < 0 || i >= l)return TO_STRING ? '' : undefined;
    a = s.charCodeAt(i);
    return a < 0xd800 || a > 0xdbff || i + 1 === l || (b = s.charCodeAt(i + 1)) < 0xdc00 || b > 0xdfff
      ? TO_STRING ? s.charAt(i) : a
      : TO_STRING ? s.slice(i, i + 2) : (a - 0xd800 << 10) + (b - 0xdc00) + 0x10000;
  };
};
},{"./$.defined":21,"./$.to-integer":61}],60:[function(require,module,exports){
var ctx                = require('./$.ctx')
  , invoke             = require('./$.invoke')
  , html               = require('./$.html')
  , cel                = require('./$.dom-create')
  , global             = require('./$.global')
  , process            = global.process
  , setTask            = global.setImmediate
  , clearTask          = global.clearImmediate
  , MessageChannel     = global.MessageChannel
  , counter            = 0
  , queue              = {}
  , ONREADYSTATECHANGE = 'onreadystatechange'
  , defer, channel, port;
var run = function(){
  var id = +this;
  if(queue.hasOwnProperty(id)){
    var fn = queue[id];
    delete queue[id];
    fn();
  }
};
var listner = function(event){
  run.call(event.data);
};
// Node.js 0.9+ & IE10+ has setImmediate, otherwise:
if(!setTask || !clearTask){
  setTask = function setImmediate(fn){
    var args = [], i = 1;
    while(arguments.length > i)args.push(arguments[i++]);
    queue[++counter] = function(){
      invoke(typeof fn == 'function' ? fn : Function(fn), args);
    };
    defer(counter);
    return counter;
  };
  clearTask = function clearImmediate(id){
    delete queue[id];
  };
  // Node.js 0.8-
  if(require('./$.cof')(process) == 'process'){
    defer = function(id){
      process.nextTick(ctx(run, id, 1));
    };
  // Browsers with MessageChannel, includes WebWorkers
  } else if(MessageChannel){
    channel = new MessageChannel;
    port    = channel.port2;
    channel.port1.onmessage = listner;
    defer = ctx(port.postMessage, port, 1);
  // Browsers with postMessage, skip WebWorkers
  // IE8 has postMessage, but it's sync & typeof its postMessage is 'object'
  } else if(global.addEventListener && typeof postMessage == 'function' && !global.importScripts){
    defer = function(id){
      global.postMessage(id + '', '*');
    };
    global.addEventListener('message', listner, false);
  // IE8-
  } else if(ONREADYSTATECHANGE in cel('script')){
    defer = function(id){
      html.appendChild(cel('script'))[ONREADYSTATECHANGE] = function(){
        html.removeChild(this);
        run.call(id);
      };
    };
  // Rest old browsers
  } else {
    defer = function(id){
      setTimeout(ctx(run, id, 1), 0);
    };
  }
}
module.exports = {
  set:   setTask,
  clear: clearTask
};
},{"./$.cof":18,"./$.ctx":20,"./$.dom-create":23,"./$.global":29,"./$.html":32,"./$.invoke":33}],61:[function(require,module,exports){
// 7.1.4 ToInteger
var ceil  = Math.ceil
  , floor = Math.floor;
module.exports = function(it){
  return isNaN(it = +it) ? 0 : (it > 0 ? floor : ceil)(it);
};
},{}],62:[function(require,module,exports){
// to indexed object, toObject with fallback for non-array-like ES3 strings
var IObject = require('./$.iobject')
  , defined = require('./$.defined');
module.exports = function(it){
  return IObject(defined(it));
};
},{"./$.defined":21,"./$.iobject":34}],63:[function(require,module,exports){
// 7.1.15 ToLength
var toInteger = require('./$.to-integer')
  , min       = Math.min;
module.exports = function(it){
  return it > 0 ? min(toInteger(it), 0x1fffffffffffff) : 0; // pow(2, 53) - 1 == 9007199254740991
};
},{"./$.to-integer":61}],64:[function(require,module,exports){
// 7.1.13 ToObject(argument)
var defined = require('./$.defined');
module.exports = function(it){
  return Object(defined(it));
};
},{"./$.defined":21}],65:[function(require,module,exports){
var id = 0
  , px = Math.random();
module.exports = function(key){
  return 'Symbol('.concat(key === undefined ? '' : key, ')_', (++id + px).toString(36));
};
},{}],66:[function(require,module,exports){
var store  = require('./$.shared')('wks')
  , uid    = require('./$.uid')
  , Symbol = require('./$.global').Symbol;
module.exports = function(name){
  return store[name] || (store[name] =
    Symbol && Symbol[name] || (Symbol || uid)('Symbol.' + name));
};
},{"./$.global":29,"./$.shared":56,"./$.uid":65}],67:[function(require,module,exports){
var classof   = require('./$.classof')
  , ITERATOR  = require('./$.wks')('iterator')
  , Iterators = require('./$.iterators');
module.exports = require('./$.core').getIteratorMethod = function(it){
  if(it != undefined)return it[ITERATOR]
    || it['@@iterator']
    || Iterators[classof(it)];
};
},{"./$.classof":17,"./$.core":19,"./$.iterators":43,"./$.wks":66}],68:[function(require,module,exports){
'use strict';
var ctx         = require('./$.ctx')
  , $export     = require('./$.export')
  , toObject    = require('./$.to-object')
  , call        = require('./$.iter-call')
  , isArrayIter = require('./$.is-array-iter')
  , toLength    = require('./$.to-length')
  , getIterFn   = require('./core.get-iterator-method');
$export($export.S + $export.F * !require('./$.iter-detect')(function(iter){ Array.from(iter); }), 'Array', {
  // 22.1.2.1 Array.from(arrayLike, mapfn = undefined, thisArg = undefined)
  from: function from(arrayLike/*, mapfn = undefined, thisArg = undefined*/){
    var O       = toObject(arrayLike)
      , C       = typeof this == 'function' ? this : Array
      , $$      = arguments
      , $$len   = $$.length
      , mapfn   = $$len > 1 ? $$[1] : undefined
      , mapping = mapfn !== undefined
      , index   = 0
      , iterFn  = getIterFn(O)
      , length, result, step, iterator;
    if(mapping)mapfn = ctx(mapfn, $$len > 2 ? $$[2] : undefined, 2);
    // if object isn't iterable or it's array with default iterator - use simple case
    if(iterFn != undefined && !(C == Array && isArrayIter(iterFn))){
      for(iterator = iterFn.call(O), result = new C; !(step = iterator.next()).done; index++){
        result[index] = mapping ? call(iterator, mapfn, [step.value, index], true) : step.value;
      }
    } else {
      length = toLength(O.length);
      for(result = new C(length); length > index; index++){
        result[index] = mapping ? mapfn(O[index], index) : O[index];
      }
    }
    result.length = index;
    return result;
  }
});

},{"./$.ctx":20,"./$.export":25,"./$.is-array-iter":35,"./$.iter-call":38,"./$.iter-detect":41,"./$.to-length":63,"./$.to-object":64,"./core.get-iterator-method":67}],69:[function(require,module,exports){
'use strict';
var addToUnscopables = require('./$.add-to-unscopables')
  , step             = require('./$.iter-step')
  , Iterators        = require('./$.iterators')
  , toIObject        = require('./$.to-iobject');

// 22.1.3.4 Array.prototype.entries()
// 22.1.3.13 Array.prototype.keys()
// 22.1.3.29 Array.prototype.values()
// 22.1.3.30 Array.prototype[@@iterator]()
module.exports = require('./$.iter-define')(Array, 'Array', function(iterated, kind){
  this._t = toIObject(iterated); // target
  this._i = 0;                   // next index
  this._k = kind;                // kind
// 22.1.5.2.1 %ArrayIteratorPrototype%.next()
}, function(){
  var O     = this._t
    , kind  = this._k
    , index = this._i++;
  if(!O || index >= O.length){
    this._t = undefined;
    return step(1);
  }
  if(kind == 'keys'  )return step(0, index);
  if(kind == 'values')return step(0, O[index]);
  return step(0, [index, O[index]]);
}, 'values');

// argumentsList[@@iterator] is %ArrayProto_values% (9.4.4.6, 9.4.4.7)
Iterators.Arguments = Iterators.Array;

addToUnscopables('keys');
addToUnscopables('values');
addToUnscopables('entries');
},{"./$.add-to-unscopables":15,"./$.iter-define":40,"./$.iter-step":42,"./$.iterators":43,"./$.to-iobject":62}],70:[function(require,module,exports){
// 19.1.2.14 Object.keys(O)
var toObject = require('./$.to-object');

require('./$.object-sap')('keys', function($keys){
  return function keys(it){
    return $keys(toObject(it));
  };
});
},{"./$.object-sap":48,"./$.to-object":64}],71:[function(require,module,exports){

},{}],72:[function(require,module,exports){
'use strict';
var $          = require('./$')
  , LIBRARY    = require('./$.library')
  , global     = require('./$.global')
  , ctx        = require('./$.ctx')
  , classof    = require('./$.classof')
  , $export    = require('./$.export')
  , isObject   = require('./$.is-object')
  , anObject   = require('./$.an-object')
  , aFunction  = require('./$.a-function')
  , strictNew  = require('./$.strict-new')
  , forOf      = require('./$.for-of')
  , setProto   = require('./$.set-proto').set
  , same       = require('./$.same-value')
  , SPECIES    = require('./$.wks')('species')
  , speciesConstructor = require('./$.species-constructor')
  , asap       = require('./$.microtask')
  , PROMISE    = 'Promise'
  , process    = global.process
  , isNode     = classof(process) == 'process'
  , P          = global[PROMISE]
  , Wrapper;

var testResolve = function(sub){
  var test = new P(function(){});
  if(sub)test.constructor = Object;
  return P.resolve(test) === test;
};

var USE_NATIVE = function(){
  var works = false;
  function P2(x){
    var self = new P(x);
    setProto(self, P2.prototype);
    return self;
  }
  try {
    works = P && P.resolve && testResolve();
    setProto(P2, P);
    P2.prototype = $.create(P.prototype, {constructor: {value: P2}});
    // actual Firefox has broken subclass support, test that
    if(!(P2.resolve(5).then(function(){}) instanceof P2)){
      works = false;
    }
    // actual V8 bug, https://code.google.com/p/v8/issues/detail?id=4162
    if(works && require('./$.descriptors')){
      var thenableThenGotten = false;
      P.resolve($.setDesc({}, 'then', {
        get: function(){ thenableThenGotten = true; }
      }));
      works = thenableThenGotten;
    }
  } catch(e){ works = false; }
  return works;
}();

// helpers
var sameConstructor = function(a, b){
  // library wrapper special case
  if(LIBRARY && a === P && b === Wrapper)return true;
  return same(a, b);
};
var getConstructor = function(C){
  var S = anObject(C)[SPECIES];
  return S != undefined ? S : C;
};
var isThenable = function(it){
  var then;
  return isObject(it) && typeof (then = it.then) == 'function' ? then : false;
};
var PromiseCapability = function(C){
  var resolve, reject;
  this.promise = new C(function($$resolve, $$reject){
    if(resolve !== undefined || reject !== undefined)throw TypeError('Bad Promise constructor');
    resolve = $$resolve;
    reject  = $$reject;
  });
  this.resolve = aFunction(resolve),
  this.reject  = aFunction(reject)
};
var perform = function(exec){
  try {
    exec();
  } catch(e){
    return {error: e};
  }
};
var notify = function(record, isReject){
  if(record.n)return;
  record.n = true;
  var chain = record.c;
  asap(function(){
    var value = record.v
      , ok    = record.s == 1
      , i     = 0;
    var run = function(reaction){
      var handler = ok ? reaction.ok : reaction.fail
        , resolve = reaction.resolve
        , reject  = reaction.reject
        , result, then;
      try {
        if(handler){
          if(!ok)record.h = true;
          result = handler === true ? value : handler(value);
          if(result === reaction.promise){
            reject(TypeError('Promise-chain cycle'));
          } else if(then = isThenable(result)){
            then.call(result, resolve, reject);
          } else resolve(result);
        } else reject(value);
      } catch(e){
        reject(e);
      }
    };
    while(chain.length > i)run(chain[i++]); // variable length - can't use forEach
    chain.length = 0;
    record.n = false;
    if(isReject)setTimeout(function(){
      var promise = record.p
        , handler, console;
      if(isUnhandled(promise)){
        if(isNode){
          process.emit('unhandledRejection', value, promise);
        } else if(handler = global.onunhandledrejection){
          handler({promise: promise, reason: value});
        } else if((console = global.console) && console.error){
          console.error('Unhandled promise rejection', value);
        }
      } record.a = undefined;
    }, 1);
  });
};
var isUnhandled = function(promise){
  var record = promise._d
    , chain  = record.a || record.c
    , i      = 0
    , reaction;
  if(record.h)return false;
  while(chain.length > i){
    reaction = chain[i++];
    if(reaction.fail || !isUnhandled(reaction.promise))return false;
  } return true;
};
var $reject = function(value){
  var record = this;
  if(record.d)return;
  record.d = true;
  record = record.r || record; // unwrap
  record.v = value;
  record.s = 2;
  record.a = record.c.slice();
  notify(record, true);
};
var $resolve = function(value){
  var record = this
    , then;
  if(record.d)return;
  record.d = true;
  record = record.r || record; // unwrap
  try {
    if(record.p === value)throw TypeError("Promise can't be resolved itself");
    if(then = isThenable(value)){
      asap(function(){
        var wrapper = {r: record, d: false}; // wrap
        try {
          then.call(value, ctx($resolve, wrapper, 1), ctx($reject, wrapper, 1));
        } catch(e){
          $reject.call(wrapper, e);
        }
      });
    } else {
      record.v = value;
      record.s = 1;
      notify(record, false);
    }
  } catch(e){
    $reject.call({r: record, d: false}, e); // wrap
  }
};

// constructor polyfill
if(!USE_NATIVE){
  // 25.4.3.1 Promise(executor)
  P = function Promise(executor){
    aFunction(executor);
    var record = this._d = {
      p: strictNew(this, P, PROMISE),         // <- promise
      c: [],                                  // <- awaiting reactions
      a: undefined,                           // <- checked in isUnhandled reactions
      s: 0,                                   // <- state
      d: false,                               // <- done
      v: undefined,                           // <- value
      h: false,                               // <- handled rejection
      n: false                                // <- notify
    };
    try {
      executor(ctx($resolve, record, 1), ctx($reject, record, 1));
    } catch(err){
      $reject.call(record, err);
    }
  };
  require('./$.redefine-all')(P.prototype, {
    // 25.4.5.3 Promise.prototype.then(onFulfilled, onRejected)
    then: function then(onFulfilled, onRejected){
      var reaction = new PromiseCapability(speciesConstructor(this, P))
        , promise  = reaction.promise
        , record   = this._d;
      reaction.ok   = typeof onFulfilled == 'function' ? onFulfilled : true;
      reaction.fail = typeof onRejected == 'function' && onRejected;
      record.c.push(reaction);
      if(record.a)record.a.push(reaction);
      if(record.s)notify(record, false);
      return promise;
    },
    // 25.4.5.1 Promise.prototype.catch(onRejected)
    'catch': function(onRejected){
      return this.then(undefined, onRejected);
    }
  });
}

$export($export.G + $export.W + $export.F * !USE_NATIVE, {Promise: P});
require('./$.set-to-string-tag')(P, PROMISE);
require('./$.set-species')(PROMISE);
Wrapper = require('./$.core')[PROMISE];

// statics
$export($export.S + $export.F * !USE_NATIVE, PROMISE, {
  // 25.4.4.5 Promise.reject(r)
  reject: function reject(r){
    var capability = new PromiseCapability(this)
      , $$reject   = capability.reject;
    $$reject(r);
    return capability.promise;
  }
});
$export($export.S + $export.F * (!USE_NATIVE || testResolve(true)), PROMISE, {
  // 25.4.4.6 Promise.resolve(x)
  resolve: function resolve(x){
    // instanceof instead of internal slot check because we should fix it without replacement native Promise core
    if(x instanceof P && sameConstructor(x.constructor, this))return x;
    var capability = new PromiseCapability(this)
      , $$resolve  = capability.resolve;
    $$resolve(x);
    return capability.promise;
  }
});
$export($export.S + $export.F * !(USE_NATIVE && require('./$.iter-detect')(function(iter){
  P.all(iter)['catch'](function(){});
})), PROMISE, {
  // 25.4.4.1 Promise.all(iterable)
  all: function all(iterable){
    var C          = getConstructor(this)
      , capability = new PromiseCapability(C)
      , resolve    = capability.resolve
      , reject     = capability.reject
      , values     = [];
    var abrupt = perform(function(){
      forOf(iterable, false, values.push, values);
      var remaining = values.length
        , results   = Array(remaining);
      if(remaining)$.each.call(values, function(promise, index){
        var alreadyCalled = false;
        C.resolve(promise).then(function(value){
          if(alreadyCalled)return;
          alreadyCalled = true;
          results[index] = value;
          --remaining || resolve(results);
        }, reject);
      });
      else resolve(results);
    });
    if(abrupt)reject(abrupt.error);
    return capability.promise;
  },
  // 25.4.4.4 Promise.race(iterable)
  race: function race(iterable){
    var C          = getConstructor(this)
      , capability = new PromiseCapability(C)
      , reject     = capability.reject;
    var abrupt = perform(function(){
      forOf(iterable, false, function(promise){
        C.resolve(promise).then(capability.resolve, reject);
      });
    });
    if(abrupt)reject(abrupt.error);
    return capability.promise;
  }
});
},{"./$":44,"./$.a-function":14,"./$.an-object":16,"./$.classof":17,"./$.core":19,"./$.ctx":20,"./$.descriptors":22,"./$.export":25,"./$.for-of":27,"./$.global":29,"./$.is-object":37,"./$.iter-detect":41,"./$.library":46,"./$.microtask":47,"./$.redefine-all":50,"./$.same-value":52,"./$.set-proto":53,"./$.set-species":54,"./$.set-to-string-tag":55,"./$.species-constructor":57,"./$.strict-new":58,"./$.wks":66}],73:[function(require,module,exports){
'use strict';
var $at  = require('./$.string-at')(true);

// 21.1.3.27 String.prototype[@@iterator]()
require('./$.iter-define')(String, 'String', function(iterated){
  this._t = String(iterated); // target
  this._i = 0;                // next index
// 21.1.5.2.1 %StringIteratorPrototype%.next()
}, function(){
  var O     = this._t
    , index = this._i
    , point;
  if(index >= O.length)return {value: undefined, done: true};
  point = $at(O, index);
  this._i += point.length;
  return {value: point, done: false};
});
},{"./$.iter-define":40,"./$.string-at":59}],74:[function(require,module,exports){
'use strict';
// ECMAScript 6 symbols shim
var $              = require('./$')
  , global         = require('./$.global')
  , has            = require('./$.has')
  , DESCRIPTORS    = require('./$.descriptors')
  , $export        = require('./$.export')
  , redefine       = require('./$.redefine')
  , $fails         = require('./$.fails')
  , shared         = require('./$.shared')
  , setToStringTag = require('./$.set-to-string-tag')
  , uid            = require('./$.uid')
  , wks            = require('./$.wks')
  , keyOf          = require('./$.keyof')
  , $names         = require('./$.get-names')
  , enumKeys       = require('./$.enum-keys')
  , isArray        = require('./$.is-array')
  , anObject       = require('./$.an-object')
  , toIObject      = require('./$.to-iobject')
  , createDesc     = require('./$.property-desc')
  , getDesc        = $.getDesc
  , setDesc        = $.setDesc
  , _create        = $.create
  , getNames       = $names.get
  , $Symbol        = global.Symbol
  , $JSON          = global.JSON
  , _stringify     = $JSON && $JSON.stringify
  , setter         = false
  , HIDDEN         = wks('_hidden')
  , isEnum         = $.isEnum
  , SymbolRegistry = shared('symbol-registry')
  , AllSymbols     = shared('symbols')
  , useNative      = typeof $Symbol == 'function'
  , ObjectProto    = Object.prototype;

// fallback for old Android, https://code.google.com/p/v8/issues/detail?id=687
var setSymbolDesc = DESCRIPTORS && $fails(function(){
  return _create(setDesc({}, 'a', {
    get: function(){ return setDesc(this, 'a', {value: 7}).a; }
  })).a != 7;
}) ? function(it, key, D){
  var protoDesc = getDesc(ObjectProto, key);
  if(protoDesc)delete ObjectProto[key];
  setDesc(it, key, D);
  if(protoDesc && it !== ObjectProto)setDesc(ObjectProto, key, protoDesc);
} : setDesc;

var wrap = function(tag){
  var sym = AllSymbols[tag] = _create($Symbol.prototype);
  sym._k = tag;
  DESCRIPTORS && setter && setSymbolDesc(ObjectProto, tag, {
    configurable: true,
    set: function(value){
      if(has(this, HIDDEN) && has(this[HIDDEN], tag))this[HIDDEN][tag] = false;
      setSymbolDesc(this, tag, createDesc(1, value));
    }
  });
  return sym;
};

var isSymbol = function(it){
  return typeof it == 'symbol';
};

var $defineProperty = function defineProperty(it, key, D){
  if(D && has(AllSymbols, key)){
    if(!D.enumerable){
      if(!has(it, HIDDEN))setDesc(it, HIDDEN, createDesc(1, {}));
      it[HIDDEN][key] = true;
    } else {
      if(has(it, HIDDEN) && it[HIDDEN][key])it[HIDDEN][key] = false;
      D = _create(D, {enumerable: createDesc(0, false)});
    } return setSymbolDesc(it, key, D);
  } return setDesc(it, key, D);
};
var $defineProperties = function defineProperties(it, P){
  anObject(it);
  var keys = enumKeys(P = toIObject(P))
    , i    = 0
    , l = keys.length
    , key;
  while(l > i)$defineProperty(it, key = keys[i++], P[key]);
  return it;
};
var $create = function create(it, P){
  return P === undefined ? _create(it) : $defineProperties(_create(it), P);
};
var $propertyIsEnumerable = function propertyIsEnumerable(key){
  var E = isEnum.call(this, key);
  return E || !has(this, key) || !has(AllSymbols, key) || has(this, HIDDEN) && this[HIDDEN][key]
    ? E : true;
};
var $getOwnPropertyDescriptor = function getOwnPropertyDescriptor(it, key){
  var D = getDesc(it = toIObject(it), key);
  if(D && has(AllSymbols, key) && !(has(it, HIDDEN) && it[HIDDEN][key]))D.enumerable = true;
  return D;
};
var $getOwnPropertyNames = function getOwnPropertyNames(it){
  var names  = getNames(toIObject(it))
    , result = []
    , i      = 0
    , key;
  while(names.length > i)if(!has(AllSymbols, key = names[i++]) && key != HIDDEN)result.push(key);
  return result;
};
var $getOwnPropertySymbols = function getOwnPropertySymbols(it){
  var names  = getNames(toIObject(it))
    , result = []
    , i      = 0
    , key;
  while(names.length > i)if(has(AllSymbols, key = names[i++]))result.push(AllSymbols[key]);
  return result;
};
var $stringify = function stringify(it){
  if(it === undefined || isSymbol(it))return; // IE8 returns string on undefined
  var args = [it]
    , i    = 1
    , $$   = arguments
    , replacer, $replacer;
  while($$.length > i)args.push($$[i++]);
  replacer = args[1];
  if(typeof replacer == 'function')$replacer = replacer;
  if($replacer || !isArray(replacer))replacer = function(key, value){
    if($replacer)value = $replacer.call(this, key, value);
    if(!isSymbol(value))return value;
  };
  args[1] = replacer;
  return _stringify.apply($JSON, args);
};
var buggyJSON = $fails(function(){
  var S = $Symbol();
  // MS Edge converts symbol values to JSON as {}
  // WebKit converts symbol values to JSON as null
  // V8 throws on boxed symbols
  return _stringify([S]) != '[null]' || _stringify({a: S}) != '{}' || _stringify(Object(S)) != '{}';
});

// 19.4.1.1 Symbol([description])
if(!useNative){
  $Symbol = function Symbol(){
    if(isSymbol(this))throw TypeError('Symbol is not a constructor');
    return wrap(uid(arguments.length > 0 ? arguments[0] : undefined));
  };
  redefine($Symbol.prototype, 'toString', function toString(){
    return this._k;
  });

  isSymbol = function(it){
    return it instanceof $Symbol;
  };

  $.create     = $create;
  $.isEnum     = $propertyIsEnumerable;
  $.getDesc    = $getOwnPropertyDescriptor;
  $.setDesc    = $defineProperty;
  $.setDescs   = $defineProperties;
  $.getNames   = $names.get = $getOwnPropertyNames;
  $.getSymbols = $getOwnPropertySymbols;

  if(DESCRIPTORS && !require('./$.library')){
    redefine(ObjectProto, 'propertyIsEnumerable', $propertyIsEnumerable, true);
  }
}

var symbolStatics = {
  // 19.4.2.1 Symbol.for(key)
  'for': function(key){
    return has(SymbolRegistry, key += '')
      ? SymbolRegistry[key]
      : SymbolRegistry[key] = $Symbol(key);
  },
  // 19.4.2.5 Symbol.keyFor(sym)
  keyFor: function keyFor(key){
    return keyOf(SymbolRegistry, key);
  },
  useSetter: function(){ setter = true; },
  useSimple: function(){ setter = false; }
};
// 19.4.2.2 Symbol.hasInstance
// 19.4.2.3 Symbol.isConcatSpreadable
// 19.4.2.4 Symbol.iterator
// 19.4.2.6 Symbol.match
// 19.4.2.8 Symbol.replace
// 19.4.2.9 Symbol.search
// 19.4.2.10 Symbol.species
// 19.4.2.11 Symbol.split
// 19.4.2.12 Symbol.toPrimitive
// 19.4.2.13 Symbol.toStringTag
// 19.4.2.14 Symbol.unscopables
$.each.call((
  'hasInstance,isConcatSpreadable,iterator,match,replace,search,' +
  'species,split,toPrimitive,toStringTag,unscopables'
).split(','), function(it){
  var sym = wks(it);
  symbolStatics[it] = useNative ? sym : wrap(sym);
});

setter = true;

$export($export.G + $export.W, {Symbol: $Symbol});

$export($export.S, 'Symbol', symbolStatics);

$export($export.S + $export.F * !useNative, 'Object', {
  // 19.1.2.2 Object.create(O [, Properties])
  create: $create,
  // 19.1.2.4 Object.defineProperty(O, P, Attributes)
  defineProperty: $defineProperty,
  // 19.1.2.3 Object.defineProperties(O, Properties)
  defineProperties: $defineProperties,
  // 19.1.2.6 Object.getOwnPropertyDescriptor(O, P)
  getOwnPropertyDescriptor: $getOwnPropertyDescriptor,
  // 19.1.2.7 Object.getOwnPropertyNames(O)
  getOwnPropertyNames: $getOwnPropertyNames,
  // 19.1.2.8 Object.getOwnPropertySymbols(O)
  getOwnPropertySymbols: $getOwnPropertySymbols
});

// 24.3.2 JSON.stringify(value [, replacer [, space]])
$JSON && $export($export.S + $export.F * (!useNative || buggyJSON), 'JSON', {stringify: $stringify});

// 19.4.3.5 Symbol.prototype[@@toStringTag]
setToStringTag($Symbol, 'Symbol');
// 20.2.1.9 Math[@@toStringTag]
setToStringTag(Math, 'Math', true);
// 24.3.3 JSON[@@toStringTag]
setToStringTag(global.JSON, 'JSON', true);
},{"./$":44,"./$.an-object":16,"./$.descriptors":22,"./$.enum-keys":24,"./$.export":25,"./$.fails":26,"./$.get-names":28,"./$.global":29,"./$.has":30,"./$.is-array":36,"./$.keyof":45,"./$.library":46,"./$.property-desc":49,"./$.redefine":51,"./$.set-to-string-tag":55,"./$.shared":56,"./$.to-iobject":62,"./$.uid":65,"./$.wks":66}],75:[function(require,module,exports){
require('./es6.array.iterator');
var Iterators = require('./$.iterators');
Iterators.NodeList = Iterators.HTMLCollection = Iterators.Array;
},{"./$.iterators":43,"./es6.array.iterator":69}],76:[function(require,module,exports){
module.exports = extend

var hasOwnProperty = Object.prototype.hasOwnProperty;

function extend() {
    var target = {}

    for (var i = 0; i < arguments.length; i++) {
        var source = arguments[i]

        for (var key in source) {
            if (hasOwnProperty.call(source, key)) {
                target[key] = source[key]
            }
        }
    }

    return target
}

},{}],77:[function(require,module,exports){
'use strict';

var _createClass = require('babel-runtime/helpers/create-class')['default'];

var _classCallCheck = require('babel-runtime/helpers/class-call-check')['default'];

var _Symbol = require('babel-runtime/core-js/symbol')['default'];

var _Promise = require('babel-runtime/core-js/promise')['default'];

var _Object$keys = require('babel-runtime/core-js/object/keys')['default'];

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

Object.defineProperty(exports, '__esModule', {
    value: true
});

var _xtend = require('xtend');

var _xtend2 = _interopRequireDefault(_xtend);

var _PATTERN_PROP = _Symbol();
var _CHAR_PROP = _Symbol();
var _DOM_PROP = _Symbol();
var _DISPLAY_TIME_PROP = _Symbol();
var _DURATION_PROP = _Symbol();
var _EASING_PROP = _Symbol();
var _IS_ANIMATING_PROP = _Symbol();
var _RESUME_PROP = _Symbol();
var _LOOP_PROP = _Symbol();
var _RANDOM_PROP = _Symbol();
var _PEDAL_PROP = _Symbol();
var _CANSELLER_PROP = _Symbol();

var patterns = {}; // initialized in Emblem.define

var Emblem = (function () {
    function Emblem(c) {
        var options = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

        _classCallCheck(this, Emblem);

        options.pattern = options.pattern || 'Lines';
        if (patterns[options.pattern] == null) {
            console.error(options.pattern + ' pattern is undefined.');return;
        }

        this[_PATTERN_PROP] = patterns[options.pattern];
        this[_IS_ANIMATING_PROP] = false;
        this[_RESUME_PROP] = null;
        this[_CHAR_PROP] = null;
        this[_DOM_PROP] = _createDom.call(this);
        this[_CANSELLER_PROP] = function () {};

        options = (0, _xtend2['default'])(this[_PATTERN_PROP]._DEFAULT_OPTIONS, options);
        var _options = options;
        var pattern = _options.pattern;
        var size = _options.size;
        var displayTime = _options.displayTime;
        var duration = _options.duration;
        var easing = _options.easing;
        var loop = _options.loop;
        var random = _options.random;
        var pedal = _options.pedal;

        // --- options ---
        this.displayTime = displayTime;
        this.duration = duration;
        this.loop = loop;
        this.random = random;
        this.easing = easing || 'cubic-bezier(.26,.92,.41,.98)';
        this.pedal = pedal;

        if (typeof size === 'number' && size >= 0) {
            this.size = size;
        } else {
            this.size = 100;
        }

        this.to(c);
    }

    _createClass(Emblem, [{
        key: 'to',
        value: function to(c) {
            var _c = c && c.toLowerCase && c.toLowerCase();
            if (!this[_PATTERN_PROP]._formationTable[_c]) {
                return false;
            }
            if (this[_CHAR_PROP] === _c) {
                return false;
            }
            _changeStyle.call(this, _c);
            this[_CHAR_PROP] = _c;
            return true;
        }
    }, {
        key: 'appendTo',
        value: function appendTo(parent) {
            parent.appendChild(this[_DOM_PROP]);
        }
    }, {
        key: 'stopAnimate',
        value: function stopAnimate() {
            this[_IS_ANIMATING_PROP] = false;
        }
    }, {
        key: 'resumeAnimate',
        value: function resumeAnimate() {
            this[_IS_ANIMATING_PROP] = true;
            this[_RESUME_PROP]();
        }
    }, {
        key: 'animateFromString',
        value: function animateFromString(str, opt) {
            var _this = this;

            this[_IS_ANIMATING_PROP] = true;
            this[_RESUME_PROP] = null;
            this.options = opt;

            [].reduce.call(str, function (p, c, idx) {
                // p = Promise.resolve(); c = str[idx];
                var isLast = idx === str.length - 1;
                return p.then(function () {
                    return new _Promise(function (resolve, reject) {
                        _this[_CANSELLER_PROP] = reject;
                        if (_this[_RANDOM_PROP]) {
                            var _c = str[Math.random() * str.length | 0];
                            _this.to(_c);
                        } else {
                            _this.to(c);
                        }
                        if (isLast) {
                            if (_this[_LOOP_PROP]) {
                                setTimeout(function () {
                                    _this.animateFromString.call(_this, str);
                                    resolve();
                                }, _this[_DISPLAY_TIME_PROP]);
                                return;
                            } else {
                                setTimeout(reject, _this[_DISPLAY_TIME_PROP]);
                                return;
                            }
                        }
                        if (!_this[_IS_ANIMATING_PROP]) {
                            _this[_RESUME_PROP] = resolve;
                        } else {
                            setTimeout(resolve, _this[_DISPLAY_TIME_PROP]);
                        }
                    });
                });
            }, _Promise.resolve())['catch'](function () {
                _this[_IS_ANIMATING_PROP] = false;
            });
        }

        /**
         * Setter and Getter
         */

        // --- options ---
    }, {
        key: 'options',
        set: function set() {
            var _ref = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

            var size = _ref.size;
            var displayTime = _ref.displayTime;
            var duration = _ref.duration;
            var loop = _ref.loop;
            var random = _ref.random;
            var pedal = _ref.pedal;
            var easing = _ref.easing;

            this.size = size;
            this.displayTime = displayTime;
            this.duration = duration;
            this.easing = easing;
            this.loop = loop;
            this.random = random;
            this.pedal = pedal;
        },
        get: function get() {
            return {
                size: this.size,
                displayTime: this.displayTime,
                duration: this.duration,
                easing: this.easing,
                loop: this.loop,
                random: this.random,
                pedal: this.pedal
            };
        }

        // --- size ---
    }, {
        key: 'size',
        set: function set(size) {
            if (size == null) {
                return;
            }
            if (typeof size === 'number' && size >= 0) {
                var domStyle = this[_DOM_PROP].style;
                domStyle.width = size + 'px';
                domStyle.height = size + 'px';
            } else {
                console.error('Emblem.size should be type of zero or positive number.');
            }
        },
        get: function get() {
            return +this[_DOM_PROP].style.width.replace('px', '');
        }

        // --- displayTime ---
    }, {
        key: 'displayTime',
        set: function set(time) {
            if (time == null) {
                return;
            }
            if (typeof time === 'number' && time > 0) {
                this[_DISPLAY_TIME_PROP] = time;
            } else {
                console.error('Emblem.displayTime should be type of positive number.');
            }
        },
        get: function get() {
            return this[_DISPLAY_TIME_PROP];
        }

        // --- duration ---
    }, {
        key: 'duration',
        set: function set(time) {
            if (time == null) {
                return;
            }
            if (typeof time === 'number' && time >= 0) {
                this[_DURATION_PROP] = time;
                _updateTransitionConfig.call(this);
            } else {
                console.error('Emblem.duration should be type of zero or positive number.');
            }
        },
        get: function get() {
            return this[_DURATION_PROP];
        }

        // --- easing ---
    }, {
        key: 'easing',
        set: function set(val) {
            if (val == null) {
                return;
            }
            this[_EASING_PROP] = val;
            _updateTransitionConfig.call(this);
        },
        get: function get() {
            return this[_EASING_PROP];
        }

        // --- loop ---
    }, {
        key: 'loop',
        set: function set(bool) {
            if (bool == null) {
                return;
            }
            this[_LOOP_PROP] = bool;
        },
        get: function get() {
            return this[_LOOP_PROP];
        }

        // --- random ---
    }, {
        key: 'random',
        set: function set(bool) {
            if (bool == null) {
                return;
            }
            this[_RANDOM_PROP] = bool;
        },
        get: function get() {
            return this[_RANDOM_PROP];
        }

        // --- pedal ---
    }, {
        key: 'pedal',
        set: function set(bool) {
            if (bool == null) {
                return;
            }
            this[_PEDAL_PROP] = bool;
        },
        get: function get() {
            return this[_PEDAL_PROP];
        }

        // --- dom ---
    }, {
        key: 'dom',
        get: function get() {
            return this[_DOM_PROP];
        }

        // --- char ---
    }, {
        key: 'char',
        get: function get() {
            return this[_CHAR_PROP];
        }

        // --- isAnimating ---
    }, {
        key: 'isAnimating',
        get: function get() {
            return this[_IS_ANIMATING_PROP];
        }

        // --- allValidChars ---
    }, {
        key: 'allValidChars',
        get: function get() {
            return _Object$keys(this[_PATTERN_PROP]._formationTable);
        }
    }], [{
        key: 'define',
        value: function define(name, obj) {
            if (!('_DEFAULT_OPTIONS' in obj) || !('_BASE_DOM' in obj) || !('_TRANSITION_PROPS' in obj) || !('_formationTable' in obj)) {
                console.error('Pattern is invalid.');
            }
            patterns[name] = obj;
        }
    }]);

    return Emblem;
})();

function _createDom() {
    return this[_PATTERN_PROP]._BASE_DOM.cloneNode(true);
}

function _changeStyle(c) {
    // @bind this
    var oldC = this[_CHAR_PROP];
    var oldFormation = this[_PATTERN_PROP]._formationTable[oldC];
    var newFormation = this[_PATTERN_PROP]._formationTable[c];
    if (!newFormation) {
        return;
    }
    var diffFormation = undefined;
    if (oldC) {
        diffFormation = newFormation.map(function (newStr, idx) {
            var oldStr = oldFormation[idx];
            var newStrIsArr = Array.isArray(newStr);
            var oldStrIsArr = Array.isArray(oldStr);
            if (newStrIsArr && oldStrIsArr) {
                var strIsNotEq = newStr[0] !== oldStr[0];
                var posIsNotEq = newStr[1] !== oldStr[1];
                return strIsNotEq || posIsNotEq ? newStr : false;
            } else {
                if (newStrIsArr || oldStrIsArr) {
                    return newStr;
                }
                return newStr !== oldStr ? newStr : false;
            }
        });
    } else {
        diffFormation = newFormation;
    }
    [].forEach.call(this[_DOM_PROP].childNodes, function (node, idx) {
        var formation = diffFormation[idx];
        var specifyPos = Array.isArray(formation);
        if (!formation) {
            return;
        }
        var pos = undefined;
        if (specifyPos) {
            pos = formation[1];
        } else {
            pos = 'pos_' + idx % 3 + '_' + (idx / 3 | 0);
        }
        node.className = (specifyPos ? formation[0] : formation) + ' ' + pos;
        if (node.classList.contains('rotate-default')) {
            return;
        }
        node.classList.add(_ROTATE_TABLE[Math.random() * 4 | 0]);
    });
}

function _updateTransitionConfig() {
    var _this2 = this;

    // @bind this
    var val = this[_PATTERN_PROP]._TRANSITION_PROPS.reduce(function (str, prop, idx) {
        return '' + str + (idx ? ',' : '') + ' ' + prop + ' ' + _this2[_DURATION_PROP] + 'ms ' + _this2[_EASING_PROP];
    }, '');

    _updateStyle(this[_DOM_PROP].childNodes);

    function _updateStyle(list) {
        [].forEach.call(list, function (node) {
            node.style.transition = val;
            if (node.firstChild) {
                _updateStyle(node.childNodes);
            }
        });
    }
}

var _ROTATE_TABLE = ['rotate0', 'rotate90', 'rotate180', 'rotate270'];

exports['default'] = Emblem;
module.exports = exports['default'];

},{"babel-runtime/core-js/object/keys":3,"babel-runtime/core-js/promise":4,"babel-runtime/core-js/symbol":5,"babel-runtime/helpers/class-call-check":6,"babel-runtime/helpers/create-class":7,"babel-runtime/helpers/interop-require-default":8,"xtend":76}],78:[function(require,module,exports){
'use strict';

var _createClass = require('babel-runtime/helpers/create-class')['default'];

var _classCallCheck = require('babel-runtime/helpers/class-call-check')['default'];

var _Symbol = require('babel-runtime/core-js/symbol')['default'];

var _Array$from = require('babel-runtime/core-js/array/from')['default'];

var _Promise = require('babel-runtime/core-js/promise')['default'];

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

Object.defineProperty(exports, '__esModule', {
    value: true
});

var _EmblemJs = require('./Emblem.js');

var _EmblemJs2 = _interopRequireDefault(_EmblemJs);

var _EMBLEMS_PROP = _Symbol();
var _DISPLAY_TIME_PROP = _Symbol();
var _IS_ANIMATING_PROP = _Symbol();
var _RESUME_PROP = _Symbol();
var _LOOP_PROP = _Symbol();
var _RANDOM_PROP = _Symbol();
var _CANSELLER_PROP = _Symbol();

var EmblemGroup = (function () {
    function EmblemGroup(chars) {
        var options = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

        _classCallCheck(this, EmblemGroup);

        var pattern = options.pattern;
        var length = options.length;
        var displayTime = options.displayTime;
        var _options$loop = options.loop;
        var loop = _options$loop === undefined ? false : _options$loop;
        var _options$random = options.random;
        var random = _options$random === undefined ? false : _options$random;
        var size = options.size;
        var duration = options.duration;
        var easing = options.easing;
        var _options$pedal = options.pedal;
        var pedal = _options$pedal === undefined ? true : _options$pedal;

        this[_IS_ANIMATING_PROP] = false;
        this[_RESUME_PROP] = null;
        this[_CANSELLER_PROP] = function () {};

        // --- options ---
        this.displayTime = displayTime | 0 || 1500;
        this.loop = loop;
        this.random = random;

        if (typeof chars === 'string') {
            if (typeof length !== 'number' || chars.length < length) {
                for (var i = chars.length; i < length; i++) {
                    chars += ' ';
                }
            } else if (length != null && chars.length > length) {
                chars = chars.slice(0, length);
            }
        } else {
            console.error('EmblemGroup constructor first argument should be string.');
        }

        delete options.loop;
        delete options.displayTime;
        delete options.random;

        var emblems = _transformToEmblemArray(chars, options);

        if (emblems) {
            this[_EMBLEMS_PROP] = emblems;
        } else {
            throw new Error('EmblemGroup arguments expect string or array of Emblem.');
        }
    }

    _createClass(EmblemGroup, [{
        key: 'toString',
        value: function toString() {
            return this.emblems.map(function (e) {
                return e.char;
            }).join('');
        }
    }, {
        key: 'map',
        value: function map(str) {
            this.emblems.forEach(function (emblem, idx) {
                var c = str[idx];
                if (!c) {
                    c = ' ';
                }
                emblem.to(c);
            });
        }
    }, {
        key: 'appendTo',
        value: function appendTo(parent) {
            var frag = this.emblems.reduce(function (f, e) {
                f.appendChild(e.dom);
                return f;
            }, document.createDocumentFragment());
            parent.appendChild(frag);
        }
    }, {
        key: 'stopAnimate',
        value: function stopAnimate() {
            this[_IS_ANIMATING_PROP] = false;
        }
    }, {
        key: 'resumeAnimate',
        value: function resumeAnimate() {
            this[_IS_ANIMATING_PROP] = true;
            this[_RESUME_PROP]();
        }
    }, {
        key: 'animateFromString',
        value: function animateFromString(str, opt) {
            var _this = this;

            var strArr = undefined;
            if (typeof str === 'string') {
                (function () {
                    var len = _this.emblems.length;
                    strArr = [].reduce.call(str, function (arr, s, idx) {
                        if (idx % len === 0) {
                            arr.push('');
                        }
                        arr[idx / len | 0] += s;
                        return arr;
                    }, []);
                })();
            } else if (Array.isArray(str) && str.every(function (s) {
                return typeof s === 'string';
            })) {
                strArr = str;
            } else {
                console.error('EmblemGroup#animateFromString first argument should be string or array of string.');
            }

            _animateFromStringArray.call(this, strArr, opt);
        }
    }, {
        key: 'animateFromStringArray',
        value: function animateFromStringArray(strArr, opt) {
            _animateFromStringArray.call(this, strArr, opt);
        }

        /*
         * Setter and Getter
         */

        // --- options ---
    }, {
        key: 'options',
        set: function set() {
            var _ref = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

            var length = _ref.length;
            var displayTime = _ref.displayTime;
            var loop = _ref.loop;
            var random = _ref.random;
            var size = _ref.size;
            var duration = _ref.duration;
            var easing = _ref.easing;
            var pedal = _ref.pedal;

            this.length = length;
            this.displayTime = displayTime;
            this.loop = loop;
            this.random = random;

            // change emblems options
            this.size = size;
            this.duration = duration;
            this.easing = easing;
            this.pedal = pedal;
        },
        get: function get() {
            return {
                length: this.length,
                displayTime: this.displayTime,
                loop: this.loop,
                random: this.random,

                // emblems options
                size: this.size,
                duration: this.duration,
                easing: this.easing,
                pedal: this.pedal
            };
        }

        // --- length ---
    }, {
        key: 'length',
        set: function set(lenNew) {
            if (lenNew == null) {
                return;
            }
            var emblems = this[_EMBLEMS_PROP];
            var lenOld = emblems.length;

            if (lenNew > lenOld) {
                var blankArr = _Array$from({ length: lenNew - lenOld }, function () {
                    return new _EmblemJs2['default'](' ');
                });
                this[_EMBLEMS_PROP] = emblems.concat(blankArr);
            } else if (lenNew < lenOld) {
                this[_EMBLEMS_PROP] = emblems.slice(0, lenNew);
            }
        },
        get: function get() {
            return this[_EMBLEMS_PROP].length;
        }

        // --- displayTime ---
    }, {
        key: 'displayTime',
        set: function set(time) {
            if (time == null) {
                return;
            }
            if (typeof time === 'number' && time > 0) {
                this[_DISPLAY_TIME_PROP] = time;
            } else {
                console.error('EmblemGroup.displayTime should be type of positive number.');
            }
        },
        get: function get() {
            return this[_DISPLAY_TIME_PROP];
        }

        // --- loop ---
    }, {
        key: 'loop',
        set: function set(bool) {
            if (bool == null) {
                return;
            }
            this[_LOOP_PROP] = bool;
        },
        get: function get() {
            return this[_LOOP_PROP];
        }

        // --- random ---
    }, {
        key: 'random',
        set: function set(bool) {
            if (bool == null) {
                return;
            }
            this[_RANDOM_PROP] = bool;
        },
        get: function get() {
            return this[_RANDOM_PROP];
        }

        // --- size ---
    }, {
        key: 'size',
        set: function set(size) {
            this[_EMBLEMS_PROP].forEach(function (emb) {
                return emb.size = size;
            });
        },
        get: function get() {
            return this[_EMBLEMS_PROP].map(function (emb) {
                return emb.size;
            });
        }

        // --- duration ---
    }, {
        key: 'duration',
        set: function set(time) {
            this[_EMBLEMS_PROP].forEach(function (emb) {
                return emb.duration = time;
            });
        },
        get: function get() {
            return this[_EMBLEMS_PROP].map(function (emb) {
                return emb.duration;
            });
        }

        // --- easing ---
    }, {
        key: 'easing',
        set: function set(val) {
            this[_EMBLEMS_PROP].forEach(function (emb) {
                return emb.easing = val;
            });
        },
        get: function get() {
            return this[_EMBLEMS_PROP].map(function (emb) {
                return emb.easing;
            });
        }

        // --- pedal ---
    }, {
        key: 'pedal',
        set: function set(val) {
            this[_EMBLEMS_PROP].forEach(function (emb) {
                return emb.pedal = val;
            });
        },
        get: function get() {
            return this[_EMBLEMS_PROP].map(function (emb) {
                return emb.pedal;
            });
        }

        // --- emblems ---
    }, {
        key: 'emblems',
        get: function get() {
            return this[_EMBLEMS_PROP];
        }

        // --- isAnimating ---
    }, {
        key: 'isAnimating',
        get: function get() {
            return this[_IS_ANIMATING_PROP];
        }
    }]);

    return EmblemGroup;
})();

function _transformToEmblemArray(arg, opt) {
    // (string | [Emblem]) => [Emblem] | false

    var res = undefined;
    switch (typeof arg) {
        case 'string':
            res = [].map.call(arg, function (c) {
                return new _EmblemJs2['default'](c, opt);
            });
            break;
        case 'object':
            if (Array.isArray(arg) && arg.every(function (o) {
                return o instanceof _EmblemJs2['default'];
            })) {
                res = arg;
            } else {
                res = false;
            };
            break;
        default:
            res = false;
    }

    return res;
}

function _animateFromStringArray(strArr, opt) {
    var _this2 = this;

    this[_CANSELLER_PROP](); // cansel before animation.

    this[_IS_ANIMATING_PROP] = true;
    this[_RESUME_PROP] = null;
    this.options = opt;

    strArr.reduce(function (p, s, idx) {
        var isLast = idx === strArr.length - 1;
        return p.then(function () {
            return new _Promise(function (resolve, reject) {
                _this2[_CANSELLER_PROP] = reject;
                if (_this2[_RANDOM_PROP]) {
                    var _s = strArr[Math.random() * strArr.length | 0];
                    _this2.map(_s);
                } else {
                    _this2.map(s);
                }
                if (isLast) {
                    if (_this2.loop) {
                        setTimeout(function () {
                            _animateFromStringArray.call(_this2, strArr);
                            resolve();
                        }, _this2.displayTime);
                        return;
                    } else {
                        _this2[_IS_ANIMATING_PROP] = false;
                        return;
                    }
                }
                if (!_this2[_IS_ANIMATING_PROP]) {
                    _this2[_RESUME_PROP] = resolve;
                } else {
                    setTimeout(resolve, _this2.displayTime);
                }
            });
        });
    }, _Promise.resolve())['catch'](function () {
        console.log('cansel before animation.');
    });
}

exports['default'] = EmblemGroup;
module.exports = exports['default'];

},{"./Emblem.js":77,"babel-runtime/core-js/array/from":1,"babel-runtime/core-js/promise":4,"babel-runtime/core-js/symbol":5,"babel-runtime/helpers/class-call-check":6,"babel-runtime/helpers/create-class":7,"babel-runtime/helpers/interop-require-default":8}],79:[function(require,module,exports){
'use strict';

// require('es6-promise').polyfill();
// require('babelify/polyfill');

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

var _EmblemJs = require('./Emblem.js');

var _EmblemJs2 = _interopRequireDefault(_EmblemJs);

var _EmblemGroupJs = require('./EmblemGroup.js');

var _EmblemGroupJs2 = _interopRequireDefault(_EmblemGroupJs);

window.Emblem = _EmblemJs2['default'];
window.EmblemGroup = _EmblemGroupJs2['default'];

},{"./Emblem.js":77,"./EmblemGroup.js":78,"babel-runtime/helpers/interop-require-default":8}]},{},[79])
//# sourceMappingURL=bundle.js.map
