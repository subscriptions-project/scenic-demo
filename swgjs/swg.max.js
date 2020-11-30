(function(){(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CSS = void 0;
var CSS = ".swg-dialog,.swg-toast{box-sizing:border-box;background-color:#fff!important}.swg-toast{position:fixed!important;bottom:0!important;max-height:46px!important;z-index:2147483647!important;border:none!important}@media (max-height:640px), (max-width:640px){.swg-dialog,.swg-toast{width:480px!important;left:-240px!important;margin-left:50vw!important;border-top-left-radius:8px!important;border-top-right-radius:8px!important;box-shadow:0 1px 1px rgba(60,64,67,.3),0 1px 4px 1px rgba(60,64,67,.15)!important}}@media (min-width:640px) and (min-height:640px){.swg-dialog{width:630px!important;left:-315px!important;margin-left:50vw!important;background-color:transparent!important;border:none!important}.swg-toast{left:0!important}}@media (max-width:480px){.swg-dialog,.swg-toast{width:100%!important;left:0!important;right:0!important;margin-left:0!important}}\n/*# sourceURL=/./src/components/dialog.css*/";
exports.CSS = CSS;

},{}],2:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CSS = void 0;
var CSS = "body{padding:0;margin:0}swg-container,swg-loading,swg-loading-animate,swg-loading-image{display:block}swg-loading-container{width:100%!important;display:-ms-flexbox!important;display:flex!important;-ms-flex-align:center!important;align-items:center!important;-ms-flex-pack:center!important;justify-content:center!important;min-height:148px!important;height:100%!important;bottom:0!important;margin-top:5px!important;z-index:2147483647!important}@media (min-height:630px), (min-width:630px){swg-loading-container{width:560px!important;margin-left:35px!important;border-top-left-radius:8px!important;border-top-right-radius:8px!important;background-color:#fff!important;box-shadow:0 1px 1px rgba(60,64,67,.3),0 1px 4px 1px rgba(60,64,67,.15)!important}}swg-loading{z-index:2147483647!important;width:36px;height:36px;overflow:hidden;animation:mspin-rotate 1568.63ms linear infinite}swg-loading-animate{animation:mspin-revrot 5332ms steps(4) infinite}swg-loading-image{background-image:url(/assets/loader.svg);background-size:100%;width:11664px;height:36px;animation:swg-loading-film 5332ms steps(324) infinite}@keyframes swg-loading-film{0%{transform:translateX(0)}to{transform:translateX(-11664px)}}@keyframes mspin-rotate{0%{transform:rotate(0deg)}to{transform:rotate(1turn)}}@keyframes mspin-revrot{0%{transform:rotate(0deg)}to{transform:rotate(-1turn)}}\n/*# sourceURL=/./src/ui/ui.css*/";
exports.CSS = CSS;

},{}],3:[function(require,module,exports){
'use strict';

/**
 * Constructs a ES6/Promises A+ Promise instance.
 *
 * @constructor
 * @param {function(function(*=), function (*=))} resolver
 */
function Promise(resolver) {
  if (!(this instanceof Promise)) {
    throw new TypeError('Constructor Promise requires `new`');
  }
  if (!isFunction(resolver)) {
    throw new TypeError('Must pass resolver function');
  }

  /**
   * @type {function(this:Promise,*=,function(*=),function(*=),Deferred):!Promise}
   * @private
   */
  this._state = PendingPromise;

  /**
   * @type {*}
   * @private
   */
  this._value = [];

  /**
   * @type {boolean}
   * @private
   */
  this._isChainEnd = true;

  doResolve(
    this,
    adopter(this, FulfilledPromise),
    adopter(this, RejectedPromise),
    { then: resolver }
  );
}

/****************************
  Public Instance Methods
 ****************************/

/**
 * Creates a new promise instance that will receive the result of this promise
 * as inputs to the onFulfilled or onRejected callbacks.
 *
 * @param {function(*)} onFulfilled
 * @param {function(*)} onRejected
 */
Promise.prototype.then = function(onFulfilled, onRejected) {
  onFulfilled = isFunction(onFulfilled) ? onFulfilled : void 0;
  onRejected = isFunction(onRejected) ? onRejected : void 0;

  if (onFulfilled || onRejected) {
    this._isChainEnd = false;
  }

  return this._state(
    this._value,
    onFulfilled,
    onRejected
  );
};

/**
 * Creates a new promise that will handle the rejected state of this promise.
 *
 * @param {function(*)} onRejected
 * @returns {!Promise}
 */
Promise.prototype.catch = function(onRejected) {
  return this.then(void 0, onRejected);
};

/****************************
  Public Static Methods
 ****************************/

/**
 * Creates a fulfilled Promise of value. If value is itself a then-able,
 * resolves with the then-able's value.
 *
 * @this {!Promise}
 * @param {*=} value
 * @returns {!Promise}
 */
Promise.resolve = function(value) {
  var Constructor = this;
  var promise;

  if (isObject(value) && value instanceof this) {
    promise = value;
  } else {
    promise = new Constructor(function(resolve) {
      resolve(value);
    });
  }

  return /** @type {!Promise} */(promise);
};

/**
 * Creates a rejected Promise of reason.
 *
 * @this {!Promise}
 * @param {*=} reason
 * @returns {!Promise}
 */
Promise.reject = function(reason) {
  var Constructor = this;
  var promise = new Constructor(function(_, reject) {
    reject(reason);
  });

  return /** @type {!Promise} */(promise);
};

/**
 * Creates a Promise that will resolve with an array of the values of the
 * passed in promises. If any promise rejects, the returned promise will
 * reject.
 *
 * @this {!Promise}
 * @param {!Array<Promise|*>} promises
 * @returns {!Promise}
 */
Promise.all = function(promises) {
  var Constructor = this;
  var promise = new Constructor(function(resolve, reject) {
    var length = promises.length;
    var values = new Array(length);

    if (length === 0) {
      return resolve(values);
    }

    each(promises, function(promise, index) {
      Constructor.resolve(promise).then(function(value) {
        values[index] = value;
        if (--length === 0) {
          resolve(values);
        }
      }, reject);
    });
  });

  return /** @type {!Promise} */(promise);
};

/**
 * Creates a Promise that will resolve or reject based on the first
 * resolved or rejected promise.
 *
 * @this {!Promise}
 * @param {!Array<Promise|*>} promises
 * @returns {!Promise}
 */
Promise.race = function(promises) {
  var Constructor = this;
  var promise = new Constructor(function(resolve, reject) {
    for (var i = 0; i < promises.length; i++) {
      Constructor.resolve(promises[i]).then(resolve, reject);
    }
  });

  return /** @type {!Promise} */(promise);
};

var onPossiblyUnhandledRejection = function(reason, promise) {
  throw reason;
};

/**
 * An internal use static function.
 */
Promise._overrideUnhandledExceptionHandler = function(handler) {
  onPossiblyUnhandledRejection = handler;
};

/****************************
  Private functions
 ****************************/

/**
 * The Fulfilled Promise state. Calls onFulfilled with the resolved value of
 * this promise, creating a new promise.
 *
 * If there is no onFulfilled, returns the current promise to avoid a promise
 * instance.
 *
 * @this {!Promise} The current promise
 * @param {*=} value The current promise's resolved value.
 * @param {function(*=)=} onFulfilled
 * @param {function(*=)=} unused
 * @param {Deferred} deferred A deferred object that holds a promise and its
 *     resolve and reject functions. It IS NOT passed when called from
 *     Promise#then to save an object instance (since we may return the current
 *     promise). It IS passed in when adopting the Fulfilled state from the
 *     Pending state.
 * @returns {!Promise}
 */
function FulfilledPromise(value, onFulfilled, unused, deferred) {
  if (!onFulfilled) {
    deferredAdopt(deferred, FulfilledPromise, value);
    return this;
  }
  if (!deferred) {
    deferred = new Deferred(this.constructor);
  }
  defer(tryCatchDeferred(deferred, onFulfilled, value));
  return deferred.promise;
}

/**
 * The Rejected Promise state. Calls onRejected with the resolved value of
 * this promise, creating a new promise.
 *
 * If there is no onRejected, returns the current promise to avoid a promise
 * instance.
 *
 * @this {!Promise} The current promise
 * @param {*=} reason The current promise's rejection reason.
 * @param {function(*=)=} unused
 * @param {function(*=)=} onRejected
 * @param {Deferred} deferred A deferred object that holds a promise and its
 *     resolve and reject functions. It IS NOT passed when called from
 *     Promise#then to save an object instance (since we may return the current
 *     promise). It IS passed in when adopting the Rejected state from the
 *     Pending state.
 * @returns {!Promise}
 */
function RejectedPromise(reason, unused, onRejected, deferred) {
  if (!onRejected) {
    deferredAdopt(deferred, RejectedPromise, reason);
    return this;
  }
  if (!deferred) {
    deferred = new Deferred(this.constructor);
  }
  defer(tryCatchDeferred(deferred, onRejected, reason));
  return deferred.promise;
}

/**
 * The Pending Promise state. Eventually calls onFulfilled once the promise has
 * resolved, or onRejected once the promise rejects.
 *
 * If there is no onFulfilled and no onRejected, returns the current promise to
 * avoid a promise instance.
 *
 * @this {!Promise} The current promise
 * @param {*=} queue The current promise's pending promises queue.
 * @param {function(*=)=} onFulfilled
 * @param {function(*=)=} onRejected
 * @param {Deferred} deferred A deferred object that holds a promise and its
 *     resolve and reject functions. It IS NOT passed when called from
 *     Promise#then to save an object instance (since we may return the current
 *     promise). It IS passed in when adopting the Pending state from the
 *     Pending state of another promise.
 * @returns {!Promise}
 */
function PendingPromise(queue, onFulfilled, onRejected, deferred) {
  if (!deferred) {
    if (!onFulfilled && !onRejected) { return this; }
    deferred = new Deferred(this.constructor);
  }
  queue.push({
    deferred: deferred,
    onFulfilled: onFulfilled || deferred.resolve,
    onRejected: onRejected || deferred.reject
  });
  return deferred.promise;
}

/**
 * Constructs a deferred instance that holds a promise and its resolve and
 * reject functions.
 *
 * @constructor
 */
function Deferred(Promise) {
  var deferred = this;
  /** @type {!Promise} */
  this.promise = new Promise(function(resolve, reject) {
    /** @type {function(*=)} */
    deferred.resolve = resolve;

    /** @type {function(*=)} */
    deferred.reject = reject;
  });
  return deferred;
}

/**
 * Transitions the state of promise to another state. This is only ever called
 * on with a promise that is currently in the Pending state.
 *
 * @param {!Promise} promise
 * @param {function(this:Promise,*=,function(*=),function(*=),Deferred):!Promise} state
 * @param {*=} value
 */
function adopt(promise, state, value, adoptee) {
  var queue = promise._value;
  promise._state = state;
  promise._value = value;

  if (adoptee && state === PendingPromise) {
    adoptee._state(value, void 0, void 0, {
      promise: promise,
      resolve: void 0,
      reject: void 0
    });
  }

  for (var i = 0; i < queue.length; i++) {
    var next = queue[i];
    promise._state(
      value,
      next.onFulfilled,
      next.onRejected,
      next.deferred
    );
  }
  queue.length = 0;

  // If we're adopting another promise, it's not the end of the promise chain,
  // the new promise is.
  if (adoptee) {
    adoptee._isChainEnd = false;
  }

  // Determine if this rejected promise will be "handled".
  if (state === RejectedPromise && promise._isChainEnd) {
    setTimeout(function() {
      if (promise._isChainEnd) {
        onPossiblyUnhandledRejection(value, promise);
      }
    }, 0);
  }
}

/**
 * A partial application of adopt.
 *
 * @param {!Promise} promise
 * @param {function(this:Promise,*=,function(*=),function(*=),Deferred):!Promise} state
 * @returns {function(*=)}
 */
function adopter(promise, state) {
  return function(value) {
    adopt(promise, state, value);
  };
}

/**
 * Updates a deferred promises state. Necessary for updating an adopting
 * promise's state when the adoptee resolves.
 *
 * @param {?Deferred} deferred
 * @param {function(this:Promise,*=,function(*=),function(*=),Deferred):!Promise} state
 * @param {*=} value
 */
function deferredAdopt(deferred, state, value) {
  if (deferred) {
    var promise = deferred.promise;
    promise._state = state;
    promise._value = value;
  }
}

/**
 * A no-op function to prevent double resolving.
 */
function noop() {}

/**
 * Tests if fn is a Function
 *
 * @param {*} fn
 * @returns {boolean}
 */
function isFunction(fn) {
  return typeof fn === 'function';
}

/**
 * Tests if fn is an Object
 *
 * @param {*} obj
 * @returns {boolean}
 */
function isObject(obj) {
  return obj === Object(obj);
}

/**
 * Iterates over each element of an array, calling the iterator with the
 * element and its index.
 *
 * @param {!Array} collection
 * @param {function(*=,number)} iterator
 */
function each(collection, iterator) {
  for (var i = 0; i < collection.length; i++) {
    iterator(collection[i], i);
  }
}

/**
 * Creates a function that will attempt to resolve the deferred with the return
 * of fn. If any error is raised, rejects instead.
 *
 * @param {!Deferred} deferred
 * @param {function(*=)} fn
 * @param {*} arg
 * @returns {function()}
 */
function tryCatchDeferred(deferred, fn, arg) {
  var promise = deferred.promise;
  var resolve = deferred.resolve;
  var reject = deferred.reject;
  return function() {
    try {
      var result = fn(arg);
      doResolve(promise, resolve, reject, result, result);
    } catch (e) {
      reject(e);
    }
  };
}

/**
 * Queues and executes multiple deferred functions on another run loop.
 */
var defer = (function() {
  /**
   * Defers fn to another run loop.
   */
  var scheduleFlush;
  if (typeof window !== 'undefined' && window.postMessage) {
    window.addEventListener('message', flush);
    scheduleFlush = function() {
      window.postMessage('macro-task', '*');
    };
  } else {
    scheduleFlush = function() {
      setTimeout(flush, 0);
    };
  }

  var queue = new Array(16);
  var length = 0;

  function flush() {
    for (var i = 0; i < length; i++) {
      var fn = queue[i];
      queue[i] = null;
      fn();
    }
    length = 0;
  }

  /**
   * @param {function()} fn
   */
  function defer(fn) {
    if (length === 0) { scheduleFlush(); }
    queue[length++] = fn;
  }

  return defer;
})();

/**
 * The Promise resolution procedure.
 * https://github.com/promises-aplus/promises-spec#the-promise-resolution-procedure
 *
 * @param {!Promise} promise
 * @param {function(*=)} resolve
 * @param {function(*=)} reject
 * @param {*} value
 * @param {*=} context
 */
function doResolve(promise, resolve, reject, value, context) {
  var _reject = reject;
  var then;
  var _resolve;
  try {
    if (value === promise) {
      throw new TypeError('Cannot fulfill promise with itself');
    }
    var isObj = isObject(value);
    if (isObj && value instanceof promise.constructor) {
      adopt(promise, value._state, value._value, value);
    } else if (isObj && (then = value.then) && isFunction(then)) {
      _resolve = function(value) {
        _resolve = _reject = noop;
        doResolve(promise, resolve, reject, value, value);
      };
      _reject = function(reason) {
        _resolve = _reject = noop;
        reject(reason);
      };
      then.call(
        context,
        function(value) { _resolve(value); },
        function(reason) { _reject(reason); }
      );
    } else {
      resolve(value);
    }
  } catch (e) {
    _reject(e);
  }
}

module.exports = Promise;

},{}],4:[function(require,module,exports){
/**
 * @license
 * Copyright 2017 The Web Activities Authors. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS-IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
 /** Version: 1.24 */
'use strict';

/*eslint no-unused-vars: 0*/


/**
 * @enum {string}
 */
const ActivityMode = {
  IFRAME: 'iframe',
  POPUP: 'popup',
  REDIRECT: 'redirect',
};


/**
 * The result code used for `ActivityResult`.
 * @enum {string}
 */
const ActivityResultCode = {
  OK: 'ok',
  CANCELED: 'canceled',
  FAILED: 'failed',
};


/**
 * The result of an activity. The activity implementation returns this object
 * for a successful result, a cancelation or a failure.
 * @struct
 */
class ActivityResult {
  /**
   * @param {!ActivityResultCode} code
   * @param {*} data
   * @param {!ActivityMode} mode
   * @param {string} origin
   * @param {boolean} originVerified
   * @param {boolean} secureChannel
   */
  constructor(code, data, mode, origin, originVerified, secureChannel) {
    /** @const {!ActivityResultCode} */
    this.code = code;
    /** @const {*} */
    this.data = code == ActivityResultCode.OK ? data : null;
    /** @const {!ActivityMode} */
    this.mode = mode;
    /** @const {string} */
    this.origin = origin;
    /** @const {boolean} */
    this.originVerified = originVerified;
    /** @const {boolean} */
    this.secureChannel = secureChannel;
    /** @const {boolean} */
    this.ok = code == ActivityResultCode.OK;
    /** @const {?Error} */
    this.error = code == ActivityResultCode.FAILED ?
        new Error(String(data) || '') :
        null;
  }
}


/**
 * The activity request that different types of hosts can be started with.
 * @typedef {{
 *   requestId: string,
 *   returnUrl: string,
 *   args: ?Object,
 *   origin: (string|undefined),
 *   originVerified: (boolean|undefined),
 * }}
 */
let ActivityRequest;


/**
 * The activity "open" options used for popups and redirects.
 *
 * - returnUrl: override the return URL. By default, the current URL will be
 *   used.
 * - skipRequestInUrl: removes the activity request from the URL, in case
 *   redirect is used. By default, the activity request is appended to the
 *   activity URL. This option can be used if the activity request is passed
 *   to the activity by some alternative means.
 * - disableRedirectFallback: disallows popup fallback to redirect. By default
 *   the redirect fallback is allowed. This option has to be used very carefully
 *   because there are many user agents that may fail to open a popup and it
 *   won't be always possible for the opener window to even be aware of such
 *   failures.
 *
 * @typedef {{
 *   returnUrl: (string|undefined),
 *   skipRequestInUrl: (boolean|undefined),
 *   disableRedirectFallback: (boolean|undefined),
 *   width: (number|undefined),
 *   height: (number|undefined),
 * }}
 */
let ActivityOpenOptions;


/**
 * Activity client-side binding. The port provides limited ways to communicate
 * with the activity and receive signals and results from it. Not every type
 * of activity exposes a port.
 *
 * @interface
 */
class ActivityPort {

  /**
   * Returns the mode of the activity: iframe, popup or redirect.
   * @return {!ActivityMode}
   */
  getMode() {}

  /**
   * Accepts the result when ready. The client should verify the activity's
   * mode, origin, verification and secure channel flags before deciding
   * whether or not to trust the result.
   *
   * Returns the promise that yields when the activity has been completed and
   * either a result, a cancelation or a failure has been returned.
   *
   * @return {!Promise<!ActivityResult>}
   */
  acceptResult() {}
}


/**
 * Activity client-side binding for messaging.
 *
 * Whether the host can or cannot receive a message depends on the type of
 * host and its state. Ensure that the code has an alternative path if
 * messaging is not available.
 *
 * @interface
 */
class ActivityMessagingPort {

  /**
   * Returns the target window where host is loaded. May be unavailable.
   * @return {?Window}
   */
  getTargetWin() {}

  /**
   * Sends a message to the host.
   * @param {!Object} payload
   */
  message(payload) {}

  /**
   * Registers a callback to receive messages from the host.
   * @param {function(!Object)} callback
   */
  onMessage(callback) {}

  /**
   * Creates a new communication channel or returns an existing one.
   * @param {string=} opt_name
   * @return {!Promise<!MessagePort>}
   */
  messageChannel(opt_name) {}
}



/** DOMException.ABORT_ERR name */
const ABORT_ERR_NAME = 'AbortError';

/** DOMException.ABORT_ERR = 20 */
const ABORT_ERR_CODE = 20;

/** @type {?HTMLAnchorElement} */
let aResolver;


/**
 * @param {string} urlString
 * @return {!HTMLAnchorElement}
 */
function parseUrl(urlString) {
  if (!aResolver) {
    aResolver = /** @type {!HTMLAnchorElement} */ (document.createElement('a'));
  }
  aResolver.href = urlString;
  return /** @type {!HTMLAnchorElement} */ (aResolver);
}


/**
 * @param {!Location|!URL|!HTMLAnchorElement} loc
 * @return {string}
 */
function getOrigin(loc) {
  if (loc.origin) {
    return loc.origin;
  }
  // Make sure that the origin is normalized. Specifically on IE, host sometimes
  // includes the default port, which is not per standard.
  const protocol = loc.protocol;
  let host = loc.host;
  if (protocol == 'https:' && host.indexOf(':443') == host.length - 4) {
    host = host.replace(':443', '');
  } else if (protocol == 'http:' && host.indexOf(':80') == host.length - 3) {
    host = host.replace(':80', '');
  }
  return protocol + '//' + host;
}


/**
 * @param {string} urlString
 * @return {string}
 */
function getOriginFromUrl(urlString) {
  return getOrigin(parseUrl(urlString));
}


/**
 * @param {string} urlString
 * @return {string}
 */
function removeFragment(urlString) {
  const index = urlString.indexOf('#');
  if (index == -1) {
    return urlString;
  }
  return urlString.substring(0, index);
}


/**
 * Parses and builds Object of URL query string.
 * @param {string} query The URL query string.
 * @return {!Object<string, string>}
 */
function parseQueryString(query) {
  if (!query) {
    return {};
  }
  return (/^[?#]/.test(query) ? query.slice(1) : query)
      .split('&')
      .reduce((params, param) => {
        const item = param.split('=');
        const key = decodeURIComponent(item[0] || '');
        const value = decodeURIComponent(item[1] || '');
        if (key) {
          params[key] = value;
        }
        return params;
      }, {});
}


/**
 * @param {string} queryString  A query string in the form of "a=b&c=d". Could
 *   be optionally prefixed with "?" or "#".
 * @param {string} param The param to get from the query string.
 * @return {?string}
 */
function getQueryParam(queryString, param) {
  return parseQueryString(queryString)[param];
}


/**
 * Add a query-like parameter to the fragment string.
 * @param {string} url
 * @param {string} param
 * @param {string} value
 * @return {string}
 */
function addFragmentParam(url, param, value) {
  return url +
      (url.indexOf('#') == -1 ? '#' : '&') +
      encodeURIComponent(param) + '=' + encodeURIComponent(value);
}


/**
 * @param {string} queryString  A query string in the form of "a=b&c=d". Could
 *   be optionally prefixed with "?" or "#".
 * @param {string} param The param to remove from the query string.
 * @return {?string}
 */
function removeQueryParam(queryString, param) {
  if (!queryString) {
    return queryString;
  }
  const search = encodeURIComponent(param) + '=';
  let index = -1;
  do {
    index = queryString.indexOf(search, index);
    if (index != -1) {
      const prev = index > 0 ? queryString.substring(index - 1, index) : '';
      if (prev == '' || prev == '?' || prev == '#' || prev == '&') {
        let end = queryString.indexOf('&', index + 1);
        if (end == -1) {
          end = queryString.length;
        }
        queryString =
            queryString.substring(0, index) +
            queryString.substring(end + 1);
      } else {
        index++;
      }
    }
  } while (index != -1 && index < queryString.length);
  return queryString;
}


/**
 * @param {!ActivityRequest} request
 * @return {string}
 */
function serializeRequest(request) {
  const map = {
    'requestId': request.requestId,
    'returnUrl': request.returnUrl,
    'args': request.args,
  };
  if (request.origin !== undefined) {
    map['origin'] = request.origin;
  }
  if (request.originVerified !== undefined) {
    map['originVerified'] = request.originVerified;
  }
  return JSON.stringify(map);
}


/**
 * @param {*} error
 * @return {boolean}
 */
function isAbortError(error) {
  if (!error || typeof error != 'object') {
    return false;
  }
  return (error['name'] === ABORT_ERR_NAME);
}


/**
 * Creates or emulates a DOMException of AbortError type.
 * See https://heycam.github.io/webidl/#aborterror.
 * @param {!Window} win
 * @param {string=} opt_message
 * @return {!DOMException}
 */
function createAbortError(win, opt_message) {
  const message = 'AbortError' + (opt_message ? ': ' + opt_message : '');
  let error = null;
  if (typeof win['DOMException'] == 'function') {
    // TODO(dvoytenko): remove typecast once externs are fixed.
    const constr = /** @type {function(new:DOMException, string, string)} */ (
        win['DOMException']);
    try {
      error = new constr(message, ABORT_ERR_NAME);
    } catch (e) {
      // Ignore. In particular, `new DOMException()` fails in Edge.
    }
  }
  if (!error) {
    // TODO(dvoytenko): remove typecast once externs are fixed.
    const constr = /** @type {function(new:DOMException, string)} */ (
        Error);
    error = new constr(message);
    error.name = ABORT_ERR_NAME;
    error.code = ABORT_ERR_CODE;
  }
  return error;
}


/**
 * Resolves the activity result as a promise:
 *  - `OK` result is yielded as the promise's payload;
 *  - `CANCEL` result is rejected with the `AbortError`;
 *  - `FAILED` result is rejected with the embedded error.
 *
 * @param {!Window} win
 * @param {!ActivityResult} result
 * @param {function((!ActivityResult|!Promise))} resolver
 */
function resolveResult(win, result, resolver) {
  if (result.ok) {
    resolver(result);
  } else {
    const error = result.error || createAbortError(win);
    error.activityResult = result;
    resolver(Promise.reject(error));
  }
}


/**
 * @param {!Window} win
 * @return {boolean}
 */
function isIeBrowser(win) {
  // MSIE and Trident are typical user agents for IE browsers.
  const nav = win.navigator;
  return /Trident|MSIE|IEMobile/i.test(nav && nav.userAgent);
}


/**
 * @param {!Window} win
 * @return {boolean}
 */
function isEdgeBrowser(win) {
  const nav = win.navigator;
  return /Edge/i.test(nav && nav.userAgent);
}


/**
 * @param {!Error} e
 */
function throwAsync(e) {
  setTimeout(() => {throw e;});
}


/**
 * Polyfill of the `Node.isConnected` API. See
 * https://developer.mozilla.org/en-US/docs/Web/API/Node/isConnected.
 * @param {!Node} node
 * @return {boolean}
 */
function isNodeConnected(node) {
  // Ensure that node is attached if specified. This check uses a new and
  // fast `isConnected` API and thus only checked on platforms that have it.
  // See https://www.chromestatus.com/feature/5676110549352448.
  if ('isConnected' in node) {
    return node['isConnected'];
  }
  // Polyfill.
  const root = node.ownerDocument && node.ownerDocument.documentElement;
  return (root && root.contains(node)) || false;
}



const SENTINEL = '__ACTIVITIES__';


/**
 * The messenger helper for activity's port and host.
 */
class Messenger {

  /**
   * @param {!Window} win
   * @param {!Window|function():?Window} targetOrCallback
   * @param {?string} targetOrigin
   * @param {boolean} requireTarget
   */
  constructor(win, targetOrCallback, targetOrigin, requireTarget) {
    /** @private @const {!Window} */
    this.win_ = win;

    /** @private @const {!Window|function():?Window} */
    this.targetOrCallback_ = targetOrCallback;

    /**
     * May start as unknown (`null`) until received in the first message.
     * @private {?string}
     */
    this.targetOrigin_ = targetOrigin;

    /** @private @const {boolean} */
    this.requireTarget_ = requireTarget;

    /** @private {?Window} */
    this.target_ = null;

    /** @private {boolean} */
    this.acceptsChannel_ = false;

    /** @private {?MessagePort} */
    this.port_ = null;

    /** @private {?function(string, ?Object)} */
    this.onCommand_ = null;

    /** @private {?function(!Object)} */
    this.onCustomMessage_ = null;

    /**
     * @private {?Object<string, !ChannelHolder>}
     */
    this.channels_ = null;

    /** @private @const */
    this.boundHandleEvent_ = this.handleEvent_.bind(this);
  }

  /**
   * Connect the port to the host or vice versa.
   * @param {function(string, ?Object)} onCommand
   */
  connect(onCommand) {
    if (this.onCommand_) {
      throw new Error('already connected');
    }
    this.onCommand_ = onCommand;
    this.win_.addEventListener('message', this.boundHandleEvent_);
  }

  /**
   * Disconnect messenger.
   */
  disconnect() {
    if (this.onCommand_) {
      this.onCommand_ = null;
      if (this.port_) {
        closePort(this.port_);
        this.port_ = null;
      }
      this.win_.removeEventListener('message', this.boundHandleEvent_);
      if (this.channels_) {
        for (const k in this.channels_) {
          const channelObj = this.channels_[k];
          if (channelObj.port1) {
            closePort(channelObj.port1);
          }
          if (channelObj.port2) {
            closePort(channelObj.port2);
          }
        }
        this.channels_ = null;
      }
    }
  }

  /**
   * Returns whether the messenger has been connected already.
   * @return {boolean}
   */
  isConnected() {
    return this.targetOrigin_ != null;
  }

  /**
   * Returns the messaging target. Only available when connection has been
   * establihsed.
   * @return {!Window}
   */
  getTarget() {
    const target = this.getOptionalTarget_();
    if (!target) {
      throw new Error('not connected');
    }
    return target;
  }

  /**
   * @return {?Window}
   * @private
   */
  getOptionalTarget_() {
    if (this.onCommand_ && !this.target_) {
      if (typeof this.targetOrCallback_ == 'function') {
        this.target_ = this.targetOrCallback_();
      } else {
        this.target_ = /** @type {!Window} */ (this.targetOrCallback_);
      }
    }
    return this.target_;
  }

  /**
   * Returns the messaging origin. Only available when connection has been
   * establihsed.
   * @return {string}
   */
  getTargetOrigin() {
    if (this.targetOrigin_ == null) {
      throw new Error('not connected');
    }
    return this.targetOrigin_;
  }

  /**
   * The host sends this message to the client to indicate that it's ready to
   * start communicating. The client is expected to respond back with the
   * "start" command. See `sendStartCommand` method.
   */
  sendConnectCommand() {
    // TODO(dvoytenko): MessageChannel is critically necessary for IE/Edge,
    // since window messaging doesn't always work. It's also preferred as an API
    // for other browsers: it's newer, cleaner and arguably more secure.
    // Unfortunately, browsers currently do not propagate user gestures via
    // MessageChannel, only via window messaging. This should be re-enabled
    // once browsers fix user gesture propagation.
    // See:
    // Safari: https://bugs.webkit.org/show_bug.cgi?id=186593
    // Chrome: https://bugs.chromium.org/p/chromium/issues/detail?id=851493
    // Firefox: https://bugzilla.mozilla.org/show_bug.cgi?id=1469422
    const acceptsChannel = isIeBrowser(this.win_) || isEdgeBrowser(this.win_);
    this.sendCommand('connect', {'acceptsChannel': acceptsChannel});
  }

  /**
   * The client sends this message to the host upon receiving the "connect"
   * message to start the main communication channel. As a payload, the message
   * will contain the provided start arguments.
   * @param {?Object} args
   */
  sendStartCommand(args) {
    let channel = null;
    if (this.acceptsChannel_ && typeof this.win_.MessageChannel == 'function') {
      channel = new this.win_.MessageChannel();
    }
    if (channel) {
      this.sendCommand('start', args, [channel.port2]);
      // It's critical to switch to port messaging only after "start" has been
      // sent. Otherwise, it won't be delivered.
      this.switchToChannel_(channel.port1);
    } else {
      this.sendCommand('start', args);
    }
  }

  /**
   * Sends the specified command from the port to the host or vice versa.
   * @param {string} cmd
   * @param {?Object=} opt_payload
   * @param {?Array=} opt_transfer
   */
  sendCommand(cmd, opt_payload, opt_transfer) {
    const data = {
      'sentinel': SENTINEL,
      'cmd': cmd,
      'payload': opt_payload || null,
    };
    if (this.port_) {
      this.port_.postMessage(data, opt_transfer || undefined);
    } else {
      const target = this.getTarget();
      // Only "connect" command is allowed to use `targetOrigin == '*'`
      const targetOrigin =
          cmd == 'connect' ?
          (this.targetOrigin_ != null ? this.targetOrigin_ : '*') :
          this.getTargetOrigin();
      target.postMessage(data, targetOrigin, opt_transfer || undefined);
    }
  }

  /**
   * Sends a message to the client.
   * @param {!Object} payload
   */
  customMessage(payload) {
    this.sendCommand('msg', payload);
  }

  /**
   * Registers a callback to receive messages from the client.
   * @param {function(!Object)} callback
   */
  onCustomMessage(callback) {
    this.onCustomMessage_ = callback;
  }

  /**
   * @param {string=} opt_name
   * @return {!Promise<!MessagePort>}
   */
  startChannel(opt_name) {
    const name = opt_name || '';
    const channelObj = this.getChannelObj_(name);
    if (!channelObj.port1) {
      const channel = new this.win_.MessageChannel();
      channelObj.port1 = channel.port1;
      channelObj.port2 = channel.port2;
      channelObj.resolver(channelObj.port1);
    }
    if (channelObj.port2) {
      // Not yet sent.
      this.sendCommand('cnset', {'name': name}, [channelObj.port2]);
      channelObj.port2 = null;
    }
    return channelObj.promise;
  }

  /**
   * @param {string=} opt_name
   * @return {!Promise<!MessagePort>}
   */
  askChannel(opt_name) {
    const name = opt_name || '';
    const channelObj = this.getChannelObj_(name);
    if (!channelObj.port1) {
      this.sendCommand('cnget', {'name': name});
    }
    return channelObj.promise;
  }

  /**
   * @param {string} name
   * @param {!MessagePort} port
   * @private
   */
  receiveChannel_(name, port) {
    const channelObj = this.getChannelObj_(name);
    channelObj.port1 = port;
    channelObj.resolver(port);
  }

  /**
   * @param {string} name
   * @return {!ChannelHolder}
   */
  getChannelObj_(name) {
    if (!this.channels_) {
      this.channels_ = {};
    }
    let channelObj = this.channels_[name];
    if (!channelObj) {
      let resolver;
      const promise = new Promise(resolve => {
        resolver = resolve;
      });
      channelObj = {
        port1: null,
        port2: null,
        resolver,
        promise,
      };
      this.channels_[name] = channelObj;
    }
    return channelObj;
  }

  /**
   * @param {!MessagePort} port
   * @private
   */
  switchToChannel_(port) {
    if (this.port_) {
      closePort(this.port_);
    }
    this.port_ = port;
    this.port_.onmessage = event => {
      const data = event.data;
      const cmd = data && data['cmd'];
      const payload = data && data['payload'] || null;
      if (cmd) {
        this.handleCommand_(cmd, payload, event);
      }
    };
    // Even though all messaging will switch to ports, the window-based message
    // listener will be preserved just in case the host is refreshed and needs
    // another connection.
  }

  /**
   * @param {!MessageEvent} event
   * @private
   */
  handleEvent_(event) {
    if (this.requireTarget_ && this.getOptionalTarget_() != event.source) {
      // When target is required, confirm it against the event.source. This
      // is normally only needed for ports where a single window can include
      // multiple iframes to match the event to a specific iframe. Otherwise,
      // the origin checks below are sufficient.
      return;
    }
    const data = event.data;
    if (!data || data['sentinel'] != SENTINEL) {
      return;
    }
    const cmd = data['cmd'];
    if (this.port_ && cmd != 'connect' && cmd != 'start') {
      // Messaging channel has already taken over. However, the "connect" and
      // "start" commands are allowed to proceed in case re-connection is
      // requested.
      return;
    }
    const origin = /** @type {string} */ (event.origin);
    const payload = data['payload'] || null;
    if (this.targetOrigin_ == null && cmd == 'start') {
      this.targetOrigin_ = origin;
    }
    if (this.targetOrigin_ == null && event.source) {
      if (this.getOptionalTarget_() == event.source) {
        this.targetOrigin_ = origin;
      }
    }
    // Notice that event.source may differ from the target because of
    // friendly-iframe intermediaries.
    if (origin != this.targetOrigin_) {
      return;
    }
    this.handleCommand_(cmd, payload, event);
  }

  /**
   * @param {string} cmd
   * @param {?Object} payload
   * @param {!MessageEvent} event
   * @private
   */
  handleCommand_(cmd, payload, event) {
    if (cmd == 'connect') {
      if (this.port_) {
        // In case the port has already been open - close it to reopen it
        // again later.
        closePort(this.port_);
        this.port_ = null;
      }
      this.acceptsChannel_ = payload && payload['acceptsChannel'] || false;
      this.onCommand_(cmd, payload);
    } else if (cmd == 'start') {
      const port = event.ports && event.ports[0];
      if (port) {
        this.switchToChannel_(port);
      }
      this.onCommand_(cmd, payload);
    } else if (cmd == 'msg') {
      if (this.onCustomMessage_ != null && payload != null) {
        this.onCustomMessage_(payload);
      }
    } else if (cmd == 'cnget') {
      const name = payload['name'];
      this.startChannel(name);
    } else if (cmd == 'cnset') {
      const name = payload['name'];
      const port = event.ports[0];
      this.receiveChannel_(name, /** @type {!MessagePort} */ (port));
    } else {
      this.onCommand_(cmd, payload);
    }
  }
}


/**
 * @param {!MessagePort} port
 */
function closePort(port) {
  try {
    port.close();
  } catch (e) {
    // Ignore.
  }
}




/**
 * The `ActivityPort` implementation for the iframe case. Unlike other types
 * of activities, iframe-based activities are always connected and can react
 * to size requests.
 *
 * @implements {ActivityPort}
 * @implements {ActivityMessagingPort}
 */
class ActivityIframePort {

  /**
   * @param {!HTMLIFrameElement} iframe
   * @param {string} url
   * @param {?Object=} opt_args
   */
  constructor(iframe, url, opt_args) {
    /** @private @const {!HTMLIFrameElement} */
    this.iframe_ = iframe;
    /** @private @const {string} */
    this.url_ = url;
    /** @private @const {?Object} */
    this.args_ = opt_args || null;

    /** @private @const {!Window} */
    this.win_ = /** @type {!Window} */ (this.iframe_.ownerDocument.defaultView);

    /** @private @const {string} */
    this.targetOrigin_ = getOriginFromUrl(url);

    /** @private {boolean} */
    this.connected_ = false;

    /** @private {?function()} */
    this.connectedResolver_ = null;

    /** @private @const {!Promise} */
    this.connectedPromise_ = new Promise(resolve => {
      this.connectedResolver_ = resolve;
    });

    /** @private {?function()} */
    this.readyResolver_ = null;

    /** @private @const {!Promise} */
    this.readyPromise_ = new Promise(resolve => {
      this.readyResolver_ = resolve;
    });

    /** @private {?function((!ActivityResult|!Promise))} */
    this.resultResolver_ = null;

    /** @private @const {!Promise<!ActivityResult>} */
    this.resultPromise_ = new Promise(resolve => {
      this.resultResolver_ = resolve;
    });

    /** @private {?function(number)} */
    this.onResizeRequest_ = null;

    /** @private {?number} */
    this.requestedHeight_ = null;

    /** @private @const {!Messenger} */
    this.messenger_ = new Messenger(
        this.win_,
        () => this.iframe_.contentWindow,
        this.targetOrigin_,
        /* requireTarget */ true);
  }

  /** @override */
  getMode() {
    return ActivityMode.IFRAME;
  }

  /**
   * Waits until the activity port is connected to the host.
   * @return {!Promise}
   */
  connect() {
    if (!isNodeConnected(this.iframe_)) {
      throw new Error('iframe must be in DOM');
    }
    this.messenger_.connect(this.handleCommand_.bind(this));
    this.iframe_.src = this.url_;
    return this.connectedPromise_;
  }

  /**
   * Disconnect the activity binding and cleanup listeners.
   */
  disconnect() {
    this.connected_ = false;
    this.messenger_.disconnect();
  }

  /** @override */
  acceptResult() {
    return this.resultPromise_;
  }

  /** @override */
  getTargetWin() {
    return this.iframe_.contentWindow || null;
  }

  /** @override */
  message(payload) {
    this.messenger_.customMessage(payload);
  }

  /** @override */
  onMessage(callback) {
    this.messenger_.onCustomMessage(callback);
  }

  /** @override */
  messageChannel(opt_name) {
    return this.messenger_.askChannel(opt_name);
  }

  /**
   * Returns a promise that yields when the iframe is ready to be interacted
   * with.
   * @return {!Promise}
   */
  whenReady() {
    return this.readyPromise_;
  }

  /**
   * Register a callback to handle resize requests. Once successfully resized,
   * ensure to call `resized()` method.
   * @param {function(number)} callback
   */
  onResizeRequest(callback) {
    this.onResizeRequest_ = callback;
    Promise.resolve().then(() => {
      if (this.requestedHeight_ != null) {
        callback(this.requestedHeight_);
      }
    });
  }

  /**
   * Signals back to the activity implementation that the client has updated
   * the activity's size.
   */
  resized() {
    if (!this.connected_) {
      return;
    }
    const height = this.iframe_.offsetHeight;
    this.messenger_.sendCommand('resized', {'height': height});
  }

  /**
   * @param {string} cmd
   * @param {?Object} payload
   * @private
   */
  handleCommand_(cmd, payload) {
    if (cmd == 'connect') {
      // First ever message. Indicates that the receiver is listening.
      this.connected_ = true;
      this.messenger_.sendStartCommand(this.args_);
      this.connectedResolver_();
    } else if (cmd == 'result') {
      // The last message. Indicates that the result has been received.
      if (this.resultResolver_) {
        const code = /** @type {!ActivityResultCode} */ (payload['code']);
        const data =
            code == ActivityResultCode.FAILED ?
            new Error(payload['data'] || '') :
            payload['data'];
        const result = new ActivityResult(
            code,
            data,
            ActivityMode.IFRAME,
            this.messenger_.getTargetOrigin(),
            /* originVerified */ true,
            /* secureChannel */ true);
        resolveResult(this.win_, result, this.resultResolver_);
        this.resultResolver_ = null;
        this.messenger_.sendCommand('close');
        this.disconnect();
      }
    } else if (cmd == 'ready') {
      if (this.readyResolver_) {
        this.readyResolver_();
        this.readyResolver_ = null;
      }
    } else if (cmd == 'resize') {
      this.requestedHeight_ = /** @type {number} */ (payload['height']);
      if (this.onResizeRequest_) {
        this.onResizeRequest_(this.requestedHeight_);
      }
    }
  }
}




/**
 * The `ActivityPort` implementation for the standalone window activity
 * client executed as a popup.
 *
 * @implements {ActivityPort}
 * @implements {ActivityMessagingPort}
 */
class ActivityWindowPort {

  /**
   * @param {!Window} win
   * @param {string} requestId
   * @param {string} url
   * @param {string} target
   * @param {?Object=} opt_args
   * @param {?ActivityOpenOptions=} opt_options
   */
  constructor(win, requestId, url, target, opt_args, opt_options) {
    const isValidTarget =
        target &&
        (target == '_blank' || target == '_top' || target[0] != '_');
    if (!isValidTarget) {
      throw new Error('The only allowed targets are "_blank", "_top"' +
          ' and name targets');
    }

    /** @private @const {!Window} */
    this.win_ = win;
    /** @private @const {string} */
    this.requestId_ = requestId;
    /** @private @const {string} */
    this.url_ = url;
    /** @private @const {string} */
    this.openTarget_ = target;
    /** @private @const {?Object} */
    this.args_ = opt_args || null;
    /** @private @const {!ActivityOpenOptions} */
    this.options_ = opt_options || {};

    /** @private {?function()} */
    this.connectedResolver_ = null;

    /** @private @const {!Promise} */
    this.connectedPromise_ = new Promise(resolve => {
      this.connectedResolver_ = resolve;
    });

    /** @private {?function((!ActivityResult|!Promise))} */
    this.resultResolver_ = null;

    /** @private @const {!Promise<!ActivityResult>} */
    this.resultPromise_ = new Promise(resolve => {
      this.resultResolver_ = resolve;
    });

    /** @private {?Window} */
    this.targetWin_ = null;

    /** @private {?number} */
    this.heartbeatInterval_ = null;

    /** @private {?Messenger} */
    this.messenger_ = null;
  }

  /** @override */
  getMode() {
    return this.openTarget_ == '_top' ?
        ActivityMode.REDIRECT :
        ActivityMode.POPUP;
  }

  /**
   * Opens the activity in a window, either as a popup or via redirect.
   *
   * Returns the promise that will yield when the window returns or closed.
   * Notice, that this promise may never complete if "redirect" mode was used.
   *
   * @return {!Promise}
   */
  open() {
    return this.openInternal_();
  }

  /**
   * Waits until the activity port is connected to the host.
   * @return {!Promise}
   */
  whenConnected() {
    return this.connectedPromise_;
  }

  /**
   * Disconnect the activity binding and cleanup listeners.
   */
  disconnect() {
    if (this.heartbeatInterval_) {
      this.win_.clearInterval(this.heartbeatInterval_);
      this.heartbeatInterval_ = null;
    }
    if (this.messenger_) {
      this.messenger_.disconnect();
      this.messenger_ = null;
    }
    if (this.targetWin_) {
      // Try to close the popup window. The host will also try to do the same.
      try {
        this.targetWin_.close();
      } catch (e) {
        // Ignore.
      }
      this.targetWin_ = null;
    }
    this.resultResolver_ = null;
  }

  /** @override */
  getTargetWin() {
    return this.targetWin_;
  }

  /** @override */
  acceptResult() {
    return this.resultPromise_;
  }

  /**
   * Sends a message to the host.
   * Whether the host can or cannot receive a message depends on the type of
   * host and its state. Ensure that the code has an alternative path if
   * messaging is not available.
   * @override
   */
  message(payload) {
    this.messenger_.customMessage(payload);
  }

  /**
   * Registers a callback to receive messages from the host.
   * Whether the host can or cannot receive a message depends on the type of
   * host and its state. Ensure that the code has an alternative path if
   * messaging is not available.
   * @override
   */
  onMessage(callback) {
    this.messenger_.onCustomMessage(callback);
  }

  /**
   * Creates a new communication channel or returns an existing one.
   * Whether the host can or cannot receive a message depends on the type of
   * host and its state. Ensure that the code has an alternative path if
   * messaging is not available.
   * @override
   */
  messageChannel(opt_name) {
    return this.messenger_.askChannel(opt_name);
  }

  /**
   * This method wraps around window's open method. It first tries to execute
   * `open` call with the provided target and if it fails, it retries the call
   * with the `_top` target. This is necessary given that in some embedding
   * scenarios, such as iOS' WKWebView, navigation to `_blank` and other targets
   * is blocked by default.
   * @return {!Promise}
   * @private
   */
  openInternal_() {
    const featuresStr = this.buildFeatures_();

    // Protectively, the URL will contain the request payload, unless explicitly
    // directed not to via `skipRequestInUrl` option.
    let url = this.url_;
    if (!this.options_.skipRequestInUrl) {
      const returnUrl =
          this.options_.returnUrl ||
          removeFragment(this.win_.location.href);
      const requestString = serializeRequest({
        requestId: this.requestId_,
        returnUrl,
        args: this.args_,
      });
      url = addFragmentParam(url, '__WA__', requestString);
    }

    // Open the window.
    let targetWin;
    let openTarget = this.openTarget_;
    // IE does not support CORS popups - the popup has to fallback to redirect
    // mode.
    if (openTarget != '_top') {
      if (isIeBrowser(this.win_)) {
        openTarget = '_top';
      }
    }
    // Try first with the specified target. If we're inside the WKWebView or
    // a similar environments, this method is expected to fail by default for
    // all targets except `_top`.
    try {
      targetWin = this.win_.open(url, openTarget, featuresStr);
    } catch (e) {
      // Ignore.
    }
    // Then try with `_top` target.
    if (!targetWin &&
        openTarget != '_top' &&
        !this.options_.disableRedirectFallback) {
      openTarget = '_top';
      try {
        targetWin = this.win_.open(url, openTarget);
      } catch (e) {
        // Ignore.
      }
    }

    // Setup the target window.
    if (targetWin) {
      this.targetWin_ = targetWin;
      if (openTarget != '_top') {
        this.setupPopup_();
      }
    } else {
      this.disconnectWithError_(new Error('failed to open window'));
    }

    // Return result promise, even though it may never complete.
    return this.resultPromise_.catch(() => {
      // Ignore. Call to the `acceptResult()` should fail if needed.
    });
  }

  /**
   * @return {string}
   * @private
   */
  buildFeatures_() {
    // The max width and heights are calculated as following:
    // MaxSize = AvailSize - ControlsSize
    // ControlsSize = OuterSize - InnerSize
    const screen = this.win_.screen;
    const availWidth = screen.availWidth || screen.width;
    const availHeight = screen.availHeight || screen.height;
    const isTop = this.isTopWindow_();
    const isEdge = isEdgeBrowser(this.win_);
    // Limit controls to 100px width and height. Notice that it's only
    // possible to calculate controls size in the top window, not in iframes.
    // Notice that the Edge behavior is somewhat unique. If we can't find the
    // right width/height, it will launch in the full-screen. Other browsers
    // deal with such cases more gracefully.
    const controlsWidth =
        isTop && this.win_.outerWidth > this.win_.innerWidth ?
        Math.min(100, this.win_.outerWidth - this.win_.innerWidth) :
        (isEdge ? 100 : 0);
    const controlsHeight =
        isTop && this.win_.outerHeight > this.win_.innerHeight ?
        Math.min(100, this.win_.outerHeight - this.win_.innerHeight) :
        (isEdge ? 100 : 0);
    // With all the adjustments, at least 50% of the available width/height
    // should be made available to a popup.
    const maxWidth = Math.max(availWidth - controlsWidth, availWidth * 0.5);
    const maxHeight = Math.max(availHeight - controlsHeight, availHeight * 0.5);
    let w = Math.floor(Math.min(600, maxWidth * 0.9));
    let h = Math.floor(Math.min(600, maxHeight * 0.9));
    if (this.options_.width) {
      w = Math.min(this.options_.width, maxWidth);
    }
    if (this.options_.height) {
      h = Math.min(this.options_.height, maxHeight);
    }
    const x = Math.floor((screen.width - w) / 2);
    const y = Math.floor((screen.height - h) / 2);
    const features = {
      'height': h,
      'width': w,
      'resizable': 'yes',
      'scrollbars': 'yes',
    };
    // Do not set left/top in Edge: it fails.
    if (!isEdge) {
      features['left'] = x;
      features['top'] = y;
    }
    let featuresStr = '';
    for (const f in features) {
      if (featuresStr) {
        featuresStr += ',';
      }
      featuresStr += `${f}=${features[f]}`;
    }
    return featuresStr;
  }

  /**
   * This method only exists to make iframe/top emulation possible in tests.
   * Otherwise `window.top` cannot be overridden.
   * @return {boolean}
   * @private
   */
  isTopWindow_() {
    return this.win_ == this.win_.top;
  }

  /** @private */
  setupPopup_() {
    // Keep alive to catch the window closing, which would indicate
    // "cancel" signal.
    this.heartbeatInterval_ = this.win_.setInterval(() => {
      this.check_(/* delayCancel */ true);
    }, 500);

    // Start up messaging. The messaging is explicitly allowed to proceed
    // without origin check b/c all arguments have already been passed in
    // the URL and special handling is enforced when result is delivered.
    this.messenger_ = new Messenger(
        this.win_,
        /** @type {!Window} */ (this.targetWin_),
        /* targetOrigin */ null,
        /* requireTarget */ true);
    this.messenger_.connect(this.handleCommand_.bind(this));
  }

  /**
   * @param {boolean=} opt_delayCancel
   * @private
   */
  check_(opt_delayCancel) {
    if (!this.targetWin_ || this.targetWin_.closed) {
      if (this.heartbeatInterval_) {
        this.win_.clearInterval(this.heartbeatInterval_);
        this.heartbeatInterval_ = null;
      }
      // Give a chance for the result to arrive, but otherwise consider the
      // responce to be empty.
      this.win_.setTimeout(() => {
        try {
          this.result_(ActivityResultCode.CANCELED, /* data */ null);
        } catch (e) {
          this.disconnectWithError_(e);
        }
      }, opt_delayCancel ? 3000 : 0);
    }
  }

  /**
   * @param {!Error} reason
   * @private
   */
  disconnectWithError_(reason) {
    if (this.resultResolver_) {
      this.resultResolver_(Promise.reject(reason));
    }
    this.disconnect();
  }

  /**
   * @param {!ActivityResultCode} code
   * @param {*} data
   * @private
   */
  result_(code, data) {
    if (this.resultResolver_) {
      const isConnected = this.messenger_.isConnected();
      const result = new ActivityResult(
          code,
          data,
          ActivityMode.POPUP,
          isConnected ?
              this.messenger_.getTargetOrigin() :
              getOriginFromUrl(this.url_),
          /* originVerified */ isConnected,
          /* secureChannel */ isConnected);
      resolveResult(this.win_, result, this.resultResolver_);
      this.resultResolver_ = null;
    }
    if (this.messenger_) {
      this.messenger_.sendCommand('close');
    }
    this.disconnect();
  }

  /**
   * @param {string} cmd
   * @param {?Object} payload
   * @private
   */
  handleCommand_(cmd, payload) {
    if (cmd == 'connect') {
      // First ever message. Indicates that the receiver is listening.
      this.messenger_.sendStartCommand(this.args_);
      this.connectedResolver_();
    } else if (cmd == 'result') {
      // The last message. Indicates that the result has been received.
      const code = /** @type {!ActivityResultCode} */ (payload['code']);
      const data =
          code == ActivityResultCode.FAILED ?
          new Error(payload['data'] || '') :
          payload['data'];
      this.result_(code, data);
    } else if (cmd == 'check') {
      this.win_.setTimeout(() => this.check_(), 200);
    }
  }
}


/**
 * @param {!Window} win
 * @param {string} fragment
 * @param {string} requestId
 * @return {?ActivityPort}
 */
function discoverRedirectPort(win, fragment, requestId) {
  // Try to find the result in the fragment.
  const paramName = '__WA_RES__';
  const fragmentParam = getQueryParam(fragment, paramName);
  if (!fragmentParam) {
    return null;
  }
  const response = /** @type {?Object} */ (JSON.parse(fragmentParam));
  if (!response || response['requestId'] != requestId) {
    return null;
  }

  // Remove the found param from the fragment.
  const cleanFragment = removeQueryParam(win.location.hash, paramName) || '';
  if (cleanFragment != win.location.hash) {
    if (win.history && win.history.replaceState) {
      try {
        win.history.replaceState(win.history.state, '', cleanFragment);
      } catch (e) {
        // Ignore.
      }
    }
  }

  const code = response['code'];
  const data = response['data'];
  const origin = response['origin'];
  const referrerOrigin = win.document.referrer &&
      getOriginFromUrl(win.document.referrer);
  const originVerified = origin == referrerOrigin;
  return new ActivityWindowRedirectPort(
      win,
      code,
      data,
      origin,
      originVerified);
}


/**
 * The `ActivityPort` implementation for the standalone window activity
 * client executed as a popup.
 *
 * @implements {ActivityPort}
 */
class ActivityWindowRedirectPort {

  /**
   * @param {!Window} win
   * @param {!ActivityResultCode} code
   * @param {*} data
   * @param {string} targetOrigin
   * @param {boolean} targetOriginVerified
   */
  constructor(win, code, data, targetOrigin, targetOriginVerified) {
    /** @private @const {!Window} */
    this.win_ = win;
    /** @private @const {!ActivityResultCode} */
    this.code_ = code;
    /** @private @const {*} */
    this.data_ = data;
    /** @private {string} */
    this.targetOrigin_ = targetOrigin;
    /** @private {boolean} */
    this.targetOriginVerified_ = targetOriginVerified;
  }

  /** @override */
  getMode() {
    return ActivityMode.REDIRECT;
  }

  /** @override */
  acceptResult() {
    const result = new ActivityResult(
        this.code_,
        this.data_,
        ActivityMode.REDIRECT,
        this.targetOrigin_,
        this.targetOriginVerified_,
        /* secureChannel */ false);
    return new Promise(resolve => {
      resolveResult(this.win_, result, resolve);
    });
  }
}




/**
 * The page-level activities manager ports. This class is intended to be used
 * as a singleton. It can start activities of all modes: iframe, popup, and
 * redirect.
 */
class ActivityPorts {

  /**
   * @param {!Window} win
   */
  constructor(win) {
    /** @const {string} */
    this.version = '1.24';

    /** @private @const {!Window} */
    this.win_ = win;

    /** @private @const {string} */
    this.fragment_ = win.location.hash;

    /**
     * @private @const {!Object<string, !Array<function(!ActivityPort)>>}
     */
    this.requestHandlers_ = {};

    /**
     * The result buffer is indexed by `requestId`.
     * @private @const {!Object<string, !ActivityPort>}
     */
    this.resultBuffer_ = {};

    /** @private {?function(!Error)} */
    this.redirectErrorResolver_ = null;

    /** @private {!Promise<!Error>} */
    this.redirectErrorPromise_ = new Promise(resolve => {
      this.redirectErrorResolver_ = resolve;
    });
  }

  /**
   * Start an activity within the specified iframe.
   * @param {!HTMLIFrameElement} iframe
   * @param {string} url
   * @param {?Object=} opt_args
   * @return {!Promise<!ActivityIframePort>}
   */
  openIframe(iframe, url, opt_args) {
    const port = new ActivityIframePort(iframe, url, opt_args);
    return port.connect().then(() => port);
  }

  /**
   * Start an activity in a separate window. The result will be delivered
   * to the `onResult` callback.
   *
   * The activity can be opened in two modes: "popup" and "redirect". This
   * depends on the `target` value, but also on the browser/environment.
   *
   * The allowed `target` values are `_blank`, `_top` and name targets. The
   * `_self`, `_parent` and similar targets are not allowed.
   *
   * The `_top` target indicates that the activity should be opened as a
   * "redirect", while other targets indicate that the activity should be
   * opened as a popup. The activity client will try to honor the requested
   * target. However, it's not always possible. Some environments do not
   * allow popups and they either force redirect or fail the window open
   * request. In this case, the activity will try to fallback to the "redirect"
   * mode.
   *
   * @param {string} requestId
   * @param {string} url
   * @param {string} target
   * @param {?Object=} opt_args
   * @param {?ActivityOpenOptions=} opt_options
   * @return {{targetWin: ?Window}}
   */
  open(requestId, url, target, opt_args, opt_options) {
    const port = this.openWin_(requestId, url, target, opt_args, opt_options);
    return {targetWin: port.getTargetWin()};
  }

  /**
   * Start an activity in a separate window and tries to setup messaging with
   * this window.
   *
   * See `open()` method for more details, including `onResult` callback.
   *
   * @param {string} requestId
   * @param {string} url
   * @param {string} target
   * @param {?Object=} opt_args
   * @param {?ActivityOpenOptions=} opt_options
   * @return {!Promise<!ActivityMessagingPort>}
   */
  openWithMessaging(requestId, url, target, opt_args, opt_options) {
    const port = this.openWin_(requestId, url, target, opt_args, opt_options);
    return port.whenConnected().then(() => port);
  }

  /**
   * Registers the callback for the result of the activity opened with the
   * specified `requestId` (see the `open()` method). The callback is a
   * function that takes a single `ActivityPort` argument. The client
   * can use this object to verify the port using it's origin, verified and
   * secure channel flags. Then the client can call
   * `ActivityPort.acceptResult()` method to accept the result.
   *
   * The activity result is handled via a separate callback because of a
   * possible redirect. So use of direct callbacks and/or promises is not
   * possible in that case.
   *
   * A typical implementation would look like:
   * ```
   * ports.onResult('request1', function(port) {
   *   port.acceptResult().then(function(result) {
   *     // Only verified origins are allowed.
   *     if (result.origin == expectedOrigin &&
   *         result.originVerified &&
   *         result.secureChannel) {
   *       handleResultForRequest1(result);
   *     }
   *   });
   * })
   *
   * ports.open('request1', request1Url, '_blank');
   * ```
   *
   * @param {string} requestId
   * @param {function(!ActivityPort)} callback
   */
  onResult(requestId, callback) {
    let handlers = this.requestHandlers_[requestId];
    if (!handlers) {
      handlers = [];
      this.requestHandlers_[requestId] = handlers;
    }
    handlers.push(callback);

    // Consume available result.
    const availableResult = this.discoverResult_(requestId);
    if (availableResult) {
      this.consumeResult_(availableResult, callback);
    }
  }

  /**
   * @param {function(!Error)} handler
   */
  onRedirectError(handler) {
    this.redirectErrorPromise_.then(handler);
  }

  /**
   * @param {string} requestId
   * @param {string} url
   * @param {string} target
   * @param {?Object=} opt_args
   * @param {?ActivityOpenOptions=} opt_options
   * @return {!ActivityWindowPort}
   */
  openWin_(requestId, url, target, opt_args, opt_options) {
    const port = new ActivityWindowPort(
        this.win_, requestId, url, target, opt_args, opt_options);
    port.open().then(() => {
      // Await result if possible. Notice that when falling back to "redirect",
      // the result will never arrive through this port.
      this.consumeResultAll_(requestId, port);
    });
    return port;
  }

  /**
   * @param {string} requestId
   * @return {?ActivityPort}
   * @private
   */
  discoverResult_(requestId) {
    let port = this.resultBuffer_[requestId];
    if (!port && this.fragment_) {
      try {
        port = discoverRedirectPort(
            this.win_, this.fragment_, requestId);
      } catch (e) {
        throwAsync(e);
        this.redirectErrorResolver_(e);
      }
      if (port) {
        this.resultBuffer_[requestId] = port;
      }
    }
    return port;
  }

  /**
   * @param {!ActivityPort} port
   * @param {function(!ActivityPort)} callback
   * @private
   */
  consumeResult_(port, callback) {
    Promise.resolve().then(() => {
      callback(port);
    });
  }

  /**
   * @param {string} requestId
   * @param {!ActivityPort} port
   * @private
   */
  consumeResultAll_(requestId, port) {
    // Find and execute handlers.
    const handlers = this.requestHandlers_[requestId];
    if (handlers) {
      handlers.forEach(handler => {
        this.consumeResult_(port, handler);
      });
    }
    // Buffer the result for callbacks that may arrive in the future.
    this.resultBuffer_[requestId] = port;
  }
}



module.exports = {
  ActivityPorts,
  ActivityIframePort,
  ActivityMessagingPort,
  ActivityMode,
  ActivityOpenOptions,
  ActivityPort,
  ActivityRequest,
  ActivityResult,
  ActivityResultCode,
  ActivityWindowPort,
  createAbortError,
  isAbortError,
};

},{}],5:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ClientEventManagerApi = exports.ClientEvent = exports.FilterResult = void 0;

var _api_messages = require("../proto/api_messages");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

/** @enum {number}  */
var FilterResult = {
  /** The event is allowed to proceed to the listeners. */
  PROCESS_EVENT: 0,

  /** The event is canceled and the listeners are not informed about it. */
  CANCEL_EVENT: 1
};
/**
 * Defines a client event in SwG
 * Properties:
 * - eventType: Required. The AnalyticsEvent type that occurred.
 * - eventOriginator: Required.  The codebase that initiated the event.
 * - isFromUserAction: Optional.  True if the user took an action to generate
 *   the event.
 * - additionalParameters: Optional.  A JSON object to store generic data.
 *
 *  @typedef {{
 *    eventType: !AnalyticsEvent,
 *    eventOriginator: !EventOriginator,
 *    isFromUserAction: ?boolean,
 *    additionalParameters: ?Object,
 * }}
 */

exports.FilterResult = FilterResult;
var ClientEvent;
/**
 * @interface
 */

exports.ClientEvent = ClientEvent;

var ClientEventManagerApi = /*#__PURE__*/function () {
  function ClientEventManagerApi() {
    _classCallCheck(this, ClientEventManagerApi);
  }

  _createClass(ClientEventManagerApi, [{
    key: "registerEventListener",

    /**
     * Call this function to log an event. The registered listeners will be
     * invoked unless the event is filtered.
     * @param {!function(!ClientEvent)} listener
     */
    value: function registerEventListener(listener) {}
    /**
     * Register a filterer for events if you need to potentially prevent the
     * listeners from hearing about it.  A filterer should return
     * FilterResult.CANCEL_EVENT to prevent listeners from hearing about the
     * event.
     * @param {!function(!ClientEvent):FilterResult} filterer
     */

  }, {
    key: "registerEventFilterer",
    value: function registerEventFilterer(filterer) {}
    /**
     * Call this function to log an event.  It will immediately throw an error if
     * the event is invalid.  It will then asynchronously call the filterers and
     * stop the event if a filterer cancels it.  After that, it will call each
     * listener asynchronously.
     * @param {!ClientEvent} event
     */

  }, {
    key: "logEvent",
    value: function logEvent(event) {}
  }]);

  return ClientEventManagerApi;
}();

exports.ClientEventManagerApi = ClientEventManagerApi;

},{"../proto/api_messages":33}],6:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DeferredAccountCreationResponse = exports.DeferredAccountCreationRequest = void 0;

var _entitlements = require("./entitlements");

var _subscribeResponse = require("./subscribe-response");

var _userData = require("./user-data");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

/**
 * Properties:
 * - entitlements - the current entitlements.
 * - consent - whether to ask the user for account creation consent.
 *   Default is `true`.
 *
 * @typedef {{
 *   entitlements: (?Entitlements|undefined),
 *   consent: (boolean|undefined),
 * }}
 */
var DeferredAccountCreationRequest;
/**
 */

exports.DeferredAccountCreationRequest = DeferredAccountCreationRequest;

var DeferredAccountCreationResponse = /*#__PURE__*/function () {
  /**
   * @param {!Entitlements} entitlements
   * @param {!UserData} userData
   * @param {!Array<!PurchaseData>} purchaseDataList
   * @param {function():!Promise} completeHandler
   */
  function DeferredAccountCreationResponse(entitlements, userData, purchaseDataList, completeHandler) {
    _classCallCheck(this, DeferredAccountCreationResponse);

    /** @const {!Entitlements} */
    this.entitlements = entitlements;
    /** @const {!UserData} */

    this.userData = userData;
    /** @const {!Array<!PurchaseData>} */

    this.purchaseDataList = purchaseDataList; // TODO(dvoytenko): deprecate.

    /** @const {!PurchaseData} */

    this.purchaseData = purchaseDataList[0];
    /** @private @const {function():!Promise} */

    this.completeHandler_ = completeHandler;
  }
  /**
   * @return {!DeferredAccountCreationResponse}
   */


  _createClass(DeferredAccountCreationResponse, [{
    key: "clone",
    value: function clone() {
      return new DeferredAccountCreationResponse(this.entitlements, this.userData, this.purchaseDataList, this.completeHandler_);
    }
    /**
     * @return {!Object}
     */

  }, {
    key: "json",
    value: function json() {
      return {
        'entitlements': this.entitlements.json(),
        'userData': this.userData.json(),
        'purchaseDataList': this.purchaseDataList.map(function (pd) {
          return pd.json();
        }),
        // TODO(dvoytenko): deprecate.
        'purchaseData': this.purchaseData.json()
      };
    }
    /**
     * Allows the receiving site to complete/acknowledge that it registered
     * the subscription info. The typical action would be to create an
     * account (or match an existing one) and associated the subscription with
     * that account.
     *
     * SwG will display progress indicator until this method is called and
     * upon receiving this call will show the confirmation to the user.
     * The promise returned by this method will yield once the user closes
     * the confirmation.
     *
     * @return {!Promise}
     */

  }, {
    key: "complete",
    value: function complete() {
      return this.completeHandler_();
    }
  }]);

  return DeferredAccountCreationResponse;
}();

exports.DeferredAccountCreationResponse = DeferredAccountCreationResponse;

},{"./entitlements":7,"./subscribe-response":12,"./user-data":14}],7:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Entitlement = exports.Entitlements = exports.GOOGLE_METERING_SOURCE = void 0;

var _object = require("../utils/object");

var _json = require("../utils/json");

var _log = require("../utils/log");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

/** Source for Google-provided metering entitlements. */
var GOOGLE_METERING_SOURCE = 'google:metering';
/**
 * The holder of the entitlements for a service.
 */

exports.GOOGLE_METERING_SOURCE = GOOGLE_METERING_SOURCE;

var Entitlements = /*#__PURE__*/function () {
  /**
   * @param {string} service
   * @param {string} raw
   * @param {!Array<!Entitlement>} entitlements
   * @param {?string} currentProduct
   * @param {function(!Entitlements)} ackHandler
   * @param {function(!Entitlements, ?Function=)} consumeHandler
   * @param {?boolean|undefined} isReadyToPay
   * @param {?string|undefined} decryptedDocumentKey
   */
  function Entitlements(service, raw, entitlements, currentProduct, ackHandler, consumeHandler, isReadyToPay, decryptedDocumentKey) {
    _classCallCheck(this, Entitlements);

    /** @const {string} */
    this.service = service;
    /** @const {string} */

    this.raw = raw;
    /** @const {!Array<!Entitlement>} */

    this.entitlements = entitlements;
    /** @const {boolean} */

    this.isReadyToPay = isReadyToPay || false;
    /** @const {?string} */

    this.decryptedDocumentKey = decryptedDocumentKey || null;
    /** @private @const {?string} */

    this.product_ = currentProduct;
    /** @private @const {function(!Entitlements)} */

    this.ackHandler_ = ackHandler;
    /** @private @const {function(!Entitlements, ?Function=)} */

    this.consumeHandler_ = consumeHandler;
  }
  /**
   * @return {!Entitlements}
   */


  _createClass(Entitlements, [{
    key: "clone",
    value: function clone() {
      return new Entitlements(this.service, this.raw, this.entitlements.map(function (ent) {
        return ent.clone();
      }), this.product_, this.ackHandler_, this.consumeHandler_, this.isReadyToPay, this.decryptedDocumentKey);
    }
    /**
     * @return {!Object}
     */

  }, {
    key: "json",
    value: function json() {
      return {
        'service': this.service,
        'entitlements': this.entitlements.map(function (item) {
          return item.json();
        }),
        'isReadyToPay': this.isReadyToPay
      };
    }
    /**
     * Returns true if the current article is unlocked by a
     * cacheable entitlement. Metering entitlements aren't cacheable,
     * because each metering entitlement is meant to be used for one article.
     * Subscription entitlements are cacheable, because subscription entitlements
     * are meant to be used across multiple articles on a publication.
     * @return {boolean}
     */

  }, {
    key: "enablesThisWithCacheableEntitlements",
    value: function enablesThisWithCacheableEntitlements() {
      var entitlement = this.getEntitlementForThis();
      return !!entitlement && entitlement.source !== GOOGLE_METERING_SOURCE;
    }
    /**
     * Returns true if the current article is unlocked by a
     * Google metering entitlement. These entitlements come
     * from Google News Intiative's licensing program to support news.
     * https://www.blog.google/outreach-initiatives/google-news-initiative/licensing-program-support-news-industry-/
     * @return {boolean}
     */

  }, {
    key: "enablesThisWithGoogleMetering",
    value: function enablesThisWithGoogleMetering() {
      var entitlement = this.getEntitlementForThis();
      return !!entitlement && entitlement.source === GOOGLE_METERING_SOURCE;
    }
    /**
     * @param {string=} source
     * @return {boolean}
     */

  }, {
    key: "enablesThis",
    value: function enablesThis(source) {
      return this.enables(this.product_, source);
    }
    /**
     * @param {string=} source
     * @return {boolean}
     */

  }, {
    key: "enablesAny",
    value: function enablesAny(source) {
      for (var i = 0; i < this.entitlements.length; i++) {
        if (this.entitlements[i].products.length > 0 && (!source || source == this.entitlements[i].source)) {
          return true;
        }
      }

      return false;
    }
    /**
     * Whether these entitlements enable the specified product, optionally also
     * restricting the source.
     * @param {?string} product
     * @param {string=} source
     * @return {boolean}
     */

  }, {
    key: "enables",
    value: function enables(product, source) {
      if (!product) {
        return false;
      }

      return !!this.getEntitlementFor(product, source);
    }
    /**
     * Returns the first matching entitlement for the current product,
     * optionally also matching the specified source.
     * @param {string=} source
     * @return {?Entitlement}
     */

  }, {
    key: "getEntitlementForThis",
    value: function getEntitlementForThis(source) {
      return this.getEntitlementFor(this.product_, source);
    }
    /**
     * Returns the first matching entitlement for the specified product,
     * optionally also matching the specified source.
     *
     * Returns non-metering entitlements if possible, to avoid consuming
     * metered reads unnecessarily.
     *
     * @param {?string} product
     * @param {string=} source
     * @return {?Entitlement}
     */

  }, {
    key: "getEntitlementFor",
    value: function getEntitlementFor(product, source) {
      if (!product) {
        return null;
      } // Prefer subscription entitlements over metering entitlements.
      // Metering entitlements are a limited resource. When a metering entitlement
      // unlocks an article, that depletes the user's remaining "free reads".
      // Subscription entitlements are *not* depleted when they unlock articles.
      // They are essentially unlimited if the subscription remains valid.
      // For this reason, subscription entitlements are preferred.


      var entitlementsThatUnlockArticle = this.entitlements.filter(function (entitlement) {
        return entitlement.enables(product) && (!source || source === entitlement.source);
      });
      var subscriptionEntitlement = (0, _object.findInArray)(entitlementsThatUnlockArticle, function (entitlement) {
        return entitlement.source !== GOOGLE_METERING_SOURCE;
      });
      var meteringEntitlement = (0, _object.findInArray)(entitlementsThatUnlockArticle, function (entitlement) {
        return entitlement.source === GOOGLE_METERING_SOURCE;
      });
      return subscriptionEntitlement || meteringEntitlement || null;
    }
    /**
     * Returns the first matching entitlement for the specified source w/o
     * matching any specific products.
     * @param {string} source
     * @return {?Entitlement}
     */

  }, {
    key: "getEntitlementForSource",
    value: function getEntitlementForSource(source) {
      if (this.entitlements.length > 0) {
        for (var i = 0; i < this.entitlements.length; i++) {
          if (this.entitlements[i].subscriptionToken && source == this.entitlements[i].source) {
            return this.entitlements[i];
          }
        }
      }

      return null;
    }
    /**
     * A 3p site should call this method to acknowledge that it "saw" and
     * "understood" entitlements.
     */

  }, {
    key: "ack",
    value: function ack() {
      this.ackHandler_(this);
    }
    /**
     * A 3p site should call this method to consume a Google metering entitlement.
     * When a metering entitlement is consumed, SwG shows the user a metering dialog.
     * When the user closes the dialog, SwG depletes one of the user's remaining
     * "free reads".
     * @param {?Function=} onCloseDialog Called after the user closes the dialog.
     */

  }, {
    key: "consume",
    value: function consume(onCloseDialog) {
      this.consumeHandler_(this, onCloseDialog);
    }
  }]);

  return Entitlements;
}();
/**
 * The single entitlement object.
 */


exports.Entitlements = Entitlements;

var Entitlement = /*#__PURE__*/function () {
  /**
   * @param {string} source
   * @param {!Array<string>} products
   * @param {string} subscriptionToken
   */
  function Entitlement(source, products, subscriptionToken) {
    _classCallCheck(this, Entitlement);

    /** @const {string} */
    this.source = source;
    /** @const {!Array<string>} */

    this.products = products;
    /** @const {string} */

    this.subscriptionToken = subscriptionToken;
  }
  /**
   * @return {!Entitlement}
   */


  _createClass(Entitlement, [{
    key: "clone",
    value: function clone() {
      return new Entitlement(this.source, this.products.slice(0), this.subscriptionToken);
    }
    /**
     * @return {!Object}
     */

  }, {
    key: "json",
    value: function json() {
      return {
        'source': this.source,
        'products': this.products,
        'subscriptionToken': this.subscriptionToken
      };
    }
    /**
     * @param {?string} product
     * @return {boolean}
     */

  }, {
    key: "enables",
    value: function enables(product) {
      if (!product) {
        return false;
      } // Wildcard allows this product.


      var eq = product.indexOf(':');

      if (eq != -1 && this.products.includes(product.substring(0, eq + 1) + '*')) {
        return true;
      }

      return this.products.includes(product);
    }
    /**
     * @param {?Object} json
     * @return {!Entitlement}
     */

  }, {
    key: "getSku",

    /**
     * Returns the SKU associated with this entitlement.
     * @return {?string}
     */
    value: function getSku() {
      if (this.source !== 'google') {
        return null;
      }

      var sku =
      /** @type {?string} */
      (0, _json.getPropertyFromJsonString)(this.subscriptionToken, 'productId') || null;

      if (!sku) {
        (0, _log.warn)('Unable to retrieve SKU from SwG subscription token');
      }

      return sku;
    }
  }], [{
    key: "parseFromJson",
    value: function parseFromJson(json) {
      if (!json) {
        json = {};
      }

      var source = json['source'] || '';
      var products = json['products'] || [];
      var subscriptionToken = json['subscriptionToken'];
      return new Entitlement(source, products, subscriptionToken);
    }
    /**
     * The JSON is expected in one of the forms:
     * - Single entitlement: `{products: [], ...}`.
     * - A list of entitlements: `[{products: [], ...}, {...}]`.
     * @param {!Object|!Array<!Object>} json
     * @return {!Array<!Entitlement>}
     */

  }, {
    key: "parseListFromJson",
    value: function parseListFromJson(json) {
      var jsonList = Array.isArray(json) ?
      /** @type {!Array<Object>} */
      json : [json];
      return jsonList.map(function (json) {
        return Entitlement.parseFromJson(json);
      });
    }
  }]);

  return Entitlement;
}();

exports.Entitlement = Entitlement;

},{"../utils/json":76,"../utils/log":78,"../utils/object":79}],8:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LoggerApi = exports.PublisherEvent = exports.Event = exports.SubscriptionState = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

/**
 * Copyright 2019 The Subscribe with Google Authors. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS-IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * @enum {string}
 */
var SubscriptionState = {
  // user's subscription state not known.
  UNKNOWN: 'unknown',
  // user is not a subscriber.
  NON_SUBSCRIBER: 'non_subscriber',
  // user is a subscriber.
  SUBSCRIBER: 'subscriber',
  // user's subscription has expired.
  PAST_SUBSCRIBER: 'past_subscriber'
};
/**
 * Subscription related events. Listed below are enum strings that
 * represent events related to Subscription flow. Event parameters
 * that provide more context about the event are sent as a JSON
 * block of depth 1 in the sendEvent() API call.
 * @enum {string}
 */

exports.SubscriptionState = SubscriptionState;
var Event = {
  /**
   * IMPRESSION_PAYWALL event.
   * User hits a paywall.
   * Every impression should be qualified as active or passive.
   * The field 'active' of PropensityEvent, which carries this
   * event, must be set to true or false to indicate this.
   * If the user has run out of metering, and that’s why was shown
   * a paywall, that would be a passive impression of the paywall.
   * For example:
   * const propensityEvent = {
   *  name: 'paywall',
   *  active: false,
   * }
   */
  IMPRESSION_PAYWALL: 'paywall',

  /**
   * IMPRESSION_AD event.
   * User has been shown a subscription ad.
   * Every impression should be qualified as active or passive.
   * The field 'active' of PropensityEvent, which carries this
   * event, must be set to true or false to indicate this.
   * The JSON block can provide the name of the subscription ad
   * creative or campaign. Ad impressions are usually passive.
   * const propensityEvent = {
   *   name: 'ad_shown',
   *   active: false,
   *   data: {'ad_name': 'fall_ad'}
   * }
   */
  IMPRESSION_AD: 'ad_shown',

  /**
   * IMPRESSION_OFFERS event.
   * User has been shown a list of available offers for subscription.
   * Every impression should be qualified as active or passive.
   * The field 'active' of PropensityEvent, which carries this
   * event, must be set to true or false to indicate this.
   * The JSON block can provide a list of products displayed,
   * and the source to indicate why the user was shown the offer.
   * Note: source is not the same as referrer.
   * In the cases below, the user took action before seeing the offers,
   * and therefore considered active impression.
   * For example:
   * const propensityEvent = {
   *   name: 'offers_shown',
   *   active: true,
   *   data: {'offers': ['basic-monthly', 'premium-weekly'],
   *           'source': 'ad-click'}
   * }
   * For example:
   * const propensityEvent = {
   *   name: 'offers_shown',
   *   active: true,
   *   data: {'offers': ['basic-monthly', 'premium-weekly'],
   *           'source': ‘navigate-to-offers-page’}
   * }
   * If the user was shown the offers as a result of paywall metering
   * expiration, it is considered a passive impression.
   * For example:
   * const propensityEvent = {
   *   name: 'offers_shown',
   *   active: false,
   *   data: {'offers': ['basic-monthly', 'premium-weekly'],
   *           'source': ‘paywall-metering-expired’}
   * }
   */
  IMPRESSION_OFFERS: 'offers_shown',

  /**
   * ACTION_SUBSCRIPTIONS_LANDING_PAGE event.
   * User has taken the action to arrive at a landing page of the
   * subscription workflow. The landing page should satisfy one of
   * the following conditions and hence be a part of the funnel to
   * get the user to subscribe:
   * - have a button to navigate the user to an offers page, (in
   *   this case, the next event will be IMPRESSION_OFFERS, with
   *   parameter 'source' as subscriptions-landing-page and
   *   'is_active' set to true),
   * - show offers the user can select, (in this case, the next
   *   event will be IMPRESSION_OFFERS, with a parameter 'source'
   *   as navigate-to-offers-page and 'is_active' set to true),
   * - provide a way to start the payment flow for a specific offer.
   *   (in this case, the next event will be ACTION_OFFER_SELECTED
   *   or ACTION_PAYMENT_FLOW_STARTED depending on if that button
   *   took the user to a checkout page on the publishers site or
   *   directly started the payment flow).
   * The field 'active' of PropensityEvent, which carries this
   * event, must be set to true since this is a user action.
   * The JSON block with this event can provide additional information
   * such as the source, indicating what caused the user to navigate
   * to this page.
   * For example:
   * const propensityEvent = {
   *   name: 'subscriptions_landing_page',
   *   active: true,
   *   data: {'source': 'marketing_via_email'}
   * }
   */
  ACTION_SUBSCRIPTIONS_LANDING_PAGE: 'subscriptions_landing_page',

  /**
   * ACTION_OFFER_SELECTED event.
   * User has selected an offer.
   * The field 'active' of PropensityEvent, which carries this
   * event, must be set to true since this is a user action.
   * The JSON block can provide the product selected.
   * For example: {
   *   name: 'offer_selected',
   *   active: true,
   *   data: {product': 'basic-monthly'}
   * }
   * When offer selection starts the payment flow directly,
   * use the next event ACTION_PAYMENT_FLOW_STARTED instead.
   */
  ACTION_OFFER_SELECTED: 'offer_selected',

  /**
   * ACTION_PAYMENT_FLOW_STARTED event.
   * User has started payment flow.
   * The field 'active' of PropensityEvent, which carries this
   * event, must be set to true since this is a user action.
   * The JSON block can provide the product selected.
   * For example:
   * const propensityEvent = {
   *   name: 'payment_flow_started',
   *   active: true,
   *   data: {product': 'basic-monthly'}
   * }
   */
  ACTION_PAYMENT_FLOW_STARTED: 'payment_flow_start',

  /**
   * ACTION_PAYMENT_COMPLETED.
   * User has made the payment for a subscription.
   * The field 'active' of PropensityEvent, which carries this
   * event, must be set to true since this is a user action.
   * The JSON block can provide the product user paid for.
   * For example:
   * const propensityEvent = {
   *   name: 'payment_complete',
   *   active: true,
   *   data: {product': 'basic-monthly'}
   * }
   */
  ACTION_PAYMENT_COMPLETED: 'payment_complete',

  /**
   * EVENT_CUSTOM: custom publisher event.
   * The field 'active' of PropensityEvent, which carries this
   * event, must be set to true or false depending on if the event
   * was generated as a result of a user action.
   * The JSON block can provide the event name for the custom event.
   * For example:
   * const propensityEvent = {
   *   name: 'custom',
   *   active: true,
   *   data: {
   *     'event_name': 'social_share',
   *     'platform_used': 'whatsapp'
   *   }
   *  }
   */
  EVENT_CUSTOM: 'custom'
};
/**
 * Propensity Event
 * Properties:
 * - name: Required. Name should be valid string in the Event
 *         enum within src/api/logger-api.js.
 * - active: Required. A boolean that indicates whether the
 *         user took some action to participate in the flow
 *         that generated this event. For impression event,
 *         this is set to true if is_active field would be
 *         set to true, as described in documentation for
 *         enum Event. Otherwise, set this field to false.
 *         For action events, this field must always be set
 *         to true. The caller must always set this field.
 * - data: Optional. JSON block of depth '1' provides event
 *         parameters. The guideline to create this JSON block
 *         that describes the event is provided against each
 *         enum listed in the Event enum above.
 *
 *  @typedef {{
 *    name: string,
 *    active: boolean,
 *    data: ?JsonObject,
 * }}
 */

exports.Event = Event;
var PublisherEvent;
/**
 * @interface
 */

exports.PublisherEvent = PublisherEvent;

var LoggerApi = /*#__PURE__*/function () {
  function LoggerApi() {
    _classCallCheck(this, LoggerApi);
  }

  _createClass(LoggerApi, [{
    key: "sendEvent",

    /**
     * Send a buy-flow event that occurred on the publisher's site to Google.  The
     * ultimate destination is controlled by configuration settings.  Publisher
     * configuration available:
     *   enablePropensity - Sends data to the Propensity to Subscribe ads server.
     *   enableSwgAnalytics - Sends data to Google's analytics server for buy-flow
     *     comparison purposes.
     * @param {!PublisherEvent} userEvent
     */
    value: function sendEvent(userEvent) {}
    /**
     * Send user subscription state upon initial discovery.
     * A user may have active subscriptions to some products
     * and expired subscriptions to others. Make one API call
     * per subscription state and provide a corresponding
     * list of products with a json object of depth 1.
     * For example:
     *     {'product': ['product1', 'product2']}
     * Each call to this API should have the first argument
     * as a valid string from the enum SubscriptionState.
     * @param {SubscriptionState} state
     * @param {?JsonObject} jsonProducts
     */

  }, {
    key: "sendSubscriptionState",
    value: function sendSubscriptionState(state, jsonProducts) {}
  }]);

  return LoggerApi;
}();

exports.LoggerApi = LoggerApi;

},{}],9:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MeterClientTypes = void 0;

/**
 * Copyright 2018 The Subscribe with Google Authors. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS-IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/** @enum {number}  */
var MeterClientTypes = {
  /** Meter client type for content licensed by Google. */
  LICENSED_BY_GOOGLE: 1
};
exports.MeterClientTypes = MeterClientTypes;

},{}],10:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Offer = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Copyright 2018 The Subscribe with Google Authors. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS-IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 */
var Offer =
/**
 * @param {string} skuId
 * @param {string} title
 * @param {string} description
 * @param {string} price
 */
function Offer(skuId, title, description, price) {
  _classCallCheck(this, Offer);

  /** @const {string} */
  this.skuId = skuId;
  /** @const {string} */

  this.title = title;
  /** @const {string} */

  this.description = description;
  /** @const {string} */

  this.price = price;
};

exports.Offer = Offer;

},{}],11:[function(require,module,exports){
"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PropensityApi = exports.SubscriptionState = exports.Event = exports.PropensityEvent = exports.PropensityScore = exports.Header = exports.Body = exports.ScoreDetail = exports.Score = exports.PropensityType = void 0;

var LoggerApi = _interopRequireWildcard(require("./logger-api"));

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

/**
 * @enum {string}
 */
var PropensityType = {
  // Propensity score for a user to subscribe to a publication.
  GENERAL: 'general',
  // Propensity score when blocked access to content by paywall.
  PAYWALL: 'paywall'
};
/**
 * The Propensity Score
 * - value: Required. A number that indicates the propensity to subscribe.
 * - bucketed: Required. Indicates if the score is a raw score [1-100] or bucketed[1-20].
 *
 * @typedef {{
 *   value: number,
 *   bucketed: boolean,
 * }}
 */

exports.PropensityType = PropensityType;
var Score;
/**
 * Propensity Score Detail
 * Properties:
 * - product: Required. Indicates the publication_id:product_id for which the score is provided.
 * - score: Optional. When score is available, this field contains the propensity score for this product.
 * - error: Optional. When no score is avaialble, a string provides the error message.
 *
 * @typedef {{
 *   product: string,
 *   score: ?Score,
 *   error: ?string,
 * }}
 */

exports.Score = Score;
var ScoreDetail;
/**
 * The Body field of the Propensity Score.
 * Properties:
 * - scores: Optional, an array of scores. When header indicates so, atleast one score is available.
 * - error: Optional, string describing why, if no scores were provided by the server.
 *
 *  @typedef {{
 *    scores: ?Array<ScoreDetail>,
 *    error: ?string,
 * }}
 */

exports.ScoreDetail = ScoreDetail;
var Body;
/**
 * The Header of the Propensity Score.
 * Properties:
 * - ok: Required. true, if propensity score is available, false otherwise.
 *
 *  @typedef {{
 *    ok: boolean,
 * }}
 */

exports.Body = Body;
var Header;
/**
 * The Propensity Score.
 * Properties:
 * - header: Required. Provides the header of the Score response.
 * - body: Required. Provides the body of the Score response.
 *
 *  @typedef {{
 *    header: Header,
 *    body: Body,
 * }}
 */

exports.Header = Header;
var PropensityScore;
/**
 * Propensity Event
 *   Please note that the primary defition of this object has changed to
 *   PublisherEvent and is defined in logger-api.js.  These two object
 *   definitions are identical.
 * Properties:
 * - name: Required. Name should be valid string in the Event
 *         enum within src/api/logger-api.js.
 * - active: Required. A boolean that indicates whether the
 *         user took some action to participate in the flow
 *         that generated this event. For impression event,
 *         this is set to true if is_active field would be
 *         set to true, as described in documentation for
 *         enum Event. Otherwise, set this field to false.
 *         For action events, this field must always be set
 *         to true. The caller must always set this field.
 * - data: Optional. JSON block of depth '1' provides event
 *         parameters. The guideline to create this JSON block
 *         that describes the event is provided against each
 *         enum listed in the Event enum above.
 *
 *  @typedef {{
 *    name: string,
 *    active: boolean,
 *    data: ?JsonObject,
 * }}
 */

exports.PropensityScore = PropensityScore;
var PropensityEvent;
/*
 * Please note that the definitions of Event and SubscriptionState have moved
 * to logger-api.js.  This is now the preferred interface to use for logging
 * publisher events and setting the user's current subscription state.
 * Propensity will continue to function as an event logger until we are certain
 * no publishers are actively using it to log events.
 */

exports.PropensityEvent = PropensityEvent;
var Event = LoggerApi.Event;
exports.Event = Event;
var SubscriptionState = LoggerApi.SubscriptionState;
/**
 * @extends {LoggerApi.LoggerApi}
 * @interface
 */

exports.SubscriptionState = SubscriptionState;

var PropensityApi = /*#__PURE__*/function (_LoggerApi$LoggerApi) {
  _inherits(PropensityApi, _LoggerApi$LoggerApi);

  var _super = _createSuper(PropensityApi);

  function PropensityApi() {
    _classCallCheck(this, PropensityApi);

    return _super.apply(this, arguments);
  }

  _createClass(PropensityApi, [{
    key: "getPropensity",

    /**
     * Get the propensity of a user to subscribe based on the type.
     * The argument should be a valid string from PropensityType.
     * If no type is provided, GENERAL score is returned.
     * @param {PropensityType=} type
     * @return {?Promise<!PropensityScore>}
     */
    value: function getPropensity(type) {}
  }]);

  return PropensityApi;
}(LoggerApi.LoggerApi);

exports.PropensityApi = PropensityApi;

},{"./logger-api":8}],12:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PurchaseData = exports.SubscribeResponse = void 0;

var _entitlements = require("./entitlements");

var _userData = require("./user-data");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

/**
 */
var SubscribeResponse = /*#__PURE__*/function () {
  /**
   * @param {string} raw
   * @param {!PurchaseData} purchaseData
   * @param {?UserData} userData
   * @param {?Entitlements} entitlements
   * @param {!string} productType
   * @param {function():!Promise} completeHandler
   * @param {?string=} oldSku
   * @param {?number=} paymentRecurrence
   */
  function SubscribeResponse(raw, purchaseData, userData, entitlements, productType, completeHandler) {
    var oldSku = arguments.length > 6 && arguments[6] !== undefined ? arguments[6] : null;
    var paymentRecurrence = arguments.length > 7 && arguments[7] !== undefined ? arguments[7] : null;

    _classCallCheck(this, SubscribeResponse);

    /** @const {string} */
    this.raw = raw;
    /** @const {!PurchaseData} */

    this.purchaseData = purchaseData;
    /** @const {?UserData} */

    this.userData = userData;
    /** @const {?Entitlements} */

    this.entitlements = entitlements;
    /** @const {string} */

    this.productType = productType;
    /** @private @const {function():!Promise} */

    this.completeHandler_ = completeHandler;
    /** @const {?string} */

    this.oldSku = oldSku;
    /** @const {?number} */

    this.paymentRecurrence = paymentRecurrence;
  }
  /**
   * @return {!SubscribeResponse}
   */


  _createClass(SubscribeResponse, [{
    key: "clone",
    value: function clone() {
      return new SubscribeResponse(this.raw, this.purchaseData, this.userData, this.entitlements, this.productType, this.completeHandler_, this.oldSku);
    }
    /**
     * @return {!Object}
     */

  }, {
    key: "json",
    value: function json() {
      return {
        'purchaseData': this.purchaseData.json(),
        'userData': this.userData ? this.userData.json() : null,
        'entitlements': this.entitlements ? this.entitlements.json() : null,
        'oldSku': this.oldSku,
        'productType': this.productType
      };
    }
    /**
     * Allows the receiving site to complete/acknowledge that it registered
     * the subscription purchase. The typical action would be to create an
     * account (or match an existing one) and associated the purchase with
     * that account.
     *
     * SwG will display progress indicator until this method is called and
     * upon receiving this call will show the confirmation to the user.
     * The promise returned by this method will yield once the user closes
     * the confirmation.
     *
     * @return {!Promise}
     */

  }, {
    key: "complete",
    value: function complete() {
      return this.completeHandler_();
    }
  }]);

  return SubscribeResponse;
}();
/**
 */


exports.SubscribeResponse = SubscribeResponse;

var PurchaseData = /*#__PURE__*/function () {
  /**
   * @param {string} raw
   * @param {string} signature
   */
  function PurchaseData(raw, signature) {
    _classCallCheck(this, PurchaseData);

    /** @const {string} */
    this.raw = raw;
    /** @const {string} */

    this.data = raw;
    /** @const {string} */

    this.signature = signature;
  }
  /**
   * @return {!PurchaseData}
   */


  _createClass(PurchaseData, [{
    key: "clone",
    value: function clone() {
      return new PurchaseData(this.raw, this.signature);
    }
    /**
     * @return {!Object}
     */

  }, {
    key: "json",
    value: function json() {
      return {
        'data': this.raw,
        'signature': this.signature
      };
    }
  }]);

  return PurchaseData;
}();

exports.PurchaseData = PurchaseData;

},{"./entitlements":7,"./user-data":14}],13:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.defaultConfig = defaultConfig;
exports.SubscriptionRequest = exports.SmartButtonOptions = exports.ButtonOptions = exports.SaveSubscriptionRequestCallback = exports.SaveSubscriptionRequest = exports.LoginRequest = exports.OffersRequest = exports.ProductType = exports.ReplaceSkuProrationMode = exports.WindowOpenMode = exports.AnalyticsMode = exports.GetEntitlementsMeteringParamsExternal = exports.GetEntitlementsParamsExternalDef = exports.GetEntitlementsMeteringParamsInternal = exports.GetEntitlementsEncryptionParams = exports.GetEntitlementsParamsInternalDef = exports.Config = exports.SubscriptionFlows = exports.PublisherEntitlement = exports.PublisherEntitlementEvent = exports.Subscriptions = void 0;

var _clientEventManagerApi = require("./client-event-manager-api");

var _deferredAccountCreation = require("./deferred-account-creation");

var _entitlements = require("./entitlements");

var _loggerApi = require("./logger-api");

var _offer = require("./offer");

var _propensityApi = require("./propensity-api");

var _subscribeResponse = require("./subscribe-response");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

/**
 * @interface
 */
var Subscriptions = /*#__PURE__*/function () {
  function Subscriptions() {
    _classCallCheck(this, Subscriptions);
  }

  _createClass(Subscriptions, [{
    key: "init",

    /**
     * Optionally initializes the subscriptions runtime with publication or
     * product ID. If not called, the runtime will look for the initialization
     * parameters in the page's markup.
     * @param {string} productOrPublicationId
     */
    value: function init(productOrPublicationId) {}
    /**
     * Optionally configures the runtime with non-default properties. See
     * `Config` definition for details.
     * @param {!Config} config
     */

  }, {
    key: "configure",
    value: function configure(config) {}
    /**
     * Starts the entitlement flow.
     */

  }, {
    key: "start",
    value: function start() {}
    /**
     * Resets the entitlements that can be fetched again.
     */

  }, {
    key: "reset",
    value: function reset() {}
    /**
     * Resets the entitlements and clears all of the caches.
     */

  }, {
    key: "clear",
    value: function clear() {}
    /**
     * @param {!GetEntitlementsParamsExternalDef=} params
     * @return {!Promise<!Entitlements>}
     */

  }, {
    key: "getEntitlements",
    value: function getEntitlements(params) {}
    /**
     * Set the subscribe callback.
     * @param {function(!Promise<!Entitlements>)} callback
     */

  }, {
    key: "setOnEntitlementsResponse",
    value: function setOnEntitlementsResponse(callback) {}
    /**
     * Returns a set of offers.
     * @param {{
     *   productId: (string|undefined),
     * }=} options
     * @return {!Promise<!Array<!Offer>>}
     */

  }, {
    key: "getOffers",
    value: function getOffers(options) {}
    /**
     * Starts the Offers flow.
     * @param {!OffersRequest=} options
     */

  }, {
    key: "showOffers",
    value: function showOffers(options) {}
    /**
     * Starts the Offers flow for a subscription update.
     * @param {!OffersRequest=} options
     */

  }, {
    key: "showUpdateOffers",
    value: function showUpdateOffers(options) {}
    /**
     * Show subscription option.
     * @param {!OffersRequest=} options
     */

  }, {
    key: "showSubscribeOption",
    value: function showSubscribeOption(options) {}
    /**
     * Show abbreviated offers.
     * @param {!OffersRequest=} options
     */

  }, {
    key: "showAbbrvOffer",
    value: function showAbbrvOffer(options) {}
    /**
     * Show contribution options for the users to select from.
     * The options are grouped together by periods (Weekly, Monthly, etc.).
     * User can select the amount to contribute to from available options
     * to the publisher. These options are based on the SKUs defined in the Play
     * console for a given publication.
     * Each SKU has Amount, Period, SKUId and other attributes.
     * @param {!OffersRequest=} options
     */

  }, {
    key: "showContributionOptions",
    value: function showContributionOptions(options) {}
    /**
     * Set the callback for the native subscribe request. Setting this callback
     * triggers the "native" option in the offers flow.
     * @param {function()} callback
     */

  }, {
    key: "setOnNativeSubscribeRequest",
    value: function setOnNativeSubscribeRequest(callback) {}
    /**
     * Set the subscribe complete callback.
     * @param {function(!Promise<!SubscribeResponse>)} callback
     */

  }, {
    key: "setOnSubscribeResponse",
    value: function setOnSubscribeResponse(callback) {}
    /**
     * Starts subscription purchase flow.
     * @param {string} sku
     */

  }, {
    key: "subscribe",
    value: function subscribe(sku) {}
    /**
     * Starts subscription purchase flow.
     * @param {SubscriptionRequest} subscriptionRequest
     */

  }, {
    key: "updateSubscription",
    value: function updateSubscription(subscriptionRequest) {}
    /**
     * Set the contribution complete callback.
     * @param {function(!Promise<!SubscribeResponse>)} callback
     */

  }, {
    key: "setOnContributionResponse",
    value: function setOnContributionResponse(callback) {}
    /**
     * Set the payment complete callback.
     * @param {function(!Promise<!SubscribeResponse>)} callback
     */

  }, {
    key: "setOnPaymentResponse",
    value: function setOnPaymentResponse(callback) {}
    /**
     * Starts contributions purchase flow.
     * @param {string|SubscriptionRequest} skuOrSubscriptionRequest
     */

  }, {
    key: "contribute",
    value: function contribute(skuOrSubscriptionRequest) {}
    /**
     * Starts the deferred account creation flow.
     * See `DeferredAccountCreationRequest` for more details.
     * @param {?DeferredAccountCreationRequest=} options
     * @return {!Promise<!DeferredAccountCreationResponse>}
     */

  }, {
    key: "completeDeferredAccountCreation",
    value: function completeDeferredAccountCreation(options) {}
    /**
     * @param {function(!LoginRequest)} callback
     */

  }, {
    key: "setOnLoginRequest",
    value: function setOnLoginRequest(callback) {}
    /**
     * @param {!LoginRequest} request
     */

  }, {
    key: "triggerLoginRequest",
    value: function triggerLoginRequest(request) {}
    /**
     * Starts the login prompt flow.
     * @return {!Promise}
     */

  }, {
    key: "showLoginPrompt",
    value: function showLoginPrompt() {}
    /**
     * Starts the login notification flow.
     * @return {!Promise}
     */

  }, {
    key: "showLoginNotification",
    value: function showLoginNotification() {}
    /**
     * @param {function()} callback
     */

  }, {
    key: "setOnLinkComplete",
    value: function setOnLinkComplete(callback) {}
    /**
     * @param {!Promise} accountPromise Publisher's promise to lookup account.
     * @return {!Promise}
     */

  }, {
    key: "waitForSubscriptionLookup",
    value: function waitForSubscriptionLookup(accountPromise) {}
    /**
     * Starts the metered registration wall flow.
     * @param {{ gsiUrl: string, alreadyRegisteredUrl: string}} params
     * @return {!Promise}
     */

  }, {
    key: "showMeterRegwall",
    value: function showMeterRegwall(params) {}
    /**
     * Starts the Account linking flow.
     * TODO(dparikh): decide if it's only exposed for testing or PROD purposes.
     * @param {{ampReaderId: (string|undefined)}=} params
     */

  }, {
    key: "linkAccount",
    value: function linkAccount(params) {}
    /**
     * Notifies the client that a flow has been started. The name of the flow
     * is passed as the callback argument. The flow name corresponds to the
     * method name in this interface, such as "showOffers", or "subscribe".
     * See `SubscriptionFlows` for the full list.
     *
     * Also see `setOnFlowCanceled` method.
     *
     * @param {function({flow: string, data: !Object})} callback
     */

  }, {
    key: "setOnFlowStarted",
    value: function setOnFlowStarted(callback) {}
    /**
     * Notifies the client that a flow has been canceled. The name of the flow
     * is passed as the callback argument. The flow name corresponds to the
     * method name in this interface, such as "showOffers", or "subscribe".
     * See `SubscriptionFlows` for the full list.
     *
     * Notice that some of the flows, such as "subscribe", could additionally
     * have their own "cancel" events.
     *
     * Also see `setOnFlowStarted` method.
     *
     * @param {function({flow: string, data: !Object})} callback
     */

  }, {
    key: "setOnFlowCanceled",
    value: function setOnFlowCanceled(callback) {}
    /**
     * Starts the save subscriptions flow.
     * @param {!SaveSubscriptionRequestCallback} requestCallback
     * @return {!Promise} a promise indicating flow is started
     */

  }, {
    key: "saveSubscription",
    value: function saveSubscription(requestCallback) {}
    /**
     * Creates an element with the SwG button style and the provided callback.
     * The default theme is "light".
     *
     * @param {!ButtonOptions|function()} optionsOrCallback
     * @param {function()=} callback
     * @return {!Element}
     */

  }, {
    key: "createButton",
    value: function createButton(optionsOrCallback, callback) {}
    /**
     * Attaches the SwG button style and the provided callback to an existing
     * DOM element. The default theme is "light".
     *
     * @param {!Element} button
     * @param {!ButtonOptions|function()} optionsOrCallback
     * @param {function()=} callback
     */

  }, {
    key: "attachButton",
    value: function attachButton(button, optionsOrCallback, callback) {}
    /**
     * Attaches smartButton element and the provided callback.
     * The default theme is "light".
     *
     * @param {!Element} button
     * @param {!SmartButtonOptions|function()} optionsOrCallback
     * @param {function()=} callback
     */

  }, {
    key: "attachSmartButton",
    value: function attachSmartButton(button, optionsOrCallback, callback) {}
    /**
     * Retrieves the propensity module that provides APIs to
     * get propensity scores based on user state and events
     * @return {!Promise<PropensityApi>}
     */

  }, {
    key: "getPropensityModule",
    value: function getPropensityModule() {}
    /** @return {!Promise<LoggerApi>} */

  }, {
    key: "getLogger",
    value: function getLogger() {}
    /** @return {!Promise<ClientEventManagerApi>} */

  }, {
    key: "getEventManager",
    value: function getEventManager() {}
    /**
     * Publishers participating in Showcase should call this with their own entitlements
     * and entitlement related UI events.  SwG will automatically do this for Google
     * sourced subscriptions and meters.
     * @param {!PublisherEntitlement} entitlement
     */

  }, {
    key: "setShowcaseEntitlement",
    value: function setShowcaseEntitlement(entitlement) {}
  }]);

  return Subscriptions;
}();
/** @enum {string} */


exports.Subscriptions = Subscriptions;
var PublisherEntitlementEvent = {
  EVENT_SHOWCASE_UNLOCKED_BY_SUBSCRIPTION: 'EVENT_SHOWCASE_UNLOCKED_BY_SUBSCRIPTION',
  // Publisher managed subscriptions only
  EVENT_SHOWCASE_UNLOCKED_BY_METER: 'EVENT_SHOWCASE_UNLOCKED_BY_METER',
  // Publisher managed meters only
  EVENT_SHOWCASE_UNLOCKED_FREE_PAGE: 'EVENT_SHOWCASE_UNLOCKED_FREE_PAGE',
  // When the article is free for any reason (lead article, etc)
  EVENT_SHOWCASE_NO_ENTITLEMENTS_REGWALL: 'EVENT_SHOWCASE_NO_ENTITLEMENTS_REGWALL',
  // When the user must register to view the article
  EVENT_SHOWCASE_NO_ENTITLEMENTS_PAYWALL: 'EVENT_SHOWCASE_NO_ENTITLEMENTS_PAYWALL' // When the user must subscribe to view the article

};
/**
* PublisherEntitlement
*   In order to participate in News Showcase, publishers must report information about their entitlements.
* Properties:
* - isUserRegistered: Is the user registered currently?
* - entitlement: Publisher entitlement event type.
*  @typedef {{
*    isUserRegister:  !boolean,
*    entitlement: !PublisherEntitlementEvent,
* }}
*/

exports.PublisherEntitlementEvent = PublisherEntitlementEvent;
var PublisherEntitlement;
/** @enum {string} */

exports.PublisherEntitlement = PublisherEntitlement;
var SubscriptionFlows = {
  SHOW_OFFERS: 'showOffers',
  SHOW_SUBSCRIBE_OPTION: 'showSubscribeOption',
  SHOW_ABBRV_OFFER: 'showAbbrvOffer',
  SHOW_CONTRIBUTION_OPTIONS: 'showContributionOptions',
  SUBSCRIBE: 'subscribe',
  CONTRIBUTE: 'contribute',
  COMPLETE_DEFERRED_ACCOUNT_CREATION: 'completeDeferredAccountCreation',
  LINK_ACCOUNT: 'linkAccount',
  SHOW_LOGIN_PROMPT: 'showLoginPrompt',
  SHOW_METER_REGWALL: 'showMeterRegwall',
  SHOW_LOGIN_NOTIFICATION: 'showLoginNotification',
  SHOW_METER_TOAST: 'showMeterToast'
};
/**
 * Configuration properties:
 * - windowOpenMode - either "auto" or "redirect". The "redirect" value will
 *   force redirect flow for any window.open operation, including payments.
 *   The "auto" value either uses a redirect or a popup flow depending on
 *   what's possible on a specific environment. Defaults to "auto".
 * - enableSwgAnalytics - if set to true then events logged by the publisher's
 *   client will be sent to Google's SwG analytics service.  This information is
 *   used to compare the effectiveness of Google's buy-flow events to those
 *   generated by the publisher's client code.  This includes events sent to
 *   both PropensityApi and LoggerApi.
 * - enablePropensity - If true events from the logger api are sent to the
 *   propensity server.  Note events from the legacy propensity endpoint are
 *   always sent.
 * @typedef {{
 *   experiments: (!Array<string>|undefined),
 *   windowOpenMode: (!WindowOpenMode|undefined),
 *   analyticsMode: (!AnalyticsMode|undefined),
 *   enableSwgAnalytics: (boolean|undefined),
 *   enablePropensity: (boolean|undefined),
 * }}
 */

exports.SubscriptionFlows = SubscriptionFlows;
var Config;
/**
 * Params for GetEntitlements requests to SwG Client.
 * swg-js constructs objects of this type, but publisher JS won't.
 * swg-js converts these params to a Base64 JSON string
 * before sending them to SwG Client.
 * @typedef {{
 *   metering: (!GetEntitlementsMeteringParamsInternal|undefined),
 * }}
 */

exports.Config = Config;
var GetEntitlementsParamsInternalDef;
/**
 * Encryption params for GetEntitlements requests.
 * @typedef {{
 *   encryptedDocumentKey: string,
 * }}
 */

exports.GetEntitlementsParamsInternalDef = GetEntitlementsParamsInternalDef;
var GetEntitlementsEncryptionParams;
/**
 * Metering params for GetEntitlements requests to SwG Client.
 * swg-js constructs objects of this type, but publisher JS won't.
 * @typedef {{
 *   clientTypes: !Array<number>,
 *   owner: string,
 *   state: {
 *     id: string,
 *     attributes: !Array<{
 *       name: string,
 *       timestamp: number,
 *     }>,
 *   },
 *   resource: {
 *     hashedCanonicalUrl: string,
 *   },
 * }}
 */

exports.GetEntitlementsEncryptionParams = GetEntitlementsEncryptionParams;
var GetEntitlementsMeteringParamsInternal;
/**
 * Params for `getEntitlements` calls from publisher JS.
 * swg-js converts objects of this type to GetEntitlementsParamsInternal.
 * @typedef {{
 *   encryption: (!GetEntitlementsEncryptionParams|undefined),
 *   metering: (!GetEntitlementsMeteringParamsExternal|undefined),
 * }}
 */

exports.GetEntitlementsMeteringParamsInternal = GetEntitlementsMeteringParamsInternal;
var GetEntitlementsParamsExternalDef;
/**
 * Params for `getEntitlements` calls from publisher JS.
 * swg-js converts objects of this type to GetEntitlementsMeteringParamsInternal.
 * @typedef {{
 *   clientTypes: !Array<number>,
 *   owner: string,
 *   state: {
 *     id: string,
 *     standardAttributes: !Object<string, {
 *       timestamp: number,
 *     }>,
 *     customAttributes: !Object<string, {
 *       timestamp: number,
 *     }>,
 *   },
 *   resource: {
 *     hashedCanonicalUrl: string,
 *   },
 * }}
 */

exports.GetEntitlementsParamsExternalDef = GetEntitlementsParamsExternalDef;
var GetEntitlementsMeteringParamsExternal;
/**
 * @enum {number}
 */

exports.GetEntitlementsMeteringParamsExternal = GetEntitlementsMeteringParamsExternal;
var AnalyticsMode = {
  DEFAULT: 0,
  IMPRESSIONS: 1
};
/**
 * @enum {string}
 */

exports.AnalyticsMode = AnalyticsMode;
var WindowOpenMode = {
  AUTO: 'auto',
  REDIRECT: 'redirect'
};
/**
 * @enum {string}
 */

exports.WindowOpenMode = WindowOpenMode;
var ReplaceSkuProrationMode = {
  // The replacement takes effect immediately, and the remaining time will
  // be prorated and credited to the user. This is the current default
  // behavior.
  IMMEDIATE_WITH_TIME_PRORATION: 'IMMEDIATE_WITH_TIME_PRORATION'
};
/**
 * The Offers/Contributions UI is rendered differently based on the
 * ProductType. The ProductType parameter is passed to the Payments flow, and
 * then passed back to the Payments confirmation page to render messages/text
 * based on the ProductType.
 * @enum {string}
 */

exports.ReplaceSkuProrationMode = ReplaceSkuProrationMode;
var ProductType = {
  SUBSCRIPTION: 'SUBSCRIPTION',
  UI_CONTRIBUTION: 'UI_CONTRIBUTION'
};
/**
 * @return {!Config}
 */

exports.ProductType = ProductType;

function defaultConfig() {
  return {
    windowOpenMode: WindowOpenMode.AUTO,
    analyticsMode: AnalyticsMode.DEFAULT,
    enableSwgAnalytics: false,
    enablePropensity: false
  };
}
/**
 * Properties:
 * - skus - a list of SKUs to return from the defined or default list. The
 *   order is preserved.
 * - list - a predefined list of SKUs. Use of this property is uncommon.
 *   Possible values are "default" and "amp". Default is "default".
 * - isClosable - a boolean value to determine whether the view is closable.
 *
 * @typedef {{
 *   skus: (!Array<string>|undefined),
 *   list: (string|undefined),
 *   isClosable: (boolean|undefined),
 * }}
 */


var OffersRequest;
/**
 * @typedef {{
 *   linkRequested: boolean,
 * }}
 */

exports.OffersRequest = OffersRequest;
var LoginRequest;
/**
 * Properties:
 * - one and only one of "token" or "authCode"
 * AuthCode reference: https://developers.google.com/actions/identity/oauth2-code-flow
 * Token reference: https://developers.google.com/actions/identity/oauth2-implicit-flow
 * @typedef {{
 *   token: (string|undefined),
 *   authCode: (string|undefined),
 * }}
 */

exports.LoginRequest = LoginRequest;
var SaveSubscriptionRequest;
/**
 * Callback for retrieving subscription request
 *
 * @callback SaveSubscriptionRequestCallback
 * @return {!Promise<SaveSubscriptionRequest> | !SaveSubscriptionRequest} request
 */

exports.SaveSubscriptionRequest = SaveSubscriptionRequest;
var SaveSubscriptionRequestCallback;
/**
 * Properties:
 * - lang: Sets the button SVG and title. Default is "en".
 * - theme: "light" or "dark". Default is "light".
 *
 * @typedef {{
 *   theme: (string|undefined),
 *   lang: (string|undefined),
 * }}
 */

exports.SaveSubscriptionRequestCallback = SaveSubscriptionRequestCallback;
var ButtonOptions;
/**
 * Properties:
 * - lang: Sets the button SVG and title. Default is "en".
 * - theme: "light" or "dark". Default is "light".
 * - messageTextColor: Overrides theme color for message text. (ex: "#09f")
 *
 * @typedef {{
 *   theme: (string|undefined),
 *   lang: (string|undefined),
 *   messageTextColor: (string|undefined),
 * }}
 */

exports.ButtonOptions = ButtonOptions;
var SmartButtonOptions;
/**
 * Properties:
 * - sku: Required. Sku to add to the user's subscriptions.
 * - oldSku: Optional. This is if you want to replace one sku with another. For
 *  example, if a user wants to upgrade or downgrade their current subscription.
 * - prorationMode: Optional. When replacing a subscription you can decide on a
 *  specific proration mode to charge the user.
 *  The default is IMMEDIATE_WITH_TIME_PRORATION.
 * - oneTime: Optional. When a user chooses a contribution, they have the option
 *  to make it non-recurring.
 *
 *  @typedef {{
 *    skuId: string,
 *    oldSku: (string|undefined),
 *    replaceSkuProrationMode: (ReplaceSkuProrationMode|undefined),
 *    oneTime: (boolean|undefined),
 * }}
 */

exports.SmartButtonOptions = SmartButtonOptions;
var SubscriptionRequest;
exports.SubscriptionRequest = SubscriptionRequest;

},{"./client-event-manager-api":5,"./deferred-account-creation":6,"./entitlements":7,"./logger-api":8,"./offer":10,"./propensity-api":11,"./subscribe-response":12}],14:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.UserData = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

/**
 * Copyright 2018 The Subscribe with Google Authors. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS-IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 */
var UserData = /*#__PURE__*/function () {
  /**
   * @param {string} idToken
   * @param {!Object} data
   */
  function UserData(idToken, data) {
    _classCallCheck(this, UserData);

    /** @const {string} */
    this.idToken = idToken;
    /** @const {!Object} */

    this.data = data;
    /** @const {string} */

    this.id = data['sub'];
    /** @const {string} */

    this.email = data['email'];
    /** @const {boolean} */

    this.emailVerified = data['email_verified'];
    /** @const {string} */

    this.name = data['name'];
    /** @const {string} */

    this.givenName = data['given_name'];
    /** @const {string} */

    this.familyName = data['family_name'];
    /** @const {string} */

    this.pictureUrl = data['picture'];
  }
  /**
   * @return {!UserData}
   */


  _createClass(UserData, [{
    key: "clone",
    value: function clone() {
      return new UserData(this.idToken, this.data);
    }
    /**
     * @return {!Object}
     */

  }, {
    key: "json",
    value: function json() {
      return {
        'id': this.id,
        'email': this.email,
        'emailVerified': this.emailVerified,
        'name': this.name,
        'givenName': this.givenName,
        'familyName': this.familyName,
        'pictureUrl': this.pictureUrl
      };
    }
  }]);

  return UserData;
}();

exports.UserData = UserData;

},{}],15:[function(require,module,exports){
"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ActivityPorts = exports.ActivityIframePort = exports.ActivityPort = exports.ActivityPortDef = void 0;

var _api_messages = require("../proto/api_messages");

var _activityPorts = require("web-activities/activity-ports");

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

/**
 * @interface
 */
var ActivityPortDef = /*#__PURE__*/function () {
  function ActivityPortDef() {
    _classCallCheck(this, ActivityPortDef);
  }

  _createClass(ActivityPortDef, [{
    key: "acceptResult",

    /**
     * @return {!Promise<!web-activities/activity-ports.ActivityResult>}
     */
    value: function acceptResult() {}
  }]);

  return ActivityPortDef;
}();
/**
 * @interface
 */


exports.ActivityPortDef = ActivityPortDef;

var ActivityPort = /*#__PURE__*/function (_ActivityPortDef) {
  _inherits(ActivityPort, _ActivityPortDef);

  var _super = _createSuper(ActivityPort);

  function ActivityPort() {
    _classCallCheck(this, ActivityPort);

    return _super.apply(this, arguments);
  }

  _createClass(ActivityPort, [{
    key: "getMode",

    /**
     * Returns the mode of the activity: iframe, popup or redirect.
     * @return {!web-activities/activity-ports.ActivityMode}
     */
    value: function getMode() {}
    /**
     * Accepts the result when ready. The client should verify the activity's
     * mode, origin, verification and secure channel flags before deciding
     * whether or not to trust the result.
     *
     * Returns the promise that yields when the activity has been completed and
     * either a result, a cancelation or a failure has been returned.
     *
     * @return {!Promise<!web-activities/activity-ports.ActivityResult>}
     * @override
     */

  }, {
    key: "acceptResult",
    value: function acceptResult() {}
    /**
     * Returns a promise that yields when the iframe is ready to be interacted
     * with.
     * @return {!Promise}
     */

  }, {
    key: "whenReady",
    value: function whenReady() {}
    /**
     * Waits until the activity port is connected to the host.
     * @return {!Promise}
     */

  }, {
    key: "connect",
    value: function connect() {}
    /**
     * Disconnect the activity binding and cleanup listeners.
     */

  }, {
    key: "disconnect",
    value: function disconnect() {}
    /**
     * Register a callback to handle resize requests. Once successfully resized,
     * ensure to call `resized()` method.
     * @param {function(number)} unusedCallback
     */

  }, {
    key: "onResizeRequest",
    value: function onResizeRequest(unusedCallback) {}
    /**
     * @param {!../proto/api_messages.Message} unusedRequest
     */

  }, {
    key: "execute",
    value: function execute(unusedRequest) {}
    /**
     * @param {!function(new: T)} unusedMessage
     * @param {function(Object)} unusedCallback
     * @template T
     */

  }, {
    key: "on",
    value: function on(unusedMessage, unusedCallback) {}
    /**
     * Signals back to the activity implementation that the client has updated
     * the activity's size.
     */

  }, {
    key: "resized",
    value: function resized() {}
  }]);

  return ActivityPort;
}(ActivityPortDef);
/**
 * @implements {ActivityPortDef}
 */


exports.ActivityPort = ActivityPort;

var ActivityPortDeprecated = /*#__PURE__*/function () {
  /**
   * @param {!web-activities/activity-ports.ActivityPort} port
   */
  function ActivityPortDeprecated(port) {
    _classCallCheck(this, ActivityPortDeprecated);

    /** @private @const {!web-activities/activity-ports.ActivityPort} */
    this.port_ = port;
  }
  /**
   * @return {!Promise<!web-activities/activity-ports.ActivityResult>}
   */


  _createClass(ActivityPortDeprecated, [{
    key: "acceptResult",
    value: function acceptResult() {
      return this.port_.acceptResult();
    }
  }]);

  return ActivityPortDeprecated;
}();
/**
 * @implements {ActivityPortDef}
 */


var ActivityIframePort = /*#__PURE__*/function () {
  /**
   * @param {!HTMLIFrameElement} iframe
   * @param {string} url
   * @param {!../runtime/deps.DepsDef} deps
   * @param {?Object=} args
   */
  function ActivityIframePort(iframe, url, deps, args) {
    _classCallCheck(this, ActivityIframePort);

    /** @private @const {!web-activities/activity-ports.ActivityIframePort} */
    this.iframePort_ = new _activityPorts.ActivityIframePort(iframe, url, args);
    /** @private @const {!Object<string, function(!Object)>} */

    this.callbackMap_ = {};
    /** @private @const {../runtime/deps.DepsDef} */

    this.deps_ = deps;
  }
  /**
   * Returns a promise that yields when the iframe is ready to be interacted
   * with.
   * @return {!Promise}
   */


  _createClass(ActivityIframePort, [{
    key: "whenReady",
    value: function whenReady() {
      return this.iframePort_.whenReady();
    }
    /**
     * Waits until the activity port is connected to the host.
     * @return {!Promise}
     */

  }, {
    key: "connect",
    value: function connect() {
      var _this = this;

      return this.iframePort_.connect().then(function () {
        // Attach a callback to receive messages after connection complete
        _this.iframePort_.onMessage(function (data) {
          var response = data && data['RESPONSE'];

          if (!response) {
            return;
          }

          var cb = _this.callbackMap_[response[0]];

          if (cb) {
            cb((0, _api_messages.deserialize)(response));
          }
        });

        if (_this.deps_ && _this.deps_.eventManager()) {
          _this.on(_api_messages.AnalyticsRequest, function (request) {
            _this.deps_.eventManager().logEvent({
              eventType: request.getEvent(),
              eventOriginator: _api_messages.EventOriginator.SWG_SERVER,
              isFromUserAction: request.getMeta().getIsFromUserAction(),
              additionalParameters: request.getParams()
            });
          });
        }
      });
    }
    /**
     * Disconnect the activity binding and cleanup listeners.
     */

  }, {
    key: "disconnect",
    value: function disconnect() {
      this.iframePort_.disconnect();
    }
    /**
     * Returns the mode of the activity: iframe, popup or redirect.
     * @return {!web-activities/activity-ports.ActivityMode}
     */

  }, {
    key: "getMode",
    value: function getMode() {
      return this.iframePort_.getMode();
    }
    /**
     * Accepts the result when ready. The client should verify the activity's
     * mode, origin, verification and secure channel flags before deciding
     * whether or not to trust the result.
     *
     * Returns the promise that yields when the activity has been completed and
     * either a result, a cancelation or a failure has been returned.
     *
     * @return {!Promise<!web-activities/activity-ports.ActivityResult>}
     * @override
     */

  }, {
    key: "acceptResult",
    value: function acceptResult() {
      return this.iframePort_.acceptResult();
    }
    /**
     * Register a callback to handle resize requests. Once successfully resized,
     * ensure to call `resized()` method.
     * @param {function(number)} callback
     */

  }, {
    key: "onResizeRequest",
    value: function onResizeRequest(callback) {
      return this.iframePort_.onResizeRequest(callback);
    }
    /**
     * @param {!../proto/api_messages.Message} request
     */

  }, {
    key: "execute",
    value: function execute(request) {
      this.iframePort_.message({
        'REQUEST': request.toArray()
      });
    }
    /**
     * @param {!function(new: T)} message
     * @param {function(!../proto/api_messages.Message)} callback
     * @template T
     */

  }, {
    key: "on",
    value: function on(message, callback) {
      var label = null;

      try {
        label = (0, _api_messages.getLabel)(message);
      } catch (ex) {
        // Thrown if message is not a proto object and has no label
        label = null;
      }

      if (!label) {
        throw new Error('Invalid data type');
      } else if (this.callbackMap_[label]) {
        throw new Error('Invalid type or duplicate callback for ', label);
      }

      this.callbackMap_[label] = callback;
    }
    /**
     * Signals back to the activity implementation that the client has updated
     * the activity's size.
     */

  }, {
    key: "resized",
    value: function resized() {
      this.iframePort_.resized();
    }
  }]);

  return ActivityIframePort;
}();

exports.ActivityIframePort = ActivityIframePort;

var ActivityPorts = /*#__PURE__*/function () {
  /**
   * @param {!../runtime/deps.DepsDef} deps
   */
  function ActivityPorts(deps) {
    _classCallCheck(this, ActivityPorts);

    /** @private @const {!../runtime/deps.DepsDef} */
    this.deps_ = deps;
    /** @private @const {!web-activities/activity-ports.ActivityPorts} */

    this.activityPorts_ = new _activityPorts.ActivityPorts(deps.win());
  }
  /**
   * Adds client version, publication, product and logging context information.
   * @param {?Object=} args
   * @return {!Object}
   */


  _createClass(ActivityPorts, [{
    key: "addDefaultArguments",
    value: function addDefaultArguments(args) {
      var deps = this.deps_;
      var pageConfig = deps.pageConfig();
      var context = deps.analytics().getContext();
      return Object.assign({
        'analyticsContext': context.toArray(),
        'publicationId': pageConfig.getPublicationId(),
        'productId': pageConfig.getProductId(),
        '_client': 'SwG 0.1.22-1606775387259',
        'supportsEventManager': true
      }, args || {});
    }
    /*
     * Start an activity within the specified iframe.
     * @param {!HTMLIFrameElement} iframe
     * @param {string} url
     * @param {?Object=} args
     * @return {!Promise<!ActivityIframePort>}
     */

  }, {
    key: "openActivityIframePort_",
    value: function openActivityIframePort_(iframe, url, args) {
      var activityPort = new ActivityIframePort(iframe, url, this.deps_, args);
      return activityPort.connect().then(function () {
        return activityPort;
      });
    }
    /**
     * Start an activity within the specified iframe.
     * @param {!HTMLIFrameElement} iframe
     * @param {string} url
     * @param {?Object=} args
     * @param {boolean=} addDefaultArguments
     * @return {!Promise<!ActivityIframePort>}
     */

  }, {
    key: "openIframe",
    value: function openIframe(iframe, url, args) {
      var addDefaultArguments = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;

      if (addDefaultArguments) {
        args = this.addDefaultArguments(args);
      }

      return this.openActivityIframePort_(iframe, url, args);
    }
    /**
     * Start an activity in a separate window. The result will be delivered
     * to the `onResult` callback.
     *
     * The activity can be opened in two modes: "popup" and "redirect". This
     * depends on the `target` value, but also on the browser/environment.
     *
     * The allowed `target` values are `_blank`, `_top` and name targets. The
     * `_self`, `_parent` and similar targets are not allowed.
     *
     * The `_top` target indicates that the activity should be opened as a
     * "redirect", while other targets indicate that the activity should be
     * opened as a popup. The activity client will try to honor the requested
     * target. However, it's not always possible. Some environments do not
     * allow popups and they either force redirect or fail the window open
     * request. In this case, the activity will try to fallback to the "redirect"
     * mode.
     *
     * @param {string} requestId
     * @param {string} url
     * @param {string} target
     * @param {?Object=} args
     * @param {?web-activities/activity-ports.ActivityOpenOptions=} options
     * @param {boolean=} addDefaultArguments
     * @return {{targetWin: ?Window}}
     */

  }, {
    key: "open",
    value: function open(requestId, url, target, args, options) {
      var addDefaultArguments = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : false;

      if (addDefaultArguments) {
        args = this.addDefaultArguments(args);
      }

      return this.activityPorts_.open(requestId, url, target, args, options);
    }
    /**
     * Registers the callback for the result of the activity opened with the
     * specified `requestId` (see the `open()` method). The callback is a
     * function that takes a single `ActivityPort` argument. The client
     * can use this object to verify the port using it's origin, verified and
     * secure channel flags. Then the client can call
     * `ActivityPort.acceptResult()` method to accept the result.
     *
     * The activity result is handled via a separate callback because of a
     * possible redirect. So use of direct callbacks and/or promises is not
     * possible in that case.
     *
     * A typical implementation would look like:
     * ```
     * ports.onResult('request1', function(port) {
     *   port.acceptResult().then(function(result) {
     *     // Only verified origins are allowed.
     *     if (result.origin == expectedOrigin &&
     *         result.originVerified &&
     *         result.secureChannel) {
     *       handleResultForRequest1(result);
     *     }
     *   });
     * })
     *
     * ports.open('request1', request1Url, '_blank');
     * ```
     *
     * @param {string} requestId
     * @param {function(!ActivityPortDef)} callback
     */

  }, {
    key: "onResult",
    value: function onResult(requestId, callback) {
      this.activityPorts_.onResult(requestId, function (port) {
        callback(new ActivityPortDeprecated(port));
      });
    }
    /**
     * @param {function(!Error)} handler
     */

  }, {
    key: "onRedirectError",
    value: function onRedirectError(handler) {
      this.activityPorts_.onRedirectError(handler);
    }
    /**
     * @return {!web-activities/activity-ports.ActivityPorts}
     */

  }, {
    key: "getOriginalWebActivityPorts",
    value: function getOriginalWebActivityPorts() {
      return this.activityPorts_;
    }
  }]);

  return ActivityPorts;
}();

exports.ActivityPorts = ActivityPorts;

},{"../proto/api_messages":33,"web-activities/activity-ports":4}],16:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DialogManager = void 0;

var _dialog = require("./dialog");

var _graypane = require("./graypane");

var _errors = require("../utils/errors");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var POPUP_Z_INDEX = 2147483647;
/**
 * The class for the top level dialog.
 * @final
 */

var DialogManager = /*#__PURE__*/function () {
  /**
   * @param {!../model/doc.Doc} doc
   */
  function DialogManager(doc) {
    var _this = this;

    _classCallCheck(this, DialogManager);

    /** @private @const {!../model/doc.Doc} */
    this.doc_ = doc;
    /** @private {?Dialog} */

    this.dialog_ = null;
    /** @private {?Promise<!Dialog>} */

    this.openPromise_ = null;
    /** @private @const {!Graypane} */

    this.popupGraypane_ = new _graypane.Graypane(doc, POPUP_Z_INDEX);
    /** @private {?Window} */

    this.popupWin_ = null;
    this.popupGraypane_.getElement().addEventListener('click', function () {
      if (_this.popupWin_) {
        try {
          _this.popupWin_.focus();
        } catch (e) {// Ignore error.
        }
      }
    });
  }
  /**
   * @param {boolean=} hidden
   * @return {!Promise<!Dialog>}
   */


  _createClass(DialogManager, [{
    key: "openDialog",
    value: function openDialog() {
      var hidden = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;

      if (!this.openPromise_) {
        this.dialog_ = new _dialog.Dialog(this.doc_);
        this.openPromise_ = this.dialog_.open(hidden);
      }

      return this.openPromise_;
    }
    /**
     * @param {!./view.View} view
     * @param {boolean=} hidden
     * @return {!Promise}
     */

  }, {
    key: "openView",
    value: function openView(view) {
      var _this2 = this;

      var hidden = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
      view.whenComplete()["catch"](function (reason) {
        if ((0, _errors.isCancelError)(reason)) {
          _this2.completeView(view);
        }

        throw reason;
      });
      return this.openDialog(hidden).then(function (dialog) {
        return dialog.openView(view);
      });
    }
    /**
     * @param {?./view.View} view
     */

  }, {
    key: "completeView",
    value: function completeView(view) {
      var _this3 = this;

      // Give a small amount of time for another view to take over the dialog.
      setTimeout(function () {
        if (_this3.dialog_ && _this3.dialog_.getCurrentView() == view) {
          _this3.close_();
        }
      }, 100);
    }
    /**
     */

  }, {
    key: "completeAll",
    value: function completeAll() {
      if (this.dialog_) {
        this.close_();
      }

      if (this.popupGraypane_.isAttached()) {
        this.popupGraypane_.destroy();
      }
    }
    /**
     * @returns {?Dialog}
     */

  }, {
    key: "getDialog",
    value: function getDialog() {
      return this.dialog_;
    }
    /** @private */

  }, {
    key: "close_",
    value: function close_() {
      this.dialog_.close();
      this.dialog_ = null;
      this.openPromise_ = null;
    }
    /**
     * @param {?Window|undefined} targetWin
     */

  }, {
    key: "popupOpened",
    value: function popupOpened(targetWin) {
      this.popupWin_ = targetWin || null;

      if (!this.popupGraypane_.isAttached()) {
        this.popupGraypane_.attach();
      }

      this.popupGraypane_.show();
    }
    /**
     */

  }, {
    key: "popupClosed",
    value: function popupClosed() {
      this.popupWin_ = null;

      try {
        this.popupGraypane_.hide();
      } catch (e) {// Ignore.
      }
    }
  }]);

  return DialogManager;
}();

exports.DialogManager = DialogManager;

},{"../utils/errors":74,"./dialog":17,"./graypane":19}],17:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Dialog = void 0;

var _ui = require("../../build/css/ui/ui.css");

var _friendlyIframe = require("./friendly-iframe");

var _graypane = require("./graypane");

var _loadingView = require("../ui/loading-view");

var _dom = require("../utils/dom");

var _doc = require("../model/doc");

var _style = require("../utils/style");

var _animation = require("../utils/animation");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Z_INDEX = 2147483647;
/**
 * Default iframe important styles.
 * Note: The iframe responsiveness media query style is injected in the
 * publisher's page since style attribute can not include media query.
 * @const {!Object<string, string|number>}
 */

var rootElementImportantStyles = {
  'min-height': '50px',
  'border': 'none',
  'display': 'block',
  'position': 'fixed',
  'z-index': Z_INDEX,
  'box-sizing': 'border-box'
};
/**
 * Reset view styles.
 * @const {!Object<string, string|number>}
 */

var resetViewStyles = {
  'position': 'absolute',
  'top': '0',
  'left': '0',
  'right': '0',
  'bottom': '0',
  'opacity': 0,

  /* These lines are a work around to this issue in iOS:     */

  /* https://bugs.webkit.org/show_bug.cgi?id=155198          */
  'height': 0,
  'max-height': '100%',
  'max-width': '100%',
  'min-height': '100%',
  'min-width': '100%',
  'width': 0
};
/**
 * Position of the dialog.
 * @const @enum {string}
 */

var PositionAt = {
  BOTTOM: 'BOTTOM',
  TOP: 'TOP',
  FLOAT: 'FLOAT',
  FULL: 'FULL'
};
/**
 * The class for the top level dialog.
 * @final
 */

var Dialog = /*#__PURE__*/function () {
  /**
   * Create a dialog for the provided doc.
   * @param {!../model/doc.Doc} doc
   * @param {!Object<string, string|number>=} importantStyles
   * @param {!Object<string, string|number>=} styles
   */
  function Dialog(doc) {
    var importantStyles = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    var styles = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

    _classCallCheck(this, Dialog);

    /** @private @const {!../model/doc.Doc} */
    this.doc_ = doc;
    /** @private @const {!FriendlyIframe} */

    this.iframe_ = new _friendlyIframe.FriendlyIframe(doc.getWin().document, {
      'class': 'swg-dialog'
    });
    /** @private @const {!Graypane} */

    this.graypane_ = new _graypane.Graypane(doc, Z_INDEX - 1);
    var modifiedImportantStyles = Object.assign({}, rootElementImportantStyles, importantStyles);
    (0, _style.setImportantStyles)(this.iframe_.getElement(), modifiedImportantStyles);
    (0, _style.setStyles)(this.iframe_.getElement(), styles);
    /** @private {LoadingView} */

    this.loadingView_ = null;
    /** @private {?Element} */

    this.container_ = null; // Depends on constructed document inside iframe.

    /** @private {?./view.View} */

    this.view_ = null;
    /** @private {?Promise} */

    this.animating_ = null;
    /** @private {boolean} */

    this.hidden_ = false;
    /** @private {?./view.View} */

    this.previousProgressView_ = null;
    /** @private {boolean} */

    this.useFixedLayer_ = false;
  }
  /**
   * Opens the dialog and builds the iframe container.
   * @param {boolean=} hidden
   * @return {!Promise<!Dialog>}
   */


  _createClass(Dialog, [{
    key: "open",
    value: function open() {
      var _this = this;

      var hidden = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
      var iframe = this.iframe_;

      if (iframe.isConnected()) {
        throw new Error('already opened');
      } // Attach.


      this.doc_.getBody().appendChild(iframe.getElement()); // Fires onload.

      this.graypane_.attach();

      if (hidden) {
        (0, _style.setImportantStyles)(iframe.getElement(), {
          'visibility': 'hidden',
          'opacity': 0
        });
        this.hidden_ = hidden;
      } else {
        this.show_();
      }

      if (this.useFixedLayer_) {
        return this.doc_.addToFixedLayer(iframe.getElement()).then(function () {
          return iframe.whenReady();
        }).then(function () {
          _this.buildIframe_();

          return _this;
        });
      } else {
        return iframe.whenReady().then(function () {
          _this.buildIframe_();

          return _this;
        });
      }
    }
    /**
     * Build the iframe with the styling after iframe is loaded.
     * @private
     */

  }, {
    key: "buildIframe_",
    value: function buildIframe_() {
      var iframe = this.iframe_;
      var iframeBody = iframe.getBody();
      var iframeDoc =
      /** @type {!HTMLDocument} */
      this.iframe_.getDocument(); // Inject Google fonts in <HEAD> section of the iframe.

      (0, _dom.injectStyleSheet)((0, _doc.resolveDoc)(iframeDoc), _ui.CSS); // Add Loading indicator.

      this.loadingView_ = new _loadingView.LoadingView(iframeDoc);
      iframeBody.appendChild(this.loadingView_.getElement()); // Container for all dynamic content, including 3P iframe.

      this.container_ = (0, _dom.createElement)(iframeDoc, 'swg-container', {});
      iframeBody.appendChild(this.container_);
      this.setPosition_();
    }
    /**
     * Closes the dialog.
     * @param {boolean=} animated
     * @return {!Promise}
     */

  }, {
    key: "close",
    value: function close() {
      var _this2 = this;

      var animated = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;
      var animating;

      if (animated) {
        animating = this.animate_(function () {
          _this2.graypane_.hide(
          /* animate */
          true);

          return (0, _animation.transition)(_this2.getElement(), {
            'transform': 'translateY(100%)'
          }, 300, 'ease-out');
        });
      } else {
        animating = Promise.resolve();
      }

      return animating.then(function () {
        var iframeEl = _this2.iframe_.getElement();

        iframeEl.parentNode.removeChild(iframeEl);

        _this2.removePaddingToHtml_();

        _this2.graypane_.destroy();
      });
    }
    /**
     * Gets the container within the dialog.
     * @return {!Element}
     */

  }, {
    key: "getContainer",
    value: function getContainer() {
      if (!this.container_) {
        throw new Error('not opened yet');
      }

      return this.container_;
    }
    /**
     * Gets the attached iframe instance.
     * @return {!FriendlyIframe}
     */

  }, {
    key: "getIframe",
    value: function getIframe() {
      return this.iframe_;
    }
    /**
     * Gets the Iframe element.
     * @return {!HTMLIFrameElement}
     */

  }, {
    key: "getElement",
    value: function getElement() {
      return this.iframe_.getElement();
    }
    /**
     * Transitions to the next view.
     * @private
     */

  }, {
    key: "entryTransitionToNextView_",
    value: function entryTransitionToNextView_() {
      if (this.view_ && this.view_.hasLoadingIndicator()) {
        // Temporarily cache the old view.
        this.previousProgressView_ = this.view_;
      } else {
        // Since loading indicator will be shown, remove contents of old view.
        (0, _dom.removeChildren)(this.getContainer()); // When loading indicator was not displayed in the previous view,
        // loading indicator must be displayed while transitioning to new view.

        this.loadingView_.show();
      }
    }
    /**
     * Transition out of an old view.
     * @private
     */

  }, {
    key: "exitTransitionFromOldView_",
    value: function exitTransitionFromOldView_() {
      // If previous view is still around, remove it.
      if (this.previousProgressView_) {
        (0, _dom.removeElement)(this.previousProgressView_.getElement());
        this.previousProgressView_ = null;
      } else {
        this.loadingView_.hide();
      }
    }
    /** @return {?./view.View} */

  }, {
    key: "getCurrentView",
    value: function getCurrentView() {
      return this.view_;
    }
    /**
     * Opens the given view and removes existing view from the DOM if any.
     * @param {!./view.View} view
     * @return {!Promise}
     */

  }, {
    key: "openView",
    value: function openView(view) {
      var _this3 = this;

      (0, _style.setImportantStyles)(view.getElement(), resetViewStyles);
      this.entryTransitionToNextView_();
      this.view_ = view;
      this.getContainer().appendChild(view.getElement()); // If the current view should fade the parent document.

      if (view.shouldFadeBody() && !this.hidden_) {
        this.graypane_.show(
        /* animate */
        true);
      }

      return view.init(this).then(function () {
        (0, _style.setImportantStyles)(view.getElement(), {
          'opacity': 1
        });

        if (_this3.hidden_) {
          if (view.shouldFadeBody()) {
            _this3.graypane_.show(
            /* animated */
            true);
          }

          _this3.show_();
        }

        _this3.exitTransitionFromOldView_();
      });
    }
    /**
     * Show the iframe.
     * @private
     */

  }, {
    key: "show_",
    value: function show_() {
      var _this4 = this;

      this.animate_(function () {
        (0, _style.setImportantStyles)(_this4.getElement(), {
          'transform': 'translateY(100%)',
          'opactiy': 1,
          'visibility': 'visible'
        });
        return (0, _animation.transition)(_this4.getElement(), {
          'transform': 'translateY(0)',
          'opacity': 1,
          'visibility': 'visible'
        }, 300, 'ease-out');
      });
      this.hidden_ = false;
    }
    /**
     * Resizes the dialog container.
     * @param {!./view.View} view
     * @param {number} height
     * @param {boolean=} animated
     * @return {?Promise}
     */

  }, {
    key: "resizeView",
    value: function resizeView(view, height) {
      var _this5 = this;

      var animated = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;

      if (this.view_ != view) {
        return null;
      }

      var newHeight = this.getMaxAllowedHeight_(height);
      var animating;

      if (animated) {
        var oldHeight = this.getElement().offsetHeight;

        if (newHeight >= oldHeight) {
          // Expand.
          animating = this.animate_(function () {
            (0, _style.setImportantStyles)(_this5.getElement(), {
              'height': "".concat(newHeight, "px"),
              'transform': "translateY(".concat(newHeight - oldHeight, "px)")
            });
            return (0, _animation.transition)(_this5.getElement(), {
              'transform': 'translateY(0)'
            }, 300, 'ease-out');
          });
        } else {
          // Collapse.
          animating = this.animate_(function () {
            return (0, _animation.transition)(_this5.getElement(), {
              'transform': "translateY(".concat(oldHeight - newHeight, "px)")
            }, 300, 'ease-out').then(function () {
              (0, _style.setImportantStyles)(_this5.getElement(), {
                'height': "".concat(newHeight, "px"),
                'transform': 'translateY(0)'
              });
            });
          });
        }
      } else {
        (0, _style.setImportantStyles)(this.getElement(), {
          'height': "".concat(newHeight, "px")
        });
        animating = Promise.resolve();
      }

      return animating.then(function () {
        _this5.updatePaddingToHtml_(height);

        view.resized();
      });
    }
    /**
     * @param {function():!Promise} callback
     * @return {!Promise}
     * @private
     */

  }, {
    key: "animate_",
    value: function animate_(callback) {
      var _this6 = this;

      var wait = this.animating_ || Promise.resolve();
      return this.animating_ = wait.then(function () {
        return callback();
      }, function () {// Ignore errors to make sure animations don't get stuck.
      }).then(function () {
        _this6.animating_ = null;
      });
    }
    /**
     * Returns maximum allowed height for current viewport.
     * @param {number} height
     * @return {number}
     * @private
     */

  }, {
    key: "getMaxAllowedHeight_",
    value: function getMaxAllowedHeight_(height) {
      return Math.min(height, this.doc_.getWin().
      /*OK*/
      innerHeight * 0.9);
    }
    /**
     * Gets the element's height.
     * @return {number}
     * @private
     */

  }, {
    key: "getHeight_",
    value: function getHeight_() {
      return this.getElement().offsetHeight;
    }
    /**
     * Sets the position of the dialog. Currently 'BOTTOM' is set by default.
     */

  }, {
    key: "setPosition_",
    value: function setPosition_() {
      (0, _style.setImportantStyles)(this.getElement(), this.getPositionStyle_());
    }
    /**
     * Add the padding to the containing page so as to not hide the content
     * behind the popup, if rendered at the bottom.
     * @param {number} newHeight
     * @private
     */

  }, {
    key: "updatePaddingToHtml_",
    value: function updatePaddingToHtml_(newHeight) {
      if (this.inferPosition_() == PositionAt.BOTTOM) {
        var bottomPadding = newHeight + 20; // Add some extra padding.

        var htmlElement = this.doc_.getRootElement();
        (0, _style.setImportantStyles)(htmlElement, {
          'padding-bottom': "".concat(bottomPadding, "px")
        });
      }
    }
    /**
     * Removes previouly added bottom padding from the document.
     * @private
     */

  }, {
    key: "removePaddingToHtml_",
    value: function removePaddingToHtml_() {
      this.doc_.getRootElement().style.removeProperty('padding-bottom');
    }
    /**
     * Calculates the position of the dialog. Currently dialog is positioned at
     * the bottom only. This could change in future to adjust the dialog position
     * based on the screen size.
     * @return {string}
     * @private
     */

  }, {
    key: "inferPosition_",
    value: function inferPosition_() {
      return PositionAt.BOTTOM;
    }
    /**
     * Returns the styles required to postion the dialog.
     * @return {!Object<string, string|number>}
     * @private
     */

  }, {
    key: "getPositionStyle_",
    value: function getPositionStyle_() {
      var dialogPosition = this.inferPosition_();

      switch (dialogPosition) {
        case PositionAt.BOTTOM:
          return {
            'bottom': 0
          };

        case PositionAt.TOP:
          return {
            'top': 0
          };

        case PositionAt.FLOAT:
          return {
            'position': 'fixed',
            'top': '50%',
            'left': '50%',
            'transform': 'translate(-50%, -50%)'
          };

        case PositionAt.FULL:
          return {
            'position': 'fixed',
            'height': '100%',
            'top': 0,
            'bottom': 0
          };

        default:
          return {
            'bottom': 0
          };
      }
    }
  }]);

  return Dialog;
}();

exports.Dialog = Dialog;

},{"../../build/css/ui/ui.css":2,"../model/doc":22,"../ui/loading-view":65,"../utils/animation":68,"../utils/dom":72,"../utils/style":83,"./friendly-iframe":18,"./graypane":19}],18:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FriendlyIframe = void 0;

var _dom = require("../utils/dom");

var _style = require("../utils/style");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

/** @const {!Object<string|number>} */
var friendlyIframeAttributes = {
  'frameborder': 0,
  'scrolling': 'no',
  'src': 'about:blank'
};
/**
 * The class for building friendly iframe.
 */

var FriendlyIframe = /*#__PURE__*/function () {
  /**
   * @param {!Document} doc
   * @param {!Object<string, string|number>=} attrs
   */
  function FriendlyIframe(doc) {
    var _this = this;

    var attrs = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    _classCallCheck(this, FriendlyIframe);

    var mergedAttrs = Object.assign({}, friendlyIframeAttributes, attrs);
    /** @private @const {!HTMLIFrameElement} */

    this.iframe_ =
    /** @type {!HTMLIFrameElement} */
    (0, _dom.createElement)(doc, 'iframe', mergedAttrs); // Ensure that the new iframe does not inherit any CSS styles.

    (0, _style.resetAllStyles)(this.iframe_);
    /** @private @const {!Promise} */

    this.ready_ = new Promise(function (resolve) {
      _this.iframe_.onload = resolve;
    });
  }
  /**
   * When promise is resolved.
   * @return {!Promise}
   */


  _createClass(FriendlyIframe, [{
    key: "whenReady",
    value: function whenReady() {
      return this.ready_;
    }
    /**
     * Gets the iframe element.
     * @return {!HTMLIFrameElement}
     */

  }, {
    key: "getElement",
    value: function getElement() {
      return this.iframe_;
    }
    /**
     * Gets the document object of the iframe element.
     * @return {!Document}
     */

  }, {
    key: "getDocument",
    value: function getDocument() {
      var doc = this.getElement().contentDocument || this.getElement().contentWindow && this.getElement().contentWindow.document;

      if (!doc) {
        throw new Error('not loaded');
      }

      return doc;
    }
    /**
     * Gets the body of the iframe.
     * @return {!Element}
     */

  }, {
    key: "getBody",
    value: function getBody() {
      return (
        /** @type {!Element} */
        this.getDocument().body
      );
    }
    /**
     * Whether the iframe is connected.
     * @return {boolean}
     */

  }, {
    key: "isConnected",
    value: function isConnected() {
      return (0, _dom.isConnected)(this.getElement());
    }
  }]);

  return FriendlyIframe;
}();

exports.FriendlyIframe = FriendlyIframe;

},{"../utils/dom":72,"../utils/style":83}],19:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Graypane = void 0;

var _style = require("../utils/style");

var _animation = require("../utils/animation");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Graypane = /*#__PURE__*/function () {
  /**
   * @param {!../model/doc.Doc} doc
   * @param {number} zIndex
   */
  function Graypane(doc, zIndex) {
    _classCallCheck(this, Graypane);

    /** @private @const {!../model/doc.Doc} */
    this.doc_ = doc;
    /** @private @const {!Element} */

    this.fadeBackground_ = this.doc_.getWin().document.createElement('swg-popup-background');
    (0, _style.setImportantStyles)(this.fadeBackground_, {
      'z-index': zIndex,
      'display': 'none',
      'position': 'fixed',
      'top': 0,
      'right': 0,
      'bottom': 0,
      'left': 0,
      'background-color': 'rgba(32, 33, 36, .6)'
    });
  }
  /**
   * @return {!Element}
   */


  _createClass(Graypane, [{
    key: "getElement",
    value: function getElement() {
      return this.fadeBackground_;
    }
    /**
     * @return {boolean}
     */

  }, {
    key: "isAttached",
    value: function isAttached() {
      return !!this.fadeBackground_.parentNode;
    }
    /**
     * Attaches the graypane to the document.
     */

  }, {
    key: "attach",
    value: function attach() {
      this.doc_.getBody().appendChild(this.fadeBackground_);
    }
    /**
     * Detaches the graypane to the document.
     */

  }, {
    key: "destroy",
    value: function destroy() {
      this.doc_.getBody().removeChild(this.fadeBackground_);
    }
    /**
     * Shows the graypane.
     * @param {boolean=} animated
     * @return {!Promise|undefined}
     */

  }, {
    key: "show",
    value: function show() {
      var animated = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;
      (0, _style.setImportantStyles)(this.fadeBackground_, {
        'display': 'block',
        'opacity': animated ? 0 : 1
      });

      if (animated) {
        return (0, _animation.transition)(this.fadeBackground_, {
          'opacity': 1
        }, 300, 'ease-out');
      }
    }
    /**
     * Hides the graypane.
     * @param {boolean=} animated
     * @return {!Promise|undefined}
     */

  }, {
    key: "hide",
    value: function hide() {
      var _this = this;

      var animated = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;

      if (animated) {
        return (0, _animation.transition)(this.fadeBackground_, {
          'opacity': 0
        }, 300, 'ease-out').then(function () {
          (0, _style.setImportantStyles)(_this.fadeBackground_, {
            'display': 'none'
          });
        });
      }

      (0, _style.setImportantStyles)(this.fadeBackground_, {
        'display': 'none'
      });
    }
  }]);

  return Graypane;
}();

exports.Graypane = Graypane;

},{"../utils/animation":68,"../utils/style":83}],20:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.View = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

/**
 * Copyright 2018 The Subscribe with Google Authors. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS-IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * abstract View Class. Used to render the content within the Dialog. The
 * extended class has actual content.
 * @abstract
 */
var View = /*#__PURE__*/function () {
  /**
   * Empty constructor.
   */
  function View() {
    _classCallCheck(this, View);
  }
  /**
   * Gets the iframe element.
   * @return {!Element}
   * @abstract
   */


  _createClass(View, [{
    key: "getElement",
    value: function getElement() {}
    /**
     * @param {!./dialog.Dialog} unusedDialog
     * @return {!Promise}
     * @abstract
     */

  }, {
    key: "init",
    value: function init(unusedDialog) {}
    /**
     * Resizes the content.
     */

  }, {
    key: "resized",
    value: function resized() {// Do nothing by default. Override if needed.
    }
    /**
     * Accept the result.
     * @return {!Promise}
     * @abstract
     */

  }, {
    key: "whenComplete",
    value: function whenComplete() {}
    /**
     * @return {boolean}
     * @abstract
     */

  }, {
    key: "shouldFadeBody",
    value: function shouldFadeBody() {}
    /**
     * @return {boolean}
     * @abstract
     */

  }, {
    key: "hasLoadingIndicator",
    value: function hasLoadingIndicator() {}
  }]);

  return View;
}();

exports.View = View;

},{}],21:[function(require,module,exports){
"use strict";

require("./polyfills");

var _runtime = require("./runtime/runtime");

var _log = require("./utils/log");

/**
 * Copyright 2018 The Subscribe with Google Authors. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS-IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * @fileoverview
 * The entry point for runtime (swg.js).
 */
(0, _log.log)('Subscriptions Runtime: 0.1.22-1606775387259');
(0, _runtime.installRuntime)(self);

},{"./polyfills":25,"./runtime/runtime":59,"./utils/log":78}],22:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.resolveDoc = resolveDoc;
exports.GlobalDoc = exports.Doc = void 0;

var _documentReady = require("../utils/document-ready");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

/**
 * @interface
 */
var Doc = /*#__PURE__*/function () {
  function Doc() {
    _classCallCheck(this, Doc);
  }

  _createClass(Doc, [{
    key: "getWin",

    /**
     * @return {!Window}
     */
    value: function getWin() {}
    /**
     * The `Document` node or analog.
     * @return {!Node}
     */

  }, {
    key: "getRootNode",
    value: function getRootNode() {}
    /**
     * The `Document.documentElement` element or analog.
     * @return {!Element}
     */

  }, {
    key: "getRootElement",
    value: function getRootElement() {}
    /**
     * The `Document.head` element or analog. Returns `null` if not available
     * yet.
     * @return {!Element}
     */

  }, {
    key: "getHead",
    value: function getHead() {}
    /**
     * The `Document.body` element or analog. Returns `null` if not available
     * yet.
     * @return {?Element}
     */

  }, {
    key: "getBody",
    value: function getBody() {}
    /**
     * Whether the document has been fully constructed.
     * @return {boolean}
     */

  }, {
    key: "isReady",
    value: function isReady() {}
    /**
     * Resolved when document has been fully constructed.
     * @return {!Promise}
     */

  }, {
    key: "whenReady",
    value: function whenReady() {}
    /**
     * Adds the element to the fixed layer.
     * @param {!Element} unusedElement
     * @return {!Promise}
     *
     * This is a no-op for except in AMP on iOS < 13.0.
     */

  }, {
    key: "addToFixedLayer",
    value: function addToFixedLayer(unusedElement) {}
  }]);

  return Doc;
}();
/** @implements {Doc} */


exports.Doc = Doc;

var GlobalDoc = /*#__PURE__*/function () {
  /**
   * @param {!Window|!Document} winOrDoc
   */
  function GlobalDoc(winOrDoc) {
    _classCallCheck(this, GlobalDoc);

    var isWin = !!winOrDoc.document;
    /** @private @const {!Window} */

    this.win_ =
    /** @type {!Window} */
    isWin ?
    /** @type {!Window} */
    winOrDoc :
    /** @type {!Document} */
    winOrDoc.defaultView;
    /** @private @const {!Document} */

    this.doc_ = isWin ?
    /** @type {!Window} */
    winOrDoc.document :
    /** @type {!Document} */
    winOrDoc;
  }
  /** @override */


  _createClass(GlobalDoc, [{
    key: "getWin",
    value: function getWin() {
      return this.win_;
    }
    /** @override */

  }, {
    key: "getRootNode",
    value: function getRootNode() {
      return this.doc_;
    }
    /** @override */

  }, {
    key: "getRootElement",
    value: function getRootElement() {
      return this.doc_.documentElement;
    }
    /** @override */

  }, {
    key: "getHead",
    value: function getHead() {
      // `document.head` always has a chance to be parsed, at least partially.
      return (
        /** @type {!Element} */
        this.doc_.head
      );
    }
    /** @override */

  }, {
    key: "getBody",
    value: function getBody() {
      return this.doc_.body;
    }
    /** @override */

  }, {
    key: "isReady",
    value: function isReady() {
      return (0, _documentReady.isDocumentReady)(this.doc_);
    }
    /** @override */

  }, {
    key: "whenReady",
    value: function whenReady() {
      return (0, _documentReady.whenDocumentReady)(this.doc_);
    }
    /** @override */

  }, {
    key: "addToFixedLayer",
    value: function addToFixedLayer(unusedElement) {
      return Promise.resolve();
    }
  }]);

  return GlobalDoc;
}();
/**
 * @param {!Document|!Window|!Doc} input
 * @return {!Doc}
 */


exports.GlobalDoc = GlobalDoc;

function resolveDoc(input) {
  // Is it a `Document`
  if (
  /** @type {!Document} */
  input.nodeType ===
  /* DOCUMENT */
  9) {
    return new GlobalDoc(
    /** @type {!Document} */
    input);
  } // Is it a `Window`?


  if (
  /** @type {!Window} */
  input.document) {
    return new GlobalDoc(
    /** @type {!Window} */
    input);
  }

  return (
    /** @type {!Doc} */
    input
  );
}

},{"../utils/document-ready":71}],23:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getControlFlag = getControlFlag;
exports.getDocClassForTesting = getDocClassForTesting;
exports.PageConfigResolver = void 0;

var _doc = require("./doc");

var _pageConfig = require("./page-config");

var _log = require("../utils/log");

var _dom = require("../utils/dom");

var _json = require("../utils/json");

var _errorLogger = require("../utils/error-logger");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var ALREADY_SEEN = '__SWG-SEEN__';
var CONTROL_FLAG = 'subscriptions-control';
var ALLOWED_TYPES = ['CreativeWork', 'Article', 'NewsArticle', 'Blog', 'Comment', 'Course', 'HowTo', 'Message', 'Review', 'WebPage']; // RegExp for quickly scanning LD+JSON for allowed types

var RE_ALLOWED_TYPES = new RegExp(ALLOWED_TYPES.join('|'));
/**
 */

var PageConfigResolver = /*#__PURE__*/function () {
  /**
   * @param {!Window|!Document|!Doc} winOrDoc
   */
  function PageConfigResolver(winOrDoc) {
    var _this = this;

    _classCallCheck(this, PageConfigResolver);

    /** @private @const {!Doc} */
    this.doc_ = (0, _doc.resolveDoc)(winOrDoc);
    /** @private {?function((!PageConfig|!Promise))} */

    this.configResolver_ = null;
    /** @private @const {!Promise<!PageConfig>} */

    this.configPromise_ = new Promise(function (resolve) {
      _this.configResolver_ = resolve;
    });
    /** @private @const {!MetaParser} */

    this.metaParser_ = new MetaParser(this.doc_);
    /** @private @const {!JsonLdParser} */

    this.ldParser_ = new JsonLdParser(this.doc_);
    /** @private @const {!MicrodataParser} */

    this.microdataParser_ = new MicrodataParser(this.doc_);
  }
  /**
   * @return {!Promise<!PageConfig>}
   */


  _createClass(PageConfigResolver, [{
    key: "resolveConfig",
    value: function resolveConfig() {
      // Try resolve the config at different times.
      Promise.resolve().then(this.check.bind(this));
      this.doc_.whenReady().then(this.check.bind(this));
      return this.configPromise_;
    }
    /**
     * @return {?PageConfig}
     */

  }, {
    key: "check",
    value: function check() {
      // Already resolved.
      if (!this.configResolver_) {
        return null;
      }

      var config = this.metaParser_.check();

      if (!config) {
        config = this.ldParser_.check();
      }

      if (!config) {
        config = this.microdataParser_.check();
      }

      if (config) {
        // Product ID has been found: initialize the rest of the config.
        this.configResolver_(config);
        this.configResolver_ = null;
      } else if (this.doc_.isReady()) {
        this.configResolver_(Promise.reject((0, _errorLogger.user)().createError('No config could be discovered in the page')));
        this.configResolver_ = null;
      }

      (0, _log.debugLog)(config);
      return config;
    }
  }]);

  return PageConfigResolver;
}();

exports.PageConfigResolver = PageConfigResolver;

var TypeChecker = /*#__PURE__*/function () {
  function TypeChecker() {
    _classCallCheck(this, TypeChecker);
  }
  /**
   * Check value from json
   * @param {?Array|string} value
   * @param {Array<string>} expectedTypes
   * @return {boolean}
   */


  _createClass(TypeChecker, [{
    key: "checkValue",
    value: function checkValue(value, expectedTypes) {
      if (!value) {
        return false;
      }

      return this.checkArray(this.toArray_(value), expectedTypes);
    }
    /**
     * Checks space delimited list of types
     * @param {?string} itemtype
     * @param {Array<string>} expectedTypes
     * @return {boolean}
     */

  }, {
    key: "checkString",
    value: function checkString(itemtype, expectedTypes) {
      if (!itemtype) {
        return false;
      }

      return this.checkArray(itemtype.split(/\s+/), expectedTypes);
    }
    /**
     * @param {Array<?string>} typeArray
     * @param {Array<string>} expectedTypes
     * @return {boolean}
     */

  }, {
    key: "checkArray",
    value: function checkArray(typeArray, expectedTypes) {
      var found = false;
      typeArray.forEach(function (candidateType) {
        found = found || expectedTypes.includes(candidateType.replace(/^http:\/\/schema.org\//i, ''));
      });
      return found;
    }
    /*
     * @param {?Array|string} value
     * @return {Array}
     * @private
     */

  }, {
    key: "toArray_",
    value: function toArray_(value) {
      return Array.isArray(value) ? value : [value];
    }
  }]);

  return TypeChecker;
}();

var MetaParser = /*#__PURE__*/function () {
  /**
   * @param {!Doc} doc
   */
  function MetaParser(doc) {
    _classCallCheck(this, MetaParser);

    /** @private @const {!Doc} */
    this.doc_ = doc;
  }
  /**
   * @return {?PageConfig}
   */


  _createClass(MetaParser, [{
    key: "check",
    value: function check() {
      if (!this.doc_.getBody()) {
        // Wait until the whole `<head>` is parsed.
        return null;
      } // Try to find product id.


      var productId = getMetaTag(this.doc_.getRootNode(), 'subscriptions-product-id');

      if (!productId) {
        return null;
      } // Is locked?


      var accessibleForFree = getMetaTag(this.doc_.getRootNode(), 'subscriptions-accessible-for-free');
      var locked = accessibleForFree && accessibleForFree.toLowerCase() == 'false' || false;
      return new _pageConfig.PageConfig(productId, locked);
    }
  }]);

  return MetaParser;
}();

var JsonLdParser = /*#__PURE__*/function () {
  /**
   * @param {!Doc} doc
   */
  function JsonLdParser(doc) {
    _classCallCheck(this, JsonLdParser);

    /** @private @const {!Doc} */
    this.doc_ = doc;
    /** @private @const @function */

    this.checkType_ = new TypeChecker();
  }
  /**
   * @return {?PageConfig}
   */


  _createClass(JsonLdParser, [{
    key: "check",
    value: function check() {
      if (!this.doc_.getBody()) {
        // Wait until the whole `<head>` is parsed.
        return null;
      }

      var domReady = this.doc_.isReady(); // type: 'application/ld+json'

      var elements = this.doc_.getRootNode().querySelectorAll('script[type="application/ld+json"]');

      for (var i = 0; i < elements.length; i++) {
        var element = elements[i];

        if (element[ALREADY_SEEN] || !element.textContent || !domReady && !(0, _dom.hasNextNodeInDocumentOrder)(element)) {
          continue;
        }

        element[ALREADY_SEEN] = true;

        if (!RE_ALLOWED_TYPES.test(element.textContent)) {
          continue;
        }

        var possibleConfig = this.tryExtractConfig_(element);

        if (possibleConfig) {
          return possibleConfig;
        }
      }

      return null;
    }
    /**
     * @param {!Element} element
     * @return {?PageConfig}
     */

  }, {
    key: "tryExtractConfig_",
    value: function tryExtractConfig_(element) {
      var possibleConfigs = (0, _json.tryParseJson)(element.textContent);

      if (!possibleConfigs) {
        return null;
      } // Support arrays of JSON objects.


      if (!Array.isArray(possibleConfigs)) {
        possibleConfigs = [possibleConfigs];
      }

      for (var i = 0; i < possibleConfigs.length; i++) {
        var possibleConfig = possibleConfigs[i]; // Must be an ALLOWED_TYPE

        if (!this.checkType_.checkValue(possibleConfig['@type'], ALLOWED_TYPES)) {
          continue;
        } // Must have a isPartOf[@type=Product].


        var productId = null;
        var partOfArray = this.valueArray_(possibleConfig, 'isPartOf');

        if (partOfArray) {
          for (var _i = 0; _i < partOfArray.length; _i++) {
            productId = this.discoverProductId_(partOfArray[_i]);

            if (productId) {
              break;
            }
          }
        }

        if (!productId) {
          continue;
        } // Found product id, just check for the access flag.


        var isAccessibleForFree = this.bool_(this.singleValue_(possibleConfig, 'isAccessibleForFree'),
        /* default */
        true);
        return new _pageConfig.PageConfig(productId, !isAccessibleForFree);
      }

      return null;
    }
    /**
     * @param {*} value
     * @param {boolean} def
     * @return {boolean}
     */

  }, {
    key: "bool_",
    value: function bool_(value, def) {
      if (value == null || value === '') {
        return def;
      }

      if (typeof value == 'boolean') {
        return value;
      }

      if (typeof value == 'string') {
        var lowercase = value.toLowerCase();

        if (lowercase == 'false') {
          return false;
        }

        if (lowercase == 'true') {
          return true;
        }
      }

      return def;
    }
    /**
     * @param {!Object} json
     * @return {?string}
     */

  }, {
    key: "discoverProductId_",
    value: function discoverProductId_(json) {
      // Must have type `Product`.
      if (!this.checkType_.checkValue(json['@type'], ['Product'])) {
        return null;
      }

      return (
        /** @type {?string} */
        this.singleValue_(json, 'productID')
      );
    }
    /**
     * @param {!Object} json
     * @param {string} name
     * @return {?Array}
     */

  }, {
    key: "valueArray_",
    value: function valueArray_(json, name) {
      var value = json[name];

      if (value == null || value === '') {
        return null;
      }

      return Array.isArray(value) ? value : [value];
    }
    /**
     * @param {!Object} json
     * @param {string} name
     * @return {*}
     */

  }, {
    key: "singleValue_",
    value: function singleValue_(json, name) {
      var valueArray = this.valueArray_(json, name);
      var value = valueArray && valueArray[0];
      return value == null || value === '' ? null : value;
    }
  }]);

  return JsonLdParser;
}();

var MicrodataParser = /*#__PURE__*/function () {
  /**
   * @param {!Doc} doc
   */
  function MicrodataParser(doc) {
    _classCallCheck(this, MicrodataParser);

    /** @private @const {!Doc} */
    this.doc_ = doc;
    /** @private {?boolean} */

    this.access_ = null;
    /** @private {?string} */

    this.productId_ = null;
    /** @private @const @function */

    this.checkType_ = new TypeChecker();
  }
  /**
   * Returns false if access is restricted, otherwise true
   * @param {!Element} root An element that is an item of type in ALLOWED_TYPES list
   * @return {?boolean} locked access
   * @private
   */


  _createClass(MicrodataParser, [{
    key: "discoverAccess_",
    value: function discoverAccess_(root) {
      var ALREADY_SEEN = 'alreadySeenForAccessInfo';
      var nodeList = root.querySelectorAll("[itemprop='isAccessibleForFree']");

      for (var i = 0; nodeList[i]; i++) {
        var element = nodeList[i];
        var content = element.getAttribute('content') || element.textContent;

        if (!content) {
          continue;
        }

        if (this.isValidElement_(element, root, ALREADY_SEEN)) {
          var accessForFree = null;

          if (content.toLowerCase() == 'true') {
            accessForFree = true;
          } else if (content.toLowerCase() == 'false') {
            accessForFree = false;
          }

          return accessForFree;
        }
      }

      return null;
    }
    /**
     * Verifies if an element is valid based on the following
     * - child of an item of one the the ALLOWED_TYPES
     * - not a child of an item of any other type
     * - not seen before, marked using the alreadySeen tag
     * @param {?Element} current the element to be verified
     * @param {!Element} root the parent to track up to
     * @param {!string} alreadySeen used to tag already visited nodes
     * @return {!boolean} valid node
     * @private
     */

  }, {
    key: "isValidElement_",
    value: function isValidElement_(current, root, alreadySeen) {
      for (var node = current; node && !node[alreadySeen]; node = node.parentNode) {
        node[alreadySeen] = true; // document nodes don't have hasAttribute

        if (node.hasAttribute && node.hasAttribute('itemscope')) {
          /**{?string} */
          var type = node.getAttribute('itemtype');
          return this.checkType_.checkString(type, ALLOWED_TYPES);
        }
      }

      return false;
    }
    /**
     * Obtains the product ID that meets the requirements
     * - child of an item of one of ALLOWED_TYPES
     * - Not a child of an item of type 'Section'
     * - child of an item of type 'productID'
     * @param {!Element} root An element that is an item of an ALLOWED_TYPES
     * @return {?string} product ID, if found
     * @private
     */

  }, {
    key: "discoverProductId_",
    value: function discoverProductId_(root) {
      var ALREADY_SEEN = 'alreadySeenForProductInfo';
      var nodeList = root.querySelectorAll('[itemprop="productID"]');

      for (var i = 0; nodeList[i]; i++) {
        var element = nodeList[i];
        var content = element.getAttribute('content') || element.textContent;
        var item = element.closest('[itemtype][itemscope]');
        var type = item.getAttribute('itemtype');

        if (type.indexOf('http://schema.org/Product') <= -1) {
          continue;
        }

        if (this.isValidElement_(item.parentElement, root, ALREADY_SEEN)) {
          return content;
        }
      }

      return null;
    }
    /**
     * Returns PageConfig if available
     * @return {?PageConfig} PageConfig found so far
     */

  }, {
    key: "getPageConfig_",
    value: function getPageConfig_() {
      var locked = null;

      if (this.access_ != null) {
        locked = !this.access_;
      } else if (this.doc_.isReady()) {
        // Default to unlocked
        locked = false;
      }

      if (this.productId_ != null && locked != null) {
        return new _pageConfig.PageConfig(this.productId_, locked);
      }

      return null;
    }
    /**
     * Extracts page config from Microdata in the DOM
     * @return {?PageConfig} PageConfig found
     */

  }, {
    key: "tryExtractConfig_",
    value: function tryExtractConfig_() {
      var _this2 = this;

      var config = this.getPageConfig_();

      if (config) {
        return config;
      } // Grab all the nodes with an itemtype and filter for our allowed types


      var nodeList = Array.prototype.slice.call(this.doc_.getRootNode().querySelectorAll('[itemscope][itemtype]')).filter(function (node) {
        return _this2.checkType_.checkString(node.getAttribute('itemtype'), ALLOWED_TYPES);
      });

      for (var i = 0; nodeList[i] && config == null; i++) {
        var element = nodeList[i];

        if (this.access_ == null) {
          this.access_ = this.discoverAccess_(element);
        }

        if (!this.productId_) {
          this.productId_ = this.discoverProductId_(element);
        }

        config = this.getPageConfig_();
      }

      return config;
    }
    /**
     * @return {?PageConfig}
     */

  }, {
    key: "check",
    value: function check() {
      if (!this.doc_.getBody()) {
        // Wait until the whole `<head>` is parsed.
        return null;
      }

      return this.tryExtractConfig_();
    }
  }]);

  return MicrodataParser;
}();
/**
 * @param {!Node} rootNode
 * @return {?string}
 */


function getControlFlag(rootNode) {
  // Look for the flag in `meta`.
  var flag = getMetaTag(rootNode, CONTROL_FLAG);

  if (flag) {
    return flag;
  } // Look for the flag in `script`.


  var el = rootNode.querySelector("script[".concat(CONTROL_FLAG, "]"));

  if (el) {
    return el.getAttribute(CONTROL_FLAG);
  }

  return null;
}
/**
 * Returns the value from content attribute of a meta tag with given name.
 *
 * If multiple tags are found, the first value is returned.
 *
 * @param {!Node} rootNode
 * @param {string} name The tag name to look for.
 * @return {?string} attribute value or empty string.
 * @private
 */


function getMetaTag(rootNode, name) {
  var el = rootNode.querySelector("meta[name=\"".concat(name, "\"]"));

  if (el) {
    return el.getAttribute('content');
  }

  return null;
}
/** @package Visible for testing only. */


function getDocClassForTesting() {
  return _doc.Doc;
}

},{"../utils/dom":72,"../utils/error-logger":73,"../utils/json":76,"../utils/log":78,"./doc":22,"./page-config":24}],24:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PageConfig = void 0;

var _errorLogger = require("../utils/error-logger");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

/**
 */
var PageConfig = /*#__PURE__*/function () {
  /**
   * @param {string} productOrPublicationId
   * @param {boolean} locked
   */
  function PageConfig(productOrPublicationId, locked) {
    _classCallCheck(this, PageConfig);

    var publicationId, productId, label;
    var div = productOrPublicationId.indexOf(':');

    if (div != -1) {
      // The argument is a product id.
      productId = productOrPublicationId;
      publicationId = productId.substring(0, div);
      label = productId.substring(div + 1);

      if (label == '*') {
        (0, _errorLogger.user)().expectedError('wildcard disallowed');
      }
    } else {
      // The argument is a publication id.
      publicationId = productOrPublicationId;
      productId = null;
      label = null;
    }
    /** @private @const {string} */


    this.publicationId_ = publicationId;
    /** @private @const {?string} */

    this.productId_ = productId;
    /** @private @const {?string} */

    this.label_ = label;
    /** @private @const {boolean} */

    this.locked_ = locked;
  }
  /**
   * @return {string}
   */


  _createClass(PageConfig, [{
    key: "getPublicationId",
    value: function getPublicationId() {
      return this.publicationId_;
    }
    /**
     * @return {?string}
     */

  }, {
    key: "getProductId",
    value: function getProductId() {
      return this.productId_;
    }
    /**
     * @return {?string}
     */

  }, {
    key: "getLabel",
    value: function getLabel() {
      return this.label_;
    }
    /**
     * @return {boolean}
     */

  }, {
    key: "isLocked",
    value: function isLocked() {
      return this.locked_;
    }
  }]);

  return PageConfig;
}();

exports.PageConfig = PageConfig;

},{"../utils/error-logger":73}],25:[function(require,module,exports){
"use strict";

var _arrayIncludes = require("./polyfills/array-includes");

var _domtokenlistToggle = require("./polyfills/domtokenlist-toggle");

var _documentContains = require("./polyfills/document-contains");

var _mathSign = require("./polyfills/math-sign");

var _objectAssign = require("./polyfills/object-assign");

var _objectValues = require("./polyfills/object-values");

var _promise = require("./polyfills/promise");

/**
 * Copyright 2018 The Subscribe with Google Authors. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS-IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * @fileoverview Loads all polyfills needed by the project.
 * This list should not get longer without a very good reason.
 */
(0, _domtokenlistToggle.install)(self);
(0, _mathSign.install)(self);
(0, _objectAssign.install)(self);
(0, _objectValues.install)(self);
(0, _promise.install)(self);
(0, _documentContains.install)(self);
(0, _arrayIncludes.install)(self);

},{"./polyfills/array-includes":26,"./polyfills/document-contains":27,"./polyfills/domtokenlist-toggle":28,"./polyfills/math-sign":29,"./polyfills/object-assign":30,"./polyfills/object-values":31,"./polyfills/promise":32}],26:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.includes = includes;
exports.install = install;

/**
 * Copyright 2018 The Subscribe with Google Authors. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS-IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * Returns true if the element is in the array and false otherwise.
 *
 * @param {*} value
 * @param {number=} fromIndex
 * @return {boolean}
 * @this {Array}
 */
function includes(value) {
  var fromIndex = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
  var len = this.length;
  var i = fromIndex >= 0 ? fromIndex : Math.max(len + fromIndex, 0);

  for (; i < len; i++) {
    var other = this[i]; // If value has been found OR (value is NaN AND other is NaN)

    /*eslint "no-self-compare": 0*/

    if (other === value || value !== value && other !== other) {
      return true;
    }
  }

  return false;
}
/**
 * Sets the Array.contains polyfill if it does not exist.
 * @param {!Window} win
 */


function install(win) {
  if (!win.Array.prototype.includes) {
    win.Object.defineProperty(Array.prototype, 'includes', {
      enumerable: false,
      configurable: true,
      writable: true,
      value: includes
    });
  }
}

},{}],27:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.contains = contains;
exports.install = install;

/**
 * Copyright 2018 The Subscribe with Google Authors. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS-IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * Polyfill for `document.contains()` method. Notice that according to spec
 * `document.contains` is inclusionary.
 * See https://developer.mozilla.org/en-US/docs/Web/API/Node/contains
 * @param {?Node} node
 * @return {boolean}
 * @this {Node}
 */
function contains(node) {
  // Per spec, "contains" method is inclusionary
  // i.e. `node.contains(node) == true`. However, we still need to test
  // equality to the document itself.
  return node == this || this.documentElement.contains(node);
}
/**
 * Polyfills `HTMLDocument.contains` API.
 * @param {!Window} win
 */


function install(win) {
  if (!win.HTMLDocument.prototype.contains) {
    win.Object.defineProperty(win.HTMLDocument.prototype, 'contains', {
      enumerable: false,
      configurable: true,
      writable: true,
      value: contains
    });
  }
}

},{}],28:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.toggle = toggle;
exports.install = install;

/**
 * Copyright 2018 The Subscribe with Google Authors. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS-IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * Polyfill for `DOMTokenList.prototype.toggle(token, force)` method.
 * This is specially important because IE does not support `force` attribute.
 * See https://goo.gl/hgKNYY for details.
 * @param {string} token
 * @param {boolean=} force
 * @this {DOMTokenList}
 * @return {boolean}
 */
function toggle(token, force) {
  var remove = force === undefined ? this.contains(token) : !force;

  if (remove) {
    this.remove(token);
    return false;
  } else {
    this.add(token);
    return true;
  }
}
/**
 * Polyfills `DOMTokenList.prototype.toggle` API in IE.
 * @param {!Window} win
 */


function install(win) {
  if (isIe(win) && win.DOMTokenList) {
    win.Object.defineProperty(win.DOMTokenList.prototype, 'toggle', {
      enumerable: false,
      configurable: true,
      writable: true,
      value: toggle
    });
  }
}
/**
 * Whether the current browser is a IE browser.
 * @param {!Window} win
 * @return {boolean}
 */


function isIe(win) {
  return /Trident|MSIE|IEMobile/i.test(win.navigator.userAgent);
}

},{}],29:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.sign = sign;
exports.install = install;

/**
 * Copyright 2018 The Subscribe with Google Authors. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS-IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * Parses the number x and returns its sign. For positive x returns 1, for
 * negative, -1. For 0 and -0, returns 0 and -0 respectively. For any number
 * that parses to NaN, returns NaN.
 *
 * @param {number} x
 * @returns {number}
 */
function sign(x) {
  x = Number(x); // If x is 0, -0, or NaN, return it.

  if (!x) {
    return x;
  }

  return x > 0 ? 1 : -1;
}
/**
 * Sets the Math.sign polyfill if it does not exist.
 * @param {!Window} win
 */


function install(win) {
  if (!win.Math.sign) {
    win.Object.defineProperty(win.Math, 'sign', {
      enumerable: false,
      configurable: true,
      writable: true,
      value: sign
    });
  }
}

},{}],30:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.assign = assign;
exports.install = install;

/**
 * Copyright 2018 The Subscribe with Google Authors. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS-IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
var hasOwnProperty = Object.prototype.hasOwnProperty;
/**
 * Copies values of all enumerable own properties from one or more source
 * objects (provided as extended arguments to the function) to a target object.
 *
 * @param {!Object} target
 * @param {...Object} var_args
 * @returns {!Object}
 */

function assign(target, var_args) {
  if (target == null) {
    throw new TypeError('Cannot convert undefined or null to object');
  }

  var output = Object(target);

  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i];

    if (source != null) {
      for (var key in source) {
        if (hasOwnProperty.call(source, key)) {
          output[key] = source[key];
        }
      }
    }
  }

  return output;
}
/**
 * Sets the Object.assign polyfill if it does not exist.
 * @param {!Window} win
 */


function install(win) {
  if (!win.Object.assign) {
    win.Object.defineProperty(win.Object, 'assign', {
      enumerable: false,
      configurable: true,
      writable: true,
      value: assign
    });
  }
}

},{}],31:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.values = values;
exports.install = install;

/**
 * Copyright 2018 The Subscribe with Google Authors. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS-IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
var hasOwnProperty = Object.prototype.hasOwnProperty;
/**
 * Implements `Object.values` API.
 * See https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_objects/Object/values.
 *
 * @param {!Object} target
 * @returns {!Array<*>}
 */

function values(target) {
  if (target == null) {
    throw new TypeError('Cannot convert undefined or null to object');
  }

  var output = [];

  for (var key in target) {
    if (hasOwnProperty.call(target, key)) {
      output.push(target[key]);
    }
  }

  return output;
}
/**
 * Sets the Object.values polyfill if it does not exist.
 * @param {!Window} win
 */


function install(win) {
  if (!win.Object.values) {
    win.Object.defineProperty(win.Object, 'values', {
      enumerable: false,
      configurable: true,
      writable: true,
      value: values
    });
  }
}

},{}],32:[function(require,module,exports){
"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.install = install;

var Promise = _interopRequireWildcard(require("promise-pjs/promise"));

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

/**
 * Copyright 2018 The Subscribe with Google Authors. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS-IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * Sets the Promise polyfill if it does not exist.
 * @param {!Window} win
 */
function install(win) {
  if (!win.Promise) {
    win.Promise =
    /** @type {?} */
    Promise; // In babel the * export is an Object with a default property.
    // In closure compiler it is the Promise function itself.

    if (Promise["default"]) {
      win.Promise = Promise["default"];
    } // We copy the individual static methods, because closure
    // compiler flattens the polyfill namespace.


    win.Promise.resolve = Promise.resolve;
    win.Promise.reject = Promise.reject;
    win.Promise.all = Promise.all;
    win.Promise.race = Promise.race;
  }
}

},{"promise-pjs/promise":3}],33:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.deserialize = deserialize;
exports.getLabel = getLabel;
exports.ViewSubscriptionsResponse = exports.ToastCloseRequest = exports.Timestamp = exports.SubscribeResponse = exports.SmartBoxMessage = exports.SkuSelectedResponse = exports.Message = exports.LinkingInfoResponse = exports.LinkSaveTokenRequest = exports.FinishedLoggingResponse = exports.EventParams = exports.EventOriginator = exports.EntitlementsResponse = exports.EntitlementsRequest = exports.EntitlementJwt = exports.AnalyticsRequest = exports.AnalyticsEventMeta = exports.AnalyticsEvent = exports.AnalyticsContext = exports.AlreadySubscribedResponse = exports.AccountCreationRequest = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

/**
 * Copyright 2018 The Subscribe with Google Authors. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS-IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * @interface
 */
var Message = /*#__PURE__*/function () {
  function Message() {
    _classCallCheck(this, Message);
  }

  _createClass(Message, [{
    key: "label",

    /**
     * @return {string}
     */
    value: function label() {}
    /**
     * @param {boolean=} unusedIncludeLabel
     * @return {!Array<*>}
     */

  }, {
    key: "toArray",
    value: function toArray() {
      var unusedIncludeLabel = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;
    }
  }]);

  return Message;
}();
/** @enum {number} */


exports.Message = Message;
var AnalyticsEvent = {
  UNKNOWN: 0,
  IMPRESSION_PAYWALL: 1,
  IMPRESSION_AD: 2,
  IMPRESSION_OFFERS: 3,
  IMPRESSION_SUBSCRIBE_BUTTON: 4,
  IMPRESSION_SMARTBOX: 5,
  IMPRESSION_SWG_BUTTON: 6,
  IMPRESSION_CLICK_TO_SHOW_OFFERS: 7,
  IMPRESSION_CLICK_TO_SHOW_OFFERS_OR_ALREADY_SUBSCRIBED: 8,
  IMPRESSION_SUBSCRIPTION_COMPLETE: 9,
  IMPRESSION_ACCOUNT_CHANGED: 10,
  IMPRESSION_PAGE_LOAD: 11,
  IMPRESSION_LINK: 12,
  IMPRESSION_SAVE_SUBSCR_TO_GOOGLE: 13,
  IMPRESSION_GOOGLE_UPDATED: 14,
  IMPRESSION_SHOW_OFFERS_SMARTBOX: 15,
  IMPRESSION_SHOW_OFFERS_SWG_BUTTON: 16,
  IMPRESSION_SELECT_OFFER_SMARTBOX: 17,
  IMPRESSION_SELECT_OFFER_SWG_BUTTON: 18,
  IMPRESSION_SHOW_CONTRIBUTIONS_SWG_BUTTON: 19,
  IMPRESSION_SELECT_CONTRIBUTION_SWG_BUTTON: 20,
  ACTION_SUBSCRIBE: 1000,
  ACTION_PAYMENT_COMPLETE: 1001,
  ACTION_ACCOUNT_CREATED: 1002,
  ACTION_ACCOUNT_ACKNOWLEDGED: 1003,
  ACTION_SUBSCRIPTIONS_LANDING_PAGE: 1004,
  ACTION_PAYMENT_FLOW_STARTED: 1005,
  ACTION_OFFER_SELECTED: 1006,
  ACTION_SWG_BUTTON_CLICK: 1007,
  ACTION_VIEW_OFFERS: 1008,
  ACTION_ALREADY_SUBSCRIBED: 1009,
  ACTION_NEW_DEFERRED_ACCOUNT: 1010,
  ACTION_LINK_CONTINUE: 1011,
  ACTION_LINK_CANCEL: 1012,
  ACTION_GOOGLE_UPDATED_CLOSE: 1013,
  ACTION_USER_CANCELED_PAYFLOW: 1014,
  ACTION_SAVE_SUBSCR_TO_GOOGLE_CONTINUE: 1015,
  ACTION_SAVE_SUBSCR_TO_GOOGLE_CANCEL: 1016,
  ACTION_SWG_BUTTON_SHOW_OFFERS_CLICK: 1017,
  ACTION_SWG_BUTTON_SELECT_OFFER_CLICK: 1018,
  ACTION_SWG_BUTTON_SHOW_CONTRIBUTIONS_CLICK: 1019,
  ACTION_SWG_BUTTON_SELECT_CONTRIBUTION_CLICK: 1020,
  ACTION_USER_CONSENT_DEFERRED_ACCOUNT: 1021,
  ACTION_USER_DENY_DEFERRED_ACCOUNT: 1022,
  ACTION_DEFERRED_ACCOUNT_REDIRECT: 1023,
  ACTION_GET_ENTITLEMENTS: 1024,
  EVENT_PAYMENT_FAILED: 2000,
  EVENT_CUSTOM: 3000,
  EVENT_CONFIRM_TX_ID: 3001,
  EVENT_CHANGED_TX_ID: 3002,
  EVENT_GPAY_NO_TX_ID: 3003,
  EVENT_GPAY_CANNOT_CONFIRM_TX_ID: 3004,
  EVENT_GOOGLE_UPDATED: 3005,
  EVENT_NEW_TX_ID: 3006,
  EVENT_UNLOCKED_BY_SUBSCRIPTION: 3007,
  EVENT_UNLOCKED_BY_METER: 3008,
  EVENT_NO_ENTITLEMENTS: 3009,
  EVENT_HAS_METERING_ENTITLEMENTS: 3010,
  EVENT_SUBSCRIPTION_STATE: 4000
};
/** @enum {number} */

exports.AnalyticsEvent = AnalyticsEvent;
var EventOriginator = {
  UNKNOWN_CLIENT: 0,
  SWG_CLIENT: 1,
  AMP_CLIENT: 2,
  PROPENSITY_CLIENT: 3,
  SWG_SERVER: 4,
  PUBLISHER_CLIENT: 5
};
/**
 * @implements {Message}
 */

exports.EventOriginator = EventOriginator;

var AccountCreationRequest = /*#__PURE__*/function () {
  /**
   * @param {!Array<*>=} data
   * @param {boolean=} includesLabel
   */
  function AccountCreationRequest() {
    var data = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
    var includesLabel = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;

    _classCallCheck(this, AccountCreationRequest);

    var base = includesLabel ? 1 : 0;
    /** @private {?boolean} */

    this.complete_ = data[base] == null ? null : data[base];
  }
  /**
   * @return {?boolean}
   */


  _createClass(AccountCreationRequest, [{
    key: "getComplete",
    value: function getComplete() {
      return this.complete_;
    }
    /**
     * @param {boolean} value
     */

  }, {
    key: "setComplete",
    value: function setComplete(value) {
      this.complete_ = value;
    }
    /**
     * @param {boolean} includeLabel
     * @return {!Array<?>}
     * @override
     */

  }, {
    key: "toArray",
    value: function toArray() {
      var includeLabel = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;
      var arr = [this.complete_ // field 1 - complete
      ];

      if (includeLabel) {
        arr.unshift(this.label());
      }

      return arr;
    }
    /**
     * @return {string}
     * @override
     */

  }, {
    key: "label",
    value: function label() {
      return 'AccountCreationRequest';
    }
  }]);

  return AccountCreationRequest;
}();
/**
 * @implements {Message}
 */


exports.AccountCreationRequest = AccountCreationRequest;

var AlreadySubscribedResponse = /*#__PURE__*/function () {
  /**
   * @param {!Array<*>=} data
   * @param {boolean=} includesLabel
   */
  function AlreadySubscribedResponse() {
    var data = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
    var includesLabel = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;

    _classCallCheck(this, AlreadySubscribedResponse);

    var base = includesLabel ? 1 : 0;
    /** @private {?boolean} */

    this.subscriberOrMember_ = data[base] == null ? null : data[base];
    /** @private {?boolean} */

    this.linkRequested_ = data[1 + base] == null ? null : data[1 + base];
  }
  /**
   * @return {?boolean}
   */


  _createClass(AlreadySubscribedResponse, [{
    key: "getSubscriberOrMember",
    value: function getSubscriberOrMember() {
      return this.subscriberOrMember_;
    }
    /**
     * @param {boolean} value
     */

  }, {
    key: "setSubscriberOrMember",
    value: function setSubscriberOrMember(value) {
      this.subscriberOrMember_ = value;
    }
    /**
     * @return {?boolean}
     */

  }, {
    key: "getLinkRequested",
    value: function getLinkRequested() {
      return this.linkRequested_;
    }
    /**
     * @param {boolean} value
     */

  }, {
    key: "setLinkRequested",
    value: function setLinkRequested(value) {
      this.linkRequested_ = value;
    }
    /**
     * @param {boolean} includeLabel
     * @return {!Array<?>}
     * @override
     */

  }, {
    key: "toArray",
    value: function toArray() {
      var includeLabel = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;
      var arr = [this.subscriberOrMember_, // field 1 - subscriber_or_member
      this.linkRequested_ // field 2 - link_requested
      ];

      if (includeLabel) {
        arr.unshift(this.label());
      }

      return arr;
    }
    /**
     * @return {string}
     * @override
     */

  }, {
    key: "label",
    value: function label() {
      return 'AlreadySubscribedResponse';
    }
  }]);

  return AlreadySubscribedResponse;
}();
/**
 * @implements {Message}
 */


exports.AlreadySubscribedResponse = AlreadySubscribedResponse;

var AnalyticsContext = /*#__PURE__*/function () {
  /**
   * @param {!Array<*>=} data
   * @param {boolean=} includesLabel
   */
  function AnalyticsContext() {
    var data = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
    var includesLabel = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;

    _classCallCheck(this, AnalyticsContext);

    var base = includesLabel ? 1 : 0;
    /** @private {?string} */

    this.embedderOrigin_ = data[base] == null ? null : data[base];
    /** @private {?string} */

    this.transactionId_ = data[1 + base] == null ? null : data[1 + base];
    /** @private {?string} */

    this.referringOrigin_ = data[2 + base] == null ? null : data[2 + base];
    /** @private {?string} */

    this.utmSource_ = data[3 + base] == null ? null : data[3 + base];
    /** @private {?string} */

    this.utmCampaign_ = data[4 + base] == null ? null : data[4 + base];
    /** @private {?string} */

    this.utmMedium_ = data[5 + base] == null ? null : data[5 + base];
    /** @private {?string} */

    this.sku_ = data[6 + base] == null ? null : data[6 + base];
    /** @private {?boolean} */

    this.readyToPay_ = data[7 + base] == null ? null : data[7 + base];
    /** @private {!Array<string>} */

    this.label_ = data[8 + base] || [];
    /** @private {?string} */

    this.clientVersion_ = data[9 + base] == null ? null : data[9 + base];
    /** @private {?string} */

    this.url_ = data[10 + base] == null ? null : data[10 + base];
  }
  /**
   * @return {?string}
   */


  _createClass(AnalyticsContext, [{
    key: "getEmbedderOrigin",
    value: function getEmbedderOrigin() {
      return this.embedderOrigin_;
    }
    /**
     * @param {string} value
     */

  }, {
    key: "setEmbedderOrigin",
    value: function setEmbedderOrigin(value) {
      this.embedderOrigin_ = value;
    }
    /**
     * @return {?string}
     */

  }, {
    key: "getTransactionId",
    value: function getTransactionId() {
      return this.transactionId_;
    }
    /**
     * @param {string} value
     */

  }, {
    key: "setTransactionId",
    value: function setTransactionId(value) {
      this.transactionId_ = value;
    }
    /**
     * @return {?string}
     */

  }, {
    key: "getReferringOrigin",
    value: function getReferringOrigin() {
      return this.referringOrigin_;
    }
    /**
     * @param {string} value
     */

  }, {
    key: "setReferringOrigin",
    value: function setReferringOrigin(value) {
      this.referringOrigin_ = value;
    }
    /**
     * @return {?string}
     */

  }, {
    key: "getUtmSource",
    value: function getUtmSource() {
      return this.utmSource_;
    }
    /**
     * @param {string} value
     */

  }, {
    key: "setUtmSource",
    value: function setUtmSource(value) {
      this.utmSource_ = value;
    }
    /**
     * @return {?string}
     */

  }, {
    key: "getUtmCampaign",
    value: function getUtmCampaign() {
      return this.utmCampaign_;
    }
    /**
     * @param {string} value
     */

  }, {
    key: "setUtmCampaign",
    value: function setUtmCampaign(value) {
      this.utmCampaign_ = value;
    }
    /**
     * @return {?string}
     */

  }, {
    key: "getUtmMedium",
    value: function getUtmMedium() {
      return this.utmMedium_;
    }
    /**
     * @param {string} value
     */

  }, {
    key: "setUtmMedium",
    value: function setUtmMedium(value) {
      this.utmMedium_ = value;
    }
    /**
     * @return {?string}
     */

  }, {
    key: "getSku",
    value: function getSku() {
      return this.sku_;
    }
    /**
     * @param {string} value
     */

  }, {
    key: "setSku",
    value: function setSku(value) {
      this.sku_ = value;
    }
    /**
     * @return {?boolean}
     */

  }, {
    key: "getReadyToPay",
    value: function getReadyToPay() {
      return this.readyToPay_;
    }
    /**
     * @param {boolean} value
     */

  }, {
    key: "setReadyToPay",
    value: function setReadyToPay(value) {
      this.readyToPay_ = value;
    }
    /**
     * @return {!Array<string>}
     */

  }, {
    key: "getLabelList",
    value: function getLabelList() {
      return this.label_;
    }
    /**
     * @param {!Array<string>} value
     */

  }, {
    key: "setLabelList",
    value: function setLabelList(value) {
      this.label_ = value;
    }
    /**
     * @return {?string}
     */

  }, {
    key: "getClientVersion",
    value: function getClientVersion() {
      return this.clientVersion_;
    }
    /**
     * @param {string} value
     */

  }, {
    key: "setClientVersion",
    value: function setClientVersion(value) {
      this.clientVersion_ = value;
    }
    /**
     * @return {?string}
     */

  }, {
    key: "getUrl",
    value: function getUrl() {
      return this.url_;
    }
    /**
     * @param {string} value
     */

  }, {
    key: "setUrl",
    value: function setUrl(value) {
      this.url_ = value;
    }
    /**
     * @param {boolean} includeLabel
     * @return {!Array<?>}
     * @override
     */

  }, {
    key: "toArray",
    value: function toArray() {
      var includeLabel = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;
      var arr = [this.embedderOrigin_, // field 1 - embedder_origin
      this.transactionId_, // field 2 - transaction_id
      this.referringOrigin_, // field 3 - referring_origin
      this.utmSource_, // field 4 - utm_source
      this.utmCampaign_, // field 5 - utm_campaign
      this.utmMedium_, // field 6 - utm_medium
      this.sku_, // field 7 - sku
      this.readyToPay_, // field 8 - ready_to_pay
      this.label_, // field 9 - label
      this.clientVersion_, // field 10 - client_version
      this.url_ // field 11 - url
      ];

      if (includeLabel) {
        arr.unshift(this.label());
      }

      return arr;
    }
    /**
     * @return {string}
     * @override
     */

  }, {
    key: "label",
    value: function label() {
      return 'AnalyticsContext';
    }
  }]);

  return AnalyticsContext;
}();
/**
 * @implements {Message}
 */


exports.AnalyticsContext = AnalyticsContext;

var AnalyticsEventMeta = /*#__PURE__*/function () {
  /**
   * @param {!Array<*>=} data
   * @param {boolean=} includesLabel
   */
  function AnalyticsEventMeta() {
    var data = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
    var includesLabel = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;

    _classCallCheck(this, AnalyticsEventMeta);

    var base = includesLabel ? 1 : 0;
    /** @private {?EventOriginator} */

    this.eventOriginator_ = data[base] == null ? null : data[base];
    /** @private {?boolean} */

    this.isFromUserAction_ = data[1 + base] == null ? null : data[1 + base];
  }
  /**
   * @return {?EventOriginator}
   */


  _createClass(AnalyticsEventMeta, [{
    key: "getEventOriginator",
    value: function getEventOriginator() {
      return this.eventOriginator_;
    }
    /**
     * @param {!EventOriginator} value
     */

  }, {
    key: "setEventOriginator",
    value: function setEventOriginator(value) {
      this.eventOriginator_ = value;
    }
    /**
     * @return {?boolean}
     */

  }, {
    key: "getIsFromUserAction",
    value: function getIsFromUserAction() {
      return this.isFromUserAction_;
    }
    /**
     * @param {boolean} value
     */

  }, {
    key: "setIsFromUserAction",
    value: function setIsFromUserAction(value) {
      this.isFromUserAction_ = value;
    }
    /**
     * @param {boolean} includeLabel
     * @return {!Array<?>}
     * @override
     */

  }, {
    key: "toArray",
    value: function toArray() {
      var includeLabel = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;
      var arr = [this.eventOriginator_, // field 1 - event_originator
      this.isFromUserAction_ // field 2 - is_from_user_action
      ];

      if (includeLabel) {
        arr.unshift(this.label());
      }

      return arr;
    }
    /**
     * @return {string}
     * @override
     */

  }, {
    key: "label",
    value: function label() {
      return 'AnalyticsEventMeta';
    }
  }]);

  return AnalyticsEventMeta;
}();
/**
 * @implements {Message}
 */


exports.AnalyticsEventMeta = AnalyticsEventMeta;

var AnalyticsRequest = /*#__PURE__*/function () {
  /**
   * @param {!Array<*>=} data
   * @param {boolean=} includesLabel
   */
  function AnalyticsRequest() {
    var data = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
    var includesLabel = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;

    _classCallCheck(this, AnalyticsRequest);

    var base = includesLabel ? 1 : 0;
    /** @private {?AnalyticsContext} */

    this.context_ = data[base] == null || data[base] == undefined ? null : new AnalyticsContext(data[base], includesLabel);
    /** @private {?AnalyticsEvent} */

    this.event_ = data[1 + base] == null ? null : data[1 + base];
    /** @private {?AnalyticsEventMeta} */

    this.meta_ = data[2 + base] == null || data[2 + base] == undefined ? null : new AnalyticsEventMeta(data[2 + base], includesLabel);
    /** @private {?EventParams} */

    this.params_ = data[3 + base] == null || data[3 + base] == undefined ? null : new EventParams(data[3 + base], includesLabel);
  }
  /**
   * @return {?AnalyticsContext}
   */


  _createClass(AnalyticsRequest, [{
    key: "getContext",
    value: function getContext() {
      return this.context_;
    }
    /**
     * @param {!AnalyticsContext} value
     */

  }, {
    key: "setContext",
    value: function setContext(value) {
      this.context_ = value;
    }
    /**
     * @return {?AnalyticsEvent}
     */

  }, {
    key: "getEvent",
    value: function getEvent() {
      return this.event_;
    }
    /**
     * @param {!AnalyticsEvent} value
     */

  }, {
    key: "setEvent",
    value: function setEvent(value) {
      this.event_ = value;
    }
    /**
     * @return {?AnalyticsEventMeta}
     */

  }, {
    key: "getMeta",
    value: function getMeta() {
      return this.meta_;
    }
    /**
     * @param {!AnalyticsEventMeta} value
     */

  }, {
    key: "setMeta",
    value: function setMeta(value) {
      this.meta_ = value;
    }
    /**
     * @return {?EventParams}
     */

  }, {
    key: "getParams",
    value: function getParams() {
      return this.params_;
    }
    /**
     * @param {!EventParams} value
     */

  }, {
    key: "setParams",
    value: function setParams(value) {
      this.params_ = value;
    }
    /**
     * @param {boolean} includeLabel
     * @return {!Array<?>}
     * @override
     */

  }, {
    key: "toArray",
    value: function toArray() {
      var includeLabel = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;
      var arr = [this.context_ ? this.context_.toArray(includeLabel) : [], // field 1 - context
      this.event_, // field 2 - event
      this.meta_ ? this.meta_.toArray(includeLabel) : [], // field 3 - meta
      this.params_ ? this.params_.toArray(includeLabel) : [] // field 4 - params
      ];

      if (includeLabel) {
        arr.unshift(this.label());
      }

      return arr;
    }
    /**
     * @return {string}
     * @override
     */

  }, {
    key: "label",
    value: function label() {
      return 'AnalyticsRequest';
    }
  }]);

  return AnalyticsRequest;
}();
/**
 * @implements {Message}
 */


exports.AnalyticsRequest = AnalyticsRequest;

var EntitlementJwt = /*#__PURE__*/function () {
  /**
   * @param {!Array<*>=} data
   * @param {boolean=} includesLabel
   */
  function EntitlementJwt() {
    var data = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
    var includesLabel = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;

    _classCallCheck(this, EntitlementJwt);

    var base = includesLabel ? 1 : 0;
    /** @private {?string} */

    this.jwt_ = data[base] == null ? null : data[base];
    /** @private {?string} */

    this.source_ = data[1 + base] == null ? null : data[1 + base];
  }
  /**
   * @return {?string}
   */


  _createClass(EntitlementJwt, [{
    key: "getJwt",
    value: function getJwt() {
      return this.jwt_;
    }
    /**
     * @param {string} value
     */

  }, {
    key: "setJwt",
    value: function setJwt(value) {
      this.jwt_ = value;
    }
    /**
     * @return {?string}
     */

  }, {
    key: "getSource",
    value: function getSource() {
      return this.source_;
    }
    /**
     * @param {string} value
     */

  }, {
    key: "setSource",
    value: function setSource(value) {
      this.source_ = value;
    }
    /**
     * @param {boolean} includeLabel
     * @return {!Array<?>}
     * @override
     */

  }, {
    key: "toArray",
    value: function toArray() {
      var includeLabel = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;
      var arr = [this.jwt_, // field 1 - jwt
      this.source_ // field 2 - source
      ];

      if (includeLabel) {
        arr.unshift(this.label());
      }

      return arr;
    }
    /**
     * @return {string}
     * @override
     */

  }, {
    key: "label",
    value: function label() {
      return 'EntitlementJwt';
    }
  }]);

  return EntitlementJwt;
}();
/**
 * @implements {Message}
 */


exports.EntitlementJwt = EntitlementJwt;

var EntitlementsRequest = /*#__PURE__*/function () {
  /**
   * @param {!Array<*>=} data
   * @param {boolean=} includesLabel
   */
  function EntitlementsRequest() {
    var data = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
    var includesLabel = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;

    _classCallCheck(this, EntitlementsRequest);

    var base = includesLabel ? 1 : 0;
    /** @private {?EntitlementJwt} */

    this.usedEntitlement_ = data[base] == null || data[base] == undefined ? null : new EntitlementJwt(data[base], includesLabel);
    /** @private {?Timestamp} */

    this.clientEventTime_ = data[1 + base] == null || data[1 + base] == undefined ? null : new Timestamp(data[1 + base], includesLabel);
  }
  /**
   * @return {?EntitlementJwt}
   */


  _createClass(EntitlementsRequest, [{
    key: "getUsedEntitlement",
    value: function getUsedEntitlement() {
      return this.usedEntitlement_;
    }
    /**
     * @param {!EntitlementJwt} value
     */

  }, {
    key: "setUsedEntitlement",
    value: function setUsedEntitlement(value) {
      this.usedEntitlement_ = value;
    }
    /**
     * @return {?Timestamp}
     */

  }, {
    key: "getClientEventTime",
    value: function getClientEventTime() {
      return this.clientEventTime_;
    }
    /**
     * @param {!Timestamp} value
     */

  }, {
    key: "setClientEventTime",
    value: function setClientEventTime(value) {
      this.clientEventTime_ = value;
    }
    /**
     * @param {boolean} includeLabel
     * @return {!Array<?>}
     * @override
     */

  }, {
    key: "toArray",
    value: function toArray() {
      var includeLabel = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;
      var arr = [this.usedEntitlement_ ? this.usedEntitlement_.toArray(includeLabel) : [], // field 1 - used_entitlement
      this.clientEventTime_ ? this.clientEventTime_.toArray(includeLabel) : [] // field 2 - client_event_time
      ];

      if (includeLabel) {
        arr.unshift(this.label());
      }

      return arr;
    }
    /**
     * @return {string}
     * @override
     */

  }, {
    key: "label",
    value: function label() {
      return 'EntitlementsRequest';
    }
  }]);

  return EntitlementsRequest;
}();
/**
 * @implements {Message}
 */


exports.EntitlementsRequest = EntitlementsRequest;

var EntitlementsResponse = /*#__PURE__*/function () {
  /**
   * @param {!Array<*>=} data
   * @param {boolean=} includesLabel
   */
  function EntitlementsResponse() {
    var data = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
    var includesLabel = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;

    _classCallCheck(this, EntitlementsResponse);

    var base = includesLabel ? 1 : 0;
    /** @private {?string} */

    this.jwt_ = data[base] == null ? null : data[base];
  }
  /**
   * @return {?string}
   */


  _createClass(EntitlementsResponse, [{
    key: "getJwt",
    value: function getJwt() {
      return this.jwt_;
    }
    /**
     * @param {string} value
     */

  }, {
    key: "setJwt",
    value: function setJwt(value) {
      this.jwt_ = value;
    }
    /**
     * @param {boolean} includeLabel
     * @return {!Array<?>}
     * @override
     */

  }, {
    key: "toArray",
    value: function toArray() {
      var includeLabel = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;
      var arr = [this.jwt_ // field 1 - jwt
      ];

      if (includeLabel) {
        arr.unshift(this.label());
      }

      return arr;
    }
    /**
     * @return {string}
     * @override
     */

  }, {
    key: "label",
    value: function label() {
      return 'EntitlementsResponse';
    }
  }]);

  return EntitlementsResponse;
}();
/**
 * @implements {Message}
 */


exports.EntitlementsResponse = EntitlementsResponse;

var EventParams = /*#__PURE__*/function () {
  /**
   * @param {!Array<*>=} data
   * @param {boolean=} includesLabel
   */
  function EventParams() {
    var data = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
    var includesLabel = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;

    _classCallCheck(this, EventParams);

    var base = includesLabel ? 1 : 0;
    /** @private {?string} */

    this.smartboxMessage_ = data[base] == null ? null : data[base];
    /** @private {?string} */

    this.gpayTransactionId_ = data[1 + base] == null ? null : data[1 + base];
    /** @private {?boolean} */

    this.hadLogged_ = data[2 + base] == null ? null : data[2 + base];
    /** @private {?string} */

    this.sku_ = data[3 + base] == null ? null : data[3 + base];
    /** @private {?string} */

    this.oldTransactionId_ = data[4 + base] == null ? null : data[4 + base];
  }
  /**
   * @return {?string}
   */


  _createClass(EventParams, [{
    key: "getSmartboxMessage",
    value: function getSmartboxMessage() {
      return this.smartboxMessage_;
    }
    /**
     * @param {string} value
     */

  }, {
    key: "setSmartboxMessage",
    value: function setSmartboxMessage(value) {
      this.smartboxMessage_ = value;
    }
    /**
     * @return {?string}
     */

  }, {
    key: "getGpayTransactionId",
    value: function getGpayTransactionId() {
      return this.gpayTransactionId_;
    }
    /**
     * @param {string} value
     */

  }, {
    key: "setGpayTransactionId",
    value: function setGpayTransactionId(value) {
      this.gpayTransactionId_ = value;
    }
    /**
     * @return {?boolean}
     */

  }, {
    key: "getHadLogged",
    value: function getHadLogged() {
      return this.hadLogged_;
    }
    /**
     * @param {boolean} value
     */

  }, {
    key: "setHadLogged",
    value: function setHadLogged(value) {
      this.hadLogged_ = value;
    }
    /**
     * @return {?string}
     */

  }, {
    key: "getSku",
    value: function getSku() {
      return this.sku_;
    }
    /**
     * @param {string} value
     */

  }, {
    key: "setSku",
    value: function setSku(value) {
      this.sku_ = value;
    }
    /**
     * @return {?string}
     */

  }, {
    key: "getOldTransactionId",
    value: function getOldTransactionId() {
      return this.oldTransactionId_;
    }
    /**
     * @param {string} value
     */

  }, {
    key: "setOldTransactionId",
    value: function setOldTransactionId(value) {
      this.oldTransactionId_ = value;
    }
    /**
     * @param {boolean} includeLabel
     * @return {!Array<?>}
     * @override
     */

  }, {
    key: "toArray",
    value: function toArray() {
      var includeLabel = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;
      var arr = [this.smartboxMessage_, // field 1 - smartbox_message
      this.gpayTransactionId_, // field 2 - gpay_transaction_id
      this.hadLogged_, // field 3 - had_logged
      this.sku_, // field 4 - sku
      this.oldTransactionId_ // field 5 - old_transaction_id
      ];

      if (includeLabel) {
        arr.unshift(this.label());
      }

      return arr;
    }
    /**
     * @return {string}
     * @override
     */

  }, {
    key: "label",
    value: function label() {
      return 'EventParams';
    }
  }]);

  return EventParams;
}();
/**
 * @implements {Message}
 */


exports.EventParams = EventParams;

var FinishedLoggingResponse = /*#__PURE__*/function () {
  /**
   * @param {!Array<*>=} data
   * @param {boolean=} includesLabel
   */
  function FinishedLoggingResponse() {
    var data = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
    var includesLabel = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;

    _classCallCheck(this, FinishedLoggingResponse);

    var base = includesLabel ? 1 : 0;
    /** @private {?boolean} */

    this.complete_ = data[base] == null ? null : data[base];
    /** @private {?string} */

    this.error_ = data[1 + base] == null ? null : data[1 + base];
  }
  /**
   * @return {?boolean}
   */


  _createClass(FinishedLoggingResponse, [{
    key: "getComplete",
    value: function getComplete() {
      return this.complete_;
    }
    /**
     * @param {boolean} value
     */

  }, {
    key: "setComplete",
    value: function setComplete(value) {
      this.complete_ = value;
    }
    /**
     * @return {?string}
     */

  }, {
    key: "getError",
    value: function getError() {
      return this.error_;
    }
    /**
     * @param {string} value
     */

  }, {
    key: "setError",
    value: function setError(value) {
      this.error_ = value;
    }
    /**
     * @param {boolean} includeLabel
     * @return {!Array<?>}
     * @override
     */

  }, {
    key: "toArray",
    value: function toArray() {
      var includeLabel = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;
      var arr = [this.complete_, // field 1 - complete
      this.error_ // field 2 - error
      ];

      if (includeLabel) {
        arr.unshift(this.label());
      }

      return arr;
    }
    /**
     * @return {string}
     * @override
     */

  }, {
    key: "label",
    value: function label() {
      return 'FinishedLoggingResponse';
    }
  }]);

  return FinishedLoggingResponse;
}();
/**
 * @implements {Message}
 */


exports.FinishedLoggingResponse = FinishedLoggingResponse;

var LinkSaveTokenRequest = /*#__PURE__*/function () {
  /**
   * @param {!Array<*>=} data
   * @param {boolean=} includesLabel
   */
  function LinkSaveTokenRequest() {
    var data = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
    var includesLabel = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;

    _classCallCheck(this, LinkSaveTokenRequest);

    var base = includesLabel ? 1 : 0;
    /** @private {?string} */

    this.authCode_ = data[base] == null ? null : data[base];
    /** @private {?string} */

    this.token_ = data[1 + base] == null ? null : data[1 + base];
  }
  /**
   * @return {?string}
   */


  _createClass(LinkSaveTokenRequest, [{
    key: "getAuthCode",
    value: function getAuthCode() {
      return this.authCode_;
    }
    /**
     * @param {string} value
     */

  }, {
    key: "setAuthCode",
    value: function setAuthCode(value) {
      this.authCode_ = value;
    }
    /**
     * @return {?string}
     */

  }, {
    key: "getToken",
    value: function getToken() {
      return this.token_;
    }
    /**
     * @param {string} value
     */

  }, {
    key: "setToken",
    value: function setToken(value) {
      this.token_ = value;
    }
    /**
     * @param {boolean} includeLabel
     * @return {!Array<?>}
     * @override
     */

  }, {
    key: "toArray",
    value: function toArray() {
      var includeLabel = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;
      var arr = [this.authCode_, // field 1 - auth_code
      this.token_ // field 2 - token
      ];

      if (includeLabel) {
        arr.unshift(this.label());
      }

      return arr;
    }
    /**
     * @return {string}
     * @override
     */

  }, {
    key: "label",
    value: function label() {
      return 'LinkSaveTokenRequest';
    }
  }]);

  return LinkSaveTokenRequest;
}();
/**
 * @implements {Message}
 */


exports.LinkSaveTokenRequest = LinkSaveTokenRequest;

var LinkingInfoResponse = /*#__PURE__*/function () {
  /**
   * @param {!Array<*>=} data
   * @param {boolean=} includesLabel
   */
  function LinkingInfoResponse() {
    var data = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
    var includesLabel = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;

    _classCallCheck(this, LinkingInfoResponse);

    var base = includesLabel ? 1 : 0;
    /** @private {?boolean} */

    this.requested_ = data[base] == null ? null : data[base];
  }
  /**
   * @return {?boolean}
   */


  _createClass(LinkingInfoResponse, [{
    key: "getRequested",
    value: function getRequested() {
      return this.requested_;
    }
    /**
     * @param {boolean} value
     */

  }, {
    key: "setRequested",
    value: function setRequested(value) {
      this.requested_ = value;
    }
    /**
     * @param {boolean} includeLabel
     * @return {!Array<?>}
     * @override
     */

  }, {
    key: "toArray",
    value: function toArray() {
      var includeLabel = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;
      var arr = [this.requested_ // field 1 - requested
      ];

      if (includeLabel) {
        arr.unshift(this.label());
      }

      return arr;
    }
    /**
     * @return {string}
     * @override
     */

  }, {
    key: "label",
    value: function label() {
      return 'LinkingInfoResponse';
    }
  }]);

  return LinkingInfoResponse;
}();
/**
 * @implements {Message}
 */


exports.LinkingInfoResponse = LinkingInfoResponse;

var SkuSelectedResponse = /*#__PURE__*/function () {
  /**
   * @param {!Array<*>=} data
   * @param {boolean=} includesLabel
   */
  function SkuSelectedResponse() {
    var data = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
    var includesLabel = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;

    _classCallCheck(this, SkuSelectedResponse);

    var base = includesLabel ? 1 : 0;
    /** @private {?string} */

    this.sku_ = data[base] == null ? null : data[base];
    /** @private {?string} */

    this.oldSku_ = data[1 + base] == null ? null : data[1 + base];
    /** @private {?boolean} */

    this.oneTime_ = data[2 + base] == null ? null : data[2 + base];
    /** @private {?string} */

    this.playOffer_ = data[3 + base] == null ? null : data[3 + base];
    /** @private {?string} */

    this.oldPlayOffer_ = data[4 + base] == null ? null : data[4 + base];
  }
  /**
   * @return {?string}
   */


  _createClass(SkuSelectedResponse, [{
    key: "getSku",
    value: function getSku() {
      return this.sku_;
    }
    /**
     * @param {string} value
     */

  }, {
    key: "setSku",
    value: function setSku(value) {
      this.sku_ = value;
    }
    /**
     * @return {?string}
     */

  }, {
    key: "getOldSku",
    value: function getOldSku() {
      return this.oldSku_;
    }
    /**
     * @param {string} value
     */

  }, {
    key: "setOldSku",
    value: function setOldSku(value) {
      this.oldSku_ = value;
    }
    /**
     * @return {?boolean}
     */

  }, {
    key: "getOneTime",
    value: function getOneTime() {
      return this.oneTime_;
    }
    /**
     * @param {boolean} value
     */

  }, {
    key: "setOneTime",
    value: function setOneTime(value) {
      this.oneTime_ = value;
    }
    /**
     * @return {?string}
     */

  }, {
    key: "getPlayOffer",
    value: function getPlayOffer() {
      return this.playOffer_;
    }
    /**
     * @param {string} value
     */

  }, {
    key: "setPlayOffer",
    value: function setPlayOffer(value) {
      this.playOffer_ = value;
    }
    /**
     * @return {?string}
     */

  }, {
    key: "getOldPlayOffer",
    value: function getOldPlayOffer() {
      return this.oldPlayOffer_;
    }
    /**
     * @param {string} value
     */

  }, {
    key: "setOldPlayOffer",
    value: function setOldPlayOffer(value) {
      this.oldPlayOffer_ = value;
    }
    /**
     * @param {boolean} includeLabel
     * @return {!Array<?>}
     * @override
     */

  }, {
    key: "toArray",
    value: function toArray() {
      var includeLabel = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;
      var arr = [this.sku_, // field 1 - sku
      this.oldSku_, // field 2 - old_sku
      this.oneTime_, // field 3 - one_time
      this.playOffer_, // field 4 - play_offer
      this.oldPlayOffer_ // field 5 - old_play_offer
      ];

      if (includeLabel) {
        arr.unshift(this.label());
      }

      return arr;
    }
    /**
     * @return {string}
     * @override
     */

  }, {
    key: "label",
    value: function label() {
      return 'SkuSelectedResponse';
    }
  }]);

  return SkuSelectedResponse;
}();
/**
 * @implements {Message}
 */


exports.SkuSelectedResponse = SkuSelectedResponse;

var SmartBoxMessage = /*#__PURE__*/function () {
  /**
   * @param {!Array<*>=} data
   * @param {boolean=} includesLabel
   */
  function SmartBoxMessage() {
    var data = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
    var includesLabel = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;

    _classCallCheck(this, SmartBoxMessage);

    var base = includesLabel ? 1 : 0;
    /** @private {?boolean} */

    this.isClicked_ = data[base] == null ? null : data[base];
  }
  /**
   * @return {?boolean}
   */


  _createClass(SmartBoxMessage, [{
    key: "getIsClicked",
    value: function getIsClicked() {
      return this.isClicked_;
    }
    /**
     * @param {boolean} value
     */

  }, {
    key: "setIsClicked",
    value: function setIsClicked(value) {
      this.isClicked_ = value;
    }
    /**
     * @param {boolean} includeLabel
     * @return {!Array<?>}
     * @override
     */

  }, {
    key: "toArray",
    value: function toArray() {
      var includeLabel = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;
      var arr = [this.isClicked_ // field 1 - is_clicked
      ];

      if (includeLabel) {
        arr.unshift(this.label());
      }

      return arr;
    }
    /**
     * @return {string}
     * @override
     */

  }, {
    key: "label",
    value: function label() {
      return 'SmartBoxMessage';
    }
  }]);

  return SmartBoxMessage;
}();
/**
 * @implements {Message}
 */


exports.SmartBoxMessage = SmartBoxMessage;

var SubscribeResponse = /*#__PURE__*/function () {
  /**
   * @param {!Array<*>=} data
   * @param {boolean=} includesLabel
   */
  function SubscribeResponse() {
    var data = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
    var includesLabel = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;

    _classCallCheck(this, SubscribeResponse);

    var base = includesLabel ? 1 : 0;
    /** @private {?boolean} */

    this.subscribe_ = data[base] == null ? null : data[base];
  }
  /**
   * @return {?boolean}
   */


  _createClass(SubscribeResponse, [{
    key: "getSubscribe",
    value: function getSubscribe() {
      return this.subscribe_;
    }
    /**
     * @param {boolean} value
     */

  }, {
    key: "setSubscribe",
    value: function setSubscribe(value) {
      this.subscribe_ = value;
    }
    /**
     * @param {boolean} includeLabel
     * @return {!Array<?>}
     * @override
     */

  }, {
    key: "toArray",
    value: function toArray() {
      var includeLabel = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;
      var arr = [this.subscribe_ // field 1 - subscribe
      ];

      if (includeLabel) {
        arr.unshift(this.label());
      }

      return arr;
    }
    /**
     * @return {string}
     * @override
     */

  }, {
    key: "label",
    value: function label() {
      return 'SubscribeResponse';
    }
  }]);

  return SubscribeResponse;
}();
/**
 * @implements {Message}
 */


exports.SubscribeResponse = SubscribeResponse;

var Timestamp = /*#__PURE__*/function () {
  /**
   * @param {!Array<*>=} data
   * @param {boolean=} includesLabel
   */
  function Timestamp() {
    var data = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
    var includesLabel = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;

    _classCallCheck(this, Timestamp);

    var base = includesLabel ? 1 : 0;
    /** @private {?number} */

    this.seconds_ = data[base] == null ? null : data[base];
    /** @private {?number} */

    this.nanos_ = data[1 + base] == null ? null : data[1 + base];
  }
  /**
   * @return {?number}
   */


  _createClass(Timestamp, [{
    key: "getSeconds",
    value: function getSeconds() {
      return this.seconds_;
    }
    /**
     * @param {number} value
     */

  }, {
    key: "setSeconds",
    value: function setSeconds(value) {
      this.seconds_ = value;
    }
    /**
     * @return {?number}
     */

  }, {
    key: "getNanos",
    value: function getNanos() {
      return this.nanos_;
    }
    /**
     * @param {number} value
     */

  }, {
    key: "setNanos",
    value: function setNanos(value) {
      this.nanos_ = value;
    }
    /**
     * @param {boolean} includeLabel
     * @return {!Array<?>}
     * @override
     */

  }, {
    key: "toArray",
    value: function toArray() {
      var includeLabel = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;
      var arr = [this.seconds_, // field 1 - seconds
      this.nanos_ // field 2 - nanos
      ];

      if (includeLabel) {
        arr.unshift(this.label());
      }

      return arr;
    }
    /**
     * @return {string}
     * @override
     */

  }, {
    key: "label",
    value: function label() {
      return 'Timestamp';
    }
  }]);

  return Timestamp;
}();
/**
 * @implements {Message}
 */


exports.Timestamp = Timestamp;

var ToastCloseRequest = /*#__PURE__*/function () {
  /**
   * @param {!Array<*>=} data
   * @param {boolean=} includesLabel
   */
  function ToastCloseRequest() {
    var data = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
    var includesLabel = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;

    _classCallCheck(this, ToastCloseRequest);

    var base = includesLabel ? 1 : 0;
    /** @private {?boolean} */

    this.close_ = data[base] == null ? null : data[base];
  }
  /**
   * @return {?boolean}
   */


  _createClass(ToastCloseRequest, [{
    key: "getClose",
    value: function getClose() {
      return this.close_;
    }
    /**
     * @param {boolean} value
     */

  }, {
    key: "setClose",
    value: function setClose(value) {
      this.close_ = value;
    }
    /**
     * @param {boolean} includeLabel
     * @return {!Array<?>}
     * @override
     */

  }, {
    key: "toArray",
    value: function toArray() {
      var includeLabel = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;
      var arr = [this.close_ // field 1 - close
      ];

      if (includeLabel) {
        arr.unshift(this.label());
      }

      return arr;
    }
    /**
     * @return {string}
     * @override
     */

  }, {
    key: "label",
    value: function label() {
      return 'ToastCloseRequest';
    }
  }]);

  return ToastCloseRequest;
}();
/**
 * @implements {Message}
 */


exports.ToastCloseRequest = ToastCloseRequest;

var ViewSubscriptionsResponse = /*#__PURE__*/function () {
  /**
   * @param {!Array<*>=} data
   * @param {boolean=} includesLabel
   */
  function ViewSubscriptionsResponse() {
    var data = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
    var includesLabel = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;

    _classCallCheck(this, ViewSubscriptionsResponse);

    var base = includesLabel ? 1 : 0;
    /** @private {?boolean} */

    this.native_ = data[base] == null ? null : data[base];
  }
  /**
   * @return {?boolean}
   */


  _createClass(ViewSubscriptionsResponse, [{
    key: "getNative",
    value: function getNative() {
      return this.native_;
    }
    /**
     * @param {boolean} value
     */

  }, {
    key: "setNative",
    value: function setNative(value) {
      this.native_ = value;
    }
    /**
     * @param {boolean} includeLabel
     * @return {!Array<?>}
     * @override
     */

  }, {
    key: "toArray",
    value: function toArray() {
      var includeLabel = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;
      var arr = [this.native_ // field 1 - native
      ];

      if (includeLabel) {
        arr.unshift(this.label());
      }

      return arr;
    }
    /**
     * @return {string}
     * @override
     */

  }, {
    key: "label",
    value: function label() {
      return 'ViewSubscriptionsResponse';
    }
  }]);

  return ViewSubscriptionsResponse;
}();

exports.ViewSubscriptionsResponse = ViewSubscriptionsResponse;
var PROTO_MAP = {
  'AccountCreationRequest': AccountCreationRequest,
  'AlreadySubscribedResponse': AlreadySubscribedResponse,
  'AnalyticsContext': AnalyticsContext,
  'AnalyticsEventMeta': AnalyticsEventMeta,
  'AnalyticsRequest': AnalyticsRequest,
  'EntitlementJwt': EntitlementJwt,
  'EntitlementsRequest': EntitlementsRequest,
  'EntitlementsResponse': EntitlementsResponse,
  'EventParams': EventParams,
  'FinishedLoggingResponse': FinishedLoggingResponse,
  'LinkSaveTokenRequest': LinkSaveTokenRequest,
  'LinkingInfoResponse': LinkingInfoResponse,
  'SkuSelectedResponse': SkuSelectedResponse,
  'SmartBoxMessage': SmartBoxMessage,
  'SubscribeResponse': SubscribeResponse,
  'Timestamp': Timestamp,
  'ToastCloseRequest': ToastCloseRequest,
  'ViewSubscriptionsResponse': ViewSubscriptionsResponse
};
/**
 * Utility to deserialize a buffer
 * @param {!Array<*>} data
 * @return {!Message}
 */

function deserialize(data) {
  /** {?string} */
  var key = data ? data[0] : null;

  if (key) {
    var ctor = PROTO_MAP[key];

    if (ctor) {
      return new ctor(data);
    }
  }

  throw new Error('Deserialization failed for ' + data);
}
/**
 * @param {function(new: T)} messageType
 * @return {string}
 * @template T
 */


function getLabel(messageType) {
  var message =
  /** @type {!Message} */
  new messageType();
  return message.label();
}

},{}],34:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AnalyticsService = void 0;

var _api_messages = require("../proto/api_messages");

var _clientEventManager = require("./client-event-manager");

var _experimentFlags = require("./experiment-flags");

var _dom = require("../utils/dom");

var _services = require("./services");

var _url = require("../utils/url");

var _experiments = require("./experiments");

var _string = require("../utils/string");

var _log = require("../utils/log");

var _style = require("../utils/style");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

/** @const {!Object<string, string>} */
var iframeStyles = {
  opacity: '0',
  position: 'absolute',
  top: '-10px',
  left: '-10px',
  height: '1px',
  width: '1px'
}; // The initial iframe load takes ~500 ms.  We will wait at least that long
// before a page redirect.  Subsequent logs are much faster.  We will wait at
// most 100 ms.

var MAX_FIRST_WAIT = 500;
var MAX_WAIT = 200; // If we logged and rapidly redirected, we will add a short delay in case
// a message hasn't been transmitted yet.

var TIMEOUT_ERROR = 'AnalyticsService timed out waiting for a response';
/**
 *
 * @param {!string} error
 */

function createErrorResponse(error) {
  var response = new _api_messages.FinishedLoggingResponse();
  response.setComplete(false);
  response.setError(error);
  return response;
}

var AnalyticsService = /*#__PURE__*/function () {
  /**
   * @param {!./deps.DepsDef} deps
   * @param {!./fetcher.Fetcher} fetcher
   */
  function AnalyticsService(deps, fetcher) {
    _classCallCheck(this, AnalyticsService);

    /** @private @const {!./fetcher.Fetcher} */
    this.fetcher_ = fetcher;
    /** @private @const {!../model/doc.Doc} */

    this.doc_ = deps.doc();
    /** @private @const {!./deps.DepsDef} */

    this.deps_ = deps;
    /** @private @const {!../components/activities.ActivityPorts} */

    this.activityPorts_ = deps.activities();
    /** @private @const {!HTMLIFrameElement} */

    this.iframe_ =
    /** @type {!HTMLIFrameElement} */
    (0, _dom.createElement)(this.doc_.getWin().document, 'iframe', {});
    (0, _style.setImportantStyles)(this.iframe_, iframeStyles);
    this.doc_.getBody().appendChild(this.getElement());
    /** @private @type {!boolean} */

    this.everFinishedLog_ = false;
    /**
     * @private @const {!AnalyticsContext}
     */

    this.context_ = new _api_messages.AnalyticsContext();
    this.setStaticContext_();
    /** @private {?Promise<!web-activities/activity-ports.ActivityIframePort>} */

    this.serviceReady_ = null;
    /** @private {?Promise} */

    this.lastAction_ = null;
    /** @private @const {!ClientEventManager} */

    this.eventManager_ = deps.eventManager();
    this.eventManager_.registerEventListener(this.handleClientEvent_.bind(this)); // This code creates a 'promise to log' that we can use to ensure all
    // logging is finished prior to redirecting the page.

    /** @private {!number} */

    this.unfinishedLogs_ = 0;
    /** @private {?function(boolean)} */

    this.loggingResolver_ = null;
    /** @private {?Promise} */

    this.promiseToLog_ = null; // If logging doesn't work don't force the user to wait

    /** @private {!boolean} */

    this.loggingBroken_ = false; // If logging exceeds the timeouts (see const comments above) don't make
    // the user wait too long.

    /** @private {?number} */

    this.timeout_ = null;
  }
  /**
   * @param {string} transactionId
   */


  _createClass(AnalyticsService, [{
    key: "setTransactionId",
    value: function setTransactionId(transactionId) {
      var oldTransactionId = this.context_.getTransactionId();
      this.context_.setTransactionId(transactionId);

      if (oldTransactionId != null && oldTransactionId != transactionId) {
        var eventType = _api_messages.AnalyticsEvent.EVENT_NEW_TX_ID;
        var eventParams = new _api_messages.EventParams();
        eventParams.setOldTransactionId(oldTransactionId);
        this.eventManager_.logSwgEvent(eventType,
        /* isFromUserAction= */
        true, eventParams);
      }
    }
    /**
     * @return {string}
     */

  }, {
    key: "getTransactionId",
    value: function getTransactionId() {
      return (
        /** @type {string} */
        this.context_.getTransactionId()
      );
    }
    /**
     * @return {?string}
     */

  }, {
    key: "getSku",
    value: function getSku() {
      return this.context_.getSku();
    }
    /**
     * @param {string} sku
     */

  }, {
    key: "setSku",
    value: function setSku(sku) {
      this.context_.setSku(sku);
    }
    /**
     * @param {string} url
     */

  }, {
    key: "setUrl",
    value: function setUrl(url) {
      this.context_.setUrl(url);
    }
    /**
     * @param {!Array<string>} labels
     */

  }, {
    key: "addLabels",
    value: function addLabels(labels) {
      if (labels && labels.length > 0) {
        var newLabels = [].concat(this.context_.getLabelList());
        labels.forEach(function (label) {
          if (newLabels.indexOf(label) == -1) {
            newLabels.push(label);
          }
        });
        this.context_.setLabelList(newLabels);
      }
    }
    /**
     * @return {!HTMLIFrameElement}
     */

  }, {
    key: "getElement",
    value: function getElement() {
      return this.iframe_;
    }
    /**
     * @return {string}
     * @private
     */

  }, {
    key: "getQueryString_",
    value: function getQueryString_() {
      return this.doc_.getWin().location.search;
    }
    /**
     * @return {string}
     * @private
     */

  }, {
    key: "getReferrer_",
    value: function getReferrer_() {
      return this.doc_.getWin().document.referrer;
    }
    /**
     * @private
     */

  }, {
    key: "setStaticContext_",
    value: function setStaticContext_() {
      var context = this.context_; // These values should all be available during page load.

      if ((0, _experiments.isExperimentOn)(this.doc_.getWin(), _experimentFlags.ExperimentFlags.UPDATE_GOOGLE_TRANSACTION_ID)) {
        context.setTransactionId((0, _string.getSwgTransactionId)());
      } else {
        context.setTransactionId((0, _string.getUuid)());
      }

      context.setReferringOrigin((0, _url.parseUrl)(this.getReferrer_()).origin);
      context.setClientVersion('SwG 0.1.22-1606775387259');
      context.setUrl((0, _url.getCanonicalUrl)(this.doc_));
      var utmParams = (0, _url.parseQueryString)(this.getQueryString_());
      var campaign = utmParams['utm_campaign'];
      var medium = utmParams['utm_medium'];
      var source = utmParams['utm_source'];

      if (campaign) {
        context.setUtmCampaign(campaign);
      }

      if (medium) {
        context.setUtmMedium(medium);
      }

      if (source) {
        context.setUtmSource(source);
      }
    }
    /**
     * @return {!Promise<!../components/activities.ActivityIframePort>}
     */

  }, {
    key: "start",
    value: function start() {
      var _this = this;

      if (!this.serviceReady_) {
        // Please note that currently openIframe reads the current analytics
        // context and that it may not contain experiments activated late during
        // the publishers code lifecycle.
        this.addLabels((0, _experiments.getOnExperiments)(this.doc_.getWin()));
        this.serviceReady_ = this.activityPorts_.openIframe(this.iframe_, (0, _services.feUrl)('/serviceiframe'), null, true).then(function (port) {
          // Register a listener for the logging to code indicate it is
          // finished logging.
          port.on(_api_messages.FinishedLoggingResponse, _this.afterLogging_.bind(_this));
          return port.whenReady().then(function () {
            // The publisher should be done setting experiments but runtime
            // will forward them here if they aren't.
            _this.addLabels((0, _experiments.getOnExperiments)(_this.doc_.getWin()));

            return port;
          });
        }, function (message) {
          // If the port doesn't open register that logging is broken so
          // nothing is just waiting.
          _this.loggingBroken_ = true;

          _this.afterLogging_(createErrorResponse('Could not connect [' + message + ']'));
        });
      }

      return this.serviceReady_;
    }
    /**
     * @param {boolean} isReadyToPay
     */

  }, {
    key: "setReadyToPay",
    value: function setReadyToPay(isReadyToPay) {
      this.context_.setReadyToPay(isReadyToPay);
    }
    /**
     */

  }, {
    key: "close",
    value: function close() {
      this.doc_.getBody().removeChild(this.getElement());
    }
    /**
     * @return {!AnalyticsContext}
     */

  }, {
    key: "getContext",
    value: function getContext() {
      return this.context_;
    }
    /**
     * @param {!../api/client-event-manager-api.ClientEvent} event
     * @return {!AnalyticsRequest}
     */

  }, {
    key: "createLogRequest_",
    value: function createLogRequest_(event) {
      var meta = new _api_messages.AnalyticsEventMeta();
      meta.setEventOriginator(event.eventOriginator);
      meta.setIsFromUserAction(event.isFromUserAction);
      var request = new _api_messages.AnalyticsRequest();
      request.setEvent(event.eventType);
      request.setContext(this.context_);
      request.setMeta(meta);

      if (event.additionalParameters instanceof _api_messages.EventParams) {
        request.setParams(event.additionalParameters);
      } // Ignore event.additionalParameters.  It may have data we shouldn't log.


      return request;
    }
    /**
     * @return {boolean}
     */

  }, {
    key: "shouldLogPublisherEvents_",
    value: function shouldLogPublisherEvents_() {
      return this.deps_.config().enableSwgAnalytics === true;
    }
    /**
     * @param {!../api/client-event-manager-api.ClientEvent} event
     * @return {boolean}
     */

  }, {
    key: "shouldAlwaysLogEvent_",
    value: function shouldAlwaysLogEvent_(event) {
      /* AMP_CLIENT events are considered publisher events and we generally only
       * log those if the publisher decided to enable publisher event logging for
       * privacy purposes.  The page load event is not private and is necessary
       * just so we know the user is in AMP, so we will log it regardless of
       * configuration.
       */
      return event.eventType === _api_messages.AnalyticsEvent.IMPRESSION_PAGE_LOAD && event.eventOriginator === _api_messages.EventOriginator.AMP_CLIENT;
    }
    /**
     *  Listens for new events from the events manager and handles logging
     * @param {!../api/client-event-manager-api.ClientEvent} event
     */

  }, {
    key: "handleClientEvent_",
    value: function handleClientEvent_(event) {
      var _this2 = this;

      //this event is just used to communicate information internally.  It should
      //not be reported to the SwG analytics service.
      if (event.eventType === _api_messages.AnalyticsEvent.EVENT_SUBSCRIPTION_STATE) {
        return;
      }

      if (_clientEventManager.ClientEventManager.isPublisherEvent(event) && !this.shouldLogPublisherEvents_() && !this.shouldAlwaysLogEvent_(event)) {
        return;
      } // Register we sent a log, the port will call this.afterLogging_ when done.


      this.unfinishedLogs_++;
      this.lastAction_ = this.start().then(function (port) {
        var analyticsRequest = _this2.createLogRequest_(event);

        port.execute(analyticsRequest);

        if ((0, _experiments.isExperimentOn)(_this2.doc_.getWin(), _experimentFlags.ExperimentFlags.LOGGING_BEACON)) {
          _this2.sendBeacon_(analyticsRequest);
        }
      });
    }
    /**
     * This function is called by the iframe after it sends the log to the server.
     * @param {FinishedLoggingResponse=} response
     */

  }, {
    key: "afterLogging_",
    value: function afterLogging_(response) {
      var success = response && response.getComplete() || false;
      var error = response && response.getError() || 'Unknown logging Error';
      var isTimeout = error === TIMEOUT_ERROR;

      if (!success) {
        (0, _log.log)('Error when logging: ' + error);
      }

      this.unfinishedLogs_--;

      if (!isTimeout) {
        this.everFinishedLog_ = true;
      } // Nothing is waiting


      if (this.loggingResolver_ === null) {
        return;
      }

      if (this.unfinishedLogs_ === 0 || this.loggingBroken_ || isTimeout) {
        if (this.timeout_ !== null) {
          clearTimeout(this.timeout_);
          this.timeout_ = null;
        }

        this.loggingResolver_(success);
        this.promiseToLog_ = null;
        this.loggingResolver_ = null;
      }
    }
    /**
     * Please note that logs sent after getLoggingPromise is called are not
     * guaranteed to be finished when the promise is resolved.  You should call
     * this function just prior to redirecting the page after SwG is finished
     * logging.
     * @return {!Promise}
     */

  }, {
    key: "getLoggingPromise",
    value: function getLoggingPromise() {
      var _this3 = this;

      if (this.unfinishedLogs_ === 0 || this.loggingBroken_) {
        return Promise.resolve(true);
      }

      if (this.promiseToLog_ === null) {
        this.promiseToLog_ = new Promise(function (resolve) {
          _this3.loggingResolver_ = resolve;
        }); // The promise above should not wait forever if things go wrong.  Let
        // the user proceed!

        var whenDone = this.afterLogging_.bind(this);
        this.timeout_ = setTimeout(function () {
          _this3.timeout_ = null;
          whenDone(createErrorResponse(TIMEOUT_ERROR));
        }, this.everFinishedLog_ ? MAX_WAIT : MAX_FIRST_WAIT);
      }

      return this.promiseToLog_;
    }
    /**
     * A beacon is a rapid fire browser request that does not wait for a response
     * from the server.  It is guaranteed to go out before the page redirects.
     * @param {!AnalyticsRequest} analyticsRequest
     */

  }, {
    key: "sendBeacon_",
    value: function sendBeacon_(analyticsRequest) {
      var pubId = encodeURIComponent(this.deps_.pageConfig().getPublicationId());
      var url = (0, _services.serviceUrl)('/publication/' + pubId + '/clientlogs');
      this.fetcher_.sendBeacon(url, analyticsRequest);
    }
  }]);

  return AnalyticsService;
}();

exports.AnalyticsService = AnalyticsService;

},{"../proto/api_messages":33,"../utils/dom":72,"../utils/log":78,"../utils/string":82,"../utils/style":83,"../utils/url":85,"./client-event-manager":37,"./experiment-flags":43,"./experiments":44,"./services":60}],35:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ButtonApi = exports.ButtonParams = void 0;

var _api_messages = require("../proto/api_messages");

var _smartButtonApi = require("./smart-button-api");

var _dom = require("../utils/dom");

var _i18n = require("../utils/i18n");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

/**
 * The button title should match that of button's SVG.
 */

/** @type {!Object<string, string>} */
var TITLE_LANG_MAP = {
  'en': 'Subscribe with Google',
  'ar': 'Google اشترك مع',
  'de': 'Abonnieren mit Google',
  'es': 'Suscríbete con Google',
  'es-latam': 'Suscríbete con Google',
  'es-latn': 'Suscríbete con Google',
  'fr': "S'abonner avec Google",
  'hi': 'Google के ज़रिये सदस्यता',
  'id': 'Berlangganan dengan Google',
  'it': 'Abbonati con Google',
  'jp': 'Google で購読',
  'ko': 'Google 을 통한구독',
  'ms': 'Langgan dengan Google',
  'nl': 'Abonneren via Google',
  'no': 'Abonner med Google',
  'pl': 'Subskrybuj z Google',
  'pt': 'Subscrever com o Google',
  'pt-br': 'Assine com o Google',
  'ru': 'Подпиcka через Google',
  'se': 'Prenumerera med Google',
  'th': 'สมัครฟาน Google',
  'tr': 'Google ile Abone Ol',
  'uk': 'Підписатися через Google',
  'zh-tw': '透過 Google 訂閱'
};
/*
 * Properties:
 * - lang: Sets the button SVG and title. Default is "en".
 * - theme: "light" or "dark". Default is "light".
 *
 * @typedef {{
 *   options: (!../api/subscriptions.SmartButtonOptions|!../api/subscriptions.ButtonOptions),
 *   clickFun: (!function(Event):?),
 * }}
 */

var ButtonParams;
/**
 * The button stylesheet can be found in the `/assets/swg-button.css`.
 * It's produced by the `gulp assets` task and deployed to
 * `https://news.google.com/swg/js/v1/swg-button.css`.
 */

exports.ButtonParams = ButtonParams;

var ButtonApi = /*#__PURE__*/function () {
  /**
   * @param {!../model/doc.Doc} doc
   * @param {!Promise<!./runtime.ConfiguredRuntime>} configuredRuntimePromise
   */
  function ButtonApi(doc, configuredRuntimePromise) {
    _classCallCheck(this, ButtonApi);

    /** @private @const {!../model/doc.Doc} */
    this.doc_ = doc;
    /** @private @const {!Promise<!./runtime.ConfiguredRuntime>} */

    this.configuredRuntimePromise_ = configuredRuntimePromise;
  }
  /**
   */


  _createClass(ButtonApi, [{
    key: "init",
    value: function init() {
      var head = this.doc_.getHead();

      if (!head) {
        return;
      }

      var url = '/assets/swg-button.css';
      var existing = head.querySelector("link[href=\"".concat(url, "\"]"));

      if (existing) {
        return;
      } // <link rel="stylesheet" href="..." type="text/css">


      head.appendChild((0, _dom.createElement)(this.doc_.getWin().document, 'link', {
        'rel': 'stylesheet',
        'type': 'text/css',
        'href': url
      }));
    }
    /**
     * @param {!../api/subscriptions.ButtonOptions|function()} optionsOrCallback
     * @param {function()=} callback
     * @return {!Element}
     */

  }, {
    key: "create",
    value: function create(optionsOrCallback, callback) {
      var button = (0, _dom.createElement)(this.doc_.getWin().document, 'button', {});
      return this.attach(button, optionsOrCallback, callback);
    }
    /**
     * @param {!Element} button
     * @param {../api/subscriptions.ButtonOptions|function()} optionsOrCallback
     * @param {function()=} callback
     * @return {!Element}
     */

  }, {
    key: "attach",
    value: function attach(button, optionsOrCallback, callback) {
      var options = this.setupButtonAndGetParams_(button, optionsOrCallback, callback).options;
      var theme = options['theme'];
      button.classList.add("swg-button-".concat(theme));
      button.setAttribute('role', 'button');

      if (options['lang']) {
        button.setAttribute('lang', options['lang']);
      }

      button.setAttribute('title', (0, _i18n.msg)(TITLE_LANG_MAP, button) || '');
      this.logSwgEvent_(_api_messages.AnalyticsEvent.IMPRESSION_SWG_BUTTON);
      return button;
    }
    /**
     * @param {!AnalyticsEvent} eventType
     * @param {boolean=} isFromUserAction
     */

  }, {
    key: "logSwgEvent_",
    value: function logSwgEvent_(eventType, isFromUserAction) {
      this.configuredRuntimePromise_.then(function (configuredRuntime) {
        configuredRuntime.eventManager().logSwgEvent(eventType, isFromUserAction);
      });
    }
    /**
     *
     * @param {../api/subscriptions.ButtonOptions|../api/subscriptions.SmartButtonOptions|function()} optionsOrCallback
     * @return {!../api/subscriptions.ButtonOptions|!../api/subscriptions.SmartButtonOptions}
     * @private
     */

  }, {
    key: "getOptions_",
    value: function getOptions_(optionsOrCallback) {
      var options =
      /** @type {!../api/subscriptions.ButtonOptions|!../api/subscriptions.SmartButtonOptions} */
      optionsOrCallback && typeof optionsOrCallback != 'function' ? optionsOrCallback : {
        'theme': _smartButtonApi.Theme.LIGHT
      };
      var theme = options['theme'];

      if (theme !== _smartButtonApi.Theme.LIGHT && theme !== _smartButtonApi.Theme.DARK) {
        options['theme'] = _smartButtonApi.Theme.LIGHT;
      }

      return options;
    }
    /**
     *
     * @param {?../api/subscriptions.ButtonOptions|?../api/subscriptions.SmartButtonOptions|function()} optionsOrCallback
     * @param {function()=} callback
     * @return {function()|function(Event):boolean}
     * @private
     */

  }, {
    key: "getCallback_",
    value: function getCallback_(optionsOrCallback, callback) {
      return (
        /** @type {function()|function(Event):boolean} */
        (typeof optionsOrCallback == 'function' ? optionsOrCallback : null) || callback
      );
    }
    /**
     * @param {!Element} button
     * @param {../api/subscriptions.SmartButtonOptions|function()|../api/subscriptions.ButtonOptions} optionsOrCallback
     * @param {function()=} callbackFun
     * @return {ButtonParams}
     */

  }, {
    key: "setupButtonAndGetParams_",
    value: function setupButtonAndGetParams_(button, optionsOrCallback, callbackFun) {
      var _this = this;

      var options = this.getOptions_(optionsOrCallback);
      var callback = this.getCallback_(optionsOrCallback, callbackFun);

      var clickFun = function clickFun(event) {
        _this.logSwgEvent_(_api_messages.AnalyticsEvent.ACTION_SWG_BUTTON_CLICK, true);

        if (typeof callback === 'function') {
          callback(event);
        }
      };

      button.addEventListener('click', clickFun);
      return {
        options: options,
        clickFun: clickFun
      };
    }
    /**
     * @param {!./deps.DepsDef} deps
     * @param {!Element} button
     * @param {../api/subscriptions.SmartButtonOptions|function()} optionsOrCallback
     * @param {function()=} callback
     * @return {!Element}
     */

  }, {
    key: "attachSmartButton",
    value: function attachSmartButton(deps, button, optionsOrCallback, callback) {
      var params = this.setupButtonAndGetParams_(button, optionsOrCallback, callback); // Add required CSS class, if missing.

      button.classList.add('swg-smart-button');
      return new _smartButtonApi.SmartSubscriptionButtonApi(deps, button, params.options, params.clickFun).start();
    }
  }]);

  return ButtonApi;
}();

exports.ButtonApi = ButtonApi;

},{"../proto/api_messages":33,"../utils/dom":72,"../utils/i18n":75,"./smart-button-api":61}],36:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Callbacks = void 0;

var _errors = require("../utils/errors");

var _log = require("../utils/log");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

/** @enum {number} */
var CallbackId = {
  ENTITLEMENTS: 1,
  SUBSCRIBE_REQUEST: 2,
  PAYMENT_RESPONSE: 3,
  LOGIN_REQUEST: 4,
  LINK_PROGRESS: 5,
  LINK_COMPLETE: 6,
  FLOW_STARTED: 7,
  FLOW_CANCELED: 8
};
/**
 */

var Callbacks = /*#__PURE__*/function () {
  /**
   */
  function Callbacks() {
    _classCallCheck(this, Callbacks);

    /** @private @const {!Object<CallbackId, function(*)>} */
    this.callbacks_ = {};
    /** @private @const {!Object<CallbackId, *>} */

    this.resultBuffer_ = {};
    /** @private {?Promise} */

    this.paymentResponsePromise_ = null;
  }
  /**
   * @param {function(!Promise<!../api/entitlements.Entitlements>)} callback
   */


  _createClass(Callbacks, [{
    key: "setOnEntitlementsResponse",
    value: function setOnEntitlementsResponse(callback) {
      this.setCallback_(CallbackId.ENTITLEMENTS, callback);
    }
    /**
     * @param {!Promise<!../api/entitlements.Entitlements>} promise
     */

  }, {
    key: "triggerEntitlementsResponse",
    value: function triggerEntitlementsResponse(promise) {
      return this.trigger_(CallbackId.ENTITLEMENTS, promise.then(function (res) {
        return res.clone();
      }));
    }
    /**
     * @return {boolean}
     */

  }, {
    key: "hasEntitlementsResponsePending",
    value: function hasEntitlementsResponsePending() {
      return !!this.resultBuffer_[CallbackId.ENTITLEMENTS];
    }
    /**
     * @param {function(!../api/subscriptions.LoginRequest)} callback
     */

  }, {
    key: "setOnLoginRequest",
    value: function setOnLoginRequest(callback) {
      this.setCallback_(CallbackId.LOGIN_REQUEST, callback);
    }
    /**
     * @param {!../api/subscriptions.LoginRequest} request
     * @return {boolean} Whether the callback has been found.
     */

  }, {
    key: "triggerLoginRequest",
    value: function triggerLoginRequest(request) {
      return this.trigger_(CallbackId.LOGIN_REQUEST, request);
    }
    /**
     * @param {function()} callback
     */

  }, {
    key: "setOnLinkProgress",
    value: function setOnLinkProgress(callback) {
      this.setCallback_(CallbackId.LINK_PROGRESS, callback);
    }
    /**
     * @return {boolean} Whether the callback has been found.
     */

  }, {
    key: "triggerLinkProgress",
    value: function triggerLinkProgress() {
      return this.trigger_(CallbackId.LINK_PROGRESS, true);
    }
    /**
     */

  }, {
    key: "resetLinkProgress",
    value: function resetLinkProgress() {
      this.resetCallback_(CallbackId.LINK_PROGRESS);
    }
    /**
     * @param {function()} callback
     */

  }, {
    key: "setOnLinkComplete",
    value: function setOnLinkComplete(callback) {
      this.setCallback_(CallbackId.LINK_COMPLETE, callback);
    }
    /**
     * @return {boolean} Whether the callback has been found.
     */

  }, {
    key: "triggerLinkComplete",
    value: function triggerLinkComplete() {
      return this.trigger_(CallbackId.LINK_COMPLETE, true);
    }
    /**
     * @return {boolean}
     */

  }, {
    key: "hasLinkCompletePending",
    value: function hasLinkCompletePending() {
      return !!this.resultBuffer_[CallbackId.LINK_COMPLETE];
    }
    /**
     * @param {function()} callback
     */

  }, {
    key: "setOnSubscribeRequest",
    value: function setOnSubscribeRequest(callback) {
      this.setCallback_(CallbackId.SUBSCRIBE_REQUEST, callback);
    }
    /**
     * @return {boolean} Whether the callback has been found.
     */

  }, {
    key: "triggerSubscribeRequest",
    value: function triggerSubscribeRequest() {
      return this.trigger_(CallbackId.SUBSCRIBE_REQUEST, true);
    }
    /**
     * @return {boolean}
     */

  }, {
    key: "hasSubscribeRequestCallback",
    value: function hasSubscribeRequestCallback() {
      return !!this.callbacks_[CallbackId.SUBSCRIBE_REQUEST];
    }
    /**
     * @param {function(!Promise<!../api/subscribe-response.SubscribeResponse>)} callback
     */

  }, {
    key: "setOnSubscribeResponse",
    value: function setOnSubscribeResponse(callback) {
      (0, _log.warn)("[swg.js:setOnSubscribeResponse]: This method has been deprecated, please switch usages to 'setOnPaymentResponse'");
      this.setCallback_(CallbackId.PAYMENT_RESPONSE, callback);
    }
    /**
     * @param {function(!Promise<!../api/subscribe-response.SubscribeResponse>)} callback
     */

  }, {
    key: "setOnContributionResponse",
    value: function setOnContributionResponse(callback) {
      (0, _log.warn)("[swg.js:setOnContributionResponse]: This method has been deprecated, please switch usages to 'setOnPaymentResponse'");
      this.setCallback_(CallbackId.PAYMENT_RESPONSE, callback);
    }
    /**
     * @param {function(!Promise<!../api/subscribe-response.SubscribeResponse>)} callback
     */

  }, {
    key: "setOnPaymentResponse",
    value: function setOnPaymentResponse(callback) {
      this.setCallback_(CallbackId.PAYMENT_RESPONSE, callback);
    }
    /**
     * @param {!Promise<!../api/subscribe-response.SubscribeResponse>} responsePromise
     * @return {boolean} Whether the callback has been found.
     */

  }, {
    key: "triggerPaymentResponse",
    value: function triggerPaymentResponse(responsePromise) {
      var _this = this;

      this.paymentResponsePromise_ = responsePromise.then(function (res) {
        _this.trigger_(CallbackId.PAYMENT_RESPONSE, Promise.resolve(res.clone()));
      }, function (reason) {
        if ((0, _errors.isCancelError)(reason)) {
          return;
        }

        throw reason;
      });
      return !!this.callbacks_[CallbackId.PAYMENT_RESPONSE];
    }
    /**
     * @return {boolean}
     */

  }, {
    key: "hasPaymentResponsePending",
    value: function hasPaymentResponsePending() {
      return !!this.resultBuffer_[CallbackId.PAYMENT_RESPONSE];
    }
    /**
     * @param {function({flow: string, data: !Object})} callback
     */

  }, {
    key: "setOnFlowStarted",
    value: function setOnFlowStarted(callback) {
      this.setCallback_(CallbackId.FLOW_STARTED, callback);
    }
    /**
     * @param {string} flow
     * @param {!Object=} data
     * @return {boolean} Whether the callback has been found.
     */

  }, {
    key: "triggerFlowStarted",
    value: function triggerFlowStarted(flow) {
      var data = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      return this.trigger_(CallbackId.FLOW_STARTED, {
        flow: flow,
        data: data
      });
    }
    /**
     * @param {function({flow: string, data: !Object})} callback
     */

  }, {
    key: "setOnFlowCanceled",
    value: function setOnFlowCanceled(callback) {
      this.setCallback_(CallbackId.FLOW_CANCELED, callback);
    }
    /**
     * @param {string} flow
     * @param {!Object=} data
     * @return {boolean} Whether the callback has been found.
     */

  }, {
    key: "triggerFlowCanceled",
    value: function triggerFlowCanceled(flow) {
      var data = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      return this.trigger_(CallbackId.FLOW_CANCELED, {
        flow: flow,
        data: data
      });
    }
    /**
     * @param {!CallbackId} id
     * @param {function(?)} callback
     * @private
     */

  }, {
    key: "setCallback_",
    value: function setCallback_(id, callback) {
      if (this.callbacks_[id]) {
        (0, _log.warn)("[swg.js]: You have registered multiple callbacks for the same response.");
      }

      this.callbacks_[id] = callback; // If result already exist, execute the callback right away.

      if (id in this.resultBuffer_) {
        this.executeCallback_(id, callback, this.resultBuffer_[id]);
      }
    }
    /**
     * @param {!CallbackId} id
     * @param {*} data
     * @return {boolean}
     * @private
     */

  }, {
    key: "trigger_",
    value: function trigger_(id, data) {
      this.resultBuffer_[id] = data;
      var callback = this.callbacks_[id];

      if (callback) {
        this.executeCallback_(id, callback, data);
      }

      return !!callback;
    }
    /**
     * @param {!CallbackId} id
     * @private
     */

  }, {
    key: "resetCallback_",
    value: function resetCallback_(id) {
      if (id in this.resultBuffer_) {
        delete this.resultBuffer_[id];
      }
    }
    /**
     * @param {!CallbackId} id
     * @param {function(*)} callback
     * @param {*} data
     * @private
     */

  }, {
    key: "executeCallback_",
    value: function executeCallback_(id, callback, data) {
      var _this2 = this;

      // Always execute callbacks in a microtask.
      Promise.resolve().then(function () {
        callback(data);

        _this2.resetCallback_(id);
      });
    }
  }]);

  return Callbacks;
}();

exports.Callbacks = Callbacks;

},{"../utils/errors":74,"../utils/log":78}],37:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ClientEventManager = void 0;

var _api_messages = require("../proto/api_messages");

var _clientEventManagerApi = require("../api/client-event-manager-api");

var _types = require("../utils/types");

var _log = require("../utils/log");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

/**
 * Helper function to describe an issue with an event object
 * @param {!string} valueName
 * @param {?*} value
 * @returns {!string}
 */
function createEventErrorMessage(valueName, value) {
  return 'Event has an invalid ' + valueName + '(' + value + ')';
}
/**
 * Throws an error if the event is invalid.
 * @param {!../api/client-event-manager-api.ClientEvent} event
 */


function validateEvent(event) {
  if (!(0, _types.isObject)(event)) {
    throw new Error('Event must be a valid object');
  }

  if (!(0, _types.isEnumValue)(_api_messages.AnalyticsEvent, event.eventType)) {
    throw new Error(createEventErrorMessage('eventType', event.eventType));
  }

  if (!(0, _types.isEnumValue)(_api_messages.EventOriginator, event.eventOriginator)) {
    throw new Error(createEventErrorMessage('eventOriginator', event.eventOriginator));
  }

  if (!(0, _types.isObject)(event.additionalParameters) && event.additionalParameters != null) {
    throw new Error(createEventErrorMessage('additionalParameters', event.additionalParameters));
  }

  if (event.isFromUserAction != null && !(0, _types.isBoolean)(event.isFromUserAction)) {
    throw new Error(createEventErrorMessage('isFromUserAction', event.isFromUserAction));
  }
}
/** @implements {../api/client-event-manager-api.ClientEventManagerApi} */


var ClientEventManager = /*#__PURE__*/function () {
  _createClass(ClientEventManager, null, [{
    key: "isPublisherEvent",

    /**
     * @param {!../api/client-event-manager-api.ClientEvent} event
     * @return {boolean}
     */
    value: function isPublisherEvent(event) {
      return event.eventOriginator === _api_messages.EventOriginator.PROPENSITY_CLIENT || event.eventOriginator === _api_messages.EventOriginator.PUBLISHER_CLIENT || event.eventOriginator === _api_messages.EventOriginator.AMP_CLIENT;
    }
    /**
     *
     * @param {!Promise} configuredPromise
     */

  }]);

  function ClientEventManager(configuredPromise) {
    _classCallCheck(this, ClientEventManager);

    /** @private {!Array<function(!../api/client-event-manager-api.ClientEvent)>} */
    this.listeners_ = [];
    /** @private {!Array<function(!../api/client-event-manager-api.ClientEvent):!FilterResult>} */

    this.filterers_ = [];
    /** @private {?Promise} */

    this.lastAction_ = null;
    /** @private @const {!Promise} */

    this.isReadyPromise_ = configuredPromise;
  }
  /**
   * @overrides
   */


  _createClass(ClientEventManager, [{
    key: "registerEventListener",
    value: function registerEventListener(listener) {
      if (!(0, _types.isFunction)(listener)) {
        throw new Error('Event manager listeners must be a function');
      }

      this.listeners_.push(listener);
    }
    /**
     * @overrides
     */

  }, {
    key: "registerEventFilterer",
    value: function registerEventFilterer(filterer) {
      if (!(0, _types.isFunction)(filterer)) {
        throw new Error('Event manager filterers must be a function');
      }

      this.filterers_.push(filterer);
    }
    /**
     * @overrides
     */

  }, {
    key: "logEvent",
    value: function logEvent(event) {
      var _this = this;

      validateEvent(event);
      this.lastAction_ = this.isReadyPromise_.then(function () {
        for (var filterer = 0; filterer < _this.filterers_.length; filterer++) {
          try {
            if (_this.filterers_[filterer](event) === _clientEventManagerApi.FilterResult.CANCEL_EVENT) {
              return Promise.resolve();
            }
          } catch (e) {
            (0, _log.log)(e);
          }
        }

        for (var listener = 0; listener < _this.listeners_.length; listener++) {
          try {
            _this.listeners_[listener](event);
          } catch (e) {
            (0, _log.log)(e);
          }
        }

        return Promise.resolve();
      });
    }
    /**
     * Creates an event with the arguments provided and calls logEvent.
     * @param {!AnalyticsEvent} eventType
     * @param {?boolean=} isFromUserAction
     * @param {../proto/api_messages.EventParams=} eventParams
     */

  }, {
    key: "logSwgEvent",
    value: function logSwgEvent(eventType) {
      var isFromUserAction = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
      var eventParams = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;
      this.logEvent({
        eventType: eventType,
        eventOriginator: _api_messages.EventOriginator.SWG_CLIENT,
        isFromUserAction: isFromUserAction,
        additionalParameters: eventParams
      });
    }
    /** @return {!Promise<null>} */

  }, {
    key: "getReadyPromise",
    value: function getReadyPromise() {
      return this.isReadyPromise_;
    }
  }]);

  return ClientEventManager;
}();

exports.ClientEventManager = ClientEventManager;

},{"../api/client-event-manager-api":5,"../proto/api_messages":33,"../utils/log":78,"../utils/types":84}],38:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ContributionsFlow = void 0;

var _activityIframeView = require("../ui/activity-iframe-view");

var _api_messages = require("../proto/api_messages");

var _payFlow = require("./pay-flow");

var _subscriptions = require("../api/subscriptions");

var _services = require("./services");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

/**
 * The class for Contributions flow.
 */
var ContributionsFlow = /*#__PURE__*/function () {
  /**
   * @param {!./deps.DepsDef} deps
   * @param {!../api/subscriptions.OffersRequest|undefined} options
   */
  function ContributionsFlow(deps, options) {
    _classCallCheck(this, ContributionsFlow);

    /** @private @const {!./deps.DepsDef} */
    this.deps_ = deps;
    /** @private @const {!../api/subscriptions.OffersRequest|undefined} */

    this.options_ = options;
    /** @private @const {!Window} */

    this.win_ = deps.win();
    /** @private @const {!../components/activities.ActivityPorts} */

    this.activityPorts_ = deps.activities();
    /** @private @const {!../components/dialog-manager.DialogManager} */

    this.dialogManager_ = deps.dialogManager();
    var isClosable = options && options.isClosable || true;
    /** @private @const {!ActivityIframeView} */

    this.activityIframeView_ = new _activityIframeView.ActivityIframeView(this.win_, this.activityPorts_, (0, _services.feUrl)('/contributionsiframe'), (0, _services.feArgs)({
      'productId': deps.pageConfig().getProductId(),
      'publicationId': deps.pageConfig().getPublicationId(),
      'productType': _subscriptions.ProductType.UI_CONTRIBUTION,
      'list': options && options.list || 'default',
      'skus': options && options.skus || null,
      'isClosable': isClosable
    }),
    /* shouldFadeBody */
    true);
  }
  /**
   * @param {AlreadySubscribedResponse} response
   */


  _createClass(ContributionsFlow, [{
    key: "handleLinkRequest_",
    value: function handleLinkRequest_(response) {
      if (response.getSubscriberOrMember()) {
        this.deps_.callbacks().triggerLoginRequest({
          linkRequested: !!response.getLinkRequested()
        });
      }
    }
    /**
     * @param {SkuSelectedResponse} response
     */

  }, {
    key: "startPayFlow_",
    value: function startPayFlow_(response) {
      var sku = response.getSku();
      var isOneTime = response.getOneTime();

      if (sku) {
        var
        /** @type {../api/subscriptions.SubscriptionRequest} */
        contributionRequest = {
          'skuId': sku
        };

        if (isOneTime) {
          contributionRequest['oneTime'] = isOneTime;
        }

        new _payFlow.PayStartFlow(this.deps_, contributionRequest, _subscriptions.ProductType.UI_CONTRIBUTION).start();
      }
    }
    /**
     * Starts the contributions flow or alreadyMember flow.
     * @return {!Promise}
     */

  }, {
    key: "start",
    value: function start() {
      var _this = this;

      // Start/cancel events.
      this.deps_.callbacks().triggerFlowStarted(_subscriptions.SubscriptionFlows.SHOW_CONTRIBUTION_OPTIONS);
      this.activityIframeView_.onCancel(function () {
        _this.deps_.callbacks().triggerFlowCanceled(_subscriptions.SubscriptionFlows.SHOW_CONTRIBUTION_OPTIONS);
      });
      this.activityIframeView_.on(_api_messages.AlreadySubscribedResponse, this.handleLinkRequest_.bind(this));
      this.activityIframeView_.on(_api_messages.SkuSelectedResponse, this.startPayFlow_.bind(this));
      return this.dialogManager_.openView(this.activityIframeView_);
    }
  }]);

  return ContributionsFlow;
}();

exports.ContributionsFlow = ContributionsFlow;

},{"../api/subscriptions":13,"../proto/api_messages":33,"../ui/activity-iframe-view":64,"./pay-flow":56,"./services":60}],39:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DeferredAccountFlow = void 0;

var _activityIframeView = require("../ui/activity-iframe-view");

var _api_messages = require("../proto/api_messages");

var _deferredAccountCreation = require("../api/deferred-account-creation");

var _jwt = require("../utils/jwt");

var _payFlow = require("./pay-flow");

var _subscribeResponse = require("../api/subscribe-response");

var _subscriptions = require("../api/subscriptions");

var _userData = require("../api/user-data");

var _services = require("./services");

var _errors = require("../utils/errors");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

/**
 * The flow to initiate deferred account process.
 * See `Subscriptions.completeDeferredAccountCreation` API.
 */
var DeferredAccountFlow = /*#__PURE__*/function () {
  /**
   * @param {!./deps.DepsDef} deps
   * @param {?../api/deferred-account-creation.DeferredAccountCreationRequest} options
   */
  function DeferredAccountFlow(deps, options) {
    _classCallCheck(this, DeferredAccountFlow);

    /** @private @const {!./deps.DepsDef} */
    this.deps_ = deps;
    /** @private @const {!Window} */

    this.win_ = deps.win();
    /** @private @const {!../components/activities.ActivityPorts} */

    this.activityPorts_ = deps.activities();
    /** @private @const {!../components/dialog-manager.DialogManager} */

    this.dialogManager_ = deps.dialogManager();
    /** @private {?ActivityIframeView} */

    this.activityIframeView_ = null;
    /** @private {?Promise} */

    this.openPromise_ = null;
    /** @type {!../api/deferred-account-creation.DeferredAccountCreationRequest} */

    var defaultOptions = {
      entitlements: null,
      consent: true
    };
    /** @private @const {!../api/deferred-account-creation.DeferredAccountCreationRequest} */

    this.options_ = Object.assign(defaultOptions, options || {});
  }
  /**
   * Starts the deferred account flow.
   * @return {!Promise<!DeferredAccountCreationResponse>}
   */


  _createClass(DeferredAccountFlow, [{
    key: "start",
    value: function start() {
      var _this = this;

      var entitlements = this.options_.entitlements; // For now, entitlements are required to be present and have the Google
      // token. This is strictly not required for the implementation. But it's
      // preferrable API-wise at this time.

      if (!entitlements || !entitlements.getEntitlementForSource('google')) {
        throw new Error('No entitlements with "google" source');
      } // Start/cancel events.


      this.deps_.callbacks().triggerFlowStarted(_subscriptions.SubscriptionFlows.COMPLETE_DEFERRED_ACCOUNT_CREATION);
      this.activityIframeView_ = new _activityIframeView.ActivityIframeView(this.win_, this.activityPorts_, (0, _services.feUrl)('/recoveriframe'), (0, _services.feArgs)({
        'publicationId': this.deps_.pageConfig().getPublicationId(),
        'productId': this.deps_.pageConfig().getProductId(),
        'entitlements': entitlements && entitlements.raw || null,
        'consent': this.options_.consent
      }),
      /* shouldFadeBody */
      true);
      this.openPromise_ = this.dialogManager_.openView(this.activityIframeView_);
      return this.activityIframeView_.acceptResult().then(function (result) {
        // The consent part is complete.
        return _this.handleConsentResponse_(
        /** @type {!Object} */
        result.data);
      }, function (reason) {
        if ((0, _errors.isCancelError)(reason)) {
          _this.deps_.callbacks().triggerFlowCanceled(_subscriptions.SubscriptionFlows.COMPLETE_DEFERRED_ACCOUNT_CREATION);
        } else {
          _this.dialogManager_.completeView(_this.activityIframeView_);
        }

        throw reason;
      });
    }
    /**
     * @param {!Object} data
     * @return {!DeferredAccountCreationResponse}
     * @private
     */

  }, {
    key: "handleConsentResponse_",
    value: function handleConsentResponse_(data) {
      this.deps_.entitlementsManager().blockNextNotification(); // Parse the response.

      var entitlementsJwt = data['entitlements'];
      var idToken = data['idToken'];
      var productType = data['productType'];
      var entitlements = this.deps_.entitlementsManager().parseEntitlements({
        'signedEntitlements': entitlementsJwt
      });
      var userData = new _userData.UserData(idToken,
      /** @type {!Object} */
      new _jwt.JwtHelper().decode(idToken));
      var purchaseDataList = data['purchaseDataList'] ? data['purchaseDataList'].map(function (pd) {
        return new _subscribeResponse.PurchaseData(pd['data'], pd['signature']);
      }) : [// TODO(dvoytenko): cleanup/deprecate.
      new _subscribeResponse.PurchaseData(data['purchaseData']['data'], data['purchaseData']['signature'])]; // For now, we'll use the `PayCompleteFlow` as a "creating account" flow.
      // But this can be eventually implemented by the same iframe.

      var creatingFlow = new _payFlow.PayCompleteFlow(this.deps_);
      var completeHandler = creatingFlow.complete.bind(creatingFlow);
      var response = new _deferredAccountCreation.DeferredAccountCreationResponse(entitlements, userData, purchaseDataList, completeHandler);
      this.deps_.eventManager().logSwgEvent(_api_messages.AnalyticsEvent.ACTION_NEW_DEFERRED_ACCOUNT, true); // Start the "sync" flow.

      creatingFlow.start(new _subscribeResponse.SubscribeResponse('', // raw field doesn't matter in this case
      purchaseDataList[0], userData, entitlements, productType, function () {
        return Promise.resolve();
      } // completeHandler doesn't matter in this case
      ));
      return response;
    }
  }]);

  return DeferredAccountFlow;
}();

exports.DeferredAccountFlow = DeferredAccountFlow;

},{"../api/deferred-account-creation":6,"../api/subscribe-response":12,"../api/subscriptions":13,"../api/user-data":14,"../proto/api_messages":33,"../ui/activity-iframe-view":64,"../utils/errors":74,"../utils/jwt":77,"./pay-flow":56,"./services":60}],40:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DepsDef = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

/**
 * Copyright 2018 The Subscribe with Google Authors. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS-IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/** @interface */
var DepsDef = /*#__PURE__*/function () {
  function DepsDef() {
    _classCallCheck(this, DepsDef);
  }

  _createClass(DepsDef, [{
    key: "doc",

    /**
     * @return {!../model/doc.Doc}
     */
    value: function doc() {}
    /**
     * @return {!Window}
     */

  }, {
    key: "win",
    value: function win() {}
    /**
     * @return {!../api/subscriptions.Config}
     */

  }, {
    key: "config",
    value: function config() {}
    /**
     * @return {!../model/page-config.PageConfig}
     */

  }, {
    key: "pageConfig",
    value: function pageConfig() {}
    /**
     * @return {!../components/activities.ActivityPorts}
     */

  }, {
    key: "activities",
    value: function activities() {}
    /**
     * @return {!./pay-client.PayClient}
     */

  }, {
    key: "payClient",
    value: function payClient() {}
    /**
     * @return {!../components/dialog-manager.DialogManager}
     */

  }, {
    key: "dialogManager",
    value: function dialogManager() {}
    /**
     * @return {!./entitlements-manager.EntitlementsManager}
     */

  }, {
    key: "entitlementsManager",
    value: function entitlementsManager() {}
    /**
     * @return {!./callbacks.Callbacks}
     */

  }, {
    key: "callbacks",
    value: function callbacks() {}
    /**
     * @return {!../runtime/storage.Storage}
     */

  }, {
    key: "storage",
    value: function storage() {}
    /**
     * @return {!../runtime/analytics-service.AnalyticsService}
     */

  }, {
    key: "analytics",
    value: function analytics() {}
    /**
     * @return {!../runtime/jserror.JsError}
     */

  }, {
    key: "jserror",
    value: function jserror() {}
    /**
     * @return {!../runtime/client-event-manager.ClientEventManager}
     */

  }, {
    key: "eventManager",
    value: function eventManager() {}
  }]);

  return DepsDef;
}();

exports.DepsDef = DepsDef;

},{}],41:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.EntitlementsManager = void 0;

var _api_messages = require("../proto/api_messages");

var _entitlements = require("../api/entitlements");

var _subscriptions = require("../api/subscriptions");

var _jwt = require("../utils/jwt");

var _metering = require("../api/metering");

var _meterToastApi = require("./meter-toast-api");

var _toast = require("../ui/toast");

var _services = require("../runtime/services");

var _url = require("../utils/url");

var _string = require("../utils/string");

var _services2 = require("./services");

var _dateUtils = require("../utils/date-utils");

var _log = require("../utils/log");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var SERVICE_ID = 'subscribe.google.com';
var TOAST_STORAGE_KEY = 'toast';
var ENTS_STORAGE_KEY = 'ents';
var IS_READY_TO_PAY_STORAGE_KEY = 'isreadytopay';
/**
 */

var EntitlementsManager = /*#__PURE__*/function () {
  /**
   * @param {!Window} win
   * @param {!../model/page-config.PageConfig} pageConfig
   * @param {!./fetcher.Fetcher} fetcher
   * @param {!./deps.DepsDef} deps
   */
  function EntitlementsManager(win, pageConfig, fetcher, deps) {
    _classCallCheck(this, EntitlementsManager);

    /** @private @const {!Window} */
    this.win_ = win;
    /** @private @const {!../model/page-config.PageConfig} */

    this.pageConfig_ = pageConfig;
    /** @private @const {string} */

    this.publicationId_ = this.pageConfig_.getPublicationId();
    /** @private @const {!./fetcher.Fetcher} */

    this.fetcher_ = fetcher;
    /** @private @const {!./deps.DepsDef} */

    this.deps_ = deps;
    /** @private @const {!JwtHelper} */

    this.jwtHelper_ = new _jwt.JwtHelper();
    /** @private {?Promise<!Entitlements>} */

    this.responsePromise_ = null;
    /** @private {number} */

    this.positiveRetries_ = 0;
    /** @private {boolean} */

    this.blockNextNotification_ = false;
    /** @private @const {!./storage.Storage} */

    this.storage_ = deps.storage();
    /** @private @const {!../runtime/analytics-service.AnalyticsService} */

    this.analyticsService_ = deps.analytics();
    /** @private @const {!../api/subscriptions.Config} */

    this.config_ = deps.config();
  }
  /**
   * @param {boolean=} expectPositive
   */


  _createClass(EntitlementsManager, [{
    key: "reset",
    value: function reset(expectPositive) {
      this.responsePromise_ = null;
      this.positiveRetries_ = Math.max(this.positiveRetries_, expectPositive ? 3 : 0);

      if (expectPositive) {
        this.storage_.remove(ENTS_STORAGE_KEY);
        this.storage_.remove(IS_READY_TO_PAY_STORAGE_KEY);
      }
    }
    /**
     * Clears all of the entitlements state and cache.
     */

  }, {
    key: "clear",
    value: function clear() {
      this.responsePromise_ = null;
      this.positiveRetries_ = 0;
      this.unblockNextNotification();
      this.storage_.remove(ENTS_STORAGE_KEY);
      this.storage_.remove(TOAST_STORAGE_KEY);
      this.storage_.remove(IS_READY_TO_PAY_STORAGE_KEY);
    }
    /**
     * @param {!GetEntitlementsParamsExternalDef=} params
     * @return {!Promise<!Entitlements>}
     */

  }, {
    key: "getEntitlements",
    value: function getEntitlements(params) {
      var _this = this;

      // Remain backwards compatible by accepting
      // `encryptedDocumentKey` string as a first param.
      if (typeof params === 'string') {
        // TODO: Delete the fallback if nobody needs it. Use a log to verify.
        if (Date.now() > 1600289016959) {
          // TODO: Remove the conditional check for this warning
          // after the AMP extension is updated to pass an object.
          (0, _log.warn)("[swg.js:getEntitlements]: If present, the first param of getEntitlements() should be an object of type GetEntitlementsParamsExternalDef.");
        }

        params = {
          encryption: {
            encryptedDocumentKey:
            /**@type {string} */
            params
          }
        };
      }

      if (!this.responsePromise_) {
        this.responsePromise_ = this.getEntitlementsFlow_(params);
      }

      return this.responsePromise_.then(function (response) {
        if (response.isReadyToPay != null) {
          _this.analyticsService_.setReadyToPay(response.isReadyToPay);
        }

        return response;
      });
    }
    /**
     * @param {string} raw
     * @param {boolean=} isReadyToPay
     * @return {boolean}
     */

  }, {
    key: "pushNextEntitlements",
    value: function pushNextEntitlements(raw, isReadyToPay) {
      var entitlements = this.getValidJwtEntitlements_(raw,
      /* requireNonExpired */
      true, isReadyToPay);

      if (entitlements && entitlements.enablesThis()) {
        this.storage_.set(ENTS_STORAGE_KEY, raw);
        return true;
      }

      return false;
    }
    /**
     * Sends a pingback that marks a metering entitlement as used.
     * @param {!Entitlements} entitlements
     */

  }, {
    key: "sendPingback_",
    value: function sendPingback_(entitlements) {
      var entitlement = entitlements.getEntitlementForThis();

      if (!entitlement || entitlement.source !== _entitlements.GOOGLE_METERING_SOURCE) {
        return;
      }

      this.deps_.eventManager().logSwgEvent(_api_messages.AnalyticsEvent.EVENT_UNLOCKED_BY_METER, false);
      var jwt = new _api_messages.EntitlementJwt();
      jwt.setSource(entitlement.source);
      jwt.setJwt(entitlement.subscriptionToken);
      var message = new _api_messages.EntitlementsRequest();
      message.setUsedEntitlement(jwt);
      message.setClientEventTime((0, _dateUtils.toTimestamp)(Date.now()));
      var url = '/publication/' + encodeURIComponent(this.publicationId_) + '/entitlements';
      this.fetcher_.sendPost((0, _services2.serviceUrl)(url), message);
    }
    /**
     * @param {!GetEntitlementsParamsExternalDef=} params
     * @return {!Promise<!Entitlements>}
     * @private
     */

  }, {
    key: "getEntitlementsFlow_",
    value: function getEntitlementsFlow_(params) {
      var _this2 = this;

      return this.fetchEntitlementsWithCaching_(params).then(function (entitlements) {
        _this2.onEntitlementsFetched_(entitlements);

        return entitlements;
      });
    }
    /**
     * @param {!GetEntitlementsParamsExternalDef=} params
     * @return {!Promise<!Entitlements>}
     * @private
     */

  }, {
    key: "fetchEntitlementsWithCaching_",
    value: function fetchEntitlementsWithCaching_(params) {
      var _this3 = this;

      return Promise.all([this.storage_.get(ENTS_STORAGE_KEY), this.storage_.get(IS_READY_TO_PAY_STORAGE_KEY)]).then(function (cachedValues) {
        var raw = cachedValues[0];
        var irtp = cachedValues[1]; // Try cache first.

        var needsDecryption = !!(params && params.encryption);

        if (raw && !needsDecryption) {
          var cached = _this3.getValidJwtEntitlements_(raw,
          /* requireNonExpired */
          true, irtpStringToBoolean(irtp));

          if (cached && cached.enablesThis()) {
            // Already have a positive response.
            _this3.positiveRetries_ = 0;
            return cached;
          }
        } // If cache didn't match, perform fetch.


        return _this3.fetchEntitlements_(params).then(function (ents) {
          // If the product is enabled by cacheable entitlements, store them in cache.
          if (ents && ents.enablesThisWithCacheableEntitlements() && ents.raw) {
            _this3.storage_.set(ENTS_STORAGE_KEY, ents.raw);
          }

          return ents;
        });
      });
    }
    /**
     * @param {!GetEntitlementsParamsExternalDef=} params
     * @return {!Promise<!Entitlements>}
     * @private
     */

  }, {
    key: "fetchEntitlements_",
    value: function fetchEntitlements_(params) {
      var _this4 = this;

      // TODO(dvoytenko): Replace retries with consistent fetch.
      var positiveRetries = this.positiveRetries_;
      this.positiveRetries_ = 0;

      var attempt = function attempt() {
        positiveRetries--;
        return _this4.fetch_(params).then(function (entitlements) {
          if (entitlements.enablesThis() || positiveRetries <= 0) {
            return entitlements;
          }

          return new Promise(function (resolve) {
            _this4.win_.setTimeout(function () {
              resolve(attempt());
            }, 550);
          });
        });
      };

      return attempt();
    }
    /**
     * @param {boolean} value
     */

  }, {
    key: "setToastShown",
    value: function setToastShown(value) {
      this.storage_.set(TOAST_STORAGE_KEY, value ? '1' : '0');
    }
    /**
     */

  }, {
    key: "blockNextNotification",
    value: function blockNextNotification() {
      this.blockNextNotification_ = true;
    }
    /**
     */

  }, {
    key: "unblockNextNotification",
    value: function unblockNextNotification() {
      this.blockNextNotification_ = false;
    }
    /**
     * The JSON must either contain a "signedEntitlements" with JWT, or
     * "entitlements" field with plain JSON object.
     * @param {!Object} json
     * @return {!Entitlements}
     */

  }, {
    key: "parseEntitlements",
    value: function parseEntitlements(json) {
      var isReadyToPay = json['isReadyToPay'];

      if (isReadyToPay == null) {
        this.storage_.remove(IS_READY_TO_PAY_STORAGE_KEY);
      } else {
        this.storage_.set(IS_READY_TO_PAY_STORAGE_KEY, String(isReadyToPay));
      }

      var signedData = json['signedEntitlements'];
      var decryptedDocumentKey = json['decryptedDocumentKey'];

      if (signedData) {
        var entitlements = this.getValidJwtEntitlements_(signedData,
        /* requireNonExpired */
        false, isReadyToPay, decryptedDocumentKey);

        if (entitlements) {
          return entitlements;
        }
      } else {
        var plainEntitlements = json['entitlements'];

        if (plainEntitlements) {
          return this.createEntitlements_('', plainEntitlements, isReadyToPay, decryptedDocumentKey);
        }
      } // Empty response.


      return this.createEntitlements_('', [], isReadyToPay);
    }
    /**
     * @param {string} raw
     * @param {boolean} requireNonExpired
     * @param {boolean=} isReadyToPay
     * @param {?string=} decryptedDocumentKey
     * @return {?Entitlements}
     * @private
     */

  }, {
    key: "getValidJwtEntitlements_",
    value: function getValidJwtEntitlements_(raw, requireNonExpired, isReadyToPay, decryptedDocumentKey) {
      try {
        var jwt = this.jwtHelper_.decode(raw);

        if (requireNonExpired) {
          var now = Date.now();
          var exp = jwt['exp'];

          if (parseFloat(exp) * 1000 < now) {
            return null;
          }
        }

        var entitlementsClaim = jwt['entitlements'];
        return entitlementsClaim && this.createEntitlements_(raw, entitlementsClaim, isReadyToPay, decryptedDocumentKey) || null;
      } catch (e) {
        // Ignore the error.
        this.win_.setTimeout(function () {
          throw e;
        });
      }

      return null;
    }
    /**
     * @param {string} raw
     * @param {!Object|!Array<!Object>} json
     * @param {boolean=} isReadyToPay
     * @param {?string=} decryptedDocumentKey
     * @return {!Entitlements}
     * @private
     */

  }, {
    key: "createEntitlements_",
    value: function createEntitlements_(raw, json, isReadyToPay, decryptedDocumentKey) {
      return new _entitlements.Entitlements(SERVICE_ID, raw, _entitlements.Entitlement.parseListFromJson(json), this.pageConfig_.getProductId(), this.ack_.bind(this), this.consume_.bind(this), isReadyToPay, decryptedDocumentKey);
    }
    /**
     * @param {!Entitlements} entitlements
     * @private
     */

  }, {
    key: "onEntitlementsFetched_",
    value: function onEntitlementsFetched_(entitlements) {
      // Skip any notifications and toast if other flows are ongoing.
      // TODO(dvoytenko): what's the right action when pay flow was canceled?
      var blockNotification = this.blockNextNotification_;
      this.blockNextNotification_ = false;

      if (blockNotification) {
        return;
      } // Notify on the received entitlements.


      this.deps_.callbacks().triggerEntitlementsResponse(Promise.resolve(entitlements));
      var entitlement = entitlements.getEntitlementForThis();

      if (!entitlement) {
        this.deps_.eventManager().logSwgEvent(_api_messages.AnalyticsEvent.EVENT_NO_ENTITLEMENTS, false);
        return;
      }

      this.maybeShowToast_(entitlement);
    }
    /**
     * @param {!Entitlement} entitlement
     * @return {!Promise}
     * @private
     */

  }, {
    key: "maybeShowToast_",
    value: function maybeShowToast_(entitlement) {
      var _this5 = this;

      // Don't show toast for metering entitlements.
      if (entitlement.source === _entitlements.GOOGLE_METERING_SOURCE) {
        this.deps_.eventManager().logSwgEvent(_api_messages.AnalyticsEvent.EVENT_HAS_METERING_ENTITLEMENTS, false);
        return Promise.resolve();
      }

      this.deps_.eventManager().logSwgEvent(_api_messages.AnalyticsEvent.EVENT_UNLOCKED_BY_SUBSCRIPTION, false); // Check if storage bit is set. It's only set by the `Entitlements.ack` method.

      return this.storage_.get(TOAST_STORAGE_KEY).then(function (value) {
        var toastWasShown = value === '1';

        if (toastWasShown) {
          return;
        } // Show toast.


        var source = entitlement.source || 'google';
        return new _toast.Toast(_this5.deps_, (0, _services.feUrl)('/toastiframe'), (0, _services.feArgs)({
          'publicationId': _this5.publicationId_,
          'source': source
        })).open();
      });
    }
    /**
     * @param {!Entitlements} entitlements
     * @private
     */

  }, {
    key: "ack_",
    value: function ack_(entitlements) {
      if (entitlements.getEntitlementForThis()) {
        this.setToastShown(true);
      }
    }
    /**
     * @param {!Entitlements} entitlements
     * @param {?Function=} onCloseDialog Called after the user closes the dialog.
     * @private
     */

  }, {
    key: "consume_",
    value: function consume_(entitlements, onCloseDialog) {
      var _this6 = this;

      if (entitlements.enablesThisWithGoogleMetering()) {
        var meterToastApi = new _meterToastApi.MeterToastApi(this.deps_);
        meterToastApi.setOnCancelCallback(function () {
          if (onCloseDialog) {
            onCloseDialog();
          }

          meterToastApi.removeCloseEventListener();

          _this6.sendPingback_(entitlements);
        });
        return meterToastApi.start();
      }
    }
    /**
     * @param {!GetEntitlementsParamsExternalDef=} params
     * @return {!Promise<!Entitlements>}
     * @private
     */

  }, {
    key: "fetch_",
    value: function fetch_(params) {
      var _this7 = this;

      return (0, _string.hash)((0, _url.getCanonicalUrl)(this.deps_.doc())).then(function (hashedCanonicalUrl) {
        var urlParams = []; // Add encryption param.

        if (params && params.encryption) {
          urlParams.push('crypt=' + encodeURIComponent(params.encryption.encryptedDocumentKey));
        } // Add metering params.


        if (_this7.publicationId_ && params && params.metering && params.metering.state) {
          /** @type {!GetEntitlementsParamsInternalDef} */
          var encodableParams = {
            metering: {
              clientTypes: [_metering.MeterClientTypes.LICENSED_BY_GOOGLE],
              owner: _this7.publicationId_,
              resource: {
                hashedCanonicalUrl: hashedCanonicalUrl
              },
              state: {
                id: params.metering.state.id,
                attributes: []
              }
            }
          }; // Add attributes.

          var standardAttributes = params.metering.state.standardAttributes;

          if (standardAttributes) {
            Object.keys(standardAttributes).forEach(function (key) {
              encodableParams.metering.state.attributes.push({
                name: 'standard_' + key,
                timestamp: standardAttributes[key].timestamp
              });
            });
          }

          var customAttributes = params.metering.state.customAttributes;

          if (customAttributes) {
            Object.keys(customAttributes).forEach(function (key) {
              encodableParams.metering.state.attributes.push({
                name: 'custom_' + key,
                timestamp: customAttributes[key].timestamp
              });
            });
          } // Encode params.


          var encodedParams = btoa(JSON.stringify(encodableParams));
          urlParams.push('encodedParams=' + encodedParams);
        } // Build URL.


        var url = '/publication/' + encodeURIComponent(_this7.publicationId_) + '/entitlements';

        if (urlParams.length > 0) {
          url += '?' + urlParams.join('&');
        }

        return (0, _services2.serviceUrl)(url);
      }).then(function (url) {
        _this7.deps_.eventManager().logSwgEvent(_api_messages.AnalyticsEvent.ACTION_GET_ENTITLEMENTS, false);

        return _this7.fetcher_.fetchCredentialedJson(url);
      }).then(function (json) {
        if (json.errorMessages && json.errorMessages.length > 0) {
          json.errorMessages.forEach(function (errorMessage) {
            (0, _log.warn)('SwG Entitlements: ' + errorMessage);
          });
        }

        return _this7.parseEntitlements(json);
      });
    }
  }]);

  return EntitlementsManager;
}();
/**
 * Convert String value of isReadyToPay
 * (from JSON or Cache) to a boolean value.
 * @param {string} value
 * @return {boolean|undefined}
 * @private
 */


exports.EntitlementsManager = EntitlementsManager;

function irtpStringToBoolean(value) {
  switch (value) {
    case 'true':
      return true;

    case 'false':
      return false;

    default:
      return undefined;
  }
}

},{"../api/entitlements":7,"../api/metering":9,"../api/subscriptions":13,"../proto/api_messages":33,"../runtime/services":60,"../ui/toast":66,"../utils/date-utils":70,"../utils/jwt":77,"../utils/log":78,"../utils/string":82,"../utils/url":85,"./meter-toast-api":52,"./services":60}],42:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.publisherEventToAnalyticsEvent = publisherEventToAnalyticsEvent;
exports.analyticsEventToPublisherEvent = analyticsEventToPublisherEvent;

var _api_messages = require("../proto/api_messages");

var _loggerApi = require("../api/logger-api");

var _PublisherEventToAnal, _AnalyticsEventToPubl;

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/** @const {!Object<string,AnalyticsEvent>} */
var PublisherEventToAnalyticsEvent = (_PublisherEventToAnal = {}, _defineProperty(_PublisherEventToAnal, _loggerApi.Event.IMPRESSION_PAYWALL, _api_messages.AnalyticsEvent.IMPRESSION_PAYWALL), _defineProperty(_PublisherEventToAnal, _loggerApi.Event.IMPRESSION_AD, _api_messages.AnalyticsEvent.IMPRESSION_AD), _defineProperty(_PublisherEventToAnal, _loggerApi.Event.IMPRESSION_OFFERS, _api_messages.AnalyticsEvent.IMPRESSION_OFFERS), _defineProperty(_PublisherEventToAnal, _loggerApi.Event.ACTION_SUBSCRIPTIONS_LANDING_PAGE, _api_messages.AnalyticsEvent.ACTION_SUBSCRIPTIONS_LANDING_PAGE), _defineProperty(_PublisherEventToAnal, _loggerApi.Event.ACTION_OFFER_SELECTED, _api_messages.AnalyticsEvent.ACTION_OFFER_SELECTED), _defineProperty(_PublisherEventToAnal, _loggerApi.Event.ACTION_PAYMENT_FLOW_STARTED, _api_messages.AnalyticsEvent.ACTION_PAYMENT_FLOW_STARTED), _defineProperty(_PublisherEventToAnal, _loggerApi.Event.ACTION_PAYMENT_COMPLETED, _api_messages.AnalyticsEvent.ACTION_PAYMENT_COMPLETE), _defineProperty(_PublisherEventToAnal, _loggerApi.Event.EVENT_CUSTOM, _api_messages.AnalyticsEvent.EVENT_CUSTOM), _PublisherEventToAnal);
/** @const {!Object<number,?Event>} */

var AnalyticsEventToPublisherEvent = (_AnalyticsEventToPubl = {}, _defineProperty(_AnalyticsEventToPubl, _api_messages.AnalyticsEvent.UNKNOWN, null), _defineProperty(_AnalyticsEventToPubl, _api_messages.AnalyticsEvent.IMPRESSION_PAYWALL, _loggerApi.Event.IMPRESSION_PAYWALL), _defineProperty(_AnalyticsEventToPubl, _api_messages.AnalyticsEvent.IMPRESSION_AD, _loggerApi.Event.IMPRESSION_AD), _defineProperty(_AnalyticsEventToPubl, _api_messages.AnalyticsEvent.IMPRESSION_OFFERS, _loggerApi.Event.IMPRESSION_OFFERS), _defineProperty(_AnalyticsEventToPubl, _api_messages.AnalyticsEvent.IMPRESSION_SUBSCRIBE_BUTTON, null), _defineProperty(_AnalyticsEventToPubl, _api_messages.AnalyticsEvent.IMPRESSION_SMARTBOX, null), _defineProperty(_AnalyticsEventToPubl, _api_messages.AnalyticsEvent.ACTION_SUBSCRIBE, null), _defineProperty(_AnalyticsEventToPubl, _api_messages.AnalyticsEvent.ACTION_PAYMENT_COMPLETE, _loggerApi.Event.ACTION_PAYMENT_COMPLETED), _defineProperty(_AnalyticsEventToPubl, _api_messages.AnalyticsEvent.ACTION_ACCOUNT_CREATED, null), _defineProperty(_AnalyticsEventToPubl, _api_messages.AnalyticsEvent.ACTION_ACCOUNT_ACKNOWLEDGED, null), _defineProperty(_AnalyticsEventToPubl, _api_messages.AnalyticsEvent.ACTION_SUBSCRIPTIONS_LANDING_PAGE, _loggerApi.Event.ACTION_SUBSCRIPTIONS_LANDING_PAGE), _defineProperty(_AnalyticsEventToPubl, _api_messages.AnalyticsEvent.ACTION_PAYMENT_FLOW_STARTED, _loggerApi.Event.ACTION_PAYMENT_FLOW_STARTED), _defineProperty(_AnalyticsEventToPubl, _api_messages.AnalyticsEvent.ACTION_OFFER_SELECTED, _loggerApi.Event.ACTION_OFFER_SELECTED), _defineProperty(_AnalyticsEventToPubl, _api_messages.AnalyticsEvent.EVENT_PAYMENT_FAILED, null), _defineProperty(_AnalyticsEventToPubl, _api_messages.AnalyticsEvent.EVENT_CUSTOM, _loggerApi.Event.EVENT_CUSTOM), _AnalyticsEventToPubl);
/**
 * Converts a propensity event enum into an analytics event enum.
 * @param {!Event|string} propensityEvent
 * @returns {!AnalyticsEvent}
 */

function publisherEventToAnalyticsEvent(propensityEvent) {
  return PublisherEventToAnalyticsEvent[propensityEvent];
}
/**
 * Converts an analytics event enum into a propensity event enum.
 * @param {!AnalyticsEvent} analyticsEvent
 * @returns {?Event}
 */


function analyticsEventToPublisherEvent(analyticsEvent) {
  return AnalyticsEventToPublisherEvent[analyticsEvent];
}

},{"../api/logger-api":8,"../proto/api_messages":33}],43:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ExperimentFlags = void 0;

/**
 * Copyright 2018 The Subscribe with Google Authors. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS-IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * @enum {string}
 */
var ExperimentFlags = {
  /**
   * Enables the feature that allows you to replace one subscription
   * for another in the subscribe() API.
   */
  REPLACE_SUBSCRIPTION: 'replace-subscription',

  /**
   * Enables the contributions feature.
   * DEPRECATED. This flag can be removed once not used by anyone.
   */
  CONTRIBUTIONS: 'contributions',

  /**
   * Enables the Propensity feature
   */
  PROPENSITY: 'propensity',

  /**
   * Enables the Smartbox feature.
   */
  SMARTBOX: 'smartbox',

  /**
   * Enables using new Activities APIs
   */
  HEJIRA: 'hejira',

  /** Enables logging to both the new SwG Clearcut service and the pre-existing
   *  Clearcut iframe while we verify the new logging system works.
   *  Publishers should not activate this experiment.
   */
  LOGGING_BEACON: 'logging-beacon',

  /** Enables googleTransactionID change. With the experiment on the ID is
   *  changed from '<uuid>' to '<uuid>.swg'.
   */
  UPDATE_GOOGLE_TRANSACTION_ID: 'update-google-transaction-id',

  /**
   * Enables PayClient to be instantiated within start() instead of upon instantiation.
   * Also moves google preconnects to Runtime from PayClient, and runs Pay
   * preloads upon start() instead of within the ctor.
   */
  PAY_CLIENT_LAZYLOAD: 'pay-client-lazyload'
};
exports.ExperimentFlags = ExperimentFlags;

},{}],44:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.setExperimentsStringForTesting = setExperimentsStringForTesting;
exports.isExperimentOn = isExperimentOn;
exports.setExperiment = setExperiment;
exports.getOnExperiments = getOnExperiments;

var _errors = require("../utils/errors");

var _url = require("../utils/url");

/**
 * Copyright 2018 The Subscribe with Google Authors. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS-IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * @fileoverview
 *
 * Client-side experiments in SwG.
 *
 * The experiments can be set in a few different ways:
 *  1. By gulp build rules using `--experiments=${experimentsString}` argument.
 *  2. By `#swg.experiments=${experimentsString}` parameter in the URL's
 *     fragment.
 *  3. By `swg.configure({experiments: [array]})` call.
 *
 * The `${experimentsString}` is defined as following:
 *  - experimentString = (experimentSpec,)*
 *  - experimentSpec = experimentId | experimentId '=' num100 ('c')?
 *
 * Some examples:
 *  - `A,B` - defines two experiments "A" and "B" that will be turned on.
 *  - `A:100,B:100` - the same: "A" and "B" will be turned on.
 *  - `A:0` - the experiment "A" will be disabled.
 *  - `A:1` - enable the experiment "A" in 1% of impressions.
 *  - `A:10c` - enable the experiment "A" in 10% of impressions with 10%
 *    control. In this case, 20% of the impressions will be split into two
 *    categories: experiment and control. Notice, a control can be requested
 *    only for the fraction under 20%.
 */

/**
 * @enum {string}
 */
var Selection = {
  EXPERIMENT: 'e',
  CONTROL: 'c'
};
/**
 * A comma-separated set of experiments.
 * @type {string}
 */

var experimentsString = '';
/**
 * A parsed map of experiments.
 * @type {?Object<string, boolean>}
 */

var experimentMap = null;
/**
 * @param {string} s
 * @package Visible for testing only.
 */

function setExperimentsStringForTesting(s) {
  experimentsString = s;
  experimentMap = null;
}
/**
 * Ensures that the experiments have been initialized and returns them.
 * @param {!Window} win
 * @return {!Object<string, boolean>}
 */


function getExperiments(win) {
  if (!experimentMap) {
    experimentMap = {};
    var combinedExperimentString = experimentsString;

    try {
      var query = (0, _url.parseQueryString)(win.location.hash);
      var experimentStringFromHash = query['swg.experiments'];

      if (experimentStringFromHash) {
        combinedExperimentString += ',' + experimentStringFromHash;
      }
    } catch (e) {
      // Ignore: experiment parsing cannot block runtime.
      _errors.ErrorUtils.throwAsync(e);
    } // Format:
    // - experimentString = (experimentSpec,)*


    combinedExperimentString.split(',').forEach(function (s) {
      s = s.trim();

      if (!s) {
        return;
      }

      try {
        parseSetExperiment(win, experimentMap, s);
      } catch (e) {
        // Ignore: experiment parsing cannot block runtime.
        _errors.ErrorUtils.throwAsync(e);
      }
    });
  }

  return experimentMap;
}
/**
 * @param {!Window} win
 * @param {?Object<string, boolean>} experimentMap
 * @param {string} spec
 */


function parseSetExperiment(win, experimentMap, spec) {
  // Format:
  // - experimentSpec = experimentId | experimentId '=' num100 ('c')?
  var experimentId;
  var fraction;
  var control = false;
  var eq = spec.indexOf(':');

  if (eq == -1) {
    experimentId = spec;
    fraction = 100;
    control = false;
  } else {
    experimentId = spec.substring(0, eq).trim();
    spec = spec.substring(eq + 1);

    if (spec.substring(spec.length - 1) == Selection.CONTROL) {
      control = true;
      spec = spec.substring(0, spec.length - 1);
    }

    fraction = parseInt(spec, 10);
  }

  if (isNaN(fraction)) {
    throw new Error('invalid fraction');
  } // Calculate "on"/"off".


  var on;

  if (fraction > 99) {
    // Explicitly "on".
    on = true;
  } else if (fraction < 1) {
    // Explicitly "off".
    on = false;
  } else if (win.sessionStorage) {
    // Fractional and possibly with the control.
    // Note that:
    // a. We can't do persistent experiments if storage is not available.
    // b. We can't run control on more than 20%.
    control = control && fraction <= 20;

    try {
      // Set fraction in the experiment to make it unlaunchable.
      var storageKey = 'subscribe.google.com:e:' + experimentId + ':' + fraction + (control ? 'c' : '');
      var selection = parseSelection(win.sessionStorage.getItem(storageKey));

      if (!selection) {
        // Is experiment/control range?
        if (win.Math.random() * 100 <= fraction * (control ? 2 : 1)) {
          var inExperiment = control ? win.Math.random() <= 0.5 : true;
          selection = inExperiment ? Selection.EXPERIMENT : Selection.CONTROL;
          win.sessionStorage.setItem(storageKey, selection);
        }
      }

      on = !!selection;

      if (selection == Selection.CONTROL) {
        experimentId = 'c-' + experimentId;
      }
    } catch (e) {
      // Ignore: experiment parsing cannot block runtime.
      on = false;

      _errors.ErrorUtils.throwAsync(e);
    }
  } else {
    on = false;
  }

  experimentMap[experimentId] = on;
}
/**
 * @param {?string} s
 * @return {?Selection}
 */


function parseSelection(s) {
  // Do a simple if-then to inline the whole Selection enum.
  return s == Selection.EXPERIMENT ? Selection.EXPERIMENT : s == Selection.CONTROL ? Selection.CONTROL : null;
}
/**
 * Whether the specified experiment is on or off.
 * @param {!Window} win
 * @param {string} experimentId
 * @return {boolean}
 */


function isExperimentOn(win, experimentId) {
  return getExperiments(win)[experimentId] || false;
}
/**
 * Toggles the experiment on or off. Returns the actual value of the experiment
 * after toggling is done.
 * @param {!Window} win
 * @param {string} experimentId
 * @param {boolean} on
 */


function setExperiment(win, experimentId, on) {
  getExperiments(win)[experimentId] = on;
}
/**
 * @return {!Array<string>}
 */


function getOnExperiments(win) {
  var experimentMap = getExperiments(win);
  var experiments = [];

  for (var experiment in experimentMap) {
    if (experimentMap[experiment]) {
      experiments.push(experiment);
    }
  }

  return experiments;
}

},{"../utils/errors":74,"../utils/url":85}],45:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.XhrFetcher = exports.Fetcher = void 0;

var _xhr = require("../utils/xhr");

var _url = require("../utils/url");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

/**
 * @interface
 */
var Fetcher = /*#__PURE__*/function () {
  function Fetcher() {
    _classCallCheck(this, Fetcher);
  }

  _createClass(Fetcher, [{
    key: "fetchCredentialedJson",

    /**
     * @param {string} unusedUrl
     * @return {!Promise<!Object>}
     */
    value: function fetchCredentialedJson(unusedUrl) {}
    /**
     * @param {string} unusedUrl
     * @param {!../utils/xhr.FetchInitDef} unusedInit
     * @return {!Promise<!../utils/xhr.FetchResponse>}
     */

  }, {
    key: "fetch",
    value: function fetch(unusedUrl, unusedInit) {}
    /**
     * POST data to a URL endpoint, do not wait for a response.
     * @param {!string} unusedUrl
     * @param {!string|!Object} unusedData
     */

  }, {
    key: "sendBeacon",
    value: function sendBeacon(unusedUrl, unusedData) {}
    /**
     * POST data to a URL endpoint, get a Promise for a response
     * @param {!string} unusedUrl
     * @param {!string|!Object} unusedMessage
     * @return {!Promise<!../utils/xhr.FetchResponse>}
     */

  }, {
    key: "sendPost",
    value: function sendPost(unusedUrl, unusedMessage) {}
  }]);

  return Fetcher;
}();
/**
 * @implements {Fetcher}
 */


exports.Fetcher = Fetcher;

var XhrFetcher = /*#__PURE__*/function () {
  /**
   * @param {!Window} win
   */
  function XhrFetcher(win) {
    _classCallCheck(this, XhrFetcher);

    /** @const {!Xhr} */
    this.xhr_ = new _xhr.Xhr(win);
  }
  /** @override */


  _createClass(XhrFetcher, [{
    key: "fetchCredentialedJson",
    value: function fetchCredentialedJson(url) {
      var init =
      /** @type {!../utils/xhr.FetchInitDef} */
      {
        method: 'GET',
        headers: {
          'Accept': 'text/plain, application/json'
        },
        credentials: 'include'
      };
      return this.fetch(url, init).then(function (response) {
        return response.json();
      });
    }
  }, {
    key: "sendPost",
    value: function sendPost(url, message) {
      var init =
      /** @type {!../utils/xhr.FetchInitDef} */
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
        },
        credentials: 'include',
        body: 'f.req=' + (0, _url.serializeProtoMessageForUrl)(message)
      };
      return this.fetch(url, init).then(function (response) {
        return response && response.json() || {};
      });
    }
    /** @override */

  }, {
    key: "fetch",
    value: function fetch(url, init) {
      return this.xhr_.fetch(url, init);
    }
    /** @override */

  }, {
    key: "sendBeacon",
    value: function sendBeacon(url, data) {
      if (navigator.sendBeacon) {
        var headers = {
          type: 'application/x-www-form-urlencoded;charset=UTF-8'
        };
        var blob = new Blob(['f.req=' + (0, _url.serializeProtoMessageForUrl)(data)], headers);
        navigator.sendBeacon(url, blob);
        return;
      } // Only newer browsers support beacon.  Fallback to standard XHR POST.


      this.sendPost(url, data);
    }
  }]);

  return XhrFetcher;
}();

exports.XhrFetcher = XhrFetcher;

},{"../utils/url":85,"../utils/xhr":86}],46:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.JsError = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

/**
 * Copyright 2018 The Subscribe with Google Authors. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS-IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 */
var JsError = /*#__PURE__*/function () {
  /**
   * @param {!../model/doc.Doc} doc
   */
  function JsError(doc) {
    _classCallCheck(this, JsError);

    /** @private @const {!../model/doc.Doc} */
    this.doc_ = doc;
    /** @private @const {!Promise} */

    this.microTask_ = Promise.resolve();
  }
  /**
   * @param {...*} var_args
   * @return {!Promise}
   */


  _createClass(JsError, [{
    key: "error",
    value: function error(var_args) {
      var _this = this;

      var args = Array.prototype.slice.call(arguments, 0);
      return this.microTask_.then(function () {
        var error = createErrorVargs.apply(null, args);

        if (error.reported) {
          return;
        }

        var img = _this.doc_.getWin().document.createElement('img');

        img.src = 'https://news.google.com/_/SubscribewithgoogleClientUi/jserror' + '?error=' + encodeURIComponent(String(error)) + '&script=' + encodeURIComponent('https://news.google.com/swg/js/v1/swg.js') + '&line=' + (error.lineNumber || 1) + '&trace=' + encodeURIComponent(error.stack); // Appending this image to DOM is not necessary.

        error.reported = true;
      });
    }
  }]);

  return JsError;
}();
/**
 * @param {...*} var_args
 * @return {!Error}
 */


exports.JsError = JsError;

function createErrorVargs(var_args) {
  var error = null;
  var message = '';

  for (var i = 0; i < arguments.length; i++) {
    var arg = arguments[i];

    if (arg instanceof Error && !error) {
      error = duplicateErrorIfNecessary(arg);
    } else {
      if (message) {
        message += ' ';
      }

      message += arg;
    }
  }

  if (!error) {
    error = new Error(message);
  } else if (message) {
    error.message = message + ': ' + error.message;
  }

  return error;
}
/**
 * Some exceptions (DOMException, namely) have read-only message.
 * @param {!Error} error
 * @return {!Error}
 */


function duplicateErrorIfNecessary(error) {
  var messageProperty = Object.getOwnPropertyDescriptor(error, 'message');

  if (messageProperty && messageProperty.writable) {
    return error;
  }

  var message = error.message,
      stack = error.stack;
  var e = new Error(message); // Copy all the extraneous things we attach.

  for (var prop in error) {
    e[prop] = error[prop];
  } // Ensure these are copied.


  e.stack = stack;
  return e;
}

},{}],47:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LinkSaveFlow = exports.LinkCompleteFlow = exports.LinkbackFlow = void 0;

var _activityIframeView = require("../ui/activity-iframe-view");

var _api_messages = require("../proto/api_messages");

var _subscriptions = require("../api/subscriptions");

var _activityUtils = require("../utils/activity-utils");

var _errors = require("../utils/errors");

var _services = require("./services");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var LINK_REQUEST_ID = 'swg-link';
/**
 * The flow to link an existing publisher account to an existing google account.
 */

var LinkbackFlow = /*#__PURE__*/function () {
  /**
   * @param {!./deps.DepsDef} deps
   */
  function LinkbackFlow(deps) {
    _classCallCheck(this, LinkbackFlow);

    /** @private @const {!./deps.DepsDef} */
    this.deps_ = deps;
    /** @private @const {!../components/activities.ActivityPorts} */

    this.activityPorts_ = deps.activities();
    /** @private @const {!../model/page-config.PageConfig} */

    this.pageConfig_ = deps.pageConfig();
    /** @private @const {!../components/dialog-manager.DialogManager} */

    this.dialogManager_ = deps.dialogManager();
  }
  /**
   * Starts the Link account flow.
   * @param {{ampReaderId: (string|undefined)}=} params
   * @return {!Promise}
   */


  _createClass(LinkbackFlow, [{
    key: "start",
    value: function start() {
      var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      this.deps_.callbacks().triggerFlowStarted(_subscriptions.SubscriptionFlows.LINK_ACCOUNT);

      var forceRedirect = this.deps_.config().windowOpenMode == _subscriptions.WindowOpenMode.REDIRECT;

      var args = params.ampReaderId ? (0, _services.feArgs)({
        'publicationId': this.pageConfig_.getPublicationId(),
        'ampReaderId': params.ampReaderId
      }) : (0, _services.feArgs)({
        'publicationId': this.pageConfig_.getPublicationId()
      });
      var opener = this.activityPorts_.open(LINK_REQUEST_ID, (0, _services.feUrl)('/linkbackstart'), forceRedirect ? '_top' : '_blank', args, {});
      this.deps_.eventManager().logSwgEvent(_api_messages.AnalyticsEvent.IMPRESSION_LINK);
      this.dialogManager_.popupOpened(opener && opener.targetWin);
      return Promise.resolve();
    }
  }]);

  return LinkbackFlow;
}();
/**
 * The class for Link accounts flow.
 */


exports.LinkbackFlow = LinkbackFlow;

var LinkCompleteFlow = /*#__PURE__*/function () {
  _createClass(LinkCompleteFlow, null, [{
    key: "configurePending",

    /**
     * @param {!./deps.DepsDef} deps
     */
    value: function configurePending(deps) {
      /**
       * Handler function.
       * @param {!../components/activities.ActivityPortDef} port
       */
      function handler(port) {
        deps.entitlementsManager().blockNextNotification();
        deps.callbacks().triggerLinkProgress();
        deps.dialogManager().popupClosed();
        var promise = (0, _activityUtils.acceptPortResultData)(port, (0, _services.feOrigin)(),
        /* requireOriginVerified */
        false,
        /* requireSecureChannel */
        false);
        return promise.then(function (response) {
          deps.eventManager().logSwgEvent(_api_messages.AnalyticsEvent.ACTION_LINK_CONTINUE, true);
          var flow = new LinkCompleteFlow(deps, response);
          flow.start();
        }, function (reason) {
          if ((0, _errors.isCancelError)(reason)) {
            deps.eventManager().logSwgEvent(_api_messages.AnalyticsEvent.ACTION_LINK_CANCEL, true);
            deps.callbacks().triggerFlowCanceled(_subscriptions.SubscriptionFlows.LINK_ACCOUNT);
          } else {
            // The user chose to continue but there was an error.
            deps.eventManager().logSwgEvent(_api_messages.AnalyticsEvent.ACTION_LINK_CONTINUE, true);
          }
        });
      }

      deps.activities().onResult(LINK_REQUEST_ID, handler);
    }
    /**
     * @param {!./deps.DepsDef} deps
     * @param {?Object} response
     */

  }]);

  function LinkCompleteFlow(deps, response) {
    var _this = this;

    _classCallCheck(this, LinkCompleteFlow);

    /** @private @const {!./deps.DepsDef} */
    this.deps_ = deps;
    /** @private @const {!Window} */

    this.win_ = deps.win();
    /** @private @const {!../components/activities.ActivityPorts} */

    this.activityPorts_ = deps.activities();
    /** @private @const {!../components/dialog-manager.DialogManager} */

    this.dialogManager_ = deps.dialogManager();
    /** @private @const {!./entitlements-manager.EntitlementsManager} */

    this.entitlementsManager_ = deps.entitlementsManager();
    /** @private @const {!./callbacks.Callbacks} */

    this.callbacks_ = deps.callbacks();
    var index = response && response['index'] || '0';
    /** @private @const {!ActivityIframeView} */

    this.activityIframeView_ = new _activityIframeView.ActivityIframeView(this.win_, this.activityPorts_, (0, _services.feUrl)('/linkconfirmiframe', '/u/' + index), (0, _services.feArgs)({
      'productId': deps.pageConfig().getProductId(),
      'publicationId': deps.pageConfig().getPublicationId()
    }),
    /* shouldFadeBody */
    true);
    /** @private {?function()} */

    this.completeResolver_ = null;
    /** @private @const {!Promise} */

    this.completePromise_ = new Promise(function (resolve) {
      _this.completeResolver_ = resolve;
    });
  }
  /**
   * Starts the Link account flow.
   * @return {!Promise}
   */


  _createClass(LinkCompleteFlow, [{
    key: "start",
    value: function start() {
      var _this2 = this;

      var promise = this.activityIframeView_.acceptResultAndVerify((0, _services.feOrigin)(),
      /* requireOriginVerified */
      true,
      /* requireSecureChannel */
      true);
      promise.then(function (response) {
        _this2.complete_(response);
      })["catch"](function (reason) {
        // Rethrow async.
        setTimeout(function () {
          throw reason;
        });
      }).then(function () {
        // The flow is complete.
        _this2.dialogManager_.completeView(_this2.activityIframeView_);
      });
      this.deps_.eventManager().logSwgEvent(_api_messages.AnalyticsEvent.EVENT_GOOGLE_UPDATED, true);
      this.deps_.eventManager().logSwgEvent(_api_messages.AnalyticsEvent.IMPRESSION_GOOGLE_UPDATED, true);
      return this.dialogManager_.openView(this.activityIframeView_);
    }
    /**
     * @param {?Object} response
     * @private
     */

  }, {
    key: "complete_",
    value: function complete_(response) {
      this.deps_.eventManager().logSwgEvent(_api_messages.AnalyticsEvent.ACTION_GOOGLE_UPDATED_CLOSE, true);
      this.callbacks_.triggerLinkComplete();
      this.callbacks_.resetLinkProgress();
      this.entitlementsManager_.setToastShown(true);
      this.entitlementsManager_.unblockNextNotification();
      this.entitlementsManager_.reset(response && response['success'] || false);

      if (response && response['entitlements']) {
        this.entitlementsManager_.pushNextEntitlements(response['entitlements']);
      }

      this.completeResolver_();
    }
    /** @return {!Promise} */

  }, {
    key: "whenComplete",
    value: function whenComplete() {
      return this.completePromise_;
    }
  }]);

  return LinkCompleteFlow;
}();
/**
 * The flow to save subscription information from an existing publisher account
 * to an existing google account.  The accounts may or may not already be
 * linked.
 */


exports.LinkCompleteFlow = LinkCompleteFlow;

var LinkSaveFlow = /*#__PURE__*/function () {
  /**
   * @param {!./deps.DepsDef} deps
   * @param {!../api/subscriptions.SaveSubscriptionRequestCallback} callback
   */
  function LinkSaveFlow(deps, callback) {
    _classCallCheck(this, LinkSaveFlow);

    /** @private @const {!Window} */
    this.win_ = deps.win();
    /** @private @const {!./deps.DepsDef} */

    this.deps_ = deps;
    /** @private @const {!../components/activities.ActivityPorts} */

    this.activityPorts_ = deps.activities();
    /** @private @const {!../components/dialog-manager.DialogManager} */

    this.dialogManager_ = deps.dialogManager();
    /** @private {!../api/subscriptions.SaveSubscriptionRequestCallback} */

    this.callback_ = callback;
    /** @private {?Promise<!../api/subscriptions.SaveSubscriptionRequest>} */

    this.requestPromise_ = null;
    /** @private {?Promise} */

    this.openPromise_ = null;
    /** @private {?ActivityIframeView} */

    this.activityIframeView_ = null;
  }
  /**
   * @return {?Promise<!../api/subscriptions.SaveSubscriptionRequest>}
   * @package Visible for testing.
   */


  _createClass(LinkSaveFlow, [{
    key: "getRequestPromise",
    value: function getRequestPromise() {
      return this.requestPromise_;
    }
    /**
     * @private
     */

  }, {
    key: "complete_",
    value: function complete_() {
      this.dialogManager_.completeView(this.activityIframeView_);
    }
    /**
     * @param {!Object} result
     * @return {!Promise<boolean>}
     * @private
     */

  }, {
    key: "handleLinkSaveResponse_",
    value: function handleLinkSaveResponse_(result) {
      var _this3 = this;

      // This flow is complete
      this.complete_();
      var startPromise;
      var linkConfirm = null;

      if (result['linked']) {
        // When linking succeeds, start link confirmation flow
        this.dialogManager_.popupClosed();
        this.deps_.callbacks().triggerFlowStarted(_subscriptions.SubscriptionFlows.LINK_ACCOUNT);
        linkConfirm = new LinkCompleteFlow(this.deps_, result);
        startPromise = linkConfirm.start();
      } else {
        startPromise = Promise.reject((0, _errors.createCancelError)(this.win_, 'not linked'));
      }

      var completePromise = startPromise.then(function () {
        _this3.deps_.callbacks().triggerLinkProgress();

        return linkConfirm.whenComplete();
      });
      return completePromise.then(function () {
        return true;
      });
    }
    /**
     * @param {LinkingInfoResponse} response
     * @private
     */

  }, {
    key: "sendLinkSaveToken_",
    value: function sendLinkSaveToken_(response) {
      var _this4 = this;

      if (!response || !response.getRequested()) {
        return;
      }

      this.requestPromise_ = new Promise(function (resolve) {
        resolve(_this4.callback_());
      }).then(function (request) {
        var saveRequest = new _api_messages.LinkSaveTokenRequest();

        if (request && request.token) {
          if (request.authCode) {
            throw new Error('Both authCode and token are available');
          } else {
            saveRequest.setToken(request.token);
          }
        } else if (request && request.authCode) {
          saveRequest.setAuthCode(request.authCode);
        } else {
          throw new Error('Neither token or authCode is available');
        }

        _this4.activityIframeView_.execute(saveRequest);
      })["catch"](function (reason) {
        // The flow is complete.
        _this4.complete_();

        throw reason;
      });
    }
    /**
     * @return {?Promise}
     */

    /**
     * Starts the save subscription
     * @return {!Promise}
     */

  }, {
    key: "start",
    value: function start() {
      var _this5 = this;

      var iframeArgs = this.activityPorts_.addDefaultArguments({
        'isClosable': true
      });
      this.activityIframeView_ = new _activityIframeView.ActivityIframeView(this.win_, this.activityPorts_, (0, _services.feUrl)('/linksaveiframe'), iframeArgs,
      /* shouldFadeBody */
      false,
      /* hasLoadingIndicator */
      true);
      this.activityIframeView_.on(_api_messages.LinkingInfoResponse, this.sendLinkSaveToken_.bind(this));
      this.openPromise_ = this.dialogManager_.openView(this.activityIframeView_,
      /* hidden */
      true);
      this.deps_.eventManager().logSwgEvent(_api_messages.AnalyticsEvent.IMPRESSION_SAVE_SUBSCR_TO_GOOGLE);
      /** {!Promise<boolean>} */

      return this.activityIframeView_.acceptResultAndVerify((0, _services.feOrigin)(),
      /* requireOriginVerified */
      true,
      /* requireSecureChannel */
      true).then(function (result) {
        return _this5.handleLinkSaveResponse_(result);
      })["catch"](function (reason) {
        // In case this flow wasn't complete, complete it here
        _this5.complete_(); // Handle cancellation from user, link confirm start or completion here


        if ((0, _errors.isCancelError)(reason)) {
          _this5.deps_.eventManager().logSwgEvent(_api_messages.AnalyticsEvent.ACTION_SAVE_SUBSCR_TO_GOOGLE_CANCEL, true);

          _this5.deps_.callbacks().triggerFlowCanceled(_subscriptions.SubscriptionFlows.LINK_ACCOUNT);

          return false;
        }

        throw reason;
      });
    }
  }]);

  return LinkSaveFlow;
}();

exports.LinkSaveFlow = LinkSaveFlow;

},{"../api/subscriptions":13,"../proto/api_messages":33,"../ui/activity-iframe-view":64,"../utils/activity-utils":67,"../utils/errors":74,"./services":60}],48:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Logger = void 0;

var _api_messages = require("../proto/api_messages");

var _loggerApi = require("../api/logger-api");

var _types = require("../utils/types");

var _eventTypeMapping = require("./event-type-mapping");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

/**
 * @implements {../api/logger-api.LoggerApi}
 */
var Logger = /*#__PURE__*/function () {
  /**
   * @param {!./deps.DepsDef} deps
   */
  function Logger(deps) {
    _classCallCheck(this, Logger);

    /** @private @const {!../api/client-event-manager-api.ClientEventManagerApi} */
    this.eventManager_ = deps.eventManager();
  }
  /** @override */


  _createClass(Logger, [{
    key: "sendSubscriptionState",
    value: function sendSubscriptionState(state, jsonProducts) {
      if (!(0, _types.isEnumValue)(_loggerApi.SubscriptionState, state)) {
        throw new Error('Invalid subscription state provided');
      }

      if ((_loggerApi.SubscriptionState.SUBSCRIBER == state || _loggerApi.SubscriptionState.PAST_SUBSCRIBER == state) && !jsonProducts) {
        throw new Error('Entitlements must be provided for users with' + ' active or expired subscriptions');
      }

      if (jsonProducts && !(0, _types.isObject)(jsonProducts)) {
        throw new Error('Entitlements must be an Object');
      }

      var productsOrSkus = null;

      if (jsonProducts) {
        productsOrSkus = JSON.stringify(jsonProducts);
      }

      this.eventManager_.logEvent({
        eventType: _api_messages.AnalyticsEvent.EVENT_SUBSCRIPTION_STATE,
        eventOriginator: _api_messages.EventOriginator.PUBLISHER_CLIENT,
        isFromUserAction: null,
        additionalParameters: {
          state: state,
          productsOrSkus: productsOrSkus
        }
      });
    }
    /** @override */

  }, {
    key: "sendEvent",
    value: function sendEvent(userEvent) {
      var data = null;

      if (!(0, _types.isEnumValue)(_loggerApi.Event, userEvent.name) || !(0, _eventTypeMapping.publisherEventToAnalyticsEvent)(userEvent.name)) {
        throw new Error('Invalid user event provided(' + userEvent.name + ')');
      }

      if (userEvent.data) {
        if (!(0, _types.isObject)(userEvent.data)) {
          throw new Error('Event data must be an Object(' + userEvent.data + ')');
        } else {
          data = Object.assign({}, data, userEvent.data);
        }
      }

      if ((0, _types.isBoolean)(userEvent.active)) {
        if (!data) {
          data = {};
        }

        Object.assign(data, {
          'is_active': userEvent.active
        });
      } else if (userEvent.active != null) {
        throw new Error('Event active must be a boolean');
      }

      this.eventManager_.logEvent({
        eventType: (0, _eventTypeMapping.publisherEventToAnalyticsEvent)(userEvent.name),
        eventOriginator: _api_messages.EventOriginator.PUBLISHER_CLIENT,
        isFromUserAction: userEvent.active,
        additionalParameters: data
      });
    }
  }]);

  return Logger;
}();

exports.Logger = Logger;

},{"../api/logger-api":8,"../proto/api_messages":33,"../utils/types":84,"./event-type-mapping":42}],49:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LoginNotificationApi = void 0;

var _activityIframeView = require("../ui/activity-iframe-view");

var _subscriptions = require("../api/subscriptions");

var _services = require("./services");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var LoginNotificationApi = /*#__PURE__*/function () {
  /**
   * @param {!./deps.DepsDef} deps
   */
  function LoginNotificationApi(deps) {
    _classCallCheck(this, LoginNotificationApi);

    /** @private @const {!./deps.DepsDef} */
    this.deps_ = deps;
    /** @private @const {!Window} */

    this.win_ = deps.win();
    /** @private @const {!../components/activities.ActivityPorts} */

    this.activityPorts_ = deps.activities();
    /** @private @const {!../components/dialog-manager.DialogManager} */

    this.dialogManager_ = deps.dialogManager();
    /** @private {?Promise} */

    this.openViewPromise_ = null;
    /** @private @const {!ActivityIframeView} */

    this.activityIframeView_ = new _activityIframeView.ActivityIframeView(this.win_, this.activityPorts_, (0, _services.feUrl)('/loginiframe'), (0, _services.feArgs)({
      publicationId: deps.pageConfig().getPublicationId(),
      productId: deps.pageConfig().getProductId(),
      // No need to ask the user. Just tell them you're logging them in.
      userConsent: false
    }),
    /* shouldFadeBody */
    true);
  }
  /**
   * Continues the Login flow (after waiting).
   * @return {!Promise}
   */


  _createClass(LoginNotificationApi, [{
    key: "start",
    value: function start() {
      var _this = this;

      this.deps_.callbacks().triggerFlowStarted(_subscriptions.SubscriptionFlows.SHOW_LOGIN_NOTIFICATION);
      this.openViewPromise_ = this.dialogManager_.openView(this.activityIframeView_);
      return this.activityIframeView_.acceptResult().then(function () {
        // The consent part is complete.
        _this.dialogManager_.completeView(_this.activityIframeView_);
      }, function (reason) {
        _this.dialogManager_.completeView(_this.activityIframeView_);

        throw reason;
      });
    }
  }]);

  return LoginNotificationApi;
}();

exports.LoginNotificationApi = LoginNotificationApi;

},{"../api/subscriptions":13,"../ui/activity-iframe-view":64,"./services":60}],50:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LoginPromptApi = void 0;

var _activityIframeView = require("../ui/activity-iframe-view");

var _subscriptions = require("../api/subscriptions");

var _services = require("./services");

var _errors = require("../utils/errors");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var LoginPromptApi = /*#__PURE__*/function () {
  /**
   * @param {!./deps.DepsDef} deps
   */
  function LoginPromptApi(deps) {
    _classCallCheck(this, LoginPromptApi);

    /** @private @const {!./deps.DepsDef} */
    this.deps_ = deps;
    /** @private @const {!Window} */

    this.win_ = deps.win();
    /** @private @const {!../components/activities.ActivityPorts} */

    this.activityPorts_ = deps.activities();
    /** @private @const {!../components/dialog-manager.DialogManager} */

    this.dialogManager_ = deps.dialogManager();
    /** @private {?Promise} */

    this.openViewPromise_ = null;
    /** @private @const {!ActivityIframeView} */

    this.activityIframeView_ = new _activityIframeView.ActivityIframeView(this.win_, this.activityPorts_, (0, _services.feUrl)('/loginiframe'), (0, _services.feArgs)({
      publicationId: deps.pageConfig().getPublicationId(),
      productId: deps.pageConfig().getProductId(),
      // First ask the user if they want us to log them in.
      userConsent: true
    }),
    /* shouldFadeBody */
    true);
  }
  /**
   * Prompts the user to login.
   * @return {!Promise}
   */


  _createClass(LoginPromptApi, [{
    key: "start",
    value: function start() {
      var _this = this;

      this.deps_.callbacks().triggerFlowStarted(_subscriptions.SubscriptionFlows.SHOW_LOGIN_PROMPT);
      this.openViewPromise_ = this.dialogManager_.openView(this.activityIframeView_);
      return this.activityIframeView_.acceptResult().then(function () {
        // The consent part is complete.
        _this.dialogManager_.completeView(_this.activityIframeView_);
      }, function (reason) {
        if ((0, _errors.isCancelError)(reason)) {
          _this.deps_.callbacks().triggerFlowCanceled(_subscriptions.SubscriptionFlows.SHOW_LOGIN_PROMPT);
        } else {
          _this.dialogManager_.completeView(_this.activityIframeView_);
        }

        throw reason;
      });
    }
  }]);

  return LoginPromptApi;
}();

exports.LoginPromptApi = LoginPromptApi;

},{"../api/subscriptions":13,"../ui/activity-iframe-view":64,"../utils/errors":74,"./services":60}],51:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MeterRegwallApi = void 0;

var _activityIframeView = require("../ui/activity-iframe-view");

var _subscriptions = require("../api/subscriptions");

var _services = require("./services");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var MeterRegwallApi = /*#__PURE__*/function () {
  /**
   * @param {!./deps.DepsDef} deps
   * @param {{ gsiUrl: string, alreadyRegisteredUrl: string}} params
   */
  function MeterRegwallApi(deps, params) {
    _classCallCheck(this, MeterRegwallApi);

    /** @private @const {!./deps.DepsDef} */
    this.deps_ = deps;
    /** @private @const {!Window} */

    this.win_ = deps.win();
    /** @private @const {!../components/activities.ActivityPorts} */

    this.activityPorts_ = deps.activities();
    /** @private @const {!../components/dialog-manager.DialogManager} */

    this.dialogManager_ = deps.dialogManager();
    /** @private @const {!ActivityIframeView} */

    this.activityIframeView_ = new _activityIframeView.ActivityIframeView(this.win_, this.activityPorts_, (0, _services.feUrl)('/meterregwalliframe'), (0, _services.feArgs)({
      publicationId: deps.pageConfig().getPublicationId(),
      productId: deps.pageConfig().getProductId(),
      gsiUrl: params.gsiUrl,
      alreadyRegisteredUrl: params.alreadyRegisteredUrl
    }),
    /* shouldFadeBody */
    true);
  }
  /**
   * Prompts the user to register to the meter.
   * @return {!Promise}
   */


  _createClass(MeterRegwallApi, [{
    key: "start",
    value: function start() {
      this.deps_.callbacks().triggerFlowStarted(_subscriptions.SubscriptionFlows.SHOW_METER_REGWALL);
      return this.dialogManager_.openView(this.activityIframeView_);
    }
  }]);

  return MeterRegwallApi;
}();

exports.MeterRegwallApi = MeterRegwallApi;

},{"../api/subscriptions":13,"../ui/activity-iframe-view":64,"./services":60}],52:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MeterToastApi = void 0;

var _activityIframeView = require("../ui/activity-iframe-view");

var _subscriptions = require("../api/subscriptions");

var _api_messages = require("../proto/api_messages");

var _services = require("./services");

var _style = require("../utils/style");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var IFRAME_BOX_SHADOW = 'rgba(60, 64, 67, .3) 0 -2px 5px, rgba(60, 64, 67, .15) 0 -5px 5px';

var MeterToastApi = /*#__PURE__*/function () {
  /**
   * @param {!./deps.DepsDef} deps
   */
  function MeterToastApi(deps) {
    var _this = this;

    _classCallCheck(this, MeterToastApi);

    /** @private @const {!./deps.DepsDef} */
    this.deps_ = deps;
    /** @private @const {!Window} */

    this.win_ = deps.win();
    /** @private @const {!../components/activities.ActivityPorts} */

    this.activityPorts_ = deps.activities();
    /** @private @const {!../components/dialog-manager.DialogManager} */

    this.dialogManager_ = deps.dialogManager();
    /** @private @const {!ActivityIframeView} */

    this.activityIframeView_ = new _activityIframeView.ActivityIframeView(this.win_, this.activityPorts_, (0, _services.feUrl)('/metertoastiframe'), (0, _services.feArgs)({
      publicationId: deps.pageConfig().getPublicationId(),
      productId: deps.pageConfig().getProductId(),
      hasSubscriptionCallback: deps.callbacks().hasSubscribeRequestCallback()
    }),
    /* shouldFadeBody */
    false);
    /** @private @const {!function()} */

    this.sendCloseRequestFunction_ = function () {
      var closeRequest = new _api_messages.ToastCloseRequest();
      closeRequest.setClose(true);

      _this.activityIframeView_.execute(closeRequest);
    };
  }
  /**
   * Shows the user the metering toast.
   * @return {!Promise}
   */


  _createClass(MeterToastApi, [{
    key: "start",
    value: function start() {
      var _this2 = this;

      this.deps_.callbacks().triggerFlowStarted(_subscriptions.SubscriptionFlows.SHOW_METER_TOAST);
      this.activityIframeView_.on(_api_messages.ViewSubscriptionsResponse, this.startNativeFlow_.bind(this));
      return this.dialogManager_.openView(this.activityIframeView_).then(function () {
        _this2.setDialogBoxShadow_(); // Allow closing of the iframe with any scroll or click event.


        _this2.win_.addEventListener('click', _this2.sendCloseRequestFunction_);

        _this2.win_.addEventListener('touchstart', _this2.sendCloseRequestFunction_);

        _this2.win_.addEventListener('mousedown', _this2.sendCloseRequestFunction_);

        _this2.win_.addEventListener('wheel', _this2.sendCloseRequestFunction_); // Making body's overflow property 'hidden' to prevent scrolling
        // while swiping on the iframe.


        var $body = _this2.win_.document.body;
        (0, _style.setStyle)($body, 'overflow', 'hidden');
      });
    }
    /**
     * Sets a callback function to happen onCancel.
     * @param {function()} onCancelCallback
     */

  }, {
    key: "setOnCancelCallback",
    value: function setOnCancelCallback(onCancelCallback) {
      this.activityIframeView_.onCancel(onCancelCallback);
    }
    /**
     * Removes the event listeners that close the iframe and make the body visible.
     */

  }, {
    key: "removeCloseEventListener",
    value: function removeCloseEventListener() {
      this.win_.removeEventListener('click', this.sendCloseRequestFunction_);
      this.win_.removeEventListener('touchstart', this.sendCloseRequestFunction_);
      this.win_.removeEventListener('mousedown', this.sendCloseRequestFunction_);
      this.win_.removeEventListener('wheel', this.sendCloseRequestFunction_);
      var $body = this.win_.document.body;
      (0, _style.setStyle)($body, 'overflow', 'visible');
    }
    /**
     * Changes the iframe box shadow to match desired specifications on mobile.
     */

  }, {
    key: "setDialogBoxShadow_",
    value: function setDialogBoxShadow_() {
      var mq = this.win_.matchMedia('(max-width: 640px), (max-height: 640px)');
      var element = this.dialogManager_.getDialog().getElement();

      if (mq.matches) {
        (0, _style.setImportantStyles)(element, {
          'box-shadow': IFRAME_BOX_SHADOW
        });
      }

      mq.addListener(function (changed) {
        if (changed.matches) {
          (0, _style.setImportantStyles)(element, {
            'box-shadow': IFRAME_BOX_SHADOW
          });
        } else {
          (0, _style.setImportantStyles)(element, {
            'box-shadow': ''
          });
        }
      });
    }
    /**
     * @param {ViewSubscriptionsResponse} response
     * @private
     */

  }, {
    key: "startNativeFlow_",
    value: function startNativeFlow_(response) {
      if (response.getNative()) {
        this.deps_.callbacks().triggerSubscribeRequest();
      }
    }
  }]);

  return MeterToastApi;
}();

exports.MeterToastApi = MeterToastApi;

},{"../api/subscriptions":13,"../proto/api_messages":33,"../ui/activity-iframe-view":64,"../utils/style":83,"./services":60}],53:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.OffersApi = void 0;

var _services = require("./services");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var OffersApi = /*#__PURE__*/function () {
  /**
   * @param {!../model/page-config.PageConfig} config
   * @param {!./fetcher.Fetcher} fetcher
   */
  function OffersApi(config, fetcher) {
    _classCallCheck(this, OffersApi);

    /** @private @const {!../model/page-config.PageConfig} */
    this.config_ = config;
    /** @private @const {!./fetcher.Fetcher} */

    this.fetcher_ = fetcher;
  }
  /**
   * @param {?string=} productId
   * @return {!Promise<!Array<!../api/offer.Offer>>}
   */


  _createClass(OffersApi, [{
    key: "getOffers",
    value: function getOffers() {
      var productId = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.config_.getProductId();

      if (!productId) {
        throw new Error('getOffers requires productId in config or arguments');
      }

      return this.fetch_(productId);
    }
    /**
     * @param {string} productId
     * @return {!Promise<!Array<!../api/offer.Offer>>}
     * @private
     */

  }, {
    key: "fetch_",
    value: function fetch_(productId) {
      var url = (0, _services.serviceUrl)('/publication/' + encodeURIComponent(this.config_.getPublicationId()) + '/offers' + '?label=' + encodeURIComponent(productId)); // TODO(dvoytenko): switch to a non-credentialed request after launch.

      return this.fetcher_.fetchCredentialedJson(url).then(function (json) {
        return json['offers'] || [];
      });
    }
  }]);

  return OffersApi;
}();

exports.OffersApi = OffersApi;

},{"./services":60}],54:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AbbrvOfferFlow = exports.SubscribeOptionFlow = exports.OffersFlow = void 0;

var _activityIframeView = require("../ui/activity-iframe-view");

var _api_messages = require("../proto/api_messages");

var _payFlow = require("./pay-flow");

var _subscriptions = require("../api/subscriptions");

var _log = require("../utils/log");

var _services = require("./services");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

/**
 * @param {string} sku
 * @return {!EventParams}
 */
function getEventParams(sku) {
  return new _api_messages.EventParams([,,,, sku]);
}
/**
 * Offers view is closable when request was originated from 'AbbrvOfferFlow'
 * or from 'SubscribeOptionFlow'.
 */


var OFFERS_VIEW_CLOSABLE = true; // The value logged when the offers screen shows all available SKUs.

var ALL_SKUS = '*';
/**
 * The class for Offers flow.
 */

var OffersFlow = /*#__PURE__*/function () {
  /**
   * @param {!./deps.DepsDef} deps
   * @param {!../api/subscriptions.OffersRequest|undefined} options
   */
  function OffersFlow(deps, options) {
    _classCallCheck(this, OffersFlow);

    /** @private @const {!./deps.DepsDef} */
    this.deps_ = deps;
    /** @private @const {!Window} */

    this.win_ = deps.win();
    /** @private @const {!../components/activities.ActivityPorts} */

    this.activityPorts_ = deps.activities();
    /** @private @const {!../components/dialog-manager.DialogManager} */

    this.dialogManager_ = deps.dialogManager();
    /** @private @const {!../runtime/client-event-manager.ClientEventManager} */

    this.eventManager_ = deps.eventManager();
    var isClosable = options && options.isClosable;

    if (isClosable == undefined) {
      isClosable = false; // Default is to hide Close button.
    }

    var feArgsObj = deps.activities().addDefaultArguments({
      'showNative': deps.callbacks().hasSubscribeRequestCallback(),
      'productType': _subscriptions.ProductType.SUBSCRIPTION,
      'list': options && options.list || 'default',
      'skus': options && options.skus || null,
      'isClosable': isClosable
    });

    if (options && options.oldSku) {
      feArgsObj['oldSku'] = options.oldSku;
      (0, _log.assert)(feArgsObj['skus'], 'Need a sku list if old sku is provided!'); // Remove old sku from offers if in list.

      var skuList = feArgsObj['skus'];
      var
      /** @type {string} */
      oldSku = feArgsObj['oldSku'];
      skuList = skuList.filter(function (sku) {
        return sku !== oldSku;
      });
      (0, _log.assert)(skuList.length > 0, 'Sku list only contained offer user already has');
      feArgsObj['skus'] = skuList;
    } // Redirect to payments if only one upgrade option is passed.


    if (feArgsObj['skus'] && feArgsObj['skus'].length === 1) {
      var sku = feArgsObj['skus'][0];
      var
      /** @type {string|undefined} */
      _oldSku = feArgsObj['oldSku']; // Update subscription triggers experimental flag if oldSku is passed,
      // so we need to check for oldSku to decide if it needs to be sent.
      // Otherwise we might accidentally block a regular subscription request.

      if (_oldSku) {
        var skuSelectedResponse = new _api_messages.SkuSelectedResponse();
        skuSelectedResponse.setSku(sku);
        skuSelectedResponse.setOldSku(_oldSku);
        this.startPayFlow_(skuSelectedResponse);
        return;
      }
    }
    /** @private  @const {!Array<!string>} */


    this.skus_ = feArgsObj['skus'] || [ALL_SKUS];
    /** @private @const {!ActivityIframeView} */

    this.activityIframeView_ = new _activityIframeView.ActivityIframeView(this.win_, this.activityPorts_, (0, _services.feUrl)('/offersiframe'), feArgsObj,
    /* shouldFadeBody */
    true);
  }
  /**
   * @param {SkuSelectedResponse} response
   * @private
   */


  _createClass(OffersFlow, [{
    key: "startPayFlow_",
    value: function startPayFlow_(response) {
      var sku = response.getSku();

      if (sku) {
        var
        /** @type {../api/subscriptions.SubscriptionRequest} */
        subscriptionRequest = {
          'skuId': sku
        };
        var oldSku = response.getOldSku();

        if (oldSku) {
          subscriptionRequest['oldSku'] = oldSku;
          this.deps_.analytics().setSku(oldSku);
        }

        this.eventManager_.logSwgEvent(_api_messages.AnalyticsEvent.ACTION_OFFER_SELECTED, true, getEventParams(sku));
        new _payFlow.PayStartFlow(this.deps_, subscriptionRequest).start();
      }
    }
    /**
     * @param {AlreadySubscribedResponse} response
     * @private
     */

  }, {
    key: "handleLinkRequest_",
    value: function handleLinkRequest_(response) {
      if (response.getSubscriberOrMember()) {
        this.eventManager_.logSwgEvent(_api_messages.AnalyticsEvent.ACTION_ALREADY_SUBSCRIBED, true);
        this.deps_.callbacks().triggerLoginRequest({
          linkRequested: !!response.getLinkRequested()
        });
      }
    }
    /**
     * @param {ViewSubscriptionsResponse} response
     * @private
     */

  }, {
    key: "startNativeFlow_",
    value: function startNativeFlow_(response) {
      if (response.getNative()) {
        this.deps_.callbacks().triggerSubscribeRequest();
      }
    }
    /**
     * Starts the offers flow or alreadySubscribed flow.
     * @return {!Promise}
     */

  }, {
    key: "start",
    value: function start() {
      var _this = this;

      if (this.activityIframeView_) {
        // So no error if skipped to payment screen.
        // Start/cancel events.
        // The second parameter is required by Propensity in AMP.
        this.deps_.callbacks().triggerFlowStarted(_subscriptions.SubscriptionFlows.SHOW_OFFERS, {
          skus: this.skus_,
          source: 'SwG'
        });
        this.activityIframeView_.onCancel(function () {
          _this.deps_.callbacks().triggerFlowCanceled(_subscriptions.SubscriptionFlows.SHOW_OFFERS);
        });
        this.activityIframeView_.on(_api_messages.SkuSelectedResponse, this.startPayFlow_.bind(this));
        this.activityIframeView_.on(_api_messages.AlreadySubscribedResponse, this.handleLinkRequest_.bind(this));
        this.activityIframeView_.on(_api_messages.ViewSubscriptionsResponse, this.startNativeFlow_.bind(this));
        return this.dialogManager_.openView(this.activityIframeView_);
      }

      return Promise.resolve();
    }
  }]);

  return OffersFlow;
}();
/**
 * The class for subscribe option flow.
 */


exports.OffersFlow = OffersFlow;

var SubscribeOptionFlow = /*#__PURE__*/function () {
  /**
   * @param {!./deps.DepsDef} deps
   * @param {!../api/subscriptions.OffersRequest|undefined} options
   */
  function SubscribeOptionFlow(deps, options) {
    _classCallCheck(this, SubscribeOptionFlow);

    /** @private @const {!./deps.DepsDef} */
    this.deps_ = deps;
    /** @private @const {!../api/subscriptions.OffersRequest|undefined} */

    this.options_ = options;
    /** @private @const {!../components/activities.ActivityPorts} */

    this.activityPorts_ = deps.activities();
    /** @private @const {!../components/dialog-manager.DialogManager} */

    this.dialogManager_ = deps.dialogManager();
    /** @private @const {!../runtime/client-event-manager.ClientEventManager} */

    this.eventManager_ = deps.eventManager();
    /** @private @const {!ActivityIframeView} */

    this.activityIframeView_ = new _activityIframeView.ActivityIframeView(deps.win(), this.activityPorts_, (0, _services.feUrl)('/optionsiframe'), (0, _services.feArgs)({
      'publicationId': deps.pageConfig().getPublicationId(),
      'productId': deps.pageConfig().getProductId(),
      'list': options && options.list || 'default',
      'skus': options && options.skus || null,
      'isClosable': true
    }),
    /* shouldFadeBody */
    false);
  }
  /**
   * Starts the offers flow or alreadySubscribed flow.
   * @return {!Promise}
   */


  _createClass(SubscribeOptionFlow, [{
    key: "start",
    value: function start() {
      var _this2 = this;

      // Start/cancel events.
      this.deps_.callbacks().triggerFlowStarted(_subscriptions.SubscriptionFlows.SHOW_SUBSCRIBE_OPTION);
      this.activityIframeView_.onCancel(function () {
        _this2.deps_.callbacks().triggerFlowCanceled(_subscriptions.SubscriptionFlows.SHOW_SUBSCRIBE_OPTION);
      });
      this.activityIframeView_.on(_api_messages.SubscribeResponse, this.maybeOpenOffersFlow_.bind(this));
      this.activityIframeView_.acceptResult().then(function (result) {
        var data = result.data;
        var response = new _api_messages.SubscribeResponse();

        if (data['subscribe']) {
          response.setSubscribe(true);
        }

        _this2.maybeOpenOffersFlow_(response);
      }, function (reason) {
        _this2.dialogManager_.completeView(_this2.activityIframeView_);

        throw reason;
      });
      this.eventManager_.logSwgEvent(_api_messages.AnalyticsEvent.IMPRESSION_CLICK_TO_SHOW_OFFERS);
      return this.dialogManager_.openView(this.activityIframeView_);
    }
    /**
     * @param {SubscribeResponse} response
     * @private
     */

  }, {
    key: "maybeOpenOffersFlow_",
    value: function maybeOpenOffersFlow_(response) {
      if (response.getSubscribe()) {
        var options = this.options_ || {};

        if (options.isClosable == undefined) {
          options.isClosable = OFFERS_VIEW_CLOSABLE;
        }

        this.eventManager_.logSwgEvent(_api_messages.AnalyticsEvent.ACTION_VIEW_OFFERS, true);
        new OffersFlow(this.deps_, options).start();
      }
    }
  }]);

  return SubscribeOptionFlow;
}();
/**
 * The class for Abbreviated Offer flow.
 *
 */


exports.SubscribeOptionFlow = SubscribeOptionFlow;

var AbbrvOfferFlow = /*#__PURE__*/function () {
  /**
   * @param {!./deps.DepsDef} deps
   * @param {!../api/subscriptions.OffersRequest=} options
   */
  function AbbrvOfferFlow(deps) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    _classCallCheck(this, AbbrvOfferFlow);

    /** @private @const {!./deps.DepsDef} */
    this.deps_ = deps;
    /** @private @const {!../api/subscriptions.OffersRequest|undefined} */

    this.options_ = options;
    /** @private @const {!Window} */

    this.win_ = deps.win();
    /** @private @const {!../components/activities.ActivityPorts} */

    this.activityPorts_ = deps.activities();
    /** @private @const {!../components/dialog-manager.DialogManager} */

    this.dialogManager_ = deps.dialogManager();
    /** @private @const {!../runtime/client-event-manager.ClientEventManager} */

    this.eventManager_ = deps.eventManager();
    /** @private @const {!ActivityIframeView} */

    this.activityIframeView_ = new _activityIframeView.ActivityIframeView(this.win_, this.activityPorts_, (0, _services.feUrl)('/abbrvofferiframe'), (0, _services.feArgs)({
      'publicationId': deps.pageConfig().getPublicationId(),
      'productId': deps.pageConfig().getProductId(),
      'showNative': deps.callbacks().hasSubscribeRequestCallback(),
      'list': options && options.list || 'default',
      'skus': options && options.skus || null,
      'isClosable': true
    }),
    /* shouldFadeBody */
    false);
  }
  /**
   * @param {AlreadySubscribedResponse} response
   * @private
   */


  _createClass(AbbrvOfferFlow, [{
    key: "handleLinkRequest_",
    value: function handleLinkRequest_(response) {
      if (response.getSubscriberOrMember()) {
        this.eventManager_.logSwgEvent(_api_messages.AnalyticsEvent.ACTION_ALREADY_SUBSCRIBED, true);
        this.deps_.callbacks().triggerLoginRequest({
          linkRequested: !!response.getLinkRequested()
        });
      }
    }
    /**
     * Starts the offers flow
     * @return {!Promise}
     */

  }, {
    key: "start",
    value: function start() {
      var _this3 = this;

      // Start/cancel events.
      this.deps_.callbacks().triggerFlowStarted(_subscriptions.SubscriptionFlows.SHOW_ABBRV_OFFER);
      this.activityIframeView_.onCancel(function () {
        _this3.deps_.callbacks().triggerFlowCanceled(_subscriptions.SubscriptionFlows.SHOW_ABBRV_OFFER);
      }); // If the user is already subscribed, trigger login flow

      this.activityIframeView_.on(_api_messages.AlreadySubscribedResponse, this.handleLinkRequest_.bind(this)); // If result is due to requesting offers, redirect to offers flow

      this.activityIframeView_.acceptResult().then(function (result) {
        if (result.data['viewOffers']) {
          var options = _this3.options_ || {};

          if (options.isClosable == undefined) {
            options.isClosable = OFFERS_VIEW_CLOSABLE;
          }

          _this3.eventManager_.logSwgEvent(_api_messages.AnalyticsEvent.ACTION_VIEW_OFFERS, true);

          new OffersFlow(_this3.deps_, options).start();
          return;
        }

        if (result.data['native']) {
          _this3.deps_.callbacks().triggerSubscribeRequest(); // The flow is complete.


          _this3.dialogManager_.completeView(_this3.activityIframeView_);

          return;
        }
      });
      this.eventManager_.logSwgEvent(_api_messages.AnalyticsEvent.IMPRESSION_CLICK_TO_SHOW_OFFERS_OR_ALREADY_SUBSCRIBED);
      return this.dialogManager_.openView(this.activityIframeView_);
    }
  }]);

  return AbbrvOfferFlow;
}();

exports.AbbrvOfferFlow = AbbrvOfferFlow;

},{"../api/subscriptions":13,"../proto/api_messages":33,"../ui/activity-iframe-view":64,"../utils/log":78,"./pay-flow":56,"./services":60}],55:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RedirectVerifierHelper = exports.PayClient = exports.PAY_ORIGIN = exports.PayOptionsDef = void 0;

var _payjs_async = require("../../third_party/gpay/src/payjs_async");

var _preconnect = require("../utils/preconnect");

var _bytes = require("../utils/bytes");

var _errors = require("../utils/errors");

var _services = require("./services");

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var REDIRECT_STORAGE_KEY = 'subscribe.google.com:rk';
/**
 * @typedef {{
 *   forceRedirect: (boolean|undefined),
 * }}
 */

var PayOptionsDef;
/**
 * @const {!Object<string, string>}
 * @package Visible for testing only.
 */

exports.PayOptionsDef = PayOptionsDef;
var PAY_ORIGIN = {
  'PRODUCTION': 'https://pay.google.com',
  'SANDBOX': 'https://pay.sandbox.google.com'
};
/** @return {string} */

exports.PAY_ORIGIN = PAY_ORIGIN;

function payUrl() {
  return (0, _services.feCached)(PAY_ORIGIN['SANDBOX'] + '/gp/p/ui/pay');
}
/**
 */


var PayClient = /*#__PURE__*/function () {
  /**
   * @param {!./deps.DepsDef} deps
   */
  function PayClient(deps) {
    _classCallCheck(this, PayClient);

    /** @private @const {!Window} */
    this.win_ = deps.win();
    /** @private @const {!../components/activities.ActivityPorts} */

    this.activityPorts_ = deps.activities();
    /** @private {?function(!Promise<!PaymentData>)} */

    this.responseCallback_ = null;
    /** @private {?PaymentDataRequest} */

    this.request_ = null;
    /** @private {?Promise<!PaymentData>} */

    this.response_ = null;
    /** @private @const {!./analytics-service.AnalyticsService} */

    this.analytics_ = deps.analytics();
    /** @private @const {!RedirectVerifierHelper} */

    this.redirectVerifierHelper_ = new RedirectVerifierHelper(this.win_);
    /** @private {?PaymentsAsyncClient} */

    this.client_ = null;
    /** @private @const {!Preconnect} */

    this.preconnect_ = new _preconnect.Preconnect(this.win_.document); // Prepare new verifier pair.

    this.redirectVerifierHelper_.prepare();
    /** @private @const {!./client-event-manager.ClientEventManager} */

    this.eventManager_ = deps.eventManager();
  }
  /**
   * @param {!PaymentOptions} options
   * @param {string} googleTransactionId
   * @param {function(!Promise<!PaymentData>)} handler
   * @return {!PaymentsAsyncClient}
   * @private
   */


  _createClass(PayClient, [{
    key: "createClient_",
    value: function createClient_(options, googleTransactionId, handler) {
      // Assign Google Transaction ID to PaymentsAsyncClient.googleTransactionId_
      // so it can be passed to gpay_async.js and stored in payment clearcut log.
      _payjs_async.PaymentsAsyncClient.googleTransactionId_ = googleTransactionId;
      return new _payjs_async.PaymentsAsyncClient(options, handler,
      /* useIframe */
      false, this.activityPorts_.getOriginalWebActivityPorts());
    }
    /**
     * @param {!../utils/preconnect.Preconnect} pre
     */

  }, {
    key: "preconnect",
    value: function preconnect(pre) {
      pre.prefetch(payUrl());
      pre.prefetch('https://payments.google.com/payments/v4/js/integrator.js?ss=md');
      pre.prefetch('https://clients2.google.com/gr/gr_full_2.0.6.js');
    }
    /**
     * @return {string}
     */

  }, {
    key: "getType",
    value: function getType() {
      // TODO(alin04): remove once all references removed.
      return 'PAYJS';
    }
    /**
     * @param {!PaymentDataRequest} paymentRequest
     * @param {!PayOptionsDef=} options
     */

  }, {
    key: "start",
    value: function start(paymentRequest) {
      var _this = this;

      var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      this.request_ = paymentRequest;

      if (!this.client_) {
        this.preconnect(this.preconnect_);
        this.client_ = this.createClient_(
        /** @type {!PaymentOptions} */
        {
          environment: 'SANDBOX',
          'i': {
            'redirectKey': this.redirectVerifierHelper_.restoreKey()
          }
        }, this.analytics_.getTransactionId(), this.handleResponse_.bind(this));
      }

      if (options.forceRedirect) {
        paymentRequest = Object.assign(paymentRequest, {
          'forceRedirect': options.forceRedirect || false
        });
      }

      setInternalParam(paymentRequest, 'disableNative', // The page cannot be iframed at this time. May be relaxed later
      // for AMP and similar contexts.
      this.win_ != this.top_());
      var resolver = null;
      var promise = new Promise(function (resolve) {
        return resolver = resolve;
      }); // Notice that the callback for verifier may execute asynchronously.

      this.redirectVerifierHelper_.useVerifier(function (verifier) {
        if (verifier) {
          setInternalParam(paymentRequest, 'redirectVerifier', verifier);
        }

        if (options.forceRedirect) {
          var client = _this.client_;

          _this.eventManager_.getReadyPromise().then(function () {
            _this.analytics_.getLoggingPromise().then(function () {
              client.loadPaymentData(paymentRequest);
              resolver(true);
            });
          });
        } else {
          _this.client_.loadPaymentData(paymentRequest);

          resolver(true);
        }
      });
      return promise;
    }
    /**
     * @param {function(!Promise<!PaymentData>)} callback
     */

  }, {
    key: "onResponse",
    value: function onResponse(callback) {
      var _this2 = this;

      this.responseCallback_ = callback;
      var response = this.response_;

      if (response) {
        Promise.resolve().then(function () {
          if (response) {
            callback(_this2.convertResponse_(response, _this2.request_));
          }
        });
      }
    }
    /**
     * @param {!Promise<!PaymentData>} responsePromise
     * @private
     */

  }, {
    key: "handleResponse_",
    value: function handleResponse_(responsePromise) {
      this.response_ = responsePromise;

      if (this.responseCallback_) {
        this.responseCallback_(this.convertResponse_(this.response_, this.request_));
      }
    }
    /**
     * @param {!Promise<!PaymentData>} response
     * @param {?PaymentDataRequest} request
     * @return {!Promise<!PaymentData>}
     * @private
     */

  }, {
    key: "convertResponse_",
    value: function convertResponse_(response, request) {
      var _this3 = this;

      return response.then( // Temporary client side solution to remember the
      // input params. TODO: Remove this once server-side
      // input preservation is done and is part of the response.
      function (res) {
        if (request) {
          res['paymentRequest'] = request;
        }

        return res;
      })["catch"](function (reason) {
        if (_typeof(reason) == 'object' && reason['statusCode'] == 'CANCELED') {
          var error = (0, _errors.createCancelError)(_this3.win_);

          if (request) {
            error['productType'] =
            /** @type {!PaymentDataRequest} */
            request['i']['productType'];
          } else {
            error['productType'] = null;
          }

          return Promise.reject(error);
        }

        return Promise.reject(reason);
      });
    }
    /**
     * @return {!Window}
     * @private
     */

  }, {
    key: "top_",
    value: function top_() {
      // Only exists for testing since it's not possible to override `window.top`.
      return this.win_.top;
    }
  }]);

  return PayClient;
}();
/**
 * @typedef {{
 *   key: string,
 *   verifier: string,
 * }}
 */


exports.PayClient = PayClient;
var RedirectVerifierPairDef;
/**
 * This helper generates key/verifier pair for the redirect mode. When the
 * redirect mode is used, the encrypted payload is returned via nivigation URL.
 * This payload need to be decrypted and to avoid session fixation attacks, a
 * verifier has to be used. This redirect verifier is not the only session
 * verifier in use: we also use GAIA. However, we have to fallback to this
 * verifier when GAIA is not available.
 *
 * @package Visible for testing only.
 */

var RedirectVerifierHelper = /*#__PURE__*/function () {
  /**
   * @param {!Window} win
   */
  function RedirectVerifierHelper(win) {
    _classCallCheck(this, RedirectVerifierHelper);

    /** @private @const {!Window} */
    this.win_ = win;
    /** @private {boolean} */

    this.pairCreated_ = false;
    /** @private {?RedirectVerifierPairDef} */

    this.pair_ = null;
    /** @private {?Promise<?RedirectVerifierPairDef>} */

    this.pairPromise_ = null;
  }
  /**
   * To avoid popup blockers, the key/verifier pair is created as soon as
   * possible.
   * @return {?Promise}
   */


  _createClass(RedirectVerifierHelper, [{
    key: "prepare",
    value: function prepare() {
      return this.getOrCreatePair_(function () {});
    }
    /**
     * Calls the provided callback with the generated redirect verifier. This
     * API is sync/async, which is a big anti-pattern. However, it's necessary
     * to reduce the risk of popup blockers. If the verifier is already available
     * (see `prepare` method), the callback will be called immediately and thus
     * in the same event loop as the user action.
     *
     * The return verifier could be `null`. This could mean either that its
     * generation failed, or if the platform doesn't support necessary APIs, such
     * as Web Crypto. The redirect can still proceed and try to fallback on GAIA
     * as a redirect verifier. The set of platforms where GAIA is not available
     * and the redirect verifier cannot be created is negligible.
     *
     * The key corresponding to the returned verifier is stored in the session
     * storage and can be later restored using `restoreKey` method.
     *
     * @param {function(?string)} callback
     */

  }, {
    key: "useVerifier",
    value: function useVerifier(callback) {
      var _this4 = this;

      this.getOrCreatePair_(function (pair) {
        if (pair) {
          try {
            _this4.win_.localStorage.setItem(REDIRECT_STORAGE_KEY, pair.key);
          } catch (e) {
            // If storage has failed, there's no point in using the verifer.
            // However, there are other ways to recover the redirect, so it's
            // not necessarily a fatal condition.
            pair = null;
          }
        }

        callback(pair && pair.verifier || null);
      });
    }
    /**
     * Restores the redirect key from the session storage. The key may be null.
     * @return {?string}
     */

  }, {
    key: "restoreKey",
    value: function restoreKey() {
      try {
        return this.win_.localStorage && this.win_.localStorage.getItem(REDIRECT_STORAGE_KEY) || null;
      } catch (e) {
        return null;
      }
    }
    /**
     * @param {function(?RedirectVerifierPairDef)} callback
     * @return {?Promise}
     * @private
     */

  }, {
    key: "getOrCreatePair_",
    value: function getOrCreatePair_(callback) {
      this.createPair_();

      if (this.pairCreated_) {
        // Already created.
        callback(this.pair_);
      } else if (this.pairPromise_) {
        // Otherwise wait for it to be created.
        this.pairPromise_.then(function (pair) {
          return callback(pair);
        });
      }

      return this.pairPromise_;
    }
    /**
     * @private
     */

  }, {
    key: "createPair_",
    value: function createPair_() {
      var _this5 = this;

      // Either already created or already started.
      if (this.pairCreated_ || this.pairPromise_) {
        return;
      } // Check that the platform can fully support verification. That means
      // that it's expected to implement the following APIs:
      // a. Local storage (localStorage);
      // b. WebCrypto (crypto.subtle);
      // c. Crypto random (crypto.getRandomValues);
      // d. SHA284 (crypto.subtle.digest).


      var supportsLocalStorage;

      try {
        supportsLocalStorage = !!this.win_.localStorage;
      } catch (e) {
        // Note: This can happen when cookies are disabled.
        supportsLocalStorage = false;
      }

      var crypto = this.win_.crypto;

      if (supportsLocalStorage && crypto && crypto.getRandomValues && crypto.subtle && crypto.subtle.digest) {
        this.pairPromise_ = new Promise(function (resolve, reject) {
          // 1. Use crypto random to create a 128-bit (16 byte) redirect key.
          var keyBytes = new Uint8Array(16);
          crypto.getRandomValues(keyBytes); // 2. Encode key as base64.

          var key = btoa((0, _bytes.bytesToString)(keyBytes)); // 3. Create a hash.

          crypto.subtle.digest({
            name: 'SHA-384'
          }, (0, _bytes.stringToBytes)(key)).then(function (buffer) {
            var verifier = btoa((0, _bytes.bytesToString)(new Uint8Array(
            /** @type {!ArrayBuffer} */
            buffer)));
            resolve({
              key: key,
              verifier: verifier
            });
          }, function (reason) {
            reject(reason);
          });
        })["catch"](function () {
          // Ignore failures. A failure to create a redirect verifier is often
          // recoverable.
          return null;
        }).then(function (pair) {
          _this5.pairCreated_ = true;
          _this5.pair_ = pair;
          return pair;
        });
      } else {
        // Not supported.
        this.pairCreated_ = true;
        this.pair_ = null;
      }
    }
  }]);

  return RedirectVerifierHelper;
}();
/**
 * @param {!PaymentDataRequest} paymentRequest
 * @param {string} param
 * @param {*} value
 */


exports.RedirectVerifierHelper = RedirectVerifierHelper;

function setInternalParam(paymentRequest, param, value) {
  paymentRequest['i'] = Object.assign(paymentRequest['i'] || {}, _defineProperty({}, param, value));
}

},{"../../third_party/gpay/src/payjs_async":91,"../utils/bytes":69,"../utils/errors":74,"../utils/preconnect":80,"./services":60}],56:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.parseSubscriptionResponse = parseSubscriptionResponse;
exports.parseUserData = parseUserData;
exports.parseEntitlements = parseEntitlements;
exports.PayCompleteFlow = exports.PayStartFlow = exports.RecurrenceMapping = exports.ReplaceSkuProrationModeMapping = void 0;

var _api_messages = require("../proto/api_messages");

var _activityIframeView = require("../ui/activity-iframe-view");

var _jwt = require("../utils/jwt");

var _subscriptions = require("../api/subscriptions");

var _subscribeResponse = require("../api/subscribe-response");

var _userData = require("../api/user-data");

var _services = require("./services");

var _json = require("../utils/json");

var _errors = require("../utils/errors");

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

/**
 * String values input by the publisher are mapped to the number values.
 * @type {!Object<string, number>}
 */
var ReplaceSkuProrationModeMapping = {
  // The replacement takes effect immediately, and the remaining time will
  // be prorated and credited to the user. This is the current default
  // behavior.
  'IMMEDIATE_WITH_TIME_PRORATION': 1
};
exports.ReplaceSkuProrationModeMapping = ReplaceSkuProrationModeMapping;
var RecurrenceMapping = {
  'AUTO': 1,
  'ONE_TIME': 2
};
/**
 * @param {string} sku
 * @return {!EventParams}
 */

exports.RecurrenceMapping = RecurrenceMapping;

function getEventParams(sku) {
  return new _api_messages.EventParams([,,,, sku]);
}
/**
 * The flow to initiate payment process.
 */


var PayStartFlow = /*#__PURE__*/function () {
  /**
   * @param {!./deps.DepsDef} deps
   * @param {!../api/subscriptions.SubscriptionRequest} subscriptionRequest
   * @param {!../api/subscriptions.ProductType} productType
   */
  function PayStartFlow(deps, subscriptionRequest) {
    var productType = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : _subscriptions.ProductType.SUBSCRIPTION;

    _classCallCheck(this, PayStartFlow);

    /** @private @const {!./deps.DepsDef} */
    this.deps_ = deps;
    /** @private @const {!./pay-client.PayClient} */

    this.payClient_ = deps.payClient();
    /** @private @const {!../model/page-config.PageConfig} */

    this.pageConfig_ = deps.pageConfig();
    /** @private @const {!../components/dialog-manager.DialogManager} */

    this.dialogManager_ = deps.dialogManager();
    /** @private @const {!../api/subscriptions.SubscriptionRequest} */

    this.subscriptionRequest_ = subscriptionRequest;
    /**@private @const {!ProductType} */

    this.productType_ = productType;
    /** @private @const {!../runtime/analytics-service.AnalyticsService} */

    this.analyticsService_ = deps.analytics();
    /** @private @const {!../runtime/client-event-manager.ClientEventManager} */

    this.eventManager_ = deps.eventManager();
  }
  /**
   * Starts the payments flow.
   * @return {!Promise}
   */


  _createClass(PayStartFlow, [{
    key: "start",
    value: function start() {
      // Add the 'publicationId' key to the subscriptionRequest_ object.
      var swgPaymentRequest = Object.assign({}, this.subscriptionRequest_, {
        'publicationId': this.pageConfig_.getPublicationId()
      }); // Map the proration mode to the enum value (if proration exists).

      var prorationMode = swgPaymentRequest['replaceSkuProrationMode'];

      if (prorationMode) {
        swgPaymentRequest['replaceSkuProrationMode'] = ReplaceSkuProrationModeMapping[prorationMode];
      } else if (swgPaymentRequest['oldSku']) {
        swgPaymentRequest['replaceSkuProrationMode'] = ReplaceSkuProrationModeMapping['IMMEDIATE_WITH_TIME_PRORATION'];
      } // Assign one-time recurrence enum if applicable


      if (swgPaymentRequest['oneTime']) {
        swgPaymentRequest['paymentRecurrence'] = RecurrenceMapping['ONE_TIME'];
        delete swgPaymentRequest['oneTime'];
      } // Start/cancel events.


      var flow = this.productType_ == _subscriptions.ProductType.UI_CONTRIBUTION ? _subscriptions.SubscriptionFlows.CONTRIBUTE : _subscriptions.SubscriptionFlows.SUBSCRIBE;
      this.deps_.callbacks().triggerFlowStarted(flow, this.subscriptionRequest_);

      if (swgPaymentRequest['oldSku']) {
        this.analyticsService_.setSku(swgPaymentRequest['oldSku']);
      }

      this.eventManager_.logSwgEvent(_api_messages.AnalyticsEvent.ACTION_PAYMENT_FLOW_STARTED, true, getEventParams(swgPaymentRequest['skuId']));
      PayCompleteFlow.waitingForPayClient_ = true;
      this.payClient_.start(
      /** @type {!PaymentDataRequest} */
      {
        'apiVersion': 1,
        'allowedPaymentMethods': ['CARD'],
        'environment': 'SANDBOX',
        'playEnvironment': 'STAGING',
        'swg': swgPaymentRequest,
        'i': {
          'startTimeMs': Date.now(),
          'productType': this.productType_
        }
      }, {
        forceRedirect: this.deps_.config().windowOpenMode == _subscriptions.WindowOpenMode.REDIRECT
      });
      return Promise.resolve();
    }
  }]);

  return PayStartFlow;
}();
/**
 * The flow for successful payments completion.
 */


exports.PayStartFlow = PayStartFlow;

var PayCompleteFlow = /*#__PURE__*/function () {
  _createClass(PayCompleteFlow, null, [{
    key: "configurePending",

    /**
     * @param {!./deps.DepsDef} deps
     */
    value: function configurePending(deps) {
      /** @const @type {./client-event-manager.ClientEventManager} */
      var eventManager = deps.eventManager();
      deps.payClient().onResponse(function (payPromise) {
        deps.entitlementsManager().blockNextNotification();
        var flow = new PayCompleteFlow(deps);
        var promise = validatePayResponse(deps, payPromise, flow.complete.bind(flow));
        deps.callbacks().triggerPaymentResponse(promise);
        return promise.then(function (response) {
          var sku = parseSkuFromPurchaseDataSafe(response.purchaseData);
          deps.analytics().setSku(sku || '');
          eventManager.logSwgEvent(_api_messages.AnalyticsEvent.ACTION_PAYMENT_COMPLETE, true, getEventParams(sku || ''));
          flow.start(response);
        }, function (reason) {
          if ((0, _errors.isCancelError)(reason)) {
            var productType =
            /** @type {!Object} */
            reason['productType'];

            var _flow = productType == _subscriptions.ProductType.UI_CONTRIBUTION ? _subscriptions.SubscriptionFlows.CONTRIBUTE : _subscriptions.SubscriptionFlows.SUBSCRIBE;

            deps.callbacks().triggerFlowCanceled(_flow);
            deps.eventManager().logSwgEvent(_api_messages.AnalyticsEvent.ACTION_USER_CANCELED_PAYFLOW, true);
          } else {
            deps.eventManager().logSwgEvent(_api_messages.AnalyticsEvent.EVENT_PAYMENT_FAILED, false);
            deps.jserror().error('Pay failed', reason);
            throw reason;
          }
        });
      });
    }
    /**
     * @param {!./deps.DepsDef} deps
     */

  }]);

  function PayCompleteFlow(deps) {
    _classCallCheck(this, PayCompleteFlow);

    /** @private @const {!Window} */
    this.win_ = deps.win();
    /** @private @const {!./deps.DepsDef} */

    this.deps_ = deps;
    /** @private @const {!../components/activities.ActivityPorts} */

    this.activityPorts_ = deps.activities();
    /** @private @const {!../components/dialog-manager.DialogManager} */

    this.dialogManager_ = deps.dialogManager();
    /** @private {?ActivityIframeView} */

    this.activityIframeView_ = null;
    /** @private {?SubscribeResponse} */

    this.response_ = null;
    /** @private {?Promise} */

    this.readyPromise_ = null;
    /** @private @const {!../runtime/analytics-service.AnalyticsService} */

    this.analyticsService_ = deps.analytics();
    /** @private @const {!../runtime/client-event-manager.ClientEventManager} */

    this.eventManager_ = deps.eventManager();
    /** @private {?string} */

    this.sku_ = null;
  }
  /**
   * Starts the payments completion flow.
   * @param {!SubscribeResponse} response
   * @return {!Promise}
   */


  _createClass(PayCompleteFlow, [{
    key: "start",
    value: function start(response) {
      var _this = this;

      this.sku_ = parseSkuFromPurchaseDataSafe(response.purchaseData);
      this.eventManager_.logSwgEvent(_api_messages.AnalyticsEvent.IMPRESSION_ACCOUNT_CHANGED, true, getEventParams(this.sku_ || ''));
      this.deps_.entitlementsManager().reset(true);
      this.response_ = response; // TODO(dianajing): future-proof isOneTime flag

      var args = {
        'publicationId': this.deps_.pageConfig().getPublicationId(),
        'productType': this.response_['productType'],
        'isSubscriptionUpdate': !!this.response_['oldSku'],
        'isOneTime': !!this.response_['paymentRecurrence']
      }; // TODO(dvoytenko, #400): cleanup once entitlements is launched everywhere.

      if (response.userData && response.entitlements) {
        args['idToken'] = response.userData.idToken;
        this.deps_.entitlementsManager().pushNextEntitlements(response.entitlements.raw);
      } else {
        args['loginHint'] = response.userData && response.userData.email;
      }

      this.activityIframeView_ = new _activityIframeView.ActivityIframeView(this.win_, this.activityPorts_, (0, _services.feUrl)('/payconfirmiframe'), (0, _services.feArgs)(args),
      /* shouldFadeBody */
      true);
      this.activityIframeView_.on(_api_messages.EntitlementsResponse, this.handleEntitlementsResponse_.bind(this));
      this.activityIframeView_.acceptResult().then(function () {
        // The flow is complete.
        _this.dialogManager_.completeView(_this.activityIframeView_);
      });
      this.readyPromise_ = this.dialogManager_.openView(this.activityIframeView_);
      return this.readyPromise_;
    }
    /**
     * @param {!EntitlementsResponse} response
     * @private
     */

  }, {
    key: "handleEntitlementsResponse_",
    value: function handleEntitlementsResponse_(response) {
      var jwt = response.getJwt();

      if (jwt) {
        this.deps_.entitlementsManager().pushNextEntitlements(jwt);
      }
    }
    /**
     * @return {!Promise}
     */

  }, {
    key: "complete",
    value: function complete() {
      var _this2 = this;

      this.eventManager_.logSwgEvent(_api_messages.AnalyticsEvent.ACTION_ACCOUNT_CREATED, true, getEventParams(this.sku_ || ''));
      this.deps_.entitlementsManager().unblockNextNotification();
      this.readyPromise_.then(function () {
        var accountCompletionRequest = new _api_messages.AccountCreationRequest();
        accountCompletionRequest.setComplete(true);

        _this2.activityIframeView_.execute(accountCompletionRequest);
      });
      return this.activityIframeView_.acceptResult()["catch"](function () {// Ignore errors.
      }).then(function () {
        _this2.eventManager_.logSwgEvent(_api_messages.AnalyticsEvent.ACTION_ACCOUNT_ACKNOWLEDGED, true, getEventParams(_this2.sku_ || ''));

        _this2.deps_.entitlementsManager().setToastShown(true);
      });
    }
  }]);

  return PayCompleteFlow;
}();
/** @private {boolean} */


exports.PayCompleteFlow = PayCompleteFlow;
PayCompleteFlow.waitingForPayClient_ = false;
/**
 * @param {!./deps.DepsDef} deps
 * @param {!Promise<!Object>} payPromise
 * @param {function():!Promise} completeHandler
 * @return {!Promise<!SubscribeResponse>}
 */

function validatePayResponse(deps, payPromise, completeHandler) {
  var wasRedirect = !PayCompleteFlow.waitingForPayClient_;
  PayCompleteFlow.waitingForPayClient_ = false;
  return payPromise.then(function (data) {
    // 1) We log against a random TX ID which is how we track a specific user
    //    anonymously.
    // 2) If there was a redirect to gPay, we may have lost our stored TX ID.
    // 3) Pay service is supposed to give us the TX ID it logged against.
    var eventType = _api_messages.AnalyticsEvent.UNKNOWN;
    var eventParams = undefined;

    if (_typeof(data) !== 'object' || !data['googleTransactionId']) {
      // If gPay doesn't give us a TX ID it means that something may
      // be wrong.  If we previously logged then we are at least continuing to
      // log against the same TX ID.  If we didn't previously log then we have
      // lost all connection to the events that preceded the payment event and
      // we at least want to know why that data was lost.
      eventParams = new _api_messages.EventParams();
      eventParams.setHadLogged(!wasRedirect);
      eventType = _api_messages.AnalyticsEvent.EVENT_GPAY_NO_TX_ID;
    } else {
      var oldTxId = deps.analytics().getTransactionId();
      var newTxId = data['googleTransactionId'];

      if (wasRedirect) {
        // This is the expected case for full redirects.  It may be happening
        // unexpectedly at other times too though and we want to be aware of
        // it if it does.
        deps.analytics().setTransactionId(newTxId);
        eventType = _api_messages.AnalyticsEvent.EVENT_GPAY_CANNOT_CONFIRM_TX_ID;
      } else {
        if (oldTxId === newTxId) {
          // This is the expected case for non-redirect pay events
          eventType = _api_messages.AnalyticsEvent.EVENT_CONFIRM_TX_ID;
        } else {
          // This is an unexpected case: gPay rejected our TX ID and created
          // its own.  Log the gPay TX ID but keep our logging consistent.
          eventParams = new _api_messages.EventParams();
          eventParams.setGpayTransactionId(newTxId);
          eventType = _api_messages.AnalyticsEvent.EVENT_CHANGED_TX_ID;
        }
      }
    }

    deps.eventManager().logSwgEvent(eventType, true, eventParams);
    return parseSubscriptionResponse(deps, data, completeHandler);
  });
}
/**
 * @param {!./deps.DepsDef} deps
 * @param {*} data
 * @param {function():!Promise} completeHandler
 * @return {!SubscribeResponse}
 */


function parseSubscriptionResponse(deps, data, completeHandler) {
  var swgData = null;
  var raw = null;
  var productType = _subscriptions.ProductType.SUBSCRIPTION;
  var oldSku = null;
  var paymentRecurrence = null;

  if (data) {
    if (typeof data == 'string') {
      raw =
      /** @type {string} */
      data;
    } else {
      // Assume it's a json object in the format:
      // `{integratorClientCallbackData: "..."}` or `{swgCallbackData: "..."}`.
      var json =
      /** @type {!Object} */
      data;

      if ('swgCallbackData' in json) {
        swgData =
        /** @type {!Object} */
        json['swgCallbackData'];
      } else if ('integratorClientCallbackData' in json) {
        raw = json['integratorClientCallbackData'];
      }

      if ('paymentRequest' in data) {
        oldSku = (data['paymentRequest']['swg'] || {})['oldSku'];
        paymentRecurrence = (data['paymentRequest']['swg'] || {})['paymentRecurrence'];
        productType = (data['paymentRequest']['i'] || {})['productType'] || _subscriptions.ProductType.SUBSCRIPTION;
      }
    }
  }

  if (raw && !swgData) {
    raw = atob(raw);

    if (raw) {
      var parsed = (0, _json.parseJson)(raw);
      swgData = parsed['swgCallbackData'];
    }
  }

  if (!swgData) {
    throw new Error('unexpected payment response');
  }

  raw = JSON.stringify(
  /** @type {!JsonObject} */
  swgData);
  return new _subscribeResponse.SubscribeResponse(raw, parsePurchaseData(swgData), parseUserData(swgData), parseEntitlements(deps, swgData), productType, completeHandler, oldSku, paymentRecurrence);
}
/**
 * @param {!Object} swgData
 * @return {!PurchaseData}
 */


function parsePurchaseData(swgData) {
  var raw = swgData['purchaseData'];
  var signature = swgData['purchaseDataSignature'];
  return new _subscribeResponse.PurchaseData(raw, signature);
}
/**
 * @param {!Object} swgData
 * @return {?UserData}
 * @package Visible for testing.
 */


function parseUserData(swgData) {
  var idToken = swgData['idToken'];

  if (!idToken) {
    return null;
  }

  var jwt =
  /** @type {!Object} */
  new _jwt.JwtHelper().decode(idToken);
  return new _userData.UserData(idToken, jwt);
}
/**
 * @param {!./deps.DepsDef} deps
 * @param {!Object} swgData
 * @return {?../api/entitlements.Entitlements}
 * @package Visible for testing.
 */


function parseEntitlements(deps, swgData) {
  if (swgData['signedEntitlements']) {
    return deps.entitlementsManager().parseEntitlements(swgData);
  }

  return null;
}
/**
 * @param {!PurchaseData} purchaseData
 * @return {?string}
 */


function parseSkuFromPurchaseDataSafe(purchaseData) {
  return (
    /** @type {?string} */
    (0, _json.getPropertyFromJsonString)(purchaseData.raw, 'productId') || null
  );
}

},{"../api/subscribe-response":12,"../api/subscriptions":13,"../api/user-data":14,"../proto/api_messages":33,"../ui/activity-iframe-view":64,"../utils/errors":74,"../utils/json":76,"../utils/jwt":77,"./services":60}],57:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PropensityServer = void 0;

var _api_messages = require("../proto/api_messages");

var _url = require("../utils/url");

var _services = require("./services");

var _eventTypeMapping = require("./event-type-mapping");

var _types = require("../utils/types");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

/**
 * Implements interface to Propensity server
 */
var PropensityServer = /*#__PURE__*/function () {
  /**
   * Page configuration is known when Propensity API
   * is available, publication ID is therefore used
   * in constructor for the server interface.
   * @param {!Window} win
   * @param {!./deps.DepsDef} deps
   * @param {!./fetcher.Fetcher} fetcher
   */
  function PropensityServer(win, deps, fetcher) {
    _classCallCheck(this, PropensityServer);

    /** @private @const {!Window} */
    this.win_ = win;
    /** @private @const {!./deps.DepsDef} */

    this.deps_ = deps;
    /** @private @const {string} */

    this.publicationId_ = this.deps_.pageConfig().getPublicationId();
    /** @private {?string} */

    this.clientId_ = null;
    /** @private @const {!./fetcher.Fetcher} */

    this.fetcher_ = fetcher;
    /** @private @const {number} */

    this.version_ = 1;
    this.deps_.eventManager().registerEventListener(this.handleClientEvent_.bind(this));
  }
  /**
   * @private
   * @return {string}
   */


  _createClass(PropensityServer, [{
    key: "getDocumentCookie_",
    value: function getDocumentCookie_() {
      return this.win_.document.cookie;
    }
    /**
     * Returns the client ID to be used.
     * @return {?string}
     * @private
     */

  }, {
    key: "getClientId_",
    value: function getClientId_() {
      if (!this.clientId_) {
        // Match '__gads' (name of the cookie) dropped by Ads Tag.
        var gadsmatch = this.getDocumentCookie_().match('(^|;)\\s*__gads\\s*=\\s*([^;]+)'); // Since the cookie will be consumed using decodeURIComponent(),
        // use encodeURIComponent() here to match.

        this.clientId_ = gadsmatch && encodeURIComponent(gadsmatch.pop());
      }

      return this.clientId_;
    }
    /**
     * @private
     * @param {string} url
     * @return {string}
     */

  }, {
    key: "propensityUrl_",
    value: function propensityUrl_(url) {
      url = (0, _url.addQueryParam)(url, 'u_tz', '240');
      url = (0, _url.addQueryParam)(url, 'v', String(this.version_));
      var clientId = this.getClientId_();

      if (clientId) {
        url = (0, _url.addQueryParam)(url, 'cookie', clientId);
      }

      url = (0, _url.addQueryParam)(url, 'cdm', this.win_.location.hostname);
      return url;
    }
    /**
     * @param {string} state
     * @param {?string} productsOrSkus
     */

  }, {
    key: "sendSubscriptionState",
    value: function sendSubscriptionState(state, productsOrSkus) {
      var init =
      /** @type {!../utils/xhr.FetchInitDef} */
      {
        method: 'GET',
        credentials: 'include'
      };
      var url = (0, _services.adsUrl)('/subopt/data');
      url = (0, _url.addQueryParam)(url, 'states', this.publicationId_ + ':' + state);

      if (productsOrSkus) {
        url = (0, _url.addQueryParam)(url, 'extrainfo', productsOrSkus);
      }

      return this.fetcher_.fetch(this.propensityUrl_(url), init);
    }
    /**
     * @param {string} event
     * @param {?string} context
     * @private
     */

  }, {
    key: "sendEvent_",
    value: function sendEvent_(event, context) {
      var init =
      /** @type {!../utils/xhr.FetchInitDef} */
      {
        method: 'GET',
        credentials: 'include'
      };
      var url = (0, _services.adsUrl)('/subopt/data');
      url = (0, _url.addQueryParam)(url, 'events', this.publicationId_ + ':' + event);

      if (context) {
        url = (0, _url.addQueryParam)(url, 'extrainfo', context);
      }

      return this.fetcher_.fetch(this.propensityUrl_(url), init);
    }
    /**
     *
     * @param {!../api/client-event-manager-api.ClientEvent} event
     */

  }, {
    key: "handleClientEvent_",
    value: function handleClientEvent_(event) {
      /**
       * Does a live check of the config because we don't know when publisher
       * called to enable (it may be after a consent dialog).
       */
      if (!this.deps_.config().enablePropensity && event.eventOriginator !== _api_messages.EventOriginator.PROPENSITY_CLIENT) {
        return;
      }

      if (event.eventType === _api_messages.AnalyticsEvent.EVENT_SUBSCRIPTION_STATE) {
        this.sendSubscriptionState(event.additionalParameters['state'], event.additionalParameters['productsOrSkus']);
        return;
      }

      var propEvent = (0, _eventTypeMapping.analyticsEventToPublisherEvent)(event.eventType);

      if (propEvent == null) {
        return;
      }

      var additionalParameters = event.additionalParameters; // The EventParams object is private to SwG analytics.  Do not send.

      if (additionalParameters instanceof _api_messages.EventParams) {
        additionalParameters = undefined;
      }

      if ((0, _types.isBoolean)(event.isFromUserAction)) {
        if (!(0, _types.isObject)(additionalParameters)) {
          additionalParameters = {};
        }

        additionalParameters['is_active'] = event.isFromUserAction;
      }

      this.sendEvent_(propEvent, JSON.stringify(
      /** @type {?JsonObject} */
      additionalParameters));
    }
    /**
     * @param {JsonObject} response
     * @return {!../api/propensity-api.PropensityScore}
     */

  }, {
    key: "parsePropensityResponse_",
    value: function parsePropensityResponse_(response) {
      var defaultScore =
      /** @type {!../api/propensity-api.PropensityScore} */
      {};

      if (!response['header']) {
        defaultScore =
        /** @type {!../api/propensity-api.PropensityScore} */
        {
          header: {
            ok: false
          },
          body: {
            error: 'No valid response'
          }
        };
        return defaultScore;
      }

      var status = response['header'];
      var scoreDetails = undefined;

      if (status['ok']) {
        var scores = response['scores'];
        scoreDetails = [];

        for (var i = 0; i < scores.length; i++) {
          var result = scores[i];
          var scoreStatus = !!result['score'];
          var scoreDetail = void 0;

          if (scoreStatus) {
            var value =
            /** @type {!../api/propensity-api.Score} */
            {
              value: result['score'],
              bucketed: result['score_type'] == 2
            };
            scoreDetail =
            /** @type {!../api/propensity-api.Body} */
            {
              product: result['product'],
              score: value
            };
          } else {
            scoreDetail =
            /** @type {!../api/propensity-api.Body} */
            {
              product: result['product'],
              error: result['error_message']
            };
          }

          scoreDetails.push(scoreDetail);
        }

        if (scoreDetails) {
          defaultScore =
          /** @type {!../api/propensity-api.PropensityScore} */
          {
            header: {
              ok: true
            },
            body: {
              scores: scoreDetails
            }
          };
        }

        return defaultScore;
      }

      defaultScore =
      /** @type {!../api/propensity-api.PropensityScore} */
      {
        header: {
          ok: false
        },
        body: {
          error: response['error']
        }
      };
      return defaultScore;
    }
    /**
     * @param {string} referrer
     * @param {string} type
     * @return {?Promise<../api/propensity-api.PropensityScore>}
     */

  }, {
    key: "getPropensity",
    value: function getPropensity(referrer, type) {
      var _this = this;

      var init =
      /** @type {!../utils/xhr.FetchInitDef} */
      {
        method: 'GET',
        credentials: 'include'
      };
      var url = (0, _services.adsUrl)('/subopt/pts?products=') + this.publicationId_ + '&type=' + type + '&ref=' + referrer;
      return this.fetcher_.fetch(this.propensityUrl_(url), init).then(function (result) {
        return result.json();
      }).then(function (response) {
        return _this.parsePropensityResponse_(response);
      });
    }
  }]);

  return PropensityServer;
}();

exports.PropensityServer = PropensityServer;

},{"../proto/api_messages":33,"../utils/types":84,"../utils/url":85,"./event-type-mapping":42,"./services":60}],58:[function(require,module,exports){
"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Propensity = void 0;

var PropensityApi = _interopRequireWildcard(require("../api/propensity-api"));

var _loggerApi = require("../api/logger-api");

var _api_messages = require("../proto/api_messages");

var _propensityServer = require("./propensity-server");

var _types = require("../utils/types");

var _eventTypeMapping = require("./event-type-mapping");

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

/**
 * @implements {PropensityApi.PropensityApi}
 */
var Propensity = /*#__PURE__*/function () {
  /**
   * @param {!Window} win
   * @param {!./deps.DepsDef} deps
   * @param {!./fetcher.Fetcher} fetcher
   *
   * IMPORTANT: deps may not be full initialized config and pageConfig are
   * available immediately, other function should be gated on a ready promise.
   * #TODO(jpettitt) switch refactor to take out the win and use deps to get win
   */
  function Propensity(win, deps, fetcher) {
    _classCallCheck(this, Propensity);

    /** @private @const {!Window} */
    this.win_ = win;
    /** @private {PropensityServer} */

    this.propensityServer_ = new _propensityServer.PropensityServer(win, deps, fetcher);
    /** @private @const {!../api/client-event-manager-api.ClientEventManagerApi} */

    this.eventManager_ = deps.eventManager();
  }
  /** @override */


  _createClass(Propensity, [{
    key: "sendSubscriptionState",
    value: function sendSubscriptionState(state, jsonProducts) {
      if (!Object.values(_loggerApi.SubscriptionState).includes(state)) {
        throw new Error('Invalid subscription state provided');
      }

      if ((_loggerApi.SubscriptionState.SUBSCRIBER == state || _loggerApi.SubscriptionState.PAST_SUBSCRIBER == state) && !jsonProducts) {
        throw new Error('Entitlements must be provided for users with' + ' active or expired subscriptions');
      }

      if (jsonProducts && !(0, _types.isObject)(jsonProducts)) {
        throw new Error('Entitlements must be an Object');
      }

      var productsOrSkus = null;

      if (jsonProducts) {
        productsOrSkus = JSON.stringify(jsonProducts);
      }

      this.propensityServer_.sendSubscriptionState(state, productsOrSkus);
    }
    /** @override */

  }, {
    key: "getPropensity",
    value: function getPropensity(type) {
      if (type && !Object.values(PropensityApi.PropensityType).includes(type)) {
        throw new Error('Invalid propensity type requested');
      }

      if (!type) {
        type = PropensityApi.PropensityType.GENERAL;
      }

      return this.propensityServer_.getPropensity(this.win_.document.referrer, type);
    }
    /** @override */

  }, {
    key: "sendEvent",
    value: function sendEvent(userEvent) {
      var analyticsEvent = (0, _eventTypeMapping.publisherEventToAnalyticsEvent)(userEvent.name);
      var data = null;

      if (!(0, _types.isEnumValue)(_loggerApi.Event, userEvent.name) || !analyticsEvent) {
        throw new Error('Invalid user event provided(' + userEvent.name + ')');
      }

      if (userEvent.data) {
        if (!(0, _types.isObject)(userEvent.data)) {
          throw new Error('Event data must be an Object(' + userEvent.data + ')');
        } else {
          data = {};
          Object.assign(data, userEvent.data);
        }
      }

      if ((0, _types.isBoolean)(userEvent.active)) {
        if (!data) {
          data = {};
        }

        Object.assign(data, {
          'is_active': userEvent.active
        });
      } else if (userEvent.active != null) {
        throw new Error('Event active must be a boolean');
      }

      this.eventManager_.logEvent({
        eventType: analyticsEvent,
        eventOriginator: _api_messages.EventOriginator.PROPENSITY_CLIENT,
        isFromUserAction: userEvent.active,
        additionalParameters: data
      });
    }
  }]);

  return Propensity;
}();

exports.Propensity = Propensity;

},{"../api/logger-api":8,"../api/propensity-api":11,"../proto/api_messages":33,"../utils/types":84,"./event-type-mapping":42,"./propensity-server":57}],59:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getRuntime = getRuntime;
exports.installRuntime = installRuntime;
exports.getSubscriptionsClassForTesting = getSubscriptionsClassForTesting;
exports.getFetcherClassForTesting = getFetcherClassForTesting;
exports.getDocClassForTesting = getDocClassForTesting;
exports.ConfiguredRuntime = exports.Runtime = void 0;

var _offersFlow = require("./offers-flow");

var _activities = require("../components/activities");

var _api_messages = require("../proto/api_messages");

var _subscriptions = require("../api/subscriptions");

var _analyticsService = require("./analytics-service");

var _buttonApi = require("./button-api");

var _callbacks = require("./callbacks");

var _clientEventManager = require("./client-event-manager");

var _contributionsFlow = require("./contributions-flow");

var _deferredAccountFlow = require("./deferred-account-flow");

var _deps = require("./deps");

var _dialogManager = require("../components/dialog-manager");

var _doc = require("../model/doc");

var _entitlementsManager = require("./entitlements-manager");

var _experimentFlags = require("./experiment-flags");

var _fetcher = require("./fetcher");

var _jserror = require("./jserror");

var _linkAccountsFlow = require("./link-accounts-flow");

var _logger = require("./logger");

var _loginNotificationApi = require("./login-notification-api");

var _loginPromptApi = require("./login-prompt-api");

var _meterRegwallApi = require("./meter-regwall-api");

var _offersApi = require("./offers-api");

var _pageConfig = require("../model/page-config");

var _pageConfigResolver = require("../model/page-config-resolver");

var _payClient = require("./pay-client");

var _payFlow = require("./pay-flow");

var _preconnect = require("../utils/preconnect");

var _propensity = require("./propensity");

var _dialog = require("../../build/css/components/dialog.css");

var _storage = require("./storage");

var _waitForSubscriptionLookupApi = require("./wait-for-subscription-lookup-api");

var _log = require("../utils/log");

var _dom = require("../utils/dom");

var _types = require("../utils/types");

var _experiments = require("./experiments");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var RUNTIME_PROP = 'SWG';
var RUNTIME_LEGACY_PROP = 'SUBSCRIPTIONS'; // MIGRATE

/**
 * Reference to the runtime, for testing.
 * @private {!Runtime}
 */

var runtimeInstance_;
/**
 * Returns runtime for testing if available. Throws if the runtime is not
 * initialized yet.
 * @visibleForTesting
 * @return {!Runtime}
 */

function getRuntime() {
  (0, _log.assert)(runtimeInstance_, 'not initialized yet');
  return runtimeInstance_;
}
/**
 * Installs SwG runtime.
 * @param {!Window} win
 */


function installRuntime(win) {
  // Only install the SwG runtime once.
  if (win[RUNTIME_PROP] && !Array.isArray(win[RUNTIME_PROP])) {
    return;
  } // Create a SwG runtime.


  var runtime = new Runtime(win); // Create a public version of the SwG runtime.

  var publicRuntime = createPublicRuntime(runtime);
  /**
   * Executes a callback when SwG runtime is ready.
   * @param {function(!Subscriptions)} callback
   */

  function callWhenRuntimeIsReady(callback) {
    if (!callback) {
      return;
    }

    runtime.whenReady().then(function () {
      callback(publicRuntime);
    });
  } // Queue up any callbacks the publication might have provided.


  var waitingCallbacks = [].concat(win[RUNTIME_PROP], win[RUNTIME_LEGACY_PROP]);
  waitingCallbacks.forEach(callWhenRuntimeIsReady); // If any more callbacks are `push`ed to the global SwG variables,
  // they'll be queued up to receive the SwG runtime when it's ready.

  win[RUNTIME_PROP] = win[RUNTIME_LEGACY_PROP] = {
    push: callWhenRuntimeIsReady
  }; // Set variable for testing.

  runtimeInstance_ = runtime; // Kick off subscriptions flow.

  runtime.startSubscriptionsFlowIfNeeded();
}
/**
 * @implements {Subscriptions}
 */


var Runtime = /*#__PURE__*/function () {
  /**
   * @param {!Window} win
   */
  function Runtime(win) {
    var _this = this;

    _classCallCheck(this, Runtime);

    /** @private @const {!Window} */
    this.win_ = win;
    /** @private @const {!Doc} */

    this.doc_ = (0, _doc.resolveDoc)(win);
    /** @private @const {!Promise} */

    this.ready_ = Promise.resolve();
    /** @private {?string} */

    this.productOrPublicationId_ = null;
    /** @private @const {!../api/subscriptions.Config} */

    this.config_ = {};
    /** @private {boolean} */

    this.committed_ = false;
    /** @private {?function((!ConfiguredRuntime|!Promise))} */

    this.configuredResolver_ = null;
    /** @private @const {!Promise<!ConfiguredRuntime>} */

    this.configuredPromise_ = new Promise(function (resolve) {
      _this.configuredResolver_ = resolve;
    });
    /** @private {?PageConfigResolver} */

    this.pageConfigResolver_ = null;
    /** @private @const {!ButtonApi} */

    this.buttonApi_ = new _buttonApi.ButtonApi(this.doc_, this.configuredPromise_);
    this.buttonApi_.init(); // Injects swg-button stylesheet.
  }
  /**
   * @return {!Promise}
   */


  _createClass(Runtime, [{
    key: "whenReady",
    value: function whenReady() {
      return this.ready_;
    }
    /**
     * @param {boolean} commit
     * @return {!Promise<!ConfiguredRuntime>}
     * @private
     */

  }, {
    key: "configured_",
    value: function configured_(commit) {
      var _this2 = this;

      if (!this.committed_ && commit) {
        this.committed_ = true;
        /** @type {!Promise<!PageConfig>} */

        var pageConfigPromise;

        if (this.productOrPublicationId_) {
          pageConfigPromise = Promise.resolve(new _pageConfig.PageConfig(this.productOrPublicationId_,
          /* locked */
          false));
        } else {
          this.pageConfigResolver_ = new _pageConfigResolver.PageConfigResolver(this.doc_);
          pageConfigPromise = this.pageConfigResolver_.resolveConfig().then(function (config) {
            _this2.pageConfigResolver_ = null;
            return config;
          });
        }

        pageConfigPromise.then(function (pageConfig) {
          _this2.configuredResolver_(new ConfiguredRuntime(_this2.doc_, pageConfig,
          /* integr */
          {
            configPromise: _this2.configuredPromise_
          }, _this2.config_));

          _this2.configuredResolver_ = null;
        }, function (reason) {
          _this2.configuredResolver_(Promise.reject(reason));

          _this2.configuredResolver_ = null;
        });
      } else if (commit && this.pageConfigResolver_) {
        this.pageConfigResolver_.check();
      }

      return this.configuredPromise_;
    }
    /**
     * Starts the subscription flow if it hasn't been started and the page is
     * configured to start it automatically.
     *
     * @return {?Promise}
     * @package
     */

  }, {
    key: "startSubscriptionsFlowIfNeeded",
    value: function startSubscriptionsFlowIfNeeded() {
      var control = (0, _pageConfigResolver.getControlFlag)(this.win_.document);
      (0, _log.debugLog)(control, 'mode');

      if (control == 'manual') {
        // "Skipping automatic start because control flag is set to "manual".
        return null;
      }

      return this.start();
    }
    /** @override */

  }, {
    key: "init",
    value: function init(productOrPublicationId) {
      (0, _log.assert)(!this.committed_, 'already configured');
      this.productOrPublicationId_ = productOrPublicationId; // Process the page's config.

      this.configured_(true);
    }
    /** @override */

  }, {
    key: "configure",
    value: function configure(config) {
      // Accumulate config for startup.
      Object.assign(this.config_, config);
      return this.configured_(false).then(function (runtime) {
        return runtime.configure(config);
      });
    }
    /** @override */

  }, {
    key: "start",
    value: function start() {
      return this.configured_(true).then(function (runtime) {
        return runtime.start();
      });
    }
    /** @override */

  }, {
    key: "reset",
    value: function reset() {
      return this.configured_(true).then(function (runtime) {
        return runtime.reset();
      });
    }
    /** @override */

  }, {
    key: "clear",
    value: function clear() {
      return this.configured_(true).then(function (runtime) {
        return runtime.clear();
      });
    }
    /** @override */

  }, {
    key: "getEntitlements",
    value: function getEntitlements(params) {
      return this.configured_(true).then(function (runtime) {
        return runtime.getEntitlements(params);
      });
    }
    /** @override */

  }, {
    key: "setOnEntitlementsResponse",
    value: function setOnEntitlementsResponse(callback) {
      return this.configured_(false).then(function (runtime) {
        return runtime.setOnEntitlementsResponse(callback);
      });
    }
    /** @override */

  }, {
    key: "getOffers",
    value: function getOffers(options) {
      return this.configured_(true).then(function (runtime) {
        return runtime.getOffers(options);
      });
    }
    /** @override */

  }, {
    key: "showOffers",
    value: function showOffers(options) {
      return this.configured_(true).then(function (runtime) {
        return runtime.showOffers(options);
      });
    }
    /** @override */

  }, {
    key: "showUpdateOffers",
    value: function showUpdateOffers(options) {
      return this.configured_(true).then(function (runtime) {
        return runtime.showUpdateOffers(options);
      });
    }
    /** @override */

  }, {
    key: "showSubscribeOption",
    value: function showSubscribeOption(options) {
      return this.configured_(true).then(function (runtime) {
        return runtime.showSubscribeOption(options);
      });
    }
    /** @override */

  }, {
    key: "showAbbrvOffer",
    value: function showAbbrvOffer(options) {
      return this.configured_(true).then(function (runtime) {
        return runtime.showAbbrvOffer(options);
      });
    }
    /** @override */

  }, {
    key: "showContributionOptions",
    value: function showContributionOptions(options) {
      return this.configured_(true).then(function (runtime) {
        return runtime.showContributionOptions(options);
      });
    }
    /** @override */

  }, {
    key: "waitForSubscriptionLookup",
    value: function waitForSubscriptionLookup(accountPromise) {
      return this.configured_(true).then(function (runtime) {
        return runtime.waitForSubscriptionLookup(accountPromise);
      });
    }
    /** @override */

  }, {
    key: "showMeterRegwall",
    value: function showMeterRegwall(params) {
      return this.configured_(true).then(function (runtime) {
        return runtime.showMeterRegwall(params);
      });
    }
    /** @override */

  }, {
    key: "setOnNativeSubscribeRequest",
    value: function setOnNativeSubscribeRequest(callback) {
      return this.configured_(false).then(function (runtime) {
        return runtime.setOnNativeSubscribeRequest(callback);
      });
    }
    /** @override */

  }, {
    key: "setOnSubscribeResponse",
    value: function setOnSubscribeResponse(callback) {
      return this.configured_(false).then(function (runtime) {
        return runtime.setOnSubscribeResponse(callback);
      });
    }
    /** @override */

  }, {
    key: "subscribe",
    value: function subscribe(sku) {
      return this.configured_(true).then(function (runtime) {
        return runtime.subscribe(sku);
      });
    }
    /** @override */

  }, {
    key: "updateSubscription",
    value: function updateSubscription(subscriptionRequest) {
      return this.configured_(true).then(function (runtime) {
        return runtime.updateSubscription(subscriptionRequest);
      });
    }
    /** @override */

  }, {
    key: "setOnContributionResponse",
    value: function setOnContributionResponse(callback) {
      return this.configured_(false).then(function (runtime) {
        return runtime.setOnContributionResponse(callback);
      });
    }
    /** @override */

  }, {
    key: "setOnPaymentResponse",
    value: function setOnPaymentResponse(callback) {
      return this.configured_(false).then(function (runtime) {
        return runtime.setOnPaymentResponse(callback);
      });
    }
    /** @override */

  }, {
    key: "contribute",
    value: function contribute(skuOrSubscriptionRequest) {
      return this.configured_(true).then(function (runtime) {
        return runtime.contribute(skuOrSubscriptionRequest);
      });
    }
    /** @override */

  }, {
    key: "completeDeferredAccountCreation",
    value: function completeDeferredAccountCreation(options) {
      return this.configured_(true).then(function (runtime) {
        return runtime.completeDeferredAccountCreation(options);
      });
    }
    /** @override */

  }, {
    key: "setOnLoginRequest",
    value: function setOnLoginRequest(callback) {
      return this.configured_(false).then(function (runtime) {
        return runtime.setOnLoginRequest(callback);
      });
    }
    /** @override */

  }, {
    key: "triggerLoginRequest",
    value: function triggerLoginRequest(request) {
      return this.configured_(false).then(function (runtime) {
        return runtime.triggerLoginRequest(request);
      });
    }
    /** @override */

  }, {
    key: "setOnLinkComplete",
    value: function setOnLinkComplete(callback) {
      return this.configured_(false).then(function (runtime) {
        return runtime.setOnLinkComplete(callback);
      });
    }
    /** @override */

  }, {
    key: "linkAccount",
    value: function linkAccount() {
      var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      return this.configured_(true).then(function (runtime) {
        return runtime.linkAccount(params);
      });
    }
    /** @override */

  }, {
    key: "setOnFlowStarted",
    value: function setOnFlowStarted(callback) {
      return this.configured_(false).then(function (runtime) {
        return runtime.setOnFlowStarted(callback);
      });
    }
    /** @override */

  }, {
    key: "setOnFlowCanceled",
    value: function setOnFlowCanceled(callback) {
      return this.configured_(false).then(function (runtime) {
        return runtime.setOnFlowCanceled(callback);
      });
    }
    /** @override */

  }, {
    key: "saveSubscription",
    value: function saveSubscription(saveSubscriptionRequestCallback) {
      return this.configured_(true).then(function (runtime) {
        return runtime.saveSubscription(saveSubscriptionRequestCallback);
      });
    }
    /** @override */

  }, {
    key: "showLoginPrompt",
    value: function showLoginPrompt() {
      return this.configured_(true).then(function (runtime) {
        return runtime.showLoginPrompt();
      });
    }
    /** @override */

  }, {
    key: "showLoginNotification",
    value: function showLoginNotification() {
      return this.configured_(true).then(function (runtime) {
        return runtime.showLoginNotification();
      });
    }
    /** @override */

  }, {
    key: "createButton",
    value: function createButton(optionsOrCallback, callback) {
      return this.buttonApi_.create(optionsOrCallback, callback);
    }
    /** @override */

  }, {
    key: "attachSmartButton",
    value: function attachSmartButton(button, optionsOrCallback, callback) {
      return this.configured_(true).then(function (runtime) {
        return runtime.attachSmartButton(button, optionsOrCallback, callback);
      });
    }
    /** @override */

  }, {
    key: "attachButton",
    value: function attachButton(button, optionsOrCallback, callback) {
      return this.buttonApi_.attach(button, optionsOrCallback, callback);
    }
    /** @override */

  }, {
    key: "getPropensityModule",
    value: function getPropensityModule() {
      return this.configured_(true).then(function (runtime) {
        return runtime.getPropensityModule();
      });
    }
    /** @override */

  }, {
    key: "getLogger",
    value: function getLogger() {
      return this.configured_(true).then(function (runtime) {
        return runtime.getLogger();
      });
    }
    /** @override */

  }, {
    key: "getEventManager",
    value: function getEventManager() {
      return this.configured_(true).then(function (runtime) {
        return runtime.getEventManager();
      });
    }
    /** @override */

  }, {
    key: "setShowcaseEntitlement",
    value: function setShowcaseEntitlement(unusedEntitlement) {// TODO
    }
  }]);

  return Runtime;
}();
/**
 * @implements {DepsDef}
 * @implements {Subscriptions}
 */


exports.Runtime = Runtime;

var ConfiguredRuntime = /*#__PURE__*/function () {
  /**
   * @param {!Window|!Document|!Doc} winOrDoc
   * @param {!../model/page-config.PageConfig} pageConfig
   * @param {{
   *     fetcher: (!Fetcher|undefined),
   *     configPromise: (!Promise|undefined),
   *   }=} integr
   * @param {!../api/subscriptions.Config=} config
   */
  function ConfiguredRuntime(winOrDoc, pageConfig, integr, config) {
    var _this3 = this;

    _classCallCheck(this, ConfiguredRuntime);

    integr = integr || {};
    integr.configPromise = integr.configPromise || Promise.resolve();
    /** @private @const {!ClientEventManager} */

    this.eventManager_ = new _clientEventManager.ClientEventManager(integr.configPromise);
    /** @private @const {!Doc} */

    this.doc_ = (0, _doc.resolveDoc)(winOrDoc);
    /** @private @const {!Window} */

    this.win_ = this.doc_.getWin();
    /** @private @const {!../api/subscriptions.Config} */

    this.config_ = (0, _subscriptions.defaultConfig)();

    if ((0, _dom.isLegacyEdgeBrowser)(this.win_)) {
      // TODO(dvoytenko, b/120607343): Find a way to remove this restriction
      // or move it to Web Activities.
      this.config_.windowOpenMode = _subscriptions.WindowOpenMode.REDIRECT;
    }

    if (config) {
      this.configure_(config);
    }
    /** @private @const {!../model/page-config.PageConfig} */


    this.pageConfig_ = pageConfig;
    /** @private @const {!Promise} */

    this.documentParsed_ = this.doc_.whenReady();
    /** @private @const {!JsError} */

    this.jserror_ = new _jserror.JsError(this.doc_);
    /** @private @const {!Fetcher} */

    this.fetcher_ = integr.fetcher || new _fetcher.XhrFetcher(this.win_);
    /** @private @const {!Storage} */

    this.storage_ = new _storage.Storage(this.win_);
    /** @private @const {!DialogManager} */

    this.dialogManager_ = new _dialogManager.DialogManager(this.doc_);
    /** @private @const {!Callbacks} */

    this.callbacks_ = new _callbacks.Callbacks(); // WARNING: DepsDef ('this') is being progressively defined below.
    // Constructors will crash if they rely on something that doesn't exist yet.

    /** @private @const {!../components/activities.ActivityPorts} */

    this.activityPorts_ = new _activities.ActivityPorts(this);
    /** @private @const {!AnalyticsService} */

    this.analyticsService_ = new _analyticsService.AnalyticsService(this, this.fetcher_);
    this.analyticsService_.start();
    /** @private @const {!PayClient} */

    this.payClient_ = new _payClient.PayClient(this);
    /** @private @const {!Logger} */

    this.logger_ = new _logger.Logger(this);
    /** @private @const {!EntitlementsManager} */

    this.entitlementsManager_ = new _entitlementsManager.EntitlementsManager(this.win_, this.pageConfig_, this.fetcher_, this // See note about 'this' above
    );
    /** @private @const {!Propensity} */

    this.propensityModule_ = new _propensity.Propensity(this.win_, this, // See note about 'this' above
    this.fetcher_); // ALL CLEAR: DepsDef definition now complete.

    this.eventManager_.logSwgEvent(_api_messages.AnalyticsEvent.IMPRESSION_PAGE_LOAD, false);
    /** @private @const {!OffersApi} */

    this.offersApi_ = new _offersApi.OffersApi(this.pageConfig_, this.fetcher_);
    /** @private @const {!ButtonApi} */

    this.buttonApi_ = new _buttonApi.ButtonApi(this.doc_, Promise.resolve(this));
    var preconnect = new _preconnect.Preconnect(this.win_.document);
    preconnect.prefetch('/assets/loader.svg');
    preconnect.preconnect('https://www.gstatic.com/');
    preconnect.preconnect('https://fonts.googleapis.com/');
    preconnect.preconnect('https://www.google.com/');

    _linkAccountsFlow.LinkCompleteFlow.configurePending(this);

    _payFlow.PayCompleteFlow.configurePending(this);

    (0, _dom.injectStyleSheet)(this.doc_, _dialog.CSS); // Report redirect errors if any.

    this.activityPorts_.onRedirectError(function (error) {
      _this3.analyticsService_.addLabels(['redirect']);

      _this3.eventManager_.logSwgEvent(_api_messages.AnalyticsEvent.EVENT_PAYMENT_FAILED, false);

      _this3.jserror_.error('Redirect error', error);
    });
  }
  /** @override */


  _createClass(ConfiguredRuntime, [{
    key: "doc",
    value: function doc() {
      return this.doc_;
    }
    /** @override */

  }, {
    key: "win",
    value: function win() {
      return this.win_;
    }
    /** @override */

  }, {
    key: "pageConfig",
    value: function pageConfig() {
      return this.pageConfig_;
    }
    /** @override */

  }, {
    key: "jserror",
    value: function jserror() {
      return this.jserror_;
    }
    /** @override */

  }, {
    key: "activities",
    value: function activities() {
      return this.activityPorts_;
    }
    /** @override */

  }, {
    key: "payClient",
    value: function payClient() {
      return this.payClient_;
    }
    /** @override */

  }, {
    key: "dialogManager",
    value: function dialogManager() {
      return this.dialogManager_;
    }
    /** @override */

  }, {
    key: "entitlementsManager",
    value: function entitlementsManager() {
      return this.entitlementsManager_;
    }
    /** @override */

  }, {
    key: "callbacks",
    value: function callbacks() {
      return this.callbacks_;
    }
    /** @override */

  }, {
    key: "storage",
    value: function storage() {
      return this.storage_;
    }
    /** @override */

  }, {
    key: "analytics",
    value: function analytics() {
      return this.analyticsService_;
    }
    /** @override */

  }, {
    key: "init",
    value: function init() {// Implemented by the `Runtime` class.
    }
    /** @override */

  }, {
    key: "configure",
    value: function configure(config) {
      // Indirected for constructor testing.
      this.configure_(config);
    }
    /**
     * @param {!../api/subscriptions.Config} config
     * @private
     */

  }, {
    key: "configure_",
    value: function configure_(config) {
      var _this4 = this;

      // Validate first.
      var error = '';

      for (var k in config) {
        var v = config[k];

        switch (k) {
          case 'windowOpenMode':
            if (v != _subscriptions.WindowOpenMode.AUTO && v != _subscriptions.WindowOpenMode.REDIRECT) {
              error = 'Unknown windowOpenMode: ' + v;
            }

            break;

          case 'experiments':
            v.forEach(function (experiment) {
              return (0, _experiments.setExperiment)(_this4.win_, experiment, true);
            });

            if (this.analytics()) {
              // If analytics service isn't set up yet, then it will get the
              // experiments later.
              this.analytics().addLabels(v);
            }

            break;

          case 'analyticsMode':
            if (v != _subscriptions.AnalyticsMode.DEFAULT && v != _subscriptions.AnalyticsMode.IMPRESSIONS) {
              error = 'Unknown analytics mode: ' + v;
            }

            break;

          case 'enableSwgAnalytics':
            if (!(0, _types.isBoolean)(v)) {
              error = 'Unknown enableSwgAnalytics value: ' + v;
            }

            break;

          case 'enablePropensity':
            if (!(0, _types.isBoolean)(v)) {
              error = 'Unknown enablePropensity value: ' + v;
            }

            break;

          default:
            error = 'Unknown config property: ' + k;
        }
      } // Throw error string if it's not null


      (0, _log.assert)(!error, error || undefined); // Assign.

      Object.assign(this.config_, config);
    }
    /** @override */

  }, {
    key: "config",
    value: function config() {
      return this.config_;
    }
    /** @override */

  }, {
    key: "reset",
    value: function reset() {
      this.entitlementsManager_.reset();
      this.dialogManager_.completeAll();
    }
    /** @override */

  }, {
    key: "clear",
    value: function clear() {
      this.entitlementsManager_.clear();
      this.dialogManager_.completeAll();
    }
    /** @override */

  }, {
    key: "start",
    value: function start() {
      // No need to run entitlements without a product or for an unlocked page.
      if (!this.pageConfig_.getProductId() || !this.pageConfig_.isLocked()) {
        return Promise.resolve();
      }

      this.getEntitlements();
    }
    /** @override */

  }, {
    key: "getEntitlements",
    value: function getEntitlements(params) {
      var _this5 = this;

      return this.entitlementsManager_.getEntitlements(params).then(function (entitlements) {
        // Auto update internal things tracking the user's current SKU.
        if (entitlements) {
          try {
            var skus = entitlements.entitlements.map(function (entitlement) {
              return entitlement.getSku() || 'unknown subscriptionToken';
            });

            if (skus.length > 0) {
              _this5.analyticsService_.setSku(skus.join(','));
            }
          } catch (ex) {}
        }

        return entitlements.clone();
      });
    }
    /** @override */

  }, {
    key: "setOnEntitlementsResponse",
    value: function setOnEntitlementsResponse(callback) {
      this.callbacks_.setOnEntitlementsResponse(callback);
    }
    /** @override */

  }, {
    key: "getOffers",
    value: function getOffers(options) {
      return this.offersApi_.getOffers(options && options.productId);
    }
    /** @override */

  }, {
    key: "showOffers",
    value: function showOffers(options) {
      var _this6 = this;

      return this.documentParsed_.then(function () {
        var errorMessage = 'The showOffers() method cannot be used to update a subscription. ' + 'Use the showUpdateOffers() method instead.';
        (0, _log.assert)(options ? !options['oldSku'] : true, errorMessage);
        var flow = new _offersFlow.OffersFlow(_this6, options);
        return flow.start();
      });
    }
    /** @override */

  }, {
    key: "showUpdateOffers",
    value: function showUpdateOffers(options) {
      var _this7 = this;

      (0, _log.assert)((0, _experiments.isExperimentOn)(this.win_, _experimentFlags.ExperimentFlags.REPLACE_SUBSCRIPTION), 'Not yet launched!');
      return this.documentParsed_.then(function () {
        var errorMessage = 'The showUpdateOffers() method cannot be used for new subscribers. ' + 'Use the showOffers() method instead.';
        (0, _log.assert)(options ? !!options['oldSku'] : false, errorMessage);
        var flow = new _offersFlow.OffersFlow(_this7, options);
        return flow.start();
      });
    }
    /** @override */

  }, {
    key: "showSubscribeOption",
    value: function showSubscribeOption(options) {
      var _this8 = this;

      return this.documentParsed_.then(function () {
        var flow = new _offersFlow.SubscribeOptionFlow(_this8, options);
        return flow.start();
      });
    }
    /** @override */

  }, {
    key: "showAbbrvOffer",
    value: function showAbbrvOffer(options) {
      var _this9 = this;

      return this.documentParsed_.then(function () {
        var flow = new _offersFlow.AbbrvOfferFlow(_this9, options);
        return flow.start();
      });
    }
    /** @override */

  }, {
    key: "showContributionOptions",
    value: function showContributionOptions(options) {
      var _this10 = this;

      return this.documentParsed_.then(function () {
        var flow = new _contributionsFlow.ContributionsFlow(_this10, options);
        return flow.start();
      });
    }
    /** @override */

  }, {
    key: "waitForSubscriptionLookup",
    value: function waitForSubscriptionLookup(accountPromise) {
      var _this11 = this;

      return this.documentParsed_.then(function () {
        var wait = new _waitForSubscriptionLookupApi.WaitForSubscriptionLookupApi(_this11, accountPromise);
        return wait.start();
      });
    }
    /** @override */

  }, {
    key: "showMeterRegwall",
    value: function showMeterRegwall(meterRegwallArgs) {
      var _this12 = this;

      return this.documentParsed_.then(function () {
        var wait = new _meterRegwallApi.MeterRegwallApi(_this12, meterRegwallArgs);
        return wait.start();
      });
    }
    /** @override */

  }, {
    key: "setOnLoginRequest",
    value: function setOnLoginRequest(callback) {
      this.callbacks_.setOnLoginRequest(callback);
    }
    /** @override */

  }, {
    key: "triggerLoginRequest",
    value: function triggerLoginRequest(request) {
      this.callbacks_.triggerLoginRequest(request);
    }
    /** @override */

  }, {
    key: "setOnLinkComplete",
    value: function setOnLinkComplete(callback) {
      this.callbacks_.setOnLinkComplete(callback);
    }
    /** @override */

  }, {
    key: "linkAccount",
    value: function linkAccount() {
      var _this13 = this;

      var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      return this.documentParsed_.then(function () {
        return new _linkAccountsFlow.LinkbackFlow(_this13).start(params);
      });
    }
    /** @override */

  }, {
    key: "saveSubscription",
    value: function saveSubscription(saveSubscriptionRequestCallback) {
      var _this14 = this;

      return this.documentParsed_.then(function () {
        return new _linkAccountsFlow.LinkSaveFlow(_this14, saveSubscriptionRequestCallback).start();
      });
    }
    /** @override */

  }, {
    key: "showLoginPrompt",
    value: function showLoginPrompt() {
      var _this15 = this;

      return this.documentParsed_.then(function () {
        return new _loginPromptApi.LoginPromptApi(_this15).start();
      });
    }
    /** @override */

  }, {
    key: "showLoginNotification",
    value: function showLoginNotification() {
      var _this16 = this;

      return this.documentParsed_.then(function () {
        return new _loginNotificationApi.LoginNotificationApi(_this16).start();
      });
    }
    /** @override */

  }, {
    key: "setOnNativeSubscribeRequest",
    value: function setOnNativeSubscribeRequest(callback) {
      this.callbacks_.setOnSubscribeRequest(callback);
    }
    /** @override */

  }, {
    key: "setOnSubscribeResponse",
    value: function setOnSubscribeResponse(callback) {
      this.callbacks_.setOnSubscribeResponse(callback);
    }
    /** @override */

  }, {
    key: "setOnPaymentResponse",
    value: function setOnPaymentResponse(callback) {
      this.callbacks_.setOnPaymentResponse(callback);
    }
    /** @override */

  }, {
    key: "subscribe",
    value: function subscribe(sku) {
      var _this17 = this;

      var errorMessage = 'The subscribe() method can only take a sku as its parameter; ' + 'for subscription updates please use the updateSubscription() method';
      (0, _log.assert)(typeof sku === 'string', errorMessage);
      return this.documentParsed_.then(function () {
        return new _payFlow.PayStartFlow(_this17, {
          'skuId': sku
        }).start();
      });
    }
    /** @override */

  }, {
    key: "updateSubscription",
    value: function updateSubscription(subscriptionRequest) {
      var _this18 = this;

      (0, _log.assert)((0, _experiments.isExperimentOn)(this.win_, _experimentFlags.ExperimentFlags.REPLACE_SUBSCRIPTION), 'Not yet launched!');
      var errorMessage = 'The updateSubscription() method should be used for subscription ' + 'updates; for new subscriptions please use the subscribe() method';
      (0, _log.assert)(subscriptionRequest ? subscriptionRequest['oldSku'] : false, errorMessage);
      return this.documentParsed_.then(function () {
        return new _payFlow.PayStartFlow(_this18, subscriptionRequest).start();
      });
    }
    /** @override */

  }, {
    key: "setOnContributionResponse",
    value: function setOnContributionResponse(callback) {
      this.callbacks_.setOnContributionResponse(callback);
    }
    /** @override */

  }, {
    key: "contribute",
    value: function contribute(skuOrSubscriptionRequest) {
      var _this19 = this;

      /** @type {!../api/subscriptions.SubscriptionRequest} */
      var request = typeof skuOrSubscriptionRequest == 'string' ? {
        'skuId': skuOrSubscriptionRequest
      } : skuOrSubscriptionRequest;
      return this.documentParsed_.then(function () {
        return new _payFlow.PayStartFlow(_this19, request, _subscriptions.ProductType.UI_CONTRIBUTION).start();
      });
    }
    /** @override */

  }, {
    key: "completeDeferredAccountCreation",
    value: function completeDeferredAccountCreation(options) {
      var _this20 = this;

      return this.documentParsed_.then(function () {
        return new _deferredAccountFlow.DeferredAccountFlow(_this20, options || null).start();
      });
    }
    /** @override */

  }, {
    key: "setOnFlowStarted",
    value: function setOnFlowStarted(callback) {
      this.callbacks_.setOnFlowStarted(callback);
    }
    /** @override */

  }, {
    key: "setOnFlowCanceled",
    value: function setOnFlowCanceled(callback) {
      this.callbacks_.setOnFlowCanceled(callback);
    }
    /** @override */

  }, {
    key: "createButton",
    value: function createButton(optionsOrCallback, callback) {
      // This is a minor duplication to allow this code to be sync.
      return this.buttonApi_.create(optionsOrCallback, callback);
    }
    /** @override */

  }, {
    key: "attachButton",
    value: function attachButton(button, optionsOrCallback, callback) {
      // This is a minor duplication to allow this code to be sync.
      this.buttonApi_.attach(button, optionsOrCallback, callback);
    }
    /** @override */

  }, {
    key: "attachSmartButton",
    value: function attachSmartButton(button, optionsOrCallback, callback) {
      (0, _log.assert)((0, _experiments.isExperimentOn)(this.win_, _experimentFlags.ExperimentFlags.SMARTBOX), 'Not yet launched!');
      this.buttonApi_.attachSmartButton(this, button, optionsOrCallback, callback);
    }
    /** @override */

  }, {
    key: "getPropensityModule",
    value: function getPropensityModule() {
      return Promise.resolve(this.propensityModule_);
    }
    /**
     * This one exists as an internal helper so SwG logging doesn't require a promise.
     * @return {!ClientEventManager}
     */

  }, {
    key: "eventManager",
    value: function eventManager() {
      return this.eventManager_;
    }
    /**
     * This one exists as a public API so publishers can subscribe to SwG events.
     * @override */

  }, {
    key: "getEventManager",
    value: function getEventManager() {
      return Promise.resolve(this.eventManager_);
    }
    /** @override */

  }, {
    key: "getLogger",
    value: function getLogger() {
      return Promise.resolve(this.logger_);
    }
    /** @override */

  }, {
    key: "setShowcaseEntitlement",
    value: function setShowcaseEntitlement(unusedEntitlement) {// TODO
    }
  }]);

  return ConfiguredRuntime;
}();
/**
 * @param {!Runtime} runtime
 * @return {!Subscriptions}
 */


exports.ConfiguredRuntime = ConfiguredRuntime;

function createPublicRuntime(runtime) {
  return (
    /** @type {!Subscriptions} */
    {
      init: runtime.init.bind(runtime),
      configure: runtime.configure.bind(runtime),
      start: runtime.start.bind(runtime),
      reset: runtime.reset.bind(runtime),
      clear: runtime.clear.bind(runtime),
      getEntitlements: runtime.getEntitlements.bind(runtime),
      linkAccount: runtime.linkAccount.bind(runtime),
      showLoginPrompt: runtime.showLoginPrompt.bind(runtime),
      showLoginNotification: runtime.showLoginNotification.bind(runtime),
      getOffers: runtime.getOffers.bind(runtime),
      showOffers: runtime.showOffers.bind(runtime),
      showUpdateOffers: runtime.showUpdateOffers.bind(runtime),
      showAbbrvOffer: runtime.showAbbrvOffer.bind(runtime),
      showMeterRegwall: runtime.showMeterRegwall.bind(runtime),
      showSubscribeOption: runtime.showSubscribeOption.bind(runtime),
      showContributionOptions: runtime.showContributionOptions.bind(runtime),
      waitForSubscriptionLookup: runtime.waitForSubscriptionLookup.bind(runtime),
      subscribe: runtime.subscribe.bind(runtime),
      updateSubscription: runtime.updateSubscription.bind(runtime),
      contribute: runtime.contribute.bind(runtime),
      completeDeferredAccountCreation: runtime.completeDeferredAccountCreation.bind(runtime),
      setOnEntitlementsResponse: runtime.setOnEntitlementsResponse.bind(runtime),
      setOnLoginRequest: runtime.setOnLoginRequest.bind(runtime),
      triggerLoginRequest: runtime.triggerLoginRequest.bind(runtime),
      setOnLinkComplete: runtime.setOnLinkComplete.bind(runtime),
      setOnNativeSubscribeRequest: runtime.setOnNativeSubscribeRequest.bind(runtime),
      setOnPaymentResponse: runtime.setOnPaymentResponse.bind(runtime),
      setOnSubscribeResponse: runtime.setOnSubscribeResponse.bind(runtime),
      setOnContributionResponse: runtime.setOnContributionResponse.bind(runtime),
      setOnFlowStarted: runtime.setOnFlowStarted.bind(runtime),
      setOnFlowCanceled: runtime.setOnFlowCanceled.bind(runtime),
      saveSubscription: runtime.saveSubscription.bind(runtime),
      createButton: runtime.createButton.bind(runtime),
      attachButton: runtime.attachButton.bind(runtime),
      attachSmartButton: runtime.attachSmartButton.bind(runtime),
      getPropensityModule: runtime.getPropensityModule.bind(runtime),
      getLogger: runtime.getLogger.bind(runtime),
      getEventManager: runtime.getEventManager.bind(runtime),
      setShowcaseEntitlement: runtime.setShowcaseEntitlement.bind(runtime)
    }
  );
}
/**
 * @return {!Function}
 * @protected
 */


function getSubscriptionsClassForTesting() {
  return _subscriptions.Subscriptions;
}
/**
 * @return {!Function}
 * @protected
 */


function getFetcherClassForTesting() {
  return _fetcher.Fetcher;
}
/** @package Visible for testing only. */


function getDocClassForTesting() {
  return _doc.Doc;
}

},{"../../build/css/components/dialog.css":1,"../api/subscriptions":13,"../components/activities":15,"../components/dialog-manager":16,"../model/doc":22,"../model/page-config":24,"../model/page-config-resolver":23,"../proto/api_messages":33,"../utils/dom":72,"../utils/log":78,"../utils/preconnect":80,"../utils/types":84,"./analytics-service":34,"./button-api":35,"./callbacks":36,"./client-event-manager":37,"./contributions-flow":38,"./deferred-account-flow":39,"./deps":40,"./entitlements-manager":41,"./experiment-flags":43,"./experiments":44,"./fetcher":45,"./jserror":46,"./link-accounts-flow":47,"./logger":48,"./login-notification-api":49,"./login-prompt-api":50,"./meter-regwall-api":51,"./offers-api":53,"./offers-flow":54,"./pay-client":55,"./pay-flow":56,"./propensity":58,"./storage":62,"./wait-for-subscription-lookup-api":63}],60:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.feOrigin = feOrigin;
exports.serviceUrl = serviceUrl;
exports.adsUrl = adsUrl;
exports.feUrl = feUrl;
exports.feCached = feCached;
exports.feArgs = feArgs;
exports.cacheParam = cacheParam;
exports.CACHE_KEYS = void 0;

var _url = require("../utils/url");

/**
 * Copyright 2018 The Subscribe with Google Authors. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS-IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * Have to put these in the map to avoid compiler optimization. Due to
 * optimization issues, this map only allows property-style keys. E.g. "hr1",
 * as opposed to "1hr".
 * @type {!Object<string, number>}
 * @package Visible for testing only.
 */
var CACHE_KEYS = {
  'nocache': 1,
  'hr1': 3600000,
  // 1hr = 1000 * 60 * 60
  'hr12': 43200000 // 12hr = 1000 * 60 * 60 * 12

};
/**
 * @return {string}
 */

exports.CACHE_KEYS = CACHE_KEYS;

function feOrigin() {
  return (0, _url.parseUrl)('https://news.google.com').origin;
}
/**
 * @param {string} url Relative URL, e.g. "/service1".
 * @return {string} The complete URL.
 */


function serviceUrl(url) {
  return 'https://news.google.com/swg/_/api/v1' + url;
}
/**
 * @param {string} url  Relative URL, e.g. "/service1".
 * @return {string} The complete URL.
 */


function adsUrl(url) {
  return 'https://pubads.g.doubleclick.net' + url;
}
/**
 * @param {string} url Relative URL, e.g. "/offersiframe".
 * @param {string=} prefix
 * @return {string} The complete URL.
 */


function feUrl(url) {
  var prefix = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';
  // Add cache param.
  url = feCached('https://news.google.com' + prefix + '/swg/_/ui/v1' + url); // Optionally add jsmode param. This allows us to test against "aggressively" compiled Boq JS.

  var query = (0, _url.parseQueryString)(self.location.hash);
  var boqJsMode = query['swg.boqjsmode'];

  if (boqJsMode !== undefined) {
    url = (0, _url.addQueryParam)(url, 'jsmode', boqJsMode);
  }

  return url;
}
/**
 * @param {string} url FE URL.
 * @return {string} The complete URL including cache param.
 */


function feCached(url) {
  return (0, _url.addQueryParam)(url, '_', cacheParam('nocache'));
}
/**
 * @param {!Object<string, ?>} args
 * @return {!Object<string, ?>}
 */


function feArgs(args) {
  return Object.assign(args, {
    '_client': 'SwG 0.1.22-1606775387259'
  });
}
/**
 * @param {string} cacheKey
 * @return {string}
 * @package Visible for testing only.
 */


function cacheParam(cacheKey) {
  var period = CACHE_KEYS[cacheKey];

  if (period == null) {
    period = 1;
  }

  if (period === 0) {
    return '_';
  }

  var now = Date.now();
  return String(period <= 1 ? now : Math.floor(now / period));
}

},{"../utils/url":85}],61:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SmartSubscriptionButtonApi = exports.Theme = void 0;

var _api_messages = require("../proto/api_messages");

var _dom = require("../utils/dom");

var _services = require("./services");

var _style = require("../utils/style");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

/** @const {!Object<string, string>} */
var iframeAttributes = {
  'frameborder': '0',
  'scrolling': 'no'
};
/**
 * @enum {string}
 */

var Theme = {
  LIGHT: 'light',
  DARK: 'dark'
};
/**
 * The class for Smart button Api.
 */

exports.Theme = Theme;

var SmartSubscriptionButtonApi = /*#__PURE__*/function () {
  /**
   * @param {!./deps.DepsDef} deps
   * @param {!Element} button
   * @param {!../api/subscriptions.SmartButtonOptions} options
   * @param {function()=} callback
   */
  function SmartSubscriptionButtonApi(deps, button, options, callback) {
    _classCallCheck(this, SmartSubscriptionButtonApi);

    /** @private @const {!./deps.DepsDef} */
    this.deps_ = deps;
    /** @private @const {!Window} */

    this.win_ = deps.win();
    /** @private @const {!Document} */

    this.doc_ = this.win_.document;
    /** @private @const {!../components/activities.ActivityPorts} */

    this.activityPorts_ = deps.activities();
    /** @private @const {!HTMLIFrameElement} */

    this.iframe_ =
    /** @type {!HTMLIFrameElement} */
    (0, _dom.createElement)(this.doc_, 'iframe', iframeAttributes);
    /** @private @const {!Element} */

    this.button_ = button;
    /** @private {!../api/subscriptions.SmartButtonOptions} */

    this.options_ = options;
    /** @private const {function()=} */

    this.callback_ = callback;
    /** @private @const {string} */

    this.src_ = (0, _services.feUrl)('/smartboxiframe');
    var frontendArguments = {
      'productId': this.deps_.pageConfig().getProductId(),
      'publicationId': this.deps_.pageConfig().getPublicationId(),
      'theme': this.options_ && this.options_.theme || 'light',
      'lang': this.options_ && this.options_.lang || 'en'
    };
    var messageTextColor = this.options_ && this.options_.messageTextColor;

    if (messageTextColor) {
      frontendArguments['messageTextColor'] = messageTextColor;
    }
    /** @private @const {!Object} */


    this.args_ = (0, _services.feArgs)(frontendArguments);
  }
  /**
   * @param {SmartBoxMessage} smartBoxMessage
   */


  _createClass(SmartSubscriptionButtonApi, [{
    key: "handleSmartBoxClick_",
    value: function handleSmartBoxClick_(smartBoxMessage) {
      if (smartBoxMessage && smartBoxMessage.getIsClicked()) {
        if (!this.callback_) {
          throw new Error('No callback!');
        }

        this.callback_();
        return;
      }
    }
    /**
     * Make a call to build button content and listens for the 'click' message.
     * @return {!Element}
     */

  }, {
    key: "start",
    value: function start() {
      var _this = this;

      (0, _style.setImportantStyles)(this.iframe_, {
        'opacity': 1,
        'position': 'absolute',
        'top': 0,
        'bottom': 0,
        'left': 0,
        'height': '100%',
        'right': 0,
        'width': '100%'
      });
      this.button_.appendChild(this.iframe_);
      var args = this.activityPorts_.addDefaultArguments(this.args_);
      this.activityPorts_.openIframe(this.iframe_, this.src_, args).then(function (port) {
        port.on(_api_messages.SmartBoxMessage, _this.handleSmartBoxClick_.bind(_this));
      });
      return this.iframe_;
    }
  }]);

  return SmartSubscriptionButtonApi;
}();

exports.SmartSubscriptionButtonApi = SmartSubscriptionButtonApi;

},{"../proto/api_messages":33,"../utils/dom":72,"../utils/style":83,"./services":60}],62:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Storage = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

/**
 * Copyright 2018 The Subscribe with Google Authors. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS-IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
var PREFIX = 'subscribe.google.com';

var Storage = /*#__PURE__*/function () {
  /**
   * @param {!Window} win
   */
  function Storage(win) {
    _classCallCheck(this, Storage);

    /** @private @const {!Window} */
    this.win_ = win;
    /** @private @const {!Object<string, !Promise<?string>>} */

    this.values_ = {};
  }
  /**
   * @param {string} key
   * @return {!Promise<?string>}
   */


  _createClass(Storage, [{
    key: "get",
    value: function get(key) {
      var _this = this;

      if (!this.values_[key]) {
        this.values_[key] = new Promise(function (resolve) {
          if (_this.win_.sessionStorage) {
            try {
              resolve(_this.win_.sessionStorage.getItem(storageKey(key)));
            } catch (e) {
              // Ignore error.
              resolve(null);
            }
          } else {
            resolve(null);
          }
        });
      }

      return this.values_[key];
    }
    /**
     * @param {string} key
     * @param {string} value
     * @return {!Promise}
     */

  }, {
    key: "set",
    value: function set(key, value) {
      var _this2 = this;

      this.values_[key] = Promise.resolve(value);
      return new Promise(function (resolve) {
        if (_this2.win_.sessionStorage) {
          try {
            _this2.win_.sessionStorage.setItem(storageKey(key), value);
          } catch (e) {// Ignore error.
          }
        }

        resolve();
      });
    }
    /**
     * @param {string} key
     * @return {!Promise}
     */

  }, {
    key: "remove",
    value: function remove(key) {
      var _this3 = this;

      delete this.values_[key];
      return new Promise(function (resolve) {
        if (_this3.win_.sessionStorage) {
          try {
            _this3.win_.sessionStorage.removeItem(storageKey(key));
          } catch (e) {// Ignore error.
          }
        }

        resolve();
      });
    }
  }]);

  return Storage;
}();
/**
 * @param {string} key
 * @return {string}
 */


exports.Storage = Storage;

function storageKey(key) {
  return PREFIX + ':' + key;
}

},{}],63:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.WaitForSubscriptionLookupApi = void 0;

var _activityIframeView = require("../ui/activity-iframe-view");

var _deferredAccountCreation = require("../api/deferred-account-creation");

var _services = require("./services");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var NO_PROMISE_ERR = 'No account promise provided';

var WaitForSubscriptionLookupApi = /*#__PURE__*/function () {
  /**
   * @param {!./deps.DepsDef} deps
   * @param {?Promise} accountPromise
   */
  function WaitForSubscriptionLookupApi(deps, accountPromise) {
    _classCallCheck(this, WaitForSubscriptionLookupApi);

    /** @private @const {!./deps.DepsDef} */
    this.deps_ = deps;
    /** @private @const {!Window} */

    this.win_ = deps.win();
    /** @private @const {!../components/activities.ActivityPorts} */

    this.activityPorts_ = deps.activities();
    /** @private @const {!../components/dialog-manager.DialogManager} */

    this.dialogManager_ = deps.dialogManager();
    /** @private {?Promise} */

    this.openViewPromise_ = null;
    /** @private {!Promise} */

    this.accountPromise_ = accountPromise || Promise.reject(NO_PROMISE_ERR);
    /** @private @const {!ActivityIframeView} */

    this.activityIframeView_ = new _activityIframeView.ActivityIframeView(this.win_, this.activityPorts_, (0, _services.feUrl)('/waitforsubscriptionlookupiframe'), (0, _services.feArgs)({
      publicationId: deps.pageConfig().getPublicationId(),
      productId: deps.pageConfig().getProductId()
    }),
    /* shouldFadeBody */
    true,
    /* hasLoadingIndicator */
    true);
  }
  /**
   * Starts the Login Flow.
   * @return {!Promise}
   */


  _createClass(WaitForSubscriptionLookupApi, [{
    key: "start",
    value: function start() {
      var _this = this;

      this.openViewPromise_ = this.dialogManager_.openView(this.activityIframeView_);
      return this.accountPromise_.then(function (account) {
        // Account was found.
        _this.dialogManager_.completeView(_this.activityIframeView_);

        return account;
      }, function (reason) {
        _this.dialogManager_.completeView(_this.activityIframeView_);

        throw reason;
      });
    }
  }]);

  return WaitForSubscriptionLookupApi;
}();

exports.WaitForSubscriptionLookupApi = WaitForSubscriptionLookupApi;

},{"../api/deferred-account-creation":6,"../ui/activity-iframe-view":64,"./services":60}],64:[function(require,module,exports){
"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ActivityIframeView = void 0;

var _api_messages = require("../proto/api_messages");

var _view = require("../components/view");

var _activityUtils = require("../utils/activity-utils");

var _dom = require("../utils/dom");

var _errors = require("../utils/errors");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

/** @const {!Object<string, string>} */
var iframeAttributes = {
  'frameborder': '0',
  'scrolling': 'no'
};
/**
 * Class to build and render Activity iframe view.
 */

var ActivityIframeView = /*#__PURE__*/function (_View) {
  _inherits(ActivityIframeView, _View);

  var _super = _createSuper(ActivityIframeView);

  /**
   * @param {!Window} win
   * @param {!../components/activities.ActivityPorts} activityPorts
   * @param {string} src
   * @param {!Object<string, ?>=} args
   * @param {boolean=} shouldFadeBody
   * @param {boolean=} hasLoadingIndicator
   */
  function ActivityIframeView(win, activityPorts, src, args) {
    var _this;

    var shouldFadeBody = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : false;
    var hasLoadingIndicator = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : false;

    _classCallCheck(this, ActivityIframeView);

    _this = _super.call(this);
    /** @private @const {!Window} */

    _this.win_ = win;
    /** @private @const {!Document} */

    _this.doc_ = _this.win_.document;
    /** @private @const {!HTMLIFrameElement} */

    _this.iframe_ =
    /** @type {!HTMLIFrameElement} */
    (0, _dom.createElement)(_this.doc_, 'iframe', iframeAttributes);
    /** @private @const {!../components/activities.ActivityPorts} */

    _this.activityPorts_ = activityPorts;
    /** @private @const {string} */

    _this.src_ = src;
    /** @private @const {!Object<string, ?>} */

    _this.args_ = args || {};
    /** @private @const {boolean} */

    _this.shouldFadeBody_ = shouldFadeBody;
    /** @private @const {boolean} */

    _this.hasLoadingIndicator_ = hasLoadingIndicator;
    /** @private {?../components/activities.ActivityIframePort} */

    _this.port_ = null;
    /**
     * @private
     * {?function<!web-activities/activity-ports.ActivityIframePort|!Promise>}
     */

    _this.portResolver_ = null;
    /**
     * @private @const
     * {!Promise<!web-activities/activity-ports.ActivityIframePort>}
     */

    _this.portPromise_ = new Promise(function (resolve) {
      _this.portResolver_ = resolve;
    });
    return _this;
  }
  /** @override */


  _createClass(ActivityIframeView, [{
    key: "getElement",
    value: function getElement() {
      return this.iframe_;
    }
    /** @override */

  }, {
    key: "init",
    value: function init(dialog) {
      var _this2 = this;

      return this.activityPorts_.openIframe(this.iframe_, this.src_, this.args_).then(function (port) {
        return _this2.onOpenIframeResponse_(port, dialog);
      });
    }
    /**
     * Returns if document should fade for this view.
     * @return {boolean}
     */

  }, {
    key: "shouldFadeBody",
    value: function shouldFadeBody() {
      return this.shouldFadeBody_;
    }
    /**
     * Returns if the view shows loading indicator.
     * @return {boolean}
     */

  }, {
    key: "hasLoadingIndicator",
    value: function hasLoadingIndicator() {
      return this.hasLoadingIndicator_;
    }
    /**
     * @param {!../components/activities.ActivityIframePort} port
     * @param {!../components/dialog.Dialog} dialog
     * @return {!Promise}
     */

  }, {
    key: "onOpenIframeResponse_",
    value: function onOpenIframeResponse_(port, dialog) {
      var _this3 = this;

      this.port_ = port;
      this.portResolver_(port);
      this.port_.onResizeRequest(function (height) {
        dialog.resizeView(_this3, height);
      });
      return this.port_.whenReady();
    }
    /**
     * @return {!Promise<!../components/activities.ActivityIframePort>}
     * @private
     */

  }, {
    key: "getPortPromise_",
    value: function getPortPromise_() {
      return this.portPromise_;
    }
    /**
     * @param {!function(new: T)}  message
     * @param {function(../proto/api_messages.Message)} callback
     * @template T
     */

  }, {
    key: "on",
    value: function on(message, callback) {
      this.getPortPromise_().then(function (port) {
        port.on(message, callback);
      });
    }
    /**
     * @param {!../proto/api_messages.Message} request
     */

  }, {
    key: "execute",
    value: function execute(request) {
      this.getPortPromise_().then(function (port) {
        port.execute(request);
      });
    }
    /**
     * Accepts results from the caller.
     * @return {!Promise<!web-activities/activity-ports.ActivityResult>}
     */

  }, {
    key: "acceptResult",
    value: function acceptResult() {
      return this.getPortPromise_().then(function (port) {
        return port.acceptResult();
      });
    }
    /**
     * Accepts results from the caller and verifies origin.
     * @param {string} requireOrigin
     * @param {boolean} requireOriginVerified
     * @param {boolean} requireSecureChannel
     * @return {!Promise<!Object>}
     */

  }, {
    key: "acceptResultAndVerify",
    value: function acceptResultAndVerify(requireOrigin, requireOriginVerified, requireSecureChannel) {
      return this.getPortPromise_().then(function (port) {
        return (0, _activityUtils.acceptPortResultData)(port, requireOrigin, requireOriginVerified, requireSecureChannel);
      });
    }
    /**
     * Completes the flow.
     * @return {!Promise}
     */

  }, {
    key: "whenComplete",
    value: function whenComplete() {
      return this.acceptResult();
    }
    /**
     * @param {function()} callback
     */

  }, {
    key: "onCancel",
    value: function onCancel(callback) {
      this.acceptResult()["catch"](function (reason) {
        if ((0, _errors.isCancelError)(reason)) {
          callback();
        }

        throw reason;
      });
    }
    /** @override */

  }, {
    key: "resized",
    value: function resized() {
      if (this.port_) {
        this.port_.resized();
      }
    }
  }]);

  return ActivityIframeView;
}(_view.View);

exports.ActivityIframeView = ActivityIframeView;

},{"../components/view":20,"../proto/api_messages":33,"../utils/activity-utils":67,"../utils/dom":72,"../utils/errors":74}],65:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LoadingView = void 0;

var _dom = require("../utils/dom");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

/**
 * Loading indicator class. Builds the loading indicator view to be injected in
 * parent element <iframe class="swg-dialog"> element. Provides methods to
 * show/hide loading indicator.
 */
var LoadingView = /*#__PURE__*/function () {
  /**
   * @param {!Document} doc
   */
  function LoadingView(doc) {
    _classCallCheck(this, LoadingView);

    /** @private @const {!Document} */
    this.doc_ = doc;
    /** @private @const {!Element} */

    this.loadingContainer_ = (0, _dom.createElement)(this.doc_, 'swg-loading-container', {});
    /** @private @const {!Element} */

    this.loading_ = (0, _dom.createElement)(this.doc_, 'swg-loading', {});
    this.loadingContainer_.appendChild(this.loading_);
    this.loadingContainer_.style.setProperty('display', 'none', 'important'); // Build the animated loading indicator.

    this.buildLoadingIndicator_();
  }
  /**
   * Gets the populated loading container.
   * @return {!Element}
   */


  _createClass(LoadingView, [{
    key: "getElement",
    value: function getElement() {
      return this.loadingContainer_;
    }
    /**
     * Shows the loading indicator within the container element.
     */

  }, {
    key: "show",
    value: function show() {
      this.loadingContainer_.style.removeProperty('display');
    }
    /**
     * Hides the loading indicator within the container element.
     */

  }, {
    key: "hide",
    value: function hide() {
      this.loadingContainer_.style.setProperty('display', 'none', 'important');
    }
    /**
     * Populates the loading indivicator. The populated element
     * can be added in any view, when required.
     * @private
     */

  }, {
    key: "buildLoadingIndicator_",
    value: function buildLoadingIndicator_() {
      var loadingContainer = this.loading_;
      var loadingIndicatorTopContainer = (0, _dom.createElement)(this.doc_, 'swg-loading-animate', {});
      loadingContainer.appendChild(loadingIndicatorTopContainer);
      var loadingIndicatorChildContainer = (0, _dom.createElement)(this.doc_, 'swg-loading-image', {});
      loadingIndicatorTopContainer.appendChild(loadingIndicatorChildContainer);
    }
  }]);

  return LoadingView;
}();

exports.LoadingView = LoadingView;

},{"../utils/dom":72}],66:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Toast = exports.ToastSpecDef = exports.toastImportantStyles = void 0;

var _dom = require("../utils/dom");

var _style = require("../utils/style");

var _animation = require("../utils/animation");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

/** @const {!Object<string, string|number>} */
var toastImportantStyles = {
  'height': 0
};
/** @typedef {{
 *    text: string,
 *    action: ({label: string, handler: function()}|undefined)
 *  }}
 */

exports.toastImportantStyles = toastImportantStyles;
var ToastSpecDef;
/** @const {!Object<string, string>} */

exports.ToastSpecDef = ToastSpecDef;
var iframeAttributes = {
  'frameborder': '0',
  'scrolling': 'no',
  'class': 'swg-toast'
};
/**
 * The class Notification toast.
 */

var Toast = /*#__PURE__*/function () {
  /**
   * @param {!../runtime/deps.DepsDef} deps
   * @param {string} src
   * @param {!Object<string, ?>} args
   */
  function Toast(deps, src, args) {
    var _this = this;

    _classCallCheck(this, Toast);

    /** @private @const {!../model/doc.Doc} */
    this.doc_ = deps.doc();
    /** @private @const {!../components/activities.ActivityPorts} */

    this.activityPorts_ = deps.activities();
    /** @private @const {string} */

    this.src_ = src;
    /** @private @const {!Object<string, ?>} */

    this.args_ = args;
    /** @private {?Promise} */

    this.animating_ = null;
    /** @private @const {!HTMLIFrameElement} */

    this.iframe_ =
    /** @type {!HTMLIFrameElement} */
    (0, _dom.createElement)(this.doc_.getWin().document, 'iframe', iframeAttributes);
    (0, _style.setImportantStyles)(this.iframe_, toastImportantStyles);
    /** @private @const {!Promise} */

    this.ready_ = new Promise(function (resolve) {
      _this.iframe_.onload = resolve;
    });
  }
  /**
   * Returns the iframe element.
   * @return {!HTMLIFrameElement}
   */


  _createClass(Toast, [{
    key: "getElement",
    value: function getElement() {
      return this.iframe_;
    }
    /**
     * Opens the notification toast.
     * @return {!Promise}
     */

  }, {
    key: "open",
    value: function open() {
      this.doc_.getBody().appendChild(this.iframe_); // Fires onload.

      return this.buildToast_();
    }
    /**
     * Builds the content of the iframe. On load, animates the toast.
     */

  }, {
    key: "buildToast_",
    value: function buildToast_() {
      var _this2 = this;

      var toastDurationSeconds = 7;
      return this.activityPorts_.openIframe(this.iframe_, this.src_, this.args_).then(function (port) {
        return port.whenReady();
      }).then(function () {
        (0, _style.resetStyles)(_this2.iframe_, ['height']);

        _this2.animate_(function () {
          (0, _style.setImportantStyles)(_this2.iframe_, {
            'transform': 'translateY(100%)',
            'opactiy': 1,
            'visibility': 'visible'
          });
          return (0, _animation.transition)(_this2.iframe_, {
            'transform': 'translateY(0)',
            'opacity': 1,
            'visibility': 'visible'
          }, 400, 'ease-out');
        }); // Close the Toast after the specified duration.


        _this2.doc_.getWin().setTimeout(function () {
          _this2.close();
        }, (toastDurationSeconds + 1) * 1000);
      });
    }
    /**
     * @param {function():!Promise} callback
     * @return {!Promise}
     * @private
     */

  }, {
    key: "animate_",
    value: function animate_(callback) {
      var _this3 = this;

      var wait = this.animating_ || Promise.resolve();
      return this.animating_ = wait.then(function () {
        return callback();
      }, function () {// Ignore errors to make sure animations don't get stuck.
      }).then(function () {
        _this3.animating_ = null;
      });
    }
    /**
     * Closes the toast.
     * @return {!Promise}
     */

  }, {
    key: "close",
    value: function close() {
      var _this4 = this;

      return this.animate_(function () {
        // Remove the toast from the DOM after animation is complete.
        _this4.doc_.getWin().setTimeout(function () {
          _this4.doc_.getBody().removeChild(_this4.iframe_);

          return Promise.resolve();
        }, 500);

        return (0, _animation.transition)(_this4.iframe_, {
          'transform': 'translateY(100%)',
          'opacity': 1,
          'visibility': 'visible'
        }, 400, 'ease-out');
      });
    }
  }]);

  return Toast;
}();

exports.Toast = Toast;

},{"../utils/animation":68,"../utils/dom":72,"../utils/style":83}],67:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.acceptPortResultData = acceptPortResultData;

/**
 * Copyright 2018 The Subscribe with Google Authors. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS-IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * @param {!../components/activities.ActivityPortDef} port
 * @param {string} requireOrigin
 * @param {boolean} requireOriginVerified
 * @param {boolean} requireSecureChannel
 * @return {!Promise<!Object>}
 */
function acceptPortResultData(port, requireOrigin, requireOriginVerified, requireSecureChannel) {
  return port.acceptResult().then(function (result) {
    if (result.origin != requireOrigin || requireOriginVerified && !result.originVerified || requireSecureChannel && !result.secureChannel) {
      throw new Error('channel mismatch');
    }

    return result.data;
  });
}

},{}],68:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.transition = transition;

var _style = require("./style");

/**
 * Copyright 2018 The Subscribe with Google Authors. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS-IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * Returns a promise which is resolved after the given duration of animation
 * @param {!Element} el - Element to be observed.
 * @param {!Object<string, string|number>} props - properties to be animated.
 * @param {number} durationMillis - duration of animation.
 * @param {string} curve - transition function for the animation.
 * @return {!Promise} Promise which resolves once the animation is done playing.
 */
function transition(el, props, durationMillis, curve) {
  var win = el.ownerDocument.defaultView;
  var previousTransitionValue = el.style.transition || '';
  return new Promise(function (resolve) {
    win.setTimeout(function () {
      win.setTimeout(resolve, durationMillis);
      var tr = "".concat(durationMillis, "ms ").concat(curve);
      (0, _style.setImportantStyles)(el, Object.assign({
        'transition': "transform ".concat(tr, ", opacity ").concat(tr)
      }, props));
    });
  }).then(function () {
    (0, _style.setImportantStyles)(el, {
      'transition': previousTransitionValue
    });
  });
}

},{"./style":83}],69:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.stringToBytes = stringToBytes;
exports.bytesToString = bytesToString;
exports.utf8DecodeSync = utf8DecodeSync;
exports.utf8EncodeSync = utf8EncodeSync;
exports.base64UrlDecodeToBytes = base64UrlDecodeToBytes;
exports.base64UrlEncodeFromBytes = base64UrlEncodeFromBytes;

var _log = require("./log");

/**
 * Copyright 2018 The Subscribe with Google Authors. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS-IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * Character mapping from base64url to base64.
 * @const {!Object<string, string>}
 */
var base64UrlDecodeSubs = {
  '-': '+',
  '_': '/',
  '.': '='
};
/**
 * Character mapping from base64 to base64url.
 * @const {!Object<string, string>}
 */

var base64UrlEncodeSubs = {
  '+': '-',
  '/': '_'
};
/**
 * Converts a string which holds 8-bit code points, such as the result of atob,
 * into a Uint8Array with the corresponding bytes.
 * If you have a string of characters, you probably want to be using utf8Encode.
 * @param {string} str
 * @return {!Uint8Array}
 */

function stringToBytes(str) {
  var bytes = new Uint8Array(str.length);

  for (var i = 0; i < str.length; i++) {
    var charCode = str.charCodeAt(i);
    (0, _log.assert)(charCode <= 255, 'Characters must be in range [0,255]');
    bytes[i] = charCode;
  }

  return bytes;
}
/**
 * Converts a 8-bit bytes array into a string
 * @param {!Uint8Array} bytes
 * @return {string}
 */


function bytesToString(bytes) {
  // Intentionally avoids String.fromCharCode.apply so we don't suffer a
  // stack overflow. #10495, https://jsperf.com/bytesToString-2
  var array = new Array(bytes.length);

  for (var i = 0; i < bytes.length; i++) {
    array[i] = String.fromCharCode(bytes[i]);
  }

  return array.join('');
}
/**
 * Interpret a byte array as a UTF-8 string.
 * @param {!Uint8Array} bytes
 * @return {string}
 */


function utf8DecodeSync(bytes) {
  if (typeof TextDecoder !== 'undefined') {
    return new TextDecoder('utf-8').decode(bytes);
  }

  var asciiString = bytesToString(new Uint8Array(bytes));
  return decodeURIComponent(escape(asciiString));
}
/**
 * Turn a string into UTF-8 bytes.
 * @param {string} string
 * @return {!Uint8Array}
 */


function utf8EncodeSync(string) {
  if (typeof TextEncoder !== 'undefined') {
    return new TextEncoder('utf-8').encode(string);
  }

  return stringToBytes(unescape(encodeURIComponent(string)));
}
/**
 * Converts a string which is in base64url encoding into a Uint8Array
 * containing the decoded value.
 * @param {string} str
 * @return {!Uint8Array}
 */


function base64UrlDecodeToBytes(str) {
  var encoded = atob(str.replace(/[-_.]/g, function (ch) {
    return base64UrlDecodeSubs[ch];
  }));
  return stringToBytes(encoded);
}
/**
 * Converts a bytes array into base64url encoded string.
 * base64url is defined in RFC 4648. It is sometimes referred to as "web safe".
 * @param {!Uint8Array} bytes
 * @return {string}
 */


function base64UrlEncodeFromBytes(bytes) {
  var str = bytesToString(bytes);
  return btoa(str).replace(/[+/]/g, function (ch) {
    return base64UrlEncodeSubs[ch];
  });
}

},{"./log":78}],70:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.toTimestamp = toTimestamp;

var _api_messages = require("../proto/api_messages");

/**
 * Copyright 2020 The Subscribe with Google Authors. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS-IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * @param {!number} millis
 * @return {!Timestamp}
 */
function toTimestamp(millis) {
  return new _api_messages.Timestamp([Math.floor(millis / 1000), millis % 1000 * 1000000], false);
}

},{"../proto/api_messages":33}],71:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isDocumentReady = isDocumentReady;
exports.onDocumentReady = onDocumentReady;
exports.whenDocumentReady = whenDocumentReady;
exports.whenDocumentComplete = whenDocumentComplete;

/**
 * Copyright 2018 The Subscribe with Google Authors. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS-IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * @param {!Document} doc
 * @return {string}
 */
function getReadyState(doc) {
  return (
    /** @type {string} */
    doc['readyState']
  );
}
/**
 * Whether the document is ready.
 * @param {!Document} doc
 * @return {boolean}
 */


function isDocumentReady(doc) {
  var readyState = getReadyState(doc);
  return readyState != 'loading' && readyState != 'uninitialized';
}
/**
 * Whether the document has loaded all the css and sub-resources.
 * @param {!Document} doc
 * @return {boolean}
 */


function isDocumentComplete(doc) {
  return getReadyState(doc) == 'complete';
}
/**
 * Calls the callback when document is ready.
 * @param {!Document} doc
 * @param {function(!Document)} callback
 */


function onDocumentReady(doc, callback) {
  onDocumentState(doc, isDocumentReady, callback);
}
/**
 * Calls the callback once when document's state satisfies the condition.
 * @param {!Document} doc
 * @param {function(!Document):boolean} condition
 * @param {function(!Document)} callback
 */


function onDocumentState(doc, condition, callback) {
  if (condition(doc)) {
    // Execute callback right now.
    callback(doc);
    return;
  } // Execute callback (once!) after condition is satisfied.


  var callbackHasExecuted = false;

  var readyListener = function readyListener() {
    if (condition(doc) && !callbackHasExecuted) {
      callback(doc);
      callbackHasExecuted = true;
      doc.removeEventListener('readystatechange', readyListener);
    }
  };

  doc.addEventListener('readystatechange', readyListener);
}
/**
 * Returns a promise that is resolved when document is ready.
 * @param {!Document} doc
 * @return {!Promise<!Document>}
 */


function whenDocumentReady(doc) {
  return new Promise(function (resolve) {
    onDocumentReady(doc, resolve);
  });
}
/**
 * Returns a promise that is resolved when document is complete.
 * @param {!Document} doc
 * @return {!Promise<!Document>}
 */


function whenDocumentComplete(doc) {
  return new Promise(function (resolve) {
    onDocumentState(doc, isDocumentComplete, resolve);
  });
}

},{}],72:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.addAttributesToElement = addAttributesToElement;
exports.createElement = createElement;
exports.removeElement = removeElement;
exports.removeChildren = removeChildren;
exports.injectStyleSheet = injectStyleSheet;
exports.hasNextNodeInDocumentOrder = hasNextNodeInDocumentOrder;
exports.isConnected = isConnected;
exports.isLegacyEdgeBrowser = isLegacyEdgeBrowser;
exports.styleExistsQuerySelector = exports.styleType = exports.styleLinkAttrs = void 0;

var _log = require("./log");

var _style = require("./style");

/**
 * Copyright 2018 The Subscribe with Google Authors. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS-IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/** @const @enum{string} */
var styleLinkAttrs = {
  'rel': 'stylesheet',
  'type': 'text/css'
};
/** @const {string} */

exports.styleLinkAttrs = styleLinkAttrs;
var styleType = 'text/css';
/** @const {string} */

exports.styleType = styleType;
var styleExistsQuerySelector = 'link[rel=stylesheet][href]';
/**
 * Add attributes to an element.
 * @param {!Element} element
 * @param {!Object<string, string|number|boolean|!Object<string, string|number|boolean>>} attributes
 * @return {!Element} updated element.
 */

exports.styleExistsQuerySelector = styleExistsQuerySelector;

function addAttributesToElement(element, attributes) {
  for (var attr in attributes) {
    if (attr == 'style') {
      (0, _style.setStyles)(element,
      /** @type {!Object<string, string|boolean|number>} */
      attributes[attr]);
    } else {
      element.setAttribute(attr,
      /** @type {string|boolean|number} */
      attributes[attr]);
    }
  }

  return element;
}
/**
 * Create a new element on document with specified tagName and attributes.
 * @param {!Document} doc
 * @param {string} tagName
 * @param {!Object<string, string>} attributes
 * @param {?(string|!Node|!ArrayLike<!Node>|!Array<!Node>)=} content
 * @return {!Element} created element.
 */


function createElement(doc, tagName, attributes, content) {
  var element = doc.createElement(tagName);
  addAttributesToElement(element, attributes);

  if (content != null) {
    if (typeof content == 'string') {
      element.textContent = content;
    } else if (content.nodeType) {
      element.appendChild(content);
    } else if ('length' in content) {
      for (var i = 0; i < content.length; i++) {
        element.appendChild(content[i]);
      }
    } else {
      (0, _log.assert)(false, 'Unsupported content: %s', content);
    }
  }

  return element;
}
/**
 * Removes the element.
 * @param {!Element} element
 */


function removeElement(element) {
  if (element.parentElement) {
    element.parentElement.removeChild(element);
  }
}
/**
 * Removes all children from the parent element.
 * @param {!Element} parent
 */


function removeChildren(parent) {
  parent.textContent = '';
}
/**
 * Injects the provided styles in the HEAD section of the document.
 * @param {!../model/doc.Doc} doc The document object.
 * @param {string} styleText The style string.
 * @return {!Element}
 */


function injectStyleSheet(doc, styleText) {
  var styleElement = createElement(doc.getWin().document, 'style', {
    'type': styleType
  });
  styleElement.textContent = styleText;
  doc.getHead().appendChild(styleElement);
  return styleElement;
}
/**
 * Whether the element have a next node in the document order.
 * This means either:
 *  a. The element itself has a nextSibling.
 *  b. Any of the element ancestors has a nextSibling.
 * @param {!Element} element
 * @param {?Node=} stopNode
 * @return {boolean}
 */


function hasNextNodeInDocumentOrder(element, stopNode) {
  var currentElement = element;

  do {
    if (currentElement.nextSibling) {
      return true;
    }
  } while ((currentElement = currentElement.parentNode) && currentElement != stopNode);

  return false;
}
/**
 * Polyfill of the `Node.isConnected` API. See
 * https://developer.mozilla.org/en-US/docs/Web/API/Node/isConnected.
 * @param {!Node} node
 * @return {boolean}
 */


function isConnected(node) {
  // Ensure that node is attached if specified. This check uses a new and
  // fast `isConnected` API and thus only checked on platforms that have it.
  // See https://www.chromestatus.com/feature/5676110549352448.
  if ('isConnected' in node) {
    return node['isConnected'];
  } // Polyfill.


  var root = node.ownerDocument && node.ownerDocument.documentElement;
  return root && root.contains(node) || false;
}
/**
 * Returns true if current browser is a legacy version of Edge.
 *
 * Starting in January 2020, new versions of Edge will use the Chromium engine.
 * These versions won't include the word "Edge" in their useragent.
 * Instead, they'll include the word "Edg".
 * So far, it seems safe to avoid detecting these new versions of Edge.
 * @param {!Window} win
 * @return {boolean}
 */


function isLegacyEdgeBrowser(win) {
  var nav = win.navigator;
  return /Edge/i.test(nav && nav.userAgent);
}

},{"./log":78,"./style":83}],73:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.dev = exports.user = exports.ErrorLogger = exports.AMP_USER_ERROR_SENTINEL = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

/**
 * Copyright 2020 The Subscribe with Google Authors. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS-IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * Triple zero width space.
 *
 * This is added to user error messages, so that we can later identify
 * them, when the only thing that we have is the message. This is the
 * case in many browsers when the global exception handler is invoked.
 *
 * @const {string}
 */
var AMP_USER_ERROR_SENTINEL = "\u200B\u200B\u200B";
/**
 * Some exceptions (DOMException, namely) have read-only message.
 * @param {!Error} error
 * @return {!Error}
 */

exports.AMP_USER_ERROR_SENTINEL = AMP_USER_ERROR_SENTINEL;

function duplicateErrorIfNecessary(error) {
  var messageProperty = Object.getOwnPropertyDescriptor(error, 'message');

  if (messageProperty && messageProperty.writable) {
    return error;
  }

  var message = error.message,
      stack = error.stack;
  var e = new Error(message); // Copy all the extraneous things we attach.

  for (var prop in error) {
    e[prop] = error[prop];
  } // Ensure these are copied.


  e.stack = stack;
  return e;
}
/**
 * @param {...*} var_args
 * @return {!Error}
 */


function createErrorVargs(var_args) {
  var error = null;
  var message = '';

  for (var i = 0; i < arguments.length; i++) {
    var arg = arguments[i];

    if (arg instanceof Error && !error) {
      error = duplicateErrorIfNecessary(arg);
    } else {
      if (message) {
        message += ' ';
      }

      message += arg;
    }
  }

  if (!error) {
    error = new Error(message);
  } else if (message) {
    error.message = message + ': ' + error.message;
  }

  return error;
}
/** Helper class for throwing standardized errors. */


var ErrorLogger = /*#__PURE__*/function () {
  /**
   * Constructor.
   *
   * opt_suffix will be appended to error message to identify the type of the
   * error message. We can't rely on the error object to pass along the type
   * because some browsers do not have this param in its window.onerror API.
   * See:
   * https://blog.sentry.io/2016/01/04/client-javascript-reporting-window-onerror.html
   *
   * @param {string=} opt_suffix
   */
  function ErrorLogger() {
    var opt_suffix = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';

    _classCallCheck(this, ErrorLogger);

    /** @private @const {string} */
    this.suffix_ = opt_suffix;
  }
  /**
   * Modifies an error before reporting, such as to add metadata.
   * @param {!Error} error
   * @private
   */


  _createClass(ErrorLogger, [{
    key: "prepareError_",
    value: function prepareError_(error) {
      if (this.suffix_) {
        if (!error.message) {
          error.message = this.suffix_;
        } else if (error.message.indexOf(this.suffix_) === -1) {
          error.message = this.suffix_;
        }
      }
    }
    /**
     * Creates an error.
     * @param {...*} var_args
     * @return {!Error}
     */

  }, {
    key: "createError",
    value: function createError(var_args) {
      var error = createErrorVargs.apply(null, Array.prototype.slice.call(arguments));
      this.prepareError_(error);
      return error;
    }
    /**
     * Creates an error object with its expected property set to true. Used for
     * expected failure states (ex. incorrect configuration, localStorage
     * unavailable due to browser settings, etc.) as opposed to unexpected
     * breakages/failures.
     * @param {...*} var_args
     * @return {!Error}
     */

  }, {
    key: "createExpectedError",
    value: function createExpectedError(var_args) {
      var error = createErrorVargs.apply(null, Array.prototype.slice.call(arguments));
      this.prepareError_(error);
      error.expected = true;
      return error;
    }
    /**
     * Throws an error.
     * @param {...*} var_args
     * @throws {!Error}
     */

  }, {
    key: "error",
    value: function error(var_args) {
      throw this.createError.apply(this, arguments);
    }
    /**
     * Throws an error and marks with an expected property.
     * @param {...*} var_args
     * @throws {!Error}
     */

  }, {
    key: "expectedError",
    value: function expectedError(var_args) {
      throw this.createExpectedError.apply(this, arguments);
    }
  }]);

  return ErrorLogger;
}();

exports.ErrorLogger = ErrorLogger;
var userLogger = new ErrorLogger(self.__AMP_TOP ? AMP_USER_ERROR_SENTINEL : '');
var devLogger = new ErrorLogger();

var user = function user() {
  return userLogger;
};

exports.user = user;

var dev = function dev() {
  return devLogger;
};

exports.dev = dev;

},{}],74:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isCancelError = isCancelError;
exports.createCancelError = createCancelError;
exports.ErrorUtils = void 0;

var _activityPorts = require("web-activities/activity-ports");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

/**
 * Whether the specified error is an AbortError type.
 * See https://heycam.github.io/webidl/#aborterror.
 * @param {*} error
 * @return {boolean}
 */
function isCancelError(error) {
  return (0, _activityPorts.isAbortError)(error);
}
/**
 * Creates or emulates a DOMException of AbortError type.
 * See https://heycam.github.io/webidl/#aborterror.
 * @param {!Window} win
 * @param {string=} message
 * @return {!DOMException}
 */


function createCancelError(win, message) {
  return (0, _activityPorts.createAbortError)(win, message);
}
/**
 * A set of error utilities combined in a class to allow easy stubbing in tests.
 */


var ErrorUtils = /*#__PURE__*/function () {
  function ErrorUtils() {
    _classCallCheck(this, ErrorUtils);
  }

  _createClass(ErrorUtils, null, [{
    key: "throwAsync",

    /**
     * @param {!Error} error
     */
    value: function throwAsync(error) {
      setTimeout(function () {
        throw error;
      });
    }
  }]);

  return ErrorUtils;
}();

exports.ErrorUtils = ErrorUtils;

},{"web-activities/activity-ports":4}],75:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.msg = msg;

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

/**
 * Copyright 2018 The Subscribe with Google Authors. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS-IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/** English is the default language. */
var DEFAULT_LANGUAGE_CODE = 'en';
/**
 * Gets a message for a given language code, from a map of messages.
 * @param {!Object<string, string>} map
 * @param {?string|?Element} languageCodeOrElement
 * @return {?string}
 */

function msg(map, languageCodeOrElement) {
  var defaultMsg = map[DEFAULT_LANGUAGE_CODE]; // Verify params.

  if (_typeof(map) !== 'object' || !languageCodeOrElement) {
    return defaultMsg;
  } // Get language code.


  var languageCode = typeof languageCodeOrElement === 'string' ? languageCodeOrElement : getLanguageCodeFromElement(languageCodeOrElement); // Normalize language code.

  languageCode = languageCode.toLowerCase();
  languageCode = languageCode.replace(/_/g, '-'); // Search for a message matching the language code.
  // If a message can't be found, try again with a less specific language code.

  var languageCodeSegments = languageCode.split('-');

  while (languageCodeSegments.length) {
    var key = languageCodeSegments.join('-');

    if (key in map) {
      return map[key];
    } // Simplify language code.
    // Ex: "en-US-SF" => "en-US"


    languageCodeSegments.pop();
  } // There was an attempt.


  return defaultMsg;
}
/**
 * Gets a language code (ex: "en-US") from a given Element.
 * @param {!Element} element
 * @return {string}
 */


function getLanguageCodeFromElement(element) {
  if (element.lang) {
    // Get language from element itself.
    return element.lang;
  }

  if (element.ownerDocument && element.ownerDocument.documentElement.lang) {
    // Get language from element's document.
    return element.ownerDocument.documentElement.lang;
  } // There was an attempt.


  return DEFAULT_LANGUAGE_CODE;
}

},{}],76:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.parseJson = parseJson;
exports.tryParseJson = tryParseJson;
exports.getPropertyFromJsonString = getPropertyFromJsonString;

/**
 * Copyright 2018 The Subscribe with Google Authors. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS-IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * @fileoverview This module declares JSON types as defined in the
 * {@link http://json.org/}.
 */

/**
 * Simple wrapper around JSON.parse that casts the return value
 * to JsonObject.
 * Create a new wrapper if an array return value is desired.
 * @param {*} json JSON string to parse
 * @return {?JsonObject|undefined} May be extend to parse arrays.
 */
function parseJson(json) {
  return (
    /** @type {?JsonObject} */
    JSON.parse(
    /** @type {string} */
    json)
  );
}
/**
 * Parses the given `json` string without throwing an exception if not valid.
 * Returns `undefined` if parsing fails.
 * Returns the `Object` corresponding to the JSON string when parsing succeeds.
 * @param {*} json JSON string to parse
 * @param {function(!Error)=} onFailed Optional function that will be called
 *     with the error if parsing fails.
 * @return {?JsonObject|undefined} May be extend to parse arrays.
 */


function tryParseJson(json, onFailed) {
  try {
    return parseJson(json);
  } catch (e) {
    if (onFailed) {
      onFailed(e);
    }

    return undefined;
  }
}
/**
 * Converts the passed string into a JSON object (if possible) and returns the
 * value of the propertyName on that object.
 * @param {string} jsonString
 * @param {string} propertyName
 * @return {*}
 */


function getPropertyFromJsonString(jsonString, propertyName) {
  var json = tryParseJson(jsonString);
  return json && json[propertyName] || null;
}

},{}],77:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.JwtHelper = void 0;

var _bytes = require("./bytes");

var _json = require("./json");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

/**
 * @typedef {{
 *   header: (?JsonObject|undefined),
 *   payload: (?JsonObject|undefined),
 *   verifiable: string,
 *   sig: string,
 * }}
 */
var JwtTokenInternalDef;
/**
 * Provides helper methods to decode and verify JWT tokens.
 */

var JwtHelper = /*#__PURE__*/function () {
  function JwtHelper() {
    _classCallCheck(this, JwtHelper);
  }
  /**
   * Decodes JWT token and returns its payload.
   * @param {string} encodedToken
   * @return {?JsonObject|undefined}
   */


  _createClass(JwtHelper, [{
    key: "decode",
    value: function decode(encodedToken) {
      return this.decodeInternal_(encodedToken).payload;
    }
    /**
     * @param {string} encodedToken
     * @return {!JwtTokenInternalDef}
     * @private
     */

  }, {
    key: "decodeInternal_",
    value: function decodeInternal_(encodedToken) {
      // See https://jwt.io/introduction/

      /**
       * Throws error about invalid token.
       */
      function invalidToken() {
        throw new Error("Invalid token: \"".concat(encodedToken, "\""));
      } // Encoded token has three parts: header.payload.sig
      // Note! The padding is not allowed by JWT spec:
      // http://self-issued.info/docs/draft-goland-json-web-token-00.html#rfc.section.5


      var parts = encodedToken.split('.');

      if (parts.length != 3) {
        invalidToken();
      }

      var headerUtf8Bytes = (0, _bytes.base64UrlDecodeToBytes)(parts[0]);
      var payloadUtf8Bytes = (0, _bytes.base64UrlDecodeToBytes)(parts[1]);
      return {
        header: (0, _json.tryParseJson)((0, _bytes.utf8DecodeSync)(headerUtf8Bytes), invalidToken),
        payload: (0, _json.tryParseJson)((0, _bytes.utf8DecodeSync)(payloadUtf8Bytes), invalidToken),
        verifiable: "".concat(parts[0], ".").concat(parts[1]),
        sig: parts[2]
      };
    }
  }]);

  return JwtHelper;
}();

exports.JwtHelper = JwtHelper;

},{"./bytes":69,"./json":76}],78:[function(require,module,exports){
"use strict";

/**
 * Copyright 2018 The Subscribe with Google Authors. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS-IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * Debug logger, only log message if #swg.log=1
 * @param {...*} var_args [decription]
 */

/* eslint-disable */
function debugLog(var_args) {
  if (/swg.debug=1/.test(self.location.hash)) {
    var logArgs = Array.prototype.slice.call(arguments, 0);
    logArgs.unshift('[Subscriptions]');
    log.apply(log, logArgs);
  }
}
/**
 * @param  {...*} var_args [description]
 */


function log(var_args) {
  console.log.apply(console, arguments);
}
/**
 * @param  {...*} var_args [description]
 */


function warn(var_args) {
  console.warn.apply(console, arguments);
}
/**
 * Throws an error if the first argument isn't trueish.
 *
 * Supports argument substitution into the message via %s placeholders.
 *
 * Throws an error object that has two extra properties:
 * - associatedElement: This is the first element provided in the var args.
 *   It can be used for improved display of error messages.
 * - messageArray: The elements of the substituted message as non-stringified
 *   elements in an array. When e.g. passed to console.error this yields
 *   native displays of things like HTML elements.
 *
 * @param {T} shouldBeTrueish The value to assert. The assert fails if it does
 *     not evaluate to true.
 * @param {string=} message The assertion message
 * @param {...*} var_args Arguments substituted into %s in the message.
 * @return {T} The value of shouldBeTrueish.
 * @template T
 */


function assert(shouldBeTrueish, message, var_args) {
  var firstElement;

  if (!shouldBeTrueish) {
    message = message || 'Assertion failed';
    var splitMessage = message.split('%s');
    var first = splitMessage.shift();
    var formatted = first;
    var messageArray = [];
    pushIfNonEmpty(messageArray, first);

    for (var i = 2; i < arguments.length; i++) {
      var val = arguments[i];

      if (val && val.tagName) {
        firstElement = val;
      }

      var nextConstant = splitMessage.shift();
      messageArray.push(val);
      pushIfNonEmpty(messageArray, nextConstant.trim());
      formatted += toString(val) + nextConstant;
    }

    var e = new Error(formatted);
    e.fromAssert = true;
    e.associatedElement = firstElement;
    e.messageArray = messageArray;
    throw e;
  }

  return shouldBeTrueish;
}
/**
 * @param {!Array} array
 * @param {*} val
 */


function pushIfNonEmpty(array, val) {
  if (val != '') {
    array.push(val);
  }
}

function toString(val) {
  // Do check equivalent to `val instanceof Element` without cross-window bug
  if (val && val.nodeType == 1) {
    return val.tagName.toLowerCase() + (val.id ? '#' + val.id : '');
  }

  return (
    /** @type {string} */
    val
  );
}

module.exports = {
  assert: assert,
  debugLog: debugLog,
  warn: warn,
  log: log
};

},{}],79:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.map = map;
exports.findInArray = findInArray;

/**
 * Copyright 2018 The Subscribe with Google Authors. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS-IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * Returns a map-like object.
 * If initial is provided, copies its own properties into the
 * newly created object.
 * @param {Object=} initial This should typically be an object literal.
 * @return {!Object}
 * @template T
 */
function map(initial) {
  var obj = Object.create(null);

  if (initial) {
    Object.assign(obj, initial);
  }

  return obj;
}
/**
 * Implements `Array.find()` method that's not yet available in all browsers.
 *
 * @param {?Array<T>} array
 * @param {function(T, number, !Array<T>):boolean} predicate
 * @return {?T}
 * @template T
 */


function findInArray(array, predicate) {
  if (!array) {
    return null;
  }

  var len = array.length || 0;

  if (len > 0) {
    for (var i = 0; i < len; i++) {
      var other = array[i];

      if (predicate(other, i, array)) {
        return other;
      }
    }
  }

  return null;
}

},{}],80:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Preconnect = void 0;

var _dom = require("./dom");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Preconnect = /*#__PURE__*/function () {
  /**
   * @param {!Document} doc
   */
  function Preconnect(doc) {
    _classCallCheck(this, Preconnect);

    /** @private @const {!Document} */
    this.doc_ = doc;
  }
  /**
   * @param {string} url
   */


  _createClass(Preconnect, [{
    key: "preconnect",
    value: function preconnect(url) {
      this.pre_(url, 'preconnect');
    }
    /**
     * @param {string} url
     */

  }, {
    key: "dnsPrefetch",
    value: function dnsPrefetch(url) {
      this.pre_(url, 'dns-prefetch');
    }
    /**
     * @param {string} url
     */

  }, {
    key: "prefetch",
    value: function prefetch(url) {
      this.pre_(url, 'preconnect prefetch');
    }
    /**
     * @param {string} url
     * @param {string} as
     */

  }, {
    key: "preload",
    value: function preload(url, as) {
      this.pre_(url, 'preconnect preload', as);
    }
    /**
     * @param {string} url
     * @param {string} rel
     * @param {?string=} as
     * @private
     */

  }, {
    key: "pre_",
    value: function pre_(url, rel, as) {
      // <link rel="prefetch" href="..." as="">
      var linkEl = (0, _dom.createElement)(this.doc_, 'link', {
        'rel': rel,
        'href': url
      });

      if (as) {
        linkEl.setAttribute('as', as);
      }

      this.doc_.head.appendChild(linkEl);
    }
  }]);

  return Preconnect;
}();

exports.Preconnect = Preconnect;

},{"./dom":72}],81:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getRandomInts = getRandomInts;

/**
 * Copyright 2019 The Subscribe with Google Authors. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS-IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * Returns an array of random values.  The length of the array is numInts.  Each
 * int will be >= 0 and < maxVal.
 * @param {!number} numInts
 * @param {!number} maxVal
 */
function getRandomInts(numInts, maxVal) {
  // Ensure array type is appropriate for the max value (performance)
  var arr = maxVal < 256 ? new Uint8Array(numInts) : maxVal < 32768 ? new Uint16Array(numInts) : new Uint32Array(numInts);
  var isIE = !!self['msCrypto'];
  var localCrypto = isIE ? self['msCrypto'] : self.crypto;

  if (localCrypto && localCrypto.getRandomValues) {
    localCrypto.getRandomValues(arr);

    for (var i = arr.length - 1; i > -1; i--) {
      arr[i] = arr[i] % maxVal;
    }
  } else {
    // For older browsers
    for (var _i = arr.length - 1; _i > -1; _i--) {
      arr[_i] = Math.floor(Math.random() * maxVal);
    }
  }

  return arr;
}

},{}],82:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.dashToCamelCase = dashToCamelCase;
exports.dashToUnderline = dashToUnderline;
exports.endsWith = endsWith;
exports.startsWith = startsWith;
exports.expandTemplate = expandTemplate;
exports.stringHash32 = stringHash32;
exports.getUuid = getUuid;
exports.getSwgTransactionId = getSwgTransactionId;
exports.hash = hash;

var _random = require("./random");

var _bytes = require("./bytes");

/**
 * Copyright 2018 The Subscribe with Google Authors. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS-IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
var CHARS = '0123456789ABCDEF';
/**
 * @param {string} _match
 * @param {string} character
 * @return {string}
 */

function toUpperCase(_match, character) {
  return character.toUpperCase();
}
/**
 * @param {string} name Attribute name with dashes
 * @return {string} Dashes removed and character after to upper case.
 * visibleForTesting
 */


function dashToCamelCase(name) {
  return name.replace(/-([a-z])/g, toUpperCase);
}
/**
 * @param {string} name Attribute name with dashes
 * @return {string} Dashes replaced by underlines.
 */


function dashToUnderline(name) {
  return name.replace('-', '_');
}
/**
 * Polyfill for String.prototype.endsWith.
 * @param {string} string
 * @param {string} suffix
 * @return {boolean}
 */


function endsWith(string, suffix) {
  var index = string.length - suffix.length;
  return index >= 0 && string.indexOf(suffix, index) == index;
}
/**
 * Polyfill for String.prototype.startsWith.
 * @param {string} string
 * @param {string} prefix
 * @return {boolean}
 */


function startsWith(string, prefix) {
  if (prefix.length > string.length) {
    return false;
  }

  return string.lastIndexOf(prefix, 0) == 0;
}
/**
 * Expands placeholders in a given template string with values.
 *
 * Placeholders use ${key-name} syntax and are replaced with the value
 * returned from the given getter function.
 *
 * @param {string} template The template string to expand.
 * @param {!function(string):*} getter Function used to retrieve a value for a
 *   placeholder. Returns values will be coerced into strings.
 * @param {number=} maxIterations Number of times to expand the template.
 *   Defaults to 1, but should be set to a larger value your placeholder tokens
 *   can be expanded to other placeholder tokens. Take caution with large values
 *   as recursively expanding a string can be exponentially expensive.
 */


function expandTemplate(template, getter) {
  var maxIterations = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 1;

  var _loop = function _loop(i) {
    var matches = 0;
    template = template.replace(/\${([^}]*)}/g, function (_a, b) {
      matches++;
      return getter(b);
    });

    if (!matches) {
      return "break";
    }
  };

  for (var i = 0; i < maxIterations; i++) {
    var _ret = _loop(i);

    if (_ret === "break") break;
  }

  return template;
}
/**
 * Hash function djb2a
 * This is intended to be a simple, fast hashing function using minimal code.
 * It does *not* have good cryptographic properties.
 * @param {string} str
 * @return {string} 32-bit unsigned hash of the string
 */


function stringHash32(str) {
  var length = str.length;
  var hash = 5381;

  for (var i = 0; i < length; i++) {
    hash = hash * 33 ^ str.charCodeAt(i);
  } // Convert from 32-bit signed to unsigned.


  return String(hash >>> 0);
}
/**
 * Ensures the passed value is safe to use for character 19 per rfc4122,
 * sec. 4.1.5.  "Sets the high bits of clock sequence".
 * @param {!number} v
 */


function getChar19(v) {
  return CHARS[v & 0x3 | 0x8];
}
/**
 * The returned identifier will always be an 8 digit valid hexidecimal number
 * and will be unique for each MS within a given month.
 * @return {string}
 */


function getMonthlyTimeIdentifier() {
  var hexTime = Date.now().toString(16);
  return hexTime.substring(hexTime.length - 8).toUpperCase();
}
/**
 * Generates a RFC 4122 V4 UUID. Ex: "92329D39-6F5C-4520-ABFC-AAB64544E172"
 * The first 8 digits are unique for the millisecond of the month.  The rest
 * are randomly generated.
 */


function getUuid() {
  var uuid = getMonthlyTimeIdentifier() + '-';
  var rIndex = 0;
  var rands = (0, _random.getRandomInts)(23, 16);

  for (var i = 9; i < 36; i++) {
    switch (i) {
      case 13:
      case 18:
      case 23:
        uuid += '-';
        break;

      case 14:
        uuid += '4';
        break;

      case 19:
        uuid += getChar19(rands[rIndex++]);
        break;

      default:
        uuid += CHARS[rands[rIndex++]];
        break;
    }
  }

  return uuid;
}

function getSwgTransactionId() {
  return getUuid() + '.swg';
}
/**
 * Returns a string whose length matches the length of format.
 * @param {string} str
 * @param {string} format
 * @return {string}
 */


function padString(str, format) {
  return (format + str).slice(-format.length);
}

var PADDING = '00000000';

function toHex(buffer) {
  var hexCodes = [];
  var view = new DataView(buffer);

  for (var i = 0; i < view.byteLength; i += 4) {
    // toString(16) will give the hex representation of the number without padding
    var stringValue = view.getUint32(i).toString(16);
    hexCodes.push(padString(stringValue, PADDING));
  }

  return hexCodes.join('');
}
/**
 * Returns a hexadecimal 128 character string that is the
 * SHA-512 hash of the passed string.
 * @param {string} stringToHash
 * @return {!Promise<string>}
 */


function hash(stringToHash) {
  var crypto = self.crypto || self.msCrypto;
  var subtle = crypto.subtle;
  return subtle.digest('SHA-512', (0, _bytes.utf8EncodeSync)(stringToHash)).then(function (digest) {
    return toHex(digest);
  });
}

},{"./bytes":69,"./random":81}],83:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.camelCaseToTitleCase = camelCaseToTitleCase;
exports.getVendorJsPropertyName = getVendorJsPropertyName;
exports.setImportantStyles = setImportantStyles;
exports.setStyle = setStyle;
exports.getStyle = getStyle;
exports.setStyles = setStyles;
exports.toggle = toggle;
exports.px = px;
exports.translateX = translateX;
exports.translate = translate;
exports.scale = scale;
exports.removeAlphaFromColor = removeAlphaFromColor;
exports.computedStyle = computedStyle;
exports.resetStyles = resetStyles;
exports.resetAllStyles = resetAllStyles;
exports.googleFontsUrl = exports.defaultStyles = void 0;

var _object = require("./object.js");

var _string = require("./string");

/**
 * Copyright 2018 The Subscribe with Google Authors. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS-IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
// Note: loaded by 3p system. Cannot rely on babel polyfills.

/** @type {Object<string, string>} */
var propertyNameCache;
/** @const {!Array<string>} */

var vendorPrefixes = ['Webkit', 'webkit', 'Moz', 'moz', 'ms', 'O', 'o'];
/**
 * Default styles to be set for top level friendly iframe.
 * Some attributes are not included such as height, left, margin-left; since
 * these attributes are updated by @media queries and having these values
 * defined here as !important does not work on IE/edge browsers.
 * @const {!Object<string, string|number>}
 */

var defaultStyles = {
  'align-content': 'normal',
  'animation': 'none',
  'align-items': 'normal',
  'align-self': 'auto',
  'alignment-baseline': 'auto',
  'backface-visibility': 'hidden',
  'background-clip': 'border-box',
  'background-image': 'none',
  'baseline-shift': '0',
  'block-size': 'auto',
  'border': 'none',
  'border-collapse': 'separate',
  'bottom': '0',
  'box-sizing': 'border-box',
  'break-after': 'auto',
  'break-before': 'auto',
  'break-inside': 'auto',
  'buffered-rendering': 'auto',
  'caption-side': 'top',
  'caret-color': 'rgb(51, 51, 51)',
  'clear': 'none',
  'color': 'rgb(51, 51, 51)',
  'color-rendering': 'auto',
  'column-count': 'auto',
  'column-fill': 'balance',
  'column-gap': 'normal',
  'column-rule-color': 'rgb(51, 51, 51)',
  'column-rule-style': 'none',
  'column-rule-width': '0',
  'column-span': 'none',
  'column-width': 'auto',
  'contain': 'none',
  'counter-increment': 'none',
  'counter-reset': 'none',
  'cursor': 'auto',
  'direction': 'inherit',
  'display': 'block',
  'empty-cells': 'show',
  'filter': 'none',
  'flex': 'none',
  // flex-grow, flex-shrink, and flex-basis.
  'flex-flow': 'row nowrap',
  // flex-direction, flex-wrap.
  'float': 'none',
  'flood-color': 'rgb(0, 0, 0)',
  'flood-opacity': '1',
  'font': 'none',
  'font-size': 'medium',
  'font-family': '',
  'height': 'auto',
  'hyphens': 'manual',
  'image-rendering': 'auto',
  'inline-size': '',
  // Setting to 'auto' will not allow override.
  'isolation': 'auto',
  'justify-content': 'normal',
  'justify-items': 'normal',
  'justify-self': 'auto',
  'letter-spacing': 'normal',
  'lighting-color': 'rgb(255, 255, 255)',
  'line-break': 'auto',
  'line-height': 'normal',
  'mask': 'none',
  'max-block-size': 'none',
  'max-height': 'none',
  'max-inline-size': 'none',
  'max-width': 'none',
  'min-block-size': 'none',
  'min-height': '0',
  'min-inline-size': '0',
  'min-width': '0',
  'mix-blend-mode': 'normal',
  'object-fit': 'fill',
  // Important for Safari browser.
  'offset-distance': 'none',
  // Chrome only (Experimental).
  'offset-path': 'none',
  // Chrome only (Experimental).
  'offset-rotate': 'auto 0deg',
  // Chrome only (Experimental).
  'opacity': '1',
  'order': '0',
  'orphans': '2',
  'outline': 'none',
  'overflow-anchor': 'auto',
  'overflow-wrap': 'normal',
  'overflow': 'visible',
  'padding': '0',
  'page': '',
  'perspective': 'none',
  'pointer-events': 'auto',
  'position': 'static',
  'quotes': '',
  'resize': 'none',
  'right': '0',
  'scroll-behavior': 'auto',
  'tab-size': '8',
  // Only Chrome, Safari (Experimental).
  'table-layout': 'auto',
  'text-align': 'start',
  'text-align-last': 'auto',
  'text-anchor': 'start',
  'text-combine-upright': 'none',
  'text-decoration': 'none',
  'text-indent': '0',
  'text-orientation': 'mixed',
  'text-overflow': 'clip',
  'text-rendering': 'auto',
  'text-shadow': 'none',
  'text-size-adjust': 'auto',
  'text-transform': 'none',
  'text-underline-position': 'auto',
  'top': 'auto',
  'touch-action': 'auto',
  'transform': 'none',
  'transition': 'none 0s ease 0s',
  'unicode-bidi': 'normal',
  'user-select': 'auto',
  'vector-effect': 'none',
  'vertical-align': 'baseline',
  'visibility': 'visible',
  'white-space': 'normal',
  'widows': '2',
  'word-break': 'normal',
  'word-spacing': '0',
  'word-wrap': 'normal',
  'writing-mode': 'horizontal-tb',
  'zoom': '1',
  'z-index': 'auto'
};
/** @const {string} */

exports.defaultStyles = defaultStyles;
var googleFontsUrl = 'https://fonts.googleapis.com/css?family=Google+Sans';
/**
 * @export
 * @param {string} camelCase camel cased string
 * @return {string} title cased string
 */

exports.googleFontsUrl = googleFontsUrl;

function camelCaseToTitleCase(camelCase) {
  return camelCase.charAt(0).toUpperCase() + camelCase.slice(1);
}
/**
 * Checks the style if a prefixed version of a property exists and returns
 * it or returns an empty string.
 * @private
 * @param {!Object} style
 * @param {string} titleCase the title case version of a css property name
 * @return {string} the prefixed property name or null.
 */


function getVendorJsPropertyName_(style, titleCase) {
  for (var i = 0; i < vendorPrefixes.length; i++) {
    var propertyName = vendorPrefixes[i] + titleCase;

    if (style[propertyName] !== undefined) {
      return propertyName;
    }
  }

  return '';
}
/**
 * Returns the possibly prefixed JavaScript property name of a style property
 * (ex. WebkitTransitionDuration) given a camelCase'd version of the property
 * (ex. transitionDuration).
 * @export
 * @param {!Object} style
 * @param {string} camelCase the camel cased version of a css property name
 * @param {boolean=} bypassCache bypass the memoized cache of property
 *   mapping
 * @return {string}
 */


function getVendorJsPropertyName(style, camelCase, bypassCache) {
  if ((0, _string.startsWith)(camelCase, '--')) {
    // CSS vars are returned as is.
    return camelCase;
  }

  if (!propertyNameCache) {
    propertyNameCache = (0, _object.map)();
  }

  var propertyName = propertyNameCache[camelCase];

  if (!propertyName || bypassCache) {
    propertyName = camelCase;

    if (style[camelCase] === undefined) {
      var titleCase = camelCaseToTitleCase(camelCase);
      var prefixedPropertyName = getVendorJsPropertyName_(style, titleCase);

      if (style[prefixedPropertyName] !== undefined) {
        propertyName = prefixedPropertyName;
      }
    }

    if (!bypassCache) {
      propertyNameCache[camelCase] = propertyName;
    }
  }

  return propertyName;
}
/**
 * Sets the CSS styles of the specified element with !important. The styles
 * are specified as a map from CSS property names to their values.
 * @param {!Element} element
 * @param {!Object<string, string|number>} styles
 */


function setImportantStyles(element, styles) {
  for (var k in styles) {
    element.style.setProperty(getVendorJsPropertyName(styles, k), styles[k].toString(), 'important');
  }
}
/**
 * Sets the CSS style of the specified element with optional units, e.g. "px".
 * @param {Element} element
 * @param {string} property
 * @param {?string|number|boolean} value
 * @param {string=} units
 * @param {boolean=} bypassCache
 */


function setStyle(element, property, value, units, bypassCache) {
  var propertyName = getVendorJsPropertyName(element.style, property, bypassCache);

  if (propertyName) {
    element.style[propertyName] =
    /** @type {string} */
    units ? value + units : value;
  }
}
/**
 * Returns the value of the CSS style of the specified element.
 * @param {!Element} element
 * @param {string} property
 * @param {boolean=} bypassCache
 * @return {*}
 */


function getStyle(element, property, bypassCache) {
  var propertyName = getVendorJsPropertyName(element.style, property, bypassCache);

  if (!propertyName) {
    return undefined;
  }

  return element.style[propertyName];
}
/**
 * Sets the CSS styles of the specified element. The styles
 * a specified as a map from CSS property names to their values.
 * @param {!Element} element
 * @param {!Object<string, ?string|number|boolean>} styles
 */


function setStyles(element, styles) {
  for (var k in styles) {
    setStyle(element, k, styles[k]);
  }
}
/**
 * Shows or hides the specified element.
 * @param {!Element} element
 * @param {boolean=} display
 */


function toggle(element, display) {
  if (display === undefined) {
    display = getStyle(element, 'display') == 'none';
  }

  setStyle(element, 'display', display ? '' : 'none');
}
/**
 * Returns a pixel value.
 * @param {number} value
 * @return {string}
 */


function px(value) {
  return value + 'px';
}
/**
 * Returns a "translateX" for CSS "transform" property.
 * @param {number|string} value
 * @return {string}
 */


function translateX(value) {
  if (typeof value == 'string') {
    return "translateX(".concat(value, ")");
  }

  return "translateX(".concat(px(value), ")");
}
/**
 * Returns a "translateX" for CSS "transform" property.
 * @param {number|string} x
 * @param {(number|string)=} y
 * @return {string}
 */


function translate(x, y) {
  if (typeof x == 'number') {
    x = px(x);
  }

  if (y === undefined) {
    return "translate(".concat(x, ")");
  }

  if (typeof y == 'number') {
    y = px(y);
  }

  return "translate(".concat(x, ", ").concat(y, ")");
}
/**
 * Returns a "scale" for CSS "transform" property.
 * @param {number|string} value
 * @return {string}
 */


function scale(value) {
  return "scale(".concat(value, ")");
}
/**
 * Remove alpha value from a rgba color value.
 * Return the new color property with alpha equals if has the alpha value.
 * Caller needs to make sure the input color value is a valid rgba/rgb value
 * @param {string} rgbaColor
 * @return {string}
 */


function removeAlphaFromColor(rgbaColor) {
  return rgbaColor.replace(/\(([^,]+),([^,]+),([^,)]+),[^)]+\)/g, '($1,$2,$3, 1)');
}
/**
 * Gets the computed style of the element. The helper is necessary to enforce
 * the possible `null` value returned by a buggy Firefox.
 *
 * @param {!Window} win
 * @param {!Element} el
 * @return {!Object<string, string>}
 */


function computedStyle(win, el) {
  var style =
  /** @type {?CSSStyleDeclaration} */
  win.getComputedStyle(el);
  return (
    /** @type {!Object<string, string>} */
    style || (0, _object.map)()
  );
}
/**
 * Resets styles that were set dynamically (i.e. inline)
 * @param {!Element} element
 * @param {!Array<string>} properties
 */


function resetStyles(element, properties) {
  var styleObj = {};
  properties.forEach(function (prop) {
    styleObj[prop] = null;
  });
  setStyles(element, styleObj);
}
/**
 * Resets all the styles of an element to a given value. Defaults to null.
 * The valid values are 'inherit', 'initial', 'unset' or null.
 * @param {!Element} element
 */


function resetAllStyles(element) {
  setImportantStyles(element, defaultStyles);
}

},{"./object.js":79,"./string":82}],84:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isObject = isObject;
exports.isEnumValue = isEnumValue;
exports.isFunction = isFunction;
exports.isBoolean = isBoolean;

/**
 * Copyright 2018 The Subscribe with Google Authors. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS-IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * Determines if value is actually an Object.
 * @param {*} value
 * @return {boolean}
 */
function isObject(value) {
  var str = Object.prototype.toString.call(value);
  return str === '[object Object]';
}
/**
 * Checks whether `s` is a valid value of `enumObj`.
 *
 * @param {!Object<T>} enumObj
 * @param {T} s
 * @return {boolean}
 * @template T
 */


function isEnumValue(enumObj, s) {
  for (var k in enumObj) {
    if (enumObj[k] === s) {
      return true;
    }
  }

  return false;
}
/**
 * True if the value is a function.
 * @param {*} value
 * @return {boolean}
 */


function isFunction(value) {
  return typeof value === 'function';
}
/**
 * True if the value is either true or false.
 * @param {?*} value
 * @return {boolean}
 */


function isBoolean(value) {
  return typeof value === 'boolean';
}

},{}],85:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.serializeQueryString = serializeQueryString;
exports.parseUrl = parseUrl;
exports.parseQueryString = parseQueryString;
exports.addQueryParam = addQueryParam;
exports.serializeProtoMessageForUrl = serializeProtoMessageForUrl;
exports.getHostUrl = getHostUrl;
exports.getCanonicalUrl = getCanonicalUrl;

var _log = require("./log");

/**
 * Copyright 2018 The Subscribe with Google Authors. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS-IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
  @typedef {{
    href: string,
    protocol: string,
    host: string,
    hostname: string,
    port: string,
    pathname: string,
    search: string,
    hash: string,
    origin: string,
  }}
  */
var LocationDef;
/**
 * Cached a-tag to avoid memory allocation during URL parsing.
 * @type {HTMLAnchorElement}
 */

var a;
/**
 * We cached all parsed URLs. As of now there are no use cases
 * of AMP docs that would ever parse an actual large number of URLs,
 * but we often parse the same one over and over again.
 * @type {Object<string, !LocationDef>}
 */

var cache;
/**
 * Serializes the passed parameter map into a query string with both keys
 * and values encoded.
 * @param {!JsonObject} params
 * @return {string}
 */

function serializeQueryString(params) {
  var s = [];

  for (var k in params) {
    var v = params[k];

    if (v == null) {
      continue;
    } else if (Array.isArray(v)) {
      for (var i = 0; i < v.length; i++) {
        var sv =
        /** @type {string} */
        v[i];
        s.push("".concat(encodeURIComponent(k), "=").concat(encodeURIComponent(sv)));
      }
    } else {
      var _sv =
      /** @type {string} */
      v;
      s.push("".concat(encodeURIComponent(k), "=").concat(encodeURIComponent(_sv)));
    }
  }

  return s.join('&');
}
/**
 * Returns a Location-like object for the given URL. If it is relative,
 * the URL gets resolved.
 * Consider the returned object immutable. This is enforced during
 * testing by freezing the object.
 * @param {string} url
 * @return {!LocationDef}
 */


function parseUrl(url) {
  if (!a) {
    a =
    /** @type {!HTMLAnchorElement} */
    self.document.createElement('a');
    cache = self.UrlCache || (self.UrlCache = Object.create(null));
  }

  var fromCache = cache[url];

  if (fromCache) {
    return fromCache;
  }

  var info = parseUrlWithA(a, url);
  return cache[url] = info;
}
/**
 * Returns a Location-like object for the given URL. If it is relative,
 * the URL gets resolved.
 * @param {!HTMLAnchorElement} a
 * @param {string} url
 * @return {!LocationDef}
 */


function parseUrlWithA(a, url) {
  a.href = url; // IE11 doesn't provide full URL components when parsing relative URLs.
  // Assigning to itself again does the trick.

  if (!a.protocol) {
    a.href = a.href;
  }
  /** @type {!LocationDef} */


  var info = {
    href: a.href,
    protocol: a.protocol,
    host: a.host,
    hostname: a.hostname,
    port: a.port == '0' ? '' : a.port,
    pathname: a.pathname,
    search: a.search,
    hash: a.hash,
    origin: '' // Set below.

  }; // Some IE11 specific polyfills.
  // 1) IE11 strips out the leading '/' in the pathname.

  if (info.pathname[0] !== '/') {
    info.pathname = '/' + info.pathname;
  } // 2) For URLs with implicit ports, IE11 parses to default ports while
  // other browsers leave the port field empty.


  if (info.protocol == 'http:' && info.port == 80 || info.protocol == 'https:' && info.port == 443) {
    info.port = '';
    info.host = info.hostname;
  } // For data URI a.origin is equal to the string 'null' which is not useful.
  // We instead return the actual origin which is the full URL.


  if (a.origin && a.origin != 'null') {
    info.origin = a.origin;
  } else if (info.protocol == 'data:' || !info.host) {
    info.origin = info.href;
  } else {
    info.origin = info.protocol + '//' + info.host;
  }

  return info;
}
/**
 * Parses and builds Object of URL query string.
 * @param {string} query The URL query string.
 * @return {!Object<string, string>}
 */


function parseQueryString(query) {
  if (!query) {
    return {};
  }

  return (/^[?#]/.test(query) ? query.slice(1) : query).split('&').reduce(function (params, param) {
    var item = param.split('=');

    try {
      var key = decodeURIComponent(item[0] || '');
      var value = decodeURIComponent(item[1] || '');

      if (key) {
        params[key] = value;
      }
    } catch (err) {
      // eslint-disable-next-line no-console
      (0, _log.warn)("SwG could not parse a URL query param: ".concat(item[0]));
    }

    return params;
  }, {});
}
/**
 * Adds a parameter to a query string.
 * @param {string} url
 * @param {string} param
 * @param {string} value
 * @return {string}
 */


function addQueryParam(url, param, value) {
  var queryIndex = url.indexOf('?');
  var fragmentIndex = url.indexOf('#');
  var fragment = '';

  if (fragmentIndex != -1) {
    fragment = url.substring(fragmentIndex);
    url = url.substring(0, fragmentIndex);
  }

  if (queryIndex == -1) {
    url += '?';
  } else if (queryIndex < url.length - 1) {
    url += '&';
  }

  url += encodeURIComponent(param) + '=' + encodeURIComponent(value);
  return url + fragment;
}
/**
 * @param {!../proto/api_messages.Message} message
 * @return {string}
 */


function serializeProtoMessageForUrl(message) {
  return JSON.stringify(
  /** @type {JsonObject} */
  message.toArray(false));
}
/**
 * Returns the Url including the path and search, without fregment.
 * @param {string} url
 * @return {string}
 */


function getHostUrl(url) {
  var locationHref = parseUrl(url);
  return locationHref.origin + locationHref.pathname + locationHref.search;
}
/**
 * @param {!../model/doc.Doc} doc
 * @return {string}
 */


function getCanonicalUrl(doc) {
  var node = doc.getRootNode().querySelector("link[rel='canonical']");
  return node && node.href || '';
}

},{"./log":78}],86:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.fetchPolyfill = fetchPolyfill;
exports.assertSuccess = assertSuccess;
exports.FetchResponseHeaders = exports.FetchResponse = exports.Xhr = exports.FetchInitDef = void 0;

var _log = require("./log");

var _json = require("./json");

var _url = require("./url");

var _bytes = require("./bytes");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

/**
 * The "init" argument of the Fetch API. Currently, only "credentials: include"
 * is implemented.
 *
 * See https://developer.mozilla.org/en-US/docs/Web/API/GlobalFetch/fetch
 *
 * @typedef {{
 *   body: (!FormData|string|undefined),
 *   credentials: (string|undefined),
 *   headers: (!Object|undefined),
 *   method: (string|undefined),
 *   responseType: (string)
 * }}
 */
var FetchInitDef;
/** @private @const {!Array<string>} */

exports.FetchInitDef = FetchInitDef;
var allowedMethods_ = ['GET', 'POST'];
/** @private @enum {number} Allowed fetch responses. */

var allowedFetchTypes_ = {
  document: 1,
  text: 2
};
/**
 * A class that polyfills Fetch API.
 */

var Xhr = /*#__PURE__*/function () {
  /**
   * @param {!Window} win
   */
  function Xhr(win) {
    _classCallCheck(this, Xhr);

    /** @const {!Window} */
    this.win = win;
  }
  /**
   * We want to call `fetch_` unbound from any context since it could
   * be either the native fetch or our polyfill.
   *
   * @param {string} input
   * @param {!FetchInitDef} init
   * @return {!Promise<!FetchResponse>|!Promise<!Response>}
   * @private
   */


  _createClass(Xhr, [{
    key: "fetch_",
    value: function fetch_(input, init) {
      // TODO(avimehta): Should the requests go through when page is not visible?
      (0, _log.assert)(typeof input == 'string', 'Only URL supported: %s', input); // In particular, Firefox does not tolerate `null` values for
      // `credentials`.

      var creds = init.credentials;
      (0, _log.assert)(creds === undefined || creds == 'include' || creds == 'omit', 'Only credentials=include|omit support: %s', creds); // Fallback to xhr polyfill since `fetch` api does not support
      // responseType = 'document'. We do this so we don't have to do any parsing
      // and document construction on the UI thread which would be expensive.

      if (init.responseType == 'document') {
        return fetchPolyfill(input, init);
      }

      return (this.win.fetch || fetchPolyfill).apply(null, arguments);
    }
    /**
     * @param {string} input URL
     * @param {?FetchInitDef} init Fetch options object.
     * @return {!Promise<!FetchResponse>}
     */

  }, {
    key: "fetch",
    value: function fetch(input, init) {
      // TODO (avimehta): Figure out if CORS needs be handled the way AMP does it.
      init = setupInit(init);
      return this.fetch_(input, init).then(function (response) {
        return response;
      }, function (reason) {
        var targetOrigin = (0, _url.parseUrl)(input).origin;
        throw new Error("XHR Failed fetching (".concat(targetOrigin, "/...):"), reason && reason.message);
      }).then(function (response) {
        return assertSuccess(response);
      });
    }
  }]);

  return Xhr;
}();
/**
 * Normalized method name by uppercasing.
 * @param {string|undefined} method
 * @return {string}
 * @private
 */


exports.Xhr = Xhr;

function normalizeMethod_(method) {
  if (method === undefined) {
    return 'GET';
  }

  method = method.toUpperCase();
  (0, _log.assert)(allowedMethods_.includes(method), 'Only one of %s is currently allowed. Got %s', allowedMethods_.join(', '), method);
  return method;
}
/**
 * Sets up and normalizes the FetchInitDef
 *
 * @param {?FetchInitDef=} init Fetch options object.
 * @param {string=} accept The HTTP Accept header value.
 * @return {!FetchInitDef}
 */


function setupInit(init, accept) {
  init = init ||
  /** @type {FetchInitDef} */
  {};
  init.method = normalizeMethod_(init.method);
  init.headers = init.headers || {};

  if (accept) {
    init.headers['Accept'] = accept;
  }

  return init;
}
/**
 * A minimal polyfill of Fetch API. It only polyfills what we currently use.
 *
 * See https://developer.mozilla.org/en-US/docs/Web/API/GlobalFetch/fetch
 *
 * Notice that the "fetch" method itself is not exported as that would require
 * us to immediately support a much wide API.
 *
 * @param {string} input
 * @param {!FetchInitDef} init
 * @return {!Promise<!FetchResponse>}
 * @private Visible for testing
 */


function fetchPolyfill(input, init) {
  return new Promise(function (resolve, reject) {
    var xhr = createXhrRequest(init.method || 'GET', input);

    if (init.credentials == 'include') {
      xhr.withCredentials = true;
    }

    if (init.responseType in allowedFetchTypes_) {
      xhr.responseType = init.responseType;
    }

    if (init.headers) {
      Object.keys(init.headers).forEach(function (header) {
        xhr.setRequestHeader(header, init.headers[header]);
      });
    }

    xhr.onreadystatechange = function () {
      if (xhr.readyState <
      /* STATUS_RECEIVED */
      2) {
        return;
      }

      if (xhr.status < 100 || xhr.status > 599) {
        xhr.onreadystatechange = null;
        reject(new Error("Unknown HTTP status ".concat(xhr.status)));
        return;
      } // TODO(dvoytenko): This is currently simplified: we will wait for the
      // whole document loading to complete. This is fine for the use cases
      // we have now, but may need to be reimplemented later.


      if (xhr.readyState ==
      /* COMPLETE */
      4) {
        resolve(new FetchResponse(xhr));
      }
    };

    xhr.onerror = function () {
      reject(new Error('Network failure'));
    };

    xhr.onabort = function () {
      reject(new Error('Request aborted'));
    };

    if (init.method == 'POST') {
      xhr.send(init.body);
    } else {
      xhr.send();
    }
  });
}
/**
 * @param {string} method
 * @param {string} url
 * @return {!XMLHttpRequest}
 * @private
 */


function createXhrRequest(method, url) {
  var xhr = new XMLHttpRequest();

  if ('withCredentials' in xhr) {
    xhr.open(method, url, true);
  } else {
    throw new Error('CORS is not supported');
  }

  return xhr;
}
/**
 * If 415 or in the 5xx range.
 * @param {number} status
 */


function isRetriable(status) {
  return status == 415 || status >= 500 && status < 600;
}
/**
 * Returns the response if successful or otherwise throws an error.
 * @param {!FetchResponse} response
 * @return {!Promise<!FetchResponse>}
 * @private Visible for testing
 */


function assertSuccess(response) {
  return new Promise(function (resolve) {
    if (response.ok) {
      return resolve(response);
    }

    var status = response.status;
    var err = new Error("HTTP error ".concat(status));
    err.retriable = isRetriable(status); // TODO(@jridgewell, #9448): Callers who need the response should
    // skip processing.

    err.response = response;
    throw err;
  });
}
/**
 * Response object in the Fetch API.
 *
 * See https://developer.mozilla.org/en-US/docs/Web/API/GlobalFetch/fetch
 */


var FetchResponse = /*#__PURE__*/function () {
  /**
   * @param {!XMLHttpRequest} xhr
   */
  function FetchResponse(xhr) {
    _classCallCheck(this, FetchResponse);

    /** @private @const {!XMLHttpRequest} */
    this.xhr_ = xhr;
    /** @const {number} */

    this.status = this.xhr_.status;
    /** @const {boolean} */

    this.ok = this.status >= 200 && this.status < 300;
    /** @const {!FetchResponseHeaders} */

    this.headers = new FetchResponseHeaders(xhr);
    /** @type {boolean} */

    this.bodyUsed = false;
    /** @type {?ReadableStream} */

    this.body = null;
  }
  /**
   * Create a copy of the response and return it.
   * @return {!FetchResponse}
   */


  _createClass(FetchResponse, [{
    key: "clone",
    value: function clone() {
      (0, _log.assert)(!this.bodyUsed, 'Body already used');
      return new FetchResponse(this.xhr_);
    }
    /**
     * Drains the response and returns the text.
     * @return {!Promise<string>}
     * @private
     */

  }, {
    key: "drainText_",
    value: function drainText_() {
      (0, _log.assert)(!this.bodyUsed, 'Body already used');
      this.bodyUsed = true;
      return Promise.resolve(this.xhr_.responseText);
    }
    /**
     * Drains the response and returns a promise that resolves with the response
     * text.
     * @return {!Promise<string>}
     */

  }, {
    key: "text",
    value: function text() {
      return this.drainText_();
    }
    /**
     * Drains the response and returns the JSON object.
     * @return {!Promise<!JsonObject>}
     */

  }, {
    key: "json",
    value: function json() {
      return (
        /** @type {!Promise<!JsonObject>} */
        this.drainText_().then(_json.parseJson)
      );
    }
    /**
     * Reads the xhr responseXML.
     * @return {!Promise<!Document>}
     * @private
     */

  }, {
    key: "document_",
    value: function document_() {
      (0, _log.assert)(!this.bodyUsed, 'Body already used');
      this.bodyUsed = true;
      (0, _log.assert)(this.xhr_.responseXML, 'responseXML should exist. Make sure to return ' + 'Content-Type: text/html header.');
      return (
        /** @type {!Promise<!Document>} */
        Promise.resolve((0, _log.assert)(this.xhr_.responseXML))
      );
    }
    /**
     * Drains the response and returns a promise that resolves with the response
     * ArrayBuffer.
     * @return {!Promise<!ArrayBuffer>}
     */

  }, {
    key: "arrayBuffer",
    value: function arrayBuffer() {
      return (
        /** @type {!Promise<!ArrayBuffer>} */
        this.drainText_().then(_bytes.utf8EncodeSync)
      );
    }
  }]);

  return FetchResponse;
}();
/**
 * Provides access to the response headers as defined in the Fetch API.
 * @private Visible for testing.
 */


exports.FetchResponse = FetchResponse;

var FetchResponseHeaders = /*#__PURE__*/function () {
  /**
   * @param {!XMLHttpRequest} xhr
   */
  function FetchResponseHeaders(xhr) {
    _classCallCheck(this, FetchResponseHeaders);

    /** @private @const {!XMLHttpRequest} */
    this.xhr_ = xhr;
  }
  /**
   * @param {string} name
   * @return {string}
   */


  _createClass(FetchResponseHeaders, [{
    key: "get",
    value: function get(name) {
      return this.xhr_.getResponseHeader(name);
    }
    /**
     * @param {string} name
     * @return {boolean}
     */

  }, {
    key: "has",
    value: function has(name) {
      return this.xhr_.getResponseHeader(name) != null;
    }
  }]);

  return FetchResponseHeaders;
}();

exports.FetchResponseHeaders = FetchResponseHeaders;

},{"./bytes":69,"./json":76,"./log":78,"./url":85}],87:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Constants = void 0;

/**
 * @license
 * Copyright 2018 Google Inc. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS-IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
var MAX_Z_INDEX = 2147483647;
var Constants = {};
/**
 * Supported environments.
 *
 * @enum {string}
 */

exports.Constants = Constants;
Constants.Environment = {
  LOCAL: 'LOCAL',
  PREPROD: 'PREPROD',
  PRODUCTION: 'PRODUCTION',
  SANDBOX: 'SANDBOX',
  TEST: 'TEST',
  TIN: 'TIN'
};
/**
 * Supported payment methods.
 *
 * @enum {string}
 */

Constants.PaymentMethod = {
  CARD: 'CARD',
  TOKENIZED_CARD: 'TOKENIZED_CARD',
  UPI: 'UPI'
};
/**
 * Auth methods.
 *
 * @enum {string}
 */

Constants.AuthMethod = {
  CRYPTOGRAM_3DS: 'CRYPTOGRAM_3DS',
  PAN_ONLY: 'PAN_ONLY'
};
/**
 * Returned result status.
 *
 * @enum {string}
 */

Constants.ResponseStatus = {
  CANCELED: 'CANCELED',
  DEVELOPER_ERROR: 'DEVELOPER_ERROR'
};
/**
 * Supported total price status.
 *
 * @enum {string}
 */

Constants.TotalPriceStatus = {
  ESTIMATED: 'ESTIMATED',
  FINAL: 'FINAL',
  NOT_CURRENTLY_KNOWN: 'NOT_CURRENTLY_KNOWN'
};
/**
 * Supported Google Pay payment button type.
 *
 * @enum {string}
 */

Constants.ButtonType = {
  SHORT: 'short',
  LONG: 'long'
};
/**
 * Supported button colors.
 *
 * @enum {string}
 */

Constants.ButtonColor = {
  DEFAULT: 'default',
  // Currently defaults to black.
  BLACK: 'black',
  WHITE: 'white'
};
/**
 * Id attributes.
 *
 * @enum {string}
 */

Constants.Id = {
  POPUP_WINDOW_CONTAINER: 'popup-window-container'
};
/** @const {string} */

Constants.STORAGE_KEY_PREFIX = 'google.payments.api.storage';
/** @const {string} */

Constants.IS_READY_TO_PAY_RESULT_KEY = Constants.STORAGE_KEY_PREFIX + '.isreadytopay.result';
/** @const {string} */

Constants.UPI_CAN_MAKE_PAYMENT_CACHE_KEY = Constants.STORAGE_KEY_PREFIX + '.upi.canMakePaymentCache';
Constants.CLASS_PREFIX = 'google-payments-';
Constants.IFRAME_ACTIVE_CONTAINER_CLASS = "".concat(Constants.CLASS_PREFIX, "activeContainer");
Constants.IFRAME_CONTAINER_CLASS = "".concat(Constants.CLASS_PREFIX, "dialogContainer");
Constants.IFRAME_STYLE_CENTER_CLASS = "".concat(Constants.CLASS_PREFIX, "dialogCenter");
Constants.IFRAME_STYLE_CLASS = "".concat(Constants.CLASS_PREFIX, "dialog");
Constants.IFRAME_STYLE = "\n.".concat(Constants.IFRAME_STYLE_CLASS, " {\n    animation: none 0s ease 0s 1 normal none running;\n    background: none 0 0 / auto repeat scroll padding-box border-box #fff;\n    background-blend-mode: normal;\n    border: 0 none #333;\n    border-radius: 8px 8px 0 0;\n    border-collapse: separate;\n    bottom: 0;\n    box-shadow: #808080 0 3px 0 0, #808080 0 0 22px;\n    box-sizing: border-box;\n    letter-spacing: normal;\n    max-height: 100%;\n    overflow: visible;\n    position: fixed;\n    width: 100%;\n    z-index: ").concat(MAX_Z_INDEX, ";\n    -webkit-appearance: none;\n    left: 0;\n}\n@media (min-width: 480px) {\n  .").concat(Constants.IFRAME_STYLE_CLASS, " {\n    width: 480px !important;\n    left: -240px !important;\n    margin-left: calc(100vw - 100vw / 2) !important;\n  }\n}\n.").concat(Constants.IFRAME_CONTAINER_CLASS, " {\n  background-color: rgba(0,0,0,0.26);\n  bottom: 0;\n  height: 100%;\n  left: 0;\n  position: absolute;\n  right: 0;\n}\n.iframeContainer {\n  -webkit-overflow-scrolling: touch;\n}\n");
Constants.IFRAME_STYLE_CENTER = "\n.".concat(Constants.IFRAME_STYLE_CENTER_CLASS, " {\n  animation: none 0s ease 0s 1 normal none running;\n  background-blend-mode: normal;\n  background: none 0 0 / auto repeat scroll padding-box border-box #fff;\n  border-collapse: separate;\n  border-radius: 8px;\n  border: 0px none #333;\n  bottom: auto;\n  box-shadow: #808080 0 0 22px;\n  box-sizing: border-box;\n  left: -240px;\n  letter-spacing: normal;\n  margin-left: calc(100vw - 100vw / 2) !important;\n  max-height: 90%;\n  overflow: visible;\n  position: absolute;\n  top: 100%;\n  transform: scale(0.8);\n  width: 480px;\n  z-index: ").concat(MAX_Z_INDEX, ";\n  -webkit-appearance: none;\n}\n@media (min-height: 667px) {\n  .").concat(Constants.IFRAME_STYLE_CENTER_CLASS, " {\n    max-height: 600px;\n  }\n}\n.").concat(Constants.IFRAME_ACTIVE_CONTAINER_CLASS, " {\n  top: 50%;\n  transform: scale(1.0) translateY(-50%);\n}\n");
Constants.GPAY_BUTTON_WITH_CARD_INFO_IMAGE = 'background-image: url(https://pay.google.com/gp/p/generate_gpay_btn_img);';
Constants.BUTTON_LOCALE_TO_MIN_WIDTH = {
  'en': 152,
  'bg': 163,
  'cs': 192,
  'de': 183,
  'es': 183,
  'fr': 183,
  'hr': 157,
  'id': 186,
  'ja': 148,
  'ko': 137,
  'ms': 186,
  'nl': 167,
  'pl': 182,
  'pt': 193,
  'ru': 206,
  'sk': 157,
  'sl': 211,
  'sr': 146,
  'tr': 161,
  'uk': 207,
  'zh': 156
};
/**
 * Name of the graypane.
 *
 * @const {string}
 */

Constants.GPAY_GRAYPANE = 'gpay-graypane';
/**
 * Class used for the gpay button.
 *
 * @const {string}
 */

Constants.GPAY_BUTTON_CLASS = 'gpay-button';
Constants.BUTTON_STYLE = "\n.".concat(Constants.GPAY_BUTTON_CLASS, " {\n  background-origin: content-box;\n  background-position: center center;\n  background-repeat: no-repeat;\n  background-size: contain;\n  border: 0px;\n  border-radius: 4px;\n  box-shadow: rgba(60, 64, 67, 0.3) 0px 1px 1px 0px, rgba(60, 64, 67, 0.15) 0px 1px 3px 1px;\n  cursor: pointer;\n  height: 40px;\n  min-height: 40px;\n  padding: 11px 24px;\n}\n\n.").concat(Constants.GPAY_BUTTON_CLASS, ".black {\n  background-color: #000;\n  box-shadow: none;\n  padding: 12px 24px 10px;\n}\n\n.").concat(Constants.GPAY_BUTTON_CLASS, ".white {\n  background-color: #fff;\n}\n\n.").concat(Constants.GPAY_BUTTON_CLASS, ".short {\n  min-width: 90px;\n  width: 160px;\n}\n\n.").concat(Constants.GPAY_BUTTON_CLASS, ".black.short {\n  background-image: url(https://www.gstatic.com/instantbuy/svg/dark_gpay.svg);\n}\n\n.").concat(Constants.GPAY_BUTTON_CLASS, ".white.short {\n  background-image: url(https://www.gstatic.com/instantbuy/svg/light_gpay.svg);\n}\n\n.").concat(Constants.GPAY_BUTTON_CLASS, ".black.active {\n  background-color: #5f6368;\n}\n\n.").concat(Constants.GPAY_BUTTON_CLASS, ".black.hover {\n  background-color: #3c4043;\n}\n\n.").concat(Constants.GPAY_BUTTON_CLASS, ".white.active {\n  background-color: #fff;\n}\n\n.").concat(Constants.GPAY_BUTTON_CLASS, ".white.focus {\n  box-shadow: #e8e8e8 0 1px 1px 0, #e8e8e8 0 1px 3px;\n}\n\n.").concat(Constants.GPAY_BUTTON_CLASS, ".white.hover {\n  background-color: #f8f8f8;\n}\n");
Constants.GPAY_BUTTON_WITH_OFFER_ICON_ADDITIONAL_STYLE = 'position: relative;';
Constants.GPAY_OFFER_ICON_CLASS = 'gpay-offer-icon';
Constants.GPAY_OFFER_ICON_SVG = "<svg width=\"20px\" height=\"20px\" viewBox=\"0 0 20 20\" " + "version=\"1.1\" xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=" + "\"http://www.w3.org/1999/xlink\" class=\"gpay-offer-icon\"><defs><path d=\"M19.41,9.58 L10.41,0.58 " + "C10.05,0.22 9.55,0 9,0 L2,0 C0.9,0 0,0.9 0,2 L0,9 C0,9.55 0.22,10.05 " + "0.59,10.42 L9.59,19.42 C9.95,19.78 10.45,20 11,20 C11.55,20 12.05,19.78 " + "12.41,19.41 L19.41,12.41 C19.78,12.05 20,11.55 20,11 C20,10.45 19.77," + "9.94 19.41,9.58 Z\" id=\"path-1\"></path></defs><g id=\"buttons_10.05\"" + " stroke=\"none\" stroke-width=\"1\" fill=\"none\" fill-rule=\"evenodd\">" + "<g id=\"Artboard\" transform=\"translate(-40.000000, -43.000000)\">" + "<g id=\"Group-3\" transform=\"translate(40.000000, 43.000000)\">" + "<g id=\"Group-2-Copy-2\"><g id=\"Group-Copy\"><g id=\"ic_loyalty_24px\">" + "<mask id=\"mask-2\" fill=\"white\"><use xlink:href=\"#path-1\"></use>" + "</mask><use id=\"gpay-Shape\" fill=\"#FF6100\" fill-rule=\"nonzero\" " + "xlink:href=\"#path-1\"></use><path d=\"M3.5,5 C2.67,5 2,4.33 2,3.5 C2," + "2.67 2.67,2 3.5,2 C4.33,2 5,2.67 5,3.5 C5,4.33 4.33,5 3.5,5 Z\" " + "id=\"Path\" fill=\"#FFFFFF\" fill-rule=\"nonzero\" mask=\"url(#mask-2)\">" + "</path></g></g></g><g id=\"Group-13-Copy-7\" transform=\"translate" + "(6.000000, 6.000000)\" fill=\"#FFFFFF\" fill-rule=\"nonzero\">" + "<g id=\"Group-13-Copy-2\"><path d=\"M2.15217391,4.55172414 C0.963561082," + "4.55172414 1.99840144e-14,3.53278598 1.99840144e-14,2.27586207 " + "C1.99840144e-14,1.01893816 0.963561082,6.30606678e-14 2.15217391,6." + "30606678e-14 C3.34078674,6.30606678e-14 4.30434783,1.01893816 4.30434783," + "2.27586207 C4.30434783,3.53278598 3.34078674,4.55172414 2.15217391," + "4.55172414 Z M2.15217391,3.31034483 C2.69245247,3.31034483 3.13043478,2." + "84719112 3.13043478,2.27586207 C3.13043478,1.70453302 2.69245247," + "1.24137931 2.15217391,1.24137931 C1.61189535,1.24137931 1.17391304,1" + ".70453302 1.17391304,2.27586207 C1.17391304,2.84719112 1.61189535,3." + "31034483 2.15217391,3.31034483 Z\" id=\"Combined-Shape\"></path>" + "<path d=\"M6.84782609,9 C5.65921326,9 4.69565217,7.98106184 4.69565217," + "6.72413793 C4.69565217,5.46721402 5.65921326,4.44827586 6.84782609," + "4.44827586 C8.03643892,4.44827586 9,5.46721402 9,6.72413793 C9,7.98106184" + " 8.03643892,9 6.84782609,9 Z M6.84782609,7.75862069 C7.38810465," + "7.75862069 7.82608696,7.29546698 7.82608696,6.72413793 C7.82608696" + ",6.15280888 7.38810465,5.68965517 6.84782609,5.68965517 C6.30754753," + "5.68965517 5.86956522,6.15280888 5.86956522,6.72413793 C5.86956522," + "7.29546698 6.30754753,7.75862069 6.84782609,7.75862069 Z\" " + "id=\"Combined-Shape\"></path><polygon id=\"Rectangle\" " + "transform=\"translate(4.497720, 4.541938) rotate(34.000000) " + "translate(-4.497720, -4.541938) \" points=\"3.77901778 -0.202295978 " + "4.9740273 -0.171019161 5.21642263 9.28617278 4.02141311 9.25489596\">" + "</polygon></g></g></g></g></g></svg>";
Constants.GPAY_OFFER_ICON_STYLE = "\n.".concat(Constants.GPAY_OFFER_ICON_CLASS, " {\n  position: absolute;\n  right: -5px;\n  top: -5px;\n}\n\n#ic_loyalty_24px use.hover {\n  fill: #FC853B;\n}\n");
Constants.GPAY_OFFER_DESCRIPTION_CLASS = 'gpay-offer-description';
Constants.GPAY_OFFER_DESCRIPTION_STYLE = "\n@import url(//fonts.googleapis.com/css?family=Google+Sans:500);\n.".concat(Constants.GPAY_OFFER_DESCRIPTION_CLASS, " {\n  text-align: center;\n  font: 10px 'Google Sans';\n  margin-top: 2px;\n  margin-bottom: 0px;\n}\n\n.").concat(Constants.GPAY_OFFER_DESCRIPTION_CLASS, ".gpay-btn-clicked {\n  color: #3C4043;\n}\n\n.").concat(Constants.GPAY_OFFER_DESCRIPTION_CLASS, ".short {\n  min-width: 90px;\n  width: 160px;\n}\n\n.").concat(Constants.GPAY_OFFER_DESCRIPTION_CLASS, ".long {\n  min-width: 152px;\n  width: 240px;\n}\n");
/**
 * Class used for the new gpay button with card info (last 4 digits, card net).
 *
 * @const {string}
 */

Constants.GPAY_BUTTON_CARD_INFO_CLASS = 'gpay-card-info-btn';
Constants.GPAY_BUTTON_CARD_INFO_BUTTON_STYLE = "\n  .".concat(Constants.GPAY_BUTTON_CARD_INFO_CLASS, " {\n    background-origin: content-box;\n    background-position: center center;\n    background-repeat: no-repeat;\n    background-size: contain;\n    border: 0px;\n    border-radius: 4px;\n    box-shadow: rgba(60, 64, 67, 0.3) 0px 1px 1px 0px, rgba(60, 64, 67, 0.15) 0px 1px 3px 1px;\n    cursor: pointer;\n    height: 40px;\n    min-height: 40px;\n    padding: 11px 24px;\n    background-color: #000;\n    box-shadow: none;\n    padding: 9px 24px 10px;\n    min-width: 190px;\n    width: 240px;\n  }\n\n  .").concat(Constants.GPAY_BUTTON_CARD_INFO_CLASS, ".active {\n    background-color: #5f6368;\n  }\n\n  .").concat(Constants.GPAY_BUTTON_CARD_INFO_CLASS, ".hover {\n    background-color: #3c4043;\n  }\n  ");
/**
 * Trusted domain for secure context validation
 *
 * @const {string}
 */

Constants.TRUSTED_DOMAIN = '.google.com';

},{}],88:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.injectStyleSheet = injectStyleSheet;
exports.injectIframe = injectIframe;

var _constants = require("./constants.js");

/**
 * @license
 * Copyright 2018 Google Inc. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS-IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * Injects the provided style sheet to the document head.
 * @param {string} styleText The stylesheet to be injected.
 * @return {!Element}
 */
function injectStyleSheet(styleText) {
  var styleElement = document.createElement('style');
  styleElement.type = 'text/css';
  styleElement.textContent = styleText;
  document.head.appendChild(styleElement);
  return styleElement;
}
/**
 * Injects the pay with google iframe.
 * @param {string} iframeClassName The classname of the iFrame wrapper.
 * @return {!{container: !Element, iframe:!HTMLIFrameElement}}
 */


function injectIframe(iframeClassName) {
  var container = document.createElement('div');
  container.classList.add(_constants.Constants.IFRAME_CONTAINER_CLASS);
  var iframeContainer = document.createElement('div');
  iframeContainer.classList.add('iframeContainer');
  /** @private @const {!HTMLIFrameElement} */

  var iframe =
  /** @type {!HTMLIFrameElement} */
  document.createElement('iframe');
  iframe.classList.add(iframeClassName);
  iframe.setAttribute('frameborder', '0');
  iframe.setAttribute('scrolling', 'no');
  iframeContainer.appendChild(iframe);
  container.appendChild(iframeContainer);
  document.body.appendChild(container);
  return {
    'container': container,
    'iframe': iframe
  };
}

},{"./constants.js":87}],89:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Graypane = void 0;

var _constants = require("./constants.js");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var MAX_Z_INDEX = 2147483647;

var Graypane = /*#__PURE__*/function () {
  /**
   * @param {!Document} doc
   */
  function Graypane(doc) {
    var _this = this;

    _classCallCheck(this, Graypane);

    /** @private @const {!Document} */
    this.doc_ = doc;
    /** @private @const {!Element} */

    this.element_ = doc.createElement(_constants.Constants.GPAY_GRAYPANE);
    setImportantStyles(this.element_, {
      'z-index': MAX_Z_INDEX,
      'display': 'none',
      'position': 'fixed',
      'top': 0,
      'right': 0,
      'bottom': 0,
      'left': 0,
      'background-color': 'rgba(32, 33, 36, .6)'
    });
    /** @private {?Window} */

    this.popupWindow_ = null;
    this.element_.addEventListener('click', function () {
      if (_this.popupWindow_) {
        try {
          _this.popupWindow_.focus();
        } catch (e) {// Ignore error.
        }
      }
    });
  }
  /**
   * Shows the graypane.
   * @param {?Window|undefined} popupWindow
   * @return {!Promise}
   */


  _createClass(Graypane, [{
    key: "show",
    value: function show(popupWindow) {
      this.popupWindow_ = popupWindow || null;
      this.doc_.body.appendChild(this.element_);
      setImportantStyles(this.element_, {
        'display': 'block',
        'opacity': 0
      });
      return transition(this.element_, {
        'opacity': 1
      }, 300, 'ease-out');
    }
    /**
     * Hides the graypane.
     * @return {!Promise|undefined}
     */

  }, {
    key: "hide",
    value: function hide() {
      var _this2 = this;

      this.popupWindow_ = null;

      if (!this.element_.parentElement) {
        // Has already been removed or haven't been even added to DOM.
        // This could be possible after redirect.
        return;
      }

      return transition(this.element_, {
        'opacity': 0
      }, 300, 'ease-out').then(function () {
        setImportantStyles(_this2.element_, {
          'display': 'none'
        });

        _this2.doc_.body.removeChild(_this2.element_);
      });
    }
  }]);

  return Graypane;
}();
/**
 * Sets the CSS styles of the specified element with !important. The styles
 * are specified as a map from CSS property names to their values.
 *
 * The `!important` styles are used to avoid accidental specificity overrides
 * from the 3p page's stylesheet.
 *
 * @param {!Element} element
 * @param {!Object<string, string|number>} styles
 */


exports.Graypane = Graypane;

function setImportantStyles(element, styles) {
  for (var k in styles) {
    element.style.setProperty(k, styles[k].toString(), 'important');
  }
}
/**
 * Returns a promise which is resolved after the given duration of animation
 * @param {!Element} el - Element to be observed.
 * @param {!Object<string, string|number>} props - properties to be animated.
 * @param {number} durationMillis - duration of animation.
 * @param {string} curve - transition function for the animation.
 * @return {!Promise} Promise which resolves once the animation is done playing.
 */


function transition(el, props, durationMillis, curve) {
  var win = el.ownerDocument.defaultView;
  var previousTransitionValue = el.style.transition || '';
  return new Promise(function (resolve) {
    win.setTimeout(function () {
      win.setTimeout(resolve, durationMillis);
      var tr = "".concat(durationMillis, "ms ").concat(curve);
      setImportantStyles(el, Object.assign({
        'transition': "transform ".concat(tr, ", opacity ").concat(tr)
      }, props));
    });
  }).then(function () {
    // Stop transition and make sure that the final properties get set.
    setImportantStyles(el, Object.assign({
      'transition': previousTransitionValue
    }, props));
  });
}

},{"./constants.js":87}],90:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PublicErrorCode = exports.PostMessageEventType = exports.PayFrameHelper = exports.BuyFlowMode = exports.BuyFlowActivityMode = void 0;

var _constants = require("./constants.js");

var _post_message_service = require("./post_message_service.js");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

/**
 * Supported interactions between iframe and merchant page.
 *
 * @enum {number}
 */
// Next Id: 10
var PostMessageEventType = {
  IS_READY_TO_PAY: 6,
  LOG_BUTTON_CLICK: 5,
  LOG_IS_READY_TO_PAY_API: 0,
  LOG_LOAD_PAYMENT_DATA_API: 1,
  LOG_RENDER_BUTTON: 2,
  LOG_INITIALIZE_PAYMENTS_CLIENT: 9,
  LOG_PAY_FRAME_REQUESTED: 15,
  LOG_PAY_FRAME_LOADED: 16,
  LOG_PAY_FRAME_LOADED_WITH_ALL_JS: 17,
  LOG_INLINE_PAYMENT_WIDGET_INITIALIZE: 4,
  LOG_INLINE_PAYMENT_WIDGET_SUBMIT: 3,
  LOG_INLINE_PAYMENT_WIDGET_DISPLAYED: 7,
  LOG_INLINE_PAYMENT_WIDGET_HIDDEN: 8
};
/**
 * Types of buy flow activity modes.
 *
 * @enum {number}
 */

exports.PostMessageEventType = PostMessageEventType;
var BuyFlowActivityMode = {
  UNKNOWN_MODE: 0,
  IFRAME: 1,
  POPUP: 2,
  REDIRECT: 3,
  ANDROID_NATIVE: 4,
  PAYMENT_HANDLER: 5
};
/**
 * Types of buy flow activity modes.
 *
 * @enum {number}
 */

exports.BuyFlowActivityMode = BuyFlowActivityMode;
var PublicErrorCode = {
  UNKNOWN_ERROR_TYPE: 0,
  INTERNAL_ERROR: 1,
  DEVELOPER_ERROR: 2,
  BUYER_ACCOUNT_ERROR: 3,
  MERCHANT_ACCOUNT_ERROR: 4,
  UNSUPPORTED_API_VERSION: 5,
  BUYER_CANCEL: 6
};
/**
 * The presentation mode of the buy flow
 *
 * @enum {number}
 */

exports.PublicErrorCode = PublicErrorCode;
var BuyFlowMode = {
  PAY_WITH_GOOGLE: 5,
  SUBSCRIBE_WITH_GOOGLE: 6
};
/**
 * Iframe used for logging and prefetching.
 *
 * @type {?Element}
 */

exports.BuyFlowMode = BuyFlowMode;
var iframe = null;
/** @type {?PostMessageService} */

var postMessageService = null;
/** @type {?string} */

var environment = null;
/** @type {?string} */

var googleTransactionId = null;
/** @type {number} */

var originTimeMs = Date.now();
/** @type {?BuyFlowActivityMode} */

var buyFlowActivityMode = null;
/** @type {boolean} */

var _iframeLoaded = false;
/** @type {!Array<!Object>} */

var buffer = [];

var PayFrameHelper = /*#__PURE__*/function () {
  function PayFrameHelper() {
    _classCallCheck(this, PayFrameHelper);
  }

  _createClass(PayFrameHelper, null, [{
    key: "load",

    /**
     * Creates a hidden iframe for logging and appends it to the top level
     * document.
     */
    value: function load() {
      if (iframe) {
        return;
      }

      var initOptions =
      /** @type {!PaymentOptions} */
      window['gpayInitParams'] || {};
      environment = initOptions.environment || _constants.Constants.Environment.PRODUCTION;
      iframe = document.createElement('iframe'); // Pass in origin because document.referrer inside iframe is empty in
      // certain cases
      // Can be replaced by iframe.src=... in non Google context.

      iframe.src = PayFrameHelper.getIframeUrl_(window.location.origin, initOptions.merchantInfo && initOptions.merchantInfo.merchantId);
      PayFrameHelper.postMessage({
        'eventType': PostMessageEventType.LOG_PAY_FRAME_REQUESTED,
        'clientLatencyStartMs': Date.now()
      });
      iframe.height = '0';
      iframe.width = '0';
      iframe.style.display = 'none';
      iframe.style.visibility = 'hidden';

      iframe.onload = function () {
        PayFrameHelper.postMessage({
          'eventType': PostMessageEventType.LOG_PAY_FRAME_LOADED_WITH_ALL_JS,
          'clientLatencyStartMs': Date.now()
        });
        PayFrameHelper.iframeLoaded();
      }; // If the body is already loaded, just append the iframe. Otherwise, we wait
      // until the DOM has loaded to append the iframe, otherwise document.body is
      // null.


      if (document.body) {
        PayFrameHelper.initialize_();
      } else {
        document.addEventListener('DOMContentLoaded', function () {
          return PayFrameHelper.initialize_();
        });
      }
    }
    /**
     * Appends the iframe to the DOM and updates the post message service.
     * @private
     */

  }, {
    key: "initialize_",
    value: function initialize_() {
      document.body.appendChild(iframe);
      postMessageService = new _post_message_service.PostMessageService(iframe.contentWindow);
    }
    /**
     * Sends a message to the iframe and wait for a response.
     * Uses the responseHandler specified only if the responseType is a match.
     *
     * @param {!Object} data
     * @param {!PostMessageEventType} eventType
     * @param {string} responseType
     * @param {function(!Event)} responseHandler
     */

  }, {
    key: "sendAndWaitForResponse",
    value: function sendAndWaitForResponse(data, eventType, responseType, responseHandler) {
      function callback(event) {
        if (event.data[responseType]) {
          responseHandler(event); // We only want to process the response from the payframe once.
          // so stop listening to the event once processed.

          PayFrameHelper.removeMessageEventListener_(callback);
        }
      }

      PayFrameHelper.addMessageEventListener_(callback);
      var postMessageData = Object.assign({
        'eventType': eventType
      }, data);
      PayFrameHelper.postMessage(postMessageData);
    }
    /**
     * Add an event listener for listening to messages received.
     *
     * @param {function(!Event)} callback
     * @private
     */

  }, {
    key: "addMessageEventListener_",
    value: function addMessageEventListener_(callback) {
      window.addEventListener('message', callback);
    }
    /**
     * Remove the event listener for listening to messages.
     *
     * @param {function(!Event)} callback
     * @private
     */

  }, {
    key: "removeMessageEventListener_",
    value: function removeMessageEventListener_(callback) {
      window.removeEventListener('message', callback);
    }
    /**
     * Posts a message to the iframe with the given data.
     *
     * @param {!Object} data
     */

  }, {
    key: "postMessage",
    value: function postMessage(data) {
      if (!_iframeLoaded) {
        buffer.push(data);
        return;
      }

      var postMessageData = Object.assign({
        'buyFlowActivityMode': buyFlowActivityMode,
        'googleTransactionId': googleTransactionId,
        'originTimeMs': originTimeMs
      }, data);
      postMessageService.postMessage(postMessageData, PayFrameHelper.getIframeOrigin_());
    }
    /**
     * Sets the activity mode.
     *
     * @param {!BuyFlowActivityMode} mode
     */

  }, {
    key: "setBuyFlowActivityMode",
    value: function setBuyFlowActivityMode(mode) {
      buyFlowActivityMode = mode;
    }
    /**
     * Sets the google transaction id.
     *
     * @param {string} txnId
     */

  }, {
    key: "setGoogleTransactionId",
    value: function setGoogleTransactionId(txnId) {
      googleTransactionId = txnId;
    }
    /**
     * Sets the originTimeMs. To be used only for tests.
     *
     * @param {number} originTimeMsTemp
     */

  }, {
    key: "setOriginTimeMs",
    value: function setOriginTimeMs(originTimeMsTemp) {
      originTimeMs = originTimeMsTemp;
    }
    /**
     * Override postMessageService for testing.
     *
     * @param {!PostMessageService} messageService
     */

  }, {
    key: "setPostMessageService",
    value: function setPostMessageService(messageService) {
      postMessageService = messageService;
    }
    /**
     * Clears the singleton variables.
     */

  }, {
    key: "reset",
    value: function reset() {
      iframe = null;
      buffer.length = 0;
      _iframeLoaded = false;
      buyFlowActivityMode = null;
    }
    /**
     * Sets whether the iframe has been loaded or not.
     *
     * @param {boolean} loaded
     */

  }, {
    key: "setIframeLoaded",
    value: function setIframeLoaded(loaded) {
      _iframeLoaded = loaded;
    }
    /**
     * Called whenever the iframe is loaded.
     */

  }, {
    key: "iframeLoaded",
    value: function iframeLoaded() {
      _iframeLoaded = true;
      buffer.forEach(function (data) {
        PayFrameHelper.postMessage(data);
      });
      buffer.length = 0;
    }
    /**
     * Returns the events that have been buffered.
     *
     * @return {!Array<!Object>}
     */

  }, {
    key: "getBuffer",
    value: function getBuffer() {
      return buffer;
    }
    /**
     * Mocks the iframe as an arbitrary html element instead of actually injecting
     * it for testing.
     */

  }, {
    key: "injectIframeForTesting",
    value: function injectIframeForTesting() {
      PayFrameHelper.reset();
      iframe = document.createElement('p');
      PayFrameHelper.iframeLoaded();
    }
    /**
     * Returns the payframe origin based on the environment.
     *
     * @return {string}
     * @private
     */

  }, {
    key: "getIframeOrigin_",
    value: function getIframeOrigin_() {
      var iframeUrl = 'https://pay';

      if (environment == _constants.Constants.Environment.SANDBOX) {
        iframeUrl += '.sandbox';
      } else if (environment == _constants.Constants.Environment.PREPROD) {
        iframeUrl += '-preprod.sandbox';
      }

      return iframeUrl + '.google.com';
    }
    /**
     * Returns the payframe URL based on the environment.
     *
     * @param {string} origin The origin that is opening the payframe.
     * @param {string|null=} merchantId The merchant id.
     * @return {string}
     * @private
     */

  }, {
    key: "getIframeUrl_",
    value: function getIframeUrl_(origin, merchantId) {
      // TrustedResourceUrl header needs to start with https or '//'.
      var iframeUrl = "https://pay".concat(environment == _constants.Constants.Environment.PREPROD ? '-preprod.sandbox' : environment == _constants.Constants.Environment.SANDBOX ? '.sandbox' : '', ".google.com/gp/p/ui/payframe?origin=").concat(origin, "&mid=%{merchantId}");
      return iframeUrl;
    }
  }]);

  return PayFrameHelper;
}();

exports.PayFrameHelper = PayFrameHelper;

},{"./constants.js":87,"./post_message_service.js":95}],91:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PaymentsAsyncClient = void 0;

var _constants = require("./constants.js");

var _payments_client_delegate_interface = require("./payments_client_delegate_interface.js");

var _payments_request_delegate = require("./payments_request_delegate.js");

var _payments_web_activity_delegate = require("./payments_web_activity_delegate.js");

var _upi_handler = require("./upi_handler.js");

var _activityPorts = require("web-activities/activity-ports");

var _pay_frame_helper = require("./pay_frame_helper.js");

var _validator = require("./validator.js");

var _utils = require("./utils.js");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var TRUSTED_DOMAINS = ['actions.google.com', 'amp-actions.sandbox.google.com', 'amp-actions-staging.sandbox.google.com', 'amp-actions-autopush.sandbox.google.com', 'payments.developers.google.com', 'payments.google.com'];
/**
 * The client for interacting with the Google Payment APIs.
 * <p>
 * The async refers to the fact that this client supports redirects
 * when using webactivties.
 * <p>
 * If you are using this be sure that this is what you want.
 * <p>
 * In almost all cases PaymentsClient is the better client to use because
 * it exposes a promises based api which is easier to deal with.
 * @final
 */

var PaymentsAsyncClient = /*#__PURE__*/function () {
  /**
   * @param {!PaymentOptions} paymentOptions
   * @param {function(!Promise<!PaymentData>)} onPaymentResponse
   * @param {boolean=} useIframe
   * @param {!ActivityPorts=} activities Can be used to provide a shared
   *   activities manager. By default, the new manager is created.
   */
  function PaymentsAsyncClient(paymentOptions, onPaymentResponse, useIframe, activities) {
    var _this = this;

    _classCallCheck(this, PaymentsAsyncClient);

    this.onPaymentResponse_ = onPaymentResponse;
    (0, _validator.validatePaymentOptions)(paymentOptions);
    /** @private {?number} */

    this.loadPaymentDataApiStartTimeMs_ = null;
    /** @private @const {string} */

    this.environment_ = paymentOptions.environment || _constants.Constants.Environment.TEST;

    if (!PaymentsAsyncClient.googleTransactionId_) {
      PaymentsAsyncClient.googleTransactionId_ =
      /** @type {string} */
      this.isInTrustedDomain_() && paymentOptions['i'] && paymentOptions['i']['googleTransactionId'] ? paymentOptions['i']['googleTransactionId'] : (0, _utils.createGoogleTransactionId)(this.environment_);
    }
    /** @private @const {!PaymentOptions} */


    this.paymentOptions_ = paymentOptions;
    /** @private @const {!PaymentsClientDelegateInterface} */

    this.webActivityDelegate_ = new _payments_web_activity_delegate.PaymentsWebActivityDelegate(this.environment_, PaymentsAsyncClient.googleTransactionId_, useIframe, activities, paymentOptions['i'] && paymentOptions['i']['redirectKey']);
    /** @private {number} */

    this.buyFlowMode_ = _pay_frame_helper.BuyFlowMode.PAY_WITH_GOOGLE;
    var paymentRequestSupported = (0, _validator.chromeSupportsPaymentRequest)(); // TODO: Remove the temporary hack that disable payments
    // request for inline flow.

    /** @private @const {?PaymentsClientDelegateInterface} */

    this.delegate_ = paymentRequestSupported && !useIframe ? new _payments_request_delegate.PaymentsRequestDelegate(this.environment_) : this.webActivityDelegate_;
    this.upiHandler_ = new _upi_handler.UpiHandler();
    this.webActivityDelegate_.onResult(this.onResult_.bind(this));
    this.delegate_.onResult(this.onResult_.bind(this)); // Load PayFrameHelper upon client construction.

    _pay_frame_helper.PayFrameHelper.load(); // If web delegate is used anyway then this is overridden in the web
    // activity delegate when load payment data is called.


    if ((0, _validator.chromeSupportsPaymentHandler)()) {
      _pay_frame_helper.PayFrameHelper.setBuyFlowActivityMode(_pay_frame_helper.BuyFlowActivityMode.PAYMENT_HANDLER);
    } else if (paymentRequestSupported) {
      _pay_frame_helper.PayFrameHelper.setBuyFlowActivityMode(_pay_frame_helper.BuyFlowActivityMode.ANDROID_NATIVE);
    }

    _pay_frame_helper.PayFrameHelper.setGoogleTransactionId(PaymentsAsyncClient.googleTransactionId_);

    _pay_frame_helper.PayFrameHelper.postMessage({
      'eventType': _pay_frame_helper.PostMessageEventType.LOG_INITIALIZE_PAYMENTS_CLIENT,
      'clientLatencyStartMs': Date.now()
    });

    window.addEventListener('message', function (event) {
      return _this.handleMessageEvent_(event);
    });
  }
  /**
   * Check whether the user can make payments using the Payment API.
   *
   * @param {!IsReadyToPayRequest} isReadyToPayRequest
   * @return {!Promise} The promise will contain the boolean result and error
   *     message when possible.
   * @export
   */


  _createClass(PaymentsAsyncClient, [{
    key: "isReadyToPay",
    value: function isReadyToPay(isReadyToPayRequest) {
      // Merge with paymentOptions, preferring values from isReadyToPayRequest
      if (isReadyToPayRequest) {
        isReadyToPayRequest = Object.assign({}, this.paymentOptions_, isReadyToPayRequest);
      }

      var startTimeMs = Date.now();
      /** @type {?string} */

      var errorMessage = (0, _validator.validateSecureContext)() || (0, _validator.validateIsReadyToPayRequest)(isReadyToPayRequest);

      if (errorMessage) {
        return new Promise(function (resolve, reject) {
          PaymentsAsyncClient.logDevErrorToConsole_('isReadyToPay', errorMessage);

          _pay_frame_helper.PayFrameHelper.postMessage({
            'eventType': _pay_frame_helper.PostMessageEventType.LOG_IS_READY_TO_PAY_API,
            'error': _pay_frame_helper.PublicErrorCode.DEVELOPER_ERROR
          });

          reject({
            'statusCode': _constants.Constants.ResponseStatus.DEVELOPER_ERROR,
            'statusMessage': errorMessage
          });
        });
      }

      var isReadyToPayPromise = this.isReadyToPay_(isReadyToPayRequest);
      isReadyToPayPromise.then(function (response) {
        _pay_frame_helper.PayFrameHelper.postMessage({
          'eventType': _pay_frame_helper.PostMessageEventType.LOG_IS_READY_TO_PAY_API,
          'clientLatencyStartMs': startTimeMs,
          'isReadyToPayApiResponse': response
        });

        return response;
      });
      return isReadyToPayPromise;
    }
    /**
     * Actual implementation of isReadyToPay in a private method so that
     * we can add callbacks to the promise to measure latencies.
     *
     * @param {!IsReadyToPayRequest} isReadyToPayRequest
     * @return {!Promise} The promise will contain the boolean result and error
     *     message when possible.
     * @private
     */

  }, {
    key: "isReadyToPay_",
    value: function isReadyToPay_(isReadyToPayRequest) {
      if (this.upiHandler_.isUpiRequest(isReadyToPayRequest)) {
        return this.upiHandler_.isReadyToPay(isReadyToPayRequest);
      }

      if ((0, _validator.chromeSupportsPaymentRequest)() && !isNativeDisabledInRequest(isReadyToPayRequest)) {
        if (isReadyToPayRequest.apiVersion >= 2) {
          return this.isReadyToPayApiV2ForChromePaymentRequest_(isReadyToPayRequest);
        } else {
          // This is the apiVersion 1 branch.
          // If the merchant supports only Tokenized cards then just rely on
          // delegate to give us the result.
          // This will need to change once b/78519188 is fixed.
          var _webPromise = this.webActivityDelegate_.isReadyToPay(isReadyToPayRequest);

          var nativePromise = this.delegate_.isReadyToPay(isReadyToPayRequest);

          if ((0, _validator.doesMerchantSupportOnlyTokenizedCards)(isReadyToPayRequest) && !(0, _validator.chromeSupportsPaymentHandler)()) {
            return nativePromise;
          } // Return webIsReadyToPay only if delegateIsReadyToPay has been
          // executed.


          return nativePromise.then(function () {
            return _webPromise;
          });
        }
      }

      var webPromise = this.webActivityDelegate_.isReadyToPay(isReadyToPayRequest);
      return webPromise;
    }
    /**
     * Handle is ready to pay for api v2.
     *
     * @param {!IsReadyToPayRequest} isReadyToPayRequest
     * @return {!Promise} The promise will contain the boolean result and error
     *     message when possible.
     * @private
     */

  }, {
    key: "isReadyToPayApiV2ForChromePaymentRequest_",
    value: function isReadyToPayApiV2ForChromePaymentRequest_(isReadyToPayRequest) {
      var defaultPromise = Promise.resolve({
        'result': false
      });

      if (isReadyToPayRequest.existingPaymentMethodRequired) {
        defaultPromise = Promise.resolve({
          'result': false,
          'paymentMethodPresent': false
        });
      }

      var nativePromise = defaultPromise;

      if ((0, _validator.apiV2DoesMerchantSupportSpecifiedCardType)(isReadyToPayRequest, _constants.Constants.AuthMethod.CRYPTOGRAM_3DS)) {
        // If the merchant supports tokenized cards.
        // Make a separate call to gms core to check if the user isReadyToPay
        // with just tokenized cards. We can't pass in PAN_ONLY here
        // because gms core always returns true for PAN_ONLY.
        // Leave other payment methods as is.
        var nativeRtpRequest
        /** @type {!IsReadyToPayRequest} */
        = JSON.parse(JSON.stringify(isReadyToPayRequest));

        for (var i = 0; i < nativeRtpRequest.allowedPaymentMethods.length; i++) {
          if (nativeRtpRequest.allowedPaymentMethods[i].type == _constants.Constants.PaymentMethod.CARD) {
            nativeRtpRequest.allowedPaymentMethods[i].parameters['allowedAuthMethods'] = [_constants.Constants.AuthMethod.CRYPTOGRAM_3DS];
          }
        }

        nativePromise = this.delegate_.isReadyToPay(nativeRtpRequest);
      }

      var webPromise = defaultPromise;

      if ((0, _validator.apiV2DoesMerchantSupportSpecifiedCardType)(isReadyToPayRequest, _constants.Constants.AuthMethod.PAN_ONLY)) {
        webPromise = this.webActivityDelegate_.isReadyToPay(isReadyToPayRequest);
      } // Update session storage with payment handler canMakePayment result but
      // rely on web delegate for actual response


      if ((0, _validator.chromeSupportsPaymentHandler)()) {
        return nativePromise.then(function () {
          return webPromise;
        });
      }

      return nativePromise.then(function (nativeResult) {
        if ((nativeResult && nativeResult['result']) == true) {
          return nativeResult;
        }

        return webPromise;
      });
    }
    /**
     * Prefetch paymentData to speed up loadPaymentData call. Note the provided
     * paymentDataRequest should exactly be the same as provided in
     * loadPaymentData to make the loadPaymentData call fast since current
     * web flow prefetching is based on the full request parameters.
     *
     * @param {!PaymentDataRequest} paymentDataRequest Provides necessary
     *     information to support a payment.
     * @export
     */

  }, {
    key: "prefetchPaymentData",
    value: function prefetchPaymentData(paymentDataRequest) {
      /** @type {?string} */
      var errorMessage = (0, _validator.validateSecureContext)() || (0, _validator.validatePaymentDataRequest)(paymentDataRequest);

      if (errorMessage) {
        PaymentsAsyncClient.logDevErrorToConsole_('prefetchPaymentData', errorMessage);
        return;
      }

      this.assignInternalParams_(paymentDataRequest);

      if ((0, _validator.chromeSupportsPaymentRequest)() && !isNativeDisabledInRequest(paymentDataRequest)) {
        this.delegate_.prefetchPaymentData(paymentDataRequest);
      } else {
        // For non chrome supports always use the hosting page.
        this.webActivityDelegate_.prefetchPaymentData(paymentDataRequest);
      }
    }
    /**
     * Request PaymentData, which contains necessary infomartion to complete a
     * payment.
     *
     * @param {!PaymentDataRequest} paymentDataRequest Provides necessary
     *     information to support a payment.
     * @export
     */

  }, {
    key: "loadPaymentData",
    value: function loadPaymentData(paymentDataRequest) {
      var _this2 = this;

      _pay_frame_helper.PayFrameHelper.postMessage({
        'eventType': _pay_frame_helper.PostMessageEventType.LOG_BUTTON_CLICK
      });

      var errorMessage = (0, _validator.validateSecureContext)() || (0, _validator.validatePaymentDataRequest)(paymentDataRequest);
      this.buyFlowMode_ = paymentDataRequest && paymentDataRequest.swg ? _pay_frame_helper.BuyFlowMode.SUBSCRIBE_WITH_GOOGLE : _pay_frame_helper.BuyFlowMode.PAY_WITH_GOOGLE;

      if (errorMessage) {
        this.onPaymentResponse_(new Promise(function (resolve, reject) {
          _pay_frame_helper.PayFrameHelper.postMessage({
            'eventType': _pay_frame_helper.PostMessageEventType.LOG_LOAD_PAYMENT_DATA_API,
            'error': _pay_frame_helper.PublicErrorCode.DEVELOPER_ERROR,
            'buyFlowMode': _this2.buyFlowMode_
          });

          PaymentsAsyncClient.logDevErrorToConsole_('loadPaymentData', errorMessage);
          reject({
            'statusCode': _constants.Constants.ResponseStatus.DEVELOPER_ERROR,
            'statusMessage': errorMessage
          });
        }));
        return;
      } // Handler for UPI PaymentMethod
      // Currently we don't support UPI along with other payment methods, if
      // UPI is in payment methods then we assume it is UPI only.


      var upiPaymentMethod = (0, _validator.getUpiPaymentMethod)(paymentDataRequest);

      if (upiPaymentMethod) {
        this.upiHandler_.loadPaymentData(paymentDataRequest, upiPaymentMethod, this.onResult_.bind(this));
        return;
      }

      var isReadyToPayResult = window.sessionStorage.getItem(_constants.Constants.IS_READY_TO_PAY_RESULT_KEY);
      this.loadPaymentDataApiStartTimeMs_ = Date.now();
      this.assignInternalParams_(paymentDataRequest); // We want to fall back to the web delegate if payment handler is supported
      // and isReadyToPay bit is not explicitly set to true (fallback to web if
      // isReadyToPay wasn't called for PH)

      if ((0, _validator.chromeSupportsPaymentHandler)() && isReadyToPayResult !== 'true' || isNativeDisabledInRequest(paymentDataRequest)) {
        this.webActivityDelegate_.loadPaymentData(paymentDataRequest);
      } else {
        this.delegate_.loadPaymentData(paymentDataRequest);
      }
    }
    /**
     * Log developer error to console.
     *
     * @param {string} apiName
     * @param {?string} errorMessage
     * @private
     */

  }, {
    key: "createButton",

    /**
     * Return a <div> element containing a Google Pay payment button.
     *
     * @param {!ButtonOptions=} options
     * @return {!Element}
     * @export
     */
    value: function createButton() {
      var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      var button = null; // Only log if button was created successfully

      var startTimeMs = Date.now();

      _pay_frame_helper.PayFrameHelper.postMessage({
        'eventType': _pay_frame_helper.PostMessageEventType.LOG_RENDER_BUTTON,
        'clientLatencyStartMs': startTimeMs
      });

      return button;
    }
    /**
     * @param {!Event} e postMessage event from the AMP page.
     * @private
     */

  }, {
    key: "handleMessageEvent_",
    value: function handleMessageEvent_(e) {
      if (this.isInTrustedDomain_()) {
        // Only handles the event right now if loaded in trusted domain.
        if (e.data['name'] === 'logPaymentData') {
          _pay_frame_helper.PayFrameHelper.postMessage(e.data['data']);
        }
      }
    }
    /**
     * @private
     * @return {boolean}
     */

  }, {
    key: "isInTrustedDomain_",
    value: function isInTrustedDomain_() {
      return TRUSTED_DOMAINS.indexOf(window.location.hostname) != -1;
    }
    /**
     * Called when load payment data result is returned. This triggers the payment
     * response callback passed to the client.
     *
     * @private
     */

  }, {
    key: "onResult_",
    value: function onResult_(response) {
      var _this3 = this;

      response.then(function (result) {
        _pay_frame_helper.PayFrameHelper.postMessage({
          'eventType': _pay_frame_helper.PostMessageEventType.LOG_LOAD_PAYMENT_DATA_API,
          'clientLatencyStartMs': _this3.loadPaymentDataApiStartTimeMs_,
          'buyFlowMode': _this3.buyFlowMode_
        });
      })["catch"](function (result) {
        if (result['errorCode']) {
          _pay_frame_helper.PayFrameHelper.postMessage({
            'eventType': _pay_frame_helper.PostMessageEventType.LOG_LOAD_PAYMENT_DATA_API,
            'error':
            /** @type {!PublicErrorCode} */
            result['errorCode'],
            'buyFlowMode': _this3.buyFlowMode_
          });
        } else {
          // If user closes window we don't get a error code
          _pay_frame_helper.PayFrameHelper.postMessage({
            'eventType': _pay_frame_helper.PostMessageEventType.LOG_LOAD_PAYMENT_DATA_API,
            'error': _pay_frame_helper.PublicErrorCode.BUYER_CANCEL,
            'buyFlowMode': _this3.buyFlowMode_
          });
        }
      });
      this.onPaymentResponse_(response);
    }
    /**
     * @param {!PaymentDataRequest} paymentDataRequest
     * @return {!PaymentDataRequest}
     * @private
     */

  }, {
    key: "assignInternalParams_",
    value: function assignInternalParams_(paymentDataRequest) {
      var internalParam = {
        'startTimeMs': Date.now(),
        'googleTransactionId': PaymentsAsyncClient.googleTransactionId_
      };
      paymentDataRequest['i'] = paymentDataRequest['i'] ? Object.assign(internalParam, paymentDataRequest['i']) : internalParam;
      return paymentDataRequest;
    }
  }], [{
    key: "logDevErrorToConsole_",
    value: function logDevErrorToConsole_(apiName, errorMessage) {
      console.error('DEVELOPER_ERROR in ' + apiName + ' : ' + errorMessage);
    }
  }]);

  return PaymentsAsyncClient;
}();
/** @const {?string} */


exports.PaymentsAsyncClient = PaymentsAsyncClient;
PaymentsAsyncClient.googleTransactionId_;
/**
 * Whether the request specifies that the native support has to be disabled.
 *
 * @param {!IsReadyToPayRequest|!PaymentDataRequest} request
 * @return {boolean}
 */

function isNativeDisabledInRequest(request) {
  return (request['i'] && request['i']['disableNative']) === true;
}

},{"./constants.js":87,"./pay_frame_helper.js":90,"./payments_client_delegate_interface.js":92,"./payments_request_delegate.js":93,"./payments_web_activity_delegate.js":94,"./upi_handler.js":96,"./utils.js":97,"./validator.js":98,"web-activities/activity-ports":4}],92:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PaymentsClientDelegateInterface = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

/**
 * @license
 * Copyright 2018 Google Inc. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS-IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * An interface which captures what we need to start up buyflow across surfaces.
 * @interface
 */
var PaymentsClientDelegateInterface = /*#__PURE__*/function () {
  function PaymentsClientDelegateInterface() {
    _classCallCheck(this, PaymentsClientDelegateInterface);
  }

  _createClass(PaymentsClientDelegateInterface, [{
    key: "isReadyToPay",

    /**
     * Check whether the user can make payments using the Payment API.
     *
     * @param {!IsReadyToPayRequest} isReadyToPayRequest
     * @return {!Promise} The promise will contain the boolean result and error
     *     message when possible.
     */
    value: function isReadyToPay(isReadyToPayRequest) {}
    /**
     * Prefetch paymentData to speed up loadPaymentData call. Note the provided
     * paymentDataRequest should exactly be the same as provided in
     * loadPaymentData to make the loadPaymentData call fast.
     *
     * @param {!PaymentDataRequest} paymentDataRequest Provides necessary
     *     information to support a payment.
     */

  }, {
    key: "prefetchPaymentData",
    value: function prefetchPaymentData(paymentDataRequest) {}
    /**
     * Request PaymentData, which contains necessary infomartion to complete a
     * payment.
     *
     * @param {!PaymentDataRequest} paymentDataRequest Provides necessary
     *     information to support a payment.
     */

  }, {
    key: "loadPaymentData",
    value: function loadPaymentData(paymentDataRequest) {}
    /**
     * @param {function(!Promise<!PaymentData>)} callback
     */

  }, {
    key: "onResult",
    value: function onResult(callback) {}
  }]);

  return PaymentsClientDelegateInterface;
}();

exports.PaymentsClientDelegateInterface = PaymentsClientDelegateInterface;

},{}],93:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PaymentsRequestDelegate = void 0;

var _constants = require("./constants.js");

var _payments_client_delegate_interface = require("./payments_client_delegate_interface.js");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

/**
 * An implementation of PaymentsClientDelegateInterface that leverages payment
 * request.
 * @implements {PaymentsClientDelegateInterface}
 */
var PaymentsRequestDelegate = /*#__PURE__*/function () {
  /**
   * @param {string} environment
   */
  function PaymentsRequestDelegate(environment) {
    _classCallCheck(this, PaymentsRequestDelegate);

    this.environment_ = environment;
    /** @private {?function(!Promise<!PaymentData>)} */

    this.callback_ = null;
  }
  /** @override */


  _createClass(PaymentsRequestDelegate, [{
    key: "onResult",
    value: function onResult(callback) {
      this.callback_ = callback;
    }
    /** @override */

  }, {
    key: "isReadyToPay",
    value: function isReadyToPay(isReadyToPayRequest) {
      /** @type{!PaymentRequest} */
      var paymentRequest = this.createPaymentRequest_(isReadyToPayRequest);
      return new Promise(function (resolve, reject) {
        paymentRequest.canMakePayment().then(function (result) {
          window.sessionStorage.setItem(_constants.Constants.IS_READY_TO_PAY_RESULT_KEY, result.toString());
          var response = {
            'result': result
          };

          if (isReadyToPayRequest.apiVersion >= 2 && isReadyToPayRequest.existingPaymentMethodRequired) {
            // For apiVersion 2, we always use native to only check for
            // tokenized cards.
            // For tokenized cards native always does a presence check so
            // we can say that if canMakePayment is true for native for
            // tokenizedCards then the user has a payment method which is
            // present.
            response['paymentMethodPresent'] = result;
          }

          resolve(response);
        })["catch"](function (err) {
          if (window.sessionStorage.getItem(_constants.Constants.IS_READY_TO_PAY_RESULT_KEY)) {
            resolve({
              'result': window.sessionStorage.getItem(_constants.Constants.IS_READY_TO_PAY_RESULT_KEY) == 'true'
            });
          } else {
            resolve({
              'result': false
            });
          }
        });
      });
    }
    /** @override */

  }, {
    key: "prefetchPaymentData",
    value: function prefetchPaymentData(paymentDataRequest) {
      // Creating PaymentRequest instance will call
      // Gcore isReadyToPay internally which will prefetch tempaltes.
      this.createPaymentRequest_(paymentDataRequest, this.environment_, paymentDataRequest.transactionInfo.currencyCode, paymentDataRequest.transactionInfo.totalPrice);
    }
    /** @override */

  }, {
    key: "loadPaymentData",
    value: function loadPaymentData(paymentDataRequest) {
      this.loadPaymentDataThroughPaymentRequest_(paymentDataRequest);
    }
    /**
     * Create PaymentRequest instance.
     *
     * @param {!IsReadyToPayRequest|!PaymentDataRequest} request The necessary information to check if user is
     *     ready to pay or to support a payment from merchants.
     * @param {?string=} environment (optional)
     * @param {?string=} currencyCode (optional)
     * @param {?string=} totalPrice (optional)
     * @return {!PaymentRequest} PaymentRequest instance.
     * @private
     */

  }, {
    key: "createPaymentRequest_",
    value: function createPaymentRequest_(request, environment, currencyCode, totalPrice) {
      var data = {};

      if (request) {
        data = JSON.parse(JSON.stringify(request));
      } // Only set the apiVersion if the merchant doesn't set it.


      if (!data['apiVersion']) {
        data['apiVersion'] = 1;
      } // Add allowedPaymentMethods for swg to get through gms core validation.


      if (data['swg']) {
        data['allowedPaymentMethods'] = [_constants.Constants.PaymentMethod.CARD];
      }

      if (environment && environment == _constants.Constants.Environment.TEST) {
        data['environment'] = environment;
      }

      var supportedInstruments = [{
        'supportedMethods': ['https://google.com/pay'],
        'data': data
      }];
      var details = {
        'total': {
          'label': 'Estimated Total Price',
          'amount': {
            // currency and value are required fields in PaymentRequest, but these
            // fields will never be used since PaymentRequest UI is skipped when
            // we're the only payment method, so default to some value to by pass
            // this requirement.
            'currency': currencyCode || 'USD',
            'value': totalPrice || '0'
          }
        }
      };
      return new PaymentRequest(supportedInstruments, details);
    }
    /**
     * @param {!PaymentDataRequest} paymentDataRequest Provides necessary
     *     information to support a payment.
     * @private
     */

  }, {
    key: "loadPaymentDataThroughPaymentRequest_",
    value: function loadPaymentDataThroughPaymentRequest_(paymentDataRequest) {
      var currencyCode = paymentDataRequest.transactionInfo && paymentDataRequest.transactionInfo.currencyCode || undefined;
      var totalPrice = paymentDataRequest.transactionInfo && paymentDataRequest.transactionInfo.totalPrice || undefined;
      var paymentRequest = this.createPaymentRequest_(paymentDataRequest, this.environment_, currencyCode, totalPrice);
      this.callback_(
      /** @type{!Promise<!PaymentData>} */
      paymentRequest.show().then(
      /**
       * @param {!PaymentResponse} paymentResponse
       * @return {!PaymentData}
       */
      function (paymentResponse) {
        // Should be called to dismiss any remaining UI
        paymentResponse.complete('success');
        return paymentResponse.details;
      })["catch"](function (err) {
        err['statusCode'] = _constants.Constants.ResponseStatus.CANCELED;
        throw err;
      }));
    }
  }]);

  return PaymentsRequestDelegate;
}();

exports.PaymentsRequestDelegate = PaymentsRequestDelegate;

},{"./constants.js":87,"./payments_client_delegate_interface.js":92}],94:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PaymentsWebActivityDelegate = void 0;

var _constants = require("./constants.js");

var _graypane = require("./graypane.js");

var _payments_client_delegate_interface = require("./payments_client_delegate_interface.js");

var _activityPorts = require("web-activities/activity-ports");

var _pay_frame_helper = require("./pay_frame_helper.js");

var _validator = require("./validator.js");

var _element_injector = require("./element_injector.js");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var GPAY_ACTIVITY_REQUEST = 'GPAY';
var IFRAME_CLOSE_DURATION_IN_MS = 250;
var IFRAME_SHOW_UP_DURATION_IN_MS = 250;
var IFRAME_SMOOTH_HEIGHT_TRANSITION = "height ".concat(IFRAME_SHOW_UP_DURATION_IN_MS, "ms");
var ERROR_PREFIX = 'Error: ';
/**
 * Supported browser user agent keys.
 *
 * @enum {string}
 */

var BrowserUserAgent = {
  CHROME: 'Chrome',
  FIREFOX: 'Firefox',
  SAFARI: 'Safari'
};
/**
 * Resizing payload including resize height and transition style.
 *
 * @typedef {{
 *   height: string,
 *   transition: string,
 * }}
 */

var ResizePayload;
/**
 * An implementation of PaymentsClientDelegateInterface that uses the custom
 * hosting page along with web activities to actually get to the hosting page.
 * @implements {PaymentsClientDelegateInterface}
 */

var PaymentsWebActivityDelegate = /*#__PURE__*/function () {
  /**
   * @param {string} environment
   * @param {string} googleTransactionId
   * @param {boolean=} useIframe
   * @param {!ActivityPorts=} activities Can be used to provide a shared
   *   activities manager. By default, the new manager is created.
   * @param {?string=} redirectKey The redirect key used for redirect mode.
   */
  function PaymentsWebActivityDelegate(environment, googleTransactionId, useIframe, activities, redirectKey) {
    _classCallCheck(this, PaymentsWebActivityDelegate);

    this.environment_ = environment;
    /** @private @const {boolean} */

    /** @const {!ActivityPorts} */

    this.activities = activities || new _activityPorts.ActivityPorts(window);
    /** @const @private {!Graypane} */

    this.graypane_ = new _graypane.Graypane(window.document);
    /** @private {?function(!Promise<!PaymentData>)} */

    this.callback_ = null;
    /**
     * @private {?{
     *             container: !Element,
     *             iframe:!HTMLIFrameElement,
     *             request:!PaymentDataRequest,
     *             dataPromise:?Promise<!PaymentData>}}
     */

    this.prefetchedObjects_ = null;
    /** @private {boolean} */

    this.shouldHandleResizing_ = false;
    /** @private {?ActivityIframePort} */

    this.port_ = null;
    /** @private {?function(!Promise<void>)} */

    this.dismissPromiseResolver_ = null;
    /** @const @private {string} */

    this.googleTransactionId_ = googleTransactionId;
    /** @const @private {?string} */

    this.redirectKey_ = redirectKey || null;
    /**
     * @private {?ResizePayload}
     */

    this.savedResizePayload_ = null; // Only install dialog styles when iframing is allowed.

    if (null) {
      (0, _element_injector.injectStyleSheet)(_constants.Constants.IFRAME_STYLE);

      if (null) {
        (0, _element_injector.injectStyleSheet)(_constants.Constants.IFRAME_STYLE_CENTER);
      }
    }
  }
  /** @override */


  _createClass(PaymentsWebActivityDelegate, [{
    key: "onResult",
    value: function onResult(callback) {
      if (this.callback_) {
        return;
      }

      this.callback_ = callback;
      this.activities.onResult(GPAY_ACTIVITY_REQUEST, this.onActivityResult_.bind(this));
    }
    /**
     * @param {!ActivityPort} port
     * @private
     */

  }, {
    key: "onActivityResult_",
    value: function onActivityResult_(port) {
      var _this = this;

      // Hide the graypane.
      this.graypane_.hide(); // Only verified origins are allowed.

      this.callback_(port.acceptResult().then(function (result) {
        // Origin must always match: popup, iframe or redirect.
        if (result.origin != _this.getOrigin_()) {
          throw new Error('channel mismatch');
        }

        var data =
        /** @type {!PaymentData} */
        result.data;

        if (data['redirectEncryptedCallbackData']) {
          _pay_frame_helper.PayFrameHelper.setBuyFlowActivityMode(_pay_frame_helper.BuyFlowActivityMode.REDIRECT);

          return _this.fetchRedirectResponse_(data['redirectEncryptedCallbackData']).then(function (decrypedJson) {
            // Merge other non-encrypted fields into the final response.
            var clone = Object.assign({}, data);
            delete clone['redirectEncryptedCallbackData'];
            return Object.assign(clone, decrypedJson);
          });
        } // Unencrypted data supplied: must be a verified and secure channel.


        if (!result.originVerified || !result.secureChannel) {
          throw new Error('channel mismatch');
        }

        return data;
      }, function (error) {
        // TODO: Log the original and the inferred error to eye3.
        var originalError = error['message'];
        var inferredError = error['message'];

        try {
          // Try to parse the error message to a structured error, if it's
          // not possible, fallback to use the error message string.
          inferredError = JSON.parse(originalError.substring(ERROR_PREFIX.length));
        } catch (e) {}

        if (inferredError['statusCode'] && ['DEVELOPER_ERROR', 'MERCHANT_ACCOUNT_ERROR'].indexOf(inferredError['statusCode']) == -1) {
          inferredError = {
            'statusCode': 'CANCELED'
          };
        }

        if (inferredError == 'AbortError') {
          inferredError = {
            'statusCode': 'CANCELED'
          };
        }

        return Promise.reject(inferredError);
      }));
    }
    /**
     * @param {string} redirectEncryptedCallbackData
     * @return {!PaymentData}
     * @private
     */

  }, {
    key: "fetchRedirectResponse_",
    value: function fetchRedirectResponse_(redirectEncryptedCallbackData) {
      var _this2 = this;

      // This method has to rely on the legacy XHR API because the redirect
      // functionality is, in part, aimed at older browsers.
      return new Promise(function (resolve, reject) {
        var url = _this2.getDecryptionUrl_();

        var xhr = new XMLHttpRequest();
        xhr.open('POST', url, true);

        if ('withCredentials' in xhr) {
          // It's fine to proceed in a non-redirect mode because redirectVerifier
          // plays the part of CORS propagation.
          xhr.withCredentials = true;
        }

        xhr.onreadystatechange = function () {
          if (xhr.readyState <
          /* STATUS_RECEIVED */
          2) {
            return;
          }

          if (xhr.status < 100 || xhr.status > 599) {
            xhr.onreadystatechange = null;
            reject(new Error("Unknown HTTP status ".concat(xhr.status)));
            return;
          }

          if (xhr.readyState ==
          /* COMPLETE */
          4) {
            try {
              resolve(JSON.parse(xhr.responseText));
            } catch (e) {
              // JSON parsing error is expected here.
              reject(e);
            }
          }
        };

        xhr.onerror = function () {
          reject(new Error('Network failure'));
        };

        xhr.onabort = function () {
          reject(new Error('Request aborted'));
        }; // Send POST.


        xhr.send(redirectEncryptedCallbackData);
      });
    }
    /** @override */

  }, {
    key: "isReadyToPay",
    value: function isReadyToPay(isReadyToPayRequest) {
      var _this3 = this;

      return new Promise(function (resolve, reject) {
        if ((0, _validator.doesMerchantSupportOnlyTokenizedCards)(isReadyToPayRequest)) {
          resolve({
            'result': false
          });
          return;
        }

        var userAgent = window.navigator.userAgent;
        var isIosGsa = userAgent.indexOf('GSA/') > 0 && userAgent.indexOf(BrowserUserAgent.SAFARI) > 0; // pop up in IGSA doesn't work.

        if (isIosGsa && !null) {
          resolve({
            'result': false
          });
          return;
        }

        var isFirefoxIos = userAgent.indexOf('FxiOS') > 0;

        if (isFirefoxIos) {
          resolve({
            'result': false
          });
          return;
        }

        var isSupported = userAgent.indexOf(BrowserUserAgent.CHROME) > 0 || userAgent.indexOf(BrowserUserAgent.FIREFOX) > 0 || userAgent.indexOf(BrowserUserAgent.SAFARI) > 0;

        if (isSupported && isReadyToPayRequest.apiVersion >= 2 && isReadyToPayRequest.existingPaymentMethodRequired) {
          isReadyToPayRequest.environment = _this3.environment_;

          _pay_frame_helper.PayFrameHelper.sendAndWaitForResponse(isReadyToPayRequest, _pay_frame_helper.PostMessageEventType.IS_READY_TO_PAY, 'isReadyToPayResponse', function (event) {
            var response = {
              'result': isSupported
            };

            if (isReadyToPayRequest.existingPaymentMethodRequired) {
              response['paymentMethodPresent'] = event.data['isReadyToPayResponse'] == 'READY_TO_PAY';
            }

            resolve(response);
          });
        } else {
          resolve({
            'result': isSupported
          });
        }
      });
    }
    /** @override */

  }, {
    key: "prefetchPaymentData",
    value: function prefetchPaymentData(paymentDataRequest) {
      // Only handles prefetch for iframe for now.
      if (!null) {
        return;
      }

      var containerAndFrame = this.injectIframe_(paymentDataRequest);
      var paymentDataPromise = this.openIframe_(containerAndFrame['container'], containerAndFrame['iframe'], paymentDataRequest);
      this.prefetchedObjects_ = {
        'container': containerAndFrame['container'],
        'iframe': containerAndFrame['iframe'],
        'request': paymentDataRequest,
        'dataPromise': paymentDataPromise
      };
    }
    /** @override */

  }, {
    key: "loadPaymentData",
    value: function loadPaymentData(paymentDataRequest) {
      var _this4 = this;

      if (!paymentDataRequest.swg) {
        // Only set the apiVersion if the merchant is not setting it.
        if (!paymentDataRequest.apiVersion) {
          paymentDataRequest.apiVersion = 1;
        }
      }

      paymentDataRequest.environment = this.environment_;

      if (null) {
        _pay_frame_helper.PayFrameHelper.setBuyFlowActivityMode(_pay_frame_helper.BuyFlowActivityMode.IFRAME); // TODO: Compare the request with prefetched request.


        var containerAndFrame;
        var paymentDataPromise;

        if (this.prefetchedObjects_) {
          // Rendering prefetched frame and container.
          containerAndFrame = this.prefetchedObjects_;
          paymentDataPromise = this.prefetchedObjects_['dataPromise'];
          this.prefetchedObjects_ = null;
        } else {
          containerAndFrame = this.injectIframe_(paymentDataRequest);
          paymentDataPromise = this.openIframe_(containerAndFrame['container'], containerAndFrame['iframe'], paymentDataRequest);
        }

        this.showContainerAndIframeWithAnimation_(containerAndFrame['container'], containerAndFrame['iframe'], paymentDataRequest);
        history.pushState({}, '', '');

        var onPopState = function onPopState(e) {
          e.preventDefault();

          _this4.backButtonHandler_(containerAndFrame);

          window.removeEventListener('popstate', onPopState);
        };

        window.addEventListener('popstate', onPopState);
        var dismissPromise = new Promise(function (resolve) {
          _this4.dismissPromiseResolver_ = resolve;
        });
        this.callback_(Promise.race([paymentDataPromise, dismissPromise]));
        return;
      }

      _pay_frame_helper.PayFrameHelper.setBuyFlowActivityMode(paymentDataRequest['forceRedirect'] ? _pay_frame_helper.BuyFlowActivityMode.REDIRECT : _pay_frame_helper.BuyFlowActivityMode.POPUP);

      var opener = this.activities.open(GPAY_ACTIVITY_REQUEST, this.getHostingPageUrl_(), this.getRenderMode_(paymentDataRequest), paymentDataRequest, {
        'width': 600,
        'height': 600
      });
      this.graypane_.show(opener && opener.targetWin);
    }
    /**
     * Returns the render mode whether need to force redirect.
     *
     * @param {!PaymentDataRequest} paymentDataRequest
     * @return {string}
     * @private
     */

  }, {
    key: "getRenderMode_",
    value: function getRenderMode_(paymentDataRequest) {
      return paymentDataRequest['forceRedirect'] ? '_top' : 'gp-js-popup';
    }
    /**
     * Returns the server origin based on the environment.
     *
     * @private
     * @return {string}
     */

  }, {
    key: "getOrigin_",
    value: function getOrigin_() {
      if (this.environment_ == _constants.Constants.Environment.LOCAL) {
        return '';
      }

      var baseDomain;

      if (this.environment_ == _constants.Constants.Environment.PREPROD) {
        baseDomain = 'pay-preprod.sandbox';
      } else if (this.environment_ == _constants.Constants.Environment.SANDBOX) {
        baseDomain = 'pay.sandbox';
      } else {
        baseDomain = 'pay';
      }

      return 'https://' + baseDomain + '.google.com';
    }
    /**
     * Returns the base path based on the environment.
     *
     * @private
     * @return {string} The base path
     */

  }, {
    key: "getBasePath_",
    value: function getBasePath_() {
      return this.getOrigin_() + '/gp/p';
    }
    /**
     * Returns the decryption url to be used to decrypt the encrypted payload.
     *
     * @private
     * @return {string} The decryption url
     */

  }, {
    key: "getDecryptionUrl_",
    value: function getDecryptionUrl_() {
      var url = this.getBasePath_() + '/apis/buyflow/process';

      if (this.redirectKey_) {
        url += '?rk=' + encodeURIComponent(this.redirectKey_);
      }

      return url;
    }
    /**
     * Returns the hosting page url.
     *
     * @private
     * @return {string} The hosting page url
     */

  }, {
    key: "getHostingPageUrl_",
    value: function getHostingPageUrl_() {
      // In Tin tests, the hosting page is requested from
      // /testing/buyflow/merchantdemo.html and is accessed relatively since the
      // base path is unknown ahead of time.
      if (this.environment_ == _constants.Constants.Environment.TIN) {
        // There is no /gp/p prefix since multilogin prefixes is broken in Tin:
        // http://yaqs/4912322941550592
        return '/ui/pay';
      }

      return this.getBasePath_() + '/ui/pay';
    }
    /**
     * Returns the iframe pwg url to be used to be used for amp.
     *
     * @param {string} environment
     * @param {string} origin
     * @return {string} The iframe url
     */

  }, {
    key: "getIframeUrl",
    value: function getIframeUrl(environment, origin) {
      // TODO: These should be compile time constants and not dependent
      // on the environment.
      var iframeUrl = "https://pay.google.com/gp/p/ui/pay?origin=".concat(origin);

      if (environment == _constants.Constants.Environment.SANDBOX || environment == _constants.Constants.Environment.PREPROD) {
        iframeUrl = "https://pay'+  (environment == Constants.Environment.PREPROD ? '-preprod' : '')+  '.sandbox.google.com/gp/p/ui/pay?origin=".concat(origin);
      }

      return iframeUrl;
    }
    /**
     * Close iframe with animation.
     *
     * @param {!Element} container
     * @param {!HTMLIFrameElement} iframe
     * @private
     */

  }, {
    key: "removeIframeAndContainer_",
    value: function removeIframeAndContainer_(container, iframe) {
      var transitionStyle = 'all ' + IFRAME_CLOSE_DURATION_IN_MS + 'ms ease 0s';
      this.setTransition_(iframe, transitionStyle);
      iframe.height = '0px'; // TODO: This should be replaced by listening to TransitionEnd event

      setTimeout(function () {
        if (container.parentNode) {
          container.parentNode.removeChild(container);
        }
      }, IFRAME_CLOSE_DURATION_IN_MS);
    }
    /**
     * @param {!PaymentDataRequest} paymentDataRequest
     * @return {{container: !Element, iframe:!HTMLIFrameElement}}
     * @private
     */

  }, {
    key: "injectIframe_",
    value: function injectIframe_(paymentDataRequest) {
      var containerAndFrame = (0, _element_injector.injectIframe)(this.isVerticalCenterExperimentEnabled_(paymentDataRequest) ? _constants.Constants.IFRAME_STYLE_CENTER_CLASS : _constants.Constants.IFRAME_STYLE_CLASS);
      var iframe = containerAndFrame['iframe'];
      var container = containerAndFrame['container'];
      container.addEventListener('click', this.closeActionHandler_.bind(this, containerAndFrame)); // Hide iframe and disable resize at initialize.

      container.style.display = 'none';
      iframe.style.display = 'none';
      iframe.height = '0px';
      var transitionStyle = 'all ' + IFRAME_SHOW_UP_DURATION_IN_MS + 'ms ease 0s';
      this.setTransition_(iframe, transitionStyle);
      this.shouldHandleResizing_ = false;
      return containerAndFrame;
    }
    /**
     * Handler when back button is triggered, should dismiss iframe if present.
     * @param {{container: !Element, iframe:!HTMLIFrameElement}} containerAndFrame
     * @private
     */

  }, {
    key: "backButtonHandler_",
    value: function backButtonHandler_(containerAndFrame) {
      this.dismissIframe_(containerAndFrame);
    }
    /**
     * Handler when close action is triggered, will pop history state to close
     * the iframe.
     * @param {{container: !Element, iframe:!HTMLIFrameElement}} containerAndFrame
     * @private
     */

  }, {
    key: "closeActionHandler_",
    value: function closeActionHandler_(containerAndFrame) {
      if (containerAndFrame['container'].parentNode) {
        // Close action only when container is still attached to the page.
        history.back();
      }
    }
    /**
     * @param {{container: !Element, iframe:!HTMLIFrameElement}} containerAndFrame
     * @private
     */

  }, {
    key: "dismissIframe_",
    value: function dismissIframe_(containerAndFrame) {
      // Dismiss iframe only when container is still attached in the page.
      if (containerAndFrame['container'].parentNode) {
        // TODO: Think about whether this could be just hide instead of
        // disconnect and remove, the tricky part is how to handle the case where
        // payment data request is not the same.
        this.dismissPromiseResolver_(Promise.reject({
          'errorCode': 'CANCELED'
        }));
        this.removeIframeAndContainer_(containerAndFrame['container'], containerAndFrame['iframe']);
        this.port_ && this.port_.disconnect();
      }
    }
    /**
     * @param {!PaymentDataRequest} paymentDataRequest
     * @return {boolean}
     * @private
     */

  }, {
    key: "isVerticalCenterExperimentEnabled_",
    value: function isVerticalCenterExperimentEnabled_(paymentDataRequest) {
      return null && paymentDataRequest['i'] && paymentDataRequest['i'].renderContainerCenter;
    }
    /**
     * @param {!Element} container
     * @param {!HTMLIFrameElement} iframe
     * @param {!PaymentDataRequest} paymentDataRequest
     * @private
     */

  }, {
    key: "showContainerAndIframeWithAnimation_",
    value: function showContainerAndIframeWithAnimation_(container, iframe, paymentDataRequest) {
      var _this5 = this;

      container.style.display = 'block';
      iframe.style.display = 'block';
      setTimeout(function () {
        // Hard code the apprx height here, it will be resize to expected height
        // later.
        iframe.height = '280px';

        if (_this5.isVerticalCenterExperimentEnabled_(paymentDataRequest)) {
          iframe.classList.add(_constants.Constants.IFRAME_ACTIVE_CONTAINER_CLASS);
        } // TODO: This should be handles properly by listening to
        // TransitionEnd event.


        setTimeout(function () {
          _this5.shouldHandleResizing_ = true; // TODO: Add browser test that catches this.

          if (_this5.savedResizePayload_) {
            _this5.setTransition_(iframe, _this5.savedResizePayload_['transition']);

            iframe.height = _this5.savedResizePayload_['height'];
            _this5.savedResizePayload_ = null;
          }
        }, IFRAME_SHOW_UP_DURATION_IN_MS);
      }, 1);
    }
    /**
     * @param {!HTMLIFrameElement} iframe
     * @param {string} transitionStyle
     * @private
     */

  }, {
    key: "setTransition_",
    value: function setTransition_(iframe, transitionStyle) {
      iframe.style.setProperty('transition', transitionStyle); // For safari.

      iframe.style.setProperty('-webkit-transition', transitionStyle);
    }
    /**
     * Use WebActivitiy to open iframe that's in given container.
     *
     * @param {!Element} container
     * @param {!HTMLIFrameElement} iframe
     * @param {!PaymentDataRequest} paymentDataRequest
     * @return {!Promise<!PaymentData>}
     * @private
     */

  }, {
    key: "openIframe_",
    value: function openIframe_(container, iframe, paymentDataRequest) {
      var _this6 = this;

      if (!paymentDataRequest.swg) {
        if (!paymentDataRequest.apiVersion) {
          paymentDataRequest.apiVersion = 1;
        }
      }

      paymentDataRequest.environment = this.environment_;
      var iframeLoadStartTime;
      var trustedUrl = this.getIframeUrl(this.environment_, window.location.origin);
      return this.activities.openIframe(iframe, trustedUrl, paymentDataRequest).then(function (port) {
        // Handle custom resize message.
        _this6.port_ = port;
        port.onMessage(function (payload) {
          if (payload['type'] !== 'resize' || !_this6.shouldHandleResizing_) {
            // Save the resize event later after initial animation is finished
            _this6.savedResizePayload_ = {
              'height': payload['height'],
              'transition': payload['transition']
            };
            return;
          } // b/111310899: Smooth out initial iFrame loading


          if (!iframeLoadStartTime) {
            iframeLoadStartTime = Date.now();
          }

          if (Date.now() < iframeLoadStartTime + IFRAME_SHOW_UP_DURATION_IN_MS) {
            _this6.setTransition_(iframe, payload['transition'] + ', ' + IFRAME_SMOOTH_HEIGHT_TRANSITION);
          } else {
            _this6.setTransition_(iframe, payload['transition']);
          }

          iframe.height = payload['height'];
        });
        return (
          /** @type {!Promise<!Object>} */
          port.acceptResult()
        );
      }).then(
      /**
       * @param {!Object} result
       * @return {!PaymentData}
       */
      function (result) {
        _this6.removeIframeAndContainer_(container, iframe); // This is only for popping the state we pushed earlier.


        history.back();
        var data =
        /** @type {!PaymentData} */
        result['data'];
        return data;
      }, function (error) {
        _this6.removeIframeAndContainer_(container, iframe); // This is only for popping the state we pushed earlier.


        history.back();
        return Promise.reject(error);
      });
    }
  }]);

  return PaymentsWebActivityDelegate;
}();

exports.PaymentsWebActivityDelegate = PaymentsWebActivityDelegate;

},{"./constants.js":87,"./element_injector.js":88,"./graypane.js":89,"./pay_frame_helper.js":90,"./payments_client_delegate_interface.js":92,"./validator.js":98,"web-activities/activity-ports":4}],95:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PostMessageService = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

/**
 * @license
 * Copyright 2018 Google Inc. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS-IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * Service wrapping window.parent.postMessage. This enables
 * window.postMessage to be swapped out in unit tests.
 */
var PostMessageService = /*#__PURE__*/function () {
  function PostMessageService(window) {
    _classCallCheck(this, PostMessageService);

    /** @private @const {!Window} */
    this.window_ = window;
  }
  /**
   * Passthrough to Window#postMessage. See Window#postMessage DOM API
   * documentation for more information about arguments.
   *
   * @param {!Object} message
   * @param {string} targetOrigin
   */


  _createClass(PostMessageService, [{
    key: "postMessage",
    value: function postMessage(message, targetOrigin) {
      this.window_.postMessage(message, targetOrigin);
    }
  }]);

  return PostMessageService;
}();

exports.PostMessageService = PostMessageService;

},{}],96:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.UpiHandler = void 0;

var _constants = require("./constants.js");

var _pay_frame_helper = require("./pay_frame_helper.js");

var _validator = require("./validator.js");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var UpiHandler = /*#__PURE__*/function () {
  function UpiHandler() {
    _classCallCheck(this, UpiHandler);
  }
  /**
   * Returns upi payment method object if it exists in allowed payment methods
   * or null if it doesn't
   *
   * @param {!IsReadyToPayRequest|!PaymentDataRequest} request
   * @return {boolean}
   */


  _createClass(UpiHandler, [{
    key: "isUpiRequest",
    value: function isUpiRequest(request) {
      return !!(0, _validator.getUpiPaymentMethod)(request);
    }
    /**
     * Returns upi payment method object if it exists in allowed payment methods
     * or null if it doesn't
     *
     * @param {!IsReadyToPayRequest|!PaymentDataRequest} request
     * @return {!Promise} The promise will contain the boolean result and error
     *     message when possible.
     */

  }, {
    key: "isReadyToPay",
    value: function isReadyToPay(request) {
      // Always return true for UPI if api version is 2 and chrome supports
      // payment request
      if ((0, _validator.getUpiPaymentMethod)(request)) {
        if (request.existingPaymentMethodRequired) {
          return Promise.resolve({
            'result': true,
            'paymentMethodPresent': true
          });
        } else {
          return Promise.resolve({
            'result': true
          });
        }
      }

      throw new Error('No Upi payment method found in handler');
    }
    /**
     * Request payment data when payment method is UPI
     *
     * @param {!PaymentDataRequest} paymentDataRequest Provides necessary
     *     information to support a payment.
     * @param {!Object} upiPaymentMethod UPI paymentmethod in
     *     allowedPaymentMethods array.
     * @param {!Function} onResultCallback Function to call when everything is
     *     done.
     */

  }, {
    key: "loadPaymentData",
    value: function loadPaymentData(paymentDataRequest, upiPaymentMethod, onResultCallback) {
      var _this = this;

      var parameters = upiPaymentMethod['parameters'];
      var transactionInfo = paymentDataRequest['transactionInfo'];
      var supportedInstruments = null ? [{
        // This is the url for Tez teamfood release.
        'supportedMethods': ['https://pwp-server.appspot.com/pay-teamfood'],
        'data': {
          'pa': 'redbus@axisbank',
          'pn': parameters['payeeName'],
          'tr': parameters['transactionReferenceId'],
          'url': parameters['referenceUrl'],
          'mc': '4131',
          'tn': 'Purchase in Merchant'
        }
      }] : [{
        'supportedMethods': ['https://tez.google.com/pay'],
        'data': {
          'pa': parameters['payeeVpa'],
          'pn': parameters['payeeName'],
          'tr': parameters['transactionReferenceId'],
          'url': parameters['referenceUrl'],
          'mc': parameters['mcc'],
          'tn': transactionInfo['transactionNote']
        }
      }];

      if (parameters['transactionId']) {
        supportedInstruments[0]['data']['tid'] = parameters['transactionId'];
      }

      var details = {
        'total': {
          'label': 'Total',
          'amount': {
            'currency': transactionInfo['currencyCode'],
            'value': transactionInfo['totalPrice']
          }
        },
        'displayItems': [{
          'label': 'Original Amount',
          'amount': {
            'currency': transactionInfo['currencyCode'],
            'value': transactionInfo['totalPrice']
          }
        }]
      };
      var request = new PaymentRequest(supportedInstruments, details);
      onResultCallback(this.checkCanMakePayment_(request).then(function (result) {
        if (result) {
          return _this.showUi_(request);
        } else {
          return _this.redirectToGooglePlay_();
        }
      }).then(function (paymentData) {
        return _this.processData_(paymentData, paymentDataRequest, upiPaymentMethod);
      })["catch"](function (error) {
        error['statusCode'] = _constants.Constants.ResponseStatus.CANCELED;
        return Promise.reject(error);
      }));
    }
    /**
     * Show the Tez payment request UI.
     *
     * @private
     * @param {!PaymentRequest} request The payment request object.
     * @return {!Promise<!PaymentData>} A promise containing payment response.
     */

  }, {
    key: "showUi_",
    value: function showUi_(request) {
      return request.show().then(function (paymentResponse) {
        paymentResponse.complete('success');
        return paymentResponse.details;
      });
    }
    /**
     * Checks whether can make a payment with Tez on this device.
     *
     * @private
     * @param {!PaymentRequest} request The payment request object.
     * @return {!Promise<boolean>} a promise containing the result of whether can
     *     make payment.
     */

  }, {
    key: "checkCanMakePayment_",
    value: function checkCanMakePayment_(request) {
      // Checks canMakePayment cache, and use the cache result if it exists.
      var cacheResult = window.sessionStorage.getItem(_constants.Constants.UPI_CAN_MAKE_PAYMENT_CACHE_KEY);

      if (cacheResult) {
        return Promise.resolve(cacheResult === 'true');
      } // Feature detect canMakePayment().


      if (!request.canMakePayment) {
        return Promise.resolve(true);
      }

      var canMakePaymentPromise = request.canMakePayment();
      return canMakePaymentPromise.then(function (result) {
        // Store the result in cache if the result is true to avoid quota error
        // caused by querying multiple times with different data.
        // Doesn't store false because if we do so, user will be redirected to
        // Google Play again after installing Google Pay if Chrome is not closed.
        if (result) {
          window.sessionStorage.setItem(_constants.Constants.UPI_CAN_MAKE_PAYMENT_CACHE_KEY, result.toString());
        }

        return result;
      });
    }
    /**
     * Redirect user to Google Pay app in Google Play store
     *
     * @private
     * @returns {!Promise<!Object>} Rejected promise with error message
     */

  }, {
    key: "redirectToGooglePlay_",
    value: function redirectToGooglePlay_() {
      window.location.replace(null ? 'https://play.google.com/store/apps/details?id=com.google.android.apps.nbu.paisa.user.teamfood ' : // NOLINT
      'https://play.google.com/store/apps/details?id=com.google.android.apps.nbu.paisa.user'); // NOLINT

      return Promise.reject({
        'errorMessage': 'Cannot redirect to Tez page in Google Play.'
      });
    }
    /**
     * Convert Tez payment data to GPay payment data if payment succeeded, or
     * reject if payment failed
     *
     * @private
     * @param {!PaymentData} tezPaymentData The payment data object from Tez.
     * @param {!PaymentDataRequest} paymentDataRequest The payment data request.
     * @param {!Object} upiPaymentMethod UPI paymentmethod in
     * allowedPaymentMethods array
     * @returns {!Promise<PaymentData>} A promise containing payment data or
     *     error message.
     */

  }, {
    key: "processData_",
    value: function processData_(tezPaymentData, paymentDataRequest, upiPaymentMethod) {
      var tezResponse = JSON.parse(tezPaymentData['tezResponse']);

      if (tezResponse['Status'] === 'FAILURE') {
        var error;

        switch (tezResponse['responseCode']) {
          case 'ZM':
            // payment failure due to invalid MPIN
            error = {
              'errorCode': _pay_frame_helper.PublicErrorCode.BUYER_ACCOUNT_ERROR,
              'errorMessage': 'Payment failure due to invalid MPIN.'
            };
            break;

          case 'Z9':
            // payment failure due to insufficient funds
            error = {
              'errorCode': _pay_frame_helper.PublicErrorCode.BUYER_ACCOUNT_ERROR,
              'errorMessage': 'Payment failure due to insufficient funds.'
            };
            break;

          case '91':
            // payment failure due to transaction timeout or connection issue
            error = {
              'errorCode': _pay_frame_helper.PublicErrorCode.INTERNAL_ERROR,
              'errorMessage': 'Payment failure due to transaction timeout or connection' + ' issue.'
            };
            break;

          default:
            // payment failure due to user cancel or other issues
            error = {
              'errorMessage': 'Payment cancelled.'
            };
        }

        return Promise.reject(error);
      }

      var signedMessage = {
        'paymentMethodType': 'UPI',
        'payeeVpa': upiPaymentMethod['parameters']['payeeVpa'],
        'status': tezResponse['Status'],
        'transactionReferenceId': upiPaymentMethod['parameters']['transactionReferenceId'],
        'transactionId': upiPaymentMethod['parameters']['transactionId'] ? upiPaymentMethod['parameters']['transactionId'] : tezResponse['txnId'],
        'transactionInfo': paymentDataRequest['transactionInfo']
      };
      var paymentData = {
        'apiVersion': paymentDataRequest['apiVersion'],
        'apiVersionMinor': paymentDataRequest['apiVersionMinor'],
        'paymentMethodData': {
          'type': upiPaymentMethod['type'],
          'tokenizationData': {
            'type': 'DIRECT',
            'token': {
              'protocolVersion': 'ECv1',
              // TODO: Verify that response comes from tez and
              // add signature and encrypt signed message here
              'signature': '',
              'signedMessage': signedMessage
            }
          }
        }
      };
      return Promise.resolve(paymentData);
    }
  }]);

  return UpiHandler;
}();

exports.UpiHandler = UpiHandler;

},{"./constants.js":87,"./pay_frame_helper.js":90,"./validator.js":98}],97:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createGoogleTransactionId = createGoogleTransactionId;

var _RandomUuid = _interopRequireDefault(require("../third_party/random_uuid/Random.uuid.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

/**
 * @license
 * Copyright 2018 Google Inc. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS-IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * Returns a google transaction id.
 *
 * @param {string} environment
 * @return {string}
 */
function createGoogleTransactionId(environment) {
  return _RandomUuid["default"].uuidFast() + '.' + environment;
}

},{"../third_party/random_uuid/Random.uuid.js":99}],98:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.apiV2DoesMerchantSupportSpecifiedCardType = apiV2DoesMerchantSupportSpecifiedCardType;
exports.chromeSupportsPaymentHandler = chromeSupportsPaymentHandler;
exports.chromeSupportsPaymentRequest = chromeSupportsPaymentRequest;
exports.doesMerchantSupportOnlyTokenizedCards = doesMerchantSupportOnlyTokenizedCards;
exports.getUpiPaymentMethod = getUpiPaymentMethod;
exports.isPaymentMethodValid = isPaymentMethodValid;
exports.validateIsReadyToPayRequest = validateIsReadyToPayRequest;
exports.validatePaymentOptions = validatePaymentOptions;
exports.validatePaymentDataRequest = validatePaymentDataRequest;
exports.validateSecureContext = validateSecureContext;

var _constants = require("./constants.js");

/**
 * @license
 * Copyright 2018 Google Inc. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS-IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * @return {boolean} true if this version of Chrome supports PaymentHandler.
 */
function chromeSupportsPaymentHandler() {
  // Check if feature is enabled for user
  if (typeof google == 'undefined' || !null) {
    return false;
  } // Payment handler isn't supported on mobile


  var mobilePlatform = window.navigator.userAgent.match(/Android|iPhone|iPad|iPod|BlackBerry|IEMobile/i);

  if (mobilePlatform != null) {
    return false;
  }

  var chromeVersion = window.navigator.userAgent.match(/Chrome\/([0-9]+)\./i);
  return 'PaymentRequest' in window && chromeVersion != null && Number(chromeVersion[1]) >= 68 && window.navigator.vendor == 'Google Inc.';
}
/**
 * @return {boolean} true if this version of Chrome supports PaymentRequest.
 */


function chromeSupportsPaymentRequest() {
  // Opera uses chrome as rendering engine and sends almost the exact same
  // user agent as chrome thereby fooling us on android.
  var isOpera = window.navigator.userAgent.indexOf('OPR/') != -1;

  if (isOpera) {
    return false;
  }

  if (chromeSupportsPaymentHandler()) {
    return true;
  }

  var androidPlatform = window.navigator.userAgent.match(/Android/i);
  var chromeVersion = window.navigator.userAgent.match(/Chrome\/([0-9]+)\./i);
  return androidPlatform != null && 'PaymentRequest' in window && // Make sure skipping PaymentRequest UI when only one PaymentMethod is
  // supported (starts on Google Chrome 59).
  window.navigator.vendor == 'Google Inc.' && chromeVersion != null && Number(chromeVersion[1]) >= 59;
}
/**
 * @param {!IsReadyToPayRequest} isReadyToPayRequest
 *
 * @return {boolean} true if the merchant only supports tokenized cards.
 */


function doesMerchantSupportOnlyTokenizedCards(isReadyToPayRequest) {
  if (isReadyToPayRequest.apiVersion >= 2) {
    var allowedAuthMethods = extractAllowedAuthMethodsForCards_(isReadyToPayRequest);

    if (allowedAuthMethods && allowedAuthMethods.length == 1 && allowedAuthMethods[0] == _constants.Constants.AuthMethod.CRYPTOGRAM_3DS) {
      return true;
    }
  }

  return isReadyToPayRequest.allowedPaymentMethods.length == 1 && isReadyToPayRequest.allowedPaymentMethods[0] == _constants.Constants.PaymentMethod.TOKENIZED_CARD;
}
/**
 * @param {!IsReadyToPayRequest} isReadyToPayRequest
 * @param {Constants.AuthMethod} apiV2AuthMethod
 *
 * @return {boolean} true if the merchant supports pan cards.
 */


function apiV2DoesMerchantSupportSpecifiedCardType(isReadyToPayRequest, apiV2AuthMethod) {
  if (isReadyToPayRequest.apiVersion >= 2) {
    var allowedAuthMethods = extractAllowedAuthMethodsForCards_(isReadyToPayRequest);

    if (allowedAuthMethods && allowedAuthMethods.includes(apiV2AuthMethod)) {
      return true;
    }

    return false;
  }

  return false;
}
/**
 * Validate if is secure context. Returns null if context is secure, otherwise
 * return error message.
 *
 * See https://developer.mozilla.org/en-US/docs/Web/Security/Secure_Contexts
 *
 * @return {?string} null if current context is secure, otherwise return error
 * message.
 */


function validateSecureContext() {
  if (window.location.hostname.endsWith(_constants.Constants.TRUSTED_DOMAIN)) {
    // This is for local development.
    return null;
  }

  if (window.isSecureContext === undefined) {
    // Browser not support isSecureContext, figure out a way to validate this
    // for the unsupported browser.
    return null;
  }

  return window.isSecureContext ? null : 'Google Pay APIs should be called in secure context!';
}
/**
 * Validate PaymentOptions.
 *
 * @param {!PaymentOptions} paymentOptions
 */


function validatePaymentOptions(paymentOptions) {
  if (paymentOptions.environment && !Object.values(_constants.Constants.Environment).includes(paymentOptions.environment)) {
    throw new Error('Parameter environment in PaymentOptions can optionally be set to ' + 'PRODUCTION, otherwise it defaults to TEST. ' + paymentOptions.environment);
  }
}
/**
 * Validate IsReadyToPayRequest.
 *
 * @param {!IsReadyToPayRequest} isReadyToPayRequest
 * @return {?string} errorMessage if the request is invalid.
 */


function validateIsReadyToPayRequest(isReadyToPayRequest) {
  if (!isReadyToPayRequest) {
    return 'isReadyToPayRequest must be set!';
  } else if (isReadyToPayRequest.apiVersion >= 2) {
    if (!('apiVersionMinor' in isReadyToPayRequest)) {
      return 'apiVersionMinor must be set!';
    }

    if (!isReadyToPayRequest.allowedPaymentMethods || !Array.isArray(isReadyToPayRequest.allowedPaymentMethods) || isReadyToPayRequest.allowedPaymentMethods.length == 0) {
      return 'for v2 allowedPaymentMethods must be set to an array containing a list of accepted payment methods';
    }

    for (var i = 0; i < isReadyToPayRequest.allowedPaymentMethods.length; i++) {
      var allowedPaymentMethod = isReadyToPayRequest.allowedPaymentMethods[i];

      if (allowedPaymentMethod['type'] == _constants.Constants.PaymentMethod.CARD) {
        if (!allowedPaymentMethod['parameters']) {
          return 'Field parameters must be setup in each allowedPaymentMethod';
        }

        var allowedCardNetworks = allowedPaymentMethod['parameters']['allowedCardNetworks'];

        if (!allowedCardNetworks || !Array.isArray(allowedCardNetworks) || allowedCardNetworks.length == 0) {
          return 'allowedCardNetworks must be setup in parameters for type CARD';
        }

        var allowedAuthMethods = allowedPaymentMethod['parameters']['allowedAuthMethods'];

        if (!allowedAuthMethods || !Array.isArray(allowedAuthMethods) || allowedAuthMethods.length == 0 || !allowedAuthMethods.every(isAuthMethodValid)) {
          return 'allowedAuthMethods must be setup in parameters for type \'CARD\' ' + ' and must contain \'CRYPTOGRAM_3DS\' and/or \'PAN_ONLY\'';
        }
      }
    }

    return null;
  } else if (!isReadyToPayRequest.allowedPaymentMethods || !Array.isArray(isReadyToPayRequest.allowedPaymentMethods) || isReadyToPayRequest.allowedPaymentMethods.length == 0 || !isReadyToPayRequest.allowedPaymentMethods.every(isPaymentMethodValid)) {
    return 'allowedPaymentMethods must be set to an array containing \'CARD\' ' + 'and/or \'TOKENIZED_CARD\'!';
  }

  return null;
}
/**
 * Validate the payment method.
 *
 * @param {string} paymentMethod
 * @return {boolean} if the current payment method is valid.
 */


function isPaymentMethodValid(paymentMethod) {
  return Object.values(_constants.Constants.PaymentMethod).includes(paymentMethod);
}
/**
 * Validate the auth method.
 *
 * @param {string} authMethod
 * @return {boolean} if the current auth method is valid.
 */


function isAuthMethodValid(authMethod) {
  return Object.values(_constants.Constants.AuthMethod).includes(authMethod);
}
/**
 * Validate PaymentDataRequest.
 *
 * @param {!PaymentDataRequest} paymentDataRequest
 * @return {?string} errorMessage if the request is invalid.
 */


function validatePaymentDataRequest(paymentDataRequest) {
  if (!paymentDataRequest) {
    return 'paymentDataRequest must be set!';
  }

  if (paymentDataRequest.swg) {
    return validatePaymentDataRequestForSwg(paymentDataRequest.swg);
  } else if (!paymentDataRequest.transactionInfo) {
    return 'transactionInfo must be set!';
  } else if (!paymentDataRequest.transactionInfo.currencyCode) {
    return 'currencyCode in transactionInfo must be set!';
  } else if (!paymentDataRequest.transactionInfo.totalPriceStatus || !Object.values(_constants.Constants.TotalPriceStatus).includes(paymentDataRequest.transactionInfo.totalPriceStatus)) {
    return 'totalPriceStatus in transactionInfo must be set to one of' + ' NOT_CURRENTLY_KNOWN, ESTIMATED or FINAL!';
  } else if (paymentDataRequest.transactionInfo.totalPriceStatus !== 'NOT_CURRENTLY_KNOWN' && !paymentDataRequest.transactionInfo.totalPrice) {
    return 'totalPrice in transactionInfo must be set when' + ' totalPriceStatus is ESTIMATED or FINAL!';
  } // Validate payment data request for UPI payment method


  var allowedPaymentMethod = getUpiPaymentMethod(paymentDataRequest);

  if (allowedPaymentMethod) {
    if (!allowedPaymentMethod['parameters']) {
      return 'parameters must be set in allowedPaymentMethod!';
    }

    var parameters = allowedPaymentMethod['parameters'];

    if (!parameters['payeeVpa']) {
      return 'payeeVpa in allowedPaymentMethod parameters must be set!';
    } else if (!parameters['payeeName']) {
      return 'payeeName in allowedPaymentMethod parameters must be set!';
    } else if (!parameters['referenceUrl']) {
      return 'referenceUrl in allowedPaymentMethod parameters must be set!';
    } else if (!parameters['mcc']) {
      return 'mcc in allowedPaymentMethod parameters must be set!';
    } else if (!parameters['transactionReferenceId']) {
      return 'transactionReferenceId in allowedPaymentMethod parameters' + ' must be set!';
    }

    if (paymentDataRequest['transactionInfo']['currencyCode'] !== 'INR') {
      return 'currencyCode in transactionInfo must be set to INR!';
    } else if (paymentDataRequest['transactionInfo']['totalPriceStatus'] !== 'FINAL') {
      return 'totalPriceStatus in transactionInfo must be set to FINAL!';
    } else if (!paymentDataRequest['transactionInfo']['transactionNote']) {
      return 'transactionNote in transactionInfo must be set!';
    }
  }

  return null;
}
/**
 * Returns upi payment method object if it exists in allowed payment methods
 * or null if it doesn't
 *
 * @param {!IsReadyToPayRequest|!PaymentDataRequest} request
 * @return {?Object}
 */


function getUpiPaymentMethod(request) {
  if (!chromeSupportsPaymentRequest() || request.apiVersion < 2 || !request.allowedPaymentMethods) {
    return null;
  }

  return getAllowedPaymentMethodForType_(request, _constants.Constants.PaymentMethod.UPI);
}
/**
 * Validate parameters for swg.
 *
 * @param {?SwgParameters} swgParameters
 * @return {?string} errorMessage if the request is invalid.
 */


function validatePaymentDataRequestForSwg(swgParameters) {
  if (!swgParameters) {
    return 'Swg parameters must be provided';
  }

  if (!swgParameters.skuId || !swgParameters.publicationId) {
    return 'Both skuId and publicationId must be provided';
  }

  return null;
}
/**
 * Returns the allowedAuthMethods for a card from the request.
 *
 * @param {!IsReadyToPayRequest} isReadyToPayRequest
 * @return {?Array<string>}
 * @private
 */


function extractAllowedAuthMethodsForCards_(isReadyToPayRequest) {
  if (isReadyToPayRequest.allowedPaymentMethods) {
    var allowedPaymentMethod = getAllowedPaymentMethodForType_(isReadyToPayRequest, _constants.Constants.PaymentMethod.CARD);

    if (allowedPaymentMethod && allowedPaymentMethod.parameters) {
      return allowedPaymentMethod.parameters['allowedAuthMethods'];
    }
  }

  return null;
}
/**
 * @param {!IsReadyToPayRequest} isReadyToPayRequest
 * @param {string} paymentMethodType
 * @return {?PaymentMethod} Return first payment method for the given type,
 *     return null if not found.
 * @private
 */


function getAllowedPaymentMethodForType_(isReadyToPayRequest, paymentMethodType) {
  for (var i = 0; i < isReadyToPayRequest.allowedPaymentMethods.length; i++) {
    var allowedPaymentMethod = isReadyToPayRequest.allowedPaymentMethods[i];

    if (allowedPaymentMethod.type == paymentMethodType) {
      return allowedPaymentMethod;
    }
  }

  return null;
}

},{"./constants.js":87}],99:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/** @license
Math.uuid.js (v1.4)
http://www.broofa.com
mailto:robert@broofa.com
Copyright (c) 2010 Robert Kieffer
Dual licensed under the MIT and GPL licenses.
*/

/*
 * Generate a random uuid.
 *
 * USAGE: Math.uuid(length, radix)
 *   length - the desired number of characters
 *   radix  - the number of allowable values for each character.
 *
 * EXAMPLES:
 *   // No arguments  - returns RFC4122, version 4 ID
 *   >>> Math.uuid()
 *   "92329D39-6F5C-4520-ABFC-AAB64544E172"
 *
 *   // One argument - returns ID of the specified length
 *   >>> Math.uuid(15)     // 15 character ID (default base=62)
 *   "VcydxgltxrVZSTV"
 *
 *   // Two arguments - returns ID of the specified length, and radix. (Radix must be <= 62)
 *   >>> Math.uuid(8, 2)  // 8 character ID (base=2)
 *   "01001010"
 *   >>> Math.uuid(8, 10) // 8 character ID (base=10)
 *   "47473046"
 *   >>> Math.uuid(8, 16) // 8 character ID (base=16)
 *   "098F4D35"
 */
var Random_uuid = function Random_uuid() {
  _classCallCheck(this, Random_uuid);
};

exports["default"] = Random_uuid;
; // Private array of chars to use

var CHARS = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'.split('');

Random_uuid.uuid = function (len, radix) {
  var chars = CHARS,
      uuid = [],
      i;
  radix = radix || chars.length;

  if (len) {
    // Compact form
    for (i = 0; i < len; i++) {
      uuid[i] = chars[0 | Math.random() * radix];
    }
  } else {
    // rfc4122, version 4 form
    var r; // rfc4122 requires these characters

    uuid[8] = uuid[13] = uuid[18] = uuid[23] = '-';
    uuid[14] = '4'; // Fill in random data.  At i==19 set the high bits of clock sequence as
    // per rfc4122, sec. 4.1.5

    for (i = 0; i < 36; i++) {
      if (!uuid[i]) {
        r = 0 | Math.random() * 16;
        uuid[i] = chars[i == 19 ? r & 0x3 | 0x8 : r];
      }
    }
  }

  return uuid.join('');
}; // A more performant, but slightly bulkier, RFC4122v4 solution.  We boost performance
// by minimizing calls to random()


Random_uuid.uuidFast = function () {
  var chars = CHARS,
      uuid = new Array(36),
      rnd = 0,
      r;

  for (var i = 0; i < 36; i++) {
    if (i == 8 || i == 13 || i == 18 || i == 23) {
      uuid[i] = '-';
    } else if (i == 14) {
      uuid[i] = '4';
    } else {
      if (rnd <= 0x02) rnd = 0x2000000 + Math.random() * 0x1000000 | 0;
      r = rnd & 0xf;
      rnd = rnd >> 4;
      uuid[i] = chars[i == 19 ? r & 0x3 | 0x8 : r];
    }
  }

  return uuid.join('');
}; // A more compact, but less performant, RFC4122v4 solution:


Random_uuid.uuidCompact = function () {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    var r = Math.random() * 16 | 0,
        v = c == 'x' ? r : r & 0x3 | 0x8;
    return v.toString(16);
  });
};

},{}]},{},[21])

})();//# sourceMappingURL=subscriptions.max.js.map
