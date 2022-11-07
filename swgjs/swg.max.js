(function(){(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CSS = void 0;
const CSS = ".swg-dialog,.swg-toast{background-color:#fff!important;box-sizing:border-box}.swg-toast{border:none!important;bottom:0!important;max-height:46px!important;position:fixed!important;z-index:2147483647!important}@media (min-width:871px) and (min-height:641px){.swg-dialog.swg-wide-dialog{left:-435px!important;width:870px!important}}@media (max-height:640px),(max-width:640px){.swg-dialog,.swg-toast{border-top-left-radius:8px!important;border-top-right-radius:8px!important;box-shadow:0 1px 1px rgba(60,64,67,.3),0 1px 4px 1px rgba(60,64,67,.15)!important;left:-240px!important;margin-left:50vw!important;width:480px!important}}@media (min-width:641px) and (min-height:641px){.swg-dialog{background-color:transparent!important;border:none!important;left:-315px!important;margin-left:50vw!important;width:630px!important}.swg-toast{border-radius:4px!important;bottom:8px!important;box-shadow:0 3px 1px -2px rgba(0,0,0,.2),0 2px 2px 0 rgba(0,0,0,.14),0 1px 5px 0 rgba(0,0,0,.12)!important;left:8px!important}}@media (max-width:480px){.swg-dialog,.swg-toast{left:0!important;margin-left:0!important;right:0!important;width:100%!important}}html>body.swg-disable-scroll{height:100vh!important;overflow:hidden!important}html>body.swg-disable-scroll *{overflow:hidden!important}\n/*# sourceURL=/./src/components/dialog.css*/\n";
exports.CSS = CSS;

},{}],2:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CSS = void 0;
const CSS = "body{margin:0;padding:0}swg-container,swg-loading,swg-loading-animate,swg-loading-image{display:block}swg-loading-container{-ms-flex-align:center!important;-ms-flex-pack:center!important;align-items:center!important;bottom:0!important;display:-ms-flexbox!important;display:flex!important;height:100%!important;justify-content:center!important;margin-top:5px!important;min-height:148px!important;width:100%!important;z-index:2147483647!important}@media (min-height:630px),(min-width:630px){swg-loading-container{background-color:#fff!important;border-top-left-radius:8px!important;border-top-right-radius:8px!important;box-shadow:0 1px 1px rgba(60,64,67,.3),0 1px 4px 1px rgba(60,64,67,.15)!important;margin-left:auto!important;margin-right:auto!important;width:560px!important}swg-loading-container.centered-on-desktop{border-radius:8px!important;height:120px!important;min-height:120px!important}}swg-loading{animation:mspin-rotate 1568.63ms linear infinite;height:36px;overflow:hidden;width:36px;z-index:2147483647!important}swg-loading-animate{animation:mspin-revrot 5332ms steps(4) infinite}swg-loading-image{animation:swg-loading-film 5332ms steps(324) infinite;background-image:url(/assets/loader.svg);background-size:100%;height:36px;width:11664px}@keyframes swg-loading-film{0%{transform:translateX(0)}to{transform:translateX(-11664px)}}@keyframes mspin-rotate{0%{transform:rotate(0deg)}to{transform:rotate(1turn)}}@keyframes mspin-revrot{0%{transform:rotate(0deg)}to{transform:rotate(-1turn)}}\n/*# sourceURL=/./src/ui/ui.css*/\n";
exports.CSS = CSS;

},{}],3:[function(require,module,exports){
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

},{}],4:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LoginRequest = exports.ClientTheme = exports.ClientOptions = exports.BasicSubscriptions = exports.AutoPromptType = void 0;
var _entitlements = require("./entitlements");
var _subscribeResponse = require("./subscribe-response");
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

/* eslint-disable no-unused-vars */
/**
 * Interface for users of the basic tier of Subscribe with Google.
 * @interface
 */
class BasicSubscriptions {
  /**
   * Initializes the basic subscriptions runtime. This includes setting of the
   * specified param values in the JSON-LD markup of the page, sets up any SwG
   * buttons with attribute 'swg-standard-button', and inserts a SwG prompt for
   * contributions/subscriptions. If the fields specified in the params are
   * already specified in the JSON-LD markup on the page, the existing values
   * will be preserved, and the values within init will be ignored.
   * @param {{
   *   type: (string|!Array<string>),
   *   isAccessibleForFree: boolean,
   *   isPartOfType: (string|!Array<string>),
   *   isPartOfProductId: string,
   *   autoPromptType: (AutoPromptType|undefined),
   *   clientOptions: (ClientOptions|undefined),
   *   alwaysShow: (boolean|undefined),
   *   disableDefaultMeteringHandler: (boolean|undefined),
   *   publisherProvidedId: (string|undefined),
   * }=} params
   */
  init(params) {}

  /**
   * Set the entitlement check callback.
   * @param {function(!Promise<!EntitlementsDef>)} callback
   * @return {?}
   */
  setOnEntitlementsResponse(callback) {}

  /**
   * Set the payment complete callback.
   * @param {function(!Promise<!SubscribeResponseDef>)} callback
   * @return {?}
   */
  setOnPaymentResponse(callback) {}

  /**
   * Open CheckEntitlementsView to let users log in Google and check their entitlements.
   * @param {function(!LoginRequest)} callback
   * @return {?}
   */
  setOnLoginRequest(callback) {}

  /**
   * Creates and displays a SwG subscription or contribution prompt, where the
   * prompt type is determined by the parameters passed in to init. If the auto
   * prompt is determined to have been already set up, the setup portion of the
   * function will be skipped, and the prompt will be displayed. The
   * autoPromptType specifies which type of prompt should be displayed (see
   * AutoPromptType below). The alwaysShow parameter is an option to force show
   * the prompt, regardless of any display rules. This parameter is intended for
   * preview purposes.
   * @param {{
   *   autoPromptType: (!AutoPromptType|undefined),
   *   alwaysShow: (boolean|undefined),
   * }} options
   * @returns {!Promise}
   */
  setupAndShowAutoPrompt(options) {}

  /**
   * Dismisses any SwG UI currently displayed. Intended to be used for preview
   * purposes.
   * @return {?}
   */
  dismissSwgUI() {}
}
/* eslint-enable no-unused-vars */

/**
 * The types of autoprompt that can be specified to be shown. CONTRIBUTION and
 * SUBSCRIPTION will trigger the small, button-like prompt, and
 * CONTRIBUTION_LARGE and SUBSCRIPTION_LARGE will trigger the larger purchase
 * UI.
 * @enum {string}
 */
exports.BasicSubscriptions = BasicSubscriptions;
const AutoPromptType = {
  NONE: 'none',
  CONTRIBUTION: 'contribution',
  CONTRIBUTION_LARGE: 'contribution_large',
  SUBSCRIPTION: 'subscription',
  SUBSCRIPTION_LARGE: 'subscription_large'
};

/**
 * Options for configuring all client UI.
 * Properties:
 * - disableButton: whether to enable button.
 * - forceLangInIframes: whether to force the specified lang in iframes.
 * - lang: Sets the button and prompt language. Default is "en".
 * - theme: "light" or "dark". Default is "light".
 *
 * @typedef {{
 *   disableButton: (boolean|undefined),
 *   lang: (string|undefined),
 *   forceLangInIframes: (boolean|undefined),
 *   theme: (ClientTheme|undefined),
 *   allowScroll: (boolean|undefined),
 * }}
 */
exports.AutoPromptType = AutoPromptType;
let ClientOptions;

/**
 * @typedef {{
 *   linkRequested: boolean,
 * }}
 */
exports.ClientOptions = ClientOptions;
let LoginRequest;

/** @enum {string} */
exports.LoginRequest = LoginRequest;
const ClientTheme = {
  LIGHT: 'light',
  DARK: 'dark'
};
exports.ClientTheme = ClientTheme;

},{"./entitlements":7,"./subscribe-response":12}],5:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FilterResult = exports.ClientEventParams = exports.ClientEventManagerApi = exports.ClientEvent = void 0;
var _api_messages = require("../proto/api_messages");
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

/** @enum {number}  */
const FilterResult = {
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
 *    eventType: ?AnalyticsEventDef,
 *    eventOriginator: !EventOriginatorDef,
 *    isFromUserAction: ?boolean,
 *    additionalParameters: ?Object,
 * }}
 */
exports.FilterResult = FilterResult;
let ClientEvent;

/* eslint-disable no-unused-vars */
/**
 * @interface
 */
exports.ClientEvent = ClientEvent;
class ClientEventManagerApi {
  /**
   * Call this function to log an event. The registered listeners will be
   * invoked unless the event is filtered.
   * @param {!function(!ClientEvent, (!ClientEventParams|undefined)=)} listener
   */
  registerEventListener(listener) {}

  /**
   * Register a filterer for events if you need to potentially prevent the
   * listeners from hearing about it.  A filterer should return
   * FilterResult.CANCEL_EVENT to prevent listeners from hearing about the
   * event.
   * @param {!function(!ClientEvent):FilterResult} filterer
   */
  registerEventFilterer(filterer) {}

  /**
   * Call this function to log an event.  It will immediately throw an error if
   * the event is invalid.  It will then asynchronously call the filterers and
   * stop the event if a filterer cancels it.  After that, it will call each
   * listener asynchronously.
   * @param {!ClientEvent} event
   * @param {(!ClientEventParams|undefined)=} eventParams
   */
  logEvent(event) {
    let eventParams = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : undefined;
  }
}
/* eslint-enable no-unused-vars */

/**
 * Event Properties to handle for a specific event. For example, GA Event
 * properties to skip SwG logging but still be handled via callback.
 * @typedef {{
 *   googleAnalyticsParameters: ({
 *     event_category: string,
 *     survey_question: string,
 *     survey_answer_category: string,
 *     event_label: string,
 *   }|undefined)
 * }}
 */
exports.ClientEventManagerApi = ClientEventManagerApi;
let ClientEventParams;
exports.ClientEventParams = ClientEventParams;

},{"../proto/api_messages":30}],6:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DeferredAccountCreationResponse = exports.DeferredAccountCreationRequest = void 0;
var _entitlements = require("./entitlements");
var _subscribeResponse = require("./subscribe-response");
var _userData = require("./user-data");
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
 * Properties:
 * - entitlements - the current entitlements.
 * - consent - whether to ask the user for account creation consent.
 *   Default is `true`.
 *
 * @typedef {{
 *   entitlements: (?EntitlementsDef|undefined),
 *   consent: (boolean|undefined),
 * }}
 */
let DeferredAccountCreationRequest;

/**
 */
exports.DeferredAccountCreationRequest = DeferredAccountCreationRequest;
class DeferredAccountCreationResponse {
  /**
   * @param {!EntitlementsDef} entitlements
   * @param {!UserDataDef} userData
   * @param {!Array<!PurchaseDataDef>} purchaseDataList
   * @param {function():!Promise} completeHandler
   */
  constructor(entitlements, userData, purchaseDataList, completeHandler) {
    /** @const {!EntitlementsDef} */
    this.entitlements = entitlements;
    /** @const {!UserDataDef} */
    this.userData = userData;
    /** @const {!Array<!PurchaseDataDef>} */
    this.purchaseDataList = purchaseDataList;
    // TODO(dvoytenko): deprecate.
    /** @const {!PurchaseDataDef} */
    this.purchaseData = purchaseDataList[0];
    /** @private @const {function():!Promise} */
    this.completeHandler_ = completeHandler;
  }

  /**
   * @return {!DeferredAccountCreationResponse}
   */
  clone() {
    return new DeferredAccountCreationResponse(this.entitlements, this.userData, this.purchaseDataList, this.completeHandler_);
  }

  /**
   * @return {!Object}
   */
  json() {
    return {
      'entitlements': this.entitlements.json(),
      'userData': this.userData.json(),
      'purchaseDataList': this.purchaseDataList.map(pd => pd.json()),
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
  complete() {
    return this.completeHandler_();
  }
}
exports.DeferredAccountCreationResponse = DeferredAccountCreationResponse;

},{"./entitlements":7,"./subscribe-response":12,"./user-data":14}],7:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PRIVILEGED_SOURCE = exports.GOOGLE_SOURCE = exports.GOOGLE_METERING_SOURCE = exports.Entitlements = exports.Entitlement = exports.DEV_MODE_TOKEN = exports.DEV_MODE_ORDER = void 0;
var _api_messages = require("../proto/api_messages");
var _log = require("../utils/log");
var _object = require("../utils/object");
var _json = require("../utils/json");
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

/** Source for Google-provided non-metering entitlements. */
const GOOGLE_SOURCE = 'google';

/** Source for Google-provided metering entitlements. */
exports.GOOGLE_SOURCE = GOOGLE_SOURCE;
const GOOGLE_METERING_SOURCE = 'google:metering';

/** Source for privileged entitlements. */
exports.GOOGLE_METERING_SOURCE = GOOGLE_METERING_SOURCE;
const PRIVILEGED_SOURCE = 'privileged';

/** Subscription token for dev mode entitlements. */
exports.PRIVILEGED_SOURCE = PRIVILEGED_SOURCE;
const DEV_MODE_TOKEN = 'GOOGLE_DEV_MODE_TOKEN';

/** Order ID returned for dev mode entitlements. */
exports.DEV_MODE_TOKEN = DEV_MODE_TOKEN;
const DEV_MODE_ORDER = 'GOOGLE_DEV_MODE_ORDER';

/**
 * The holder of the entitlements for a service.
 */
exports.DEV_MODE_ORDER = DEV_MODE_ORDER;
class Entitlements {
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
  constructor(service, raw, entitlements, currentProduct, ackHandler, consumeHandler, isReadyToPay, decryptedDocumentKey) {
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
  clone() {
    return new Entitlements(this.service, this.raw, this.entitlements.map(ent => ent.clone()), this.product_, this.ackHandler_, this.consumeHandler_, this.isReadyToPay, this.decryptedDocumentKey);
  }

  /**
   * @return {!Object}
   */
  json() {
    return {
      'service': this.service,
      'entitlements': this.entitlements.map(item => item.json()),
      'isReadyToPay': this.isReadyToPay
    };
  }

  /**
   * Returns true if the current article is unlocked by a cacheable entitlement.
   * Metering entitlements aren't cacheable, because each metering entitlement
   * is meant to be used for one article. Subscription entitlements that are
   * not returned by dev mode are cacheable, because subscription entitlements
   * are meant to be used across multiple articles on a publication.
   * @return {boolean}
   */
  enablesThisWithCacheableEntitlements() {
    const entitlement = this.getEntitlementForThis();
    return !!entitlement && !this.enablesThisWithGoogleMetering() && !this.enablesThisWithGoogleDevMode();
  }

  /**
   * Returns true if the current article is unlocked by a
   * Google metering entitlement. These entitlements may come
   * from Google News Intiative's licensing program to support news.
   * https://www.blog.google/outreach-initiatives/google-news-initiative/licensing-program-support-news-industry-/
   * They may also come from Google's Subscribe With Google Metering
   * functionality.
   * @return {boolean}
   */
  enablesThisWithGoogleMetering() {
    const entitlement = this.getEntitlementForThis();
    return !!entitlement && entitlement.source === GOOGLE_METERING_SOURCE;
  }

  /**
   * Returns true if the current article is unlocked by a Google dev mode
   * entitlement.
   * @return {boolean}
   */
  enablesThisWithGoogleDevMode() {
    const entitlement = this.getEntitlementForThis();
    if (!entitlement) {
      return false;
    }
    const isFirstPartyToken = entitlement.source === GOOGLE_SOURCE && entitlement.subscriptionToken.indexOf(DEV_MODE_ORDER) !== -1;
    const isThirdPartyToken = entitlement.subscriptionToken === DEV_MODE_TOKEN;
    return isFirstPartyToken || isThirdPartyToken;
  }

  /**
   * @param {string=} source
   * @return {boolean}
   */
  enablesThis(source) {
    return this.enables(this.product_, source);
  }

  /**
   * @param {string=} source
   * @return {boolean}
   */
  enablesAny(source) {
    for (let i = 0; i < this.entitlements.length; i++) {
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
  enables(product, source) {
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
  getEntitlementForThis(source) {
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
  getEntitlementFor(product, source) {
    if (!product) {
      // Require a product ID.
      (0, _log.warn)('SwG needs this article to define a product ID (e.g. example.com:premium). Articles can define a product ID using JSON+LD. SwG can check entitlements after this article defines a product ID.');
      return null;
    }

    // Prefer subscription entitlements over metering entitlements.
    // Metering entitlements are a limited resource. When a metering entitlement
    // unlocks an article, that depletes the user's remaining "free reads".
    // Subscription entitlements are *not* depleted when they unlock articles.
    // They are essentially unlimited if the subscription remains valid.
    // For this reason, subscription entitlements are preferred.
    const entitlementsThatUnlockArticle = this.entitlements.filter(entitlement => entitlement.enables(product) && (!source || source === entitlement.source));
    const subscriptionEntitlement = (0, _object.findInArray)(entitlementsThatUnlockArticle, entitlement => entitlement.source !== GOOGLE_METERING_SOURCE);
    const meteringEntitlement = (0, _object.findInArray)(entitlementsThatUnlockArticle, entitlement => entitlement.source === GOOGLE_METERING_SOURCE);
    return subscriptionEntitlement || meteringEntitlement || null;
  }

  /**
   * Returns the first matching entitlement for the specified source w/o
   * matching any specific products.
   * @param {string} source
   * @return {?Entitlement}
   */
  getEntitlementForSource(source) {
    if (this.entitlements.length > 0) {
      for (let i = 0; i < this.entitlements.length; i++) {
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
  ack() {
    this.ackHandler_(this);
  }

  /**
   * A 3p site should call this method to consume a Google metering entitlement.
   * When a metering entitlement is consumed, SwG shows the user a metering dialog.
   * When the user closes the dialog, SwG depletes one of the user's remaining
   * "free reads".
   * @param {?Function=} onCloseDialog Called after the user closes the dialog.
   */
  consume(onCloseDialog) {
    this.consumeHandler_(this, onCloseDialog);
  }
}

/**
 * The single entitlement object.
 */
exports.Entitlements = Entitlements;
class Entitlement {
  /**
   * @param {string} source
   * @param {!Array<string>} products
   * @param {string} subscriptionToken
   * @param {JsonObject|null|undefined} subscriptionTokenContents
   * @param {!Timestamp|null} subscriptionTimestamp
   */
  constructor(source, products, subscriptionToken, subscriptionTokenContents, subscriptionTimestamp) {
    /** @const {string} */
    this.source = source;
    /** @const {!Array<string>} */
    this.products = products;
    /** @const {string} */
    this.subscriptionToken = subscriptionToken;
    /** @const {JsonObject|null|undefined} */
    this.subscriptionTokenContents = subscriptionTokenContents;
    /** @const {!Timestamp|null} */
    this.subscriptionTimestamp = subscriptionTimestamp;
  }

  /**
   * @return {!Entitlement}
   */
  clone() {
    return new Entitlement(this.source, this.products.slice(0), this.subscriptionToken, this.subscriptionTokenContents, this.subscriptionTimestamp);
  }

  /**
   * @return {!Object}
   */
  json() {
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
  enables(product) {
    if (!product) {
      return false;
    }
    const eq = product.indexOf(':');
    // Handle wildcards
    if (eq != -1) {
      // Wildcard product (publication:*) unlocks on any entitlement matching publication
      const publication = product.substring(0, eq + 1);
      if (publication + '*' == product && this.products.filter(candidate => candidate.substring(0, eq + 1) == publication).length >= 1) {
        (0, _log.debugLog)('enabled with wildcard productId');
        return true;
      }
      // Wildcard entitlement allows any product matching this publication
      if (this.products.includes(publication + '*')) {
        (0, _log.debugLog)('enabled with wildcard entitlement');
        return true;
      }
    }
    return this.products.includes(product);
  }

  /**
   * @param {?Object} json
   * @param {!../utils/jwt.JwtHelper} jwtHelper
   * @return {!Entitlement}
   */
  static parseFromJson(json, jwtHelper) {
    if (!json) {
      json = {};
    }
    const source = json['source'] || '';
    const products = json['products'] || [];
    const subscriptionToken = json['subscriptionToken'];
    let subscriptionTokenContents;
    try {
      subscriptionTokenContents = subscriptionToken ? jwtHelper.decode(subscriptionToken) : null;
    } catch (e) {
      subscriptionTokenContents = null;
    }
    const timestampJson = json['subscriptionTimestamp'];
    let subscriptionTimestamp;
    try {
      subscriptionTimestamp = new _api_messages.Timestamp([timestampJson.seconds_, timestampJson.nanos_], false);
    } catch (e) {
      subscriptionTimestamp = null;
    }
    return new Entitlement(source, products, subscriptionToken, subscriptionTokenContents, subscriptionTimestamp);
  }

  /**
   * The JSON is expected in one of the forms:
   * - Single entitlement: `{products: [], ...}`.
   * - A list of entitlements: `[{products: [], ...}, {...}]`.
   * @param {!Object|!Array<!Object>} json
   * @param {!../utils/jwt.JwtHelper} jwtHelper
   * @return {!Array<!Entitlement>}
   */
  static parseListFromJson(json, jwtHelper) {
    const jsonList = Array.isArray(json) ? /** @type {!Array<Object>} */json : [json];
    return jsonList.map(json => Entitlement.parseFromJson(json, jwtHelper));
  }

  /**
   * Returns the SKU associated with this entitlement.
   * @return {?string}
   */
  getSku() {
    if (this.source !== 'google') {
      return null;
    }
    const sku = /** @type {?string} */
    (0, _json.getPropertyFromJsonString)(this.subscriptionToken, 'productId') || null;
    if (!sku) {
      (0, _log.warn)('Unable to retrieve SKU from SwG subscription token');
    }
    return sku;
  }
}
exports.Entitlement = Entitlement;

},{"../proto/api_messages":30,"../utils/json":76,"../utils/log":78,"../utils/object":79}],8:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SubscriptionState = exports.PublisherEvent = exports.LoggerApi = exports.Event = void 0;
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
const SubscriptionState = {
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
const Event = {
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
let PublisherEvent;

/* eslint-disable no-unused-vars */
/**
 * @interface
 */
exports.PublisherEvent = PublisherEvent;
class LoggerApi {
  /**
   * Send a buy-flow event that occurred on the publisher's site to Google.  The
   * ultimate destination is controlled by configuration settings.  Publisher
   * configuration available:
   *   enablePropensity - Sends data to the Propensity to Subscribe ads server.
   *   enableSwgAnalytics - Sends data to Google's analytics server for buy-flow
   *     comparison purposes.
   * @param {!PublisherEvent} userEvent
   */
  sendEvent(userEvent) {}

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
  sendSubscriptionState(state, jsonProducts) {}
}
/* eslint-enable no-unused-vars */
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
const MeterClientTypes = {
  /** Meter client type for content licensed by Google. */
  LICENSED_BY_GOOGLE: 1,
  /**
   * Meter client type for content that a publication is allowing to be
   * metered by Google.
   */
  METERED_BY_GOOGLE: 2
};
exports.MeterClientTypes = MeterClientTypes;

},{}],10:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Offer = void 0;
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
class Offer {
  /**
   * @param {string} skuId
   * @param {string} title
   * @param {string} description
   * @param {string} price
   */
  constructor(skuId, title, description, price) {
    /** @const {string} */
    this.skuId = skuId;
    /** @const {string} */
    this.title = title;
    /** @const {string} */
    this.description = description;
    /** @const {string} */
    this.price = price;
  }
}
exports.Offer = Offer;

},{}],11:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SubscriptionState = exports.ScoreDetail = exports.Score = exports.PropensityType = exports.PropensityScore = exports.PropensityEvent = exports.PropensityApi = exports.Header = exports.Event = exports.Body = void 0;
var LoggerApi = _interopRequireWildcard(require("./logger-api"));
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
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
const PropensityType = {
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
let Score;

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
let ScoreDetail;

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
let Body;

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
let Header;

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
let PropensityScore;

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
let PropensityEvent;

/*
 * Please note that the definitions of Event and SubscriptionState have moved
 * to logger-api.js.  This is now the preferred interface to use for logging
 * publisher events and setting the user's current subscription state.
 * Propensity will continue to function as an event logger until we are certain
 * no publishers are actively using it to log events.
 */
exports.PropensityEvent = PropensityEvent;
const Event = LoggerApi.Event;
exports.Event = Event;
const SubscriptionState = LoggerApi.SubscriptionState;

/* eslint-disable no-unused-vars */
/**
 * @extends {LoggerApi.LoggerApi}
 * @interface
 */
exports.SubscriptionState = SubscriptionState;
class PropensityApi extends LoggerApi.LoggerApi {
  /**
   * Get the propensity of a user to subscribe based on the type.
   * The argument should be a valid string from PropensityType.
   * If no type is provided, GENERAL score is returned.
   * @param {PropensityType=} type
   * @return {?Promise<!PropensityScore>}
   */
  getPropensity(type) {}
}
/* eslint-enable no-unused-vars */
exports.PropensityApi = PropensityApi;

},{"./logger-api":8}],12:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SubscribeResponse = exports.PurchaseData = void 0;
var _entitlements = require("./entitlements");
var _userData = require("./user-data");
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
class SubscribeResponse {
  /**
   * @param {string} raw
   * @param {!PurchaseData} purchaseData
   * @param {?UserDataDef} userData
   * @param {?EntitlementsDef} entitlements
   * @param {!string} productType
   * @param {function():!Promise} completeHandler
   * @param {?string=} oldSku
   * @param {?string=} swgUserToken
   * @param {?number=} paymentRecurrence
   * @param {?Object=} requestMetadata
   */
  constructor(raw, purchaseData, userData, entitlements, productType, completeHandler) {
    let oldSku = arguments.length > 6 && arguments[6] !== undefined ? arguments[6] : null;
    let swgUserToken = arguments.length > 7 && arguments[7] !== undefined ? arguments[7] : null;
    let paymentRecurrence = arguments.length > 8 && arguments[8] !== undefined ? arguments[8] : null;
    let requestMetadata = arguments.length > 9 && arguments[9] !== undefined ? arguments[9] : null;
    /** @const {string} */
    this.raw = raw;
    /** @const {!PurchaseData} */
    this.purchaseData = purchaseData;
    /** @const {?UserDataDef} */
    this.userData = userData;
    /** @const {?EntitlementsDef} */
    this.entitlements = entitlements;
    /** @const {string} */
    this.productType = productType;
    /** @private @const {function():!Promise} */
    this.completeHandler_ = completeHandler;
    /** @const {?string} */
    this.oldSku = oldSku;
    /** @const {?string} */
    this.swgUserToken = swgUserToken;
    /** @const {?number} */
    this.paymentRecurrence = paymentRecurrence;
    /** @const {?Object} */
    this.requestMetadata = requestMetadata;
  }

  /**
   * @return {!SubscribeResponse}
   */
  clone() {
    return new SubscribeResponse(this.raw, this.purchaseData, this.userData, this.entitlements, this.productType, this.completeHandler_, this.oldSku, this.swgUserToken);
  }

  /**
   * @return {!Object}
   */
  json() {
    return {
      'purchaseData': this.purchaseData.json(),
      'userData': this.userData ? this.userData.json() : null,
      'entitlements': this.entitlements ? this.entitlements.json() : null,
      'oldSku': this.oldSku,
      'productType': this.productType,
      'swgUserToken': this.swgUserToken
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
  complete() {
    return this.completeHandler_();
  }
}

/**
 */
exports.SubscribeResponse = SubscribeResponse;
class PurchaseData {
  /**
   * @param {string} raw
   * @param {string} signature
   */
  constructor(raw, signature) {
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
  clone() {
    return new PurchaseData(this.raw, this.signature);
  }

  /**
   * @return {!Object}
   */
  json() {
    return {
      'data': this.raw,
      'signature': this.signature
    };
  }
}
exports.PurchaseData = PurchaseData;

},{"./entitlements":7,"./user-data":14}],13:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.WindowOpenMode = exports.Subscriptions = exports.SubscriptionRequest = exports.SubscriptionFlows = exports.SmartButtonOptions = exports.ShowcaseEvent = exports.SaveSubscriptionRequestCallback = exports.SaveSubscriptionRequest = exports.ReplaceSkuProrationMode = exports.PublisherEntitlement = exports.ProductType = exports.OffersRequest = exports.LoginRequest = exports.GetEntitlementsParamsInternalDef = exports.GetEntitlementsParamsExternalDef = exports.GetEntitlementsMeteringParamsInternal = exports.GetEntitlementsMeteringParamsExternal = exports.GetEntitlementsEncryptionParams = exports.Config = exports.ButtonOptions = exports.AnalyticsMode = void 0;
exports.defaultConfig = defaultConfig;
var _clientEventManagerApi = require("./client-event-manager-api");
var _deferredAccountCreation = require("./deferred-account-creation");
var _entitlements = require("./entitlements");
var _loggerApi = require("./logger-api");
var _offer = require("./offer");
var _propensityApi = require("./propensity-api");
var _subscribeResponse = require("./subscribe-response");
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

/* eslint-disable no-unused-vars */
/**
 * @interface
 */
class Subscriptions {
  /**
   * Optionally initializes the subscriptions runtime with publication or
   * product ID. If not called, the runtime will look for the initialization
   * parameters in the page's markup.
   * @param {string} productOrPublicationId
   */
  init(productOrPublicationId) {}

  /**
   * Optionally configures the runtime with non-default properties. See
   * `Config` definition for details.
   * @param {!Config} config
   * @return {?}
   */
  configure(config) {}

  /**
   * Starts the entitlement flow.
   * @return {?}
   */
  start() {}

  /**
   * Resets the entitlements that can be fetched again.
   * @return {?}
   */
  reset() {}

  /**
   * Resets the entitlements and clears all of the caches.
   * @return {?}
   */
  clear() {}

  /**
   * @param {!GetEntitlementsParamsExternalDef=} params
   * @return {!Promise<!EntitlementsDef>}
   */
  getEntitlements(params) {}

  /**
   * Set the subscribe callback.
   * @param {function(!Promise<!EntitlementsDef>)} callback
   * @return {?}
   */
  setOnEntitlementsResponse(callback) {}

  /**
   * Returns a set of offers.
   * @param {{
   *   productId: (string|undefined),
   * }=} options
   * @return {!Promise<!Array<!OfferDef>>}
   */
  getOffers(options) {}

  /**
   * Starts the Offers flow.
   * @param {!OffersRequest=} options
   * @return {?}
   */
  showOffers(options) {}

  /**
   * Starts the Offers flow for a subscription update.
   * @param {!OffersRequest=} options
   * @return {?}
   */
  showUpdateOffers(options) {}

  /**
   * Show subscription option.
   * @param {!OffersRequest=} options
   * @return {?}
   */
  showSubscribeOption(options) {}

  /**
   * Show abbreviated offers.
   * @param {!OffersRequest=} options
   * @return {?}
   */
  showAbbrvOffer(options) {}

  /**
   * Show contribution options for the users to select from.
   * The options are grouped together by periods (Weekly, Monthly, etc.).
   * User can select the amount to contribute to from available options
   * to the publisher. These options are based on the SKUs defined in the Play
   * console for a given publication.
   * Each SKU has Amount, Period, SKUId and other attributes.
   * @param {!OffersRequest=} options
   * @return {?}
   */
  showContributionOptions(options) {}

  /**
   * Set the callback for the native subscribe request. Setting this callback
   * triggers the "native" option in the offers flow.
   * @param {function()} callback
   * @return {?}
   */
  setOnNativeSubscribeRequest(callback) {}

  /**
   * Set the subscribe complete callback.
   * @param {function(!Promise<!SubscribeResponseDef>)} callback
   * @return {?}
   */
  setOnSubscribeResponse(callback) {}

  /**
   * Starts subscription purchase flow.
   * @param {string} sku
   * @return {?}
   */
  subscribe(sku) {}

  /**
   * Starts subscription purchase flow.
   * @param {SubscriptionRequest} subscriptionRequest
   * @return {?}
   */
  updateSubscription(subscriptionRequest) {}

  /**
   * Set the contribution complete callback.
   * @param {function(!Promise<!SubscribeResponseDef>)} callback
   * @return {?}
   */
  setOnContributionResponse(callback) {}

  /**
   * Set the payment complete callback.
   * @param {function(!Promise<!SubscribeResponseDef>)} callback
   * @return {?}
   */
  setOnPaymentResponse(callback) {}

  /**
   * Starts contributions purchase flow.
   * @param {string|SubscriptionRequest} skuOrSubscriptionRequest
   * @return {?}
   */
  contribute(skuOrSubscriptionRequest) {}

  /**
   * Starts the deferred account creation flow.
   * See `DeferredAccountCreationRequest` for more details.
   * @param {?DeferredAccountCreationRequest=} options
   * @return {!Promise<!DeferredAccountCreationResponse>}
   */
  completeDeferredAccountCreation(options) {}

  /**
   * @param {function(!LoginRequest)} callback
   * @return {?}
   */
  setOnLoginRequest(callback) {}

  /**
   * @param {!LoginRequest} request
   * @return {?}
   */
  triggerLoginRequest(request) {}

  /**
   * Starts the login prompt flow.
   * @return {!Promise}
   */
  showLoginPrompt() {}

  /**
   * Starts the login notification flow.
   * @return {!Promise}
   */
  showLoginNotification() {}

  /**
   * @param {function()} callback
   * @return {?}
   */
  setOnLinkComplete(callback) {}

  /**
   * @param {!Promise} accountPromise Publisher's promise to lookup account.
   * @return {!Promise}
   */
  waitForSubscriptionLookup(accountPromise) {}

  /**
   * Starts the Account linking flow.
   * TODO(dparikh): decide if it's only exposed for testing or PROD purposes.
   * @param {{ampReaderId: (string|undefined)}=} params
   * @return {?}
   */
  linkAccount(params) {}

  /**
   * Notifies the client that a flow has been started. The name of the flow
   * is passed as the callback argument. The flow name corresponds to the
   * method name in this interface, such as "showOffers", or "subscribe".
   * See `SubscriptionFlows` for the full list.
   *
   * Also see `setOnFlowCanceled` method.
   *
   * @param {function({flow: string, data: !Object})} callback
   * @return {?}
   */
  setOnFlowStarted(callback) {}

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
   * @return {?}
   */
  setOnFlowCanceled(callback) {}

  /**
   * Starts the save subscriptions flow.
   * @param {!SaveSubscriptionRequestCallback} requestCallback
   * @return {!Promise} a promise indicating flow is started
   */
  saveSubscription(requestCallback) {}

  /**
   * Creates an element with the SwG button style and the provided callback.
   * The default theme is "light".
   *
   * @param {!ButtonOptions|function()} optionsOrCallback
   * @param {function()=} callback
   * @return {!Element}
   */
  createButton(optionsOrCallback, callback) {}

  /**
   * Attaches the SwG button style and the provided callback to an existing
   * DOM element. The default theme is "light".
   *
   * @param {!Element} button
   * @param {!ButtonOptions|function()} optionsOrCallback
   * @param {function()=} callback
   * @return {?}
   */
  attachButton(button, optionsOrCallback, callback) {}

  /**
   * Attaches smartButton element and the provided callback.
   * The default theme is "light".
   *
   * @param {!Element} button
   * @param {!SmartButtonOptions|function()} optionsOrCallback
   * @param {function()=} callback
   * @return {?}
   */
  attachSmartButton(button, optionsOrCallback, callback) {}

  /**
   * Retrieves the propensity module that provides APIs to
   * get propensity scores based on user state and events
   * @return {!Promise<PropensityApiDef>}
   */
  getPropensityModule() {}

  /** @return {!Promise<LoggerApiDef>} */
  getLogger() {}

  /** @return {!Promise<ClientEventManagerApiDef>} */
  getEventManager() {}

  /**
   * Publishers participating in Showcase should call this with their own entitlements
   * and entitlement related UI events.  SwG will automatically do this for Google
   * sourced subscriptions and meters.
   * @param {!PublisherEntitlement} entitlement
   * @return {?}
   */
  setShowcaseEntitlement(entitlement) {}

  /**
   * Publishers, who both (1) participate in Showcase and (2) use server-side paywalls,
   * should call this method to consume Showcase entitlements.
   * @param {string} showcaseEntitlementJwt
   * @param {?Function=} onCloseDialog Called after the user closes the dialog.
   * @return {?}
   */
  consumeShowcaseEntitlementJwt(showcaseEntitlementJwt, onCloseDialog) {}

  /**
   * Intelligently returns the most interesting action to the
   * reader based on different different user status. For
   * instance, a new user may get free metering by simply
   * clicking 'follow-publisher' action, and a frequently
   * visiting user may be shown a 'creating an account' action.
   * TODO(moonbong): Implement this function.
   * @return {?}
   */
  showBestAudienceAction() {}

  /**
   * Sets the publisherProvidedId.
   * @param {string} publisherProvidedId
   * @return {?}
   */
  setPublisherProvidedId(publisherProvidedId) {}
}
/* eslint-enable no-unused-vars */

/** @enum {string} */
exports.Subscriptions = Subscriptions;
const ShowcaseEvent = {
  // Events indicating content could potentially be unlocked
  EVENT_SHOWCASE_METER_OFFERED: 'EVENT_SHOWCASE_METER_OFFERED',
  // This event is only required if the user can choose not to use a publisher meter

  // Events indicating content was unlocked
  EVENT_SHOWCASE_UNLOCKED_BY_SUBSCRIPTION: 'EVENT_SHOWCASE_UNLOCKED_BY_SUBSCRIPTION',
  // Publisher managed subscriptions only
  EVENT_SHOWCASE_UNLOCKED_BY_METER: 'EVENT_SHOWCASE_UNLOCKED_BY_METER',
  // Publisher managed meters only
  EVENT_SHOWCASE_UNLOCKED_FREE_PAGE: 'EVENT_SHOWCASE_UNLOCKED_FREE_PAGE',
  // When the article is free for any reason (lead article, etc)

  // Events indicating the user must take action to view content
  EVENT_SHOWCASE_NO_ENTITLEMENTS_REGWALL: 'EVENT_SHOWCASE_NO_ENTITLEMENTS_REGWALL',
  // When the user must register (or log in) to view the article

  // Events indicating the user must subscribe to view content
  EVENT_SHOWCASE_INELIGIBLE_PAYWALL: 'EVENT_SHOWCASE_INELIGIBLE_PAYWALL',
  // When the user is not eligible for showcase entitlements
  EVENT_SHOWCASE_NO_ENTITLEMENTS_PAYWALL: 'EVENT_SHOWCASE_NO_ENTITLEMENTS_PAYWALL' // When the user has no remaining showcase entitlements
};

/**
 * PublisherEntitlement
 *   In order to participate in News Showcase, publishers must report information about their entitlements.
 * Properties:
 * - isUserRegistered: Is the user registered currently?
 * - entitlement: Publisher entitlement event type.
 * - subscriptionTimestamp: Timestamp(in millisecond) when the user converted to a subscriber. Null if the user is not a subscriber.
 *  @typedef {{
 *    isUserRegistered:  !boolean,
 *    entitlement: !ShowcaseEvent,
 *    subscriptionTimestamp: (!number|null),
 * }}
 */
exports.ShowcaseEvent = ShowcaseEvent;
let PublisherEntitlement;

/** @enum {string} */
exports.PublisherEntitlement = PublisherEntitlement;
const SubscriptionFlows = {
  SHOW_OFFERS: 'showOffers',
  SHOW_SUBSCRIBE_OPTION: 'showSubscribeOption',
  SHOW_ABBRV_OFFER: 'showAbbrvOffer',
  SHOW_CONTRIBUTION_OPTIONS: 'showContributionOptions',
  SUBSCRIBE: 'subscribe',
  CONTRIBUTE: 'contribute',
  COMPLETE_DEFERRED_ACCOUNT_CREATION: 'completeDeferredAccountCreation',
  LINK_ACCOUNT: 'linkAccount',
  SHOW_LOGIN_PROMPT: 'showLoginPrompt',
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
 *   publisherProvidedId: (string|undefined),
 * }}
 */
exports.SubscriptionFlows = SubscriptionFlows;
let Config;

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
let GetEntitlementsParamsInternalDef;

/**
 * Encryption params for GetEntitlements requests.
 * @typedef {{
 *   encryptedDocumentKey: string,
 * }}
 */
exports.GetEntitlementsParamsInternalDef = GetEntitlementsParamsInternalDef;
let GetEntitlementsEncryptionParams;

/**
 * Metering params for GetEntitlements requests to SwG Client.
 * swg-js constructs objects of this type, but publisher JS won't.
 * @typedef {{
 *   clientTypes: (undefined|!Array<number>),
 *   owner: (undefined|string),
 *   state: (undefined|{
 *     id: string,
 *     attributes: !Array<{
 *       name: string,
 *       timestamp: number,
 *     }>,
 *   }),
 *   token: (undefined|string),
 *   resource: {
 *     hashedCanonicalUrl: string,
 *   },
 * }}
 */
exports.GetEntitlementsEncryptionParams = GetEntitlementsEncryptionParams;
let GetEntitlementsMeteringParamsInternal;

/**
 * Params for `getEntitlements` calls from publisher JS.
 * swg-js converts objects of this type to GetEntitlementsParamsInternal.
 * @typedef {{
 *   encryption: (!GetEntitlementsEncryptionParams|undefined),
 *   metering: (!GetEntitlementsMeteringParamsExternal|undefined),
 *   publisherProvidedId: (string|undefined),
 * }}
 */
exports.GetEntitlementsMeteringParamsInternal = GetEntitlementsMeteringParamsInternal;
let GetEntitlementsParamsExternalDef;

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
let GetEntitlementsMeteringParamsExternal;

/**
 * @enum {number}
 */
exports.GetEntitlementsMeteringParamsExternal = GetEntitlementsMeteringParamsExternal;
const AnalyticsMode = {
  DEFAULT: 0,
  IMPRESSIONS: 1
};

/**
 * @enum {string}
 */
exports.AnalyticsMode = AnalyticsMode;
const WindowOpenMode = {
  AUTO: 'auto',
  REDIRECT: 'redirect'
};

/**
 * @enum {string}
 */
exports.WindowOpenMode = WindowOpenMode;
const ReplaceSkuProrationMode = {
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
const ProductType = {
  SUBSCRIPTION: 'SUBSCRIPTION',
  UI_CONTRIBUTION: 'UI_CONTRIBUTION',
  VIRTUAL_GIFT: 'VIRTUAL_GIFT'
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
 *   order is preserved. Required if oldSku is specified (to indicate which
 *   SKUs the user can upgrade or downgrade to).
 * - list - a predefined list of SKUs. Use of this property is uncommon.
 *   Possible values are "default" and "amp". Default is "default".
 * - isClosable - a boolean value to determine whether the view is closable.
 * - oldSku - Optional. The SKU to replace. For example, if a user wants to
 *   upgrade or downgrade their current subscription.
 *
 * @typedef {{
 *   skus: (!Array<string>|undefined),
 *   list: (string|undefined),
 *   isClosable: (boolean|undefined),
 *   oldSku: (string|undefined),
 * }}
 */
let OffersRequest;

/**
 * @typedef {{
 *   linkRequested: boolean,
 * }}
 */
exports.OffersRequest = OffersRequest;
let LoginRequest;

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
let SaveSubscriptionRequest;

/**
 * Callback for retrieving subscription request
 *
 * @typedef {function():(!Promise<SaveSubscriptionRequest> | !SaveSubscriptionRequest)} SaveSubscriptionRequestCallback
 */
exports.SaveSubscriptionRequest = SaveSubscriptionRequest;
let SaveSubscriptionRequestCallback;

/**
 * Properties:
 * - lang: Sets the button SVG and title. Default is "en".
 * - theme: "light" or "dark". Default is "light".
 * - disable: whether to grey out the button.
 *
 * @typedef {{
 *   theme: (string|undefined),
 *   lang: (string|undefined),
 *   disable: (boolean|undefined),
 * }}
 */
exports.SaveSubscriptionRequestCallback = SaveSubscriptionRequestCallback;
let ButtonOptions;

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
let SmartButtonOptions;

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
let SubscriptionRequest;
exports.SubscriptionRequest = SubscriptionRequest;

},{"./client-event-manager-api":5,"./deferred-account-creation":6,"./entitlements":7,"./logger-api":8,"./offer":10,"./propensity-api":11,"./subscribe-response":12}],14:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.UserData = void 0;
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
class UserData {
  /**
   * @param {string} idToken
   * @param {!Object} data
   */
  constructor(idToken, data) {
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
  clone() {
    return new UserData(this.idToken, this.data);
  }

  /**
   * @return {!Object}
   */
  json() {
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
}
exports.UserData = UserData;

},{}],15:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ActivityPorts = exports.ActivityPortDef = exports.ActivityPort = exports.ActivityIframePort = void 0;
var _api_messages = require("../proto/api_messages");
var _constants = require("../utils/constants");
var _url = require("../utils/url");
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

const {
  ActivityIframePort: WebActivityIframePort,
  ActivityPorts: WebActivityPorts
} = require('web-activities/activity-ports');

/**
 * @interface
 */
class ActivityPortDef {
  /**
   * @return {!Promise<!web-activities/activity-ports.ActivityResult>}
   */
  acceptResult() {}
}
/**
 * @interface
 */
exports.ActivityPortDef = ActivityPortDef;
class ActivityPort extends ActivityPortDef {
  /**
   * Returns the mode of the activity: iframe, popup or redirect.
   * @return {!web-activities/activity-ports.ActivityMode}
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
   * @return {!Promise<!web-activities/activity-ports.ActivityResult>}
   * @override
   */
  acceptResult() {}

  /**
   * Returns a promise that yields when the iframe is ready to be interacted
   * with.
   * @return {!Promise}
   */
  whenReady() {}

  /**
   * Waits until the activity port is connected to the host.
   * @return {!Promise}
   */
  connect() {}

  /**
   * Disconnect the activity binding and cleanup listeners.
   */
  disconnect() {}

  /**
   * Register a callback to handle resize requests. Once successfully resized,
   * ensure to call `resized()` method.
   * @param {function(number)} unusedCallback
   */
  onResizeRequest(unusedCallback) {}

  /**
   * @param {!../proto/api_messages.Message} unusedRequest
   */
  execute(unusedRequest) {}

  /**
   * @param {!function(new: T)} unusedMessage
   * @param {function(Object)} unusedCallback
   * @template T
   */
  on(unusedMessage, unusedCallback) {}

  /**
   * Signals back to the activity implementation that the client has updated
   * the activity's size.
   */
  resized() {}
}
/**
 * @implements {ActivityPortDef}
 */
exports.ActivityPort = ActivityPort;
class ActivityPortDeprecated {
  /**
   * @param {!web-activities/activity-ports.ActivityPort} port
   */
  constructor(port) {
    /** @private @const {!web-activities/activity-ports.ActivityPort} */
    this.port_ = port;
  }

  /**
   * @return {!Promise<!web-activities/activity-ports.ActivityResult>}
   */
  acceptResult() {
    return this.port_.acceptResult();
  }
}

/**
 * @implements {ActivityPortDef}
 */
class ActivityIframePort {
  /**
   * @param {!HTMLIFrameElement} iframe
   * @param {string} url
   * @param {!../runtime/deps.DepsDef} deps
   * @param {?Object=} args
   */
  constructor(iframe, url, deps, args) {
    /** @private @const {!web-activities/activity-ports.ActivityIframePort} */
    this.iframePort_ = new WebActivityIframePort(iframe, url, args);
    /** @private @const {!Object<string, function(!../proto/api_messages.Message)>} */
    this.callbackMap_ = {};

    /** @private @const {../runtime/deps.DepsDef} */
    this.deps_ = deps;
  }

  /**
   * Returns a promise that yields when the iframe is ready to be interacted
   * with.
   * @return {!Promise}
   */
  whenReady() {
    return this.iframePort_.whenReady();
  }

  /**
   * Waits until the activity port is connected to the host.
   * @return {!Promise}
   */
  connect() {
    return this.iframePort_.connect().then(() => {
      // Attach a callback to receive messages after connection complete
      this.iframePort_.onMessage(data => {
        const response = data && data['RESPONSE'];
        if (!response) {
          return;
        }
        const cb = this.callbackMap_[response[0]];
        if (cb) {
          cb((0, _api_messages.deserialize)(response));
        }
      });
      if (this.deps_ && this.deps_.eventManager()) {
        this.on(_api_messages.AnalyticsRequest, request => {
          const analyticsRequest = /** @type {AnalyticsRequest} */request;
          this.deps_.eventManager().logEvent({
            eventType: analyticsRequest.getEvent(),
            eventOriginator: _api_messages.EventOriginator.SWG_SERVER,
            isFromUserAction: analyticsRequest.getMeta().getIsFromUserAction(),
            additionalParameters: analyticsRequest.getParams()
          });
        });
      }
    });
  }

  /**
   * Disconnect the activity binding and cleanup listeners.
   */
  disconnect() {
    this.iframePort_.disconnect();
  }

  /**
   * Returns the mode of the activity: iframe, popup or redirect.
   * @return {!web-activities/activity-ports.ActivityMode}
   */
  getMode() {
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
  acceptResult() {
    return this.iframePort_.acceptResult();
  }

  /**
   * Register a callback to handle resize requests. Once successfully resized,
   * ensure to call `resized()` method.
   * @param {function(number)} callback
   */
  onResizeRequest(callback) {
    return this.iframePort_.onResizeRequest(callback);
  }

  /**
   * @param {!../proto/api_messages.Message} request
   */
  execute(request) {
    this.iframePort_.message({
      'REQUEST': request.toArray()
    });
  }

  /**
   * @param {!function(new: T)} message
   * @param {function(?)} callback
   * @template T
   */
  on(message, callback) {
    let label = null;
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
  resized() {
    this.iframePort_.resized();
  }
}
exports.ActivityIframePort = ActivityIframePort;
class ActivityPorts {
  /**
   * @param {!../runtime/deps.DepsDef} deps
   */
  constructor(deps) {
    /** @private @const {!../runtime/deps.DepsDef} */
    this.deps_ = deps;

    /** @private @const {!web-activities/activity-ports.ActivityPorts} */
    this.activityPorts_ = new WebActivityPorts(deps.win());
  }

  /**
   * Adds client version, publication, product and logging context information.
   * @param {?Object=} args
   * @return {!Object}
   */
  addDefaultArguments(args) {
    const deps = this.deps_;
    const pageConfig = deps.pageConfig();
    const context = deps.analytics().getContext();
    return Object.assign({
      'analyticsContext': context.toArray(),
      'publicationId': pageConfig.getPublicationId(),
      'productId': pageConfig.getProductId(),
      '_client': 'SwG 0.1.22-1667857131354',
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
  openActivityIframePort_(iframe, url, args) {
    const activityPort = new ActivityIframePort(iframe, url, this.deps_, args);
    return activityPort.connect().then(() => activityPort);
  }

  /**
   * Start an activity within the specified iframe.
   * @param {!HTMLIFrameElement} iframe
   * @param {string} url
   * @param {?Object=} args
   * @param {boolean=} addDefaultArguments
   * @return {!Promise<!ActivityIframePort>}
   */
  openIframe(iframe, url, args) {
    let addDefaultArguments = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;
    if (addDefaultArguments) {
      args = this.addDefaultArguments(args);
    }
    return this.deps_.storage().get(_constants.Constants.USER_TOKEN, /* useLocalStorage= */true).then(swgUserToken => {
      const queryParams = new URL(url).searchParams;
      if (swgUserToken && !queryParams.has('sut')) {
        url = (0, _url.addQueryParam)(url, 'sut', swgUserToken);
      }
      const pubId = this.deps_.pageConfig().getPublicationId();
      if (pubId && !queryParams.has('publicationId')) {
        url = (0, _url.addQueryParam)(url, 'publicationId', pubId);
      }
      return this.openActivityIframePort_(iframe, url, args);
    });
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
  open(requestId, url, target, args, options) {
    let addDefaultArguments = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : false;
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
  onResult(requestId, callback) {
    this.activityPorts_.onResult(requestId, port => {
      callback(new ActivityPortDeprecated(port));
    });
  }

  /**
   * @param {function(!Error)} handler
   */
  onRedirectError(handler) {
    this.activityPorts_.onRedirectError(handler);
  }

  /**
   * @return {!web-activities/activity-ports.ActivityPorts}
   */
  getOriginalWebActivityPorts() {
    return this.activityPorts_;
  }
}
exports.ActivityPorts = ActivityPorts;

},{"../proto/api_messages":30,"../utils/constants":68,"../utils/url":85,"web-activities/activity-ports":3}],16:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DialogManager = void 0;
var _dialog = require("./dialog");
var _graypane = require("./graypane");
var _errors = require("../utils/errors");
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

const POPUP_Z_INDEX = 2147483647;

/**
 * The class for the top level dialog.
 * @final
 */
class DialogManager {
  /**
   * @param {!../model/doc.Doc} doc
   */
  constructor(doc) {
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
    this.popupGraypane_.getElement().addEventListener('click', () => {
      if (this.popupWin_) {
        try {
          this.popupWin_.focus();
        } catch (e) {
          // Ignore error.
        }
      }
    });
  }

  /**
   * @param {boolean=} hidden
   * @param {!./dialog.DialogConfig=} dialogConfig Configuration options for the
   *     dialog.
   * @return {!Promise<!Dialog>}
   */
  openDialog() {
    let hidden = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
    let dialogConfig = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    if (!this.openPromise_) {
      this.dialog_ = new _dialog.Dialog(this.doc_, /* importantStyles */{}, /* styles */{}, dialogConfig);
      this.openPromise_ = this.dialog_.open(hidden);
    }
    return this.openPromise_;
  }

  /**
   * @param {!./view.View} view
   * @param {boolean=} hidden
   * @param {!./dialog.DialogConfig=} dialogConfig Configuration options for the
   *    dialog.
   * @return {!Promise}
   */
  openView(view) {
    let hidden = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
    let dialogConfig = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
    this.handleCancellations(view);
    return this.openDialog(hidden, dialogConfig).then(dialog => {
      return dialog.openView(view);
    });
  }

  /**
   * Handles cancellations (ex: user clicks close button on dialog).
   * @param {!./view.View} view
   * @return {!Promise}
   */
  handleCancellations(view) {
    return view.whenComplete().catch(reason => {
      if ((0, _errors.isCancelError)(reason)) {
        this.completeView(view);
      }
      throw reason;
    });
  }

  /**
   * @param {?./view.View} view
   */
  completeView(view) {
    // Give a small amount of time for another view to take over the dialog.
    setTimeout(() => {
      if (this.dialog_ && this.dialog_.getCurrentView() == view) {
        this.close_();
      }
    }, 100);
  }

  /**
   */
  completeAll() {
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
  getDialog() {
    return this.dialog_;
  }

  /** @private */
  close_() {
    this.dialog_.close();
    this.dialog_ = null;
    this.openPromise_ = null;
  }

  /**
   * @param {?Window|undefined} targetWin
   */
  popupOpened(targetWin) {
    this.popupWin_ = targetWin || null;
    if (!this.popupGraypane_.isAttached()) {
      this.popupGraypane_.attach();
    }
    this.popupGraypane_.show();
  }

  /**
   */
  popupClosed() {
    this.popupWin_ = null;
    try {
      this.popupGraypane_.hide();
    } catch (e) {
      // Ignore.
    }
  }
}
exports.DialogManager = DialogManager;

},{"../utils/errors":73,"./dialog":17,"./graypane":19}],17:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DialogConfig = exports.Dialog = exports.DesktopDialogConfig = void 0;
var _ui = require("../../build/css/ui/ui.css");
var _friendlyIframe = require("./friendly-iframe");
var _graypane = require("./graypane");
var _loadingView = require("../ui/loading-view");
var _dom = require("../utils/dom");
var _doc = require("../model/doc");
var _style = require("../utils/style");
var _animation = require("../utils/animation");
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

const Z_INDEX = 2147483647;

/**
 * Default iframe important styles.
 * Note: The iframe responsiveness media query style is injected in the
 * publisher's page since style attribute can not include media query.
 * @const {!Object<string, string|number>}
 */
const rootElementImportantStyles = {
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
const resetViewStyles = {
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
 * Display configration options for dialogs.
 *
 * Properties:
 * - desktopConfig: Options for dialogs on desktop screens.
 * - maxAllowedHeightRatio: The max allowed height of the view as a ratio of the
 *       viewport height.
 * - iframeCssClassOverride: The CSS class to use for the iframe, overriding
 *       default classes such as swg-dialog.
 * - shouldDisableBodyScrolling: Whether to disable scrolling on the content page
 *       when the dialog is visible.
 *
 * @typedef {{
 *   desktopConfig: (DesktopDialogConfig|undefined),
 *   maxAllowedHeightRatio: (number|undefined),
 *   iframeCssClassOverride: (string|undefined),
 *   shouldDisableBodyScrolling: (boolean|undefined),
 * }}
 */
let DialogConfig;

/**
 * Display configuration options for dialogs on desktop screens.
 *
 * Properties:
 * - isCenterPositioned: Whether the dialog should be positioned at the center
 *       of the viewport rather than at the bottom on desktop screens.
 * - supportsWideScreen: Whether the dialog supports a 808px width on viewports
 *       that are >= 870px wide.
 *
 * @typedef {{
 *   isCenterPositioned: (boolean|undefined),
 *   supportsWideScreen: (boolean|undefined),
 * }}
 */
exports.DialogConfig = DialogConfig;
let DesktopDialogConfig;

/**
 * The class for the top level dialog.
 * @final
 */
exports.DesktopDialogConfig = DesktopDialogConfig;
class Dialog {
  /**
   * Create a dialog for the provided doc.
   * @param {!../model/doc.Doc} doc
   * @param {!Object<string, string|number>=} importantStyles
   * @param {!Object<string, string|number>=} styles
   * @param {!DialogConfig=} dialogConfig Configuration options for the dialog.
   */
  constructor(doc) {
    let importantStyles = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    let styles = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
    let dialogConfig = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};
    /** @private @const {!../model/doc.Doc} */
    this.doc_ = doc;
    const desktopDialogConfig = dialogConfig.desktopConfig || {};
    const supportsWideScreen = !!desktopDialogConfig.supportsWideScreen;
    const defaultIframeCssClass = `swg-dialog ${supportsWideScreen ? 'swg-wide-dialog' : ''}`;
    const iframeCssClass = dialogConfig.iframeCssClassOverride || defaultIframeCssClass;

    /** @private @const {!FriendlyIframe} */
    this.iframe_ = new _friendlyIframe.FriendlyIframe(doc.getWin().document, {
      'class': iframeCssClass
    });

    /** @private @const {!Graypane} */
    this.graypane_ = new _graypane.Graypane(doc, Z_INDEX - 1);
    const modifiedImportantStyles = Object.assign({}, rootElementImportantStyles, importantStyles);
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

    /**
     * Helps identify stale animations.
     * @private {number}
     */
    this.animationNumber_ = 0;

    /** @private {boolean} */
    this.hidden_ = false;

    /** @private {?./view.View} */
    this.previousProgressView_ = null;

    /** @const @private {number} */
    this.maxAllowedHeightRatio_ = dialogConfig.maxAllowedHeightRatio !== undefined ? dialogConfig.maxAllowedHeightRatio : 0.9;

    /** @const @private {boolean} */
    this.positionCenterOnDesktop_ = !!desktopDialogConfig.isCenterPositioned;

    /** @const @private {boolean} */
    this.shouldDisableBodyScrolling_ = !!dialogConfig.shouldDisableBodyScrolling;

    /** @const @private {!MediaQueryList} */
    this.desktopMediaQuery_ = this.doc_.getWin().matchMedia('(min-width: 641px)');

    /**
     * Reference to the listener that acts on changes to desktopMediaQuery.
     * @private {?function()}
     */
    this.desktopMediaQueryListener_ = null;
  }

  /**
   * Opens the dialog and builds the iframe container.
   * @param {boolean=} hidden
   * @return {!Promise<!Dialog>}
   */
  open() {
    let hidden = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
    const iframe = this.iframe_;
    if (iframe.isConnected()) {
      throw new Error('already opened');
    }

    // Attach.
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
    return iframe.whenReady().then(() => {
      this.buildIframe_();
      return this;
    });
  }

  /**
   * Opens the iframe embedded in the given container element.
   * @param {!Element} containerEl
   */
  openInContainer(containerEl) {
    const iframe = this.iframe_;
    if (iframe.isConnected()) {
      throw new Error('already opened');
    }
    containerEl.appendChild(iframe.getElement());
    return iframe.whenReady().then(() => {
      this.buildIframe_();
      return this;
    });
  }

  /**
   * Build the iframe with the styling after iframe is loaded.
   * @private
   */
  buildIframe_() {
    const iframe = this.iframe_;
    const iframeBody = iframe.getBody();
    const iframeDoc = /** @type {!HTMLDocument} */this.iframe_.getDocument();

    // Inject Google fonts in <HEAD> section of the iframe.
    (0, _dom.injectStyleSheet)((0, _doc.resolveDoc)(iframeDoc), _ui.CSS);

    // Add Loading indicator.
    const loadingViewClasses = [];
    if (this.isPositionCenterOnDesktop()) {
      loadingViewClasses.push('centered-on-desktop');
    }
    this.loadingView_ = new _loadingView.LoadingView(iframeDoc, {
      additionalClasses: loadingViewClasses
    });
    iframeBody.appendChild(this.loadingView_.getElement());

    // Container for all dynamic content, including 3P iframe.
    this.container_ = (0, _dom.createElement)(iframeDoc, 'swg-container', {});
    iframeBody.appendChild(this.container_);
    this.setPosition_();

    // Add listener to adjust position when crossing a media query breakpoint.
    if (this.positionCenterOnDesktop_) {
      this.desktopMediaQueryListener_ = () => {
        this.setPosition_();
      };
      this.desktopMediaQuery_.addListener(this.desktopMediaQueryListener_);
    }
  }

  /**
   * Closes the dialog.
   * @param {boolean=} animated
   * @return {!Promise}
   */
  close() {
    let animated = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;
    let animating;
    if (animated) {
      const transitionStyles = this.shouldPositionCenter_() ? {
        'opacity': 0
      } : {
        'transform': 'translateY(100%)'
      };
      animating = this.animate_(() => {
        this.graypane_.hide( /* animate */true);
        return (0, _animation.transition)(this.getElement(), transitionStyles, 300, 'ease-out');
      });
    } else {
      animating = Promise.resolve();
    }
    this.doc_.getBody().classList.remove('swg-disable-scroll');
    return animating.then(() => {
      const iframeEl = this.iframe_.getElement();
      iframeEl.parentNode.removeChild(iframeEl);
      this.removePaddingToHtml_();
      this.graypane_.destroy();
      if (this.desktopMediaQueryListener_) {
        this.desktopMediaQuery_.removeListener(this.desktopMediaQueryListener_);
      }
    });
  }

  /**
   * Gets the container within the dialog.
   * @return {!Element}
   */
  getContainer() {
    if (!this.container_) {
      throw new Error('not opened yet');
    }
    return this.container_;
  }

  /**
   * Gets the attached iframe instance.
   * @return {!FriendlyIframe}
   */
  getIframe() {
    return this.iframe_;
  }

  /**
   * Gets the Iframe element.
   * @return {!HTMLIFrameElement}
   */
  getElement() {
    return this.iframe_.getElement();
  }

  /**
   * Gets the LoadingView for this dialog.
   * @return {LoadingView}
   */
  getLoadingView() {
    return this.loadingView_;
  }

  /**
   * Returns the max allowed height of the view as a ratio of viewport height.
   * @return {number}
   */
  getMaxAllowedHeightRatio() {
    return this.maxAllowedHeightRatio_;
  }

  /**
   * Returns whether the dialog is center-positioned on desktop screens.
   * @return {boolean}
   */
  isPositionCenterOnDesktop() {
    return this.positionCenterOnDesktop_;
  }

  /**
   * Transitions to the next view.
   * @private
   */
  entryTransitionToNextView_() {
    if (this.view_ && this.view_.hasLoadingIndicator()) {
      // Temporarily cache the old view.
      this.previousProgressView_ = this.view_;
    } else {
      // Since loading indicator will be shown, remove contents of old view.
      (0, _dom.removeChildren)(this.getContainer());
      // When loading indicator was not displayed in the previous view,
      // loading indicator must be displayed while transitioning to new view.
      this.loadingView_.show();
    }
  }

  /**
   * Transition out of an old view.
   * @private
   */
  exitTransitionFromOldView_() {
    // If previous view is still around, remove it.
    if (this.previousProgressView_) {
      (0, _dom.removeElement)(this.previousProgressView_.getElement());
      this.previousProgressView_ = null;
    } else {
      this.loadingView_.hide();
    }
  }

  /** @return {?./view.View} */
  getCurrentView() {
    return this.view_;
  }

  /**
   * Opens the given view and removes existing view from the DOM if any.
   * @param {!./view.View} view
   * @return {!Promise}
   */
  openView(view) {
    (0, _style.setImportantStyles)(view.getElement(), resetViewStyles);
    this.entryTransitionToNextView_();
    this.view_ = view;
    this.getContainer().appendChild(view.getElement());
    if (this.shouldDisableBodyScrolling_) {
      this.doc_.getBody().classList.add('swg-disable-scroll');
    }

    // If the current view should fade the parent document.
    if (view.shouldFadeBody() && !this.hidden_) {
      this.graypane_.show( /* animate */true);
    }
    return view.init(this).then(() => {
      (0, _style.setImportantStyles)(view.getElement(), {
        'opacity': 1
      });
      if (this.hidden_) {
        if (view.shouldFadeBody()) {
          this.graypane_.show( /* animated */true);
        }
        this.show_();
      }
      this.exitTransitionFromOldView_();
    });
  }

  /**
   * Show the iframe.
   * @private
   */
  show_() {
    this.animate_(() => {
      (0, _style.setImportantStyles)(this.getElement(), {
        'transform': 'translateY(100%)',
        'opactiy': 1,
        'visibility': 'visible'
      });
      return (0, _animation.transition)(this.getElement(), {
        'transform': this.getDefaultTranslateY_(),
        'opacity': 1,
        'visibility': 'visible'
      }, 300, 'ease-out').then(() => {
        // Focus the dialog contents, per WAI-ARIA best practices.
        this.getElement().focus();
      });
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
  resizeView(view, height) {
    let animated = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;
    if (this.view_ != view) {
      return null;
    }
    const newHeight = this.getMaxAllowedHeight_(height);

    // Uniquely identify this animation.
    // This lets callbacks abandon stale animations.
    const animationNumber = ++this.animationNumber_;
    const isStale = () => {
      return animationNumber !== this.animationNumber_;
    };
    let animating;
    if (animated) {
      const oldHeight = this.getElement().offsetHeight;
      if (newHeight >= oldHeight) {
        // Expand.
        animating = this.animate_(() => {
          if (isStale()) {
            return Promise.resolve();
          }
          const immediateStyles = {
            'height': `${newHeight}px`
          };
          if (!this.shouldPositionCenter_()) {
            immediateStyles['transform'] = `translateY(${newHeight - oldHeight}px)`;
          }
          (0, _style.setImportantStyles)(this.getElement(), immediateStyles);
          return (0, _animation.transition)(this.getElement(), {
            'transform': this.getDefaultTranslateY_()
          }, 300, 'ease-out');
        });
      } else {
        // Collapse.
        animating = this.animate_(() => {
          const transitionPromise = isStale() ? Promise.resolve() : (0, _animation.transition)(this.getElement(), {
            'transform': this.shouldPositionCenter_() ? this.getDefaultTranslateY_() : `translateY(${oldHeight - newHeight}px)`
          }, 300, 'ease-out');
          return transitionPromise.then(() => {
            if (isStale()) {
              return;
            }
            (0, _style.setImportantStyles)(this.getElement(), {
              'height': `${newHeight}px`,
              'transform': this.getDefaultTranslateY_()
            });
          });
        });
      }
    } else {
      (0, _style.setImportantStyles)(this.getElement(), {
        'height': `${newHeight}px`
      });
      animating = Promise.resolve();
    }
    return animating.then(() => {
      if (isStale()) {
        return;
      }
      this.updatePaddingToHtml_(height);
      view.resized();
    });
  }

  /**
   * @param {function():!Promise} callback
   * @return {!Promise}
   * @private
   */
  animate_(callback) {
    const wait = this.animating_ || Promise.resolve();
    return this.animating_ = wait.then(() => {
      return callback();
    }, () => {
      // Ignore errors to make sure animations don't get stuck.
    }).then(() => {
      this.animating_ = null;
    });
  }

  /**
   * Returns maximum allowed height for current viewport.
   * @param {number} height
   * @return {number}
   * @private
   */
  getMaxAllowedHeight_(height) {
    return Math.min(height, this.doc_.getWin(). /*OK*/innerHeight * this.maxAllowedHeightRatio_);
  }

  /**
   * Update padding-bottom on the containing page to not hide any content
   * behind the popup, if rendered at the bottom. For centered dialogs, there
   * should be no added padding.
   * @param {number} newHeight
   * @private
   */
  updatePaddingToHtml_(newHeight) {
    if (this.shouldPositionCenter_()) {
      // For centered dialogs, there should be no bottom padding.
      this.removePaddingToHtml_();
      return;
    }
    const bottomPadding = newHeight + 20; // Add some extra padding.
    const htmlElement = this.doc_.getRootElement();
    (0, _style.setImportantStyles)(htmlElement, {
      'padding-bottom': `${bottomPadding}px`
    });
  }

  /**
   * Removes previouly added bottom padding from the document.
   * @private
   */
  removePaddingToHtml_() {
    this.doc_.getRootElement().style.removeProperty('padding-bottom');
  }

  /**
   * Sets the position of the dialog. Currently only supports 'BOTTOM', with
   * an option of switching to 'CENTER' on desktop screens.
   */
  setPosition_() {
    (0, _style.setImportantStyles)(this.getElement(), this.getPositionStyle_());
  }

  /**
   * Returns whether or not the dialog should have position 'CENTER'.
   * @return {boolean}
   * @private
   */
  shouldPositionCenter_() {
    return this.positionCenterOnDesktop_ && this.desktopMediaQuery_.matches;
  }

  /**
   * Returns the styles required to postion the dialog.
   * @return {!Object<string, string|number>}
   * @private
   */
  getPositionStyle_() {
    if (this.shouldPositionCenter_()) {
      return {
        'top': '50%',
        'bottom': 0,
        'transform': this.getDefaultTranslateY_()
      };
    }
    return {
      'top': 'auto',
      'bottom': 0,
      'transform': this.getDefaultTranslateY_()
    };
  }

  /**
   * Returns default translateY style for the dialog.
   * @return {string}
   * @private
   */
  getDefaultTranslateY_() {
    if (this.shouldPositionCenter_()) {
      return 'translateY(-50%)';
    }
    return 'translateY(0px)';
  }
}
exports.Dialog = Dialog;

},{"../../build/css/ui/ui.css":2,"../model/doc":27,"../ui/loading-view":63,"../utils/animation":66,"../utils/dom":71,"../utils/style":83,"./friendly-iframe":18,"./graypane":19}],18:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FriendlyIframe = void 0;
var _dom = require("../utils/dom");
var _style = require("../utils/style");
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

/** @const {!Object<string|number>} */
const friendlyIframeAttributes = {
  'frameborder': 0,
  'scrolling': 'no',
  'src': 'about:blank'
};

/**
 * The class for building friendly iframe.
 */
class FriendlyIframe {
  /**
   * @param {!Document} doc
   * @param {!Object<string, string|number>=} attrs
   */
  constructor(doc) {
    let attrs = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    const mergedAttrs = Object.assign({}, friendlyIframeAttributes, attrs);

    /** @private @const {!HTMLIFrameElement} */
    this.iframe_ = /** @type {!HTMLIFrameElement} */
    (0, _dom.createElement)(doc, 'iframe', mergedAttrs);

    // Ensure that the new iframe does not inherit any CSS styles.
    (0, _style.resetAllStyles)(this.iframe_);

    /** @private @const {!Promise} */
    this.ready_ = new Promise(resolve => {
      this.iframe_.onload = resolve;
    });
  }

  /**
   * When promise is resolved.
   * @return {!Promise}
   */
  whenReady() {
    return this.ready_;
  }

  /**
   * Gets the iframe element.
   * @return {!HTMLIFrameElement}
   */
  getElement() {
    return this.iframe_;
  }

  /**
   * Gets the document object of the iframe element.
   * @return {!Document}
   */
  getDocument() {
    const doc = this.getElement().contentDocument || this.getElement().contentWindow && this.getElement().contentWindow.document;
    if (!doc) {
      throw new Error('not loaded');
    }
    return doc;
  }

  /**
   * Gets the body of the iframe.
   * @return {!Element}
   */
  getBody() {
    return (/** @type {!Element} */this.getDocument().body
    );
  }

  /**
   * Whether the iframe is connected.
   * @return {boolean}
   */
  isConnected() {
    return (0, _dom.isConnected)(this.getElement());
  }
}
exports.FriendlyIframe = FriendlyIframe;

},{"../utils/dom":71,"../utils/style":83}],19:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Graypane = void 0;
var _style = require("../utils/style");
var _animation = require("../utils/animation");
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

class Graypane {
  /**
   * @param {!../model/doc.Doc} doc
   * @param {number} zIndex
   */
  constructor(doc, zIndex) {
    /** @private @const {!../model/doc.Doc} */
    this.doc_ = doc;

    /** @private @const {!Element} */
    this.fadeBackground_ = this.doc_.getWin().document.createElement('swg-popup-background');
    (0, _style.setImportantStyles)(this.fadeBackground_, {
      'z-index': zIndex,
      'display': 'none',
      'pointer-events': 'none',
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
  getElement() {
    return this.fadeBackground_;
  }

  /**
   * @return {boolean}
   */
  isAttached() {
    return !!this.fadeBackground_.parentNode;
  }

  /**
   * Attaches the graypane to the document.
   */
  attach() {
    this.doc_.getBody().appendChild(this.fadeBackground_);
  }

  /**
   * Detaches the graypane to the document.
   */
  destroy() {
    this.doc_.getBody().removeChild(this.fadeBackground_);
  }

  /**
   * Shows the graypane.
   * @param {boolean=} animated
   * @return {!Promise|undefined}
   */
  show() {
    let animated = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;
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
  hide() {
    let animated = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;
    if (animated) {
      return (0, _animation.transition)(this.fadeBackground_, {
        'opacity': 0
      }, 300, 'ease-out').then(() => {
        (0, _style.setImportantStyles)(this.fadeBackground_, {
          'display': 'none'
        });
      });
    }
    (0, _style.setImportantStyles)(this.fadeBackground_, {
      'display': 'none'
    });
  }
}
exports.Graypane = Graypane;

},{"../utils/animation":66,"../utils/style":83}],20:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.View = void 0;
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
class View {
  /**
   * Empty constructor.
   */
  constructor() {}

  /**
   * Gets the iframe element.
   * @return {!Element}
   * @abstract
   */
  getElement() {}

  /**
   * @param {!./dialog.Dialog} unusedDialog
   * @return {!Promise}
   * @abstract
   */
  init(unusedDialog) {}

  /**
   * Resizes the content.
   */
  resized() {
    // Do nothing by default. Override if needed.
  }

  /**
   * Accept the result.
   * @return {!Promise}
   * @abstract
   */
  whenComplete() {}

  /**
   * @return {boolean}
   * @abstract
   */
  shouldFadeBody() {}

  /**
   * @return {boolean}
   * @abstract
   */
  hasLoadingIndicator() {}
}
exports.View = View;

},{}],21:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.I18N_STRINGS = void 0;
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

// NOTE: Please don't edit this file directly!
//   This document describes how to change i18n strings in swg-js: https://docs.google.com/document/d/1FMEKJ_TmjHhqON0krE4xhDbTEj0I0DnvzxMzB2cWUWA/edit?resourcekey=0-TQ7hPOzAD4hX8x9PfweGSg#heading=h.q9gi7t4h1tyj

const I18N_STRINGS = {
  'SHOWCASE_REGWALL_TITLE': {
    'bg': 'Получавайте повече с Google',
    'bn': 'Google-এ আরও অনেক কিছুর সুবিধা পান',
    'cs': 'Získejte s&nbsp;Googlem víc',
    'da': 'Få adgang til mere med Google',
    'de': 'Immer gut informiert mit Google',
    'el': 'Αποκτήστε περισσότερα με την Google',
    'en': 'Get more with Google',
    'es': 'Disfruta de más artículos con Google',
    'es-419': 'Disfruta más artículos con Google',
    'es-ar': 'Disfruta más artículos con Google',
    'fr': 'Plus de contenus avec Google',
    'fr-ca': 'Aller plus loin avec Google',
    'hi': 'Google की मदद से ज़्यादा मुफ़्त लेख पाएं',
    'it': 'Con Google puoi avere di più',
    'ja': 'Google からのプレゼント',
    'kn': 'Google ನಿಂದ ಹೆಚ್ಚಿನ ಪ್ರಯೋಜನ ಪಡೆಯಿರಿ',
    'lt': 'Gaukite daugiau su „Google“',
    'lv': 'Iegūstiet vairāk ar Google',
    'ml': 'Google ഉപയോഗിച്ച് കൂടുതൽ പ്രയോജനങ്ങൾ നേടൂ',
    'mr': 'Google वापरून बरेच काही मिळवा',
    'nl': 'Krijg meer met Google',
    'pl': 'Z&nbsp;Google dostajesz więcej',
    'pt-br': 'Veja mais com o Google',
    'pt-pt': 'Obtenha mais com a Google',
    'ro': 'Mai multe beneficii cu Google',
    'sk': 'Získajte viac s&nbsp;Googlom',
    'sl': 'Izkoristite več z Googlom',
    'sv': 'Få mer med Google',
    'ta': 'Google மூலம் மேலும் பல கட்டுரைகளைப் படியுங்கள்',
    'te': 'Googleతో మరిన్ని ప్రయోజనాలను పొందండి'
  },
  'SHOWCASE_REGWALL_DESCRIPTION': {
    'bg': '<strong></strong>За съдържанието обикновено се изисква плащане, но Google ви дава достъп без парично заплащане до тази и други статии, когато се регистрирате за <ph name="PUBLICATION"><ex>AP News</ex>{publication}</ph> с профила си в Google.',
    'bn': '<strong></strong>এই কন্টেন্ট অ্যাক্সেস করার জন্য সাধারণত পেমেন্ট করতে হয় কিন্তু Google আপনাকে এই নিবন্ধ ফ্রিতে অ্যাক্সেস করতে এবং সেইসাথে অনেক কিছু পেতে সাহায্য করছে। এই সুবিধা পাওয়ার জন্য Google অ্যাকাউন্ট ব্যবহার করে আপনাকে <ph name="PUBLICATION"><ex>AP News</ex>{publication}</ph>-এ রেজিস্টার করতে হবে।',
    'cs': '<strong></strong>Tento obsah je obvykle zpoplatněn, ale pokud se do publikace <ph name="PUBLICATION"><ex>AP News</ex>{publication}</ph> zaregistrujete pomocí účtu Google, získáte od Googlu přístup zdarma.',
    'da': '<strong></strong>Du skal normalt betale for at få adgang til dette indhold, men hvis du tilmelder dig <ph name="PUBLICATION"><ex>AP News</ex>{publication}</ph> med din Google-konto, giver Google dig gratis adgang til artiklen og andet indhold.',
    'de': '<strong></strong>Dieser Inhalt ist normalerweise kostenpflichtig. Google gewährt dir jedoch kostenlos Zugriff auf diesen Artikel und andere Inhalte, wenn du dich mit deinem Google-Konto bei <ph name="PUBLICATION"><ex>AP News</ex>{publication}</ph> registrierst.',
    'el': '<strong></strong>Συνήθως απαιτείται πληρωμή για αυτό το περιεχόμενο, αλλά η Google σας προσφέρει πρόσβαση χωρίς χρέωση σε αυτό το άρθρο και σε πολλά ακόμη, εάν εγγραφείτε στην έκδοση <ph name="PUBLICATION"><ex>AP News</ex>{publication}</ph> με χρήση του Λογαριασμού σας Google.',
    'en': '<strong></strong>This content usually requires payment, but Google is giving you free access to this article and more when you register with <ph name="PUBLICATION"><ex>AP News</ex>{publication}</ph> using your Google Account.',
    'es': '<strong></strong>Normalmente, es necesario pagar para ver este contenido, pero Google te ofrece acceso gratuito a este y otros artículos si te registras en <ph name="PUBLICATION"><ex>AP News</ex>{publication}</ph> con tu cuenta de Google.',
    'es-419': '<strong></strong>Normalmente, es necesario pagar para ver este contenido, pero Google te ofrece acceso gratuito a este y otros artículos si te registras en <ph name="PUBLICATION"><ex>AP News</ex>{publication}</ph> con tu Cuenta&nbsp;de&nbsp;Google.',
    'es-ar': '<strong></strong>Normalmente, es necesario pagar para ver este contenido, pero Google te ofrece acceso gratuito a este y otros artículos si te registras en <ph name="PUBLICATION"><ex>AP News</ex>{publication}</ph> con tu Cuenta&nbsp;de&nbsp;Google.',
    'fr': '<strong></strong>Ce contenu est généralement payant, mais vous pouvez lire cet article et d\'autres contenus gratuitement grâce à Google en vous inscrivant sur <ph name="PUBLICATION"><ex>AP News</ex>{publication}</ph> avec votre compte Google.',
    'fr-ca': '<strong></strong>Ce contenu est généralement payant, mais Google vous offre un accès gratuit à cet article et à d\'autres si vous vous inscrivez à <ph name="PUBLICATION"><ex>AP News</ex>{publication}</ph> à l\'aide de votre compte Google.',
    'hi': '<strong></strong>आम तौर पर, इस कॉन्टेंट को पढ़ने के लिए पैसे चुकाने पड़ते हैं. हालांकि, Google की मदद से, इस लेख और अन्य कॉन्टेंट को मुफ़्त में ऐक्सेस किया जा सकता है. इसके लिए, आपको Google खाते का इस्तेमाल करके, <ph name="PUBLICATION"><ex>AP News</ex>{publication}</ph> में रजिस्टर करना होगा.',
    'it': '<strong></strong>Generalmente questi contenuti sono a pagamento, ma Google ti offre accesso gratuito a questo e ad altri articoli se ti registri a <ph name="PUBLICATION"><ex>AP News</ex>{publication}</ph> usando il tuo Account Google.',
    'ja': '<strong></strong>通常、この記事をお読みいただくにはお支払いが必要ですが、お使いの Google アカウントで <ph name="PUBLICATION"><ex>AP News</ex>{publication}</ph> に登録すると、この記事を無料でお読みいただけます。',
    'kn': '<strong></strong>ಸಾಮಾನ್ಯವಾಗಿ ಈ ವಿಷಯಕ್ಕಾಗಿ ಹಣ ಪಾವತಿಸಬೇಕಾಗುತ್ತದೆ, ಆದರೆ ನೀವು <ph name="PUBLICATION"><ex>AP News</ex>{publication}</ph> ಗೆ ನಿಮ್ಮ Google ಖಾತೆಯ ಮೂಲಕ ನೋಂದಾಯಿಸಿಕೊಂಡಾಗ Google ಈ ಲೇಖನ ಮತ್ತು ಇನ್ನಷ್ಟು ವಿಷಯಗಳಿಗೆ ನಿಮಗೆ ಉಚಿತವಾದ ಪ್ರವೇಶವನ್ನು ನೀಡುತ್ತದೆ.',
    'lt': '<strong></strong>Šis turinys paprastai yra mokamas, tačiau „Google“ suteikia jums prieigą prie šio straipsnio ir kt. be papildomo mokesčio, kai užsiregistruojate „<ph name="PUBLICATION"><ex>AP News</ex>{publication}</ph>“ naudodami savo „Google“ paskyrą.',
    'lv': '<strong></strong>Parasti šis ir maksas saturs, taču Google piešķirs jums bezmaksas piekļuvi šim un citiem rakstiem, ja reģistrēsieties izdevumam <ph name="PUBLICATION"><ex>AP News</ex>{publication}</ph> ar savu Google kontu.',
    'ml': '<strong></strong>സാധാരണ ഈ ഉള്ളടക്കത്തിന് പണം നൽകേണ്ടതുണ്ട്, എന്നാൽ Google അക്കൗണ്ട് ഉപയോഗിച്ച് <ph name="PUBLICATION"><ex>AP News</ex>{publication}</ph> എന്നതിൽ രജിസ്‌റ്റർ ചെയ്യുമ്പോൾ, ഈ ലേഖനത്തിലേക്കും മറ്റും Google നിങ്ങൾക്ക് സൗജന്യ ആക്‌സസ് നൽകുന്നു.',
    'mr': '<strong></strong>या आशयासाठी सामान्यतः पेमेंट आवश्यक असते पण तुम्ही तुमचे Google खाते वापरून <ph name="PUBLICATION"><ex>AP News</ex>{publication}</ph> मध्ये नोंदणी करता तेव्हा, Google तुम्हाला या लेखाचा आणि आणखी बऱ्याच आशयाचा विनामूल्य ॲक्सेस देते.',
    'nl': '<strong></strong>Voor deze content moet je eigenlijk betalen. Maar Google geeft je kosteloos toegang tot dit artikel en andere content als je je registreert bij <ph name="PUBLICATION"><ex>AP News</ex>{publication}</ph> via je Google-account.',
    'pl': '<strong></strong>Te treści zazwyczaj wymagają opłaty, ale dzięki Google możesz bezpłatnie przeczytać ten artykuł i&nbsp;korzystać z&nbsp;innych materiałów po zarejestrowaniu się w&nbsp;publikacji <ph name="PUBLICATION"><ex>AP News</ex>{publication}</ph> za pomocą konta Google.',
    'pt-br': '<strong></strong>Normalmente, é preciso pagar por este conteúdo. Porém, basta você se registrar na publicação <ph name="PUBLICATION"><ex>AP News</ex>{publication}</ph> usando sua Conta do Google para ter acesso a esta matéria e muito mais sem custos financeiros.',
    'pt-pt': '<strong></strong>Geralmente, este conteúdo requer um pagamento, mas a Google concede-lhe acesso gratuito a este artigo e muito mais ao registar-se na publicação <ph name="PUBLICATION"><ex>AP News</ex>{publication}</ph> com a sua Conta Google.',
    'ro': '<strong></strong>Acest conținut este de obicei cu plată, dar Google vă oferă acces fără costuri la acest articol și la altele când vă înregistrați la <ph name="PUBLICATION"><ex>AP News</ex>{publication}</ph> folosind Contul Google.',
    'sk': '<strong></strong>Tento obsah je obvykle platený, ale ak sa do publikácie <ph name="PUBLICATION"><ex>AP News</ex>{publication}</ph> zaregistrujete účtom Google, získate od Googlu bezplatný prístup k&nbsp;tomuto článku a&nbsp;ďalšie výhody.',
    'sl': '<strong></strong>Za to vsebino je običajno zahtevano plačilo, vendar vam Google omogoča dostop do tega članka in drugega brez stroškov, če se z računom Google registrirate pri publikaciji <ph name="PUBLICATION"><ex>AP News</ex>{publication}</ph>.',
    'sv': '<strong></strong>Det krävs vanligtvis betalning för det här innehållet, men Google ger dig gratis åtkomst till artikeln och annat innehåll när du registrerar dig hos <ph name="PUBLICATION"><ex>AP News</ex>{publication}</ph> med ditt Google-konto.',
    'ta': '<strong></strong>வழக்கமாக இந்த உள்ளடக்கத்தை வாசிக்க கட்டணம் செலுத்த வேண்டியிருக்கும். ஆனால் <ph name="PUBLICATION"><ex>AP News</ex>{publication}</ph> இல் உங்கள் Google கணக்கைப் பயன்படுத்திப் பதிவுசெய்யும்போது இந்தக் கட்டுரைக்கும் மேலும் பலவற்றுக்கும் Google இலவச அணுகலை வழங்குகிறது.',
    'te': '<strong></strong>ఈ కంటెంట్‌కు మీరు సాధారణంగా పేమెంట్ చేయాల్సి ఉంటుంది, కానీ మీరు Google ఖాతాను ఉపయోగించి <ph name="PUBLICATION"><ex>AP News</ex>{publication}</ph>తో రిజిస్టర్ చేసుకున్నప్పుడు, ఈ వార్తా కథనానికి ఇంకా మరెన్నో వాటికి Google, ఉచిత యాక్సెస్‌ను ఇస్తుంది.'
  },
  'SHOWCASE_REGWALL_PUBLISHER_SIGN_IN_BUTTON': {
    'bg': 'Вече сте се регистрирали? Вход',
    'bn': 'আগে থেকেই রেজিস্টার করেছেন? সাইন-ইন করুন',
    'cs': 'Jste už zaregistrováni? Přihlásit se',
    'da': 'Er du allerede tilmeldt? Log ind',
    'de': 'Bereits registriert? Anmelden',
    'el': 'Έχετε εγγραφεί ήδη; Σύνδεση',
    'en': 'Already registered? Sign in',
    'es': '¿Ya te has registrado? Iniciar sesión',
    'es-419': '¿Ya te registraste? Accede',
    'es-ar': '¿Ya tienes una cuenta?',
    'fr': 'Déjà inscrit&nbsp;? Connectez-vous',
    'fr-ca': 'Déjà inscrit? Se connecter',
    'hi': 'पहले से रजिस्टर किया हुआ है? साइन इन करें',
    'it': 'Hai già effettuato la registrazione? Accedi',
    'ja': '登録済みの方: ログイン',
    'kn': 'ಈಗಾಗಲೇ ನೋಂದಾಯಿಸಲಾಗಿದೆಯೇ? ಸೈನ್ ಇನ್',
    'lt': 'Jau užsiregistravote? Prisijungti',
    'lv': 'Vai esat jau reģistrējies? Pierakstīties',
    'ml': 'മുമ്പേ രജിസ്റ്റർ ചെയ്തിട്ടുണ്ടോ? സൈൻ ഇൻ ചെയ്യുക',
    'mr': 'आधीपासून नोंदणी केली आहे का? साइन इन करा',
    'nl': 'Al geregistreerd? Inloggen',
    'pl': 'Jesteś już zarejestrowanym użytkownikiem? Zaloguj się',
    'pt-br': 'Já se inscreveu? Fazer login',
    'pt-pt': 'Já fez o seu registo? Inicie sessão',
    'ro': 'V-ați înregistrat deja? Conectați-vă',
    'sk': 'Už máte zaregistrovaný účet? Prihlásiť sa',
    'sl': 'Ste že registrirani? Prijavite se.',
    'sv': 'Har du redan registrerat dig? Logga in',
    'ta': 'ஏற்கெனவே பதிவுசெய்துள்ளீர்களா? உள்நுழைக',
    'te': 'ఇప్పటికే రిజిస్టర్ చేయబడి ఉందా? సైన్ ఇన్ చేయండి'
  },
  'SHOWCASE_REGWALL_GOOGLE_SIGN_IN_BUTTON': {
    'bg': 'Вход с Google',
    'bn': 'Google দিয়ে সাইন-ইন করুন',
    'cs': 'Přihlásit se přes Google',
    'da': 'Log ind med Google',
    'de': 'Über Google anmelden',
    'el': 'Σύνδεση μέσω Google',
    'en': 'Sign in with Google',
    'es': 'Iniciar sesión con Google',
    'es-419': 'Acceder con Google',
    'es-ar': 'Acceder con Google',
    'fr': 'Se connecter avec Google',
    'fr-ca': 'Se connecter avec Google',
    'hi': 'Google से साइन इन करें',
    'it': 'Accedi con Google',
    'ja': 'Google でログイン',
    'kn': 'Google ಖಾತೆ ಬಳಸಿಕೊಂಡು ಸೈನ್ ಇನ್ ಮಾಡಿ',
    'lt': 'Prisijunkite su „Google“',
    'lv': 'Pierakstīties, izmantojot Google',
    'ml': 'Google ഉപയോഗിച്ച് സൈൻ ഇൻ ചെയ്യുക',
    'mr': 'Google वापरून साइन इन करा',
    'nl': 'Inloggen met Google',
    'pl': 'Zaloguj się przez Google',
    'pt-br': 'Fazer login com o Google',
    'pt-pt': 'Iniciar sessão com o Google',
    'ro': 'Conectați-vă cu Google',
    'sk': 'Prihlásiť sa účtom Google',
    'sl': 'Prijavite se z Googlom',
    'sv': 'Logga in med Google',
    'ta': 'Google மூலம் உள்நுழைக',
    'te': 'Googleతో సైన్ ఇన్ చేయండి'
  },
  'SHOWCASE_REGWALL_CASL': {
    'bg': 'Прегледайте <ph name="LINK_START"><ex>&lt;a&gt;</ex></ph>Общите условия за канадското законодателство за борба със спама<ph name="LINK_END"><ex>&lt;/a&gt;</ex></ph> на <ph name="PUBLICATION"><ex>AP News</ex>{publication}</ph>',
    'bn': '<ph name="PUBLICATION"><ex>AP News</ex>{publication}</ph>-এর <ph name="LINK_START"><ex>&lt;a&gt;</ex></ph>CASL শর্ত<ph name="LINK_END"><ex>&lt;/a&gt;</ex></ph> পর্যালোচনা করুন',
    'cs': 'Prostudujte si <ph name="LINK_START"><ex>&lt;a&gt;</ex></ph>podmínky CASL<ph name="LINK_END"><ex>&lt;/a&gt;</ex></ph> publikace <ph name="PUBLICATION"><ex>AP News</ex>{publication}</ph>',
    'da': 'Gennemgå <ph name="LINK_START"><ex>&lt;a&gt;</ex></ph>CASL-vilkårene<ph name="LINK_END"><ex>&lt;/a&gt;</ex></ph> (Canadian Anti-Spam Legislation, canadisk lovgivning vedrørende antispam) for <ph name="PUBLICATION"><ex>AP News</ex>{publication}</ph>',
    'de': '<ph name="LINK_START"><ex>&lt;a&gt;</ex></ph>CASL-Bedingungen<ph name="LINK_END"><ex>&lt;/a&gt;</ex></ph> von <ph name="PUBLICATION"><ex>AP News</ex>{publication}</ph> ansehen',
    'el': 'Ελέγξτε αν τηρούνται στη δημοσίευση <ph name="PUBLICATION"><ex>AP News</ex>{publication}</ph> οι <ph name="LINK_START"><ex>&lt;a&gt;</ex></ph>Όροι CASL<ph name="LINK_END"><ex>&lt;/a&gt;</ex></ph>',
    'en': 'Review <ph name="PUBLICATION"><ex>AP News</ex>{publication}</ph>\'s <ph name="LINK_START"><ex>&lt;a&gt;</ex></ph>CASL terms<ph name="LINK_END"><ex>&lt;/a&gt;</ex></ph>',
    'es': 'Consulta los <ph name="LINK_START"><ex>&lt;a&gt;</ex></ph>términos de la CASL<ph name="LINK_END"><ex>&lt;/a&gt;</ex></ph> de <ph name="PUBLICATION"><ex>AP News</ex>{publication}</ph>',
    'es-419': 'Consulta las <ph name="LINK_START"><ex>&lt;a&gt;</ex></ph>condiciones de CASL<ph name="LINK_END"><ex>&lt;/a&gt;</ex></ph> de <ph name="PUBLICATION"><ex>AP News</ex>{publication}</ph>',
    'fr': 'Consultez les <ph name="LINK_START"><ex>&lt;a&gt;</ex></ph>Conditions d\'utilisation LCAP (Loi canadienne anti-pourriel)<ph name="LINK_END"><ex>&lt;/a&gt;</ex></ph> de <ph name="PUBLICATION"><ex>AP News</ex>{publication}</ph>',
    'fr-ca': 'Consulter les <ph name="LINK_START"><ex>&lt;a&gt;</ex></ph>conditions d\'utilisation relatives à la Loi canadienne antipourriel (LCAP)<ph name="LINK_END"><ex>&lt;/a&gt;</ex></ph> de la publication <ph name="PUBLICATION"><ex>AP News</ex>{publication}</ph>',
    'hi': '<ph name="PUBLICATION"><ex>AP News</ex>{publication}</ph> की <ph name="LINK_START"><ex>&lt;a&gt;</ex></ph>सीएएसएल (कैनेडियन एंटी-स्पैम लेजिस्लेशन) से जुड़ी शर्तों<ph name="LINK_END"><ex>&lt;/a&gt;</ex></ph> के बारे में पढ़ें',
    'it': 'Rileggi i <ph name="LINK_START"><ex>&lt;a&gt;</ex></ph>termini della legge CASL<ph name="LINK_END"><ex>&lt;/a&gt;</ex></ph> di <ph name="PUBLICATION"><ex>AP News</ex>{publication}</ph>',
    'ja': '<ph name="PUBLICATION"><ex>AP News</ex>{publication}</ph> の <ph name="LINK_START"><ex>&lt;a&gt;</ex></ph>CASL 規約<ph name="LINK_END"><ex>&lt;/a&gt;</ex></ph>を見る',
    'kn': '<ph name="PUBLICATION"><ex>AP News</ex>{publication}</ph> ನ <ph name="LINK_START"><ex>&lt;a&gt;</ex></ph>CASL ನಿಯಮಗಳು<ph name="LINK_END"><ex>&lt;/a&gt;</ex></ph> ಅನ್ನು ಪರಿಶೀಲಿಸಿ',
    'lt': 'Peržiūrėkite „<ph name="PUBLICATION"><ex>AP News</ex>{publication}</ph>“ <ph name="LINK_START"><ex>&lt;a&gt;</ex></ph>CASL sąlygas<ph name="LINK_END"><ex>&lt;/a&gt;</ex></ph>',
    'lv': 'Pārskatīt <ph name="PUBLICATION"><ex>AP News</ex>{publication}</ph> <ph name="LINK_START"><ex>&lt;a&gt;</ex></ph>CASL noteikumus<ph name="LINK_END"><ex>&lt;/a&gt;</ex></ph>',
    'ml': '<ph name="PUBLICATION"><ex>AP News</ex>{publication}</ph> എന്നതിന്റെ <ph name="LINK_START"><ex>&lt;a&gt;</ex></ph>CASL നിബന്ധനകൾ<ph name="LINK_END"><ex>&lt;/a&gt;</ex></ph> അവലോകനം ചെയ്യുക',
    'mr': '<ph name="PUBLICATION"><ex>AP News</ex>{publication}</ph> च्या <ph name="LINK_START"><ex>&lt;a&gt;</ex></ph>CASL अटी<ph name="LINK_END"><ex>&lt;/a&gt;</ex></ph> यांचे पुनरावलोकन करा',
    'nl': 'Bekijk de <ph name="LINK_START"><ex>&lt;a&gt;</ex></ph>CASL-voorwaarden<ph name="LINK_END"><ex>&lt;/a&gt;</ex></ph> van <ph name="PUBLICATION"><ex>AP News</ex>{publication}</ph>',
    'pl': 'Zapoznaj się z&nbsp;<ph name="LINK_START"><ex>&lt;a&gt;</ex></ph>warunkami CASL<ph name="LINK_END"><ex>&lt;/a&gt;</ex></ph> publikacji <ph name="PUBLICATION"><ex>AP News</ex>{publication}</ph>',
    'pt-br': 'Confira os <ph name="LINK_START"><ex>&lt;a&gt;</ex></ph>termos da CASL<ph name="LINK_END"><ex>&lt;/a&gt;</ex></ph> da publicação <ph name="PUBLICATION"><ex>AP News</ex>{publication}</ph>',
    'pt-pt': 'Analise os <ph name="LINK_START"><ex>&lt;a&gt;</ex></ph>termos da CASL<ph name="LINK_END"><ex>&lt;/a&gt;</ex></ph> da publicação <ph name="PUBLICATION"><ex>AP News</ex>{publication}</ph>',
    'ro': 'Examinați <ph name="LINK_START"><ex>&lt;a&gt;</ex></ph>Termenii CASL<ph name="LINK_END"><ex>&lt;/a&gt;</ex></ph> ai <ph name="PUBLICATION"><ex>AP News</ex>{publication}</ph>',
    'sk': 'Prečítajte si <ph name="LINK_START"><ex>&lt;a&gt;</ex></ph>podmienky CASL<ph name="LINK_END"><ex>&lt;/a&gt;</ex></ph> publikácie <ph name="PUBLICATION"><ex>AP News</ex>{publication}</ph>',
    'sl': 'Preglejte <ph name="LINK_START"><ex>&lt;a&gt;</ex></ph>pogoje CASL<ph name="LINK_END"><ex>&lt;/a&gt;</ex></ph> za publikacijo <ph name="PUBLICATION"><ex>AP News</ex>{publication}</ph>',
    'sv': 'Läs <ph name="LINK_START"><ex>&lt;a&gt;</ex></ph>villkoren i lagstiftningen CASL<ph name="LINK_END"><ex>&lt;/a&gt;</ex></ph> för <ph name="PUBLICATION"><ex>AP News</ex>{publication}</ph>',
    'ta': '<ph name="PUBLICATION"><ex>AP News</ex>{publication}</ph> இன் <ph name="LINK_START"><ex>&lt;a&gt;</ex></ph>CASL விதிமுறைகளைப்<ph name="LINK_END"><ex>&lt;/a&gt;</ex></ph> பாருங்கள்',
    'te': '<ph name="PUBLICATION"><ex>AP News</ex>{publication}</ph>‌కు సంబంధించిన <ph name="LINK_START"><ex>&lt;a&gt;</ex></ph>CASL నియమాల<ph name="LINK_END"><ex>&lt;/a&gt;</ex></ph>ను రివ్యూ చేయండి'
  }
};
exports.I18N_STRINGS = I18N_STRINGS;

},{}],22:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SWG_I18N_STRINGS = void 0;
/**
 * Copyright 2021 The Subscribe with Google Authors. All Rights Reserved.
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

// Why is there a strings.js and a swg-strings.js, you ask? strings.js is a
// generated file, currently used for gaa builds. This file is used for swg and
// swg-basic builds, and is currently manually updated.
// TODO(stellachui): Figure out if they should be merged without a large impact
//   on binary size.

const SWG_I18N_STRINGS = {
  'SUBSCRIPTION_TITLE_LANG_MAP': {
    'en': 'Subscribe with Google',
    'ar': 'Google اشترك مع',
    'de': 'Abonnieren mit Google',
    'en-au': 'Subscribe with Google',
    'en-ca': 'Subscribe with Google',
    'en-gb': 'Subscribe with Google',
    'en-us': 'Subscribe with Google',
    'es': 'Suscríbete con Google',
    'es-419': 'Suscríbete con Google',
    'es-latam': 'Suscríbete con Google',
    'es-latn': 'Suscríbete con Google',
    'fr': "S'abonner avec Google",
    'fr-ca': "S'abonner avec Google",
    'hi': 'Google के ज़रिये सदस्यता',
    'id': 'Berlangganan dengan Google',
    'it': 'Abbonati con Google',
    'ja': 'Google で購読',
    'ko': 'Google 을 통한구독',
    'ms': 'Langgan dengan Google',
    'nl': 'Abonneren via Google',
    'no': 'Abonner med Google',
    'pl': 'Subskrybuj z Google',
    'pt': 'Subscrever com o Google',
    'pt-br': 'Assine com o Google',
    'ru': 'Подпиcка через Google',
    'sv': 'Prenumerera med Google',
    'th': 'สมัครฟาน Google',
    'tr': 'Google ile Abone Ol',
    'uk': 'Підписатися через Google',
    'zh-cn': '通过 Google 订阅',
    'zh-hk': '透過 Google 訂閱',
    'zh-tw': '透過 Google 訂閱'
  },
  'CONTRIBUTION_TITLE_LANG_MAP': {
    'en': 'Contribute with Google',
    'ar': 'المساهمة باستخدام Google',
    'de': 'Mit Google beitragen',
    'en-au': 'Contribute with Google',
    'en-ca': 'Contribute with Google',
    'en-gb': 'Contribute with Google',
    'en-us': 'Contribute with Google',
    'es': '	Contribuye con Google',
    'es-419': 'Contribuir con Google',
    'es-latam': 'Contribuir con Google',
    'es-latn': 'Contribuye con Google',
    'fr': 'Contribuer avec Google',
    'fr-ca': 'Contribuer avec Google',
    'hi': 'Google खाते की मदद से योगदान करें',
    'id': 'Berkontribusi dengan Google',
    'it': 'Contribuisci con Google',
    'ja': 'Google で寄付',
    'ko': 'Google을 통해 참여하기',
    'ms': 'Sumbangkan dengan Google',
    'nl': 'Bijdragen met Google',
    'no': 'Bidra med Google',
    'pl': 'Wesprzyj publikację przez Google',
    'pt': 'Contribuir utilizando o Google',
    'pt-br': 'Contribua usando o Google',
    'ru': 'Внести средства через Google',
    'sv': 'Bidra med Google',
    'th': 'มีส่วนร่วมผ่าน Google',
    'tr': 'Google ile Katkıda Bulun',
    'uk': 'Зробити внесок через Google',
    'zh-cn': '通过 Google 捐赠',
    'zh-hk': '透過 Google 提供內容',
    'zh-tw': '透過 Google 捐款'
  },
  'REGWALL_ALREADY_REGISTERED_LANG_MAP': {
    'en': 'You have registered before.',
    'ar': 'لقد سبق أن تسجّلت.',
    'de': 'Du bist bereits registriert.',
    'en-au': 'You have registered before.',
    'en-ca': 'You have registered before.',
    'en-gb': 'You have registered before.',
    'en-us': 'You have registered before.',
    'es': 'Ya te habías registrado anteriormente.',
    'es-419': 'Ya te registraste antes.',
    'fr': 'Vous vous êtes déjà inscrit.',
    'fr-ca': 'Vous vous êtes inscrit auparavant.',
    'hi': 'आपने पहले ही इसके लिए रजिस्टर कर लिया है.',
    'id': 'Anda telah mendaftar sebelumnya.',
    'it': 'Registrazione già effettuata in precedenza.',
    'ja': 'すでに登録済みです。',
    'ko': '이전에 등록한 사용자입니다.',
    'ms': 'Anda telah mendaftar sebelum ini.',
    'nl': 'Je hebt je al eerder geregistreerd.',
    'no': 'Du er allerede registrert.',
    'pl': 'Masz już wcześniejszą rejestrację.',
    'pt': 'Já se registou anteriormente.',
    'pt-br': 'Você já tem um cadastro.',
    'ru': 'Вы уже зарегистрированы.',
    'sv': 'Du har redan registrerat dig.',
    'th': 'คุณเคยลงทะเบียนแล้ว',
    'tr': 'Daha önce kaydolmuştunuz.',
    'uk': 'Ви вже зареєструвалися раніше.',
    'zh-cn': '您之前已注册。',
    'zh-hk': '您之前已註冊。',
    'zh-tw': '你已註冊這個出版品。'
  },
  'NEWSLETTER_ALREADY_SIGNED_UP_LANG_MAP': {
    'en': 'You have signed up before.',
    'ar': 'سبق أن اشتركت في النشرة الإخبارية.',
    'de': 'Du hast dich bereits angemeldet.',
    'en-au': 'You have signed up before.',
    'en-ca': 'You have signed up before.',
    'en-gb': 'You have signed up before.',
    'en-us': 'You have signed up before.',
    'es': 'Ya te has registrado anteriormente.',
    'es-419': 'Ya te registraste antes.',
    'fr': 'Vous vous êtes déjà inscrit.',
    'fr-ca': 'Vous vous êtes inscrit auparavant.',
    'hi': 'न्यूज़लेटर के लिए पहले ही साइन अप किया जा चुका है.',
    'id': 'Anda telah mendaftar sebelumnya.',
    'it': "Hai già effettuato l'iscrizione.",
    'ja': 'すでに登録されています。',
    'ko': '이전에 가입한 사용자입니다.',
    'ms': 'Anda sudah mendaftar sebelum ini.',
    'nl': 'Je hebt je al eerder aangemeld.',
    'no': 'Du er allerede registrert.',
    'pl': 'Już wcześniej się zarejestrowałeś(-aś).',
    'pt': 'Já se inscreveu anteriormente.',
    'pt-br': 'Você se inscreveu anteriormente.',
    'ru': 'Вы уже зарегистрированы.',
    'sv': 'Du har redan registrerat dig.',
    'th': 'คุณสมัครรับข้อมูลมาก่อนแล้ว',
    'tr': 'Daha önce kaydolmuştunuz.',
    'uk': 'Ви вже зареєструвалися.',
    'zh-cn': '您之前已注册。',
    'zh-hk': '您之前已訂閱。',
    'zh-tw': '你已經訂閱了。'
  },
  'REGWALL_REGISTER_FAILED_LANG_MAP': {
    'en': 'Registration failed. Try registering again.',
    'ar': 'تعذَّرت عملية التسجيل. يُرجى إعادة المحاولة.',
    'de': 'Registrierung fehlgeschlagen. Versuche es noch einmal.',
    'en-au': 'Registration failed. Try registering again.',
    'en-ca': 'Registration failed. Try registering again.',
    'en-gb': 'Registration failed. Try registering again.',
    'en-us': 'Registration failed. Try registering again.',
    'es': 'No se ha podido completar el registro. Prueba a registrarte de nuevo.',
    'es-419': 'No se pudo completar el registro. Vuelve a intentarlo.',
    'fr': "Échec de l'enregistrement. Réessayez.",
    'fr-ca': "Échec de l'inscription. Essayez de vous inscrire à nouveau.",
    'hi': 'रजिस्ट्रेशन नहीं हो सका. फिर से रजिस्टर करने की कोशिश करें.',
    'id': 'Pendaftaran gagal. Coba daftar lagi.',
    'it': 'Registrazione non riuscita. Prova a registrarti di nuovo.',
    'ja': '登録できませんでした。もう一度お試しください。',
    'ko': '등록에 실패했습니다. 다시 등록해 보세요.',
    'ms': 'Pendaftaran gagal. Cuba mendaftar lagi.',
    'nl': 'Registratie mislukt. Probeer opnieuw te registreren.',
    'no': 'Registreringen mislyktes. Prøv å registrere deg på nytt.',
    'pl': 'Rejestracja się nie udała. Spróbuj jeszcze raz się zarejestrować.',
    'pt': 'Falha no registo. Tente registar-se novamente.',
    'pt-br': 'Não foi possível fazer o registro. Tente novamente.',
    'ru': 'Ошибка регистрации. Повторите попытку.',
    'sv': 'Registreringen misslyckades. Försök att registrera dig igen.',
    'th': 'ลงทะเบียนไม่สำเร็จ ลองลงทะเบียนอีกครั้ง',
    'tr': 'Kayıt işlemi başarısız oldu. Tekrar kaydolmayı deneyin.',
    'uk': 'Помилка реєстрації. Повторіть спробу.',
    'zh-cn': '注册失败。请尝试重新注册。',
    'zh-hk': '註冊失敗。請嘗試重新註冊。',
    'zh-tw': '註冊失敗，請再試一次。'
  },
  'NEWSLETTER_SIGN_UP_FAILED_LANG_MAP': {
    'en': 'Signup failed. Try signing up again.',
    'ar': 'تعذَّرت عملية الاشتراك. يُرجى إعادة المحاولة.',
    'de': 'Anmeldung fehlgeschlagen. Versuche es noch einmal.',
    'en-au': 'Sign-up failed. Try signing up again.',
    'en-ca': 'Sign-up failed. Try signing up again.',
    'en-gb': 'Sign-up failed. Try signing up again.',
    'en-us': 'Sign-up failed. Try signing up again.',
    'es': 'No se ha podido completar la suscripción. Prueba a suscribirte de nuevo.',
    'es-419': 'Se produjo un error de registro. Vuelve a intentarlo.',
    'fr': "Échec de l'inscription. Réessayez.",
    'fr-ca': "Échec de l'inscription. Essayez de vous inscrire à nouveau.",
    'hi': 'साइन अप नहीं किया जा सका. फिर से साइन अप करने की कोशिश करें.',
    'id': 'Pendaftaran gagal. Coba daftar lagi.',
    'it': 'Iscrizione non riuscita. Prova a iscriverti di nuovo.',
    'ja': '登録できませんでした。もう一度お試しください。',
    'ko': '가입에 실패했습니다. 다시 가입해 보세요.',
    'ms': 'Daftar gagal. Cuba daftar lagi.',
    'nl': 'Aanmelding mislukt. Probeer opnieuw aan te melden.',
    'no': 'Registreringen mislyktes. Prøv å registrere deg på nytt.',
    'pl': 'Rejestracja się nie udała. Spróbuj jeszcze raz się zarejestrować.',
    'pt': 'Falha na inscrição. Tente inscrever-se novamente.',
    'pt-br': 'Não foi possível se inscrever. Tente novamente.',
    'ru': 'Не удалось зарегистрироваться. Повторите попытку.',
    'sv': 'Registreringen misslyckades. Försök att registrera dig igen.',
    'th': 'ลงชื่อสมัครใช้ไม่สำเร็จ ลองลงชื่อสมัครใช้อีกครั้ง',
    'tr': 'Kaydolma işlemi başarısız oldu. Tekrar kaydolmayı deneyin.',
    'uk': 'Помилка реєстрації. Повторіть спробу.',
    'zh-cn': '注册失败。请尝试重新注册。',
    'zh-hk': '申請失敗。請嘗試重新申請。',
    'zh-tw': '訂閱失敗，請再試一次。'
  },
  'REGWALL_ACCOUNT_CREATED_LANG_MAP': {
    'en': 'Created an account with <ph name="EMAIL"><ex>user@gmail.com</ex>%s</ph>',
    'ar': 'تم إنشاء حساب باستخدام <ph name="EMAIL"><ex>user@gmail.com</ex>%s</ph>.',
    'de': 'Konto bei <ph name="EMAIL"><ex>user@gmail.com</ex>%s</ph> wurde erstellt',
    'en-au': 'Created an account with <ph name="EMAIL"><ex>user@gmail.com</ex>%s</ph>',
    'en-ca': 'Created an account with <ph name="EMAIL"><ex>user@gmail.com</ex>%s</ph>',
    'en-gb': 'Created an account with <ph name="EMAIL"><ex>user@gmail.com</ex>%s</ph>',
    'en-us': 'Created an account with <ph name="EMAIL"><ex>user@gmail.com</ex>%s</ph>',
    'es': 'Has creado una cuenta con <ph name="EMAIL"><ex>user@gmail.com</ex>%s</ph>',
    'es-419': 'Se creó una cuenta con <ph name="EMAIL"><ex>user@gmail.com</ex>%s</ph>',
    'fr': 'A créé un compte avec <ph name="EMAIL"><ex>user@gmail.com</ex>%s</ph>',
    'fr-ca': 'Un compte a été créé avec l\'adresse <ph name="EMAIL"><ex>user@gmail.com</ex>%s</ph>',
    'hi': '<ph name="EMAIL"><ex>user@gmail.com</ex>%s</ph> का इस्तेमाल करके, एक खाता बनाया गया',
    'id': 'Membuat akun dengan <ph name="EMAIL"><ex>user@gmail.com</ex>%s</ph>',
    'it': 'È stato creato un account con l\'indirizzo <ph name="EMAIL"><ex>user@gmail.com</ex>%s</ph>',
    'ja': '<ph name="EMAIL"><ex>user@gmail.com</ex>%s</ph> でアカウントを作成しました',
    'ko': '<ph name="EMAIL"><ex>user@gmail.com</ex>%s</ph>(으)로 계정을 만들었습니다.',
    'ms': 'Membuat akaun dengan <ph name="EMAIL"><ex>user@gmail.com</ex>%s</ph>',
    'nl': 'Account gemaakt met <ph name="EMAIL"><ex>user@gmail.com</ex>%s</ph>',
    'no': 'Du har opprettet en konto med <ph name="EMAIL"><ex>user@gmail.com</ex>%s</ph>',
    'pl': 'Utworzono konto za pomocą adresu <ph name="EMAIL"><ex>user@gmail.com</ex>%s</ph>',
    'pt': 'Criou uma conta com <ph name="EMAIL"><ex>user@gmail.com</ex>%s</ph>',
    'pt-br': 'Conta criada com o e-mail <ph name="EMAIL"><ex>user@gmail.com</ex>%s</ph>',
    'ru': 'Вы зарегистрировали аккаунт на адрес <ph name="EMAIL"><ex>user@gmail.com</ex>%s</ph>.',
    'sv': 'Du skapade ett konto med <ph name="EMAIL"><ex>user@gmail.com</ex>%s</ph>',
    'th': 'สร้างบัญชีด้วย <ph name="EMAIL"><ex>user@gmail.com</ex>%s</ph>',
    'tr': '<ph name="EMAIL"><ex>user@gmail.com</ex>%s</ph> ile bir hesap oluşturun',
    'uk': 'Обліковий запис створено за допомогою електронної адреси <ph name="EMAIL"><ex>user@gmail.com</ex>%s</ph>',
    'zh-cn': '已使用 <ph name="EMAIL"><ex>user@gmail.com</ex>%s</ph> 创建帐号',
    'zh-hk': '已使用 <ph name="EMAIL"><ex>user@gmail.com</ex>%s</ph> 建立帳戶',
    'zh-tw': '已使用 <ph name="EMAIL"><ex>user@gmail.com</ex>%s</ph> 建立帳戶'
  },
  'NEWSLETTER_SIGNED_UP_LANG_MAP': {
    'en': 'Signed up with <ph name="EMAIL"><ex>user@gmail.com</ex>%s</ph> for the newsletter',
    'ar': 'تم الاشتراك في النشرة الإخبارية باستخدام <ph name="EMAIL"><ex>user@gmail.com</ex>%s</ph>.',
    'de': 'Du hast dich für den Newsletter von <ph name="EMAIL"><ex>user@gmail.com</ex>%s</ph> angemeldet',
    'en-au': 'Signed up with <ph name="EMAIL"><ex>user@gmail.com</ex>%s</ph> for the newsletter',
    'en-ca': 'Signed up with <ph name="EMAIL"><ex>user@gmail.com</ex>%s</ph> for the newsletter',
    'en-gb': 'Signed up with <ph name="EMAIL"><ex>user@gmail.com</ex>%s</ph> for the newsletter',
    'en-us': 'Signed up with <ph name="EMAIL"><ex>user@gmail.com</ex>%s</ph> for the newsletter',
    'es': 'Te has suscrito a la newsletter con <ph name="EMAIL"><ex>user@gmail.com</ex>%s</ph>',
    'es-419': 'Te registraste con <ph name="EMAIL"><ex>user@gmail.com</ex>%s</ph> para recibir el boletín informativo',
    'fr': 'S\'est abonné à la newsletter avec <ph name="EMAIL"><ex>user@gmail.com</ex>%s</ph>',
    'fr-ca': 'Vous êtes inscrit au bulletin d\'information avec l\'adresse <ph name="EMAIL"><ex>user@gmail.com</ex>%s</ph>',
    'hi': 'न्यूज़लेटर पाने के लिए, <ph name="EMAIL"><ex>user@gmail.com</ex>%s</ph> से साइन अप किया गया',
    'id': 'Mendaftar dengan <ph name="EMAIL"><ex>user@gmail.com</ex>%s</ph> untuk mendapatkan newsletter',
    'it': 'Iscrizione alla newsletter con l\'indirizzo <ph name="EMAIL"><ex>user@gmail.com</ex>%s</ph> effettuata',
    'ja': '<ph name="EMAIL"><ex>user@gmail.com</ex>%s</ph> でニュースレターを登録しました',
    'ko': '<ph name="EMAIL"><ex>user@gmail.com</ex>%s</ph>(으)로 뉴스레터에 가입했습니다.',
    'ms': 'Mendaftar dengan <ph name="EMAIL"><ex>user@gmail.com</ex>%s</ph> untuk surat berita',
    'nl': 'Aangemeld met <ph name="EMAIL"><ex>user@gmail.com</ex>%s</ph> voor de nieuwsbrief',
    'no': 'Du har registrert deg for nyhetsbrevet med <ph name="EMAIL"><ex>user@gmail.com</ex>%s</ph>',
    'pl': 'Zapisano się na newsletter za pomocą adresu <ph name="EMAIL"><ex>user@gmail.com</ex>%s</ph>',
    'pt': 'Inscreveu-se com <ph name="EMAIL"><ex>user@gmail.com</ex>%s</ph> no boletim informativo',
    'pt-br': 'Inscrição na newsletter feita com o e-mail <ph name="EMAIL"><ex>user@gmail.com</ex>%s</ph>',
    'ru': 'Вы подписались на новостную рассылку, используя аккаунт <ph name="EMAIL"><ex>user@gmail.com</ex>%s</ph>.',
    'sv': 'Du registrerade dig för nyhetsbrevet med <ph name="EMAIL"><ex>user@gmail.com</ex>%s</ph>',
    'th': 'ลงชื่อเข้าใช้ด้วย <ph name="EMAIL"><ex>user@gmail.com</ex>%s</ph> สำหรับจดหมายข่าว',
    'tr': 'Bülten için <ph name="EMAIL"><ex>user@gmail.com</ex>%s</ph> ile kaydoldunuz',
    'uk': 'Ви підписалися на інформаційні листи на електронну адресу <ph name="EMAIL"><ex>user@gmail.com</ex>%s</ph>',
    'zh-cn': '已使用 <ph name="EMAIL"><ex>user@gmail.com</ex>%s</ph> 订阅简报',
    'zh-hk': '已使用 <ph name="EMAIL"><ex>user@gmail.com</ex>%s</ph> 註冊通訊',
    'zh-tw': '已使用 <ph name="EMAIL"><ex>user@gmail.com</ex>%s</ph> 訂閱電子報'
  },
  'NO_MEMBERSHIP_FOUND_LANG_MAP': {
    'en': 'No membership found',
    'ar': 'لم يتم العثور على أي اشتراك.',
    'de': 'Keine Mitgliedschaftsdaten gefunden',
    'en-au': 'No membership found',
    'en-ca': 'No membership found',
    'en-gb': 'No membership found',
    'en-us': 'No membership found',
    'es': 'No se han encontrado suscripciones',
    'es-419': 'No se encontró ninguna membresía',
    'fr': 'Aucun abonnement trouvé',
    'fr-ca': 'Aucun abonnement trouvé',
    'hi': 'पैसे चुकाकर ली जाने वाली कोई सदस्यता नहीं मिली',
    'id': 'Langganan tidak ditemukan',
    'it': 'Nessun abbonamento trovato',
    'ja': 'メンバーシップが見つかりません',
    'ko': '멤버십 정보를 찾을 수 없습니다.',
    'ms': 'Tiada keahlian ditemukan',
    'nl': 'Geen lidmaatschap gevonden',
    'no': 'Fant ingen abonnementer',
    'pl': 'Nie znaleziono subskrypcji',
    'pt': 'Nenhuma subscrição encontrada',
    'pt-br': 'Nenhuma assinatura foi encontrada',
    'ru': 'Подписка не найдена.',
    'se': 'Inget medlemskap hittades',
    'th': 'ไม่พบการเป็นสมาชิก',
    'tr': 'Üyelik bulunamadı',
    'uk': 'Немає підписок',
    'zh-cn': '未找到会员资料',
    'zh-hk': '找不到會籍',
    'zh-tw': '找不到會員資料'
  }
};
exports.SWG_I18N_STRINGS = SWG_I18N_STRINGS;

},{}],23:[function(require,module,exports){
"use strict";

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

(0, _log.log)('Subscriptions Runtime: 0.1.22-1667857131354');
(0, _runtime.installRuntime)(self);

},{"./runtime/runtime":57,"./utils/log":78}],24:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AttributionParams = void 0;
/**
 * Copyright 2021 The Subscribe with Google Authors. All Rights Reserved.
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
 * Container for attribution details for the publisher / creator.
 */
class AttributionParams {
  /**
   * @param {string} displayName
   * @param {string} avatarUrl
   */
  constructor(displayName, avatarUrl) {
    /** @const {string} */
    this.displayName = displayName;

    /** @const {string} */
    this.avatarUrl = avatarUrl;
  }
}
exports.AttributionParams = AttributionParams;

},{}],25:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ImpressionConfig = exports.ExplicitDismissalConfig = exports.ClientDisplayTrigger = exports.AutoPromptConfigParams = exports.AutoPromptConfig = void 0;
/**
 * Copyright 2021 The Subscribe with Google Authors. All Rights Reserved.
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
 * @typedef {{
 *   displayDelaySeconds: (number|undefined),
 *   dismissalBackOffSeconds: (number|undefined),
 *   maxDismissalsPerWeek: (number|undefined),
 *   maxDismissalsResultingHideSeconds: (number|undefined),
 *   impressionBackOffSeconds: (number|undefined),
 *   maxImpressions: (number|undefined),
 *   maxImpressionsResultingHideSeconds: (number|undefined),
 * }}
 */
let AutoPromptConfigParams;

/**
 * Container for the auto prompt configuation details.
 */
exports.AutoPromptConfigParams = AutoPromptConfigParams;
class AutoPromptConfig {
  /**
   * @param {!AutoPromptConfigParams=} params
   */
  constructor() {
    let {
      displayDelaySeconds,
      dismissalBackOffSeconds,
      maxDismissalsPerWeek,
      maxDismissalsResultingHideSeconds,
      impressionBackOffSeconds,
      maxImpressions,
      maxImpressionsResultingHideSeconds
    } = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    /** @const {!ClientDisplayTrigger} */
    this.clientDisplayTrigger = new ClientDisplayTrigger(displayDelaySeconds);

    /** @const {!ExplicitDismissalConfig} */
    this.explicitDismissalConfig = new ExplicitDismissalConfig(dismissalBackOffSeconds, maxDismissalsPerWeek, maxDismissalsResultingHideSeconds);

    /** @const {!ImpressionConfig} */
    this.impressionConfig = new ImpressionConfig(impressionBackOffSeconds, maxImpressions, maxImpressionsResultingHideSeconds);
  }
}

/**
 * Client side conditions to trigger the display of the auto prompt.
 */
exports.AutoPromptConfig = AutoPromptConfig;
class ClientDisplayTrigger {
  /**
   * @param {number|undefined} displayDelaySeconds
   */
  constructor(displayDelaySeconds) {
    /** @const {number|undefined} */
    this.displayDelaySeconds = displayDelaySeconds;
  }
}

/**
 * Configuration of explicit dismissal behavior and its effects.
 */
exports.ClientDisplayTrigger = ClientDisplayTrigger;
class ExplicitDismissalConfig {
  /**
   * @param {number|undefined} backOffSeconds
   * @param {number|undefined} maxDismissalsPerWeek
   * @param {number|undefined} maxDismissalsResultingHideSeconds
   */
  constructor(backOffSeconds, maxDismissalsPerWeek, maxDismissalsResultingHideSeconds) {
    /** @const {number|undefined} */
    this.backOffSeconds = backOffSeconds;

    /** @const {number|undefined} */
    this.maxDismissalsPerWeek = maxDismissalsPerWeek;

    /** @const {number|undefined} */
    this.maxDismissalsResultingHideSeconds = maxDismissalsResultingHideSeconds;
  }
}

/**
 * Configuration of impression behavior and its effects.
 */
exports.ExplicitDismissalConfig = ExplicitDismissalConfig;
class ImpressionConfig {
  /**
   * @param {number|undefined} backOffSeconds
   * @param {number|undefined} maxImpressions
   * @param {number|undefined} maxImpressionsResultingHideSeconds
   */
  constructor(backOffSeconds, maxImpressions, maxImpressionsResultingHideSeconds) {
    /** @const {number|undefined} */
    this.backOffSeconds = backOffSeconds;

    /** @const {number|undefined} */
    this.maxImpressions = maxImpressions;

    /** @const {number|undefined} */
    this.maxImpressionsResultingHideSeconds = maxImpressionsResultingHideSeconds;
  }
}
exports.ImpressionConfig = ImpressionConfig;

},{}],26:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.UiPredicates = exports.ClientConfigOptions = exports.ClientConfig = void 0;
/**
 * Copyright 2021 The Subscribe with Google Authors. All Rights Reserved.
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
 * Client configuration options.
 *
 * @typedef {{
 *   attributionParams: (./attribution-params.AttributionParams|undefined),
 *   autoPromptConfig: (./auto-prompt-config.AutoPromptConfig|undefined),
 *   paySwgVersion: (string|undefined),
 *   uiPredicates: (UiPredicates|undefined),
 *   usePrefixedHostPath: (boolean|undefined),
 *   useUpdatedOfferFlows: (boolean|undefined),
 *   skipAccountCreationScreen: (boolean|undefined),
 * }}
 */
let ClientConfigOptions;

/**
 * Container for the details relating to how the client should be configured.
 */
exports.ClientConfigOptions = ClientConfigOptions;
class ClientConfig {
  /**
   * @param {ClientConfigOptions} options
   */
  constructor() {
    let {
      attributionParams,
      autoPromptConfig,
      paySwgVersion,
      uiPredicates,
      usePrefixedHostPath,
      useUpdatedOfferFlows,
      skipAccountCreationScreen
    } = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    /** @const {./auto-prompt-config.AutoPromptConfig|undefined} */
    this.autoPromptConfig = autoPromptConfig;

    /** @const {string|undefined} */
    this.paySwgVersion = paySwgVersion;

    /** @const {boolean} */
    this.usePrefixedHostPath = usePrefixedHostPath || false;

    /** @const {boolean} */
    this.useUpdatedOfferFlows = useUpdatedOfferFlows || false;

    /** @const {boolean} */
    this.skipAccountCreationScreen = skipAccountCreationScreen || false;

    /** @const {UiPredicates|undefined} */
    this.uiPredicates = uiPredicates;

    /** @const {./attribution-params.AttributionParams|undefined} */
    this.attributionParams = attributionParams;
  }
}

/**
 * Predicates to control UI elements.
 */
exports.ClientConfig = ClientConfig;
class UiPredicates {
  /**
   * @param {boolean|undefined} canDisplayAutoPrompt
   * @param {boolean|undefined} canDisplayButton
   * @param {boolean|undefined} purchaseUnavailableRegion
   */
  constructor(canDisplayAutoPrompt, canDisplayButton, purchaseUnavailableRegion) {
    /** @const {boolean|undefined} */
    this.canDisplayAutoPrompt = canDisplayAutoPrompt;

    /** @const {boolean|undefined} */
    this.canDisplayButton = canDisplayButton;

    /** @const {boolean|undefined} */
    this.purchaseUnavailableRegion = purchaseUnavailableRegion;
  }
}
exports.UiPredicates = UiPredicates;

},{}],27:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.GlobalDoc = exports.Doc = void 0;
exports.resolveDoc = resolveDoc;
var _documentReady = require("../utils/document-ready");
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
class Doc {
  /**
   * @return {!Window}
   */
  getWin() {}

  /**
   * The `Document` node or analog.
   * @return {!Node}
   */
  getRootNode() {}

  /**
   * The `Document.documentElement` element or analog.
   * @return {!Element}
   */
  getRootElement() {}

  /**
   * The `Document.head` element or analog. Returns `null` if not available
   * yet.
   * @return {!Element}
   */
  getHead() {}

  /**
   * The `Document.body` element or analog. Returns `null` if not available
   * yet.
   * @return {?Element}
   */
  getBody() {}

  /**
   * Whether the document has been fully constructed.
   * @return {boolean}
   */
  isReady() {}

  /**
   * Resolved when document has been fully constructed.
   * @return {!Promise}
   */
  whenReady() {}

  /**
   * Adds the element to the fixed layer.
   * @param {!Element} unusedElement
   * @return {!Promise}
   *
   * This is a no-op for except in AMP on iOS < 13.0.
   */
  addToFixedLayer(unusedElement) {}
}

/** @implements {Doc} */
exports.Doc = Doc;
class GlobalDoc {
  /**
   * @param {!Window|!Document} winOrDoc
   */
  constructor(winOrDoc) {
    const isWin = !!winOrDoc.document;
    /** @private @const {!Window} */
    this.win_ = /** @type {!Window} */
    isWin ? /** @type {!Window} */winOrDoc : /** @type {!Document} */winOrDoc.defaultView;
    /** @private @const {!Document} */
    this.doc_ = isWin ? /** @type {!Window} */winOrDoc.document : /** @type {!Document} */winOrDoc;
  }

  /** @override */
  getWin() {
    return this.win_;
  }

  /** @override */
  getRootNode() {
    return this.doc_;
  }

  /** @override */
  getRootElement() {
    return this.doc_.documentElement;
  }

  /** @override */
  getHead() {
    // `document.head` always has a chance to be parsed, at least partially.
    return (/** @type {!Element} */this.doc_.head
    );
  }

  /** @override */
  getBody() {
    return this.doc_.body;
  }

  /** @override */
  isReady() {
    return (0, _documentReady.isDocumentReady)(this.doc_);
  }

  /** @override */
  whenReady() {
    return (0, _documentReady.whenDocumentReady)(this.doc_);
  }

  /** @override */
  addToFixedLayer(unusedElement) {
    return Promise.resolve();
  }
}

/**
 * @param {!Document|!Window|!Doc} input
 * @return {!Doc}
 */
exports.GlobalDoc = GlobalDoc;
function resolveDoc(input) {
  // Is it a `Document`
  if ( /** @type {!Document} */input.nodeType === /* DOCUMENT */9) {
    return new GlobalDoc( /** @type {!Document} */input);
  }
  // Is it a `Window`?
  if ( /** @type {!Window} */input.document) {
    return new GlobalDoc( /** @type {!Window} */input);
  }
  return (/** @type {!Doc} */input
  );
}

},{"../utils/document-ready":70}],28:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PageConfigResolver = void 0;
exports.getControlFlag = getControlFlag;
var _doc = require("./doc");
var _pageConfig = require("./page-config");
var _log = require("../utils/log");
var _dom = require("../utils/dom");
var _json = require("../utils/json");
var _errorLogger = require("../utils/error-logger");
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

const ALREADY_SEEN = '__SWG-SEEN__';
const CONTROL_FLAG = 'subscriptions-control';
const ALLOWED_TYPES = ['CreativeWork', 'Article', 'NewsArticle', 'Blog', 'Comment', 'Course', 'HowTo', 'Message', 'Review', 'WebPage'];

// RegExp for quickly scanning LD+JSON for allowed types
const RE_ALLOWED_TYPES = new RegExp(ALLOWED_TYPES.join('|'));

/**
 */
class PageConfigResolver {
  /**
   * @param {!Window|!Document|!DocInterface} winOrDoc
   */
  constructor(winOrDoc) {
    /** @private @const {!DocInterface} */
    this.doc_ = (0, _doc.resolveDoc)(winOrDoc);

    /** @private {?function((!PageConfig|!Promise))} */
    this.configResolver_ = null;

    /** @private @const {!Promise<!PageConfig>} */
    this.configPromise_ = new Promise(resolve => {
      this.configResolver_ = resolve;
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
  resolveConfig() {
    // Try resolve the config at different times.
    Promise.resolve().then(this.check.bind(this));
    this.doc_.whenReady().then(this.check.bind(this));
    return this.configPromise_;
  }

  /**
   * @return {?PageConfig}
   */
  check() {
    // Already resolved.
    if (!this.configResolver_) {
      return null;
    }
    const config = this.metaParser_.check() || this.ldParser_.check() || this.microdataParser_.check();
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
}
exports.PageConfigResolver = PageConfigResolver;
class TypeChecker {
  constructor() {}

  /**
   * Check value from json
   * @param {?Array|string} value
   * @param {Array<string>} expectedTypes
   * @return {boolean}
   */
  checkValue(value, expectedTypes) {
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
  checkString(itemtype, expectedTypes) {
    if (!itemtype) {
      return false;
    }
    return this.checkArray(itemtype.split(/\s+/), expectedTypes);
  }

  /**
   * @param {!Array<?string>} typeArray
   * @param {Array<string>} expectedTypes
   * @return {boolean}
   */
  checkArray(typeArray, expectedTypes) {
    for (const schemaTypeUrl of typeArray) {
      const schemaType = schemaTypeUrl.replace(/^http:\/\/schema.org\//i, '');
      if (expectedTypes.includes(schemaType)) {
        return true;
      }
    }
    return false;
  }

  /*
   * @param {?Array|string} value
   * @return {Array}
   * @private
   */
  toArray_(value) {
    return Array.isArray(value) ? value : [value];
  }
}
class MetaParser {
  /**
   * @param {!DocInterface} doc
   */
  constructor(doc) {
    /** @private @const {!DocInterface} */
    this.doc_ = doc;
  }

  /**
   * @return {?PageConfig}
   */
  check() {
    if (!this.doc_.getBody()) {
      // Wait until the whole `<head>` is parsed.
      return null;
    }

    // Try to find product id.
    const productId = getMetaTag(this.doc_.getRootNode(), 'subscriptions-product-id');
    if (!productId) {
      return null;
    }

    // Is locked?
    const accessibleForFree = getMetaTag(this.doc_.getRootNode(), 'subscriptions-accessible-for-free');
    const locked = !!(accessibleForFree && accessibleForFree.toLowerCase() === 'false');
    return new _pageConfig.PageConfig(productId, locked);
  }
}
class JsonLdParser {
  /**
   * @param {!DocInterface} doc
   */
  constructor(doc) {
    /** @private @const {!DocInterface} */
    this.doc_ = doc;
    /** @private @const @function */
    this.checkType_ = new TypeChecker();
  }

  /**
   * @return {?PageConfig}
   */
  check() {
    if (!this.doc_.getBody()) {
      // Wait until the whole `<head>` is parsed.
      return null;
    }
    const domReady = this.doc_.isReady();

    // type: 'application/ld+json'
    const elements = this.doc_.getRootNode().querySelectorAll('script[type="application/ld+json"]');
    for (let i = 0; i < elements.length; i++) {
      const element = elements[i];
      if (element[ALREADY_SEEN] || !element.textContent || !domReady && !(0, _dom.hasNextNodeInDocumentOrder)(element)) {
        continue;
      }
      element[ALREADY_SEEN] = true;
      if (!RE_ALLOWED_TYPES.test(element.textContent)) {
        continue;
      }
      const possibleConfig = this.tryExtractConfig_(element);
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
  tryExtractConfig_(element) {
    let possibleConfigs = (0, _json.tryParseJson)(element.textContent);
    if (!possibleConfigs) {
      return null;
    }

    // Support arrays of JSON objects.
    if (!Array.isArray(possibleConfigs)) {
      possibleConfigs = [possibleConfigs];
    }
    let configs = /** @type {!Array<!JsonObject>} */possibleConfigs;
    for (let i = 0; i < configs.length; i++) {
      const config = configs[i];
      if (config['@graph'] && Array.isArray(config['@graph'])) {
        configs = configs.concat(config['@graph']);
      }

      // Must be an ALLOWED_TYPE
      if (!this.checkType_.checkValue(config['@type'], ALLOWED_TYPES)) {
        continue;
      }

      // Must have a isPartOf[@type=Product].
      let productId = null;
      const partOfArray = this.valueArray_(config, 'isPartOf');
      if (partOfArray) {
        for (let j = 0; j < partOfArray.length; j++) {
          productId = this.discoverProductId_(partOfArray[j]);
          if (productId) {
            break;
          }
        }
      }
      if (!productId) {
        continue;
      }

      // Found product id, just check for the access flag.
      const isAccessibleForFree = this.bool_(this.singleValue_(config, 'isAccessibleForFree'), /* default */true);
      return new _pageConfig.PageConfig(productId, !isAccessibleForFree);
    }
    return null;
  }

  /**
   * @param {*} value
   * @param {boolean} defaultValue
   * @return {boolean}
   */
  bool_(value, defaultValue) {
    if (typeof value === 'boolean') {
      return value;
    }
    if (typeof value === 'string') {
      const lowercase = value.toLowerCase();
      if (lowercase === 'false') {
        return false;
      }
      if (lowercase === 'true') {
        return true;
      }
    }
    return defaultValue;
  }

  /**
   * @param {!Object} json
   * @return {?string}
   */
  discoverProductId_(json) {
    // Must have type `Product`.
    if (!this.checkType_.checkValue(json['@type'], ['Product'])) {
      return null;
    }
    return (/** @type {?string} */this.singleValue_(json, 'productID')
    );
  }

  /**
   * @param {!Object} json
   * @param {string} name
   * @return {?Array}
   */
  valueArray_(json, name) {
    const value = json[name];
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
  singleValue_(json, name) {
    const valueArray = this.valueArray_(json, name);
    const value = valueArray && valueArray[0];
    return value == null || value === '' ? null : value;
  }
}
class MicrodataParser {
  /**
   * @param {!DocInterface} doc
   */
  constructor(doc) {
    /** @private @const {!DocInterface} */
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
  discoverAccess_(root) {
    const ALREADY_SEEN = 'alreadySeenForAccessInfo';
    const nodeList = root.querySelectorAll("[itemprop='isAccessibleForFree']");
    for (let i = 0; nodeList[i]; i++) {
      const element = nodeList[i];
      const content = element.getAttribute('content') || element.textContent;
      if (!content) {
        continue;
      }
      if (this.isValidElement_(element, root, ALREADY_SEEN)) {
        let accessForFree = null;
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
  isValidElement_(current, root, alreadySeen) {
    for (let node = current; node && !node[alreadySeen]; node = node.parentNode) {
      node[alreadySeen] = true;
      // document nodes don't have hasAttribute
      if (node.hasAttribute && node.hasAttribute('itemscope')) {
        /**{?string} */
        const type = node.getAttribute('itemtype');
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
  discoverProductId_(root) {
    const ALREADY_SEEN = 'alreadySeenForProductInfo';
    const nodeList = root.querySelectorAll('[itemprop="productID"]');
    for (let i = 0; nodeList[i]; i++) {
      const element = nodeList[i];
      const content = element.getAttribute('content') || element.textContent;
      const item = element.closest('[itemtype][itemscope]');
      const type = item.getAttribute('itemtype');
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
  getPageConfig_() {
    let locked = null;
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
  tryExtractConfig_() {
    let config = this.getPageConfig_();
    if (config) {
      return config;
    }

    // Grab all the nodes with an itemtype and filter for our allowed types
    const nodeList = Array.prototype.slice.call(this.doc_.getRootNode().querySelectorAll('[itemscope][itemtype]')).filter(node => this.checkType_.checkString(node.getAttribute('itemtype'), ALLOWED_TYPES));
    for (let i = 0; nodeList[i] && config == null; i++) {
      const element = nodeList[i];
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
  check() {
    if (!this.doc_.getBody()) {
      // Wait until the whole `<head>` is parsed.
      return null;
    }
    return this.tryExtractConfig_();
  }
}

/**
 * @param {!Node} rootNode
 * @return {?string}
 */
function getControlFlag(rootNode) {
  // Look for the flag in `meta`.
  const flag = getMetaTag(rootNode, CONTROL_FLAG);
  if (flag) {
    return flag;
  }
  // Look for the flag in `script`.
  const el = rootNode.querySelector(`script[${CONTROL_FLAG}]`);
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
  const el = rootNode.querySelector(`meta[name="${name}"]`);
  if (el) {
    return el.getAttribute('content');
  }
  return null;
}

},{"../utils/dom":71,"../utils/error-logger":72,"../utils/json":76,"../utils/log":78,"./doc":27,"./page-config":29}],29:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PageConfig = void 0;
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
class PageConfig {
  /**
   * @param {string} productOrPublicationId
   * @param {boolean} locked
   */
  constructor(productOrPublicationId, locked) {
    let publicationId, productId, label;
    const div = productOrPublicationId.indexOf(':');
    if (div != -1) {
      // The argument is a product id.
      productId = productOrPublicationId;
      publicationId = productId.substring(0, div);
      label = productId.substring(div + 1);
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
  getPublicationId() {
    return this.publicationId_;
  }

  /**
   * @return {?string}
   */
  getProductId() {
    return this.productId_;
  }

  /**
   * @return {?string}
   */
  getLabel() {
    return this.label_;
  }

  /**
   * @return {boolean}
   */
  isLocked() {
    return this.locked_;
  }
}
exports.PageConfig = PageConfig;

},{}],30:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ViewSubscriptionsResponse = exports.ToastCloseRequest = exports.Timestamp = exports.SurveyQuestion = exports.SurveyDataTransferResponse = exports.SurveyDataTransferRequest = exports.SurveyAnswer = exports.SubscriptionLinkingResponse = exports.SubscriptionLinkingCompleteResponse = exports.SubscribeResponse = exports.SmartBoxMessage = exports.SkuSelectedResponse = exports.ReaderSurfaceType = exports.OpenDialogRequest = exports.Message = exports.LinkingInfoResponse = exports.LinkSaveTokenRequest = exports.FinishedLoggingResponse = exports.EventParams = exports.EventOriginator = exports.EntitlementsResponse = exports.EntitlementsRequest = exports.EntitlementSource = exports.EntitlementResult = exports.EntitlementJwt = exports.CompleteAudienceActionResponse = exports.AudienceActivityClientLogsRequest = exports.AnalyticsRequest = exports.AnalyticsEventMeta = exports.AnalyticsEvent = exports.AnalyticsContext = exports.AlreadySubscribedResponse = exports.ActionType = exports.ActionRequest = exports.AccountCreationRequest = void 0;
exports.deserialize = deserialize;
exports.getLabel = getLabel;
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
 * @fileoverview Protos for SwG client/iframe messaging
 * Auto generated, do not edit
 */

/**
 * @interface
 */
class Message {
  /**
   * @return {string}
   */
  label() {}

  /**
   * @param {boolean=} unusedIncludeLabel
   * @return {!Array<*>}
   */
  toArray() {
    let unusedIncludeLabel = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;
  }
}
/** @enum {number} */
exports.Message = Message;
const ActionType = {
  ACTION_TYPE_UNKNOWN: 0,
  ACTION_TYPE_RELOAD_PAGE: 1,
  ACTION_TYPE_UPDATE_COUNTER: 2
};
/** @enum {number} */
exports.ActionType = ActionType;
const AnalyticsEvent = {
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
  IMPRESSION_METER_TOAST: 21,
  IMPRESSION_REGWALL: 22,
  IMPRESSION_SHOWCASE_REGWALL: 23,
  IMPRESSION_SWG_SUBSCRIPTION_MINI_PROMPT: 24,
  IMPRESSION_SWG_CONTRIBUTION_MINI_PROMPT: 25,
  IMPRESSION_CONTRIBUTION_OFFERS: 26,
  IMPRESSION_TWG_COUNTER: 27,
  IMPRESSION_TWG_SITE_SUPPORTER_WALL: 28,
  IMPRESSION_TWG_PUBLICATION: 29,
  IMPRESSION_TWG_STATIC_BUTTON: 30,
  IMPRESSION_TWG_DYNAMIC_BUTTON: 31,
  IMPRESSION_TWG_STICKER_SELECTION_SCREEN: 32,
  IMPRESSION_TWG_PUBLICATION_NOT_SET_UP: 33,
  IMPRESSION_REGWALL_OPT_IN: 34,
  IMPRESSION_NEWSLETTER_OPT_IN: 35,
  IMPRESSION_SUBSCRIPTION_OFFERS_ERROR: 36,
  IMPRESSION_CONTRIBUTION_OFFERS_ERROR: 37,
  IMPRESSION_TWG_SHORTENED_STICKER_FLOW: 38,
  IMPRESSION_SUBSCRIPTION_LINKING_LOADING: 39,
  IMPRESSION_SUBSCRIPTION_LINKING_COMPLETE: 40,
  IMPRESSION_SUBSCRIPTION_LINKING_ERROR: 41,
  IMPRESSION_SURVEY: 42,
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
  ACTION_METER_TOAST_SUBSCRIBE_CLICK: 1025,
  ACTION_METER_TOAST_EXPANDED: 1026,
  ACTION_METER_TOAST_CLOSED_BY_ARTICLE_INTERACTION: 1027,
  ACTION_METER_TOAST_CLOSED_BY_SWIPE_DOWN: 1028,
  ACTION_METER_TOAST_CLOSED_BY_X_CLICKED: 1029,
  ACTION_SWG_SUBSCRIPTION_MINI_PROMPT_CLICK: 1030,
  ACTION_SWG_CONTRIBUTION_MINI_PROMPT_CLICK: 1031,
  ACTION_SWG_SUBSCRIPTION_MINI_PROMPT_CLOSE: 1032,
  ACTION_SWG_CONTRIBUTION_MINI_PROMPT_CLOSE: 1033,
  ACTION_CONTRIBUTION_OFFER_SELECTED: 1034,
  ACTION_SHOWCASE_REGWALL_GSI_CLICK: 1035,
  ACTION_SHOWCASE_REGWALL_EXISTING_ACCOUNT_CLICK: 1036,
  ACTION_SUBSCRIPTION_OFFERS_CLOSED: 1037,
  ACTION_CONTRIBUTION_OFFERS_CLOSED: 1038,
  ACTION_TWG_STATIC_CTA_CLICK: 1039,
  ACTION_TWG_DYNAMIC_CTA_CLICK: 1040,
  ACTION_TWG_SITE_LEVEL_SUPPORTER_WALL_CTA_CLICK: 1041,
  ACTION_TWG_DIALOG_SUPPORTER_WALL_CTA_CLICK: 1042,
  ACTION_TWG_COUNTER_CLICK: 1043,
  ACTION_TWG_SITE_SUPPORTER_WALL_ALL_THANKS_CLICK: 1044,
  ACTION_TWG_PAID_STICKER_SELECTED_SCREEN_CLOSE_CLICK: 1045,
  ACTION_TWG_PAID_STICKER_SELECTION_CLICK: 1046,
  ACTION_TWG_FREE_STICKER_SELECTION_CLICK: 1047,
  ACTION_TWG_MINI_SUPPORTER_WALL_CLICK: 1048,
  ACTION_TWG_CREATOR_BENEFIT_CLICK: 1049,
  ACTION_TWG_FREE_TRANSACTION_START_NEXT_BUTTON_CLICK: 1050,
  ACTION_TWG_PAID_TRANSACTION_START_NEXT_BUTTON_CLICK: 1051,
  ACTION_TWG_STICKER_SELECTION_SCREEN_CLOSE_CLICK: 1052,
  ACTION_TWG_ARTICLE_LEVEL_SUPPORTER_WALL_CTA_CLICK: 1053,
  ACTION_REGWALL_OPT_IN_BUTTON_CLICK: 1054,
  ACTION_REGWALL_ALREADY_OPTED_IN_CLICK: 1055,
  ACTION_NEWSLETTER_OPT_IN_BUTTON_CLICK: 1056,
  ACTION_NEWSLETTER_ALREADY_OPTED_IN_CLICK: 1057,
  ACTION_REGWALL_OPT_IN_CLOSE: 1058,
  ACTION_NEWSLETTER_OPT_IN_CLOSE: 1059,
  ACTION_SHOWCASE_REGWALL_SWIG_CLICK: 1060,
  ACTION_TWG_CHROME_APP_MENU_ENTRY_POINT_CLICK: 1061,
  ACTION_TWG_DISCOVER_FEED_MENU_ENTRY_POINT_CLICK: 1062,
  ACTION_SHOWCASE_REGWALL_3P_BUTTON_CLICK: 1063,
  ACTION_SUBSCRIPTION_OFFERS_RETRY: 1064,
  ACTION_CONTRIBUTION_OFFERS_RETRY: 1065,
  ACTION_TWG_SHORTENED_STICKER_FLOW_STICKER_SELECTION_CLICK: 1066,
  ACTION_INITIATE_UPDATED_SUBSCRIPTION_LINKING: 1067,
  ACTION_SURVEY_SUBMIT_CLICK: 1068,
  ACTION_SURVEY_CLOSED: 1069,
  ACTION_SURVEY_DATA_TRANSFER: 1070,
  EVENT_PAYMENT_FAILED: 2000,
  EVENT_REGWALL_OPT_IN_FAILED: 2001,
  EVENT_NEWSLETTER_OPT_IN_FAILED: 2002,
  EVENT_REGWALL_ALREADY_OPT_IN: 2003,
  EVENT_NEWSLETTER_ALREADY_OPT_IN: 2004,
  EVENT_SUBSCRIPTION_LINKING_FAILED: 2005,
  EVENT_SURVEY_ALREADY_SUBMITTED: 2006,
  EVENT_SURVEY_SUBMIT_FAILED: 2007,
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
  EVENT_OFFERED_METER: 3011,
  EVENT_UNLOCKED_FREE_PAGE: 3012,
  EVENT_INELIGIBLE_PAYWALL: 3013,
  EVENT_UNLOCKED_FOR_CRAWLER: 3014,
  EVENT_TWG_COUNTER_VIEW: 3015,
  EVENT_TWG_SITE_SUPPORTER_WALL_VIEW: 3016,
  EVENT_TWG_STATIC_BUTTON_VIEW: 3017,
  EVENT_TWG_DYNAMIC_BUTTON_VIEW: 3018,
  EVENT_TWG_PRE_TRANSACTION_PRIVACY_SETTING_PRIVATE: 3019,
  EVENT_TWG_POST_TRANSACTION_SETTING_PRIVATE: 3020,
  EVENT_TWG_PRE_TRANSACTION_PRIVACY_SETTING_PUBLIC: 3021,
  EVENT_TWG_POST_TRANSACTION_SETTING_PUBLIC: 3022,
  EVENT_REGWALL_OPTED_IN: 3023,
  EVENT_NEWSLETTER_OPTED_IN: 3024,
  EVENT_SHOWCASE_METERING_INIT: 3025,
  EVENT_DISABLE_MINIPROMPT_DESKTOP: 3026,
  EVENT_SUBSCRIPTION_LINKING_SUCCESS: 3027,
  EVENT_SURVEY_SUBMITTED: 3028,
  EVENT_SUBSCRIPTION_STATE: 4000
};
/** @enum {number} */
exports.AnalyticsEvent = AnalyticsEvent;
const EntitlementResult = {
  UNKNOWN_ENTITLEMENT_RESULT: 0,
  UNLOCKED_SUBSCRIBER: 1001,
  UNLOCKED_FREE: 1002,
  UNLOCKED_METER: 1003,
  LOCKED_REGWALL: 2001,
  LOCKED_PAYWALL: 2002,
  INELIGIBLE_PAYWALL: 2003
};
/** @enum {number} */
exports.EntitlementResult = EntitlementResult;
const EntitlementSource = {
  UNKNOWN_ENTITLEMENT_SOURCE: 0,
  GOOGLE_SUBSCRIBER_ENTITLEMENT: 1001,
  GOOGLE_SHOWCASE_METERING_SERVICE: 2001,
  SUBSCRIBE_WITH_GOOGLE_METERING_SERVICE: 2002,
  PUBLISHER_ENTITLEMENT: 3001
};
/** @enum {number} */
exports.EntitlementSource = EntitlementSource;
const EventOriginator = {
  UNKNOWN_CLIENT: 0,
  SWG_CLIENT: 1,
  AMP_CLIENT: 2,
  PROPENSITY_CLIENT: 3,
  SWG_SERVER: 4,
  PUBLISHER_CLIENT: 5,
  SHOWCASE_CLIENT: 6
};
/** @enum {number} */
exports.EventOriginator = EventOriginator;
const ReaderSurfaceType = {
  READER_SURFACE_TYPE_UNSPECIFIED: 0,
  READER_SURFACE_WORDPRESS: 1,
  READER_SURFACE_CHROME: 2,
  READER_SURFACE_TENOR: 3
};

/**
 * @implements {Message}
 */
exports.ReaderSurfaceType = ReaderSurfaceType;
class AccountCreationRequest {
  /**
   * @param {!Array<*>=} data
   * @param {boolean=} includesLabel
   */
  constructor() {
    let data = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
    let includesLabel = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
    const base = includesLabel ? 1 : 0;

    /** @private {?boolean} */
    this.complete_ = data[base] == null ? null : data[base];
  }

  /**
   * @return {?boolean}
   */
  getComplete() {
    return this.complete_;
  }

  /**
   * @param {boolean} value
   */
  setComplete(value) {
    this.complete_ = value;
  }

  /**
   * @param {boolean=} includeLabel
   * @return {!Array<?>}
   * @override
   */
  toArray() {
    let includeLabel = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;
    const arr = [this.complete_ // field 1 - complete
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
  label() {
    return 'AccountCreationRequest';
  }
}

/**
 * @implements {Message}
 */
exports.AccountCreationRequest = AccountCreationRequest;
class ActionRequest {
  /**
   * @param {!Array<*>=} data
   * @param {boolean=} includesLabel
   */
  constructor() {
    let data = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
    let includesLabel = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
    const base = includesLabel ? 1 : 0;

    /** @private {?ActionType} */
    this.action_ = data[base] == null ? null : data[base];
  }

  /**
   * @return {?ActionType}
   */
  getAction() {
    return this.action_;
  }

  /**
   * @param {!ActionType} value
   */
  setAction(value) {
    this.action_ = value;
  }

  /**
   * @param {boolean=} includeLabel
   * @return {!Array<?>}
   * @override
   */
  toArray() {
    let includeLabel = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;
    const arr = [this.action_ // field 1 - action
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
  label() {
    return 'ActionRequest';
  }
}

/**
 * @implements {Message}
 */
exports.ActionRequest = ActionRequest;
class AlreadySubscribedResponse {
  /**
   * @param {!Array<*>=} data
   * @param {boolean=} includesLabel
   */
  constructor() {
    let data = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
    let includesLabel = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
    const base = includesLabel ? 1 : 0;

    /** @private {?boolean} */
    this.subscriberOrMember_ = data[base] == null ? null : data[base];

    /** @private {?boolean} */
    this.linkRequested_ = data[1 + base] == null ? null : data[1 + base];
  }

  /**
   * @return {?boolean}
   */
  getSubscriberOrMember() {
    return this.subscriberOrMember_;
  }

  /**
   * @param {boolean} value
   */
  setSubscriberOrMember(value) {
    this.subscriberOrMember_ = value;
  }

  /**
   * @return {?boolean}
   */
  getLinkRequested() {
    return this.linkRequested_;
  }

  /**
   * @param {boolean} value
   */
  setLinkRequested(value) {
    this.linkRequested_ = value;
  }

  /**
   * @param {boolean=} includeLabel
   * @return {!Array<?>}
   * @override
   */
  toArray() {
    let includeLabel = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;
    const arr = [this.subscriberOrMember_,
    // field 1 - subscriber_or_member
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
  label() {
    return 'AlreadySubscribedResponse';
  }
}

/**
 * @implements {Message}
 */
exports.AlreadySubscribedResponse = AlreadySubscribedResponse;
class AnalyticsContext {
  /**
   * @param {!Array<*>=} data
   * @param {boolean=} includesLabel
   */
  constructor() {
    let data = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
    let includesLabel = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
    const base = includesLabel ? 1 : 0;

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

    /** @private {?Timestamp} */
    this.clientTimestamp_ = data[11 + base] == null || data[11 + base] == undefined ? null : new Timestamp(data[11 + base], includesLabel);

    /** @private {?ReaderSurfaceType} */
    this.readerSurfaceType_ = data[12 + base] == null ? null : data[12 + base];

    /** @private {?string} */
    this.integrationVersion_ = data[13 + base] == null ? null : data[13 + base];
  }

  /**
   * @return {?string}
   */
  getEmbedderOrigin() {
    return this.embedderOrigin_;
  }

  /**
   * @param {string} value
   */
  setEmbedderOrigin(value) {
    this.embedderOrigin_ = value;
  }

  /**
   * @return {?string}
   */
  getTransactionId() {
    return this.transactionId_;
  }

  /**
   * @param {string} value
   */
  setTransactionId(value) {
    this.transactionId_ = value;
  }

  /**
   * @return {?string}
   */
  getReferringOrigin() {
    return this.referringOrigin_;
  }

  /**
   * @param {string} value
   */
  setReferringOrigin(value) {
    this.referringOrigin_ = value;
  }

  /**
   * @return {?string}
   */
  getUtmSource() {
    return this.utmSource_;
  }

  /**
   * @param {string} value
   */
  setUtmSource(value) {
    this.utmSource_ = value;
  }

  /**
   * @return {?string}
   */
  getUtmCampaign() {
    return this.utmCampaign_;
  }

  /**
   * @param {string} value
   */
  setUtmCampaign(value) {
    this.utmCampaign_ = value;
  }

  /**
   * @return {?string}
   */
  getUtmMedium() {
    return this.utmMedium_;
  }

  /**
   * @param {string} value
   */
  setUtmMedium(value) {
    this.utmMedium_ = value;
  }

  /**
   * @return {?string}
   */
  getSku() {
    return this.sku_;
  }

  /**
   * @param {string} value
   */
  setSku(value) {
    this.sku_ = value;
  }

  /**
   * @return {?boolean}
   */
  getReadyToPay() {
    return this.readyToPay_;
  }

  /**
   * @param {boolean} value
   */
  setReadyToPay(value) {
    this.readyToPay_ = value;
  }

  /**
   * @return {!Array<string>}
   */
  getLabelList() {
    return this.label_;
  }

  /**
   * @param {!Array<string>} value
   */
  setLabelList(value) {
    this.label_ = value;
  }

  /**
   * @return {?string}
   */
  getClientVersion() {
    return this.clientVersion_;
  }

  /**
   * @param {string} value
   */
  setClientVersion(value) {
    this.clientVersion_ = value;
  }

  /**
   * @return {?string}
   */
  getUrl() {
    return this.url_;
  }

  /**
   * @param {string} value
   */
  setUrl(value) {
    this.url_ = value;
  }

  /**
   * @return {?Timestamp}
   */
  getClientTimestamp() {
    return this.clientTimestamp_;
  }

  /**
   * @param {!Timestamp} value
   */
  setClientTimestamp(value) {
    this.clientTimestamp_ = value;
  }

  /**
   * @return {?ReaderSurfaceType}
   */
  getReaderSurfaceType() {
    return this.readerSurfaceType_;
  }

  /**
   * @param {!ReaderSurfaceType} value
   */
  setReaderSurfaceType(value) {
    this.readerSurfaceType_ = value;
  }

  /**
   * @return {?string}
   */
  getIntegrationVersion() {
    return this.integrationVersion_;
  }

  /**
   * @param {string} value
   */
  setIntegrationVersion(value) {
    this.integrationVersion_ = value;
  }

  /**
   * @param {boolean=} includeLabel
   * @return {!Array<?>}
   * @override
   */
  toArray() {
    let includeLabel = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;
    const arr = [this.embedderOrigin_,
    // field 1 - embedder_origin
    this.transactionId_,
    // field 2 - transaction_id
    this.referringOrigin_,
    // field 3 - referring_origin
    this.utmSource_,
    // field 4 - utm_source
    this.utmCampaign_,
    // field 5 - utm_campaign
    this.utmMedium_,
    // field 6 - utm_medium
    this.sku_,
    // field 7 - sku
    this.readyToPay_,
    // field 8 - ready_to_pay
    this.label_,
    // field 9 - label
    this.clientVersion_,
    // field 10 - client_version
    this.url_,
    // field 11 - url
    this.clientTimestamp_ ? this.clientTimestamp_.toArray(includeLabel) : [],
    // field 12 - client_timestamp
    this.readerSurfaceType_,
    // field 13 - reader_surface_type
    this.integrationVersion_ // field 14 - integration_version
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
  label() {
    return 'AnalyticsContext';
  }
}

/**
 * @implements {Message}
 */
exports.AnalyticsContext = AnalyticsContext;
class AnalyticsEventMeta {
  /**
   * @param {!Array<*>=} data
   * @param {boolean=} includesLabel
   */
  constructor() {
    let data = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
    let includesLabel = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
    const base = includesLabel ? 1 : 0;

    /** @private {?EventOriginator} */
    this.eventOriginator_ = data[base] == null ? null : data[base];

    /** @private {?boolean} */
    this.isFromUserAction_ = data[1 + base] == null ? null : data[1 + base];
  }

  /**
   * @return {?EventOriginator}
   */
  getEventOriginator() {
    return this.eventOriginator_;
  }

  /**
   * @param {!EventOriginator} value
   */
  setEventOriginator(value) {
    this.eventOriginator_ = value;
  }

  /**
   * @return {?boolean}
   */
  getIsFromUserAction() {
    return this.isFromUserAction_;
  }

  /**
   * @param {boolean} value
   */
  setIsFromUserAction(value) {
    this.isFromUserAction_ = value;
  }

  /**
   * @param {boolean=} includeLabel
   * @return {!Array<?>}
   * @override
   */
  toArray() {
    let includeLabel = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;
    const arr = [this.eventOriginator_,
    // field 1 - event_originator
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
  label() {
    return 'AnalyticsEventMeta';
  }
}

/**
 * @implements {Message}
 */
exports.AnalyticsEventMeta = AnalyticsEventMeta;
class AnalyticsRequest {
  /**
   * @param {!Array<*>=} data
   * @param {boolean=} includesLabel
   */
  constructor() {
    let data = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
    let includesLabel = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
    const base = includesLabel ? 1 : 0;

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
  getContext() {
    return this.context_;
  }

  /**
   * @param {!AnalyticsContext} value
   */
  setContext(value) {
    this.context_ = value;
  }

  /**
   * @return {?AnalyticsEvent}
   */
  getEvent() {
    return this.event_;
  }

  /**
   * @param {!AnalyticsEvent} value
   */
  setEvent(value) {
    this.event_ = value;
  }

  /**
   * @return {?AnalyticsEventMeta}
   */
  getMeta() {
    return this.meta_;
  }

  /**
   * @param {!AnalyticsEventMeta} value
   */
  setMeta(value) {
    this.meta_ = value;
  }

  /**
   * @return {?EventParams}
   */
  getParams() {
    return this.params_;
  }

  /**
   * @param {!EventParams} value
   */
  setParams(value) {
    this.params_ = value;
  }

  /**
   * @param {boolean=} includeLabel
   * @return {!Array<?>}
   * @override
   */
  toArray() {
    let includeLabel = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;
    const arr = [this.context_ ? this.context_.toArray(includeLabel) : [],
    // field 1 - context
    this.event_,
    // field 2 - event
    this.meta_ ? this.meta_.toArray(includeLabel) : [],
    // field 3 - meta
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
  label() {
    return 'AnalyticsRequest';
  }
}

/**
 * @implements {Message}
 */
exports.AnalyticsRequest = AnalyticsRequest;
class AudienceActivityClientLogsRequest {
  /**
   * @param {!Array<*>=} data
   * @param {boolean=} includesLabel
   */
  constructor() {
    let data = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
    let includesLabel = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
    const base = includesLabel ? 1 : 0;

    /** @private {?AnalyticsEvent} */
    this.event_ = data[base] == null ? null : data[base];
  }

  /**
   * @return {?AnalyticsEvent}
   */
  getEvent() {
    return this.event_;
  }

  /**
   * @param {!AnalyticsEvent} value
   */
  setEvent(value) {
    this.event_ = value;
  }

  /**
   * @param {boolean=} includeLabel
   * @return {!Array<?>}
   * @override
   */
  toArray() {
    let includeLabel = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;
    const arr = [this.event_ // field 1 - event
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
  label() {
    return 'AudienceActivityClientLogsRequest';
  }
}

/**
 * @implements {Message}
 */
exports.AudienceActivityClientLogsRequest = AudienceActivityClientLogsRequest;
class CompleteAudienceActionResponse {
  /**
   * @param {!Array<*>=} data
   * @param {boolean=} includesLabel
   */
  constructor() {
    let data = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
    let includesLabel = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
    const base = includesLabel ? 1 : 0;

    /** @private {?string} */
    this.swgUserToken_ = data[base] == null ? null : data[base];

    /** @private {?boolean} */
    this.actionCompleted_ = data[1 + base] == null ? null : data[1 + base];

    /** @private {?string} */
    this.userEmail_ = data[2 + base] == null ? null : data[2 + base];

    /** @private {?boolean} */
    this.alreadyCompleted_ = data[3 + base] == null ? null : data[3 + base];
  }

  /**
   * @return {?string}
   */
  getSwgUserToken() {
    return this.swgUserToken_;
  }

  /**
   * @param {string} value
   */
  setSwgUserToken(value) {
    this.swgUserToken_ = value;
  }

  /**
   * @return {?boolean}
   */
  getActionCompleted() {
    return this.actionCompleted_;
  }

  /**
   * @param {boolean} value
   */
  setActionCompleted(value) {
    this.actionCompleted_ = value;
  }

  /**
   * @return {?string}
   */
  getUserEmail() {
    return this.userEmail_;
  }

  /**
   * @param {string} value
   */
  setUserEmail(value) {
    this.userEmail_ = value;
  }

  /**
   * @return {?boolean}
   */
  getAlreadyCompleted() {
    return this.alreadyCompleted_;
  }

  /**
   * @param {boolean} value
   */
  setAlreadyCompleted(value) {
    this.alreadyCompleted_ = value;
  }

  /**
   * @param {boolean=} includeLabel
   * @return {!Array<?>}
   * @override
   */
  toArray() {
    let includeLabel = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;
    const arr = [this.swgUserToken_,
    // field 1 - swg_user_token
    this.actionCompleted_,
    // field 2 - action_completed
    this.userEmail_,
    // field 3 - user_email
    this.alreadyCompleted_ // field 4 - already_completed
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
  label() {
    return 'CompleteAudienceActionResponse';
  }
}

/**
 * @implements {Message}
 */
exports.CompleteAudienceActionResponse = CompleteAudienceActionResponse;
class EntitlementJwt {
  /**
   * @param {!Array<*>=} data
   * @param {boolean=} includesLabel
   */
  constructor() {
    let data = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
    let includesLabel = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
    const base = includesLabel ? 1 : 0;

    /** @private {?string} */
    this.jwt_ = data[base] == null ? null : data[base];

    /** @private {?string} */
    this.source_ = data[1 + base] == null ? null : data[1 + base];
  }

  /**
   * @return {?string}
   */
  getJwt() {
    return this.jwt_;
  }

  /**
   * @param {string} value
   */
  setJwt(value) {
    this.jwt_ = value;
  }

  /**
   * @return {?string}
   */
  getSource() {
    return this.source_;
  }

  /**
   * @param {string} value
   */
  setSource(value) {
    this.source_ = value;
  }

  /**
   * @param {boolean=} includeLabel
   * @return {!Array<?>}
   * @override
   */
  toArray() {
    let includeLabel = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;
    const arr = [this.jwt_,
    // field 1 - jwt
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
  label() {
    return 'EntitlementJwt';
  }
}

/**
 * @implements {Message}
 */
exports.EntitlementJwt = EntitlementJwt;
class EntitlementsRequest {
  /**
   * @param {!Array<*>=} data
   * @param {boolean=} includesLabel
   */
  constructor() {
    let data = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
    let includesLabel = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
    const base = includesLabel ? 1 : 0;

    /** @private {?EntitlementJwt} */
    this.usedEntitlement_ = data[base] == null || data[base] == undefined ? null : new EntitlementJwt(data[base], includesLabel);

    /** @private {?Timestamp} */
    this.clientEventTime_ = data[1 + base] == null || data[1 + base] == undefined ? null : new Timestamp(data[1 + base], includesLabel);

    /** @private {?EntitlementSource} */
    this.entitlementSource_ = data[2 + base] == null ? null : data[2 + base];

    /** @private {?EntitlementResult} */
    this.entitlementResult_ = data[3 + base] == null ? null : data[3 + base];

    /** @private {?string} */
    this.token_ = data[4 + base] == null ? null : data[4 + base];

    /** @private {?boolean} */
    this.isUserRegistered_ = data[5 + base] == null ? null : data[5 + base];

    /** @private {?Timestamp} */
    this.subscriptionTimestamp_ = data[6 + base] == null || data[6 + base] == undefined ? null : new Timestamp(data[6 + base], includesLabel);
  }

  /**
   * @return {?EntitlementJwt}
   */
  getUsedEntitlement() {
    return this.usedEntitlement_;
  }

  /**
   * @param {!EntitlementJwt} value
   */
  setUsedEntitlement(value) {
    this.usedEntitlement_ = value;
  }

  /**
   * @return {?Timestamp}
   */
  getClientEventTime() {
    return this.clientEventTime_;
  }

  /**
   * @param {!Timestamp} value
   */
  setClientEventTime(value) {
    this.clientEventTime_ = value;
  }

  /**
   * @return {?EntitlementSource}
   */
  getEntitlementSource() {
    return this.entitlementSource_;
  }

  /**
   * @param {!EntitlementSource} value
   */
  setEntitlementSource(value) {
    this.entitlementSource_ = value;
  }

  /**
   * @return {?EntitlementResult}
   */
  getEntitlementResult() {
    return this.entitlementResult_;
  }

  /**
   * @param {!EntitlementResult} value
   */
  setEntitlementResult(value) {
    this.entitlementResult_ = value;
  }

  /**
   * @return {?string}
   */
  getToken() {
    return this.token_;
  }

  /**
   * @param {string} value
   */
  setToken(value) {
    this.token_ = value;
  }

  /**
   * @return {?boolean}
   */
  getIsUserRegistered() {
    return this.isUserRegistered_;
  }

  /**
   * @param {boolean} value
   */
  setIsUserRegistered(value) {
    this.isUserRegistered_ = value;
  }

  /**
   * @return {?Timestamp}
   */
  getSubscriptionTimestamp() {
    return this.subscriptionTimestamp_;
  }

  /**
   * @param {!Timestamp} value
   */
  setSubscriptionTimestamp(value) {
    this.subscriptionTimestamp_ = value;
  }

  /**
   * @param {boolean=} includeLabel
   * @return {!Array<?>}
   * @override
   */
  toArray() {
    let includeLabel = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;
    const arr = [this.usedEntitlement_ ? this.usedEntitlement_.toArray(includeLabel) : [],
    // field 1 - used_entitlement
    this.clientEventTime_ ? this.clientEventTime_.toArray(includeLabel) : [],
    // field 2 - client_event_time
    this.entitlementSource_,
    // field 3 - entitlement_source
    this.entitlementResult_,
    // field 4 - entitlement_result
    this.token_,
    // field 5 - token
    this.isUserRegistered_,
    // field 6 - is_user_registered
    this.subscriptionTimestamp_ ? this.subscriptionTimestamp_.toArray(includeLabel) : [] // field 7 - subscription_timestamp
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
  label() {
    return 'EntitlementsRequest';
  }
}

/**
 * @implements {Message}
 */
exports.EntitlementsRequest = EntitlementsRequest;
class EntitlementsResponse {
  /**
   * @param {!Array<*>=} data
   * @param {boolean=} includesLabel
   */
  constructor() {
    let data = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
    let includesLabel = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
    const base = includesLabel ? 1 : 0;

    /** @private {?string} */
    this.jwt_ = data[base] == null ? null : data[base];

    /** @private {?string} */
    this.swgUserToken_ = data[1 + base] == null ? null : data[1 + base];
  }

  /**
   * @return {?string}
   */
  getJwt() {
    return this.jwt_;
  }

  /**
   * @param {string} value
   */
  setJwt(value) {
    this.jwt_ = value;
  }

  /**
   * @return {?string}
   */
  getSwgUserToken() {
    return this.swgUserToken_;
  }

  /**
   * @param {string} value
   */
  setSwgUserToken(value) {
    this.swgUserToken_ = value;
  }

  /**
   * @param {boolean=} includeLabel
   * @return {!Array<?>}
   * @override
   */
  toArray() {
    let includeLabel = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;
    const arr = [this.jwt_,
    // field 1 - jwt
    this.swgUserToken_ // field 2 - swg_user_token
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
  label() {
    return 'EntitlementsResponse';
  }
}

/**
 * @implements {Message}
 */
exports.EntitlementsResponse = EntitlementsResponse;
class EventParams {
  /**
   * @param {!Array<*>=} data
   * @param {boolean=} includesLabel
   */
  constructor() {
    let data = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
    let includesLabel = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
    const base = includesLabel ? 1 : 0;

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

    /** @private {?boolean} */
    this.isUserRegistered_ = data[5 + base] == null ? null : data[5 + base];

    /** @private {?string} */
    this.subscriptionFlow_ = data[6 + base] == null ? null : data[6 + base];

    /** @private {?Timestamp} */
    this.subscriptionTimestamp_ = data[7 + base] == null || data[7 + base] == undefined ? null : new Timestamp(data[7 + base], includesLabel);
  }

  /**
   * @return {?string}
   */
  getSmartboxMessage() {
    return this.smartboxMessage_;
  }

  /**
   * @param {string} value
   */
  setSmartboxMessage(value) {
    this.smartboxMessage_ = value;
  }

  /**
   * @return {?string}
   */
  getGpayTransactionId() {
    return this.gpayTransactionId_;
  }

  /**
   * @param {string} value
   */
  setGpayTransactionId(value) {
    this.gpayTransactionId_ = value;
  }

  /**
   * @return {?boolean}
   */
  getHadLogged() {
    return this.hadLogged_;
  }

  /**
   * @param {boolean} value
   */
  setHadLogged(value) {
    this.hadLogged_ = value;
  }

  /**
   * @return {?string}
   */
  getSku() {
    return this.sku_;
  }

  /**
   * @param {string} value
   */
  setSku(value) {
    this.sku_ = value;
  }

  /**
   * @return {?string}
   */
  getOldTransactionId() {
    return this.oldTransactionId_;
  }

  /**
   * @param {string} value
   */
  setOldTransactionId(value) {
    this.oldTransactionId_ = value;
  }

  /**
   * @return {?boolean}
   */
  getIsUserRegistered() {
    return this.isUserRegistered_;
  }

  /**
   * @param {boolean} value
   */
  setIsUserRegistered(value) {
    this.isUserRegistered_ = value;
  }

  /**
   * @return {?string}
   */
  getSubscriptionFlow() {
    return this.subscriptionFlow_;
  }

  /**
   * @param {string} value
   */
  setSubscriptionFlow(value) {
    this.subscriptionFlow_ = value;
  }

  /**
   * @return {?Timestamp}
   */
  getSubscriptionTimestamp() {
    return this.subscriptionTimestamp_;
  }

  /**
   * @param {!Timestamp} value
   */
  setSubscriptionTimestamp(value) {
    this.subscriptionTimestamp_ = value;
  }

  /**
   * @param {boolean=} includeLabel
   * @return {!Array<?>}
   * @override
   */
  toArray() {
    let includeLabel = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;
    const arr = [this.smartboxMessage_,
    // field 1 - smartbox_message
    this.gpayTransactionId_,
    // field 2 - gpay_transaction_id
    this.hadLogged_,
    // field 3 - had_logged
    this.sku_,
    // field 4 - sku
    this.oldTransactionId_,
    // field 5 - old_transaction_id
    this.isUserRegistered_,
    // field 6 - is_user_registered
    this.subscriptionFlow_,
    // field 7 - subscription_flow
    this.subscriptionTimestamp_ ? this.subscriptionTimestamp_.toArray(includeLabel) : [] // field 8 - subscription_timestamp
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
  label() {
    return 'EventParams';
  }
}

/**
 * @implements {Message}
 */
exports.EventParams = EventParams;
class FinishedLoggingResponse {
  /**
   * @param {!Array<*>=} data
   * @param {boolean=} includesLabel
   */
  constructor() {
    let data = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
    let includesLabel = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
    const base = includesLabel ? 1 : 0;

    /** @private {?boolean} */
    this.complete_ = data[base] == null ? null : data[base];

    /** @private {?string} */
    this.error_ = data[1 + base] == null ? null : data[1 + base];
  }

  /**
   * @return {?boolean}
   */
  getComplete() {
    return this.complete_;
  }

  /**
   * @param {boolean} value
   */
  setComplete(value) {
    this.complete_ = value;
  }

  /**
   * @return {?string}
   */
  getError() {
    return this.error_;
  }

  /**
   * @param {string} value
   */
  setError(value) {
    this.error_ = value;
  }

  /**
   * @param {boolean=} includeLabel
   * @return {!Array<?>}
   * @override
   */
  toArray() {
    let includeLabel = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;
    const arr = [this.complete_,
    // field 1 - complete
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
  label() {
    return 'FinishedLoggingResponse';
  }
}

/**
 * @implements {Message}
 */
exports.FinishedLoggingResponse = FinishedLoggingResponse;
class LinkSaveTokenRequest {
  /**
   * @param {!Array<*>=} data
   * @param {boolean=} includesLabel
   */
  constructor() {
    let data = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
    let includesLabel = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
    const base = includesLabel ? 1 : 0;

    /** @private {?string} */
    this.authCode_ = data[base] == null ? null : data[base];

    /** @private {?string} */
    this.token_ = data[1 + base] == null ? null : data[1 + base];
  }

  /**
   * @return {?string}
   */
  getAuthCode() {
    return this.authCode_;
  }

  /**
   * @param {string} value
   */
  setAuthCode(value) {
    this.authCode_ = value;
  }

  /**
   * @return {?string}
   */
  getToken() {
    return this.token_;
  }

  /**
   * @param {string} value
   */
  setToken(value) {
    this.token_ = value;
  }

  /**
   * @param {boolean=} includeLabel
   * @return {!Array<?>}
   * @override
   */
  toArray() {
    let includeLabel = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;
    const arr = [this.authCode_,
    // field 1 - auth_code
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
  label() {
    return 'LinkSaveTokenRequest';
  }
}

/**
 * @implements {Message}
 */
exports.LinkSaveTokenRequest = LinkSaveTokenRequest;
class LinkingInfoResponse {
  /**
   * @param {!Array<*>=} data
   * @param {boolean=} includesLabel
   */
  constructor() {
    let data = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
    let includesLabel = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
    const base = includesLabel ? 1 : 0;

    /** @private {?boolean} */
    this.requested_ = data[base] == null ? null : data[base];
  }

  /**
   * @return {?boolean}
   */
  getRequested() {
    return this.requested_;
  }

  /**
   * @param {boolean} value
   */
  setRequested(value) {
    this.requested_ = value;
  }

  /**
   * @param {boolean=} includeLabel
   * @return {!Array<?>}
   * @override
   */
  toArray() {
    let includeLabel = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;
    const arr = [this.requested_ // field 1 - requested
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
  label() {
    return 'LinkingInfoResponse';
  }
}

/**
 * @implements {Message}
 */
exports.LinkingInfoResponse = LinkingInfoResponse;
class OpenDialogRequest {
  /**
   * @param {!Array<*>=} data
   * @param {boolean=} includesLabel
   */
  constructor() {
    let data = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
    let includesLabel = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
    const base = includesLabel ? 1 : 0;

    /** @private {?string} */
    this.urlPath_ = data[base] == null ? null : data[base];
  }

  /**
   * @return {?string}
   */
  getUrlPath() {
    return this.urlPath_;
  }

  /**
   * @param {string} value
   */
  setUrlPath(value) {
    this.urlPath_ = value;
  }

  /**
   * @param {boolean=} includeLabel
   * @return {!Array<?>}
   * @override
   */
  toArray() {
    let includeLabel = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;
    const arr = [this.urlPath_ // field 1 - url_path
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
  label() {
    return 'OpenDialogRequest';
  }
}

/**
 * @implements {Message}
 */
exports.OpenDialogRequest = OpenDialogRequest;
class SkuSelectedResponse {
  /**
   * @param {!Array<*>=} data
   * @param {boolean=} includesLabel
   */
  constructor() {
    let data = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
    let includesLabel = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
    const base = includesLabel ? 1 : 0;

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

    /** @private {?string} */
    this.customMessage_ = data[5 + base] == null ? null : data[5 + base];

    /** @private {?boolean} */
    this.anonymous_ = data[6 + base] == null ? null : data[6 + base];

    /** @private {?boolean} */
    this.sharingPolicyEnabled_ = data[7 + base] == null ? null : data[7 + base];
  }

  /**
   * @return {?string}
   */
  getSku() {
    return this.sku_;
  }

  /**
   * @param {string} value
   */
  setSku(value) {
    this.sku_ = value;
  }

  /**
   * @return {?string}
   */
  getOldSku() {
    return this.oldSku_;
  }

  /**
   * @param {string} value
   */
  setOldSku(value) {
    this.oldSku_ = value;
  }

  /**
   * @return {?boolean}
   */
  getOneTime() {
    return this.oneTime_;
  }

  /**
   * @param {boolean} value
   */
  setOneTime(value) {
    this.oneTime_ = value;
  }

  /**
   * @return {?string}
   */
  getPlayOffer() {
    return this.playOffer_;
  }

  /**
   * @param {string} value
   */
  setPlayOffer(value) {
    this.playOffer_ = value;
  }

  /**
   * @return {?string}
   */
  getOldPlayOffer() {
    return this.oldPlayOffer_;
  }

  /**
   * @param {string} value
   */
  setOldPlayOffer(value) {
    this.oldPlayOffer_ = value;
  }

  /**
   * @return {?string}
   */
  getCustomMessage() {
    return this.customMessage_;
  }

  /**
   * @param {string} value
   */
  setCustomMessage(value) {
    this.customMessage_ = value;
  }

  /**
   * @return {?boolean}
   */
  getAnonymous() {
    return this.anonymous_;
  }

  /**
   * @param {boolean} value
   */
  setAnonymous(value) {
    this.anonymous_ = value;
  }

  /**
   * @return {?boolean}
   */
  getSharingPolicyEnabled() {
    return this.sharingPolicyEnabled_;
  }

  /**
   * @param {boolean} value
   */
  setSharingPolicyEnabled(value) {
    this.sharingPolicyEnabled_ = value;
  }

  /**
   * @param {boolean=} includeLabel
   * @return {!Array<?>}
   * @override
   */
  toArray() {
    let includeLabel = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;
    const arr = [this.sku_,
    // field 1 - sku
    this.oldSku_,
    // field 2 - old_sku
    this.oneTime_,
    // field 3 - one_time
    this.playOffer_,
    // field 4 - play_offer
    this.oldPlayOffer_,
    // field 5 - old_play_offer
    this.customMessage_,
    // field 6 - custom_message
    this.anonymous_,
    // field 7 - anonymous
    this.sharingPolicyEnabled_ // field 8 - sharing_policy_enabled
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
  label() {
    return 'SkuSelectedResponse';
  }
}

/**
 * @implements {Message}
 */
exports.SkuSelectedResponse = SkuSelectedResponse;
class SmartBoxMessage {
  /**
   * @param {!Array<*>=} data
   * @param {boolean=} includesLabel
   */
  constructor() {
    let data = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
    let includesLabel = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
    const base = includesLabel ? 1 : 0;

    /** @private {?boolean} */
    this.isClicked_ = data[base] == null ? null : data[base];
  }

  /**
   * @return {?boolean}
   */
  getIsClicked() {
    return this.isClicked_;
  }

  /**
   * @param {boolean} value
   */
  setIsClicked(value) {
    this.isClicked_ = value;
  }

  /**
   * @param {boolean=} includeLabel
   * @return {!Array<?>}
   * @override
   */
  toArray() {
    let includeLabel = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;
    const arr = [this.isClicked_ // field 1 - is_clicked
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
  label() {
    return 'SmartBoxMessage';
  }
}

/**
 * @implements {Message}
 */
exports.SmartBoxMessage = SmartBoxMessage;
class SubscribeResponse {
  /**
   * @param {!Array<*>=} data
   * @param {boolean=} includesLabel
   */
  constructor() {
    let data = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
    let includesLabel = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
    const base = includesLabel ? 1 : 0;

    /** @private {?boolean} */
    this.subscribe_ = data[base] == null ? null : data[base];
  }

  /**
   * @return {?boolean}
   */
  getSubscribe() {
    return this.subscribe_;
  }

  /**
   * @param {boolean} value
   */
  setSubscribe(value) {
    this.subscribe_ = value;
  }

  /**
   * @param {boolean=} includeLabel
   * @return {!Array<?>}
   * @override
   */
  toArray() {
    let includeLabel = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;
    const arr = [this.subscribe_ // field 1 - subscribe
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
  label() {
    return 'SubscribeResponse';
  }
}

/**
 * @implements {Message}
 */
exports.SubscribeResponse = SubscribeResponse;
class SubscriptionLinkingCompleteResponse {
  /**
   * @param {!Array<*>=} data
   * @param {boolean=} includesLabel
   */
  constructor() {
    let data = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
    let includesLabel = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
    const base = includesLabel ? 1 : 0;

    /** @private {?string} */
    this.publisherProvidedId_ = data[base] == null ? null : data[base];
  }

  /**
   * @return {?string}
   */
  getPublisherProvidedId() {
    return this.publisherProvidedId_;
  }

  /**
   * @param {string} value
   */
  setPublisherProvidedId(value) {
    this.publisherProvidedId_ = value;
  }

  /**
   * @param {boolean=} includeLabel
   * @return {!Array<?>}
   * @override
   */
  toArray() {
    let includeLabel = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;
    const arr = [this.publisherProvidedId_ // field 1 - publisher_provided_id
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
  label() {
    return 'SubscriptionLinkingCompleteResponse';
  }
}

/**
 * @implements {Message}
 */
exports.SubscriptionLinkingCompleteResponse = SubscriptionLinkingCompleteResponse;
class SubscriptionLinkingResponse {
  /**
   * @param {!Array<*>=} data
   * @param {boolean=} includesLabel
   */
  constructor() {
    let data = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
    let includesLabel = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
    const base = includesLabel ? 1 : 0;

    /** @private {?string} */
    this.publisherProvidedId_ = data[base] == null ? null : data[base];
  }

  /**
   * @return {?string}
   */
  getPublisherProvidedId() {
    return this.publisherProvidedId_;
  }

  /**
   * @param {string} value
   */
  setPublisherProvidedId(value) {
    this.publisherProvidedId_ = value;
  }

  /**
   * @param {boolean=} includeLabel
   * @return {!Array<?>}
   * @override
   */
  toArray() {
    let includeLabel = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;
    const arr = [this.publisherProvidedId_ // field 1 - publisher_provided_id
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
  label() {
    return 'SubscriptionLinkingResponse';
  }
}

/**
 * @implements {Message}
 */
exports.SubscriptionLinkingResponse = SubscriptionLinkingResponse;
class SurveyAnswer {
  /**
   * @param {!Array<*>=} data
   * @param {boolean=} includesLabel
   */
  constructor() {
    let data = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
    let includesLabel = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
    const base = includesLabel ? 1 : 0;

    /** @private {?number} */
    this.answerId_ = data[base] == null ? null : data[base];

    /** @private {?string} */
    this.answerText_ = data[1 + base] == null ? null : data[1 + base];

    /** @private {?string} */
    this.answerCategory_ = data[2 + base] == null ? null : data[2 + base];
  }

  /**
   * @return {?number}
   */
  getAnswerId() {
    return this.answerId_;
  }

  /**
   * @param {number} value
   */
  setAnswerId(value) {
    this.answerId_ = value;
  }

  /**
   * @return {?string}
   */
  getAnswerText() {
    return this.answerText_;
  }

  /**
   * @param {string} value
   */
  setAnswerText(value) {
    this.answerText_ = value;
  }

  /**
   * @return {?string}
   */
  getAnswerCategory() {
    return this.answerCategory_;
  }

  /**
   * @param {string} value
   */
  setAnswerCategory(value) {
    this.answerCategory_ = value;
  }

  /**
   * @param {boolean=} includeLabel
   * @return {!Array<?>}
   * @override
   */
  toArray() {
    let includeLabel = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;
    const arr = [this.answerId_,
    // field 1 - answer_id
    this.answerText_,
    // field 2 - answer_text
    this.answerCategory_ // field 3 - answer_category
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
  label() {
    return 'SurveyAnswer';
  }
}

/**
 * @implements {Message}
 */
exports.SurveyAnswer = SurveyAnswer;
class SurveyDataTransferRequest {
  /**
   * @param {!Array<*>=} data
   * @param {boolean=} includesLabel
   */
  constructor() {
    let data = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
    let includesLabel = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
    const base = includesLabel ? 1 : 0;

    /** @private {!Array<!SurveyQuestion>} */
    this.surveyQuestions_ = (data[base] || []).map(item => new SurveyQuestion(item, includesLabel));
  }

  /**
   * @return {!Array<!SurveyQuestion>}
   */
  getSurveyQuestionsList() {
    return this.surveyQuestions_;
  }

  /**
   * @param {!Array<!SurveyQuestion>} value
   */
  setSurveyQuestionsList(value) {
    this.surveyQuestions_ = value;
  }

  /**
   * @param {boolean=} includeLabel
   * @return {!Array<?>}
   * @override
   */
  toArray() {
    let includeLabel = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;
    const arr = [this.surveyQuestions_ ? this.surveyQuestions_.map(item => item.toArray(includeLabel)) : [] // field 1 - survey_questions
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
  label() {
    return 'SurveyDataTransferRequest';
  }
}

/**
 * @implements {Message}
 */
exports.SurveyDataTransferRequest = SurveyDataTransferRequest;
class SurveyDataTransferResponse {
  /**
   * @param {!Array<*>=} data
   * @param {boolean=} includesLabel
   */
  constructor() {
    let data = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
    let includesLabel = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
    const base = includesLabel ? 1 : 0;

    /** @private {?boolean} */
    this.success_ = data[base] == null ? null : data[base];
  }

  /**
   * @return {?boolean}
   */
  getSuccess() {
    return this.success_;
  }

  /**
   * @param {boolean} value
   */
  setSuccess(value) {
    this.success_ = value;
  }

  /**
   * @param {boolean=} includeLabel
   * @return {!Array<?>}
   * @override
   */
  toArray() {
    let includeLabel = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;
    const arr = [this.success_ // field 1 - success
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
  label() {
    return 'SurveyDataTransferResponse';
  }
}

/**
 * @implements {Message}
 */
exports.SurveyDataTransferResponse = SurveyDataTransferResponse;
class SurveyQuestion {
  /**
   * @param {!Array<*>=} data
   * @param {boolean=} includesLabel
   */
  constructor() {
    let data = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
    let includesLabel = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
    const base = includesLabel ? 1 : 0;

    /** @private {?number} */
    this.questionId_ = data[base] == null ? null : data[base];

    /** @private {?string} */
    this.questionText_ = data[1 + base] == null ? null : data[1 + base];

    /** @private {?string} */
    this.questionCategory_ = data[2 + base] == null ? null : data[2 + base];

    /** @private {!Array<!SurveyAnswer>} */
    this.surveyAnswers_ = (data[3 + base] || []).map(item => new SurveyAnswer(item, includesLabel));
  }

  /**
   * @return {?number}
   */
  getQuestionId() {
    return this.questionId_;
  }

  /**
   * @param {number} value
   */
  setQuestionId(value) {
    this.questionId_ = value;
  }

  /**
   * @return {?string}
   */
  getQuestionText() {
    return this.questionText_;
  }

  /**
   * @param {string} value
   */
  setQuestionText(value) {
    this.questionText_ = value;
  }

  /**
   * @return {?string}
   */
  getQuestionCategory() {
    return this.questionCategory_;
  }

  /**
   * @param {string} value
   */
  setQuestionCategory(value) {
    this.questionCategory_ = value;
  }

  /**
   * @return {!Array<!SurveyAnswer>}
   */
  getSurveyAnswersList() {
    return this.surveyAnswers_;
  }

  /**
   * @param {!Array<!SurveyAnswer>} value
   */
  setSurveyAnswersList(value) {
    this.surveyAnswers_ = value;
  }

  /**
   * @param {boolean=} includeLabel
   * @return {!Array<?>}
   * @override
   */
  toArray() {
    let includeLabel = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;
    const arr = [this.questionId_,
    // field 1 - question_id
    this.questionText_,
    // field 2 - question_text
    this.questionCategory_,
    // field 3 - question_category
    this.surveyAnswers_ ? this.surveyAnswers_.map(item => item.toArray(includeLabel)) : [] // field 4 - survey_answers
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
  label() {
    return 'SurveyQuestion';
  }
}

/**
 * @implements {Message}
 */
exports.SurveyQuestion = SurveyQuestion;
class Timestamp {
  /**
   * @param {!Array<*>=} data
   * @param {boolean=} includesLabel
   */
  constructor() {
    let data = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
    let includesLabel = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
    const base = includesLabel ? 1 : 0;

    /** @private {?number} */
    this.seconds_ = data[base] == null ? null : data[base];

    /** @private {?number} */
    this.nanos_ = data[1 + base] == null ? null : data[1 + base];
  }

  /**
   * @return {?number}
   */
  getSeconds() {
    return this.seconds_;
  }

  /**
   * @param {number} value
   */
  setSeconds(value) {
    this.seconds_ = value;
  }

  /**
   * @return {?number}
   */
  getNanos() {
    return this.nanos_;
  }

  /**
   * @param {number} value
   */
  setNanos(value) {
    this.nanos_ = value;
  }

  /**
   * @param {boolean=} includeLabel
   * @return {!Array<?>}
   * @override
   */
  toArray() {
    let includeLabel = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;
    const arr = [this.seconds_,
    // field 1 - seconds
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
  label() {
    return 'Timestamp';
  }
}

/**
 * @implements {Message}
 */
exports.Timestamp = Timestamp;
class ToastCloseRequest {
  /**
   * @param {!Array<*>=} data
   * @param {boolean=} includesLabel
   */
  constructor() {
    let data = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
    let includesLabel = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
    const base = includesLabel ? 1 : 0;

    /** @private {?boolean} */
    this.close_ = data[base] == null ? null : data[base];
  }

  /**
   * @return {?boolean}
   */
  getClose() {
    return this.close_;
  }

  /**
   * @param {boolean} value
   */
  setClose(value) {
    this.close_ = value;
  }

  /**
   * @param {boolean=} includeLabel
   * @return {!Array<?>}
   * @override
   */
  toArray() {
    let includeLabel = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;
    const arr = [this.close_ // field 1 - close
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
  label() {
    return 'ToastCloseRequest';
  }
}

/**
 * @implements {Message}
 */
exports.ToastCloseRequest = ToastCloseRequest;
class ViewSubscriptionsResponse {
  /**
   * @param {!Array<*>=} data
   * @param {boolean=} includesLabel
   */
  constructor() {
    let data = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
    let includesLabel = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
    const base = includesLabel ? 1 : 0;

    /** @private {?boolean} */
    this.native_ = data[base] == null ? null : data[base];
  }

  /**
   * @return {?boolean}
   */
  getNative() {
    return this.native_;
  }

  /**
   * @param {boolean} value
   */
  setNative(value) {
    this.native_ = value;
  }

  /**
   * @param {boolean=} includeLabel
   * @return {!Array<?>}
   * @override
   */
  toArray() {
    let includeLabel = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;
    const arr = [this.native_ // field 1 - native
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
  label() {
    return 'ViewSubscriptionsResponse';
  }
}
exports.ViewSubscriptionsResponse = ViewSubscriptionsResponse;
const PROTO_MAP = {
  'AccountCreationRequest': AccountCreationRequest,
  'ActionRequest': ActionRequest,
  'AlreadySubscribedResponse': AlreadySubscribedResponse,
  'AnalyticsContext': AnalyticsContext,
  'AnalyticsEventMeta': AnalyticsEventMeta,
  'AnalyticsRequest': AnalyticsRequest,
  'AudienceActivityClientLogsRequest': AudienceActivityClientLogsRequest,
  'CompleteAudienceActionResponse': CompleteAudienceActionResponse,
  'EntitlementJwt': EntitlementJwt,
  'EntitlementsRequest': EntitlementsRequest,
  'EntitlementsResponse': EntitlementsResponse,
  'EventParams': EventParams,
  'FinishedLoggingResponse': FinishedLoggingResponse,
  'LinkSaveTokenRequest': LinkSaveTokenRequest,
  'LinkingInfoResponse': LinkingInfoResponse,
  'OpenDialogRequest': OpenDialogRequest,
  'SkuSelectedResponse': SkuSelectedResponse,
  'SmartBoxMessage': SmartBoxMessage,
  'SubscribeResponse': SubscribeResponse,
  'SubscriptionLinkingCompleteResponse': SubscriptionLinkingCompleteResponse,
  'SubscriptionLinkingResponse': SubscriptionLinkingResponse,
  'SurveyAnswer': SurveyAnswer,
  'SurveyDataTransferRequest': SurveyDataTransferRequest,
  'SurveyDataTransferResponse': SurveyDataTransferResponse,
  'SurveyQuestion': SurveyQuestion,
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
  const key = data ? data[0] : null;
  if (key) {
    const ctor = PROTO_MAP[key];
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
  const message = /** @type {!Message} */new messageType();
  return message.label();
}

},{}],31:[function(require,module,exports){
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
var _dateUtils = require("../utils/date-utils");
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

/** @const {!Object<string, string>} */
const iframeStyles = {
  opacity: '0',
  position: 'absolute',
  top: '-10px',
  left: '-10px',
  height: '1px',
  width: '1px'
};

// The initial iframe load takes ~500 ms.  We will wait at least that long
// before a page redirect.  Subsequent logs are much faster.  We will wait at
// most 100 ms.
const MAX_FIRST_WAIT = 500;
const MAX_WAIT = 200;
// If we logged and rapidly redirected, we will add a short delay in case
// a message hasn't been transmitted yet.
const TIMEOUT_ERROR = 'AnalyticsService timed out waiting for a response';

/**
 *
 * @param {!string} error
 */
function createErrorResponse(error) {
  const response = new _api_messages.FinishedLoggingResponse();
  response.setComplete(false);
  response.setError(error);
  return response;
}
class AnalyticsService {
  /**
   * @param {!./deps.DepsDef} deps
   * @param {!./fetcher.Fetcher} fetcher
   */
  constructor(deps, fetcher) {
    /** @private @const {!./fetcher.Fetcher} */
    this.fetcher_ = fetcher;

    /** @private @const {!../model/doc.Doc} */
    this.doc_ = deps.doc();

    /** @private @const {!./deps.DepsDef} */
    this.deps_ = deps;

    /** @private @const {!../components/activities.ActivityPorts} */
    this.activityPorts_ = deps.activities();

    /** @private @const {!HTMLIFrameElement} */
    this.iframe_ = /** @type {!HTMLIFrameElement} */
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
    this.eventManager_.registerEventListener(this.handleClientEvent_.bind(this));

    // This code creates a 'promise to log' that we can use to ensure all
    // logging is finished prior to redirecting the page.
    /** @private {!number} */
    this.unfinishedLogs_ = 0;

    /** @private {?function(boolean)} */
    this.loggingResolver_ = null;

    /** @private {?Promise} */
    this.promiseToLog_ = null;

    // If logging doesn't work don't force the user to wait
    /** @private {!boolean} */
    this.loggingBroken_ = false;

    // If logging exceeds the timeouts (see const comments above) don't make
    // the user wait too long.
    /** @private {?number} */
    this.timeout_ = null;

    // A callback for setting the client timestamp before sending requests.
    /** @private {function():!../proto/api_messages.Timestamp} */
    this.getTimestamp_ = () => {
      return (0, _dateUtils.toTimestamp)(Date.now());
    };

    // While false, we will buffer logs instead of sending them to the analytics service.
    /** @private {boolean} */
    this.readyForLogging_ = false;

    // Stores log events while we wait to be ready for logging.
    /** @private {Array<!../api/client-event-manager-api.ClientEvent>}*/
    this.logs_ = [];
  }

  /**
   * Sets ready for logging to true and logs all the client events that were previously buffered.
   */
  setReadyForLogging() {
    this.readyForLogging_ = true;
    this.logs_.forEach(event => {
      this.handleClientEvent_(event);
    });
  }

  /**
   * @param {string} transactionId
   */
  setTransactionId(transactionId) {
    const oldTransactionId = this.context_.getTransactionId();
    this.context_.setTransactionId(transactionId);
    if (oldTransactionId != null && oldTransactionId != transactionId) {
      const eventType = _api_messages.AnalyticsEvent.EVENT_NEW_TX_ID;
      const eventParams = new _api_messages.EventParams();
      eventParams.setOldTransactionId(oldTransactionId);
      this.eventManager_.logSwgEvent(eventType, /* isFromUserAction= */true, eventParams);
    }
  }

  /**
   * @return {string}
   */
  getTransactionId() {
    return (/** @type {string} */this.context_.getTransactionId()
    );
  }

  /**
   * @return {?string}
   */
  getSku() {
    return this.context_.getSku();
  }

  /**
   * @param {string} sku
   */
  setSku(sku) {
    this.context_.setSku(sku);
  }

  /**
   * @param {string} url
   */
  setUrl(url) {
    this.context_.setUrl(url);
  }

  /**
   * @param {!Array<string>} labels
   */
  addLabels(labels) {
    if (labels && labels.length > 0) {
      const newLabels = [].concat(this.context_.getLabelList());
      for (const label of labels) {
        if (newLabels.indexOf(label) == -1) {
          newLabels.push(label);
        }
      }
      this.context_.setLabelList(newLabels);
    }
  }

  /**
   * @return {!HTMLIFrameElement}
   */
  getElement() {
    return this.iframe_;
  }

  /**
   * @return {string}
   * @private
   */
  getQueryString_() {
    return this.doc_.getWin().location.search;
  }

  /**
   * @return {string}
   * @private
   */
  getReferrer_() {
    return this.doc_.getWin().document.referrer;
  }

  /**
   * @private
   */
  setStaticContext_() {
    const context = this.context_;
    // These values should all be available during page load.
    if ((0, _experiments.isExperimentOn)(this.doc_.getWin(), _experimentFlags.ExperimentFlags.UPDATE_GOOGLE_TRANSACTION_ID)) {
      context.setTransactionId((0, _string.getSwgTransactionId)());
    } else {
      context.setTransactionId((0, _string.getUuid)());
    }
    context.setReferringOrigin((0, _url.parseUrl)(this.getReferrer_()).origin);
    context.setClientVersion('SwG 0.1.22-1667857131354');
    context.setUrl((0, _url.getCanonicalUrl)(this.doc_));
    const utmParams = (0, _url.parseQueryString)(this.getQueryString_());
    const campaign = utmParams['utm_campaign'];
    const medium = utmParams['utm_medium'];
    const source = utmParams['utm_source'];
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
  start() {
    if (!this.serviceReady_) {
      // Please note that currently openIframe reads the current analytics
      // context and that it may not contain experiments activated late during
      // the publishers code lifecycle.
      this.addLabels((0, _experiments.getOnExperiments)(this.doc_.getWin()));
      this.serviceReady_ = this.activityPorts_.openIframe(this.iframe_, (0, _services.feUrl)('/serviceiframe'), null, true).then(port => {
        // Register a listener for the logging to code indicate it is
        // finished logging.
        port.on(_api_messages.FinishedLoggingResponse, this.afterLogging_.bind(this));
        return port.whenReady().then(() => {
          // The publisher should be done setting experiments but runtime
          // will forward them here if they aren't.
          this.addLabels((0, _experiments.getOnExperiments)(this.doc_.getWin()));
          return port;
        });
      }, message => {
        // If the port doesn't open register that logging is broken so
        // nothing is just waiting.
        this.loggingBroken_ = true;
        this.afterLogging_(createErrorResponse('Could not connect [' + message + ']'));
      });
    }
    return this.serviceReady_;
  }

  /**
   * @param {boolean} isReadyToPay
   */
  setReadyToPay(isReadyToPay) {
    this.context_.setReadyToPay(isReadyToPay);
  }

  /**
   */
  close() {
    this.doc_.getBody().removeChild(this.getElement());
  }

  /**
   * @return {!AnalyticsContext}
   */
  getContext() {
    return this.context_;
  }

  /**
   * @param {!../api/client-event-manager-api.ClientEvent} event
   * @return {!AnalyticsRequest}
   */
  createLogRequest_(event) {
    const meta = new _api_messages.AnalyticsEventMeta();
    meta.setEventOriginator(event.eventOriginator);
    meta.setIsFromUserAction(!!event.isFromUserAction);
    // Update the of the analytics context to the current time.
    // This needs to be current for log analysis.
    this.context_.setClientTimestamp(this.getTimestamp_());
    const request = new _api_messages.AnalyticsRequest();
    request.setEvent( /** @type {!AnalyticsEvent} */event.eventType);
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
  shouldLogPublisherEvents_() {
    return this.deps_.config().enableSwgAnalytics === true;
  }

  /**
   * @param {!../api/client-event-manager-api.ClientEvent} event
   * @return {boolean}
   */
  shouldAlwaysLogEvent_(event) {
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
  handleClientEvent_(event) {
    //this event is just used to communicate information internally.  It should
    //not be reported to the SwG analytics service.
    if (event.eventType === _api_messages.AnalyticsEvent.EVENT_SUBSCRIPTION_STATE) {
      return;
    }

    // Permission should be asked from a privacy workgroup before this originator
    // can be submitted to the analytics service.  It should most likely be treated
    // as another kind of publisher event here though.
    if (event.eventOriginator === _api_messages.EventOriginator.SHOWCASE_CLIENT) {
      return;
    }
    if (_clientEventManager.ClientEventManager.isPublisherEvent(event) && !this.shouldLogPublisherEvents_() && !this.shouldAlwaysLogEvent_(event)) {
      return;
    }
    if (this.readyForLogging_) {
      // Register we sent a log, the port will call this.afterLogging_ when done.
      this.unfinishedLogs_++;
      this.lastAction_ = this.start().then(port => {
        const analyticsRequest = this.createLogRequest_(event);
        port.execute(analyticsRequest);
        if ((0, _experiments.isExperimentOn)(this.doc_.getWin(), _experimentFlags.ExperimentFlags.LOGGING_BEACON)) {
          this.sendBeacon_(analyticsRequest);
        }
      });
    } else {
      // If we're not ready to log events yet, store the event so we can log it later.
      this.logs_.push(event);
    }
  }

  /**
   * This function is called by the iframe after it sends the log to the server.
   * @param {../proto/api_messages.Message=} message
   */
  afterLogging_(message) {
    const response = /** @type {!FinishedLoggingResponse} */message;
    const success = response && response.getComplete() || false;
    const error = response && response.getError() || 'Unknown logging Error';
    const isTimeout = error === TIMEOUT_ERROR;
    if (!success) {
      (0, _log.log)('Error when logging: ' + error);
    }
    this.unfinishedLogs_--;
    if (!isTimeout) {
      this.everFinishedLog_ = true;
    }

    // Nothing is waiting
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
  getLoggingPromise() {
    if (this.unfinishedLogs_ === 0 || this.loggingBroken_) {
      return Promise.resolve(true);
    }
    if (this.promiseToLog_ === null) {
      this.promiseToLog_ = new Promise(resolve => {
        this.loggingResolver_ = resolve;
      });

      // The promise above should not wait forever if things go wrong.  Let
      // the user proceed!
      const whenDone = this.afterLogging_.bind(this);
      this.timeout_ = setTimeout(() => {
        this.timeout_ = null;
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
  sendBeacon_(analyticsRequest) {
    const pubId = encodeURIComponent(this.deps_.pageConfig().getPublicationId());
    const url = (0, _services.serviceUrl)('/publication/' + pubId + '/clientlogs');
    this.fetcher_.sendBeacon(url, analyticsRequest);
  }
}
exports.AnalyticsService = AnalyticsService;

},{"../proto/api_messages":30,"../utils/date-utils":69,"../utils/dom":71,"../utils/log":78,"../utils/string":82,"../utils/style":83,"../utils/url":85,"./client-event-manager":35,"./experiment-flags":41,"./experiments":42,"./services":58}],32:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ButtonParams = exports.ButtonAttributeValues = exports.ButtonApi = void 0;
var _api_messages = require("../proto/api_messages");
var _swgStrings = require("../i18n/swg-strings");
var _smartButtonApi = require("./smart-button-api");
var _dom = require("../utils/dom");
var _i18n = require("../utils/i18n");
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
 * Properties:
 * - lang: Sets the button SVG and title. Default is "en".
 * - theme: "light" or "dark". Default is "light".
 *
 * @typedef {{
 *   options: (!../api/subscriptions.SmartButtonOptions|!../api/subscriptions.ButtonOptions),
 *   clickFun: !function(!Event=),
 * }} ButtonParams
 */
let ButtonParams;

/** @enum {string} */
exports.ButtonParams = ButtonParams;
const ButtonAttributeValues = {
  SUBSCRIPTION: 'subscription',
  CONTRIBUTION: 'contribution'
};
exports.ButtonAttributeValues = ButtonAttributeValues;
const BUTTON_INNER_HTML = `<div class="swg-button-v2-icon-$theme$"></div>$textContent$`;

/**
 * The button stylesheet can be found in the `/assets/swg-button.css`.
 * It's produced by the `gulp assets` task and deployed to
 * `https://news.google.com/swg/js/v1/swg-button.css`.
 */
class ButtonApi {
  /**
   * @param {!../model/doc.Doc} doc
   * @param {!Promise<!./runtime.ConfiguredRuntime>} configuredRuntimePromise
   */
  constructor(doc, configuredRuntimePromise) {
    /** @private @const {!../model/doc.Doc} */
    this.doc_ = doc;

    /** @private @const {!Promise<!./runtime.ConfiguredRuntime>} */
    this.configuredRuntimePromise_ = configuredRuntimePromise;
  }

  /**
   */
  init() {
    const head = this.doc_.getHead();
    if (!head) {
      return;
    }
    const url = '/assets/swg-button.css';
    const existing = head.querySelector(`link[href="${url}"]`);
    if (existing) {
      return;
    }

    // <link rel="stylesheet" href="..." type="text/css">
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
  create(optionsOrCallback, callback) {
    const button = (0, _dom.createElement)(this.doc_.getWin().document, 'button', {});
    return this.attach(button, optionsOrCallback, callback);
  }

  /**
   * Attaches the Classic 'Subscribe With Google' button.
   * @param {!Element} button
   * @param {../api/subscriptions.ButtonOptions|function()} optionsOrCallback
   * @param {function()=} callback
   * @return {!Element}
   */
  attach(button, optionsOrCallback, callback) {
    const options = this.setupButtonAndGetParams_(button, _api_messages.AnalyticsEvent.ACTION_SWG_BUTTON_CLICK, optionsOrCallback, callback).options;
    const theme = options['theme'];
    button.classList.add(`swg-button-${theme}`);
    button.setAttribute('role', 'button');
    if (options['lang']) {
      button.setAttribute('lang', options['lang']);
    }
    button.setAttribute('title', (0, _i18n.msg)(_swgStrings.SWG_I18N_STRINGS.SUBSCRIPTION_TITLE_LANG_MAP, button) || '');
    this.logSwgEvent_(_api_messages.AnalyticsEvent.IMPRESSION_SWG_BUTTON);
    return button;
  }

  /**
   * Attaches the new subscribe button, for subscription product types.
   * @param {!Element} button
   * @param {../api/subscriptions.ButtonOptions|function()} optionsOrCallback
   * @param {function()=} callback
   * @return {!Element}
   */
  attachSubscribeButton(button, optionsOrCallback, callback) {
    const options = this.setupButtonAndGetParams_(button, _api_messages.AnalyticsEvent.ACTION_SWG_BUTTON_SHOW_OFFERS_CLICK, optionsOrCallback, callback).options;
    const theme = options['theme'];
    button.classList.add(`swg-button-v2-${theme}`);
    button.setAttribute('role', 'button');
    if (options['lang']) {
      button.setAttribute('lang', options['lang']);
    }
    if (!options['enable']) {
      button.setAttribute('disabled', 'disabled');
    }
    button. /*OK*/innerHTML = BUTTON_INNER_HTML.replace('$theme$', theme).replace('$textContent$', (0, _i18n.msg)(_swgStrings.SWG_I18N_STRINGS.SUBSCRIPTION_TITLE_LANG_MAP, button) || '');
    this.logSwgEvent_(_api_messages.AnalyticsEvent.IMPRESSION_SHOW_OFFERS_SWG_BUTTON);
    return button;
  }

  /**
   * Attaches the new contribute button, for contribution product types.
   * @param {!Element} button
   * @param {../api/subscriptions.ButtonOptions|function()} optionsOrCallback
   * @param {function()=} callback
   * @return {!Element}
   */
  attachContributeButton(button, optionsOrCallback, callback) {
    const options = this.setupButtonAndGetParams_(button, _api_messages.AnalyticsEvent.ACTION_SWG_BUTTON_SHOW_CONTRIBUTIONS_CLICK, optionsOrCallback, callback).options;
    const theme = options['theme'];
    button.classList.add(`swg-button-v2-${theme}`);
    button.setAttribute('role', 'button');
    if (options['lang']) {
      button.setAttribute('lang', options['lang']);
    }
    if (!options['enable']) {
      button.setAttribute('disabled', 'disabled');
    }
    button. /*OK*/innerHTML = BUTTON_INNER_HTML.replace('$theme$', theme).replace('$textContent$', (0, _i18n.msg)(_swgStrings.SWG_I18N_STRINGS.CONTRIBUTION_TITLE_LANG_MAP, button) || '');
    this.logSwgEvent_(_api_messages.AnalyticsEvent.IMPRESSION_SHOW_CONTRIBUTIONS_SWG_BUTTON);
    return button;
  }

  /**
   * Attaches all buttons with the specified attribute set to any of the
   * attribute values.
   * @param {string} attribute
   * @param {!Array<string>} attributeValues
   * @param {../api/subscriptions.ButtonOptions} options
   * @param {!Object<string, function()>} attributeValueToCallback
   */
  attachButtonsWithAttribute(attribute, attributeValues, options, attributeValueToCallback) {
    for (const attributeValue of attributeValues) {
      const elements = this.doc_.getRootNode().querySelectorAll(`[${attribute}="${attributeValue}"]`);
      for (let i = 0; i < elements.length; i++) {
        if (attributeValue === ButtonAttributeValues.SUBSCRIPTION) {
          this.attachSubscribeButton(elements[i], options, attributeValueToCallback[attributeValue]);
        } else if (attributeValue === ButtonAttributeValues.CONTRIBUTION) {
          this.attachContributeButton(elements[i], options, attributeValueToCallback[attributeValue]);
        }
      }
    }
  }

  /**
   * @param {!AnalyticsEvent} eventType
   * @param {boolean=} isFromUserAction
   */
  logSwgEvent_(eventType, isFromUserAction) {
    this.configuredRuntimePromise_.then(configuredRuntime => {
      configuredRuntime.eventManager().logSwgEvent(eventType, isFromUserAction);
    });
  }

  /**
   *
   * @param {../api/subscriptions.ButtonOptions|../api/subscriptions.SmartButtonOptions|function()} optionsOrCallback
   * @return {!../api/subscriptions.ButtonOptions|!../api/subscriptions.SmartButtonOptions}
   * @private
   */
  getOptions_(optionsOrCallback) {
    const options = /** @type {!../api/subscriptions.ButtonOptions|!../api/subscriptions.SmartButtonOptions} */
    optionsOrCallback && typeof optionsOrCallback != 'function' ? optionsOrCallback : {
      'theme': _smartButtonApi.Theme.LIGHT
    };
    const theme = options['theme'];
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
  getCallback_(optionsOrCallback, callback) {
    return (/** @type {function()|function(Event):boolean} */
      (typeof optionsOrCallback == 'function' ? optionsOrCallback : null) || callback
    );
  }

  /**
   * @param {!Element} button
   * @param {AnalyticsEvent} clickEvent
   * @param {../api/subscriptions.SmartButtonOptions|function()|../api/subscriptions.ButtonOptions} optionsOrCallback
   * @param {function()=} callbackFun
   * @return {ButtonParams}
   */
  setupButtonAndGetParams_(button, clickEvent, optionsOrCallback, callbackFun) {
    const options = this.getOptions_(optionsOrCallback);
    const callback = this.getCallback_(optionsOrCallback, callbackFun);
    const clickFun = event => {
      this.logSwgEvent_(clickEvent, true);
      if (typeof callback === 'function') {
        callback(event);
      }
    };
    button.addEventListener('click', clickFun);
    return {
      options,
      clickFun
    };
  }

  /**
   * @param {!./deps.DepsDef} deps
   * @param {!Element} button
   * @param {../api/subscriptions.SmartButtonOptions|function()} optionsOrCallback
   * @param {function()=} callback
   * @return {!Element}
   */
  attachSmartButton(deps, button, optionsOrCallback, callback) {
    const params = this.setupButtonAndGetParams_(button, _api_messages.AnalyticsEvent.ACTION_SWG_BUTTON_CLICK, optionsOrCallback, callback);
    // Add required CSS class, if missing.
    button.classList.add('swg-smart-button');
    return new _smartButtonApi.SmartSubscriptionButtonApi(deps, button, params.options, params.clickFun).start();
  }
}
exports.ButtonApi = ButtonApi;

},{"../i18n/swg-strings":22,"../proto/api_messages":30,"../utils/dom":71,"../utils/i18n":75,"./smart-button-api":59}],33:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Callbacks = void 0;
var _errors = require("../utils/errors");
var _log = require("../utils/log");
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

/** @enum {number} */
const CallbackId = {
  ENTITLEMENTS: 1,
  SUBSCRIBE_REQUEST: 2,
  PAYMENT_RESPONSE: 3,
  LOGIN_REQUEST: 4,
  LINK_PROGRESS: 5,
  LINK_COMPLETE: 6,
  FLOW_STARTED: 7,
  FLOW_CANCELED: 8,
  PAY_CONFIRM_OPENED: 9,
  OFFERS_FLOW_REQUEST: 10
};

/**
 */
class Callbacks {
  /**
   */
  constructor() {
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
  setOnEntitlementsResponse(callback) {
    this.setCallback_(CallbackId.ENTITLEMENTS, callback);
  }

  /**
   * @param {!Promise<!../api/entitlements.Entitlements>} promise
   */
  triggerEntitlementsResponse(promise) {
    return this.trigger_(CallbackId.ENTITLEMENTS, promise.then(res => res.clone()));
  }

  /**
   * @return {boolean}
   */
  hasEntitlementsResponsePending() {
    return !!this.resultBuffer_[CallbackId.ENTITLEMENTS];
  }

  /**
   * @param {function(!../api/subscriptions.LoginRequest)} callback
   */
  setOnLoginRequest(callback) {
    this.setCallback_(CallbackId.LOGIN_REQUEST, callback);
  }

  /**
   * @param {!../api/subscriptions.LoginRequest} request
   * @return {boolean} Whether the callback has been found.
   */
  triggerLoginRequest(request) {
    return this.trigger_(CallbackId.LOGIN_REQUEST, request);
  }

  /**
   * @param {function()} callback
   */
  setOnLinkProgress(callback) {
    this.setCallback_(CallbackId.LINK_PROGRESS, callback);
  }

  /**
   * @return {boolean} Whether the callback has been found.
   */
  triggerLinkProgress() {
    return this.trigger_(CallbackId.LINK_PROGRESS, true);
  }

  /**
   */
  resetLinkProgress() {
    this.resetCallback_(CallbackId.LINK_PROGRESS);
  }

  /**
   * @param {function()} callback
   */
  setOnLinkComplete(callback) {
    this.setCallback_(CallbackId.LINK_COMPLETE, callback);
  }

  /**
   * @return {boolean} Whether the callback has been found.
   */
  triggerLinkComplete() {
    return this.trigger_(CallbackId.LINK_COMPLETE, true);
  }

  /**
   * @return {boolean}
   */
  hasLinkCompletePending() {
    return !!this.resultBuffer_[CallbackId.LINK_COMPLETE];
  }

  /**
   * @param {function(!../ui/activity-iframe-view.ActivityIframeView)} callback
   */
  setOnPayConfirmOpened(callback) {
    this.setCallback_(CallbackId.PAY_CONFIRM_OPENED, callback);
  }

  /**
   * @param {!../ui/activity-iframe-view.ActivityIframeView} activityIframeView
   * @return {boolean} Whether the callback has been found.
   */
  triggerPayConfirmOpened(activityIframeView) {
    return this.trigger_(CallbackId.PAY_CONFIRM_OPENED, activityIframeView);
  }

  /**
   * @param {function()} callback
   */
  setOnSubscribeRequest(callback) {
    this.setCallback_(CallbackId.SUBSCRIBE_REQUEST, callback);
  }

  /**
   * @return {boolean} Whether the callback has been found.
   */
  triggerSubscribeRequest() {
    return this.trigger_(CallbackId.SUBSCRIBE_REQUEST, true);
  }

  /**
   * @return {boolean}
   */
  hasSubscribeRequestCallback() {
    return !!this.callbacks_[CallbackId.SUBSCRIBE_REQUEST];
  }

  /**
   * @param {function()} callback
   */
  setOnOffersFlowRequest(callback) {
    this.setCallback_(CallbackId.OFFERS_FLOW_REQUEST, callback);
  }

  /**
   * @return {boolean} Whether the callback has been found.
   */
  triggerOffersFlowRequest() {
    return this.trigger_(CallbackId.OFFERS_FLOW_REQUEST, true);
  }

  /**
   * @return {boolean}
   */
  hasOffersFlowRequestCallback() {
    return !!this.callbacks_[CallbackId.OFFERS_FLOW_REQUEST];
  }

  /**
   * @param {function(!Promise<!../api/subscribe-response.SubscribeResponse>)} callback
   */
  setOnSubscribeResponse(callback) {
    (0, _log.warn)(`[swg.js:setOnSubscribeResponse]: This method has been deprecated, please switch usages to 'setOnPaymentResponse'`);
    this.setCallback_(CallbackId.PAYMENT_RESPONSE, callback);
  }

  /**
   * @param {function(!Promise<!../api/subscribe-response.SubscribeResponse>)} callback
   */
  setOnContributionResponse(callback) {
    (0, _log.warn)(`[swg.js:setOnContributionResponse]: This method has been deprecated, please switch usages to 'setOnPaymentResponse'`);
    this.setCallback_(CallbackId.PAYMENT_RESPONSE, callback);
  }

  /**
   * @param {function(!Promise<!../api/subscribe-response.SubscribeResponse>)} callback
   */
  setOnPaymentResponse(callback) {
    this.setCallback_(CallbackId.PAYMENT_RESPONSE, callback);
  }

  /**
   * @param {!Promise<!../api/subscribe-response.SubscribeResponse>} responsePromise
   * @return {boolean} Whether the callback has been found.
   */
  triggerPaymentResponse(responsePromise) {
    this.paymentResponsePromise_ = responsePromise.then(res => {
      this.trigger_(CallbackId.PAYMENT_RESPONSE, Promise.resolve(res.clone()));
    }, reason => {
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
  hasPaymentResponsePending() {
    return !!this.resultBuffer_[CallbackId.PAYMENT_RESPONSE];
  }

  /**
   * @param {function({flow: string, data: !Object})} callback
   */
  setOnFlowStarted(callback) {
    this.setCallback_(CallbackId.FLOW_STARTED, callback);
  }

  /**
   * @param {string} flow
   * @param {!Object=} data
   * @return {boolean} Whether the callback has been found.
   */
  triggerFlowStarted(flow) {
    let data = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    return this.trigger_(CallbackId.FLOW_STARTED, {
      flow,
      data
    });
  }

  /**
   * @param {function({flow: string, data: !Object})} callback
   */
  setOnFlowCanceled(callback) {
    this.setCallback_(CallbackId.FLOW_CANCELED, callback);
  }

  /**
   * @param {string} flow
   * @param {!Object=} data
   * @return {boolean} Whether the callback has been found.
   */
  triggerFlowCanceled(flow) {
    let data = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    return this.trigger_(CallbackId.FLOW_CANCELED, {
      flow,
      data
    });
  }

  /**
   * @param {!CallbackId} id
   * @param {function(?)} callback
   * @private
   */
  setCallback_(id, callback) {
    if (this.callbacks_[id]) {
      (0, _log.warn)(`[swg.js]: You have registered multiple callbacks for the same response.`);
    }
    this.callbacks_[id] = callback;
    // If result already exist, execute the callback right away.
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
  trigger_(id, data) {
    this.resultBuffer_[id] = data;
    const callback = this.callbacks_[id];
    if (callback) {
      this.executeCallback_(id, callback, data);
    }
    return !!callback;
  }

  /**
   * @param {!CallbackId} id
   * @private
   */
  resetCallback_(id) {
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
  executeCallback_(id, callback, data) {
    // Always execute callbacks in a microtask.
    Promise.resolve().then(() => {
      callback(data);
      this.resetCallback_(id);
    });
  }
}
exports.Callbacks = Callbacks;

},{"../utils/errors":73,"../utils/log":78}],34:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ClientConfigManager = void 0;
var _attributionParams = require("../model/attribution-params");
var _autoPromptConfig = require("../model/auto-prompt-config");
var _clientConfig = require("../model/client-config");
var _basicSubscriptions = require("../api/basic-subscriptions");
var _services = require("./services");
var _log = require("../utils/log");
/**
 * Copyright 2021 The Subscribe with Google Authors. All Rights Reserved.
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
 * Manager of how the client should be configured. Fetches and stores
 * configuration details from the server.
 */
class ClientConfigManager {
  /**
   * @param {!./deps.DepsDef} deps
   * @param {string} publicationId
   * @param {!./fetcher.Fetcher} fetcher
   * @param {!../api/basic-subscriptions.ClientOptions=} clientOptions
   */
  constructor(deps, publicationId, fetcher, clientOptions) {
    /** @private @const {!./deps.DepsDef} */
    this.deps_ = deps;

    /** @private @const {!../api/basic-subscriptions.ClientOptions} */
    this.clientOptions_ = clientOptions || {};

    /** @private @const {string} */
    this.publicationId_ = publicationId;

    /** @private @const {!./fetcher.Fetcher} */
    this.fetcher_ = fetcher;

    /** @private {?Promise<!ClientConfig>} */
    this.responsePromise_ = null;

    /** @private @const {ClientConfig} */
    this.defaultConfig_ = new _clientConfig.ClientConfig({
      skipAccountCreationScreen: this.clientOptions_.skipAccountCreationScreen,
      usePrefixedHostPath: true
    });
  }

  /**
   * Fetches the client config from the server.
   * @param {Promise<void>=} readyPromise optional promise to wait on before
   * attempting to fetch the clientConfiguration.
   * @return {!Promise<!ClientConfig>}
   */
  fetchClientConfig(readyPromise) {
    if (!this.publicationId_) {
      throw new Error('fetchClientConfig requires publicationId');
    }
    if (!this.responsePromise_) {
      readyPromise = readyPromise || Promise.resolve();
      this.responsePromise_ = readyPromise.then(() => this.fetch_());
    }
    return this.responsePromise_;
  }

  /**
   * Gets the client config, if already requested. Otherwise returns a Promise
   * with an empty ClientConfig.
   * @return {!Promise<!ClientConfig>}
   */
  getClientConfig() {
    return this.responsePromise_ || Promise.resolve(this.defaultConfig_);
  }

  /**
   * Convenience method for retrieving the auto prompt portion of the client
   * configuration.
   * @return {!Promise<!../model/auto-prompt-config.AutoPromptConfig|undefined>}
   */
  getAutoPromptConfig() {
    if (!this.responsePromise_) {
      this.fetchClientConfig();
    }
    return this.responsePromise_.then(clientConfig => clientConfig.autoPromptConfig);
  }

  /**
   * Gets the language the UI should be displayed in. See
   * src/api/basic-subscriptions.ClientOptions.lang.
   * @return {string}
   */
  getLanguage() {
    return this.clientOptions_.lang || 'en';
  }

  /**
   * Gets the theme the UI should be displayed in. See
   * src/api/basic-subscriptions.ClientOptions.theme.
   * @return {!../api/basic-subscriptions.ClientTheme}
   */
  getTheme() {
    return this.clientOptions_.theme || _basicSubscriptions.ClientTheme.LIGHT;
  }

  /**
   * Returns whether scrolling on main page should be allowed when
   * subscription or contribution dialog is displayed.
   * @return {boolean}
   */
  shouldAllowScroll() {
    return !!this.clientOptions_.allowScroll;
  }

  /**
   * Returns whether iframes should also use the language specified in the
   * client options, rather than the default of letting the iframes decide the
   * display language. Note that this will return false if the lang option is
   * not set, even if forceLangInIframes was set.
   * @return {boolean}
   */
  shouldForceLangInIframes() {
    return !!this.clientOptions_.forceLangInIframes && !!this.clientOptions_.lang;
  }

  /**
   * Determines whether a subscription or contribution button should be disabled.
   * @returns {!Promise<boolean|undefined>}
   */
  shouldEnableButton() {
    // Disable button if disableButton is set to be true in clientOptions.
    // If disableButton is set to be false or not set, then always enable button.
    // This is for testing purpose.
    if (this.clientOptions_.disableButton) {
      return Promise.resolve(false);
    }
    if (!this.responsePromise_) {
      this.fetchClientConfig();
    }
    // UI predicates decides whether to enable button.
    return this.responsePromise_.then(clientConfig => {
      var _clientConfig$uiPredi;
      if ((_clientConfig$uiPredi = clientConfig.uiPredicates) !== null && _clientConfig$uiPredi !== void 0 && _clientConfig$uiPredi.canDisplayButton) {
        return true;
      } else {
        return false;
      }
    });
  }

  /**
   * Fetches the client config from the server.
   * @return {!Promise<!ClientConfig>}
   */
  fetch_() {
    return this.deps_.entitlementsManager().getArticle().then(article => {
      if (article) {
        return this.parseClientConfig_(article['clientConfig']);
      } else {
        // If there was no article from the entitlement manager, we need
        // to fetch our own using the internal version.
        const url = (0, _services.serviceUrl)('/publication/' + encodeURIComponent(this.publicationId_) + '/clientconfiguration');
        return this.fetcher_.fetchCredentialedJson(url).then(json => {
          if (json.errorMessages && json.errorMessages.length > 0) {
            for (const errorMessage of json.errorMessages) {
              (0, _log.warn)('SwG ClientConfigManager: ' + errorMessage);
            }
          }
          return this.parseClientConfig_(json);
        });
      }
    });
  }

  /**
   * Parses the fetched config into the ClientConfig container object.
   * @param {!Object} json
   * @return {!ClientConfig}
   */
  parseClientConfig_(json) {
    const paySwgVersion = json['paySwgVersion'];
    const autoPromptConfigJson = json['autoPromptConfig'];
    let autoPromptConfig = undefined;
    if (autoPromptConfigJson) {
      var _autoPromptConfigJson, _autoPromptConfigJson2, _autoPromptConfigJson3, _autoPromptConfigJson4, _autoPromptConfigJson5, _autoPromptConfigJson6, _autoPromptConfigJson7;
      autoPromptConfig = new _autoPromptConfig.AutoPromptConfig({
        displayDelaySeconds: (_autoPromptConfigJson = autoPromptConfigJson.clientDisplayTrigger) === null || _autoPromptConfigJson === void 0 ? void 0 : _autoPromptConfigJson.displayDelaySeconds,
        dismissalBackOffSeconds: (_autoPromptConfigJson2 = autoPromptConfigJson.explicitDismissalConfig) === null || _autoPromptConfigJson2 === void 0 ? void 0 : _autoPromptConfigJson2.backOffSeconds,
        maxDismissalsPerWeek: (_autoPromptConfigJson3 = autoPromptConfigJson.explicitDismissalConfig) === null || _autoPromptConfigJson3 === void 0 ? void 0 : _autoPromptConfigJson3.maxDismissalsPerWeek,
        maxDismissalsResultingHideSeconds: (_autoPromptConfigJson4 = autoPromptConfigJson.explicitDismissalConfig) === null || _autoPromptConfigJson4 === void 0 ? void 0 : _autoPromptConfigJson4.maxDismissalsResultingHideSeconds,
        impressionBackOffSeconds: (_autoPromptConfigJson5 = autoPromptConfigJson.impressionConfig) === null || _autoPromptConfigJson5 === void 0 ? void 0 : _autoPromptConfigJson5.backOffSeconds,
        maxImpressions: (_autoPromptConfigJson6 = autoPromptConfigJson.impressionConfig) === null || _autoPromptConfigJson6 === void 0 ? void 0 : _autoPromptConfigJson6.maxImpressions,
        maxImpressionsResultingHideSeconds: (_autoPromptConfigJson7 = autoPromptConfigJson.impressionConfig) === null || _autoPromptConfigJson7 === void 0 ? void 0 : _autoPromptConfigJson7.maxImpressionsResultingHideSeconds
      });
    }
    const uiPredicatesJson = json['uiPredicates'];
    let uiPredicates = undefined;
    if (uiPredicatesJson) {
      uiPredicates = new _clientConfig.UiPredicates(uiPredicatesJson.canDisplayAutoPrompt, uiPredicatesJson.canDisplayButton, uiPredicatesJson.purchaseUnavailableRegion);
    }
    const attributionParamsJson = json['attributionParams'];
    let attributionParams;
    if (attributionParamsJson) {
      attributionParams = new _attributionParams.AttributionParams(attributionParamsJson.displayName, attributionParamsJson.avatarUrl);
    }
    return new _clientConfig.ClientConfig({
      autoPromptConfig,
      paySwgVersion,
      usePrefixedHostPath: json['usePrefixedHostPath'],
      useUpdatedOfferFlows: json['useUpdatedOfferFlows'],
      skipAccountCreationScreen: this.clientOptions_.skipAccountCreationScreen,
      uiPredicates,
      attributionParams
    });
  }
}
exports.ClientConfigManager = ClientConfigManager;

},{"../api/basic-subscriptions":4,"../model/attribution-params":24,"../model/auto-prompt-config":25,"../model/client-config":26,"../utils/log":78,"./services":58}],35:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ClientEventManager = void 0;
var _api_messages = require("../proto/api_messages");
var _clientEventManagerApi = require("../api/client-event-manager-api");
var _types = require("../utils/types");
var _log = require("../utils/log");
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
class ClientEventManager {
  /**
   * @param {!../api/client-event-manager-api.ClientEvent} event
   * @return {boolean}
   */
  static isPublisherEvent(event) {
    return event.eventOriginator === _api_messages.EventOriginator.PROPENSITY_CLIENT || event.eventOriginator === _api_messages.EventOriginator.PUBLISHER_CLIENT || event.eventOriginator === _api_messages.EventOriginator.AMP_CLIENT;
  }

  /**
   *
   * @param {!Promise} configuredPromise
   */
  constructor(configuredPromise) {
    /** @private {!Array<function(!../api/client-event-manager-api.ClientEvent, (!../api/client-event-manager-api.ClientEventParams|undefined)=)>} */
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
  registerEventListener(listener) {
    if (!(0, _types.isFunction)(listener)) {
      throw new Error('Event manager listeners must be a function');
    }
    this.listeners_.push(listener);
  }

  /**
   * @overrides
   */
  registerEventFilterer(filterer) {
    if (!(0, _types.isFunction)(filterer)) {
      throw new Error('Event manager filterers must be a function');
    }
    this.filterers_.push(filterer);
  }

  /**
   * @overrides
   * @param {!../api/client-event-manager-api.ClientEvent} event
   * @param {(!../api/client-event-manager-api.ClientEventParams|undefined)=} eventParams
   */
  logEvent(event) {
    let eventParams = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : undefined;
    validateEvent(event);
    this.lastAction_ = this.isReadyPromise_.then(() => {
      for (let filterer = 0; filterer < this.filterers_.length; filterer++) {
        try {
          if (this.filterers_[filterer](event) === _clientEventManagerApi.FilterResult.CANCEL_EVENT) {
            return Promise.resolve();
          }
        } catch (e) {
          (0, _log.log)(e);
        }
      }
      for (let listener = 0; listener < this.listeners_.length; listener++) {
        try {
          this.listeners_[listener](event, eventParams);
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
  logSwgEvent(eventType) {
    let isFromUserAction = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
    let eventParams = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;
    this.logEvent({
      eventType,
      eventOriginator: _api_messages.EventOriginator.SWG_CLIENT,
      isFromUserAction,
      additionalParameters: eventParams
    });
  }

  /** @return {!Promise<null>} */
  getReadyPromise() {
    return this.isReadyPromise_;
  }
}
exports.ClientEventManager = ClientEventManager;

},{"../api/client-event-manager-api":5,"../proto/api_messages":30,"../utils/log":78,"../utils/types":84}],36:[function(require,module,exports){
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
 * The class for Contributions flow.
 */
class ContributionsFlow {
  /**
   * @param {!./deps.DepsDef} deps
   * @param {!../api/subscriptions.OffersRequest|undefined} options
   */
  constructor(deps, options) {
    /** @private @const {!./deps.DepsDef} */
    this.deps_ = deps;

    /** @private @const {!../api/subscriptions.OffersRequest|undefined} */
    this.options_ = options;

    /** @private @const {!Window} */
    this.win_ = deps.win();

    /** @private @const {!./client-config-manager.ClientConfigManager} */
    this.clientConfigManager_ = deps.clientConfigManager();

    /** @private @const {!../components/activities.ActivityPorts} */
    this.activityPorts_ = deps.activities();

    /** @private @const {!../components/dialog-manager.DialogManager} */
    this.dialogManager_ = deps.dialogManager();
    this.activityIframeView_ = null;

    // Default to showing close button.
    const isClosable = (options === null || options === void 0 ? void 0 : options.isClosable) ?? true;

    /** @private @const {!Promise<!ActivityIframeView>} */
    this.activityIframeViewPromise_ = this.clientConfigManager_.getClientConfig().then(clientConfig => {
      return this.shouldShow_(clientConfig) ? new _activityIframeView.ActivityIframeView(this.win_, this.activityPorts_, this.getUrl_(clientConfig, deps.pageConfig()), (0, _services.feArgs)({
        'productId': deps.pageConfig().getProductId(),
        'publicationId': deps.pageConfig().getPublicationId(),
        'productType': _subscriptions.ProductType.UI_CONTRIBUTION,
        'list': options && options.list || 'default',
        'skus': options && options.skus || null,
        'isClosable': isClosable,
        'supportsEventManager': true
      }), /* shouldFadeBody */true) : null;
    });
  }

  /**
   * @param {AlreadySubscribedResponse} response
   */
  handleLinkRequest_(response) {
    if (response.getSubscriberOrMember()) {
      this.deps_.callbacks().triggerLoginRequest({
        linkRequested: !!response.getLinkRequested()
      });
    }
  }

  /**
   * @param {SkuSelectedResponse} response
   */
  startPayFlow_(response) {
    const sku = response.getSku();
    const isOneTime = response.getOneTime();
    if (sku) {
      const /** @type {../api/subscriptions.SubscriptionRequest} */contributionRequest = {
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
  start() {
    return this.activityIframeViewPromise_.then(activityIframeView => {
      if (!activityIframeView) {
        return Promise.resolve();
      }

      // Start/cancel events.
      this.deps_.callbacks().triggerFlowStarted(_subscriptions.SubscriptionFlows.SHOW_CONTRIBUTION_OPTIONS);
      activityIframeView.onCancel(() => {
        this.deps_.callbacks().triggerFlowCanceled(_subscriptions.SubscriptionFlows.SHOW_CONTRIBUTION_OPTIONS);
      });
      activityIframeView.on(_api_messages.AlreadySubscribedResponse, this.handleLinkRequest_.bind(this));
      activityIframeView.on(_api_messages.SkuSelectedResponse, this.startPayFlow_.bind(this));
      this.activityIframeView_ = activityIframeView;
      return this.clientConfigManager_.getClientConfig().then(clientConfig => {
        if (!this.activityIframeView_) {
          return;
        }
        return this.dialogManager_.openView(this.activityIframeView_, /* hidden */false, this.getDialogConfig_(clientConfig, this.clientConfigManager_.shouldAllowScroll()));
      });
    });
  }

  /**
   * Gets display configuration options for the opened dialog. Uses the
   * responsive desktop design properties if the updated offer flows UI (for
   * SwG Basic) is enabled. Permits override to allow scrolling.
   * @param {!../model/client-config.ClientConfig} clientConfig
   * @param {boolean} shouldAllowScroll
   * @return {!../components/dialog.DialogConfig}
   */
  getDialogConfig_(clientConfig, shouldAllowScroll) {
    return clientConfig.useUpdatedOfferFlows && !shouldAllowScroll ? {
      shouldDisableBodyScrolling: true
    } : {};
  }

  /**
   * Returns whether this flow is configured as enabled, not showing
   * even on explicit start when flag is configured false.
   *
   * @param {!../model/client-config.ClientConfig} clientConfig
   * @return {boolean}
   */
  shouldShow_(clientConfig) {
    var _clientConfig$uiPredi;
    return ((_clientConfig$uiPredi = clientConfig.uiPredicates) === null || _clientConfig$uiPredi === void 0 ? void 0 : _clientConfig$uiPredi.canDisplayAutoPrompt) !== false;
  }

  /**
   * Gets the complete URL that should be used for the activity iFrame view.
   * @param {!../model/client-config.ClientConfig} clientConfig
   * @param {!../model/page-config.PageConfig} pageConfig
   * @return {string}
   */
  getUrl_(clientConfig, pageConfig) {
    if (!clientConfig.useUpdatedOfferFlows) {
      return (0, _services.feUrl)('/contributionsiframe');
    }
    if (this.clientConfigManager_.shouldForceLangInIframes()) {
      return (0, _services.feUrl)('/contributionoffersiframe', {
        'hl': this.clientConfigManager_.getLanguage(),
        'publicationId': pageConfig.getPublicationId()
      });
    }
    return (0, _services.feUrl)('/contributionoffersiframe', {
      'publicationId': pageConfig.getPublicationId()
    });
  }

  /**
   * Shows "no contribution found" on activity iFrame view.
   */
  showNoEntitlementFoundToast() {
    if (this.activityIframeView_) {
      this.activityIframeView_.execute(new _api_messages.EntitlementsResponse());
    }
  }
}
exports.ContributionsFlow = ContributionsFlow;

},{"../api/subscriptions":13,"../proto/api_messages":30,"../ui/activity-iframe-view":62,"./pay-flow":54,"./services":58}],37:[function(require,module,exports){
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
 * The flow to initiate deferred account process.
 * See `Subscriptions.completeDeferredAccountCreation` API.
 */
class DeferredAccountFlow {
  /**
   * @param {!./deps.DepsDef} deps
   * @param {?../api/deferred-account-creation.DeferredAccountCreationRequest} options
   */
  constructor(deps, options) {
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
    const defaultOptions = {
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
  start() {
    const entitlements = this.options_.entitlements;

    // For now, entitlements are required to be present and have the Google
    // token. This is strictly not required for the implementation. But it's
    // preferrable API-wise at this time.
    if (!entitlements || !entitlements.getEntitlementForSource('google')) {
      throw new Error('No entitlements with "google" source');
    }

    // Start/cancel events.
    this.deps_.callbacks().triggerFlowStarted(_subscriptions.SubscriptionFlows.COMPLETE_DEFERRED_ACCOUNT_CREATION);
    this.activityIframeView_ = new _activityIframeView.ActivityIframeView(this.win_, this.activityPorts_, (0, _services.feUrl)('/recoveriframe'), (0, _services.feArgs)({
      'publicationId': this.deps_.pageConfig().getPublicationId(),
      'productId': this.deps_.pageConfig().getProductId(),
      'entitlements': entitlements && entitlements.raw || null,
      'consent': this.options_.consent
    }), /* shouldFadeBody */true);
    this.openPromise_ = this.dialogManager_.openView(this.activityIframeView_);
    return this.activityIframeView_.acceptResult().then(result => {
      // The consent part is complete.
      return this.handleConsentResponse_( /** @type {!Object} */result.data);
    }, reason => {
      if ((0, _errors.isCancelError)(reason)) {
        this.deps_.callbacks().triggerFlowCanceled(_subscriptions.SubscriptionFlows.COMPLETE_DEFERRED_ACCOUNT_CREATION);
      } else {
        this.dialogManager_.completeView(this.activityIframeView_);
      }
      throw reason;
    });
  }

  /**
   * @param {!Object} data
   * @return {!DeferredAccountCreationResponse}
   * @private
   */
  handleConsentResponse_(data) {
    this.deps_.entitlementsManager().blockNextNotification();

    // Parse the response.
    const entitlementsJwt = data['entitlements'];
    const idToken = data['idToken'];
    const productType = data['productType'];
    const entitlements = this.deps_.entitlementsManager().parseEntitlements({
      'signedEntitlements': entitlementsJwt
    });
    const userData = new _userData.UserData(idToken, /** @type {!Object} */new _jwt.JwtHelper().decode(idToken));
    const purchaseDataList = data['purchaseDataList'] ? data['purchaseDataList'].map(pd => new _subscribeResponse.PurchaseData(pd['data'], pd['signature'])) : [
    // TODO(dvoytenko): cleanup/deprecate.
    new _subscribeResponse.PurchaseData(data['purchaseData']['data'], data['purchaseData']['signature'])];

    // For now, we'll use the `PayCompleteFlow` as a "creating account" flow.
    // But this can be eventually implemented by the same iframe.
    const creatingFlow = new _payFlow.PayCompleteFlow(this.deps_);
    const completeHandler = creatingFlow.complete.bind(creatingFlow);
    const response = new _deferredAccountCreation.DeferredAccountCreationResponse(entitlements, userData, purchaseDataList, completeHandler);
    this.deps_.eventManager().logSwgEvent(_api_messages.AnalyticsEvent.ACTION_NEW_DEFERRED_ACCOUNT, true);

    // Start the "sync" flow.
    creatingFlow.start(new _subscribeResponse.SubscribeResponse('',
    // raw field doesn't matter in this case
    purchaseDataList[0], userData, entitlements, productType, () => Promise.resolve() // completeHandler doesn't matter in this case
    ));

    return response;
  }
}
exports.DeferredAccountFlow = DeferredAccountFlow;

},{"../api/deferred-account-creation":6,"../api/subscribe-response":12,"../api/subscriptions":13,"../api/user-data":14,"../proto/api_messages":30,"../ui/activity-iframe-view":62,"../utils/errors":73,"../utils/jwt":77,"./pay-flow":54,"./services":58}],38:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DepsDef = void 0;
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
class DepsDef {
  /**
   * @return {!../model/doc.Doc}
   */
  doc() {}

  /**
   * @return {!Window}
   */
  win() {}

  /**
   * @return {!../api/subscriptions.Config}
   */
  config() {}

  /**
   * @return {!../model/page-config.PageConfig}
   */
  pageConfig() {}

  /**
   * @return {!../components/activities.ActivityPorts}
   */
  activities() {}

  /**
   * @return {!./pay-client.PayClient}
   */
  payClient() {}

  /**
   * @return {!../components/dialog-manager.DialogManager}
   */
  dialogManager() {}

  /**
   * @return {!./entitlements-manager.EntitlementsManager}
   */
  entitlementsManager() {}

  /**
   * @return {!./callbacks.Callbacks}
   */
  callbacks() {}

  /**
   * @return {!../runtime/storage.Storage}
   */
  storage() {}

  /**
   * @return {!../runtime/analytics-service.AnalyticsService}
   */
  analytics() {}

  /**
   * @return {!../runtime/jserror.JsError}
   */
  jserror() {}

  /**
   * @return {!../runtime/client-event-manager.ClientEventManager}
   */
  eventManager() {}

  /**
   * @return {!../runtime/client-config-manager.ClientConfigManager}
   */
  clientConfigManager() {}
}
exports.DepsDef = DepsDef;

},{}],39:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.EntitlementsManager = exports.Article = void 0;
var _api_messages = require("../proto/api_messages");
var _constants = require("../utils/constants");
var _entitlements = require("../api/entitlements");
var _subscriptions = require("../api/subscriptions");
var _jwt = require("../utils/jwt");
var _metering = require("../api/metering");
var _meterToastApi = require("./meter-toast-api");
var _toast = require("../ui/toast");
var _url = require("../utils/url");
var _eventTypeMapping = require("./event-type-mapping");
var _bytes = require("../utils/bytes");
var _services = require("../runtime/services");
var _string = require("../utils/string");
var _gaa = require("../utils/gaa");
var _services2 = require("./services");
var _dateUtils = require("../utils/date-utils");
var _log = require("../utils/log");
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

const SERVICE_ID = 'subscribe.google.com';
const TOAST_STORAGE_KEY = 'toast';
const ENTS_STORAGE_KEY = 'ents';
const IS_READY_TO_PAY_STORAGE_KEY = 'isreadytopay';

/**
 * Article response object.
 *
 * @typedef {{
 *  entitlements: (../api/entitlements.Entitlements),
 *  clientConfig: (../model/client-config.ClientConfig),
 *  audienceActions: ({
 *    actions: Array<{
 *      type: (string)
 *    }>,
 *    engineId: (string)
 *  }),
 *  experimentConfig: ({
 *    experimentFlags: Array<{
 *      type: (string)
 *    }>
 *  })
 * }}
 */
let Article;

/**
 */
exports.Article = Article;
class EntitlementsManager {
  /**
   * @param {!Window} win
   * @param {!../model/page-config.PageConfig} pageConfig
   * @param {!./fetcher.Fetcher} fetcher
   * @param {!./deps.DepsDef} deps
   * @param {!boolean} useArticleEndpoint
   * @param {!boolean} enableDefaultMeteringHandler
   */
  constructor(win, pageConfig, fetcher, deps, useArticleEndpoint, enableDefaultMeteringHandler) {
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

    /** @private {boolean} */
    this.blockNextToast_ = false;

    /**
     * String containing encoded metering parameters currently.
     * We may expand this to contain more information in the future.
     * @private {?string}
     */
    this.encodedParams_ = null;

    /** @protected {!string} */
    this.encodedParamName_ = useArticleEndpoint ? 'encodedEntitlementsParams' : 'encodedParams';

    /** @protected {!string} */
    this.action_ = useArticleEndpoint ? '/article' : '/entitlements';

    /** @private @const {!./storage.Storage} */
    this.storage_ = deps.storage();

    /** @private @const {!../runtime/analytics-service.AnalyticsService} */
    this.analyticsService_ = deps.analytics();

    /** @private @const {!../api/subscriptions.Config} */
    this.config_ = deps.config();

    /**
     * Tests can use this promise to wait for POST requests to finish.
     * @visibleForTesting
     */
    this.entitlementsPostPromise = null;

    /** @private @const {boolean} */
    this.useArticleEndpoint_ = useArticleEndpoint;

    /** @private @const {boolean} */
    this.enableDefaultMeteringHandler_ = enableDefaultMeteringHandler;

    /** @private {?Article} */
    this.article_ = null;

    /** @private {boolean} */
    this.enableMeteredByGoogle_ = false;
    this.deps_.eventManager().registerEventListener(this.possiblyPingbackOnClientEvent_.bind(this));
  }

  /**
   * @param {boolean=} expectPositive
   */
  reset(expectPositive) {
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
  clear() {
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
  getEntitlements(params) {
    // Remain backwards compatible by accepting
    // `encryptedDocumentKey` string as a first param.
    if (typeof params === 'string') {
      // TODO: Delete the fallback if nobody needs it. Use a log to verify.
      if (Date.now() > 1600289016959) {
        // TODO: Remove the conditional check for this warning
        // after the AMP extension is updated to pass an object.
        (0, _log.warn)(`[swg.js:getEntitlements]: If present, the first param of getEntitlements() should be an object of type GetEntitlementsParamsExternalDef.`);
      }
      params = {
        encryption: {
          encryptedDocumentKey: /**@type {string} */params
        }
      };
    }
    if (!this.responsePromise_) {
      this.responsePromise_ = this.getEntitlementsFlow_(params);
    }
    return this.responsePromise_.then(response => {
      if (response.isReadyToPay != null) {
        this.analyticsService_.setReadyToPay(response.isReadyToPay);
      }
      return response;
    });
  }

  /**
   * @param {string} raw
   * @param {boolean=} isReadyToPay
   * @return {boolean}
   */
  pushNextEntitlements(raw, isReadyToPay) {
    const entitlements = this.getValidJwtEntitlements_(raw, /* requireNonExpired */true, isReadyToPay);
    if (entitlements && entitlements.enablesThis()) {
      this.storage_.set(ENTS_STORAGE_KEY, raw);
      return true;
    }
    return false;
  }

  /**
   * Retrieves the 'gaa_n' parameter from the query string.
   */
  getGaaToken_() {
    return (0, _url.parseQueryString)(this.win_.location.search)['gaa_n'];
  }

  /**
   * Sends a pingback that marks a metering entitlement as used.
   * @param {!Entitlement|null} entitlement
   */
  consumeMeter_(entitlement) {
    if (!entitlement || entitlement.source !== _entitlements.GOOGLE_METERING_SOURCE) {
      return;
    }

    // If GAA params are present, include them in the pingback.
    let gaaToken;
    let entitlementSource;
    if (entitlement.subscriptionTokenContents && entitlement.subscriptionTokenContents['metering']['clientType'] === _metering.MeterClientTypes.METERED_BY_GOOGLE) {
      // If clientType is METERED_BY_GOOGLE, this is the appropriate
      // EntitlementSource, and no GAA params are required.
      entitlementSource = _api_messages.EntitlementSource.SUBSCRIBE_WITH_GOOGLE_METERING_SERVICE;
    } else {
      // Expected: clientType is LICENSED_BY_GOOGLE
      if ((0, _gaa.queryStringHasFreshGaaParams)(this.win_.location.search)) {
        // GAA params are valid. Post back as Showcase.
        entitlementSource = _api_messages.EntitlementSource.GOOGLE_SHOWCASE_METERING_SERVICE;
        gaaToken = this.getGaaToken_();
      } else {
        // Sanity check:
        // If we're not METERED_BY_GOOGLE, and GAA params are not valid, do not
        // post back.
        return;
      }
    }
    this.deps_.eventManager().logSwgEvent(_api_messages.AnalyticsEvent.EVENT_UNLOCKED_BY_METER, false);
    const jwt = new _api_messages.EntitlementJwt();
    jwt.setSource(entitlement.source);
    jwt.setJwt(entitlement.subscriptionToken);
    return this.postEntitlementsRequest_( /* usedEntitlement */jwt, /* entitlementResult */_api_messages.EntitlementResult.UNLOCKED_METER, /* entitlementSource */entitlementSource, /* optionalToken */gaaToken);
  }

  /**
   * Listens for events from the event manager and informs the server
   * about publisher entitlements and non-consumable Google entitlements.
   * @param {!../api/client-event-manager-api.ClientEvent} event
   */
  possiblyPingbackOnClientEvent_(event) {
    var _event$additionalPara, _event$additionalPara2, _event$additionalPara3, _event$additionalPara4;
    // Verify GAA params are present, otherwise bail since the pingback
    // shouldn't happen on non-metering requests.
    // We don't validate access type since we want to pingback on all access types.
    if (!(0, _gaa.queryStringHasFreshGaaParams)(this.win_.location.search, /*allowAllAccessTypes=*/true)) {
      return;
    }

    // A subset of analytics events are also an entitlement result
    const result = (0, _eventTypeMapping.analyticsEventToEntitlementResult)(event.eventType);
    if (!result) {
      return;
    }
    let source = null;
    switch (event.eventOriginator) {
      // Publisher JS logged this event.
      case _api_messages.EventOriginator.SHOWCASE_CLIENT:
        source = _api_messages.EntitlementSource.PUBLISHER_ENTITLEMENT;
        break;
      // Swgjs logged this event.
      case _api_messages.EventOriginator.SWG_CLIENT:
        if (result == _api_messages.EntitlementResult.UNLOCKED_METER) {
          // The `consumeMeter_` method already tracks this.
          return;
        }
        source = _api_messages.EntitlementSource.GOOGLE_SUBSCRIBER_ENTITLEMENT;
        break;
      default:
        return;
    }
    const token = this.getGaaToken_();
    const isUserRegistered = event === null || event === void 0 ? void 0 : (_event$additionalPara = event.additionalParameters) === null || _event$additionalPara === void 0 ? void 0 : (_event$additionalPara2 = _event$additionalPara.getIsUserRegistered) === null || _event$additionalPara2 === void 0 ? void 0 : _event$additionalPara2.call(_event$additionalPara);
    const subscriptionTimestamp = event === null || event === void 0 ? void 0 : (_event$additionalPara3 = event.additionalParameters) === null || _event$additionalPara3 === void 0 ? void 0 : (_event$additionalPara4 = _event$additionalPara3.getSubscriptionTimestamp) === null || _event$additionalPara4 === void 0 ? void 0 : _event$additionalPara4.call(_event$additionalPara3);
    this.postEntitlementsRequest_(new _api_messages.EntitlementJwt(), result, source, token, isUserRegistered, subscriptionTimestamp);
  }

  // Informs the Entitlements server about the entitlement used
  // to unlock the page.
  postEntitlementsRequest_(usedEntitlement, entitlementResult, entitlementSource) {
    let optionalToken = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : '';
    let optionalIsUserRegistered = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : null;
    let optionalSubscriptionTimestamp = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : null;
    const message = new _api_messages.EntitlementsRequest();
    message.setUsedEntitlement(usedEntitlement);
    message.setClientEventTime((0, _dateUtils.toTimestamp)(Date.now()));
    message.setEntitlementResult(entitlementResult);
    message.setEntitlementSource(entitlementSource);
    message.setToken(optionalToken);
    if (typeof optionalIsUserRegistered === 'boolean') {
      message.setIsUserRegistered(optionalIsUserRegistered);
    }
    if (optionalSubscriptionTimestamp) {
      message.setSubscriptionTimestamp(optionalSubscriptionTimestamp);
    }
    let url = '/publication/' + encodeURIComponent(this.publicationId_) + this.action_;
    url = addDevModeParamsToUrl(this.win_.location, url);

    // Promise that sets this.encodedParams_ when it resolves.
    const encodedParamsPromise = this.encodedParams_ ? Promise.resolve() : (0, _string.hash)((0, _url.getCanonicalUrl)(this.deps_.doc())).then(hashedCanonicalUrl => {
      /** @type {!GetEntitlementsParamsInternalDef} */
      const encodableParams = {
        metering: {
          resource: {
            hashedCanonicalUrl
          }
        }
      };
      this.encodedParams_ = (0, _bytes.base64UrlEncodeFromBytes)((0, _bytes.utf8EncodeSync)(JSON.stringify(encodableParams)));
    });

    // Get swgUserToken from local storage
    const swgUserTokenPromise = this.storage_.get(_constants.Constants.USER_TOKEN, true);
    this.entitlementsPostPromise = Promise.all([swgUserTokenPromise, encodedParamsPromise]).then(values => {
      const swgUserToken = values[0];
      if (swgUserToken) {
        url = (0, _url.addQueryParam)(url, 'sut', swgUserToken);
      }
      url = (0, _url.addQueryParam)(url, this.encodedParamName_, /** @type {!string} */this.encodedParams_);
      return this.fetcher_.sendPost((0, _services2.serviceUrl)(url), message);
    });
  }

  /**
   * @param {!GetEntitlementsParamsExternalDef=} params
   * @return {!Promise<!Entitlements>}
   * @private
   */
  getEntitlementsFlow_(params) {
    return this.fetchEntitlementsWithCaching_(params).then(entitlements => {
      this.onEntitlementsFetched_(entitlements);
      return entitlements;
    });
  }

  /**
   * @param {!GetEntitlementsParamsExternalDef=} params
   * @return {!Promise<!Entitlements>}
   * @private
   */
  fetchEntitlementsWithCaching_(params) {
    return Promise.all([this.storage_.get(ENTS_STORAGE_KEY), this.storage_.get(IS_READY_TO_PAY_STORAGE_KEY)]).then(cachedValues => {
      const raw = cachedValues[0];
      const irtp = cachedValues[1];
      // Try cache first.
      const needsDecryption = !!(params && params.encryption);
      if (raw && !needsDecryption) {
        const cached = this.getValidJwtEntitlements_(raw, /* requireNonExpired */true, irtpStringToBoolean(irtp));
        if (cached && cached.enablesThis()) {
          // Already have a positive response.
          this.positiveRetries_ = 0;
          return cached;
        }
      }
      // If cache didn't match, perform fetch.
      return this.fetchEntitlements_(params).then(ents => {
        // If the product is enabled by cacheable entitlements, store them in cache.
        if (ents && ents.enablesThisWithCacheableEntitlements() && ents.raw) {
          this.storage_.set(ENTS_STORAGE_KEY, ents.raw);
        }
        return ents;
      });
    });
  }

  /**
   * If the manager is also responsible for fetching the Article, it
   * will be accessible from here and should resolve a null promise otherwise.
   * @returns {!Promise<?Article>}
   */
  getArticle() {
    // The base manager only fetches from the entitlements endpoint, which does
    // not contain an Article.
    if (!this.useArticleEndpoint_ || !this.responsePromise_) {
      return Promise.resolve();
    }
    return this.responsePromise_.then(() => Promise.resolve(this.article_));
  }

  /**
   * The experiment flags that are returned by the article endpoint should be accessible from here.
   * @returns {Promise<Array<string>>}
   */
  getExperimentConfigFlags() {
    return this.getArticle().then(article => {
      const expConfig = article['experimentConfig'];
      if (expConfig != null) {
        const expFlags = expConfig['experimentFlags'];
        if (expFlags != null) {
          return expFlags;
        }
      }
      return [];
    });
  }

  /**
   * @param {!GetEntitlementsParamsExternalDef=} params
   * @return {!Promise<!Entitlements>}
   * @private
   */
  fetchEntitlements_(params) {
    // TODO(dvoytenko): Replace retries with consistent fetch.
    let positiveRetries = this.positiveRetries_;
    this.positiveRetries_ = 0;
    const attempt = () => {
      positiveRetries--;
      return this.fetch_(params).then(entitlements => {
        if (entitlements.enablesThis() || positiveRetries <= 0) {
          return entitlements;
        }
        return new Promise(resolve => {
          this.win_.setTimeout(() => {
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
  setToastShown(value) {
    this.storage_.set(TOAST_STORAGE_KEY, value ? '1' : '0');
  }

  /**
   */
  blockNextNotification() {
    this.blockNextNotification_ = true;
  }

  /**
   */
  blockNextToast() {
    this.blockNextToast_ = true;
  }

  /**
   */
  unblockNextNotification() {
    this.blockNextNotification_ = false;
  }

  /**
   * Allow Google to handle metering for the given page.
   */
  enableMeteredByGoogle() {
    this.enableMeteredByGoogle_ = true;
  }

  /**
   * The JSON must either contain a "signedEntitlements" with JWT, or
   * "entitlements" field with plain JSON object.
   * @param {!Object} json
   * @return {!Entitlements}
   */
  parseEntitlements(json) {
    const isReadyToPay = json['isReadyToPay'];
    if (isReadyToPay == null) {
      this.storage_.remove(IS_READY_TO_PAY_STORAGE_KEY);
    } else {
      this.storage_.set(IS_READY_TO_PAY_STORAGE_KEY, String(isReadyToPay));
    }
    const signedData = json['signedEntitlements'];
    const decryptedDocumentKey = json['decryptedDocumentKey'];
    const swgUserToken = json['swgUserToken'];
    if (swgUserToken) {
      this.saveSwgUserToken_(swgUserToken);
    }
    if (signedData) {
      const entitlements = this.getValidJwtEntitlements_(signedData, /* requireNonExpired */false, isReadyToPay, decryptedDocumentKey);
      if (entitlements) {
        return entitlements;
      }
    } else {
      const plainEntitlements = json['entitlements'];
      if (plainEntitlements) {
        return this.createEntitlements_('', plainEntitlements, isReadyToPay, decryptedDocumentKey);
      }
    }
    // Empty response.
    return this.createEntitlements_('', [], isReadyToPay);
  }

  /**
   * Persist swgUserToken in local storage if entitlements and swgUserToken exist
   * @param {?string|undefined} swgUserToken
   * @private
   */
  saveSwgUserToken_(swgUserToken) {
    if (swgUserToken) {
      this.storage_.set(_constants.Constants.USER_TOKEN, swgUserToken, true);
    }
  }

  /**
   * @param {string} raw
   * @param {boolean} requireNonExpired
   * @param {boolean=} isReadyToPay
   * @param {?string=} decryptedDocumentKey
   * @return {?Entitlements}
   * @private
   */
  getValidJwtEntitlements_(raw, requireNonExpired, isReadyToPay, decryptedDocumentKey) {
    try {
      const jwt = this.jwtHelper_.decode(raw);
      if (requireNonExpired) {
        const now = Date.now();
        const exp = jwt['exp'];
        if (parseFloat(exp) * 1000 < now) {
          return null;
        }
      }
      const entitlementsClaim = jwt['entitlements'];
      return entitlementsClaim && this.createEntitlements_(raw, entitlementsClaim, isReadyToPay, decryptedDocumentKey) || null;
    } catch (e) {
      // Ignore the error.
      this.win_.setTimeout(() => {
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
  createEntitlements_(raw, json, isReadyToPay, decryptedDocumentKey) {
    return new _entitlements.Entitlements(SERVICE_ID, raw, _entitlements.Entitlement.parseListFromJson(json, this.jwtHelper_), this.pageConfig_.getProductId(), this.ack_.bind(this), this.consume_.bind(this), isReadyToPay, decryptedDocumentKey);
  }

  /**
   * @param {!Entitlements} entitlements
   * @private
   */
  onEntitlementsFetched_(entitlements) {
    // Skip any notifications and toast if other flows are ongoing.
    // TODO(dvoytenko): what's the right action when pay flow was canceled?
    const blockNotification = this.blockNextNotification_;
    this.blockNextNotification_ = false;
    // Let people specifically block toasts too, without blocking notifications.
    const blockToast = this.blockNextToast_;
    this.blockNextToast_ = false;
    if (blockNotification) {
      return;
    }

    // Notify on the received entitlements.
    this.deps_.callbacks().triggerEntitlementsResponse(Promise.resolve(entitlements));

    // Implementation of the default ability to always consume metered entitlements
    // if they are provided in an entitlements response.
    if (this.enableDefaultMeteringHandler_) {
      if (entitlements.enablesThisWithGoogleMetering()) {
        entitlements.consume();
      }
    }
    const entitlement = entitlements.getEntitlementForThis();
    if (!entitlement) {
      this.deps_.eventManager().logSwgEvent(_api_messages.AnalyticsEvent.EVENT_NO_ENTITLEMENTS, false);
      return;
    }
    if (blockToast) {
      return;
    }
    this.maybeShowToast_(entitlement);
  }

  /**
   * @param {!Entitlement} entitlement
   * @return {!Promise}
   * @private
   */
  maybeShowToast_(entitlement) {
    // Don't show toast for metering entitlements.
    if (entitlement.source === _entitlements.GOOGLE_METERING_SOURCE) {
      this.deps_.eventManager().logSwgEvent(_api_messages.AnalyticsEvent.EVENT_HAS_METERING_ENTITLEMENTS, false);
      return Promise.resolve();
    }
    const params = new _api_messages.EventParams();
    params.setIsUserRegistered(true);
    if (entitlement.subscriptionTimestamp) {
      params.setSubscriptionTimestamp(entitlement.subscriptionTimestamp);
    }

    // Log unlock event.
    const eventType = entitlement.source === _entitlements.PRIVILEGED_SOURCE ? _api_messages.AnalyticsEvent.EVENT_UNLOCKED_FOR_CRAWLER : _api_messages.AnalyticsEvent.EVENT_UNLOCKED_BY_SUBSCRIPTION;
    this.deps_.eventManager().logSwgEvent(eventType, false, params);

    // Check if storage bit is set. It's only set by the `Entitlements.ack` method.
    return this.storage_.get(TOAST_STORAGE_KEY).then(value => {
      const toastWasShown = value === '1';
      if (toastWasShown) {
        return;
      }

      // Show toast.
      const source = entitlement.source || _entitlements.GOOGLE_METERING_SOURCE;
      return new _toast.Toast(this.deps_, (0, _services.feUrl)('/toastiframe'), (0, _services.feArgs)({
        'publicationId': this.publicationId_,
        'source': source
      })).open();
    });
  }

  /**
   * @param {!Entitlements} entitlements
   * @private
   */
  ack_(entitlements) {
    if (entitlements.getEntitlementForThis()) {
      this.setToastShown(true);
    }
  }

  /**
   * @param {!Entitlements} entitlements
   * @param {?Function=} onCloseDialog Called after the user closes the dialog.
   * @private
   */
  consume_(entitlements, onCloseDialog) {
    if (entitlements.enablesThisWithGoogleMetering()) {
      const entitlement = entitlements.getEntitlementForThis();
      const onConsumeCallback = () => {
        if (onCloseDialog) {
          onCloseDialog();
        }
        this.consumeMeter_(entitlement);
      };
      if (!entitlement.subscriptionTokenContents) {
        // Ignore decoding errors. Don't show a toast, and return
        // onConsumeCallback directly.
        return onConsumeCallback();
      }
      if (entitlement.subscriptionTokenContents['metering'] && entitlement.subscriptionTokenContents['metering']['showToast'] === true) {
        // Return a delegation to the meterToastApi, which will return the
        // onConsumeCallback when the toast is dismissed.
        const meterToastApi = new _meterToastApi.MeterToastApi(this.deps_, {
          meterClientType: entitlement.subscriptionTokenContents['metering']['clientType'],
          meterClientUserAttribute: entitlement.subscriptionTokenContents['metering']['clientUserAttribute']
        });
        meterToastApi.setOnConsumeCallback(onConsumeCallback);
        return meterToastApi.start();
      } else {
        // If showToast isn't true, don't show a toast, and return
        // onConsumeCallback directly.
        return onConsumeCallback();
      }
    }
  }

  /**
   * @param {!GetEntitlementsParamsExternalDef=} params
   * @return {!Promise<!Entitlements>}
   * @private
   */
  fetch_(params) {
    // Get swgUserToken from local storage
    const swgUserTokenPromise = this.storage_.get(_constants.Constants.USER_TOKEN, true);

    // Get read_time from session storage
    const readTimePromise = this.storage_.get(_constants.Constants.READ_TIME, /*useLocalStorage=*/false);
    let url = '/publication/' + encodeURIComponent(this.publicationId_) + this.action_;
    return Promise.all([(0, _string.hash)((0, _url.getCanonicalUrl)(this.deps_.doc())), swgUserTokenPromise, readTimePromise]).then(values => {
      var _params$metering;
      const hashedCanonicalUrl = values[0];
      const swgUserToken = values[1];
      const readTime = values[2];
      url = addDevModeParamsToUrl(this.win_.location, url);

      // Add encryption param.
      if (params !== null && params !== void 0 && params.encryption) {
        url = (0, _url.addQueryParam)(url, 'crypt', params.encryption.encryptedDocumentKey);
      }

      // Add swgUserToken param.
      if (swgUserToken) {
        url = (0, _url.addQueryParam)(url, 'sut', swgUserToken);
      }
      // Add publisherProvidedId param for swg-basic.
      if (this.config_.publisherProvidedId) {
        url = (0, _url.addQueryParam)(url, 'ppid', this.config_.publisherProvidedId);
      }
      // Add publisherProvidedId param for swg-classic.
      else if (params !== null && params !== void 0 && params.publisherProvidedId && typeof params.publisherProvidedId === 'string' && params.publisherProvidedId.length > 0) {
        url = (0, _url.addQueryParam)(url, 'ppid', params.publisherProvidedId);
      }

      // Add interaction_age param.
      if (readTime) {
        const last = parseInt(readTime, 10);
        if (last) {
          const interactionAge = Math.floor((Date.now() - last) / 1000);
          if (interactionAge >= 0) {
            url = (0, _url.addQueryParam)(url, 'interaction_age', interactionAge.toString());
          }
        }
      }

      /** @type {!GetEntitlementsParamsInternalDef|undefined} */
      let encodableParams = this.enableMeteredByGoogle_ ? {
        metering: {
          clientTypes: [_metering.MeterClientTypes.METERED_BY_GOOGLE],
          owner: this.publicationId_,
          resource: {
            hashedCanonicalUrl
          }
        }
      } : undefined;

      // Add metering params.
      if (this.publicationId_ && params !== null && params !== void 0 && (_params$metering = params.metering) !== null && _params$metering !== void 0 && _params$metering.state && (0, _gaa.queryStringHasFreshGaaParams)(this.win_.location.search)) {
        const meteringStateId = params.metering.state.id;
        if (typeof meteringStateId === 'string' && meteringStateId.length > 0) {
          encodableParams = {
            metering: {
              clientTypes: [_metering.MeterClientTypes.LICENSED_BY_GOOGLE],
              owner: this.publicationId_,
              resource: {
                hashedCanonicalUrl
              },
              // Add publisher provided state and additional fields.
              state: {
                id: meteringStateId,
                attributes: []
              },
              token: this.getGaaToken_()
            }
          };

          // Collect attributes.
          function collectAttributes(_ref) {
            let {
              attributes,
              category
            } = _ref;
            if (!attributes) {
              return;
            }
            const attributeNames = Object.keys(attributes);
            for (const attributeName of attributeNames) {
              const name = `${category}_${attributeName}`;
              const timestamp = Number(attributes[attributeName].timestamp);

              // Validate timestamp.
              const timestampIsTooFarInTheFuture = timestamp > Date.now() / 1000 * 2;
              if (!timestamp || timestampIsTooFarInTheFuture) {
                (0, _log.warn)(`SwG Entitlements: Please specify a Unix timestamp, in seconds, for the "${attributeName}" ${category} attribute. The timestamp you passed (${attributes[attributeName].timestamp}) looks invalid.`);
              }

              // Collect attribute.
              encodableParams.metering.state.attributes.push({
                name,
                timestamp
              });
            }
          }
          collectAttributes({
            attributes: params.metering.state.standardAttributes,
            category: 'standard'
          });
          collectAttributes({
            attributes: params.metering.state.customAttributes,
            category: 'custom'
          });
        } else {
          (0, _log.warn)(`SwG Entitlements: Please specify a metering state ID string, ideally a hash to avoid PII.`);
        }
      }
      if (encodableParams) {
        // Encode params.
        this.encodedParams_ = (0, _bytes.base64UrlEncodeFromBytes)((0, _bytes.utf8EncodeSync)(JSON.stringify(encodableParams)));
        url = (0, _url.addQueryParam)(url, this.encodedParamName_, this.encodedParams_);
      }

      // Build URL.
      return (0, _services2.serviceUrl)(url);
    }).then(url => {
      this.deps_.eventManager().logSwgEvent(_api_messages.AnalyticsEvent.ACTION_GET_ENTITLEMENTS, false);
      return this.fetcher_.fetchCredentialedJson(url);
    }).then(json => {
      let response = json;
      if (this.useArticleEndpoint_) {
        this.article_ = json;
        response = json['entitlements'];
      }
      if (json.errorMessages && json.errorMessages.length > 0) {
        for (const errorMessage of json.errorMessages) {
          (0, _log.warn)('SwG Entitlements: ' + errorMessage);
        }
      }
      return this.parseEntitlements(response);
    });
  }
}

/**
 * Parses entitlement dev mode params from the given hash fragment and adds it
 * to the given URL.
 * @param {!Location} location
 * @param {string} url
 * @return {string}
 */
exports.EntitlementsManager = EntitlementsManager;
function addDevModeParamsToUrl(location, url) {
  const hashParams = (0, _url.parseQueryString)(location.hash);
  const devModeScenario = hashParams['swg.deventitlement'];
  if (devModeScenario === undefined) {
    return url;
  }
  return (0, _url.addQueryParam)(url, 'devEnt', devModeScenario);
}

/**
 * Convert String value of isReadyToPay
 * (from JSON or Cache) to a boolean value.
 * @param {string} value
 * @return {boolean|undefined}
 * @private
 */
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

},{"../api/entitlements":7,"../api/metering":9,"../api/subscriptions":13,"../proto/api_messages":30,"../runtime/services":58,"../ui/toast":64,"../utils/bytes":67,"../utils/constants":68,"../utils/date-utils":69,"../utils/gaa":74,"../utils/jwt":77,"../utils/log":78,"../utils/string":82,"../utils/url":85,"./event-type-mapping":40,"./meter-toast-api":50,"./services":58}],40:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SubscriptionSpecificAnalyticsEventToGoogleAnalyticsEvent = exports.ContributionSpecificAnalyticsEventToGoogleAnalyticsEvent = exports.AnalyticsEventToGoogleAnalyticsEvent = void 0;
exports.analyticsEventToEntitlementResult = analyticsEventToEntitlementResult;
exports.analyticsEventToGoogleAnalyticsEvent = analyticsEventToGoogleAnalyticsEvent;
exports.analyticsEventToPublisherEvent = analyticsEventToPublisherEvent;
exports.publisherEventToAnalyticsEvent = publisherEventToAnalyticsEvent;
exports.showcaseEventToAnalyticsEvents = showcaseEventToAnalyticsEvents;
var _api_messages = require("../proto/api_messages");
var _loggerApi = require("../api/logger-api");
var _subscriptions = require("../api/subscriptions");
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

/** @const {!Object<string,AnalyticsEvent>} */
const PublisherEventToAnalyticsEvent = {
  [_loggerApi.Event.IMPRESSION_PAYWALL]: _api_messages.AnalyticsEvent.IMPRESSION_PAYWALL,
  [_loggerApi.Event.IMPRESSION_AD]: _api_messages.AnalyticsEvent.IMPRESSION_AD,
  [_loggerApi.Event.IMPRESSION_OFFERS]: _api_messages.AnalyticsEvent.IMPRESSION_OFFERS,
  [_loggerApi.Event.ACTION_SUBSCRIPTIONS_LANDING_PAGE]: _api_messages.AnalyticsEvent.ACTION_SUBSCRIPTIONS_LANDING_PAGE,
  [_loggerApi.Event.ACTION_OFFER_SELECTED]: _api_messages.AnalyticsEvent.ACTION_OFFER_SELECTED,
  [_loggerApi.Event.ACTION_PAYMENT_FLOW_STARTED]: _api_messages.AnalyticsEvent.ACTION_PAYMENT_FLOW_STARTED,
  [_loggerApi.Event.ACTION_PAYMENT_COMPLETED]: _api_messages.AnalyticsEvent.ACTION_PAYMENT_COMPLETE,
  [_loggerApi.Event.EVENT_CUSTOM]: _api_messages.AnalyticsEvent.EVENT_CUSTOM
};

/** @const {!Object<?AnalyticsEvent,?Event>} */
const AnalyticsEventToPublisherEvent = {
  [_api_messages.AnalyticsEvent.UNKNOWN]: null,
  [_api_messages.AnalyticsEvent.IMPRESSION_PAYWALL]: _loggerApi.Event.IMPRESSION_PAYWALL,
  [_api_messages.AnalyticsEvent.IMPRESSION_AD]: _loggerApi.Event.IMPRESSION_AD,
  [_api_messages.AnalyticsEvent.IMPRESSION_OFFERS]: _loggerApi.Event.IMPRESSION_OFFERS,
  [_api_messages.AnalyticsEvent.IMPRESSION_SUBSCRIBE_BUTTON]: null,
  [_api_messages.AnalyticsEvent.IMPRESSION_SMARTBOX]: null,
  [_api_messages.AnalyticsEvent.ACTION_SUBSCRIBE]: null,
  [_api_messages.AnalyticsEvent.ACTION_PAYMENT_COMPLETE]: _loggerApi.Event.ACTION_PAYMENT_COMPLETED,
  [_api_messages.AnalyticsEvent.ACTION_ACCOUNT_CREATED]: null,
  [_api_messages.AnalyticsEvent.ACTION_ACCOUNT_ACKNOWLEDGED]: null,
  [_api_messages.AnalyticsEvent.ACTION_SUBSCRIPTIONS_LANDING_PAGE]: _loggerApi.Event.ACTION_SUBSCRIPTIONS_LANDING_PAGE,
  [_api_messages.AnalyticsEvent.ACTION_PAYMENT_FLOW_STARTED]: _loggerApi.Event.ACTION_PAYMENT_FLOW_STARTED,
  [_api_messages.AnalyticsEvent.ACTION_OFFER_SELECTED]: _loggerApi.Event.ACTION_OFFER_SELECTED,
  [_api_messages.AnalyticsEvent.EVENT_PAYMENT_FAILED]: null,
  [_api_messages.AnalyticsEvent.EVENT_CUSTOM]: _loggerApi.Event.EVENT_CUSTOM
};

/** @const {!Object<string,?Array<AnalyticsEvent>>} */
const ShowcaseEvents = {
  // Events related to content being potentially unlockable
  [_subscriptions.ShowcaseEvent.EVENT_SHOWCASE_METER_OFFERED]: [_api_messages.AnalyticsEvent.EVENT_HAS_METERING_ENTITLEMENTS, _api_messages.AnalyticsEvent.EVENT_OFFERED_METER],
  // Events related to content being unlocked
  [_subscriptions.ShowcaseEvent.EVENT_SHOWCASE_UNLOCKED_BY_SUBSCRIPTION]: [_api_messages.AnalyticsEvent.EVENT_UNLOCKED_BY_SUBSCRIPTION],
  [_subscriptions.ShowcaseEvent.EVENT_SHOWCASE_UNLOCKED_BY_METER]: [_api_messages.AnalyticsEvent.EVENT_HAS_METERING_ENTITLEMENTS, _api_messages.AnalyticsEvent.EVENT_UNLOCKED_BY_METER],
  [_subscriptions.ShowcaseEvent.EVENT_SHOWCASE_UNLOCKED_FREE_PAGE]: [_api_messages.AnalyticsEvent.EVENT_UNLOCKED_FREE_PAGE],
  // Events requiring user action to unlock content
  [_subscriptions.ShowcaseEvent.EVENT_SHOWCASE_NO_ENTITLEMENTS_REGWALL]: [_api_messages.AnalyticsEvent.EVENT_NO_ENTITLEMENTS, _api_messages.AnalyticsEvent.IMPRESSION_REGWALL, _api_messages.AnalyticsEvent.IMPRESSION_SHOWCASE_REGWALL],
  // Events requiring subscription to unlock content
  [_subscriptions.ShowcaseEvent.EVENT_SHOWCASE_NO_ENTITLEMENTS_PAYWALL]: [_api_messages.AnalyticsEvent.EVENT_NO_ENTITLEMENTS, _api_messages.AnalyticsEvent.IMPRESSION_PAYWALL],
  [_subscriptions.ShowcaseEvent.EVENT_SHOWCASE_INELIGIBLE_PAYWALL]: [_api_messages.AnalyticsEvent.EVENT_INELIGIBLE_PAYWALL, _api_messages.AnalyticsEvent.EVENT_NO_ENTITLEMENTS]
};

/** @const {!Object<?AnalyticsEvent,?Event>} */
const AnalyticsEventToEntitlementResult = {
  [_api_messages.AnalyticsEvent.IMPRESSION_REGWALL]: _api_messages.EntitlementResult.LOCKED_REGWALL,
  [_api_messages.AnalyticsEvent.EVENT_UNLOCKED_BY_METER]: _api_messages.EntitlementResult.UNLOCKED_METER,
  [_api_messages.AnalyticsEvent.EVENT_UNLOCKED_BY_SUBSCRIPTION]: _api_messages.EntitlementResult.UNLOCKED_SUBSCRIBER,
  [_api_messages.AnalyticsEvent.EVENT_UNLOCKED_FREE_PAGE]: _api_messages.EntitlementResult.UNLOCKED_FREE,
  [_api_messages.AnalyticsEvent.IMPRESSION_PAYWALL]: _api_messages.EntitlementResult.LOCKED_PAYWALL,
  [_api_messages.AnalyticsEvent.EVENT_INELIGIBLE_PAYWALL]: _api_messages.EntitlementResult.INELIGIBLE_PAYWALL
};

/**
 * @param {!string} eventCategory
 * @param {!string} eventAction
 * @param {!string} eventLabel
 * @param {!boolean} nonInteraction
 * @returns {!Object}
 */
const createGoogleAnalyticsEvent = (eventCategory, eventAction, eventLabel, nonInteraction) => ({
  eventCategory,
  eventAction,
  eventLabel,
  nonInteraction
});

/** @const {!Object<?AnalyticsEvent,?Object>} */
const AnalyticsEventToGoogleAnalyticsEvent = {
  [_api_messages.AnalyticsEvent.IMPRESSION_OFFERS]: createGoogleAnalyticsEvent('NTG paywall', 'paywall modal impression', '', true),
  [_api_messages.AnalyticsEvent.IMPRESSION_CONTRIBUTION_OFFERS]: createGoogleAnalyticsEvent('NTG membership', 'offer impressions', '', true),
  [_api_messages.AnalyticsEvent.ACTION_OFFER_SELECTED]: createGoogleAnalyticsEvent('NTG paywall', 'click', '', false),
  [_api_messages.AnalyticsEvent.ACTION_SWG_SUBSCRIPTION_MINI_PROMPT_CLICK]: createGoogleAnalyticsEvent('NTG subscription', 'marketing modal click', '', false),
  [_api_messages.AnalyticsEvent.IMPRESSION_SWG_SUBSCRIPTION_MINI_PROMPT]: createGoogleAnalyticsEvent('NTG subscription', 'marketing modal impression', '', true),
  [_api_messages.AnalyticsEvent.ACTION_SWG_CONTRIBUTION_MINI_PROMPT_CLICK]: createGoogleAnalyticsEvent('NTG membership', 'marketing modal click', '', false),
  [_api_messages.AnalyticsEvent.IMPRESSION_SWG_CONTRIBUTION_MINI_PROMPT]: createGoogleAnalyticsEvent('NTG membership', 'membership modal impression', '', true),
  [_api_messages.AnalyticsEvent.IMPRESSION_NEWSLETTER_OPT_IN]: createGoogleAnalyticsEvent('NTG newsletter', 'newsletter modal impression', '', true),
  [_api_messages.AnalyticsEvent.EVENT_NEWSLETTER_OPTED_IN]: createGoogleAnalyticsEvent('NTG newsletter', 'newsletter signup', 'success', false),
  [_api_messages.AnalyticsEvent.IMPRESSION_REGWALL_OPT_IN]: createGoogleAnalyticsEvent('NTG account', 'registration modal impression', '', true),
  [_api_messages.AnalyticsEvent.EVENT_REGWALL_OPTED_IN]: createGoogleAnalyticsEvent('NTG account', 'registration', 'success', false),
  [_api_messages.AnalyticsEvent.ACTION_SURVEY_DATA_TRANSFER]: createGoogleAnalyticsEvent('', 'survey submission', '', false)
};

/** @const {!Object<?AnalyticsEvent,?Object>} */
exports.AnalyticsEventToGoogleAnalyticsEvent = AnalyticsEventToGoogleAnalyticsEvent;
const SubscriptionSpecificAnalyticsEventToGoogleAnalyticsEvent = {
  [_api_messages.AnalyticsEvent.ACTION_PAYMENT_COMPLETE]: createGoogleAnalyticsEvent('NTG subscription', 'submit', 'success', false)
};

/** @const {!Object<?AnalyticsEvent,?Object>} */
exports.SubscriptionSpecificAnalyticsEventToGoogleAnalyticsEvent = SubscriptionSpecificAnalyticsEventToGoogleAnalyticsEvent;
const ContributionSpecificAnalyticsEventToGoogleAnalyticsEvent = {
  [_api_messages.AnalyticsEvent.ACTION_PAYMENT_COMPLETE]: createGoogleAnalyticsEvent('NTG membership', 'submit', 'success', false)
};

/**
 * Converts a propensity event enum into an analytics event enum.
 * @param {!Event|string} propensityEvent
 * @returns {!AnalyticsEvent}
 */
exports.ContributionSpecificAnalyticsEventToGoogleAnalyticsEvent = ContributionSpecificAnalyticsEventToGoogleAnalyticsEvent;
function publisherEventToAnalyticsEvent(propensityEvent) {
  return PublisherEventToAnalyticsEvent[propensityEvent];
}

/**
 * Converts an analytics event enum into a propensity event enum.
 * @param {?AnalyticsEvent} analyticsEvent
 * @returns {?Event}
 */
function analyticsEventToPublisherEvent(analyticsEvent) {
  return AnalyticsEventToPublisherEvent[analyticsEvent];
}

/**
 * Converts a publisher entitlement event enum into an array analytics events.
 * @param {!ShowcaseEvent} event
 * @returns {!Array<AnalyticsEvent>}
 */
function showcaseEventToAnalyticsEvents(event) {
  return ShowcaseEvents[event] || [];
}
function analyticsEventToEntitlementResult(event) {
  return AnalyticsEventToEntitlementResult[event];
}

/**
 * Converts an analytics event enum into a Google Analytics event object.
 * @param {?AnalyticsEvent} event
 * @param {string} subscriptionFlow
 * @returns {?Object}
 */
function analyticsEventToGoogleAnalyticsEvent(event, subscriptionFlow) {
  let gaEvent = null;
  if (subscriptionFlow) {
    if (subscriptionFlow == _subscriptions.SubscriptionFlows.SUBSCRIBE) {
      gaEvent = SubscriptionSpecificAnalyticsEventToGoogleAnalyticsEvent[event];
    } else if (subscriptionFlow == _subscriptions.SubscriptionFlows.CONTRIBUTE) {
      gaEvent = ContributionSpecificAnalyticsEventToGoogleAnalyticsEvent[event];
    }
  }
  return gaEvent || AnalyticsEventToGoogleAnalyticsEvent[event];
}

},{"../api/logger-api":8,"../api/subscriptions":13,"../proto/api_messages":30}],41:[function(require,module,exports){
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
const ExperimentFlags = {
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
   * Experiment flag for guarding changes to fix PayClient redirect flow.
   */
  PAY_CLIENT_REDIRECT: 'pay-client-redirect',
  /**
   * Directs basic-runtime to use the article endpoint instead of the separate
   * entitlements and clientconfiguration endpoints.
   */
  USE_ARTICLE_ENDPOINT: 'use-article-endpoint',
  /**
   * Experiment flag for logging audience activity.
   */
  LOGGING_AUDIENCE_ACTIVITY: 'logging-audience-activity',
  /**
   * Experiment flag for swapping the location of the counter and the main CTA in Amplio blogs.
   */
  TWG_SWAP_COUNTER_AND_CTA: 'counter_cta_swap_enable_experiment',
  /**
   * Experiment flag for disabling the miniprompt icon on desktop screens wider than 480px.
   */
  DISABLE_DESKTOP_MINIPROMPT: 'disable-desktop-miniprompt'
};
exports.ExperimentFlags = ExperimentFlags;

},{}],42:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getOnExperiments = getOnExperiments;
exports.isExperimentOn = isExperimentOn;
exports.setExperiment = setExperiment;
exports.setExperimentsStringForTesting = setExperimentsStringForTesting;
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
 *
 * Server-side experiments in SwG.
 *
 * These are only observed at runtime via the `#swg.experiments=${experimentsString}`
 * parameter in the URL's fragment.
 *
 * The `${experimentsString}` follows the convention of comma separated
 * experiment ID's, optionally prefixed with hyphen (`-`) indicating you want
 * the experiment to be disabled.
 *
 * An example would look like:
 *  - `MyExperiment,-OtherExperiment` - indicates that you would like `MyExperiment`
 * to be enabled and `OtherExperiment` to be disabled.
 *
 * Due to restrictions, server flags can only be enabled following the
 * internal policy; otherwise they are ignored.
 */

/**
 * @enum {string}
 */
const Selection = {
  EXPERIMENT: 'e',
  CONTROL: 'c'
};

/**
 * A comma-separated set of experiments.
 * @type {string}
 */
let experimentsString = '';

/**
 * A parsed map of experiments.
 * @type {?Object<string, boolean>}
 */
let experimentMap = null;

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
    let combinedExperimentString = experimentsString;
    try {
      const query = (0, _url.parseQueryString)(win.location.hash);
      const experimentStringFromHash = query['swg.experiments'];
      if (experimentStringFromHash) {
        combinedExperimentString += ',' + experimentStringFromHash;
      }
    } catch (e) {
      // Ignore: experiment parsing cannot block runtime.
      _errors.ErrorUtils.throwAsync(e);
    }

    // Format:
    // - experimentString = (experimentSpec,)*
    for (let experimentString of combinedExperimentString.split(',')) {
      experimentString = experimentString.trim();
      if (!experimentString) {
        continue;
      }
      try {
        parseSetExperiment(win, experimentMap, experimentString);
      } catch (e) {
        // Ignore: experiment parsing cannot block runtime.
        _errors.ErrorUtils.throwAsync(e);
      }
    }
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
  let experimentId;
  let fraction;
  let control = false;
  const eq = spec.indexOf(':');
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
  }

  // Calculate "on"/"off".
  let on;
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
      const storageKey = 'subscribe.google.com:e:' + experimentId + ':' + fraction + (control ? 'c' : '');
      let selection = parseSelection(win.sessionStorage.getItem(storageKey));
      if (!selection) {
        // Is experiment/control range?
        if (win.Math.random() * 100 <= fraction * (control ? 2 : 1)) {
          const inExperiment = control ? win.Math.random() <= 0.5 : true;
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
  const experimentMap = getExperiments(win);
  const experiments = [];
  for (const experiment in experimentMap) {
    if (experimentMap[experiment]) {
      experiments.push(experiment);
    }
  }
  return experiments;
}

},{"../utils/errors":73,"../utils/url":85}],43:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.XhrFetcher = exports.Fetcher = void 0;
var _errors = require("../utils/errors");
var _xhr = require("../utils/xhr");
var _json = require("../utils/json");
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

const jsonSaftyPrefix = /^(\)\]\}'\n)/;

/**
 * @interface
 */
class Fetcher {
  /**
   * @param {string} unusedUrl
   * @return {!Promise<!Object>}
   */
  fetchCredentialedJson(unusedUrl) {}

  /**
   * @param {string} unusedUrl
   * @param {!../utils/xhr.FetchInitDef} unusedInit
   * @return {!Promise<!../utils/xhr.FetchResponse>}
   */
  fetch(unusedUrl, unusedInit) {}

  /**
   * POST data to a URL endpoint, do not wait for a response.
   * @param {!string} unusedUrl
   * @param {!../proto/api_messages.Message} unusedData
   */
  sendBeacon(unusedUrl, unusedData) {}

  /**
   * POST data to a URL endpoint, get a Promise for a response
   * @param {!string} unusedUrl
   * @param {!../proto/api_messages.Message} unusedMessage
   * @return {!Promise<!../utils/xhr.FetchResponse>}
   */
  sendPost(unusedUrl, unusedMessage) {}
}

/**
 * @implements {Fetcher}
 */
exports.Fetcher = Fetcher;
class XhrFetcher {
  /**
   * @param {!Window} win
   */
  constructor(win) {
    /** @const {!Xhr} */
    this.xhr_ = new _xhr.Xhr(win);
  }

  /** @override */
  fetchCredentialedJson(url) {
    const init = /** @type {!../utils/xhr.FetchInitDef} */{
      method: 'GET',
      headers: {
        'Accept': 'text/plain, application/json'
      },
      credentials: 'include'
    };
    return this.fetch(url, init).then(response => {
      return response.text().then(text => {
        // Remove "")]}'\n" XSSI prevention prefix in safe responses.
        const cleanedText = text.replace(jsonSaftyPrefix, '');
        return (0, _json.parseJson)(cleanedText);
      });
    });
  }

  /** @override */
  sendPost(url, message) {
    const init = /** @type {!../utils/xhr.FetchInitDef} */{
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
      },
      credentials: 'include',
      body: 'f.req=' + (0, _url.serializeProtoMessageForUrl)(message)
    };
    return this.fetch(url, init).then(response => {
      if (!response) {
        return {};
      }
      return response.text().then(text => {
        try {
          // Remove "")]}'\n" XSSI prevention prefix in safe responses.
          const cleanedText = text.replace(jsonSaftyPrefix, '');
          return (0, _json.parseJson)(cleanedText);
        } catch (e) {
          _errors.ErrorUtils.throwAsync(e);
          return {};
        }
      });
    });
  }

  /** @override */
  fetch(url, init) {
    return this.xhr_.fetch(url, init);
  }

  /** @override */
  sendBeacon(url, data) {
    if (navigator.sendBeacon) {
      const headers = {
        type: 'application/x-www-form-urlencoded;charset=UTF-8'
      };
      const blob = new Blob(['f.req=' + (0, _url.serializeProtoMessageForUrl)(data)], headers);
      navigator.sendBeacon(url, blob);
      return;
    }
    // Only newer browsers support beacon.  Fallback to standard XHR POST.
    this.sendPost(url, data);
  }
}
exports.XhrFetcher = XhrFetcher;

},{"../utils/errors":73,"../utils/json":76,"../utils/url":85,"../utils/xhr":86}],44:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.GoogleAnalyticsEventListener = void 0;
var _eventTypeMapping = require("./event-type-mapping");
var _types = require("../utils/types");
/**
 * Copyright 2021 The Subscribe with Google Authors. All Rights Reserved.
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

/* eslint-disable no-unused-vars */
/** @typedef {?function(string, string, Object)} */
let AnalyticsMethod;

/** @typedef {{ga: AnalyticsMethod, gtag: AnalyticsMethod}} */
let WindowWithAnalyticsMethods;
/* eslint-enable no-unused-vars */

class GoogleAnalyticsEventListener {
  /**
   * @param {!./deps.DepsDef} deps
   */
  constructor(deps) {
    /** @private @const {!./deps.DepsDef} deps */
    this.deps_ = deps;

    /** @private @const {!./client-event-manager.ClientEventManager} */
    this.eventManager_ = deps.eventManager();
  }

  /**
   * Start listening to client events
   */
  start() {
    this.eventManager_.registerEventListener(this.handleClientEvent_.bind(this));
  }

  /**
   *  Listens for new events from the events manager and logs appropriate events to Google Analytics.
   * @param {!../api/client-event-manager-api.ClientEvent} event
   * @param {(!../api/client-event-manager-api.ClientEventParams|undefined)=} eventParams
   */
  handleClientEvent_(event) {
    let eventParams = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : undefined;
    // Require either ga function (analytics.js) or gtag function (gtag.js).
    const gaIsEligible = GoogleAnalyticsEventListener.isGaEligible(this.deps_);
    const gtagIsEligible = GoogleAnalyticsEventListener.isGtagEligible(this.deps_);
    const neitherIsEligible = !gaIsEligible && !gtagIsEligible;
    if (neitherIsEligible) {
      return;
    }

    // Extract methods from window.
    const {
      ga,
      gtag
    } = /** @type {!WindowWithAnalyticsMethods} */
    this.deps_.win();
    let subscriptionFlow = '';
    if (event.additionalParameters) {
      // additionalParameters isn't strongly typed so checking for both object and class notation.
      subscriptionFlow = event.additionalParameters.subscriptionFlow || event.additionalParameters.getSubscriptionFlow();
    }
    let gaEvent = (0, _eventTypeMapping.analyticsEventToGoogleAnalyticsEvent)(event.eventType, subscriptionFlow);
    if (!gaEvent) {
      return;
    }
    const analyticsParams = (eventParams === null || eventParams === void 0 ? void 0 : eventParams.googleAnalyticsParameters) || {};
    gaEvent = {
      ...gaEvent,
      eventCategory: analyticsParams.event_category || gaEvent.eventCategory,
      eventLabel: analyticsParams.event_label || gaEvent.eventLabel
    };

    // TODO(b/234825847): Remove this once universal analytics is deprecated in 2023.
    if (gaIsEligible) {
      ga('send', 'event', gaEvent);
    }
    if (gtagIsEligible) {
      const gtagEvent = {
        'event_category': gaEvent.eventCategory,
        'event_label': gaEvent.eventLabel,
        'non_interaction': gaEvent.nonInteraction,
        ...analyticsParams
      };
      gtag('event', gaEvent.eventAction, gtagEvent);
    }
  }

  /**
   * Function to determine whether event is eligible for GA logging.
   * @param {!./deps.DepsDef} deps
   * @returns {boolean}
   */
  static isGaEligible(deps) {
    return (0, _types.isFunction)( /** @type {!WindowWithAnalyticsMethods} */deps.win().ga);
  }

  /**
   * Function to determine whether event is eligible for gTag logging.
   * @param {!./deps.DepsDef} deps
   * @returns {boolean}
   */
  static isGtagEligible(deps) {
    return (0, _types.isFunction)( /** @type {!WindowWithAnalyticsMethods} */deps.win().gtag);
  }
}
exports.GoogleAnalyticsEventListener = GoogleAnalyticsEventListener;

},{"../utils/types":84,"./event-type-mapping":40}],45:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.JsError = void 0;
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
class JsError {
  /**
   * @param {!../model/doc.Doc} doc
   */
  constructor(doc) {
    /** @private @const {!../model/doc.Doc} */
    this.doc_ = doc;

    /** @private @const {!Promise} */
    this.microTask_ = Promise.resolve();
  }

  /**
   * @param {...*} var_args
   * @return {!Promise}
   */
  error(var_args) {
    const args = Array.prototype.slice.call(arguments, 0);
    return this.microTask_.then(() => {
      const error = createErrorVargs.apply(null, args);
      if (error.reported) {
        return;
      }
      const img = this.doc_.getWin().document.createElement('img');
      img.src = 'https://news.google.com/_/SubscribewithgoogleClientUi/jserror' + '?error=' + encodeURIComponent(String(error)) + '&script=' + encodeURIComponent('https://news.google.com/swg/js/v1/swg.js') + '&line=' + (error.lineNumber || 1) + '&trace=' + encodeURIComponent(error.stack);
      // Appending this image to DOM is not necessary.
      error.reported = true;
    });
  }
}

/**
 * @param {...*} var_args
 * @return {!Error}
 */
exports.JsError = JsError;
function createErrorVargs(var_args) {
  let error = null;
  let message = '';
  for (let i = 0; i < arguments.length; i++) {
    const arg = arguments[i];
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
  const messageProperty = Object.getOwnPropertyDescriptor(error, 'message');
  if (messageProperty && messageProperty.writable) {
    return error;
  }
  const {
    message,
    stack
  } = error;
  const e = new Error(message);
  // Copy all the extraneous things we attach.
  for (const prop in error) {
    e[prop] = error[prop];
  }
  // Ensure these are copied.
  e.stack = stack;
  return e;
}

},{}],46:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LinkbackFlow = exports.LinkSaveFlow = exports.LinkCompleteFlow = void 0;
var _activityIframeView = require("../ui/activity-iframe-view");
var _api_messages = require("../proto/api_messages");
var _constants = require("../utils/constants");
var _subscriptions = require("../api/subscriptions");
var _activityUtils = require("../utils/activity-utils");
var _errors = require("../utils/errors");
var _services = require("./services");
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

const LINK_REQUEST_ID = 'swg-link';

/**
 * The flow to link an existing publisher account to an existing google account.
 */
class LinkbackFlow {
  /**
   * @param {!./deps.DepsDef} deps
   */
  constructor(deps) {
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
  start() {
    let params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    this.deps_.callbacks().triggerFlowStarted(_subscriptions.SubscriptionFlows.LINK_ACCOUNT);
    const forceRedirect = this.deps_.config().windowOpenMode == _subscriptions.WindowOpenMode.REDIRECT;
    const args = params.ampReaderId ? (0, _services.feArgs)({
      'publicationId': this.pageConfig_.getPublicationId(),
      'ampReaderId': params.ampReaderId
    }) : (0, _services.feArgs)({
      'publicationId': this.pageConfig_.getPublicationId()
    });
    const opener = this.activityPorts_.open(LINK_REQUEST_ID, (0, _services.feUrl)('/linkbackstart'), forceRedirect ? '_top' : '_blank', args, {});
    this.deps_.eventManager().logSwgEvent(_api_messages.AnalyticsEvent.IMPRESSION_LINK);
    this.dialogManager_.popupOpened(opener && opener.targetWin);
    return Promise.resolve();
  }
}

/**
 * The class for Link accounts flow.
 */
exports.LinkbackFlow = LinkbackFlow;
class LinkCompleteFlow {
  /**
   * @param {!./deps.DepsDef} deps
   */
  static configurePending(deps) {
    /**
     * Handler function.
     * @param {!../components/activities.ActivityPortDef} port
     */
    function handler(port) {
      deps.entitlementsManager().blockNextNotification();
      deps.callbacks().triggerLinkProgress();
      deps.dialogManager().popupClosed();
      const promise = (0, _activityUtils.acceptPortResultData)(port, (0, _services.feOrigin)(), /* requireOriginVerified */false, /* requireSecureChannel */false);
      return promise.then(response => {
        deps.eventManager().logSwgEvent(_api_messages.AnalyticsEvent.ACTION_LINK_CONTINUE, true);
        const flow = new LinkCompleteFlow(deps, response);
        flow.start();
      }, reason => {
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
  constructor(deps, response) {
    /** @private @const {!./deps.DepsDef} */
    this.deps_ = deps;

    /** @private @const {!Window} */
    this.win_ = deps.win();

    /** @private @const {!./client-config-manager.ClientConfigManager} */
    this.clientConfigManager_ = deps.clientConfigManager();

    /** @private @const {!../components/activities.ActivityPorts} */
    this.activityPorts_ = deps.activities();

    /** @private @const {!../components/dialog-manager.DialogManager} */
    this.dialogManager_ = deps.dialogManager();

    /** @private @const {!./entitlements-manager.EntitlementsManager} */
    this.entitlementsManager_ = deps.entitlementsManager();

    /** @private @const {!./callbacks.Callbacks} */
    this.callbacks_ = deps.callbacks();
    const index = response && response['index'] || '0';

    /** @private {?ActivityIframeView} */
    this.activityIframeView_ = null;

    /** @private @const {!Promise<!ActivityIframeView>} */
    this.activityIframeViewPromise_ = this.clientConfigManager_.getClientConfig().then(clientConfig => new _activityIframeView.ActivityIframeView(this.win_, this.activityPorts_, (0, _services.feUrl)('/linkconfirmiframe', {}, clientConfig.usePrefixedHostPath, 'u/' + index), (0, _services.feArgs)({
      'productId': deps.pageConfig().getProductId(),
      'publicationId': deps.pageConfig().getPublicationId()
    }), /* shouldFadeBody */true));

    /** @private {?function()} */
    this.completeResolver_ = null;

    /** @private @const {!Promise} */
    this.completePromise_ = new Promise(resolve => {
      this.completeResolver_ = resolve;
    });
  }

  /**
   * Starts the Link account flow.
   * @return {!Promise}
   */
  start() {
    return this.activityIframeViewPromise_.then(activityIframeView => {
      this.activityIframeView_ = activityIframeView;
      const promise = this.activityIframeView_.acceptResultAndVerify((0, _services.feOrigin)(), /* requireOriginVerified */true, /* requireSecureChannel */true);
      promise.then(response => {
        this.complete_(response);
      }).catch(reason => {
        // Rethrow async.
        setTimeout(() => {
          throw reason;
        });
      }).then(() => {
        // The flow is complete.
        this.dialogManager_.completeView(this.activityIframeView_);
      });
      this.deps_.eventManager().logSwgEvent(_api_messages.AnalyticsEvent.EVENT_GOOGLE_UPDATED, true);
      this.deps_.eventManager().logSwgEvent(_api_messages.AnalyticsEvent.IMPRESSION_GOOGLE_UPDATED, true);
      return this.dialogManager_.openView(this.activityIframeView_);
    });
  }

  /**
   * @param {?Object} response
   * @private
   */
  complete_(response) {
    this.deps_.eventManager().logSwgEvent(_api_messages.AnalyticsEvent.ACTION_GOOGLE_UPDATED_CLOSE, true);
    const userToken = response['swgUserToken'];
    if (userToken) {
      this.deps_.storage().set(_constants.Constants.USER_TOKEN, userToken, true);
    }
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
  whenComplete() {
    return this.completePromise_;
  }
}

/**
 * The flow to save subscription information from an existing publisher account
 * to an existing google account.  The accounts may or may not already be
 * linked.
 */
exports.LinkCompleteFlow = LinkCompleteFlow;
class LinkSaveFlow {
  /**
   * @param {!./deps.DepsDef} deps
   * @param {!../api/subscriptions.SaveSubscriptionRequestCallback} callback
   */
  constructor(deps, callback) {
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
  getRequestPromise() {
    return this.requestPromise_;
  }

  /**
   * @private
   */
  complete_() {
    this.dialogManager_.completeView(this.activityIframeView_);
  }

  /**
   * @param {!Object} result
   * @return {!Promise<boolean>}
   * @private
   */
  handleLinkSaveResponse_(result) {
    // This flow is complete
    this.complete_();
    let startPromise;
    let linkConfirm = null;
    if (result['linked']) {
      // When linking succeeds, start link confirmation flow
      this.dialogManager_.popupClosed();
      this.deps_.callbacks().triggerFlowStarted(_subscriptions.SubscriptionFlows.LINK_ACCOUNT);
      linkConfirm = new LinkCompleteFlow(this.deps_, result);
      startPromise = linkConfirm.start();
    } else {
      startPromise = Promise.reject((0, _errors.createCancelError)(this.win_, 'not linked'));
    }
    const completePromise = startPromise.then(() => {
      this.deps_.callbacks().triggerLinkProgress();
      return linkConfirm.whenComplete();
    });
    return completePromise.then(() => {
      return true;
    });
  }

  /**
   * @param {LinkingInfoResponse} response
   * @private
   */
  sendLinkSaveToken_(response) {
    if (!response || !response.getRequested()) {
      return;
    }
    this.requestPromise_ = new Promise(resolve => resolve(this.callback_())).then(request => {
      const saveRequest = new _api_messages.LinkSaveTokenRequest();
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
      this.activityIframeView_.execute(saveRequest);
      return request;
    }).catch(reason => {
      // The flow is complete.
      this.complete_();
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
  start() {
    const iframeArgs = this.activityPorts_.addDefaultArguments({
      'isClosable': true
    });
    this.activityIframeView_ = new _activityIframeView.ActivityIframeView(this.win_, this.activityPorts_, (0, _services.feUrl)('/linksaveiframe'), iframeArgs, /* shouldFadeBody */false, /* hasLoadingIndicator */true);
    this.activityIframeView_.on(_api_messages.LinkingInfoResponse, this.sendLinkSaveToken_.bind(this));
    this.openPromise_ = this.dialogManager_.openView(this.activityIframeView_, /* hidden */true);
    this.deps_.eventManager().logSwgEvent(_api_messages.AnalyticsEvent.IMPRESSION_SAVE_SUBSCR_TO_GOOGLE);
    /** {!Promise<boolean>} */
    return this.activityIframeView_.acceptResultAndVerify((0, _services.feOrigin)(), /* requireOriginVerified */true, /* requireSecureChannel */true).then(result => {
      return this.handleLinkSaveResponse_(result);
    }).catch(reason => {
      // In case this flow wasn't complete, complete it here
      this.complete_();
      // Handle cancellation from user, link confirm start or completion here
      if ((0, _errors.isCancelError)(reason)) {
        this.deps_.eventManager().logSwgEvent(_api_messages.AnalyticsEvent.ACTION_SAVE_SUBSCR_TO_GOOGLE_CANCEL, true);
        this.deps_.callbacks().triggerFlowCanceled(_subscriptions.SubscriptionFlows.LINK_ACCOUNT);
        return false;
      }
      throw reason;
    });
  }
}
exports.LinkSaveFlow = LinkSaveFlow;

},{"../api/subscriptions":13,"../proto/api_messages":30,"../ui/activity-iframe-view":62,"../utils/activity-utils":65,"../utils/constants":68,"../utils/errors":73,"./services":58}],47:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Logger = void 0;
var _api_messages = require("../proto/api_messages");
var _loggerApi = require("../api/logger-api");
var _types = require("../utils/types");
var _eventTypeMapping = require("./event-type-mapping");
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
 * @implements {../api/logger-api.LoggerApi}
 */
class Logger {
  /**
   * @param {!./deps.DepsDef} deps
   */
  constructor(deps) {
    /** @private @const {!../api/client-event-manager-api.ClientEventManagerApi} */
    this.eventManager_ = deps.eventManager();
  }

  /** @override */
  sendSubscriptionState(state, jsonProducts) {
    if (!(0, _types.isEnumValue)(_loggerApi.SubscriptionState, state)) {
      throw new Error('Invalid subscription state provided');
    }
    if ((_loggerApi.SubscriptionState.SUBSCRIBER == state || _loggerApi.SubscriptionState.PAST_SUBSCRIBER == state) && !jsonProducts) {
      throw new Error('Entitlements must be provided for users with' + ' active or expired subscriptions');
    }
    if (jsonProducts && !(0, _types.isObject)(jsonProducts)) {
      throw new Error('Entitlements must be an Object');
    }
    let productsOrSkus = null;
    if (jsonProducts) {
      productsOrSkus = JSON.stringify(jsonProducts);
    }
    this.eventManager_.logEvent({
      eventType: _api_messages.AnalyticsEvent.EVENT_SUBSCRIPTION_STATE,
      eventOriginator: _api_messages.EventOriginator.PUBLISHER_CLIENT,
      isFromUserAction: null,
      additionalParameters: {
        state,
        productsOrSkus
      }
    });
  }

  /** @override */
  sendEvent(userEvent) {
    let data = null;
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
}
exports.Logger = Logger;

},{"../api/logger-api":8,"../proto/api_messages":30,"../utils/types":84,"./event-type-mapping":40}],48:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LoginNotificationApi = void 0;
var _activityIframeView = require("../ui/activity-iframe-view");
var _subscriptions = require("../api/subscriptions");
var _services = require("./services");
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

class LoginNotificationApi {
  /**
   * @param {!./deps.DepsDef} deps
   */
  constructor(deps) {
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
    }), /* shouldFadeBody */true);
  }

  /**
   * Continues the Login flow (after waiting).
   * @return {!Promise}
   */
  start() {
    this.deps_.callbacks().triggerFlowStarted(_subscriptions.SubscriptionFlows.SHOW_LOGIN_NOTIFICATION);
    this.openViewPromise_ = this.dialogManager_.openView(this.activityIframeView_);
    return this.activityIframeView_.acceptResult().then(() => {
      // The consent part is complete.
      this.dialogManager_.completeView(this.activityIframeView_);
    }, reason => {
      this.dialogManager_.completeView(this.activityIframeView_);
      throw reason;
    });
  }
}
exports.LoginNotificationApi = LoginNotificationApi;

},{"../api/subscriptions":13,"../ui/activity-iframe-view":62,"./services":58}],49:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LoginPromptApi = void 0;
var _activityIframeView = require("../ui/activity-iframe-view");
var _subscriptions = require("../api/subscriptions");
var _services = require("./services");
var _errors = require("../utils/errors");
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

class LoginPromptApi {
  /**
   * @param {!./deps.DepsDef} deps
   */
  constructor(deps) {
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
    }), /* shouldFadeBody */true);
  }

  /**
   * Prompts the user to login.
   * @return {!Promise}
   */
  start() {
    this.deps_.callbacks().triggerFlowStarted(_subscriptions.SubscriptionFlows.SHOW_LOGIN_PROMPT);
    this.openViewPromise_ = this.dialogManager_.openView(this.activityIframeView_);
    return this.activityIframeView_.acceptResult().then(() => {
      // The consent part is complete.
      this.dialogManager_.completeView(this.activityIframeView_);
    }, reason => {
      if ((0, _errors.isCancelError)(reason)) {
        this.deps_.callbacks().triggerFlowCanceled(_subscriptions.SubscriptionFlows.SHOW_LOGIN_PROMPT);
      } else {
        this.dialogManager_.completeView(this.activityIframeView_);
      }
      throw reason;
    });
  }
}
exports.LoginPromptApi = LoginPromptApi;

},{"../api/subscriptions":13,"../ui/activity-iframe-view":62,"../utils/errors":73,"./services":58}],50:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MeterToastApiParams = exports.MeterToastApi = exports.MINIMIZED_IFRAME_SIZE = exports.IframeUrlByMeterClientType = exports.IFRAME_BOX_SHADOW = exports.DEFAULT_IFRAME_URL = exports.ANONYMOUS_USER_ATTRIBUTE = void 0;
var _activityIframeView = require("../ui/activity-iframe-view");
var _api_messages = require("../proto/api_messages");
var _metering = require("../api/metering");
var _subscriptions = require("../api/subscriptions");
var _services = require("./services");
var _errors = require("../utils/errors");
var _url = require("../utils/url");
var _style = require("../utils/style");
var _log = require("../utils/log");
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

const IFRAME_BOX_SHADOW = 'rgba(60, 64, 67, 0.3) 0px -2px 5px, rgba(60, 64, 67, 0.15) 0px -5px 5px';
exports.IFRAME_BOX_SHADOW = IFRAME_BOX_SHADOW;
const MINIMIZED_IFRAME_SIZE = '420px';
exports.MINIMIZED_IFRAME_SIZE = MINIMIZED_IFRAME_SIZE;
const DEFAULT_IFRAME_URL = '/metertoastiframe';
exports.DEFAULT_IFRAME_URL = DEFAULT_IFRAME_URL;
const ANONYMOUS_USER_ATTRIBUTE = 'anonymous_user';
/**
 * The iframe URLs to be used per MeterClientType
 * @type {Object.<MeterClientTypes, string>}
 */
exports.ANONYMOUS_USER_ATTRIBUTE = ANONYMOUS_USER_ATTRIBUTE;
const IframeUrlByMeterClientType = {
  [_metering.MeterClientTypes.LICENSED_BY_GOOGLE]: '/metertoastiframe',
  [_metering.MeterClientTypes.METERED_BY_GOOGLE]: '/meteriframe'
};
/** @enum {string} */
exports.IframeUrlByMeterClientType = IframeUrlByMeterClientType;
const MeterType = {
  UNKNOWN: 'UNKNOWN',
  KNOWN: 'KNOWN'
};

/**
 * Properties:
 * - iframeUrl: Relative URL of the iframe, e.g. "/meteriframe".
 * - iframeUrlParams: List of extra params appended to the URL.
 *
 * @typedef {{
 *   meterClientType: (MeterClientTypes|undefined),
 * }}
 */
let MeterToastApiParams;
exports.MeterToastApiParams = MeterToastApiParams;
class MeterToastApi {
  /**
   * @param {!./deps.DepsDef} deps
   * @param {!MeterToastApiParams=} params
   */
  constructor(deps) {
    let {
      meterClientType = _metering.MeterClientTypes.LICENSED_BY_GOOGLE,
      meterClientUserAttribute = ANONYMOUS_USER_ATTRIBUTE
    } = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    /** @private @const {!./deps.DepsDef} */
    this.deps_ = deps;

    /** @private @const {!Window} */
    this.win_ = deps.win();

    /** @private @const {!../components/activities.ActivityPorts} */
    this.activityPorts_ = deps.activities();

    /** @private @const {!../components/dialog-manager.DialogManager} */
    this.dialogManager_ = deps.dialogManager();

    /** @private @const {!MeterClientTypes} */
    this.meterClientType_ = meterClientType;

    /** @private @const {string} */
    this.meterClientUserAttribute_ = meterClientUserAttribute;

    /**
     * Function this class calls when a user dismisses the toast to consume a
     * free read.
     * @private {?function()}
     */
    this.onConsumeCallback_ = null;

    /**
     * Boolean indicating whether or not the onConsumeCallback_ has been handled
     * (either called or ignored). This is used to protect against unexpected
     * cancellations not consuming a meter.
     * @private {!boolean}
     */
    this.onConsumeCallbackHandled_ = false;

    /** @private {?function()} */
    this.scrollEventListener_ = null;
  }

  /**
   * Shows the user the metering toast.
   * @return {!Promise}
   */
  start() {
    const additionalArguments = {
      isClosable: true,
      hasSubscriptionCallback: this.deps_.callbacks().hasSubscribeRequestCallback()
    };
    if (this.meterClientType_ === _metering.MeterClientTypes.METERED_BY_GOOGLE) {
      additionalArguments['meterType'] = this.meterClientUserAttribute_ === ANONYMOUS_USER_ATTRIBUTE ? MeterType.UNKNOWN : MeterType.KNOWN;
    }
    const iframeArgs = this.activityPorts_.addDefaultArguments(additionalArguments);
    const iframeUrl = IframeUrlByMeterClientType[this.meterClientType_ ?? _metering.MeterClientTypes.LICENSED_BY_GOOGLE];

    /** @private @const {!ActivityIframeView} */
    this.activityIframeView_ = new _activityIframeView.ActivityIframeView(this.win_, this.activityPorts_, (0, _services.feUrl)(iframeUrl, {
      'origin': (0, _url.parseUrl)(this.win_.location.href).origin,
      'hl': this.deps_.clientConfigManager().getLanguage()
    }), iframeArgs, /* shouldFadeBody */false);

    /** @private @const {!function()} */
    this.sendCloseRequestFunction_ = () => {
      const closeRequest = new _api_messages.ToastCloseRequest();
      closeRequest.setClose(true);
      this.activityIframeView_.execute(closeRequest);
      this.removeCloseEventListener();
      this.deps_.eventManager().logSwgEvent(_api_messages.AnalyticsEvent.ACTION_METER_TOAST_CLOSED_BY_ARTICLE_INTERACTION, true);
      if (this.onConsumeCallback_ && !this.onConsumeCallbackHandled_) {
        this.onConsumeCallbackHandled_ = true;
        this.onConsumeCallback_();
      }
    };
    this.deps_.callbacks().triggerFlowStarted(_subscriptions.SubscriptionFlows.SHOW_METER_TOAST);
    this.activityIframeView_.on(_api_messages.ViewSubscriptionsResponse, this.startSubscriptionFlow_.bind(this));
    if (!this.deps_.callbacks().hasSubscribeRequestCallback() && !this.deps_.callbacks().hasOffersFlowRequestCallback()) {
      const errorMessage = '[swg.js]: `setOnNativeSubscribeRequest` has not been set ' + 'before starting the metering flow, so users will not be able to ' + 'subscribe from the metering dialog directly. Please call ' + '`setOnNativeSubscribeRequest` with a subscription flow callback ' + 'before starting metering.';
      (0, _log.warn)(errorMessage);
    }
    this.dialogManager_.handleCancellations(this.activityIframeView_).catch(reason => {
      // Possibly call onConsumeCallback on all dialog cancellations to
      // ensure unexpected dialog closures don't give access without a
      // meter consumed.
      if (this.onConsumeCallback_ && !this.onConsumeCallbackHandled_) {
        this.onConsumeCallbackHandled_ = true;
        this.onConsumeCallback_();
      }
      // Don't throw on cancel errors since they happen when a user closes
      // the toast, which is expected.
      if (!(0, _errors.isCancelError)(reason)) {
        // eslint-disable-next-line no-console
        console /*OK*/.error('[swg.js]: Error occurred during meter toast handling: ' + reason);
        throw reason;
      }
    });
    return this.dialogManager_.openDialog().then(dialog => {
      this.setDialogBoxShadow_();
      this.setLoadingViewWidth_();
      return dialog.openView(this.activityIframeView_).then(() => {
        // Allow closing of the iframe with any scroll or click event.
        this.win_.addEventListener('click', this.sendCloseRequestFunction_);
        this.win_.addEventListener('touchstart', this.sendCloseRequestFunction_);
        this.win_.addEventListener('mousedown', this.sendCloseRequestFunction_);
        // Making body's overflow property 'hidden' to prevent scrolling
        // while swiping on the iframe only on mobile.
        if (this.isMobile_()) {
          const $body = this.win_.document.body;
          (0, _style.setStyle)($body, 'overflow', 'hidden');
        } else {
          let start, scrollTimeout;
          this.scrollEventListener_ = () => {
            start = start || this.win_. /*REVIEW*/pageYOffset;
            this.win_.clearTimeout(scrollTimeout);
            scrollTimeout = this.win_.setTimeout(() => {
              // If the scroll is longer than 100, close the toast.
              if (Math.abs(this.win_. /*REVIEW*/pageYOffset - start) > 100) {
                this.sendCloseRequestFunction_();
              }
            }, 100);
          };
          this.win_.addEventListener('scroll', this.scrollEventListener_);
        }
        this.deps_.eventManager().logSwgEvent(_api_messages.AnalyticsEvent.IMPRESSION_METER_TOAST);
        this.deps_.eventManager().logSwgEvent(_api_messages.AnalyticsEvent.EVENT_OFFERED_METER);
      });
    });
  }

  /**
   * Sets a callback function this class calls when a user dismisses the toast to consume a free read.
   * @param {function()} onConsumeCallback
   */
  setOnConsumeCallback(onConsumeCallback) {
    this.onConsumeCallback_ = onConsumeCallback;
  }

  /**
   * Removes the event listeners that close the iframe and make the body visible.
   */
  removeCloseEventListener() {
    this.win_.removeEventListener('click', this.sendCloseRequestFunction_);
    this.win_.removeEventListener('touchstart', this.sendCloseRequestFunction_);
    this.win_.removeEventListener('mousedown', this.sendCloseRequestFunction_);
    if (this.isMobile_()) {
      const $body = this.win_.document.body;
      (0, _style.setStyle)($body, 'overflow', 'visible');
    } else {
      this.win_.removeEventListener('scroll', this.scrollEventListener_);
    }
  }

  /**
   * Changes the iframe box shadow to match desired specifications on mobile.
   */
  setDialogBoxShadow_() {
    const mobileMediaQuery = this.win_.matchMedia('(max-width: 640px), (max-height: 640px)');
    const element = this.dialogManager_.getDialog().getElement();
    if (mobileMediaQuery.matches) {
      (0, _style.setImportantStyles)(element, {
        'box-shadow': IFRAME_BOX_SHADOW
      });
    }
    mobileMediaQuery.addListener(changed => {
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
   * Changes the size of the loading iframe on desktop to match the size of
   * the meter toast iframe.
   */
  setLoadingViewWidth_() {
    const desktopMediaQuery = this.win_.matchMedia('(min-width: 640px) and (min-height: 640px)');
    if (desktopMediaQuery.matches) {
      const element = this.dialogManager_.getDialog().getLoadingView().getElement();
      (0, _style.setImportantStyles)(element, {
        'width': MINIMIZED_IFRAME_SIZE,
        'margin': 'auto'
      });
    }
  }

  /**
   * @param {ViewSubscriptionsResponse} response
   * @private
   */
  startSubscriptionFlow_(response) {
    this.removeCloseEventListener();
    // We shouldn't decrement the meter on redirects, so don't call onConsumeCallback.
    this.onConsumeCallbackHandled_ = true;
    if (response.getNative()) {
      this.deps_.callbacks().triggerSubscribeRequest();
    } else {
      this.deps_.callbacks().triggerOffersFlowRequest();
    }
  }

  /**
   * Returns true if the window userAgent is a mobile platform.
   * @private
   */
  isMobile_() {
    return !!this.win_.navigator.userAgent.match(/Android|iPhone|iPad|iPod|BlackBerry|IEMobile/i);
  }
}
exports.MeterToastApi = MeterToastApi;

},{"../api/metering":9,"../api/subscriptions":13,"../proto/api_messages":30,"../ui/activity-iframe-view":62,"../utils/errors":73,"../utils/log":78,"../utils/style":83,"../utils/url":85,"./services":58}],51:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.OffersApi = void 0;
var _services = require("./services");
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

class OffersApi {
  /**
   * @param {!../model/page-config.PageConfig} config
   * @param {!./fetcher.Fetcher} fetcher
   */
  constructor(config, fetcher) {
    /** @private @const {!../model/page-config.PageConfig} */
    this.config_ = config;

    /** @private @const {!./fetcher.Fetcher} */
    this.fetcher_ = fetcher;
  }

  /**
   * @param {?string=} productId
   * @return {!Promise<!Array<!../api/offer.Offer>>}
   */
  getOffers() {
    let productId = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.config_.getProductId();
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
  fetch_(productId) {
    const url = (0, _services.serviceUrl)('/publication/' + encodeURIComponent(this.config_.getPublicationId()) + '/offers' + '?label=' + encodeURIComponent(productId));
    // TODO(dvoytenko): switch to a non-credentialed request after launch.
    return this.fetcher_.fetchCredentialedJson(url).then(json => {
      return json['offers'] || [];
    });
  }
}
exports.OffersApi = OffersApi;

},{"./services":58}],52:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SubscribeOptionFlow = exports.OffersFlow = exports.AbbrvOfferFlow = void 0;
var _activityIframeView = require("../ui/activity-iframe-view");
var _api_messages = require("../proto/api_messages");
var _payFlow = require("./pay-flow");
var _subscriptions = require("../api/subscriptions");
var _log = require("../utils/log");
var _services = require("./services");
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
const OFFERS_VIEW_CLOSABLE = true;

// The value logged when the offers screen shows all available SKUs.
const ALL_SKUS = '*';

/**
 * The class for Offers flow.
 */
class OffersFlow {
  /**
   * @param {!./deps.DepsDef} deps
   * @param {!../api/subscriptions.OffersRequest|undefined} options
   */
  constructor(deps, options) {
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

    /** @private @const {!./client-config-manager.ClientConfigManager} */
    this.clientConfigManager_ = deps.clientConfigManager();
    this.activityIframeView_ = null;

    // Default to hiding close button.
    const isClosable = (options === null || options === void 0 ? void 0 : options.isClosable) ?? false;
    const feArgsObj = deps.activities().addDefaultArguments({
      'showNative': deps.callbacks().hasSubscribeRequestCallback(),
      'productType': _subscriptions.ProductType.SUBSCRIPTION,
      'list': options && options.list || 'default',
      'skus': options && options.skus || null,
      'isClosable': isClosable
    });
    if (options && options.oldSku) {
      feArgsObj['oldSku'] = options.oldSku;
      (0, _log.assert)(feArgsObj['skus'], 'Need a sku list if old sku is provided!');

      // Remove old sku from offers if in list.
      let skuList = feArgsObj['skus'];
      const /** @type {string} */oldSku = feArgsObj['oldSku'];
      skuList = skuList.filter(sku => sku !== oldSku);
      (0, _log.assert)(skuList.length > 0, 'Sku list only contained offer user already has');
      feArgsObj['skus'] = skuList;
    }

    // Redirect to payments if only one upgrade option is passed.
    if (feArgsObj['skus'] && feArgsObj['skus'].length === 1) {
      const sku = feArgsObj['skus'][0];
      const /** @type {string|undefined} */oldSku = feArgsObj['oldSku'];
      // Update subscription triggers experimental flag if oldSku is passed,
      // so we need to check for oldSku to decide if it needs to be sent.
      // Otherwise we might accidentally block a regular subscription request.
      if (oldSku) {
        const skuSelectedResponse = new _api_messages.SkuSelectedResponse();
        skuSelectedResponse.setSku(sku);
        skuSelectedResponse.setOldSku(oldSku);
        this.startPayFlow_(skuSelectedResponse);
        return;
      }
    }

    /** @private  @const {!Array<!string>} */
    this.skus_ = feArgsObj['skus'] || [ALL_SKUS];

    /** @private @const {!Promise<!../model/client-config.ClientConfig>} */
    this.clientConfig_ = this.clientConfigManager_.getClientConfig();

    /** @private @const {!Promise<?ActivityIframeView>} */
    this.activityIframeViewPromise_ = this.clientConfig_.then(clientConfig => {
      return this.shouldShow_(clientConfig) ? new _activityIframeView.ActivityIframeView(this.win_, this.activityPorts_, this.getUrl_(clientConfig, deps.pageConfig()), feArgsObj, /* shouldFadeBody */true) : null;
    });
  }

  /**
   * @param {SkuSelectedResponse} response
   * @private
   */
  startPayFlow_(response) {
    const sku = response.getSku();
    if (sku) {
      const /** @type {../api/subscriptions.SubscriptionRequest} */subscriptionRequest = {
        'skuId': sku
      };
      const oldSku = response.getOldSku();
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
  handleLinkRequest_(response) {
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
  startNativeFlow_(response) {
    if (response.getNative()) {
      this.deps_.callbacks().triggerSubscribeRequest();
    }
  }

  /**
   * Starts the offers flow or alreadySubscribed flow.
   * @return {!Promise}
   */
  start() {
    if (this.activityIframeViewPromise_) {
      return this.activityIframeViewPromise_.then(activityIframeView => {
        if (!activityIframeView) {
          return Promise.resolve();
        }

        // So no error if skipped to payment screen.
        // Start/cancel events.
        // The second parameter is required by Propensity in AMP.
        this.deps_.callbacks().triggerFlowStarted(_subscriptions.SubscriptionFlows.SHOW_OFFERS, {
          skus: this.skus_,
          source: 'SwG'
        });
        activityIframeView.onCancel(() => {
          this.deps_.callbacks().triggerFlowCanceled(_subscriptions.SubscriptionFlows.SHOW_OFFERS);
        });
        activityIframeView.on(_api_messages.SkuSelectedResponse, this.startPayFlow_.bind(this));
        activityIframeView.on(_api_messages.AlreadySubscribedResponse, this.handleLinkRequest_.bind(this));
        activityIframeView.on(_api_messages.ViewSubscriptionsResponse, this.startNativeFlow_.bind(this));
        this.activityIframeView_ = activityIframeView;
        return this.clientConfig_.then(clientConfig => {
          if (!this.activityIframeView_) {
            return;
          }
          return this.dialogManager_.openView(this.activityIframeView_, /* hidden */false, this.getDialogConfig_(clientConfig, this.clientConfigManager_.shouldAllowScroll()));
        });
      });
    }
    return Promise.resolve();
  }

  /**
   * Returns whether this flow is configured as enabled, not showing
   * even on explicit start when flag is configured false.
   *
   * @param {!../model/client-config.ClientConfig} clientConfig
   * @return {boolean}
   */
  shouldShow_(clientConfig) {
    var _clientConfig$uiPredi;
    return ((_clientConfig$uiPredi = clientConfig.uiPredicates) === null || _clientConfig$uiPredi === void 0 ? void 0 : _clientConfig$uiPredi.canDisplayAutoPrompt) !== false;
  }

  /**
   * Gets display configuration options for the opened dialog. Uses the
   * responsive desktop design properties if the updated offer flows UI (for
   * SwG Basic) is enabled. Permits override to allow scrolling.
   * @param {!../model/client-config.ClientConfig} clientConfig
   * @param {boolean} shouldAllowScroll
   * @return {!../components/dialog.DialogConfig}
   */
  getDialogConfig_(clientConfig, shouldAllowScroll) {
    return clientConfig.useUpdatedOfferFlows ? {
      desktopConfig: {
        isCenterPositioned: true,
        supportsWideScreen: true
      },
      shouldDisableBodyScrolling: !shouldAllowScroll
    } : {};
  }

  /**
   * Returns the full URL that should be used for the activity iFrame view.
   * @param {!../model/client-config.ClientConfig} clientConfig
   * @param {!../model/page-config.PageConfig} pageConfig
   * @return {string}
   */
  getUrl_(clientConfig, pageConfig) {
    var _clientConfig$uiPredi2;
    if (!clientConfig.useUpdatedOfferFlows) {
      return (0, _services.feUrl)('/offersiframe');
    }
    const params = {
      'publicationId': pageConfig.getPublicationId()
    };
    if (this.clientConfigManager_.shouldForceLangInIframes()) {
      params['hl'] = this.clientConfigManager_.getLanguage();
    }
    if ((_clientConfig$uiPredi2 = clientConfig.uiPredicates) !== null && _clientConfig$uiPredi2 !== void 0 && _clientConfig$uiPredi2.purchaseUnavailableRegion) {
      params['purchaseUnavailableRegion'] = 'true';
    }
    return (0, _services.feUrl)('/subscriptionoffersiframe', params);
  }

  /**
   * Shows "no subscription found" on activity iFrame view.
   */
  showNoEntitlementFoundToast() {
    if (this.activityIframeView_) {
      this.activityIframeView_.execute(new _api_messages.EntitlementsResponse());
    }
  }
}

/**
 * The class for subscribe option flow.
 */
exports.OffersFlow = OffersFlow;
class SubscribeOptionFlow {
  /**
   * @param {!./deps.DepsDef} deps
   * @param {!../api/subscriptions.OffersRequest|undefined} options
   */
  constructor(deps, options) {
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
    }), /* shouldFadeBody */false);
  }

  /**
   * Starts the offers flow or alreadySubscribed flow.
   * @return {!Promise}
   */
  start() {
    // Start/cancel events.
    this.deps_.callbacks().triggerFlowStarted(_subscriptions.SubscriptionFlows.SHOW_SUBSCRIBE_OPTION);
    this.activityIframeView_.onCancel(() => {
      this.deps_.callbacks().triggerFlowCanceled(_subscriptions.SubscriptionFlows.SHOW_SUBSCRIBE_OPTION);
    });
    this.activityIframeView_.on(_api_messages.SubscribeResponse, this.maybeOpenOffersFlow_.bind(this));
    this.activityIframeView_.acceptResult().then(result => {
      const data = result.data;
      const response = new _api_messages.SubscribeResponse();
      if (data['subscribe']) {
        response.setSubscribe(true);
      }
      this.maybeOpenOffersFlow_(response);
    }, reason => {
      this.dialogManager_.completeView(this.activityIframeView_);
      throw reason;
    });
    this.eventManager_.logSwgEvent(_api_messages.AnalyticsEvent.IMPRESSION_CLICK_TO_SHOW_OFFERS);
    return this.dialogManager_.openView(this.activityIframeView_);
  }

  /**
   * @param {SubscribeResponse} response
   * @private
   */
  maybeOpenOffersFlow_(response) {
    if (response.getSubscribe()) {
      const options = this.options_ || {};
      if (options.isClosable == undefined) {
        options.isClosable = OFFERS_VIEW_CLOSABLE;
      }
      this.eventManager_.logSwgEvent(_api_messages.AnalyticsEvent.ACTION_VIEW_OFFERS, true);
      new OffersFlow(this.deps_, options).start();
    }
  }
}

/**
 * The class for Abbreviated Offer flow.
 *
 */
exports.SubscribeOptionFlow = SubscribeOptionFlow;
class AbbrvOfferFlow {
  /**
   * @param {!./deps.DepsDef} deps
   * @param {!../api/subscriptions.OffersRequest=} options
   */
  constructor(deps) {
    let options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
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
    }), /* shouldFadeBody */false);
  }

  /**
   * @param {AlreadySubscribedResponse} response
   * @private
   */
  handleLinkRequest_(response) {
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
  start() {
    // Start/cancel events.
    this.deps_.callbacks().triggerFlowStarted(_subscriptions.SubscriptionFlows.SHOW_ABBRV_OFFER);
    this.activityIframeView_.onCancel(() => {
      this.deps_.callbacks().triggerFlowCanceled(_subscriptions.SubscriptionFlows.SHOW_ABBRV_OFFER);
    });

    // If the user is already subscribed, trigger login flow
    this.activityIframeView_.on(_api_messages.AlreadySubscribedResponse, this.handleLinkRequest_.bind(this));

    // If result is due to requesting offers, redirect to offers flow
    this.activityIframeView_.acceptResult().then(result => {
      if (result.data['viewOffers']) {
        const options = this.options_ || {};
        if (options.isClosable == undefined) {
          options.isClosable = OFFERS_VIEW_CLOSABLE;
        }
        this.eventManager_.logSwgEvent(_api_messages.AnalyticsEvent.ACTION_VIEW_OFFERS, true);
        new OffersFlow(this.deps_, options).start();
        return;
      }
      if (result.data['native']) {
        this.deps_.callbacks().triggerSubscribeRequest();
        // The flow is complete.
        this.dialogManager_.completeView(this.activityIframeView_);
        return;
      }
    });
    this.eventManager_.logSwgEvent(_api_messages.AnalyticsEvent.IMPRESSION_CLICK_TO_SHOW_OFFERS_OR_ALREADY_SUBSCRIBED);
    return this.dialogManager_.openView(this.activityIframeView_);
  }
}
exports.AbbrvOfferFlow = AbbrvOfferFlow;

},{"../api/subscriptions":13,"../proto/api_messages":30,"../ui/activity-iframe-view":62,"../utils/log":78,"./pay-flow":54,"./services":58}],53:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RedirectVerifierHelper = exports.PayOptionsDef = exports.PayClient = exports.PAY_ORIGIN = void 0;
var _experimentFlags = require("./experiment-flags");
var _payjs_async = require("../../third_party/gpay/src/payjs_async");
var _preconnect = require("../utils/preconnect");
var _bytes = require("../utils/bytes");
var _errors = require("../utils/errors");
var _services = require("./services");
var _experiments = require("./experiments");
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

const REDIRECT_STORAGE_KEY = 'subscribe.google.com:rk';

/**
 * @typedef {{
 *   forceRedirect: (boolean|undefined),
 *   forceDisableNative: (boolean|undefined),
 * }}
 */
let PayOptionsDef;

/**
 * @const {!Object<string, string>}
 * @package Visible for testing only.
 */
exports.PayOptionsDef = PayOptionsDef;
const PAY_ORIGIN = {
  'PRODUCTION': 'https://pay.google.com',
  'SANDBOX': 'https://pay.sandbox.google.com'
};

/** @return {string} */
exports.PAY_ORIGIN = PAY_ORIGIN;
function payUrl() {
  return (0, _services.feCached)(PAY_ORIGIN[(0, _services.getSwgMode)().payEnv] + '/gp/p/ui/pay');
}

/**
 */
class PayClient {
  /**
   * @param {!./deps.DepsDef} deps
   */
  constructor(deps) {
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
    this.preconnect_ = new _preconnect.Preconnect(this.win_.document);

    // If the page is started from a redirect, immediately initialize
    // client to avoid dropping user state.
    if ((0, _experiments.isExperimentOn)(this.win_, _experimentFlags.ExperimentFlags.PAY_CLIENT_REDIRECT) && this.pageIsInitializedFromPayRedirect_()) {
      this.preconnect(this.preconnect_);
      this.initializePaymentsClient_();
    }

    // Prepare new verifier pair.
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
  createClient_(options, googleTransactionId, handler) {
    // Assign Google Transaction ID to PaymentsAsyncClient.googleTransactionId_
    // so it can be passed to gpay_async.js and stored in payment clearcut log.
    _payjs_async.PaymentsAsyncClient.googleTransactionId_ = googleTransactionId;
    return new _payjs_async.PaymentsAsyncClient(options, handler, /* useIframe */false, this.activityPorts_.getOriginalWebActivityPorts());
  }

  /**
   * @param {!../utils/preconnect.Preconnect} pre
   */
  preconnect(pre) {
    pre.prefetch(payUrl());
    pre.prefetch('https://payments.google.com/payments/v4/js/integrator.js?ss=md');
    pre.prefetch('https://clients2.google.com/gr/gr_full_2.0.6.js');
  }

  /**
   * Initializes Payments client.
   */
  initializePaymentsClient_() {
    this.client_ = this.createClient_( /** @type {!PaymentOptions} */
    {
      environment: (0, _services.getSwgMode)().payEnv,
      'i': {
        'redirectKey': this.redirectVerifierHelper_.restoreKey()
      }
    }, this.analytics_.getTransactionId(), this.handleResponse_.bind(this));
  }

  /**
   * Detects if the window is started from a Pay redirect by
   * checking window's hash for Web Activities information.
   */
  pageIsInitializedFromPayRedirect_() {
    const hash = this.win_.location.hash;
    const hasRedirectEncryptedCallbackData = /redirectEncryptedCallbackData/.test(hash);
    const hasSwgRequest = /swgRequest/.test(hash);
    return hasRedirectEncryptedCallbackData && hasSwgRequest;
  }

  /**
   * @return {string}
   */
  getType() {
    // TODO(alin04): remove once all references removed.
    return 'PAYJS';
  }

  /**
   * @param {!PaymentDataRequest} paymentRequest
   * @param {!PayOptionsDef=} options
   */
  start(paymentRequest) {
    let options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    this.request_ = paymentRequest;
    if (!this.client_) {
      this.preconnect(this.preconnect_);
      this.initializePaymentsClient_();
    }
    if (options.forceRedirect) {
      paymentRequest = Object.assign(paymentRequest, {
        'forceRedirect': options.forceRedirect || false
      });
    }
    setInternalParam(paymentRequest, 'disableNative',
    // The page cannot be iframed at this time. May be relaxed later
    // for AMP and similar contexts.
    options.forceDisableNative || this.win_ != this.top_());
    let resolver = null;
    const promise = new Promise(resolve => resolver = resolve);
    // Notice that the callback for verifier may execute asynchronously.
    this.redirectVerifierHelper_.useVerifier(verifier => {
      if (verifier) {
        setInternalParam(paymentRequest, 'redirectVerifier', verifier);
      }
      if (options.forceRedirect) {
        const client = this.client_;
        this.eventManager_.getReadyPromise().then(() => {
          this.analytics_.getLoggingPromise().then(() => {
            client.loadPaymentData(paymentRequest);
            resolver(true);
          });
        });
      } else {
        this.client_.loadPaymentData(paymentRequest);
        resolver(true);
      }
    });
    return promise;
  }

  /**
   * @param {function(!Promise<!PaymentData>)} callback
   */
  onResponse(callback) {
    this.responseCallback_ = callback;
    const response = this.response_;
    if (response) {
      Promise.resolve().then(() => {
        if (response) {
          callback(this.convertResponse_(response, this.request_));
        }
      });
    }
  }

  /**
   * @param {!Promise<!PaymentData>} responsePromise
   * @private
   */
  handleResponse_(responsePromise) {
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
  convertResponse_(response, request) {
    return response.then(
    // Temporary client side solution to remember the
    // input params. TODO: Remove this once server-side
    // input preservation is done and is part of the response.
    res => {
      if (request) {
        res['paymentRequest'] = request;
      }
      return res;
    }).catch(reason => {
      if (typeof reason == 'object' && reason['statusCode'] == 'CANCELED') {
        const error = (0, _errors.createCancelError)(this.win_);
        if (request) {
          error['productType'] = /** @type {!PaymentDataRequest} */request['i']['productType'];
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
  top_() {
    // Only exists for testing since it's not possible to override `window.top`.
    return this.win_.top;
  }
}

/**
 * @typedef {{
 *   key: string,
 *   verifier: string,
 * }}
 */
exports.PayClient = PayClient;
let RedirectVerifierPairDef;

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
class RedirectVerifierHelper {
  /**
   * @param {!Window} win
   */
  constructor(win) {
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
  prepare() {
    return this.getOrCreatePair_(() => {});
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
  useVerifier(callback) {
    this.getOrCreatePair_(pair => {
      if (pair) {
        try {
          this.win_.localStorage.setItem(REDIRECT_STORAGE_KEY, pair.key);
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
  restoreKey() {
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
  getOrCreatePair_(callback) {
    this.createPair_();
    if (this.pairCreated_) {
      // Already created.
      callback(this.pair_);
    } else if (this.pairPromise_) {
      // Otherwise wait for it to be created.
      this.pairPromise_.then(pair => callback(pair));
    }
    return this.pairPromise_;
  }

  /**
   * @private
   */
  createPair_() {
    // Either already created or already started.
    if (this.pairCreated_ || this.pairPromise_) {
      return;
    }

    // Check that the platform can fully support verification. That means
    // that it's expected to implement the following APIs:
    // a. Local storage (localStorage);
    // b. WebCrypto (crypto.subtle);
    // c. Crypto random (crypto.getRandomValues);
    // d. SHA284 (crypto.subtle.digest).
    let supportsLocalStorage;
    try {
      supportsLocalStorage = !!this.win_.localStorage;
    } catch (e) {
      // Note: This can happen when cookies are disabled.
      supportsLocalStorage = false;
    }
    const crypto = this.win_.crypto;
    if (supportsLocalStorage && crypto && crypto.getRandomValues && crypto.subtle && crypto.subtle.digest) {
      this.pairPromise_ = new Promise((resolve, reject) => {
        // 1. Use crypto random to create a 128-bit (16 byte) redirect key.
        const keyBytes = new Uint8Array(16);
        crypto.getRandomValues(keyBytes);

        // 2. Encode key as base64.
        const key = btoa((0, _bytes.bytesToString)(keyBytes));

        // 3. Create a hash.
        crypto.subtle.digest({
          name: 'SHA-384'
        }, (0, _bytes.stringToBytes)(key)).then(buffer => {
          const verifier = btoa((0, _bytes.bytesToString)(new Uint8Array( /** @type {!ArrayBuffer} */buffer)));
          resolve({
            key,
            verifier
          });
        }, reason => {
          reject(reason);
        });
      }).catch(() => {
        // Ignore failures. A failure to create a redirect verifier is often
        // recoverable.
        return null;
      }).then(pair => {
        this.pairCreated_ = true;
        this.pair_ = pair;
        return pair;
      });
    } else {
      // Not supported.
      this.pairCreated_ = true;
      this.pair_ = null;
    }
  }
}

/**
 * @param {!PaymentDataRequest} paymentRequest
 * @param {string} param
 * @param {*} value
 */
exports.RedirectVerifierHelper = RedirectVerifierHelper;
function setInternalParam(paymentRequest, param, value) {
  paymentRequest['i'] = Object.assign(paymentRequest['i'] || {}, {
    [param]: value
  });
}

},{"../../third_party/gpay/src/payjs_async":91,"../utils/bytes":67,"../utils/errors":73,"../utils/preconnect":80,"./experiment-flags":41,"./experiments":42,"./services":58}],54:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SwgPaymentRequest = exports.ReplaceSkuProrationModeMapping = exports.RecurrenceMapping = exports.PayStartFlow = exports.PayCompleteFlow = void 0;
exports.parseEntitlements = parseEntitlements;
exports.parseSubscriptionResponse = parseSubscriptionResponse;
exports.parseUserData = parseUserData;
var _api_messages = require("../proto/api_messages");
var _activityIframeView = require("../ui/activity-iframe-view");
var _constants = require("../utils/constants");
var _jwt = require("../utils/jwt");
var _subscriptions = require("../api/subscriptions");
var _subscribeResponse = require("../api/subscribe-response");
var _userData = require("../api/user-data");
var _services = require("./services");
var _json = require("../utils/json");
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
 *
 * The Flow goes like this:
 * a. Start Payments
 * b. Complete Payments
 * c. Create Account
 * d. Acknowledge Account
 *
 * In other words, Flow = Payments + Account Creation.
 */

/**
 * Subscribe with Google request to pass to payments.
 *  @typedef {{
 *    skuId: string,
 *    oldSku: (string|undefined),
 *    replaceSkuProrationMode: (number|undefined),
 *    paymentRecurrence: (number|undefined),
 *    swgVersion: (string|undefined),
 *    metadata: (Object|undefined)
 * }}
 */
let SwgPaymentRequest;

/**
 * String values input by the publisher are mapped to the number values.
 * @type {!Object<string, number>}
 */
exports.SwgPaymentRequest = SwgPaymentRequest;
const ReplaceSkuProrationModeMapping = {
  // The replacement takes effect immediately, and the remaining time will
  // be prorated and credited to the user. This is the current default
  // behavior.
  'IMMEDIATE_WITH_TIME_PRORATION': 1
};
exports.ReplaceSkuProrationModeMapping = ReplaceSkuProrationModeMapping;
const RecurrenceMapping = {
  'AUTO': 1,
  'ONE_TIME': 2
};

/**
 * @param {string} sku
 * @param {?string=} subscriptionFlow
 * @return {!EventParams}
 */
exports.RecurrenceMapping = RecurrenceMapping;
function getEventParams(sku) {
  let subscriptionFlow = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
  return new _api_messages.EventParams([,,,, sku,,, subscriptionFlow]);
}

/**
 * The flow to initiate payment process.
 */
class PayStartFlow {
  /**
   * @param {!./deps.DepsDef} deps
   * @param {!../api/subscriptions.SubscriptionRequest} subscriptionRequest
   * @param {!../api/subscriptions.ProductType} productType
   */
  constructor(deps, subscriptionRequest) {
    let productType = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : _subscriptions.ProductType.SUBSCRIPTION;
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

    /** @private @const {!../runtime/client-config-manager.ClientConfigManager} */
    this.clientConfigManager_ = deps.clientConfigManager();
  }

  /**
   * Starts the payments flow.
   * @return {!Promise}
   */
  start() {
    // Get the paySwgVersion for buyflow.
    const promise = this.clientConfigManager_.getClientConfig();
    return promise.then(clientConfig => {
      this.start_(clientConfig.paySwgVersion);
    });
  }

  /**
   * Starts the payments flow for the given version.
   * @param {!string=} paySwgVersion
   * @return {!Promise}
   */
  start_(paySwgVersion) {
    const /** @type {SwgPaymentRequest} */swgPaymentRequest = {
      'skuId': this.subscriptionRequest_['skuId'],
      'publicationId': this.pageConfig_.getPublicationId()
    };
    if (paySwgVersion) {
      swgPaymentRequest['swgVersion'] = paySwgVersion;
    }
    if (this.subscriptionRequest_['oldSku']) {
      swgPaymentRequest['oldSku'] = this.subscriptionRequest_['oldSku'];
      // Map the proration mode to the enum value (if proration exists).
      const prorationMode = this.subscriptionRequest_['replaceSkuProrationMode'];
      if (prorationMode) {
        swgPaymentRequest['replaceSkuProrationMode'] = ReplaceSkuProrationModeMapping[prorationMode];
      } else {
        swgPaymentRequest['replaceSkuProrationMode'] = ReplaceSkuProrationModeMapping['IMMEDIATE_WITH_TIME_PRORATION'];
      }
      this.analyticsService_.setSku(swgPaymentRequest['oldSku']);
    }

    // Assign one-time recurrence enum if applicable
    if (this.subscriptionRequest_['oneTime']) {
      swgPaymentRequest['paymentRecurrence'] = RecurrenceMapping['ONE_TIME'];
    }

    // Assign additional metadata if available.
    if (this.subscriptionRequest_['metadata']) {
      swgPaymentRequest['metadata'] = this.subscriptionRequest_['metadata'];
    }

    // Start/cancel events.
    const flow = this.productType_ == _subscriptions.ProductType.UI_CONTRIBUTION ? _subscriptions.SubscriptionFlows.CONTRIBUTE : _subscriptions.SubscriptionFlows.SUBSCRIBE;
    this.deps_.callbacks().triggerFlowStarted(flow, this.subscriptionRequest_);
    this.eventManager_.logSwgEvent(_api_messages.AnalyticsEvent.ACTION_PAYMENT_FLOW_STARTED, true, getEventParams(swgPaymentRequest['skuId']));
    PayCompleteFlow.waitingForPayClient_ = true;
    this.payClient_.start( /** @type {!PaymentDataRequest} */
    {
      'apiVersion': 1,
      'allowedPaymentMethods': ['CARD'],
      'environment': (0, _services.getSwgMode)().payEnv,
      'playEnvironment': (0, _services.getSwgMode)().playEnv,
      'swg': swgPaymentRequest,
      'i': {
        'startTimeMs': Date.now(),
        'productType': this.productType_
      }
    }, {
      forceRedirect: this.deps_.config().windowOpenMode == _subscriptions.WindowOpenMode.REDIRECT,
      // SwG basic and TwG flows do not support native.
      forceDisableNative: paySwgVersion == '2' || paySwgVersion == '3'
    });
    return Promise.resolve();
  }
}

/**
 * The flow for successful payments completion.
 */
exports.PayStartFlow = PayStartFlow;
class PayCompleteFlow {
  /**
   * @param {!./deps.DepsDef} deps
   */
  static configurePending(deps) {
    /** @const @type {./client-event-manager.ClientEventManager} */
    const eventManager = deps.eventManager();
    deps.payClient().onResponse(payPromise => {
      deps.entitlementsManager().blockNextNotification();
      const flow = new PayCompleteFlow(deps);
      const promise = validatePayResponse(deps, payPromise, flow.complete.bind(flow));
      deps.callbacks().triggerPaymentResponse(promise);
      return promise.then(response => {
        const sku = parseSkuFromPurchaseDataSafe(response.purchaseData);
        deps.analytics().setSku(sku || '');
        eventManager.logSwgEvent(_api_messages.AnalyticsEvent.ACTION_PAYMENT_COMPLETE, true, getEventParams(sku || '', response.productType == _subscriptions.ProductType.UI_CONTRIBUTION ? _subscriptions.SubscriptionFlows.CONTRIBUTE : _subscriptions.SubscriptionFlows.SUBSCRIBE));
        flow.start(response);
      }, reason => {
        if ((0, _errors.isCancelError)(reason)) {
          const productType = /** @type {!Object} */reason['productType'];
          const flow = productType == _subscriptions.ProductType.UI_CONTRIBUTION ? _subscriptions.SubscriptionFlows.CONTRIBUTE : _subscriptions.SubscriptionFlows.SUBSCRIBE;
          deps.callbacks().triggerFlowCanceled(flow);
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
  constructor(deps) {
    /** @private @const {!Window} */
    this.win_ = deps.win();

    /** @private @const {!./deps.DepsDef} */
    this.deps_ = deps;

    /** @private @const {!../components/activities.ActivityPorts} */
    this.activityPorts_ = deps.activities();

    /** @private @const {!../components/dialog-manager.DialogManager} */
    this.dialogManager_ = deps.dialogManager();

    /** @private {?Promise<!ActivityIframeView>} */
    this.activityIframeViewPromise_ = null;

    /** @private {?Promise} */
    this.readyPromise_ = null;

    /** @private @const {!../runtime/analytics-service.AnalyticsService} */
    this.analyticsService_ = deps.analytics();

    /** @private @const {!../runtime/client-event-manager.ClientEventManager} */
    this.eventManager_ = deps.eventManager();

    /** @private @const {!../runtime/client-config-manager.ClientConfigManager} */
    this.clientConfigManager_ = deps.clientConfigManager();

    /** @private {?string} */
    this.sku_ = null;
  }

  /**
   * Starts the payments completion flow.
   * @param {{
   *   productType: string,
   *   oldSku: ?string,
   *   paymentRecurrence: ?number,
   * }} response
   * @return {!Promise}
   */
  start(response) {
    this.sku_ = parseSkuFromPurchaseDataSafe(response.purchaseData);
    this.eventManager_.logSwgEvent(_api_messages.AnalyticsEvent.IMPRESSION_ACCOUNT_CHANGED, true, getEventParams(this.sku_ || ''));
    this.deps_.entitlementsManager().reset(true);
    // TODO(dianajing): future-proof isOneTime flag
    const args = {
      'publicationId': this.deps_.pageConfig().getPublicationId(),
      'productType': response['productType'],
      'isSubscriptionUpdate': !!response['oldSku'],
      'isOneTime': !!response['paymentRecurrence']
    };

    // TODO(dvoytenko, #400): cleanup once entitlements is launched everywhere.
    if (response.userData && response.entitlements) {
      args['idToken'] = response.userData.idToken;
      this.deps_.entitlementsManager().pushNextEntitlements(response.entitlements.raw);
      // Persist swgUserToken in local storage
      if (response.swgUserToken) {
        this.deps_.storage().set(_constants.Constants.USER_TOKEN, response.swgUserToken, true);
      }
    } else {
      args['loginHint'] = response.userData && response.userData.email;
    }
    const /* {!Object<string, string>} */urlParams = {};
    if (args.productType === _subscriptions.ProductType.VIRTUAL_GIFT) {
      Object.assign(urlParams, {
        productType: args.productType,
        publicationId: args.publicationId,
        offerId: this.sku_,
        origin: (0, _url.parseUrl)(this.win_.location.href).origin,
        isPaid: true,
        checkOrderStatus: true
      });
      if (response.requestMetadata) {
        urlParams.canonicalUrl = response.requestMetadata.contentId;
        urlParams.isAnonymous = response.requestMetadata.anonymous;
        args['contentTitle'] = response.requestMetadata.contentTitle;
      }

      // Add feArgs to be passed via activities.
      if (response.swgUserToken) {
        args.swgUserToken = response.swgUserToken;
      }
      const orderId = parseOrderIdFromPurchaseDataSafe(response.purchaseData);
      if (orderId) {
        args.orderId = orderId;
      }
    }
    if (this.clientConfigManager_.shouldForceLangInIframes()) {
      urlParams.hl = this.clientConfigManager_.getLanguage();
    }
    const confirmFeUrl = (0, _services.feUrl)('/payconfirmiframe', urlParams);
    return this.activityIframeViewPromise_ = this.clientConfigManager_.getClientConfig().then(clientConfig => {
      args['useUpdatedConfirmUi'] = clientConfig.useUpdatedOfferFlows;
      args['skipAccountCreationScreen'] = clientConfig.skipAccountCreationScreen;
      return new _activityIframeView.ActivityIframeView(this.win_, this.activityPorts_, confirmFeUrl, (0, _services.feArgs)(args), /* shouldFadeBody */true);
    }).then(activityIframeView => {
      activityIframeView.on(_api_messages.EntitlementsResponse, this.handleEntitlementsResponse_.bind(this));
      activityIframeView.acceptResult().then(() => {
        // The flow is complete.
        this.dialogManager_.completeView(activityIframeView);
      });
      this.readyPromise_ = this.dialogManager_.openView(activityIframeView);
      this.readyPromise_.then(() => {
        this.deps_.callbacks().triggerPayConfirmOpened(activityIframeView);
      });
      return activityIframeView;
    });
  }

  /**
   * @param {!EntitlementsResponse} response
   * @private
   */
  handleEntitlementsResponse_(response) {
    const jwt = response.getJwt();
    if (jwt) {
      this.deps_.entitlementsManager().pushNextEntitlements(jwt);
    }
  }

  /**
   * @return {!Promise}
   */
  complete() {
    this.eventManager_.logSwgEvent(_api_messages.AnalyticsEvent.ACTION_ACCOUNT_CREATED, true, getEventParams(this.sku_ || ''));
    const now = Date.now().toString();
    this.deps_.storage().set(_constants.Constants.READ_TIME, now, /*useLocalStorage=*/false);
    this.deps_.entitlementsManager().unblockNextNotification();
    return Promise.all([this.activityIframeViewPromise_, this.readyPromise_, this.clientConfigManager_.getClientConfig()]).then(values => {
      const activityIframeView = values[0];
      const clientConfig = values[2];
      // Skip account creation screen if requested (needed for AMP)
      if (!clientConfig.skipAccountCreationScreen) {
        const accountCompletionRequest = new _api_messages.AccountCreationRequest();
        accountCompletionRequest.setComplete(true);
        activityIframeView.execute(accountCompletionRequest);
      }
      return activityIframeView.acceptResult().catch(() => {
        // Ignore errors.
      }).then(() => {
        if (!clientConfig.skipAccountCreationScreen) {
          this.eventManager_.logSwgEvent(_api_messages.AnalyticsEvent.ACTION_ACCOUNT_ACKNOWLEDGED, true, getEventParams(this.sku_ || ''));
        }
        this.deps_.entitlementsManager().setToastShown(true);
      });
    });
  }
}

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
  const wasRedirect = !PayCompleteFlow.waitingForPayClient_;
  PayCompleteFlow.waitingForPayClient_ = false;
  return payPromise.then(data => {
    // 1) We log against a random TX ID which is how we track a specific user
    //    anonymously.
    // 2) If there was a redirect to gPay, we may have lost our stored TX ID.
    // 3) Pay service is supposed to give us the TX ID it logged against.
    let eventType = _api_messages.AnalyticsEvent.UNKNOWN;
    let eventParams = undefined;
    if (typeof data !== 'object' || !data['googleTransactionId']) {
      // If gPay doesn't give us a TX ID it means that something may
      // be wrong.  If we previously logged then we are at least continuing to
      // log against the same TX ID.  If we didn't previously log then we have
      // lost all connection to the events that preceded the payment event and
      // we at least want to know why that data was lost.
      eventParams = new _api_messages.EventParams();
      eventParams.setHadLogged(!wasRedirect);
      eventType = _api_messages.AnalyticsEvent.EVENT_GPAY_NO_TX_ID;
    } else {
      const oldTxId = deps.analytics().getTransactionId();
      const newTxId = data['googleTransactionId'];
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
  let swgData = null;
  let raw = null;
  let productType = _subscriptions.ProductType.SUBSCRIPTION;
  let oldSku = null;
  let paymentRecurrence = null;
  let requestMetadata = null;
  if (data) {
    if (typeof data == 'string') {
      raw = /** @type {string} */data;
    } else {
      // Assume it's a json object in the format:
      // `{integratorClientCallbackData: "..."}` or `{swgCallbackData: "..."}`.
      const json = /** @type {!Object} */data;
      if ('swgCallbackData' in json) {
        swgData = /** @type {!Object} */json['swgCallbackData'];
      } else if ('integratorClientCallbackData' in json) {
        raw = json['integratorClientCallbackData'];
      }
      if ('paymentRequest' in data) {
        const swgObj = data['paymentRequest']['swg'] || {};
        oldSku = swgObj['oldSku'];
        paymentRecurrence = swgObj['paymentRecurrence'];
        requestMetadata = swgObj['metadata'];
        productType = (data['paymentRequest']['i'] || {})['productType'] || _subscriptions.ProductType.SUBSCRIPTION;
      }
      // Set productType if paymentRequest is not present, which happens
      // if the pay flow was opened in redirect mode.
      else if ('productType' in data) {
        productType = data['productType'];
      }
    }
  }
  if (raw && !swgData) {
    raw = atob(raw);
    if (raw) {
      const parsed = (0, _json.parseJson)(raw);
      swgData = parsed['swgCallbackData'];
    }
  }
  if (!swgData) {
    throw new Error('unexpected payment response');
  }
  raw = JSON.stringify( /** @type {!JsonObject} */swgData);
  return new _subscribeResponse.SubscribeResponse(raw, parsePurchaseData(swgData), parseUserData(swgData), parseEntitlements(deps, swgData), productType, completeHandler, oldSku, swgData['swgUserToken'], paymentRecurrence, requestMetadata);
}

/**
 * @param {!Object} swgData
 * @return {!PurchaseData}
 */
function parsePurchaseData(swgData) {
  const raw = swgData['purchaseData'];
  const signature = swgData['purchaseDataSignature'];
  return new _subscribeResponse.PurchaseData(raw, signature);
}

/**
 * @param {!Object} swgData
 * @return {?UserData}
 * @package Visible for testing.
 */
function parseUserData(swgData) {
  const idToken = swgData['idToken'];
  if (!idToken) {
    return null;
  }
  const jwt = /** @type {!Object} */new _jwt.JwtHelper().decode(idToken);
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
  return (/** @type {?string} */
    (0, _json.getPropertyFromJsonString)(purchaseData.raw, 'productId') || null
  );
}

/**
 * @param {!PurchaseData} purchaseData
 * @return {?string}
 */
function parseOrderIdFromPurchaseDataSafe(purchaseData) {
  return (/** @type {?string} */
    (0, _json.getPropertyFromJsonString)(purchaseData.raw, 'orderId') || null
  );
}

},{"../api/subscribe-response":12,"../api/subscriptions":13,"../api/user-data":14,"../proto/api_messages":30,"../ui/activity-iframe-view":62,"../utils/constants":68,"../utils/errors":73,"../utils/json":76,"../utils/jwt":77,"../utils/url":85,"./services":58}],55:[function(require,module,exports){
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
 * Implements interface to Propensity server
 */
class PropensityServer {
  /**
   * Page configuration is known when Propensity API
   * is available, publication ID is therefore used
   * in constructor for the server interface.
   * @param {!Window} win
   * @param {!./deps.DepsDef} deps
   * @param {!./fetcher.Fetcher} fetcher
   */
  constructor(win, deps, fetcher) {
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
  getDocumentCookie_() {
    return this.win_.document.cookie;
  }

  /**
   * Returns the client ID to be used.
   * @return {?string}
   * @private
   */
  getClientId_() {
    if (!this.clientId_) {
      // Match '__gads' (name of the cookie) dropped by Ads Tag.
      const gadsmatch = this.getDocumentCookie_().match('(^|;)\\s*__gads\\s*=\\s*([^;]+)');
      // Since the cookie will be consumed using decodeURIComponent(),
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
  propensityUrl_(url) {
    url = (0, _url.addQueryParam)(url, 'u_tz', '240');
    url = (0, _url.addQueryParam)(url, 'v', String(this.version_));
    const clientId = this.getClientId_();
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
  sendSubscriptionState(state, productsOrSkus) {
    const init = /** @type {!../utils/xhr.FetchInitDef} */{
      method: 'GET',
      credentials: 'include'
    };
    let url = (0, _services.adsUrl)('/subopt/data');
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
  sendEvent_(event, context) {
    const init = /** @type {!../utils/xhr.FetchInitDef} */{
      method: 'GET',
      credentials: 'include'
    };
    let url = (0, _services.adsUrl)('/subopt/data');
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
  handleClientEvent_(event) {
    // Propensity does not need this data and does not have the right to
    // it at this time.  We can consider this if necessary in the future.
    if (event.eventOriginator === _api_messages.EventOriginator.SHOWCASE_CLIENT) {
      return;
    }

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
    const propEvent = (0, _eventTypeMapping.analyticsEventToPublisherEvent)(event.eventType);
    if (propEvent == null) {
      return;
    }
    let additionalParameters = event.additionalParameters;
    // The EventParams object is private to SwG analytics.  Do not send.
    if (additionalParameters instanceof _api_messages.EventParams) {
      additionalParameters = undefined;
    }
    if ((0, _types.isBoolean)(event.isFromUserAction)) {
      if (!(0, _types.isObject)(additionalParameters)) {
        additionalParameters = {};
      }
      additionalParameters['is_active'] = event.isFromUserAction;
    }
    this.sendEvent_(propEvent, JSON.stringify( /** @type {?JsonObject} */additionalParameters));
  }

  /**
   * @param {JsonObject} response
   * @return {!../api/propensity-api.PropensityScore}
   */
  parsePropensityResponse_(response) {
    let defaultScore = /** @type {!../api/propensity-api.PropensityScore} */{};
    if (!response['header']) {
      defaultScore = /** @type {!../api/propensity-api.PropensityScore} */{
        header: {
          ok: false
        },
        body: {
          error: 'No valid response'
        }
      };
      return defaultScore;
    }
    const status = response['header'];
    let scoreDetails = undefined;
    if (status['ok']) {
      const scores = response['scores'];
      scoreDetails = [];
      for (let i = 0; i < scores.length; i++) {
        const result = scores[i];
        const scoreStatus = !!result['score'];
        let scoreDetail;
        if (scoreStatus) {
          const value = /** @type {!../api/propensity-api.Score} */{
            value: result['score'],
            bucketed: result['score_type'] == 2
          };
          scoreDetail = /** @type {!../api/propensity-api.Body} */{
            product: result['product'],
            score: value
          };
        } else {
          scoreDetail = /** @type {!../api/propensity-api.Body} */{
            product: result['product'],
            error: result['error_message']
          };
        }
        scoreDetails.push(scoreDetail);
      }
      if (scoreDetails) {
        defaultScore = /** @type {!../api/propensity-api.PropensityScore} */{
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
    defaultScore = /** @type {!../api/propensity-api.PropensityScore} */{
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
  getPropensity(referrer, type) {
    const init = /** @type {!../utils/xhr.FetchInitDef} */{
      method: 'GET',
      credentials: 'include'
    };
    const url = (0, _services.adsUrl)('/subopt/pts?products=') + this.publicationId_ + '&type=' + type + '&ref=' + referrer;
    return this.fetcher_.fetch(this.propensityUrl_(url), init).then(result => result.json()).then(response => {
      return this.parsePropensityResponse_(response);
    });
  }
}
exports.PropensityServer = PropensityServer;

},{"../proto/api_messages":30,"../utils/types":84,"../utils/url":85,"./event-type-mapping":40,"./services":58}],56:[function(require,module,exports){
"use strict";

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
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
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
 * @implements {PropensityApi.PropensityApi}
 */
class Propensity {
  /**
   * @param {!Window} win
   * @param {!./deps.DepsDef} deps
   * @param {!./fetcher.Fetcher} fetcher
   *
   * IMPORTANT: deps may not be full initialized config and pageConfig are
   * available immediately, other function should be gated on a ready promise.
   * #TODO(jpettitt) switch refactor to take out the win and use deps to get win
   */
  constructor(win, deps, fetcher) {
    /** @private @const {!Window} */
    this.win_ = win;
    /** @private {PropensityServer} */
    this.propensityServer_ = new _propensityServer.PropensityServer(win, deps, fetcher);

    /** @private @const {!../api/client-event-manager-api.ClientEventManagerApi} */
    this.eventManager_ = deps.eventManager();
  }

  /** @override */
  sendSubscriptionState(state, jsonProducts) {
    if (!Object.values(_loggerApi.SubscriptionState).includes(state)) {
      throw new Error('Invalid subscription state provided');
    }
    if ((_loggerApi.SubscriptionState.SUBSCRIBER == state || _loggerApi.SubscriptionState.PAST_SUBSCRIBER == state) && !jsonProducts) {
      throw new Error('Entitlements must be provided for users with' + ' active or expired subscriptions');
    }
    if (jsonProducts && !(0, _types.isObject)(jsonProducts)) {
      throw new Error('Entitlements must be an Object');
    }
    let productsOrSkus = null;
    if (jsonProducts) {
      productsOrSkus = JSON.stringify(jsonProducts);
    }
    this.propensityServer_.sendSubscriptionState(state, productsOrSkus);
  }

  /** @override */
  getPropensity(type) {
    if (type && !Object.values(PropensityApi.PropensityType).includes(type)) {
      throw new Error('Invalid propensity type requested');
    }
    if (!type) {
      type = PropensityApi.PropensityType.GENERAL;
    }
    return this.propensityServer_.getPropensity(this.win_.document.referrer, type);
  }

  /** @override */
  sendEvent(userEvent) {
    const analyticsEvent = (0, _eventTypeMapping.publisherEventToAnalyticsEvent)(userEvent.name);
    let data = null;
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
}
exports.Propensity = Propensity;

},{"../api/logger-api":8,"../api/propensity-api":11,"../proto/api_messages":30,"../utils/types":84,"./event-type-mapping":40,"./propensity-server":55}],57:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Runtime = exports.ConfiguredRuntime = void 0;
exports.getRuntime = getRuntime;
exports.installRuntime = installRuntime;
var _offersFlow = require("./offers-flow");
var _activities = require("../components/activities");
var _api_messages = require("../proto/api_messages");
var _subscriptions = require("../api/subscriptions");
var _analyticsService = require("./analytics-service");
var _buttonApi = require("./button-api");
var _callbacks = require("./callbacks");
var _clientConfigManager = require("./client-config-manager");
var _clientEventManager = require("./client-event-manager");
var _contributionsFlow = require("./contributions-flow");
var _deferredAccountFlow = require("./deferred-account-flow");
var _deps = require("./deps");
var _dialogManager = require("../components/dialog-manager");
var _doc = require("../model/doc");
var _entitlementsManager = require("./entitlements-manager");
var _experimentFlags = require("./experiment-flags");
var _fetcher = require("./fetcher");
var _googleAnalyticsEventListener = require("./google-analytics-event-listener");
var _jserror = require("./jserror");
var _linkAccountsFlow = require("./link-accounts-flow");
var _logger = require("./logger");
var _loginNotificationApi = require("./login-notification-api");
var _loginPromptApi = require("./login-prompt-api");
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
var _dateUtils = require("../utils/date-utils");
var _dom = require("../utils/dom");
var _types = require("../utils/types");
var _experiments = require("./experiments");
var _url = require("../utils/url");
var _gaa = require("../utils/gaa");
var _eventTypeMapping = require("./event-type-mapping");
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

const RUNTIME_PROP = 'SWG';
const RUNTIME_LEGACY_PROP = 'SUBSCRIPTIONS'; // MIGRATE

/**
 * Reference to the runtime, for testing.
 * @private {!Runtime}
 */
let runtimeInstance_;

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
  }

  // Create a SwG runtime.
  const runtime = new Runtime(win);

  // Create a public version of the SwG runtime.
  const publicRuntime = createPublicRuntime(runtime);

  /**
   * Executes a callback when SwG runtime is ready.
   * @param {function(!SubscriptionsInterface)} callback
   */
  function callWhenRuntimeIsReady(callback) {
    if (!callback) {
      return;
    }
    runtime.whenReady().then(() => {
      callback(publicRuntime);
    });
  }

  // Queue up any callbacks the publication might have provided.
  const waitingCallbacks = [].concat(win[RUNTIME_PROP], win[RUNTIME_LEGACY_PROP]);
  for (const waitingCallback of waitingCallbacks) {
    callWhenRuntimeIsReady(waitingCallback);
  }

  // If any more callbacks are `push`ed to the global SwG variables,
  // they'll be queued up to receive the SwG runtime when it's ready.
  win[RUNTIME_PROP] = win[RUNTIME_LEGACY_PROP] = {
    push: callWhenRuntimeIsReady
  };

  // Set variable for testing.
  runtimeInstance_ = runtime;

  // Kick off subscriptions flow.
  runtime.startSubscriptionsFlowIfNeeded();
}

/**
 * @implements {SubscriptionsInterface}
 */
class Runtime {
  /**
   * @param {!Window} win
   */
  constructor(win) {
    /** @private @const {!Window} */
    this.win_ = win;

    /** @private @const {!DocInterface} */
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
    this.configuredPromise_ = new Promise(resolve => {
      this.configuredResolver_ = resolve;
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
  whenReady() {
    return this.ready_;
  }

  /**
   * @param {boolean} commit
   * @return {!Promise<!ConfiguredRuntime>}
   * @private
   */
  configured_(commit) {
    if (!this.committed_ && commit) {
      this.committed_ = true;
      /** @type {!Promise<!PageConfig>} */
      let pageConfigPromise;
      if (this.productOrPublicationId_) {
        pageConfigPromise = Promise.resolve(new _pageConfig.PageConfig(this.productOrPublicationId_, /* locked */false));
      } else {
        this.pageConfigResolver_ = new _pageConfigResolver.PageConfigResolver(this.doc_);
        pageConfigPromise = this.pageConfigResolver_.resolveConfig().then(config => {
          this.pageConfigResolver_ = null;
          return config;
        });
      }
      pageConfigPromise.then(pageConfig => {
        this.configuredResolver_(new ConfiguredRuntime(this.doc_, pageConfig, /* integr */{
          configPromise: this.configuredPromise_
        }, this.config_));
        this.configuredResolver_ = null;
      }, reason => {
        this.configuredResolver_(Promise.reject(reason));
        this.configuredResolver_ = null;
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
  startSubscriptionsFlowIfNeeded() {
    const control = (0, _pageConfigResolver.getControlFlag)(this.win_.document);
    (0, _log.debugLog)(control, 'mode');
    if (control == 'manual') {
      // "Skipping automatic start because control flag is set to "manual".
      return null;
    }
    return this.start();
  }

  /** @override */
  init(productOrPublicationId) {
    (0, _log.assert)(!this.committed_, 'already configured');
    this.productOrPublicationId_ = productOrPublicationId;

    // Process the page's config. Then start logging events in the
    // analytics service.
    this.configured_(true).then(configuredRuntime => {
      configuredRuntime.analytics().setReadyForLogging();
      configuredRuntime.analytics().start();
    });
  }

  /** @override */
  configure(config) {
    // Accumulate config for startup.
    Object.assign(this.config_, config);
    return this.configured_(false).then(runtime => runtime.configure(config));
  }

  /** @override */
  start() {
    return this.configured_(true).then(runtime => runtime.start());
  }

  /** @override */
  reset() {
    return this.configured_(true).then(runtime => runtime.reset());
  }

  /** @override */
  clear() {
    return this.configured_(true).then(runtime => runtime.clear());
  }

  /** @override */
  getEntitlements(params) {
    return this.configured_(true).then(runtime => runtime.getEntitlements(params));
  }

  /** @override */
  setOnEntitlementsResponse(callback) {
    return this.configured_(false).then(runtime => runtime.setOnEntitlementsResponse(callback));
  }

  /** @override */
  getOffers(options) {
    return this.configured_(true).then(runtime => runtime.getOffers(options));
  }

  /** @override */
  showOffers(options) {
    return this.configured_(true).then(runtime => runtime.showOffers(options));
  }

  /** @override */
  showUpdateOffers(options) {
    return this.configured_(true).then(runtime => runtime.showUpdateOffers(options));
  }

  /** @override */
  showSubscribeOption(options) {
    return this.configured_(true).then(runtime => runtime.showSubscribeOption(options));
  }

  /** @override */
  showAbbrvOffer(options) {
    return this.configured_(true).then(runtime => runtime.showAbbrvOffer(options));
  }

  /** @override */
  showContributionOptions(options) {
    return this.configured_(true).then(runtime => runtime.showContributionOptions(options));
  }

  /** @override */
  waitForSubscriptionLookup(accountPromise) {
    return this.configured_(true).then(runtime => runtime.waitForSubscriptionLookup(accountPromise));
  }

  /** @override */
  setOnNativeSubscribeRequest(callback) {
    return this.configured_(false).then(runtime => runtime.setOnNativeSubscribeRequest(callback));
  }

  /** @override */
  setOnSubscribeResponse(callback) {
    return this.configured_(false).then(runtime => runtime.setOnSubscribeResponse(callback));
  }

  /** @override */
  subscribe(sku) {
    return this.configured_(true).then(runtime => runtime.subscribe(sku));
  }

  /** @override */
  updateSubscription(subscriptionRequest) {
    return this.configured_(true).then(runtime => runtime.updateSubscription(subscriptionRequest));
  }

  /** @override */
  setOnContributionResponse(callback) {
    return this.configured_(false).then(runtime => runtime.setOnContributionResponse(callback));
  }

  /** @override */
  setOnPaymentResponse(callback) {
    return this.configured_(false).then(runtime => runtime.setOnPaymentResponse(callback));
  }

  /** @override */
  contribute(skuOrSubscriptionRequest) {
    return this.configured_(true).then(runtime => runtime.contribute(skuOrSubscriptionRequest));
  }

  /** @override */
  completeDeferredAccountCreation(options) {
    return this.configured_(true).then(runtime => runtime.completeDeferredAccountCreation(options));
  }

  /** @override */
  setOnLoginRequest(callback) {
    return this.configured_(false).then(runtime => runtime.setOnLoginRequest(callback));
  }

  /** @override */
  triggerLoginRequest(request) {
    return this.configured_(false).then(runtime => runtime.triggerLoginRequest(request));
  }

  /** @override */
  setOnLinkComplete(callback) {
    return this.configured_(false).then(runtime => runtime.setOnLinkComplete(callback));
  }

  /** @override */
  linkAccount() {
    let params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    return this.configured_(true).then(runtime => runtime.linkAccount(params));
  }

  /** @override */
  setOnFlowStarted(callback) {
    return this.configured_(false).then(runtime => runtime.setOnFlowStarted(callback));
  }

  /** @override */
  setOnFlowCanceled(callback) {
    return this.configured_(false).then(runtime => runtime.setOnFlowCanceled(callback));
  }

  /** @override */
  saveSubscription(saveSubscriptionRequestCallback) {
    return this.configured_(true).then(runtime => {
      return runtime.saveSubscription(saveSubscriptionRequestCallback);
    });
  }

  /** @override */
  showLoginPrompt() {
    return this.configured_(true).then(runtime => {
      return runtime.showLoginPrompt();
    });
  }

  /** @override */
  showLoginNotification() {
    return this.configured_(true).then(runtime => {
      return runtime.showLoginNotification();
    });
  }

  /** @override */
  createButton(optionsOrCallback, callback) {
    return this.buttonApi_.create(optionsOrCallback, callback);
  }

  /** @override */
  attachSmartButton(button, optionsOrCallback, callback) {
    return this.configured_(true).then(runtime => runtime.attachSmartButton(button, optionsOrCallback, callback));
  }

  /** @override */
  attachButton(button, optionsOrCallback, callback) {
    return this.buttonApi_.attach(button, optionsOrCallback, callback);
  }

  /** @override */
  getPropensityModule() {
    return this.configured_(true).then(runtime => {
      return runtime.getPropensityModule();
    });
  }

  /** @override */
  getLogger() {
    return this.configured_(true).then(runtime => runtime.getLogger());
  }

  /** @override */
  getEventManager() {
    return this.configured_(true).then(runtime => runtime.getEventManager());
  }

  /** @override */
  setShowcaseEntitlement(entitlement) {
    return this.configured_(true).then(runtime => runtime.setShowcaseEntitlement(entitlement));
  }

  /** @override */
  consumeShowcaseEntitlementJwt(showcaseEntitlementJwt, onCloseDialog) {
    return this.configured_(true).then(runtime => runtime.consumeShowcaseEntitlementJwt(showcaseEntitlementJwt, onCloseDialog));
  }

  /** @override */
  showBestAudienceAction() {
    (0, _log.warn)('Not implemented yet');
  }

  /** @override */
  setPublisherProvidedId(publisherProvidedId) {
    return this.configured_(true).then(runtime => runtime.setPublisherProvidedId(publisherProvidedId));
  }
}

/**
 * @implements {DepsDef}
 * @implements {SubscriptionsInterface}
 */
exports.Runtime = Runtime;
class ConfiguredRuntime {
  /**
   * @param {!Window|!Document|!DocInterface} winOrDoc
   * @param {!../model/page-config.PageConfig} pageConfig
   * @param {{
   *     fetcher: (!FetcherInterface|undefined),
   *     configPromise: (!Promise|undefined),
   *     enableGoogleAnalytics: (boolean|undefined),
   *     enableDefaultMeteringHandler: (boolean|undefined),
   *     useArticleEndpoint: (boolean|undefined)
   *   }=} integr
   * @param {!../api/subscriptions.Config=} config
   * @param {!{
   *   lang: (string|undefined),
   *   theme: (!../api/basic-subscriptions.ClientTheme|undefined),
   *   }=} clientOptions
   */
  constructor(winOrDoc, pageConfig, integr, config, clientOptions) {
    integr = integr || {};
    integr.configPromise = integr.configPromise || Promise.resolve();

    /** @private @const {!ClientEventManager} */
    this.eventManager_ = new _clientEventManager.ClientEventManager(integr.configPromise);

    /** @private @const {!DocInterface} */
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

    /** @private @const {!FetcherInterface} */
    this.fetcher_ = integr.fetcher || new _fetcher.XhrFetcher(this.win_);

    /** @private @const {!Storage} */
    this.storage_ = new _storage.Storage(this.win_);

    /** @private @const {!DialogManager} */
    this.dialogManager_ = new _dialogManager.DialogManager(this.doc_);

    /** @private @const {!Callbacks} */
    this.callbacks_ = new _callbacks.Callbacks();

    /** @private {?OffersFlow} */
    this.lastOffersFlow_ = null;

    /** @private {?ContributionsFlow} */
    this.lastContributionsFlow_ = null;

    /** @private {string|undefined} */
    this.publisherProvidedId_ = undefined;

    // Start listening to Google Analytics events, if applicable.
    if (integr.enableGoogleAnalytics) {
      /** @private @const {!GoogleAnalyticsEventListener} */
      this.googleAnalyticsEventListener_ = new _googleAnalyticsEventListener.GoogleAnalyticsEventListener(this);
      this.googleAnalyticsEventListener_.start();
    }

    // WARNING: DepsDef ('this') is being progressively defined below.
    // Constructors will crash if they rely on something that doesn't exist yet.
    /** @private @const {!../components/activities.ActivityPorts} */
    this.activityPorts_ = new _activities.ActivityPorts(this);

    /** @private @const {!AnalyticsService} */
    this.analyticsService_ = new _analyticsService.AnalyticsService(this, this.fetcher_);

    /** @private @const {!PayClient} */
    this.payClient_ = new _payClient.PayClient(this);

    /** @private @const {!Logger} */
    this.logger_ = new _logger.Logger(this);

    /** @private @const {!EntitlementsManager} */
    this.entitlementsManager_ = new _entitlementsManager.EntitlementsManager(this.win_, this.pageConfig_, this.fetcher_, this,
    // See note about 'this' above
    integr.useArticleEndpoint || false, integr.enableDefaultMeteringHandler || false);

    /** @private @const {!ClientConfigManager} */
    this.clientConfigManager_ = new _clientConfigManager.ClientConfigManager(this,
    // See note about 'this' above
    pageConfig.getPublicationId(), this.fetcher_, clientOptions);

    /** @private @const {!Propensity} */
    this.propensityModule_ = new _propensity.Propensity(this.win_, this,
    // See note about 'this' above
    this.fetcher_);

    // ALL CLEAR: DepsDef definition now complete.
    this.eventManager_.logSwgEvent(_api_messages.AnalyticsEvent.IMPRESSION_PAGE_LOAD, false);

    /** @private @const {!OffersApi} */
    this.offersApi_ = new _offersApi.OffersApi(this.pageConfig_, this.fetcher_);

    /** @private @const {!ButtonApi} */
    this.buttonApi_ = new _buttonApi.ButtonApi(this.doc_, Promise.resolve(this));
    const preconnect = new _preconnect.Preconnect(this.win_.document);
    preconnect.prefetch('/assets/loader.svg');
    preconnect.preconnect('https://www.gstatic.com/');
    preconnect.preconnect('https://fonts.googleapis.com/');
    preconnect.preconnect('https://www.google.com/');
    _linkAccountsFlow.LinkCompleteFlow.configurePending(this);
    _payFlow.PayCompleteFlow.configurePending(this);
    (0, _dom.injectStyleSheet)(this.doc_, _dialog.CSS);

    // Report redirect errors if any.
    this.activityPorts_.onRedirectError(error => {
      this.analyticsService_.addLabels(['redirect']);
      this.eventManager_.logSwgEvent(_api_messages.AnalyticsEvent.EVENT_PAYMENT_FAILED, false);
      this.jserror_.error('Redirect error', error);
    });
  }

  /** @override */
  doc() {
    return this.doc_;
  }

  /** @override */
  win() {
    return this.win_;
  }

  /** @override */
  pageConfig() {
    return this.pageConfig_;
  }

  /** @override */
  jserror() {
    return this.jserror_;
  }

  /** @override */
  activities() {
    return this.activityPorts_;
  }

  /** @override */
  payClient() {
    return this.payClient_;
  }

  /** @override */
  dialogManager() {
    return this.dialogManager_;
  }

  /** @override */
  entitlementsManager() {
    return this.entitlementsManager_;
  }

  /** @override */
  callbacks() {
    return this.callbacks_;
  }

  /** @override */
  storage() {
    return this.storage_;
  }

  /** @override */
  clientConfigManager() {
    return this.clientConfigManager_;
  }

  /** @override */
  analytics() {
    return this.analyticsService_;
  }

  /** @override */
  init() {
    // Implemented by the `Runtime` class.
  }

  /** @override */
  configure(config) {
    // Indirected for constructor testing.
    this.configure_(config);
  }

  /**
   * @param {!../api/subscriptions.Config} config
   * @private
   */
  configure_(config) {
    // Validate first.
    let error = '';
    for (const key in config) {
      const value = config[key];
      switch (key) {
        case 'windowOpenMode':
          if (value != _subscriptions.WindowOpenMode.AUTO && value != _subscriptions.WindowOpenMode.REDIRECT) {
            error = 'Unknown windowOpenMode: ' + value;
          }
          break;
        case 'experiments':
          for (const experiment of value) {
            (0, _experiments.setExperiment)(this.win_, experiment, true);
          }
          if (this.analytics()) {
            // If analytics service isn't set up yet, then it will get the
            // experiments later.
            this.analytics().addLabels(value);
          }
          break;
        case 'analyticsMode':
          if (value != _subscriptions.AnalyticsMode.DEFAULT && value != _subscriptions.AnalyticsMode.IMPRESSIONS) {
            error = 'Unknown analytics mode: ' + value;
          }
          break;
        case 'enableSwgAnalytics':
          if (!(0, _types.isBoolean)(value)) {
            error = 'Unknown enableSwgAnalytics value: ' + value;
          }
          break;
        case 'enablePropensity':
          if (!(0, _types.isBoolean)(value)) {
            error = 'Unknown enablePropensity value: ' + value;
          }
          break;
        case 'skipAccountCreationScreen':
          if (!(0, _types.isBoolean)(value)) {
            error = 'Unknown skipAccountCreationScreen value: ' + value;
          }
          break;
        case 'publisherProvidedId':
          if (value != undefined && !(typeof value === 'string' && value != '')) {
            error = 'publisherProvidedId must be a string, value: ' + value;
          }
          break;
        default:
          error = 'Unknown config property: ' + key;
      }
    }
    // Throw error string if it's not null
    (0, _log.assert)(!error, error || undefined);
    // Assign.
    Object.assign(this.config_, config);
  }

  /** @override */
  config() {
    return this.config_;
  }

  /** @override */
  reset() {
    this.entitlementsManager_.reset();
    this.closeDialog();
  }

  /** @override */
  clear() {
    this.entitlementsManager_.clear();
    this.closeDialog();
  }

  /** Close dialog. */
  closeDialog() {
    this.dialogManager_.completeAll();
  }

  /** @override */
  start() {
    // No need to run entitlements without a product or for an unlocked page.
    if (!this.pageConfig_.getProductId() || !this.pageConfig_.isLocked()) {
      return Promise.resolve();
    }
    this.getEntitlements();
  }

  /** @override */
  getEntitlements(params) {
    if (params !== null && params !== void 0 && params.publisherProvidedId) {
      params.publisherProvidedId = this.publisherProvidedId_;
    }
    return this.entitlementsManager_.getEntitlements(params).then(entitlements => {
      // The swg user token is stored in the entitlements flow, so the analytics service is ready for logging.
      this.analyticsService_.setReadyForLogging();
      this.analyticsService_.start();
      // Auto update internal things tracking the user's current SKU.
      if (entitlements) {
        try {
          const skus = entitlements.entitlements.map(entitlement => entitlement.getSku() || 'unknown subscriptionToken');
          if (skus.length > 0) {
            this.analyticsService_.setSku(skus.join(','));
          }
        } catch (ex) {}
      }
      return entitlements.clone();
    });
  }

  /** @override */
  setOnEntitlementsResponse(callback) {
    this.callbacks_.setOnEntitlementsResponse(callback);
  }

  /** @override */
  getOffers(options) {
    return this.offersApi_.getOffers(options && options.productId);
  }

  /** @override */
  showOffers(options) {
    return this.documentParsed_.then(() => {
      const errorMessage = 'The showOffers() method cannot be used to update a subscription. ' + 'Use the showUpdateOffers() method instead.';
      (0, _log.assert)(options ? !options['oldSku'] : true, errorMessage);
      this.lastOffersFlow_ = new _offersFlow.OffersFlow(this, options);
      return this.lastOffersFlow_.start();
    });
  }

  /** @override */
  showUpdateOffers(options) {
    (0, _log.assert)((0, _experiments.isExperimentOn)(this.win_, _experimentFlags.ExperimentFlags.REPLACE_SUBSCRIPTION), 'Not yet launched!');
    return this.documentParsed_.then(() => {
      const errorMessage = 'The showUpdateOffers() method cannot be used for new subscribers. ' + 'Use the showOffers() method instead.';
      (0, _log.assert)(options ? !!options['oldSku'] : false, errorMessage);
      const flow = new _offersFlow.OffersFlow(this, options);
      return flow.start();
    });
  }

  /** @override */
  showSubscribeOption(options) {
    return this.documentParsed_.then(() => {
      const flow = new _offersFlow.SubscribeOptionFlow(this, options);
      return flow.start();
    });
  }

  /** @override */
  showAbbrvOffer(options) {
    return this.documentParsed_.then(() => {
      const flow = new _offersFlow.AbbrvOfferFlow(this, options);
      return flow.start();
    });
  }

  /** @override */
  showContributionOptions(options) {
    return this.documentParsed_.then(() => {
      this.lastContributionsFlow_ = new _contributionsFlow.ContributionsFlow(this, options);
      return this.lastContributionsFlow_.start();
    });
  }

  /**
   * Get the last contribution offers flow.
   * @return {?ContributionsFlow}
   */
  getLastContributionsFlow() {
    return this.lastContributionsFlow_;
  }

  /** @override */
  waitForSubscriptionLookup(accountPromise) {
    return this.documentParsed_.then(() => {
      const wait = new _waitForSubscriptionLookupApi.WaitForSubscriptionLookupApi(this, accountPromise);
      return wait.start();
    });
  }

  /** @override */
  setOnLoginRequest(callback) {
    this.callbacks_.setOnLoginRequest(callback);
  }

  /** @override */
  triggerLoginRequest(request) {
    this.callbacks_.triggerLoginRequest(request);
  }

  /** @override */
  setOnLinkComplete(callback) {
    this.callbacks_.setOnLinkComplete(callback);
  }

  /** @override */
  linkAccount() {
    let params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    return this.documentParsed_.then(() => {
      return new _linkAccountsFlow.LinkbackFlow(this).start(params);
    });
  }

  /** @override */
  saveSubscription(saveSubscriptionRequestCallback) {
    return this.documentParsed_.then(() => {
      return new _linkAccountsFlow.LinkSaveFlow(this, saveSubscriptionRequestCallback).start();
    });
  }

  /** @override */
  showLoginPrompt() {
    return this.documentParsed_.then(() => {
      return new _loginPromptApi.LoginPromptApi(this).start();
    });
  }

  /** @override */
  showLoginNotification() {
    return this.documentParsed_.then(() => {
      return new _loginNotificationApi.LoginNotificationApi(this).start();
    });
  }

  /** @override */
  setOnNativeSubscribeRequest(callback) {
    this.callbacks_.setOnSubscribeRequest(callback);
  }

  /** @override */
  setOnSubscribeResponse(callback) {
    this.callbacks_.setOnSubscribeResponse(callback);
  }

  /** @override */
  setOnPaymentResponse(callback) {
    this.callbacks_.setOnPaymentResponse(callback);
  }

  /** @override */
  subscribe(sku) {
    const errorMessage = 'The subscribe() method can only take a sku as its parameter; ' + 'for subscription updates please use the updateSubscription() method';
    (0, _log.assert)(typeof sku === 'string', errorMessage);
    return this.documentParsed_.then(() => {
      return new _payFlow.PayStartFlow(this, {
        'skuId': sku
      }).start();
    });
  }

  /** @override */
  updateSubscription(subscriptionRequest) {
    (0, _log.assert)((0, _experiments.isExperimentOn)(this.win_, _experimentFlags.ExperimentFlags.REPLACE_SUBSCRIPTION), 'Not yet launched!');
    const errorMessage = 'The updateSubscription() method should be used for subscription ' + 'updates; for new subscriptions please use the subscribe() method';
    (0, _log.assert)(subscriptionRequest ? subscriptionRequest['oldSku'] : false, errorMessage);
    return this.documentParsed_.then(() => {
      return new _payFlow.PayStartFlow(this, subscriptionRequest).start();
    });
  }

  /** @override */
  setOnContributionResponse(callback) {
    this.callbacks_.setOnContributionResponse(callback);
  }

  /** @override */
  contribute(skuOrSubscriptionRequest) {
    /** @type {!../api/subscriptions.SubscriptionRequest} */
    const request = typeof skuOrSubscriptionRequest == 'string' ? {
      'skuId': skuOrSubscriptionRequest
    } : skuOrSubscriptionRequest;
    return this.documentParsed_.then(() => {
      return new _payFlow.PayStartFlow(this, request, _subscriptions.ProductType.UI_CONTRIBUTION).start();
    });
  }

  /** @override */
  completeDeferredAccountCreation(options) {
    return this.documentParsed_.then(() => {
      return new _deferredAccountFlow.DeferredAccountFlow(this, options || null).start();
    });
  }

  /** @override */
  setOnFlowStarted(callback) {
    this.callbacks_.setOnFlowStarted(callback);
  }

  /** @override */
  setOnFlowCanceled(callback) {
    this.callbacks_.setOnFlowCanceled(callback);
  }

  /** @override */
  createButton(optionsOrCallback, callback) {
    // This is a minor duplication to allow this code to be sync.
    return this.buttonApi_.create(optionsOrCallback, callback);
  }

  /** @override */
  attachButton(button, optionsOrCallback, callback) {
    // This is a minor duplication to allow this code to be sync.
    this.buttonApi_.attach(button, optionsOrCallback, callback);
  }

  /** @override */
  attachSmartButton(button, optionsOrCallback, callback) {
    (0, _log.assert)((0, _experiments.isExperimentOn)(this.win_, _experimentFlags.ExperimentFlags.SMARTBOX), 'Not yet launched!');
    this.buttonApi_.attachSmartButton(this, button, optionsOrCallback, callback);
  }

  /** @override */
  getPropensityModule() {
    return Promise.resolve(this.propensityModule_);
  }

  /**
   * This one exists as an internal helper so SwG logging doesn't require a promise.
   * @return {!ClientEventManager}
   */
  eventManager() {
    return this.eventManager_;
  }

  /**
   * Get the last subscription offers flow.
   * @return {?OffersFlow}
   */
  getLastOffersFlow() {
    return this.lastOffersFlow_;
  }

  /**
   * This one exists as a public API so publishers can subscribe to SwG events.
   * @override */
  getEventManager() {
    return Promise.resolve(this.eventManager_);
  }

  /** @override */
  getLogger() {
    return Promise.resolve(this.logger_);
  }

  /** @override */
  setShowcaseEntitlement(entitlement) {
    if (!entitlement || !(0, _url.isSecure)(this.win().location) || !(0, _gaa.queryStringHasFreshGaaParams)(this.win().location.search, /*allowAllAccessTypes=*/true)) {
      return Promise.resolve();
    }
    const eventsToLog = (0, _eventTypeMapping.showcaseEventToAnalyticsEvents)(entitlement.entitlement) || [];
    const params = new _api_messages.EventParams();
    params.setIsUserRegistered(entitlement.isUserRegistered);
    if (entitlement.subscriptionTimestamp) {
      params.setSubscriptionTimestamp((0, _dateUtils.toTimestamp)((0, _dateUtils.convertPotentialTimestampToMilliseconds)(entitlement.subscriptionTimestamp)));
    }
    for (let i = 0; i < eventsToLog.length; i++) {
      this.eventManager().logEvent({
        eventType: eventsToLog[i],
        eventOriginator: _api_messages.EventOriginator.SHOWCASE_CLIENT,
        isFromUserAction: false,
        additionalParameters: params
      });
    }
    return Promise.resolve();
  }

  /** @override */
  consumeShowcaseEntitlementJwt(showcaseEntitlementJwt, onCloseDialog) {
    const entitlements = this.entitlementsManager().parseEntitlements({
      signedEntitlements: showcaseEntitlementJwt
    });
    entitlements.consume(onCloseDialog);
  }

  /** @override */
  showBestAudienceAction() {
    (0, _log.warn)('Not implemented yet');
  }

  /** @override */
  setPublisherProvidedId(publisherProvidedId) {
    this.publisherProvidedId_ = publisherProvidedId;
  }
}

/**
 * @param {!Runtime} runtime
 * @return {!SubscriptionsInterface}
 */
exports.ConfiguredRuntime = ConfiguredRuntime;
function createPublicRuntime(runtime) {
  return (/** @type {!SubscriptionsInterface} */{
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
      setShowcaseEntitlement: runtime.setShowcaseEntitlement.bind(runtime),
      consumeShowcaseEntitlementJwt: runtime.consumeShowcaseEntitlementJwt.bind(runtime),
      showBestAudienceAction: runtime.showBestAudienceAction.bind(runtime),
      setPublisherProvidedId: runtime.setPublisherProvidedId.bind(runtime)
    }
  );
}

},{"../../build/css/components/dialog.css":1,"../api/subscriptions":13,"../components/activities":15,"../components/dialog-manager":16,"../model/doc":27,"../model/page-config":29,"../model/page-config-resolver":28,"../proto/api_messages":30,"../utils/date-utils":69,"../utils/dom":71,"../utils/gaa":74,"../utils/log":78,"../utils/preconnect":80,"../utils/types":84,"../utils/url":85,"./analytics-service":31,"./button-api":32,"./callbacks":33,"./client-config-manager":34,"./client-event-manager":35,"./contributions-flow":36,"./deferred-account-flow":37,"./deps":38,"./entitlements-manager":39,"./event-type-mapping":40,"./experiment-flags":41,"./experiments":42,"./fetcher":43,"./google-analytics-event-listener":44,"./jserror":45,"./link-accounts-flow":46,"./logger":47,"./login-notification-api":48,"./login-prompt-api":49,"./offers-api":51,"./offers-flow":52,"./pay-client":53,"./pay-flow":54,"./propensity":56,"./storage":60,"./wait-for-subscription-lookup-api":61}],58:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MODES = exports.DEFAULT = exports.CACHE_KEYS = void 0;
exports.adsUrl = adsUrl;
exports.cacheParam = cacheParam;
exports.feArgs = feArgs;
exports.feCached = feCached;
exports.feOrigin = feOrigin;
exports.feUrl = feUrl;
exports.getSwgMode = getSwgMode;
exports.serviceUrl = serviceUrl;
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
const CACHE_KEYS = {
  'zero': 0,
  //testing value
  'nocache': 1,
  'hr1': 3600000,
  // 1hr = 1000 * 60 * 60
  'hr12': 43200000 // 12hr = 1000 * 60 * 60 * 12
};

/**
 * Default operating Mode
 */
exports.CACHE_KEYS = CACHE_KEYS;
const DEFAULT = {
  frontEnd: 'https://news.google.com',
  payEnv: 'SANDBOX',
  playEnv: 'STAGING',
  feCache: 'nocache'
};

/**
 * Default operating Mode
 */
exports.DEFAULT = DEFAULT;
const PROD = {
  frontEnd: 'https://news.google.com',
  payEnv: 'PRODUCTION',
  playEnv: 'PROD',
  feCache: CACHE_KEYS.hr1
};

/**
 * Default operating Mode
 */
const AUTOPUSH = {
  frontEnd: 'https://subscribe-autopush.sandbox.google.com',
  payEnv: 'PRODUCTION',
  playEnv: 'AUTOPUSH',
  feCache: CACHE_KEYS.nocache
};

/**
 * Default operating Mode
 */
const QUAL = {
  frontEnd: 'https://subscribe-qual.sandbox.google.com',
  payEnv: 'SANDBOX',
  playEnv: 'STAGING',
  feCache: CACHE_KEYS.hr1
};

/**
 * Operating modes, only runtime switchgable modes are here
 * build time modes set the default and are configured in prepare.sh
 *
 * IMPORTANT: modes other than prod will only work on google internal networks!
 * @type {!Object<Object>}
 * @package Visible for testing only.
 */
const MODES = {
  'default': DEFAULT,
  'prod': PROD,
  'autopush': AUTOPUSH,
  'qual': QUAL
};

/**
 * Check for swg.mode= in url fragemnet if it exists use it
 * otherwise use the default build mode.
 * @returns {Object}
 */
exports.MODES = MODES;
function getSwgMode() {
  const query = (0, _url.parseQueryString)(self.location.hash);
  const swgMode = query['swg.mode'];
  if (swgMode && MODES[swgMode]) {
    return MODES[swgMode];
  }
  return MODES['default'];
}

/**
 * @return {string}
 */
function feOrigin() {
  return (0, _url.parseUrl)(getSwgMode().frontEnd).origin;
}

/**
 * @param {string} url Relative URL, e.g. "/service1".
 * @return {string} The complete URL.
 */
function serviceUrl(url) {
  // Allows us to make API calls with enabled experiments.
  const query = (0, _url.parseQueryString)(self.location.hash);
  const experiments = query['swg.experiments'];
  if (experiments !== undefined) {
    url = (0, _url.addQueryParam)(url, 'e', experiments);
  }
  return `${getSwgMode().frontEnd}/swg/_/api/v1` + url;
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
 * @param {Object<string, string>=} params List of extra params to append to the URL.
 * @return {string} The complete URL.
 */
function feUrl(url) {
  let params = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  let usePrefixedHostPath = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;
  let prefix = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : '';
  // Add cache param.
  const prefixed = prefix ? usePrefixedHostPath ? `swg/${prefix}` : `${prefix}/swg` : 'swg';
  url = feCached(`${getSwgMode().frontEnd}/${prefixed}/_/ui/v1${url}`);

  // Optionally add jsmode param. This allows us to test against "aggressively" compiled Boq JS.
  const query = (0, _url.parseQueryString)(self.location.hash);
  const boqJsMode = query['swg.boqjsmode'];
  if (boqJsMode !== undefined) {
    url = (0, _url.addQueryParam)(url, 'jsmode', boqJsMode);
  }

  // Allows us to open iframes with enabled experiments.
  const experiments = query['swg.experiments'];
  if (experiments !== undefined) {
    url = (0, _url.addQueryParam)(url, 'e', experiments);
  }
  for (const param in params) {
    url = (0, _url.addQueryParam)(url, param, params[param]);
  }
  return url;
}

/**
 * @param {string} url FE URL.
 * @return {string} The complete URL including cache param.
 */
function feCached(url) {
  return (0, _url.addQueryParam)(url, '_', cacheParam(getSwgMode().feCache));
}

/**
 * @param {!Object<string, ?>} args
 * @return {!Object<string, ?>}
 */
function feArgs(args) {
  return Object.assign(args, {
    '_client': 'SwG 0.1.22-1667857131354'
  });
}

/**
 * @param {string} cacheKey
 * @return {string}
 * @package Visible for testing only.
 */
function cacheParam(cacheKey) {
  let period = CACHE_KEYS[cacheKey];
  if (period == null) {
    period = 1;
  }
  if (period === 0) {
    return '_';
  }
  const now = Date.now();
  return String(period <= 1 ? now : Math.floor(now / period));
}

},{"../utils/url":85}],59:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Theme = exports.SmartSubscriptionButtonApi = void 0;
var _api_messages = require("../proto/api_messages");
var _dom = require("../utils/dom");
var _services = require("./services");
var _style = require("../utils/style");
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

/** @const {!Object<string, string>} */
const iframeAttributes = {
  'frameborder': '0',
  'scrolling': 'no'
};

/**
 * @enum {string}
 */
const Theme = {
  LIGHT: 'light',
  DARK: 'dark'
};

/**
 * The class for Smart button Api.
 */
exports.Theme = Theme;
class SmartSubscriptionButtonApi {
  /**
   * @param {!./deps.DepsDef} deps
   * @param {!Element} button
   * @param {!../api/subscriptions.SmartButtonOptions} options
   * @param {function(!Event=)=} callback
   */
  constructor(deps, button, options, callback) {
    /** @private @const {!./deps.DepsDef} */
    this.deps_ = deps;

    /** @private @const {!Window} */
    this.win_ = deps.win();

    /** @private @const {!Document} */
    this.doc_ = this.win_.document;

    /** @private @const {!../components/activities.ActivityPorts} */
    this.activityPorts_ = deps.activities();

    /** @private @const {!HTMLIFrameElement} */
    this.iframe_ = /** @type {!HTMLIFrameElement} */
    (0, _dom.createElement)(this.doc_, 'iframe', iframeAttributes);

    /** @private @const {!Element} */
    this.button_ = button;

    /** @private {!../api/subscriptions.SmartButtonOptions} */
    this.options_ = options;

    /** @private @const */
    this.callback_ = callback;

    /** @private @const {string} */
    this.src_ = (0, _services.feUrl)('/smartboxiframe');
    const frontendArguments = {
      'productId': this.deps_.pageConfig().getProductId(),
      'publicationId': this.deps_.pageConfig().getPublicationId(),
      'theme': this.options_ && this.options_.theme || 'light',
      'lang': this.options_ && this.options_.lang || 'en'
    };
    const messageTextColor = this.options_ && this.options_.messageTextColor;
    if (messageTextColor) {
      frontendArguments['messageTextColor'] = messageTextColor;
    }

    /** @private @const {!Object} */
    this.args_ = (0, _services.feArgs)(frontendArguments);
  }

  /**
   * @param {SmartBoxMessage} smartBoxMessage
   */
  handleSmartBoxClick_(smartBoxMessage) {
    if (smartBoxMessage && smartBoxMessage.getIsClicked()) {
      this.callback_();
    }
  }

  /**
   * Make a call to build button content and listens for the 'click' message.
   * @return {!Element}
   */
  start() {
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
    const args = this.activityPorts_.addDefaultArguments(this.args_);
    this.activityPorts_.openIframe(this.iframe_, this.src_, args).then(port => {
      port.on(_api_messages.SmartBoxMessage, this.handleSmartBoxClick_.bind(this));
    });
    return this.iframe_;
  }
}
exports.SmartSubscriptionButtonApi = SmartSubscriptionButtonApi;

},{"../proto/api_messages":30,"../utils/dom":71,"../utils/style":83,"./services":58}],60:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Storage = void 0;
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

const PREFIX = 'subscribe.google.com';

/**
 * This class is responsible for the storage of data in session storage. If
 * you're looking to store data in local storage, see
 * src/runtime/local-storage.LocalStorage.
 */
class Storage {
  /**
   * @param {!Window} win
   */
  constructor(win) {
    /** @private @const {!Window} */
    this.win_ = win;

    /** @private @const {!Object<string, !Promise<?string>>} */
    this.values_ = {};
  }

  /**
   * @param {string} key
   * @param {boolean=} useLocalStorage
   * @return {!Promise<?string>}
   */
  get(key) {
    let useLocalStorage = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
    if (!this.values_[key]) {
      this.values_[key] = new Promise(resolve => {
        const storage = useLocalStorage ? this.win_.localStorage : this.win_.sessionStorage;
        if (storage) {
          try {
            resolve(storage.getItem(storageKey(key)));
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
   * @param {boolean=} useLocalStorage
   * @return {!Promise}
   */
  set(key, value) {
    let useLocalStorage = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
    this.values_[key] = Promise.resolve(value);
    return new Promise(resolve => {
      const storage = useLocalStorage ? this.win_.localStorage : this.win_.sessionStorage;
      if (storage) {
        try {
          storage.setItem(storageKey(key), value);
        } catch (e) {
          // Ignore error.
        }
      }
      resolve();
    });
  }

  /**
   * @param {string} key
   * @param {boolean=} useLocalStorage
   * @return {!Promise}
   */
  remove(key) {
    let useLocalStorage = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
    delete this.values_[key];
    return new Promise(resolve => {
      const storage = useLocalStorage ? this.win_.localStorage : this.win_.sessionStorage;
      if (storage) {
        try {
          storage.removeItem(storageKey(key));
        } catch (e) {
          // Ignore error.
        }
      }
      resolve();
    });
  }
}

/**
 * @param {string} key
 * @return {string}
 */
exports.Storage = Storage;
function storageKey(key) {
  return PREFIX + ':' + key;
}

},{}],61:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.WaitForSubscriptionLookupApi = void 0;
var _activityIframeView = require("../ui/activity-iframe-view");
var _deferredAccountCreation = require("../api/deferred-account-creation");
var _services = require("./services");
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

const NO_PROMISE_ERR = 'No account promise provided';
class WaitForSubscriptionLookupApi {
  /**
   * @param {!./deps.DepsDef} deps
   * @param {?Promise} accountPromise
   */
  constructor(deps, accountPromise) {
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
    }), /* shouldFadeBody */true, /* hasLoadingIndicator */true);
  }

  /**
   * Starts the Login Flow.
   * @return {!Promise}
   */
  start() {
    this.openViewPromise_ = this.dialogManager_.openView(this.activityIframeView_);
    return this.accountPromise_.then(account => {
      // Account was found.
      this.dialogManager_.completeView(this.activityIframeView_);
      return account;
    }, reason => {
      this.dialogManager_.completeView(this.activityIframeView_);
      throw reason;
    });
  }
}
exports.WaitForSubscriptionLookupApi = WaitForSubscriptionLookupApi;

},{"../api/deferred-account-creation":6,"../ui/activity-iframe-view":62,"./services":58}],62:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ActivityIframeView = void 0;
var _view = require("../components/view");
var _activityUtils = require("../utils/activity-utils");
var _dom = require("../utils/dom");
var _errors = require("../utils/errors");
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

/** @const {!Object<string, string>} */
const iframeAttributes = {
  'frameborder': '0',
  'scrolling': 'no'
};

/**
 * Class to build and render Activity iframe view.
 */
class ActivityIframeView extends _view.View {
  /**
   * @param {!Window} win
   * @param {!../components/activities.ActivityPorts} activityPorts
   * @param {string} src
   * @param {!Object<string, ?>=} args Additional data to be passed to the iframe.
   * @param {boolean=} shouldFadeBody
   * @param {boolean=} hasLoadingIndicator
   */
  constructor(win, activityPorts, src, args) {
    let shouldFadeBody = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : false;
    let hasLoadingIndicator = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : false;
    super();

    /** @private @const {!Window} */
    this.win_ = win;

    /** @private @const {!Document} */
    this.doc_ = this.win_.document;

    /** @private @const {!HTMLIFrameElement} */
    this.iframe_ = /** @type {!HTMLIFrameElement} */
    (0, _dom.createElement)(this.doc_, 'iframe', iframeAttributes);

    /** @private @const {!../components/activities.ActivityPorts} */
    this.activityPorts_ = activityPorts;

    /** @private @const {string} */
    this.src_ = src;

    /** @private @const {!Object<string, ?>} */
    this.args_ = args || {};

    /** @private @const {boolean} */
    this.shouldFadeBody_ = shouldFadeBody;

    /** @private @const {boolean} */
    this.hasLoadingIndicator_ = hasLoadingIndicator;

    /** @private {?../components/activities.ActivityIframePort} */
    this.port_ = null;

    /**
     * @private
     * {?function<!web-activities/activity-ports.ActivityIframePort|!Promise>}
     */
    this.portResolver_ = null;

    /**
     * @private @const
     * {!Promise<!web-activities/activity-ports.ActivityIframePort>}
     */
    this.portPromise_ = new Promise(resolve => {
      this.portResolver_ = resolve;
    });
  }

  /** @override */
  getElement() {
    return this.iframe_;
  }

  /** @override */
  init(dialog) {
    return this.activityPorts_.openIframe(this.iframe_, this.src_, this.args_).then(port => this.onOpenIframeResponse_(port, dialog));
  }

  /**
   * Returns if document should fade for this view.
   * @return {boolean}
   */
  shouldFadeBody() {
    return this.shouldFadeBody_;
  }

  /**
   * Returns if the view shows loading indicator.
   * @return {boolean}
   */
  hasLoadingIndicator() {
    return this.hasLoadingIndicator_;
  }

  /**
   * @param {!../components/activities.ActivityIframePort} port
   * @param {!../components/dialog.Dialog} dialog
   * @return {!Promise}
   */
  onOpenIframeResponse_(port, dialog) {
    this.port_ = port;
    this.portResolver_(port);
    this.port_.onResizeRequest(height => {
      dialog.resizeView(this, height);
    });
    return this.port_.whenReady();
  }

  /**
   * @return {!Promise<!../components/activities.ActivityIframePort>}
   * @private
   */
  getPortPromise_() {
    return this.portPromise_;
  }

  /**
   * @param {!function(new: T)}  message
   * @param {function(?)} callback
   * @template T
   */
  on(message, callback) {
    this.getPortPromise_().then(port => {
      port.on(message, callback);
    });
  }

  /**
   * @param {!../proto/api_messages.Message} request
   */
  execute(request) {
    this.getPortPromise_().then(port => {
      port.execute(request);
    });
  }

  /**
   * Accepts results from the caller.
   * @return {!Promise<!web-activities/activity-ports.ActivityResult>}
   */
  acceptResult() {
    return this.getPortPromise_().then(port => port.acceptResult());
  }

  /**
   * Accepts results from the caller and verifies origin.
   * @param {string} requireOrigin
   * @param {boolean} requireOriginVerified
   * @param {boolean} requireSecureChannel
   * @return {!Promise<!Object>}
   */
  acceptResultAndVerify(requireOrigin, requireOriginVerified, requireSecureChannel) {
    return this.getPortPromise_().then(port => {
      return (0, _activityUtils.acceptPortResultData)(port, requireOrigin, requireOriginVerified, requireSecureChannel);
    });
  }

  /**
   * Completes the flow.
   * @return {!Promise}
   */
  whenComplete() {
    return this.acceptResult();
  }

  /**
   * @param {function()} callback
   */
  onCancel(callback) {
    this.acceptResult().catch(reason => {
      if ((0, _errors.isCancelError)(reason)) {
        callback();
      }
      throw reason;
    });
  }

  /** @override */
  resized() {
    if (this.port_) {
      this.port_.resized();
    }
  }
}
exports.ActivityIframeView = ActivityIframeView;

},{"../components/view":20,"../utils/activity-utils":65,"../utils/dom":71,"../utils/errors":73}],63:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LoadingViewConfig = exports.LoadingView = void 0;
var _dom = require("../utils/dom");
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
 * Display configration options for the loading view.
 *
 * Properties:
 * - additionalClasses: List of CSS classes to apply to the loading container.
 *
 * @typedef {{
 *   additionalClasses: (!Array<string>|undefined),
 * }}
 */
let LoadingViewConfig;

/**
 * Loading indicator class. Builds the loading indicator view to be injected in
 * parent element <iframe class="swg-dialog"> element. Provides methods to
 * show/hide loading indicator.
 */
exports.LoadingViewConfig = LoadingViewConfig;
class LoadingView {
  /**
   * @param {!Document} doc
   * @param {!LoadingViewConfig=} config
   */
  constructor(doc) {
    let config = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    /** @private @const {!Document} */
    this.doc_ = doc;

    /** @private @const {!Element} */
    this.loadingContainer_ = (0, _dom.createElement)(this.doc_, 'swg-loading-container', {});
    if (config.additionalClasses) {
      for (const additionalClass of config.additionalClasses) {
        this.loadingContainer_.classList.add(additionalClass);
      }
    }

    /** @private @const {!Element} */
    this.loading_ = (0, _dom.createElement)(this.doc_, 'swg-loading', {});
    this.loadingContainer_.appendChild(this.loading_);
    this.loadingContainer_.style.setProperty('display', 'none', 'important');

    // Build the animated loading indicator.
    this.buildLoadingIndicator_();
  }

  /**
   * Gets the populated loading container.
   * @return {!Element}
   */
  getElement() {
    return this.loadingContainer_;
  }

  /**
   * Shows the loading indicator within the container element.
   */
  show() {
    this.loadingContainer_.style.removeProperty('display');
  }

  /**
   * Hides the loading indicator within the container element.
   */
  hide() {
    this.loadingContainer_.style.setProperty('display', 'none', 'important');
  }

  /**
   * Populates the loading indivicator. The populated element
   * can be added in any view, when required.
   * @private
   */
  buildLoadingIndicator_() {
    const loadingContainer = this.loading_;
    const loadingIndicatorTopContainer = (0, _dom.createElement)(this.doc_, 'swg-loading-animate', {});
    loadingContainer.appendChild(loadingIndicatorTopContainer);
    const loadingIndicatorChildContainer = (0, _dom.createElement)(this.doc_, 'swg-loading-image', {});
    loadingIndicatorTopContainer.appendChild(loadingIndicatorChildContainer);
  }
}
exports.LoadingView = LoadingView;

},{"../utils/dom":71}],64:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.toastImportantStyles = exports.ToastSpecDef = exports.Toast = void 0;
var _dom = require("../utils/dom");
var _style = require("../utils/style");
var _animation = require("../utils/animation");
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

/** @const {!Object<string, string|number>} */
const toastImportantStyles = {
  'height': 0
};

/** @typedef {{
 *    text: string,
 *    action: ({label: string, handler: function()}|undefined)
 *  }}
 */
exports.toastImportantStyles = toastImportantStyles;
let ToastSpecDef;

/** @const {!Object<string, string>} */
exports.ToastSpecDef = ToastSpecDef;
const iframeAttributes = {
  'frameborder': '0',
  'scrolling': 'no',
  'class': 'swg-toast'
};

/**
 * The class Notification toast.
 */
class Toast {
  /**
   * @param {!../runtime/deps.DepsDef} deps
   * @param {string} src
   * @param {?Object<string, ?>=} args
   */
  constructor(deps, src, args) {
    /** @private @const {!../model/doc.Doc} */
    this.doc_ = deps.doc();

    /** @private @const {!../components/activities.ActivityPorts} */
    this.activityPorts_ = deps.activities();

    /** @private @const {string} */
    this.src_ = src;

    /** @private {?Object<string, ?>} */
    this.args_ = args || {};

    /** @private {?Promise} */
    this.animating_ = null;

    /** @private @const {!HTMLIFrameElement} */
    this.iframe_ = /** @type {!HTMLIFrameElement} */
    (0, _dom.createElement)(this.doc_.getWin().document, 'iframe', iframeAttributes);
    (0, _style.setImportantStyles)(this.iframe_, toastImportantStyles);

    /** @private @const {!Promise} */
    this.ready_ = new Promise(resolve => {
      this.iframe_.onload = resolve;
    });
  }

  /**
   * Returns the iframe element.
   * @return {!HTMLIFrameElement}
   */
  getElement() {
    return this.iframe_;
  }

  /**
   * Opens the notification toast.
   * @return {!Promise}
   */
  open() {
    this.doc_.getBody().appendChild(this.iframe_); // Fires onload.
    return this.buildToast_();
  }

  /**
   * Builds the content of the iframe. On load, animates the toast.
   */
  buildToast_() {
    const toastDurationSeconds = 7;
    return this.activityPorts_.openIframe(this.iframe_, this.src_, this.args_).then(port => {
      return port.whenReady();
    }).then(() => {
      (0, _style.resetStyles)(this.iframe_, ['height']);
      this.animate_(() => {
        (0, _style.setImportantStyles)(this.iframe_, {
          'transform': 'translateY(100%)',
          'opactiy': 1,
          'visibility': 'visible'
        });
        return (0, _animation.transition)(this.iframe_, {
          'transform': 'translateY(0)',
          'opacity': 1,
          'visibility': 'visible'
        }, 400, 'ease-out');
      });

      // Close the Toast after the specified duration.
      this.doc_.getWin().setTimeout(() => {
        this.close();
      }, (toastDurationSeconds + 1) * 1000);
    });
  }

  /**
   * @param {function():!Promise} callback
   * @return {!Promise}
   * @private
   */
  animate_(callback) {
    const wait = this.animating_ || Promise.resolve();
    return this.animating_ = wait.then(() => callback())
    // Ignore errors to make sure animations don't get stuck.
    .catch(() => {}).then(() => {
      this.animating_ = null;
    });
  }

  /**
   * Closes the toast.
   * @return {!Promise}
   */
  close() {
    return this.animate_(() => {
      // Remove the toast from the DOM after animation is complete.
      this.doc_.getWin().setTimeout(() => {
        this.doc_.getBody().removeChild(this.iframe_);
        return Promise.resolve();
      }, 500);
      return (0, _animation.transition)(this.iframe_, {
        'transform': 'translateY(100%)',
        'opacity': 1,
        'visibility': 'visible'
      }, 400, 'ease-out');
    });
  }
}
exports.Toast = Toast;

},{"../utils/animation":66,"../utils/dom":71,"../utils/style":83}],65:[function(require,module,exports){
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
  return port.acceptResult().then(result => {
    if (result.origin != requireOrigin || requireOriginVerified && !result.originVerified || requireSecureChannel && !result.secureChannel) {
      throw new Error('channel mismatch');
    }
    return result.data;
  });
}

},{}],66:[function(require,module,exports){
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
  const win = el.ownerDocument.defaultView;
  const previousTransitionValue = el.style.transition || '';
  return new Promise(resolve => {
    win.setTimeout(() => {
      win.setTimeout(resolve, durationMillis);
      const tr = `${durationMillis}ms ${curve}`;
      (0, _style.setImportantStyles)(el, Object.assign({
        'transition': `transform ${tr}, opacity ${tr}`
      }, props));
    });
  }).then(() => {
    (0, _style.setImportantStyles)(el, {
      'transition': previousTransitionValue
    });
  });
}

},{"./style":83}],67:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.base64UrlDecodeToBytes = base64UrlDecodeToBytes;
exports.base64UrlEncodeFromBytes = base64UrlEncodeFromBytes;
exports.bytesToString = bytesToString;
exports.stringToBytes = stringToBytes;
exports.utf8DecodeSync = utf8DecodeSync;
exports.utf8EncodeSync = utf8EncodeSync;
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
const base64UrlDecodeSubs = {
  '-': '+',
  '_': '/'
};

/**
 * Character mapping from base64 to base64url.
 * @const {!Object<string, string>}
 */
const base64UrlEncodeSubs = {
  '+': '-',
  '/': '_',
  '=': ''
};

/**
 * Converts a string which holds 8-bit code points, such as the result of atob,
 * into a Uint8Array with the corresponding bytes.
 * If you have a string of characters, you probably want to be using utf8Encode.
 * @param {string} str
 * @return {!Uint8Array}
 */
function stringToBytes(str) {
  const bytes = new Uint8Array(str.length);
  for (let i = 0; i < str.length; i++) {
    const charCode = str.charCodeAt(i);
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
  const array = new Array(bytes.length);
  for (let i = 0; i < bytes.length; i++) {
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
  const asciiString = bytesToString(new Uint8Array(bytes));
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
  const encoded = atob(str.replace(/[-_]/g, ch => base64UrlDecodeSubs[ch]));
  return stringToBytes(encoded);
}

/**
 * Converts a bytes array into base64url encoded string.
 * base64url is defined in RFC 4648. It is sometimes referred to as "web safe".
 * @param {!Uint8Array} bytes
 * @return {string}
 */
function base64UrlEncodeFromBytes(bytes) {
  const str = bytesToString(bytes);
  return btoa(str).replace(/[+/=]/g, ch => base64UrlEncodeSubs[ch]);
}

},{"./log":78}],68:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Constants = void 0;
/**
 * Copyright 2021 The Subscribe with Google Authors. All Rights Reserved.
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

const Constants = {};

/**
 * Local storage key for swgUserToken.
 *
 * @const {string}
 */
exports.Constants = Constants;
Constants.USER_TOKEN = 'USER_TOKEN';
Constants.READ_TIME = 'READ_TIME';

},{}],69:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.convertPotentialTimestampToMilliseconds = convertPotentialTimestampToMilliseconds;
exports.convertPotentialTimestampToSeconds = convertPotentialTimestampToSeconds;
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

/**
 * This function is used for convert the timestamp provided by publisher to
 * milliseconds. Although we required publishers to provide timestamp in
 * milliseconds, but there's a chance they may not follow the instruction.
 * So this function supports the conversion of seconds, milliseconds and
 * microseconds.
 * @param {!number} timestamp represented as seconds, milliseconds or microseconds
 * @return {!number}
 */
function convertPotentialTimestampToSeconds(timestamp) {
  let timestampInSeconds;
  if (timestamp >= 1e14 || timestamp <= -1e14) {
    // Microseconds
    timestampInSeconds = Math.floor(timestamp / 1e6);
  } else if (timestamp >= 1e11 || timestamp <= -3e10) {
    // Milliseconds
    timestampInSeconds = Math.floor(timestamp / 1000);
  } else {
    // Seconds
    timestampInSeconds = timestamp;
  }
  return timestampInSeconds;
}

/**
 * @param {!number} timestamp represented as seconds, milliseconds or microseconds
 * @return {!number}
 */
function convertPotentialTimestampToMilliseconds(timestamp) {
  let timestampInMilliseconds;
  if (timestamp >= 1e14 || timestamp <= -1e14) {
    // Microseconds
    timestampInMilliseconds = Math.floor(timestamp / 1000);
  } else if (timestamp >= 1e11 || timestamp <= -3e10) {
    // Milliseconds
    timestampInMilliseconds = timestamp;
  } else {
    // Seconds
    timestampInMilliseconds = Math.floor(timestamp * 1000);
  }
  return timestampInMilliseconds;
}

},{"../proto/api_messages":30}],70:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isDocumentReady = isDocumentReady;
exports.onDocumentReady = onDocumentReady;
exports.whenDocumentComplete = whenDocumentComplete;
exports.whenDocumentReady = whenDocumentReady;
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
  return (/** @type {string} */doc['readyState']
  );
}

/**
 * Whether the document is ready.
 * @param {!Document} doc
 * @return {boolean}
 */
function isDocumentReady(doc) {
  const readyState = getReadyState(doc);
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
  }

  // Execute callback (once!) after condition is satisfied.
  let callbackHasExecuted = false;
  const readyListener = () => {
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
  return new Promise(resolve => {
    onDocumentReady(doc, resolve);
  });
}

/**
 * Returns a promise that is resolved when document is complete.
 * @param {!Document} doc
 * @return {!Promise<!Document>}
 */
function whenDocumentComplete(doc) {
  return new Promise(resolve => {
    onDocumentState(doc, isDocumentComplete, resolve);
  });
}

},{}],71:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.addAttributesToElement = addAttributesToElement;
exports.createElement = createElement;
exports.hasNextNodeInDocumentOrder = hasNextNodeInDocumentOrder;
exports.injectStyleSheet = injectStyleSheet;
exports.isConnected = isConnected;
exports.isLegacyEdgeBrowser = isLegacyEdgeBrowser;
exports.removeChildren = removeChildren;
exports.removeElement = removeElement;
exports.styleType = exports.styleLinkAttrs = exports.styleExistsQuerySelector = void 0;
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
const styleLinkAttrs = {
  'rel': 'stylesheet',
  'type': 'text/css'
};

/** @const {string} */
exports.styleLinkAttrs = styleLinkAttrs;
const styleType = 'text/css';

/** @const {string} */
exports.styleType = styleType;
const styleExistsQuerySelector = 'link[rel=stylesheet][href]';

/**
 * Add attributes to an element.
 * @param {!Element} element
 * @param {!Object<string, string|number|boolean|!Object<string, string|number|boolean>>} attributes
 * @return {!Element} updated element.
 */
exports.styleExistsQuerySelector = styleExistsQuerySelector;
function addAttributesToElement(element, attributes) {
  for (const attr in attributes) {
    if (attr == 'style') {
      (0, _style.setStyles)(element, /** @type {!Object<string, string|boolean|number>} */
      attributes[attr]);
    } else {
      element.setAttribute(attr, /** @type {string|boolean|number} */attributes[attr]);
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
  const element = doc.createElement(tagName);
  addAttributesToElement(element, attributes);
  if (content != null) {
    if (typeof content == 'string') {
      element.textContent = content;
    } else if (content.nodeType) {
      element.appendChild( /** @type {!Node} */content);
    } else if ('length' in content) {
      for (let i = 0; i < content.length; i++) {
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
  const styleElement = createElement(doc.getWin().document, 'style', {
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
  let currentElement = element;
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
  }
  // Polyfill.
  const root = node.ownerDocument && node.ownerDocument.documentElement;
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
  const nav = win.navigator;
  return /Edge/i.test(nav && nav.userAgent);
}

},{"./log":78,"./style":83}],72:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.user = exports.dev = exports.ErrorLogger = exports.AMP_USER_ERROR_SENTINEL = void 0;
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
const AMP_USER_ERROR_SENTINEL = '\u200B\u200B\u200B';

/**
 * Some exceptions (DOMException, namely) have read-only message.
 * @param {!Error} error
 * @return {!Error}
 */
exports.AMP_USER_ERROR_SENTINEL = AMP_USER_ERROR_SENTINEL;
function duplicateErrorIfNecessary(error) {
  const messageProperty = Object.getOwnPropertyDescriptor(error, 'message');
  if (messageProperty && messageProperty.writable) {
    return error;
  }
  const {
    message,
    stack
  } = error;
  const e = new Error(message);
  // Copy all the extraneous things we attach.
  for (const prop in error) {
    e[prop] = error[prop];
  }
  // Ensure these are copied.
  e.stack = stack;
  return e;
}

/**
 * @param {...*} var_args
 * @return {!Error}
 */
function createErrorVargs(var_args) {
  let error = null;
  let message = '';
  for (let i = 0; i < arguments.length; i++) {
    const arg = arguments[i];
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
class ErrorLogger {
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
  constructor() {
    let opt_suffix = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
    /** @private @const {string} */
    this.suffix_ = opt_suffix;
  }

  /**
   * Modifies an error before reporting, such as to add metadata.
   * @param {!Error} error
   * @private
   */
  prepareError_(error) {
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
  createError(var_args) {
    const error = createErrorVargs.apply(null, Array.prototype.slice.call(arguments));
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
  createExpectedError(var_args) {
    const error = createErrorVargs.apply(null, Array.prototype.slice.call(arguments));
    this.prepareError_(error);
    error.expected = true;
    return error;
  }

  /**
   * Throws an error.
   * @param {...*} var_args
   * @throws {!Error}
   */
  error(var_args) {
    throw this.createError.apply(this, arguments);
  }

  /**
   * Throws an error and marks with an expected property.
   * @param {...*} var_args
   * @throws {!Error}
   */
  expectedError(var_args) {
    throw this.createExpectedError.apply(this, arguments);
  }
}
exports.ErrorLogger = ErrorLogger;
const userLogger = new ErrorLogger(self.__AMP_TOP ? AMP_USER_ERROR_SENTINEL : '');
const devLogger = new ErrorLogger();
const user = () => userLogger;
exports.user = user;
const dev = () => devLogger;
exports.dev = dev;

},{}],73:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ErrorUtils = void 0;
exports.createCancelError = createCancelError;
exports.isCancelError = isCancelError;
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

const {
  createAbortError,
  isAbortError
} = require('web-activities/activity-ports');

/**
 * Whether the specified error is an AbortError type.
 * See https://heycam.github.io/webidl/#aborterror.
 * @param {*} error
 * @return {boolean}
 */
function isCancelError(error) {
  return isAbortError(error);
}

/**
 * Creates or emulates a DOMException of AbortError type.
 * See https://heycam.github.io/webidl/#aborterror.
 * @param {!Window} win
 * @param {string=} message
 * @return {!DOMException}
 */
function createCancelError(win, message) {
  return createAbortError(win, message);
}

/**
 * A set of error utilities combined in a class to allow easy stubbing in tests.
 */
class ErrorUtils {
  /**
   * @param {!Error} error
   */
  static throwAsync(error) {
    setTimeout(() => {
      throw error;
    });
  }
}
exports.ErrorUtils = ErrorUtils;

},{"web-activities/activity-ports":3}],74:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SIGN_IN_WITH_GOOGLE_BUTTON_ID = exports.REGWALL_TITLE_ID = exports.REGWALL_DIALOG_ID = exports.REGWALL_CONTAINER_ID = exports.REGISTRATION_BUTTON_CONTAINER_ID = exports.PaywallReasonType = exports.POST_MESSAGE_STAMP = exports.POST_MESSAGE_COMMAND_USER = exports.POST_MESSAGE_COMMAND_INTRODUCTION = exports.POST_MESSAGE_COMMAND_ERROR = exports.POST_MESSAGE_COMMAND_BUTTON_CLICK = exports.POST_MESSAGE_COMMAND_3P_BUTTON_CLICK = exports.InitParams = exports.GrantReasonType = exports.GoogleUserDef = exports.GoogleIdentityV1 = exports.GaaUtils = exports.GaaUserDef = exports.GaaSignInWithGoogleButton = exports.GaaMeteringRegwall = exports.GaaMetering = exports.GaaGoogleSignInButton = exports.GaaGoogle3pSignInButton = exports.GOOGLE_SIGN_IN_IFRAME_ID = exports.GOOGLE_SIGN_IN_BUTTON_ID = exports.GOOGLE_3P_SIGN_IN_BUTTON_ID = void 0;
exports.queryStringHasFreshGaaParams = queryStringHasFreshGaaParams;
var _strings = require("../i18n/strings");
var _jwt = require("./jwt");
var _subscriptions = require("../api/subscriptions");
var _url = require("./url");
var _log = require("./log");
var _object = require("./object");
var _i18n = require("./i18n");
var _json = require("./json");
var _style = require("./style");
var _api_messages = require("../proto/api_messages");
var _dateUtils = require("./date-utils");
var _dom = require("./dom");
var _doc = require("../model/doc");
var _eventTypeMapping = require("../runtime/event-type-mapping");
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

// PLEASE DO NOT HOST THIS FILE YOURSELF. DOING SO WILL BREAK THINGS.
//
// Publishers should load this file from:
// https://news.google.com/swg/js/v1/swg-gaa.js
//
// Thanks!

// Load types for Closure compiler.

/** Stamp for post messages. */
const POST_MESSAGE_STAMP = 'swg-gaa-post-message-stamp';

/** Introduction command for post messages. */
exports.POST_MESSAGE_STAMP = POST_MESSAGE_STAMP;
const POST_MESSAGE_COMMAND_INTRODUCTION = 'introduction';

/** User command for post messages. */
exports.POST_MESSAGE_COMMAND_INTRODUCTION = POST_MESSAGE_COMMAND_INTRODUCTION;
const POST_MESSAGE_COMMAND_USER = 'user';

/** Error command for post messages. */
exports.POST_MESSAGE_COMMAND_USER = POST_MESSAGE_COMMAND_USER;
const POST_MESSAGE_COMMAND_ERROR = 'error';

/** Button click command for post messages. */
exports.POST_MESSAGE_COMMAND_ERROR = POST_MESSAGE_COMMAND_ERROR;
const POST_MESSAGE_COMMAND_BUTTON_CLICK = 'button-click';

/** 3P button click command for post messages. */
exports.POST_MESSAGE_COMMAND_BUTTON_CLICK = POST_MESSAGE_COMMAND_BUTTON_CLICK;
const POST_MESSAGE_COMMAND_3P_BUTTON_CLICK = '3p-button-click';

/** ID for the Google Sign-In iframe element. */
exports.POST_MESSAGE_COMMAND_3P_BUTTON_CLICK = POST_MESSAGE_COMMAND_3P_BUTTON_CLICK;
const GOOGLE_SIGN_IN_IFRAME_ID = 'swg-google-sign-in-iframe';

/** ID for the Google Sign-In button element. */
exports.GOOGLE_SIGN_IN_IFRAME_ID = GOOGLE_SIGN_IN_IFRAME_ID;
const GOOGLE_SIGN_IN_BUTTON_ID = 'swg-google-sign-in-button';

/** ID for the third party Google Sign-In button element.  */
exports.GOOGLE_SIGN_IN_BUTTON_ID = GOOGLE_SIGN_IN_BUTTON_ID;
const GOOGLE_3P_SIGN_IN_BUTTON_ID = 'swg-google-3p-sign-in-button';

/** ID for the Google Sign-In button element. */
exports.GOOGLE_3P_SIGN_IN_BUTTON_ID = GOOGLE_3P_SIGN_IN_BUTTON_ID;
const SIGN_IN_WITH_GOOGLE_BUTTON_ID = 'swg-sign-in-with-google-button';

/** ID for the Publisher sign-in button element. */
exports.SIGN_IN_WITH_GOOGLE_BUTTON_ID = SIGN_IN_WITH_GOOGLE_BUTTON_ID;
const PUBLISHER_SIGN_IN_BUTTON_ID = 'swg-publisher-sign-in-button';

/** ID for the Regwall container element. */
const REGISTRATION_BUTTON_CONTAINER_ID = 'swg-registration-button-container';

/** ID for the Regwall container element. */
exports.REGISTRATION_BUTTON_CONTAINER_ID = REGISTRATION_BUTTON_CONTAINER_ID;
const REGWALL_CONTAINER_ID = 'swg-regwall-container';

/** ID for the Regwall dialog element. */
exports.REGWALL_CONTAINER_ID = REGWALL_CONTAINER_ID;
const REGWALL_DIALOG_ID = 'swg-regwall-dialog';

/** ID for the Regwall title element. */
exports.REGWALL_DIALOG_ID = REGWALL_DIALOG_ID;
const REGWALL_TITLE_ID = 'swg-regwall-title';

/** Delay used to log 3P button click before redirect */
exports.REGWALL_TITLE_ID = REGWALL_TITLE_ID;
const REDIRECT_DELAY = 10;

/**
 * HTML for the metering regwall dialog, where users can sign in with Google.
 * The script creates a dialog based on this HTML.
 *
 * The HTML includes an iframe that loads the Google Sign-In button.
 * This iframe can live on a different origin.
 */
const REGWALL_HTML = `
<style>
  .gaa-metering-regwall--dialog-spacer,
  .gaa-metering-regwall--dialog,
  .gaa-metering-regwall--logo,
  .gaa-metering-regwall--title,
  .gaa-metering-regwall--description,
  .gaa-metering-regwall--description strong,
  .gaa-metering-regwall--iframe,
  .gaa-metering-regwall--registration-button-container,
  .gaa-metering-regwall--casl {
    all: initial !important;
    box-sizing: border-box !important;
    font-family: Roboto, arial, sans-serif !important;
  }

  .gaa-metering-regwall--dialog-spacer {
    background: linear-gradient(0, #808080, transparent) !important;
    bottom: 0 !important;
    display: block !important;
    position: fixed !important;
    width: 100% !important;
  }

  @keyframes slideUp {
    from {transform: translate(0, 200px) !important;}
    to {transform: translate(0, 0) !important;}
  }

  .gaa-metering-regwall--dialog {
    animation: slideUp 0.5s !important;
    background: white !important;
    border-radius: 12px 12px 0 0 !important;
    box-shadow: 0px -2px 6px rgba(0, 0, 0, 0.3) !important;
    display: block !important;
    margin: 0 auto !important;
    max-width: 100% !important;
    padding: 24px 20px !important;
    pointer-events: auto !important;
    width: 410px !important;
  }

  .gaa-metering-regwall--logo {
    display: block !important;
    margin: 0 auto 24px !important;
  }

  .gaa-metering-regwall--title {
    color: #000 !important;
    display: block !important;
    font-size: 16px !important;
    margin: 0 0 8px !important;
    outline: none !important !important;
  }

  .gaa-metering-regwall--description {
    color: #646464 !important;
    display: block !important;
    font-size: 14px !important;
    line-height: 19px !important;
    margin: 0 0 30px !important;
  }

  .gaa-metering-regwall--description strong {
    color: #646464 !important;
    font-size: 14px !important;
    line-height: 19px !important;
    font-weight: bold !important;
  }

  .gaa-metering-regwall--iframe {
    border: none !important;
    display: block !important;
    height: 44px !important;
    margin: 0 0 30px !important;
    width: 100% !important;
  }

  .gaa-metering-regwall--registration-button-container {
    border: none !important;
    display: block !important;
    height: 44px !important;
    margin: 0 0 30px !important;
    width: 100% !important;
  }

  .gaa-metering-regwall--casl {
    color: #646464 !important;
    display: block !important;
    font-size: 12px !important;
    text-align: center !important;
    margin: -16px auto 32px !important;
  }

  .gaa-metering-regwall--casl a {
    color: #1967d2 !important;
  }

  .gaa-metering-regwall--line {
    background-color: #ddd !important;
    display: block !important;
    height: 1px !important;
    margin: 0 0 24px !important;
  }

  .gaa-metering-regwall--publisher-sign-in-button {
    color: #1967d2 !important;
    cursor: pointer !important;
    display: block !important;
    font-size: 12px !important;
    text-decoration: underline !important;
  }

  .gaa-metering-regwall--google-sign-in-button {
    height: 36px !important;
    margin: 0 auto 30px !important;
  }

  .gaa-metering-regwall--google-sign-in-button > div {
    animation: swgGoogleSignInButtonfadeIn 0.32s !important;
  }

  @keyframes swgGoogleSignInButtonfadeIn {
    from {
      opacity: 0 !important;
    }
    to {
      opacity: 1 !important;
    }
  }
</style>

<div class="gaa-metering-regwall--dialog-spacer">
  <div role="dialog" aria-modal="true" class="gaa-metering-regwall--dialog" id="${REGWALL_DIALOG_ID}" aria-labelledby="${REGWALL_TITLE_ID}">
    <img alt="Google" class="gaa-metering-regwall--logo" src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI3NCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDc0IDI0Ij48cGF0aCBmaWxsPSIjNDI4NUY0IiBkPSJNOS4yNCA4LjE5djIuNDZoNS44OGMtLjE4IDEuMzgtLjY0IDIuMzktMS4zNCAzLjEtLjg2Ljg2LTIuMiAxLjgtNC41NCAxLjgtMy42MiAwLTYuNDUtMi45Mi02LjQ1LTYuNTRzMi44My02LjU0IDYuNDUtNi41NGMxLjk1IDAgMy4zOC43NyA0LjQzIDEuNzZMMTUuNCAyLjVDMTMuOTQgMS4wOCAxMS45OCAwIDkuMjQgMCA0LjI4IDAgLjExIDQuMDQuMTEgOXM0LjE3IDkgOS4xMyA5YzIuNjggMCA0LjctLjg4IDYuMjgtMi41MiAxLjYyLTEuNjIgMi4xMy0zLjkxIDIuMTMtNS43NSAwLS41Ny0uMDQtMS4xLS4xMy0xLjU0SDkuMjR6Ii8+PHBhdGggZmlsbD0iI0VBNDMzNSIgZD0iTTI1IDYuMTljLTMuMjEgMC01LjgzIDIuNDQtNS44MyA1LjgxIDAgMy4zNCAyLjYyIDUuODEgNS44MyA1LjgxczUuODMtMi40NiA1LjgzLTUuODFjMC0zLjM3LTIuNjItNS44MS01LjgzLTUuODF6bTAgOS4zM2MtMS43NiAwLTMuMjgtMS40NS0zLjI4LTMuNTIgMC0yLjA5IDEuNTItMy41MiAzLjI4LTMuNTJzMy4yOCAxLjQzIDMuMjggMy41MmMwIDIuMDctMS41MiAzLjUyLTMuMjggMy41MnoiLz48cGF0aCBmaWxsPSIjNDI4NUY0IiBkPSJNNTMuNTggNy40OWgtLjA5Yy0uNTctLjY4LTEuNjctMS4zLTMuMDYtMS4zQzQ3LjUzIDYuMTkgNDUgOC43MiA0NSAxMmMwIDMuMjYgMi41MyA1LjgxIDUuNDMgNS44MSAxLjM5IDAgMi40OS0uNjIgMy4wNi0xLjMyaC4wOXYuODFjMCAyLjIyLTEuMTkgMy40MS0zLjEgMy40MS0xLjU2IDAtMi41My0xLjEyLTIuOTMtMi4wN2wtMi4yMi45MmMuNjQgMS41NCAyLjMzIDMuNDMgNS4xNSAzLjQzIDIuOTkgMCA1LjUyLTEuNzYgNS41Mi02LjA1VjYuNDloLTIuNDJ2MXptLTIuOTMgOC4wM2MtMS43NiAwLTMuMS0xLjUtMy4xLTMuNTIgMC0yLjA1IDEuMzQtMy41MiAzLjEtMy41MiAxLjc0IDAgMy4xIDEuNSAzLjEgMy41NC4wMSAyLjAzLTEuMzYgMy41LTMuMSAzLjV6Ii8+PHBhdGggZmlsbD0iI0ZCQkMwNSIgZD0iTTM4IDYuMTljLTMuMjEgMC01LjgzIDIuNDQtNS44MyA1LjgxIDAgMy4zNCAyLjYyIDUuODEgNS44MyA1LjgxczUuODMtMi40NiA1LjgzLTUuODFjMC0zLjM3LTIuNjItNS44MS01LjgzLTUuODF6bTAgOS4zM2MtMS43NiAwLTMuMjgtMS40NS0zLjI4LTMuNTIgMC0yLjA5IDEuNTItMy41MiAzLjI4LTMuNTJzMy4yOCAxLjQzIDMuMjggMy41MmMwIDIuMDctMS41MiAzLjUyLTMuMjggMy41MnoiLz48cGF0aCBmaWxsPSIjMzRBODUzIiBkPSJNNTggLjI0aDIuNTF2MTcuNTdINTh6Ii8+PHBhdGggZmlsbD0iI0VBNDMzNSIgZD0iTTY4LjI2IDE1LjUyYy0xLjMgMC0yLjIyLS41OS0yLjgyLTEuNzZsNy43Ny0zLjIxLS4yNi0uNjZjLS40OC0xLjMtMS45Ni0zLjctNC45Ny0zLjctMi45OSAwLTUuNDggMi4zNS01LjQ4IDUuODEgMCAzLjI2IDIuNDYgNS44MSA1Ljc2IDUuODEgMi42NiAwIDQuMi0xLjYzIDQuODQtMi41N2wtMS45OC0xLjMyYy0uNjYuOTYtMS41NiAxLjYtMi44NiAxLjZ6bS0uMTgtNy4xNWMxLjAzIDAgMS45MS41MyAyLjIgMS4yOGwtNS4yNSAyLjE3YzAtMi40NCAxLjczLTMuNDUgMy4wNS0zLjQ1eiIvPjwvc3ZnPg==" />

    <div class="gaa-metering-regwall--title" id="${REGWALL_TITLE_ID}" tabindex="0">$SHOWCASE_REGWALL_TITLE$</div>

    <div class="gaa-metering-regwall--description">
      $SHOWCASE_REGWALL_DESCRIPTION$
    </div>

    $SHOWCASE_REGISTRATION_BUTTON$

    $SHOWCASE_REGWALL_CASL$

    <div class="gaa-metering-regwall--line"></div>

    <a
        id="${PUBLISHER_SIGN_IN_BUTTON_ID}"
        class="gaa-metering-regwall--publisher-sign-in-button"
        tabindex="0"
        href="#">
      $SHOWCASE_REGWALL_PUBLISHER_SIGN_IN_BUTTON$
    </a>
  </div>
</div>
`;

/**
 * HTML for iFrame to render registration widget.
 */
const REGISTRATION_WIDGET_IFRAME_HTML = `
  <iframe
      id="${GOOGLE_SIGN_IN_IFRAME_ID}"
      class="gaa-metering-regwall--iframe"
      src="$iframeUrl$">
  </iframe>
`;

/**
 * HTML for container of the registration button.
 */
const REGISTRATION_BUTTON_HTML = `
  <div
      id="${REGISTRATION_BUTTON_CONTAINER_ID}"
      class="gaa-metering-regwall--registration-button-container">
  </div>
`;

/**
 * HTML for the CASL blurb.
 * CASL stands for Canadian Anti-Spam Law.
 */
const CASL_HTML = `
<div class="gaa-metering-regwall--casl">
  $SHOWCASE_REGWALL_CASL$
</div>
`;

/** Base styles for both the Google and Google 3p Sign-In button iframes. */
const GOOGLE_SIGN_IN_BUTTON_STYLES = `
  #${GOOGLE_3P_SIGN_IN_BUTTON_ID},
  #${SIGN_IN_WITH_GOOGLE_BUTTON_ID},
  #${GOOGLE_SIGN_IN_BUTTON_ID} {
    margin: 0 auto;
  }

  #${SIGN_IN_WITH_GOOGLE_BUTTON_ID}{
    width: 220px;
  }

  #${GOOGLE_3P_SIGN_IN_BUTTON_ID} > div,
  #${SIGN_IN_WITH_GOOGLE_BUTTON_ID} > div,
  #${GOOGLE_SIGN_IN_BUTTON_ID} > div {
    animation: fadeIn 0.32s;
  }
  @keyframes fadeIn {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
  #${GOOGLE_3P_SIGN_IN_BUTTON_ID} .abcRioButton.abcRioButtonBlue,
  #${SIGN_IN_WITH_GOOGLE_BUTTON_ID} .abcRioButton.abcRioButtonBlue,
  #${GOOGLE_SIGN_IN_BUTTON_ID} .abcRioButton.abcRioButtonBlue {
    background-color: #1A73E8;
    box-shadow: none;
    -webkit-box-shadow: none;
    border-radius: 4px;
    width: 100% !important;
  }
  #${GOOGLE_3P_SIGN_IN_BUTTON_ID} .abcRioButton.abcRioButtonBlue .abcRioButtonIcon,
  #${SIGN_IN_WITH_GOOGLE_BUTTON_ID} .abcRioButton.abcRioButtonBlue .abcRioButtonIcon,
  #${GOOGLE_SIGN_IN_BUTTON_ID} .abcRioButton.abcRioButtonBlue .abcRioButtonIcon {
    display: none;
  }
  /** Hides default "Sign in with Google" text. */
  #${GOOGLE_3P_SIGN_IN_BUTTON_ID}  .abcRioButton.abcRioButtonBlue .abcRioButtonContents span[id^=not_signed_],
  #${SIGN_IN_WITH_GOOGLE_BUTTON_ID}  .abcRioButton.abcRioButtonBlue .abcRioButtonContents span[id^=not_signed_],
  #${GOOGLE_SIGN_IN_BUTTON_ID} .abcRioButton.abcRioButtonBlue .abcRioButtonContents span[id^=not_signed_] {
    font-size: 0 !important;
  }
  /** Renders localized "Sign in with Google" text instead. */
  #${GOOGLE_3P_SIGN_IN_BUTTON_ID} .abcRioButton.abcRioButtonBlue .abcRioButtonContents span[id^=not_signed_]::before,
  #${SIGN_IN_WITH_GOOGLE_BUTTON_ID} .abcRioButton.abcRioButtonBlue .abcRioButtonContents span[id^=not_signed_]::before,
  #${GOOGLE_SIGN_IN_BUTTON_ID} .abcRioButton.abcRioButtonBlue .abcRioButtonContents span[id^=not_signed_]::before {
    content: '$SHOWCASE_REGWALL_GOOGLE_SIGN_IN_BUTTON$';
    font-size: 15px;
  }`;
const GOOGLE_SIGN_IN_IFRAME_STYLES = `
  body {
    margin: 0;
    overflow: hidden;
  }${GOOGLE_SIGN_IN_BUTTON_STYLES}
`;

/**
 * User object that Publisher JS receives after users sign in.
 * @typedef {{
 *   idToken: string,
 *   name: string,
 *   givenName: string,
 *   familyName: string,
 *   imageUrl: string,
 *   email: string,
 *   authorizationData: {
 *     access_token: string,
 *     id_token: string,
 *     scope: string,
 *     expires_in: number,
 *     first_issued_at: number,
 *     expires_at: number,
 *   },
 * }} GaaUserDef
 */
let GaaUserDef;

/**
 * Google Identity (V1) that Google Identity Services returns after someone signs in.
 * https://developers.google.com/identity/gsi/web/reference/js-reference#CredentialResponse
 * @typedef {{
 *   iss: string,
 *   nbf: number,
 *   aud: string,
 *   sub: string,
 *   hd: string,
 *   email: string,
 *   email_verified: boolean,
 *   azp: string,
 *   name: string,
 *   picture: string,
 *   given_name: string,
 *   family_name: string,
 *   iat: number,
 *   exp: number,
 *   jti: string,
 * }} GoogleIdentityV1
 */
exports.GaaUserDef = GaaUserDef;
let GoogleIdentityV1;

/**
 * GoogleUser object that Google Sign-In returns after users sign in.
 * https://developers.google.com/identity/sign-in/web/reference#googleusergetbasicprofile
 * @typedef {{
 *  getAuthResponse: function(boolean): {
 *     access_token: string,
 *     id_token: string,
 *     scope: string,
 *     expires_in: number,
 *     first_issued_at: number,
 *     expires_at: number,
 *   },
 *   getBasicProfile: function(): {
 *     getName: function(): string,
 *     getGivenName: function(): string,
 *     getFamilyName: function(): string,
 *     getImageUrl: function(): string,
 *     getEmail: function(): string,
 *   },
 * }} GoogleUserDef
 */
exports.GoogleIdentityV1 = GoogleIdentityV1;
let GoogleUserDef;

/**
 * InitParams object that GaaMetering.init accepts
 * https://developers.google.com/news/subscribe/extended-access/overview
 * @typedef {{
 * allowedReferrers: (Array<string>|null),
 * googleApiClientId: string,
 * authorizationUrl: string,
 * handleLoginPromise: (Promise|null),
 * caslUrl: string,
 * handleSwGEntitlement: function(): ?,
 * publisherEntitlementPromise: (Promise|null),
 * registerUserPromise: (Promise|null),
 * showPaywall: function(): ?,
 * showcaseEntitlement: string,
 * unlockArticle: function(): ?,
 * rawJwt: (boolean|null),
 * userState: {
 *   paywallReason: string,
 *   grantReason: string,
 *   granted: boolean,
 *   id: string,
 *   registrationTimestamp: number,
 *   subscriptionTimestamp: number
 * }
 * }} InitParams
 */
exports.GoogleUserDef = GoogleUserDef;
let InitParams;

/**
 * Returns true if the query string contains fresh Google Article Access (GAA) params.
 * @param {string} queryString
 * @param {boolean} allowAllAccessTypes
 * @return {boolean}
 */
exports.InitParams = InitParams;
function queryStringHasFreshGaaParams(queryString) {
  let allowAllAccessTypes = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
  const params = (0, _url.parseQueryString)(queryString);

  // Verify GAA params exist.
  if (!params['gaa_at'] || !params['gaa_n'] || !params['gaa_sig'] || !params['gaa_ts']) {
    return false;
  }
  if (!allowAllAccessTypes) {
    // Verify access type.
    const noAccess = params['gaa_at'] === 'na';
    if (noAccess) {
      return false;
    }
  }

  // Verify timestamp isn't stale.
  const expirationTimestamp = parseInt(params['gaa_ts'], 16);
  const currentTimestamp = Date.now() / 1000;
  if (expirationTimestamp < currentTimestamp) {
    return false;
  }
  return true;
}

/** Renders Google Article Access (GAA) Metering Regwall. */
class GaaMeteringRegwall {
  /**
   * Returns a promise for a Google user object.
   * The user object will be a:
   * - GaaUserDef, if you use the GaaGoogleSignInButton
   * - GoogleIdentityV1, if you use the GaaSignInWithGoogleButton
   * - Custom object, if you use the GaaGoogle3pSignInButton
   *
   * This method opens a metering regwall dialog,
   * where users can sign in with Google.
   * @nocollapse
   * @param {{ iframeUrl: string, caslUrl: string }} params
   * @return {!Promise<!GaaUserDef|!GoogleIdentityV1|!Object>}
   */
  static show(_ref) {
    let {
      iframeUrl,
      caslUrl
    } = _ref;
    const queryString = GaaUtils.getQueryString();
    if (!queryStringHasFreshGaaParams(queryString)) {
      const errorMessage = '[swg-gaa.js:GaaMeteringRegwall.show]: URL needs fresh GAA params.';
      (0, _log.warn)(errorMessage);
      return Promise.reject(errorMessage);
    }
    logEvent({
      showcaseEvent: _subscriptions.ShowcaseEvent.EVENT_SHOWCASE_NO_ENTITLEMENTS_REGWALL,
      isFromUserAction: false
    });
    GaaMeteringRegwall.render_({
      iframeUrl,
      caslUrl
    });
    GaaMeteringRegwall.sendIntroMessageToGsiIframe_({
      iframeUrl
    });
    GaaMeteringRegwall.logButtonClickEvents_();
    return GaaMeteringRegwall.getGaaUser_().then(gaaUser => {
      GaaMeteringRegwall.remove();
      return gaaUser;
    }).catch(err => {
      // Close the Regwall, since the flow failed.
      GaaMeteringRegwall.remove();

      // Rethrow error.
      throw err;
    });
  }

  /**
   * Returns a promise for a Google user object.
   * The user object will be a GoogleIdentityV1
   *
   * This method opens a metering regwall dialog,
   * where users can sign in with Google.
   * @nocollapse
   * @param {{ caslUrl: string, googleApiClientId: string, rawJwt: (boolean|null) }} params
   * @return {!Promise<!GoogleIdentityV1>}
   */
  static showWithNativeRegistrationButton(_ref2) {
    let {
      caslUrl,
      googleApiClientId,
      rawJwt = true
    } = _ref2;
    logEvent({
      showcaseEvent: _subscriptions.ShowcaseEvent.EVENT_SHOWCASE_NO_ENTITLEMENTS_REGWALL,
      isFromUserAction: false
    });
    GaaMeteringRegwall.render_({
      iframeUrl: '',
      caslUrl,
      useNativeMode: true
    });
    return GaaMeteringRegwall.createNativeRegistrationButton({
      googleApiClientId
    }).then(jwt => {
      GaaMeteringRegwall.remove();
      if (rawJwt) {
        return jwt;
      } else {
        return new _jwt.JwtHelper().decode(jwt.credential);
      }
    }).catch(err => {
      // Close the Regwall, since the flow failed.
      GaaMeteringRegwall.remove();

      // Rethrow error.
      (0, _log.debugLog)(`Regwall failed: ${err}`);
    });
  }

  /**
   * This method opens a metering regwall dialog,
   * where users can sign in with Google.
   *
   * @nocollapse
   * @param {{ caslUrl: string, authorizationUrl: string }} params
   * @return {boolean}
   */
  static showWithNative3PRegistrationButton(_ref3) {
    let {
      caslUrl,
      authorizationUrl
    } = _ref3;
    logEvent({
      showcaseEvent: _subscriptions.ShowcaseEvent.EVENT_SHOWCASE_NO_ENTITLEMENTS_REGWALL,
      isFromUserAction: false
    });
    GaaMeteringRegwall.render_({
      iframeUrl: '',
      caslUrl,
      useNativeMode: true
    });
    return GaaMeteringRegwall.createNative3PRegistrationButton({
      authorizationUrl
    });
  }

  /**
   * Removes the Regwall.
   * @nocollapse
   */
  static remove() {
    const regwallContainer = self.document.getElementById(REGWALL_CONTAINER_ID);
    if (regwallContainer) {
      regwallContainer.remove();
    }
  }

  /**
   * Signs out of Google Sign-In.
   * This is useful for developers who are testing their
   * SwG integrations.
   * @nocollapse
   * @return {!Promise}
   */
  static signOut() {
    return configureGoogleSignIn().then(() => self.gapi.auth2.getAuthInstance().signOut());
  }

  /**
   * Renders the Regwall.
   * @private
   * @nocollapse
   * @param {{ iframeUrl: string, caslUrl: string, useNativeMode: (boolean|undefined)}} params
   */
  static render_(_ref4) {
    let {
      iframeUrl,
      caslUrl,
      useNativeMode = false
    } = _ref4;
    const languageCode = (0, _i18n.getLanguageCodeFromElement)(self.document.body);
    const publisherName = GaaMeteringRegwall.getPublisherNameFromPageConfig_();
    const placeholderPatternForPublication = /<ph name="PUBLICATION".+?\/ph>/g;
    const placeholderPatternForLinkStart = /<ph name="LINK_START".+?\/ph>/g;
    const placeholderPatternForLinkEnd = /<ph name="LINK_END".+?\/ph>/g;

    // Create and style container element.
    // TODO: Consider using a FriendlyIframe here, to avoid CSS conflicts.
    const containerEl = (0, _dom.createElement)(self.document, 'div', {
      id: REGWALL_CONTAINER_ID
    });
    (0, _style.setImportantStyles)(containerEl, {
      'all': 'unset',
      'background-color': 'rgba(32, 33, 36, 0.6)',
      'border': 'none',
      'bottom': '0',
      'height': '100%',
      'left': '0',
      'opacity': '0',
      'pointer-events': 'none',
      'position': 'fixed',
      'right': '0',
      'transition': 'opacity 0.5s',
      'top': '0',
      'width': '100%',
      'z-index': 2147483646
    });

    // Optionally include CASL HTML.
    let caslHtml = '';
    if (caslUrl) {
      caslHtml = CASL_HTML.replace('$SHOWCASE_REGWALL_CASL$', (0, _i18n.msg)(_strings.I18N_STRINGS['SHOWCASE_REGWALL_CASL'], languageCode))
      // Update link.
      .replace(placeholderPatternForLinkStart, `<a href="${encodeURI(caslUrl)}" target="_blank">`).replace(placeholderPatternForLinkEnd, '</a>')
      // Update publisher name.
      .replace(placeholderPatternForPublication, `<strong>${publisherName}</strong>`);
    }
    let registrationButtonHtml = '';
    if (useNativeMode) {
      registrationButtonHtml = REGISTRATION_BUTTON_HTML;
    } else {
      // Tell the iframe which language to render.
      iframeUrl = (0, _url.addQueryParam)(iframeUrl, 'lang', languageCode);
      registrationButtonHtml = REGISTRATION_WIDGET_IFRAME_HTML.replace('$iframeUrl$', iframeUrl);
    }

    // Prepare HTML.
    containerEl. /*OK*/innerHTML = REGWALL_HTML.replace('$SHOWCASE_REGISTRATION_BUTTON$', registrationButtonHtml).replace('$SHOWCASE_REGWALL_TITLE$', (0, _i18n.msg)(_strings.I18N_STRINGS['SHOWCASE_REGWALL_TITLE'], languageCode)).replace('$SHOWCASE_REGWALL_DESCRIPTION$', (0, _i18n.msg)(_strings.I18N_STRINGS['SHOWCASE_REGWALL_DESCRIPTION'], languageCode)
    // Update publisher name.
    .replace(placeholderPatternForPublication, publisherName)).replace('$SHOWCASE_REGWALL_PUBLISHER_SIGN_IN_BUTTON$', (0, _i18n.msg)(_strings.I18N_STRINGS['SHOWCASE_REGWALL_PUBLISHER_SIGN_IN_BUTTON'], languageCode)).replace('$SHOWCASE_REGWALL_CASL$', caslHtml);

    // Add container to DOM.
    self.document.body.appendChild(containerEl);

    // Trigger a fade-in transition.
    /** @suppress {suspiciousCode} */
    containerEl.offsetHeight; // Trigger a repaint (to prepare the CSS transition).
    (0, _style.setImportantStyles)(containerEl, {
      'opacity': 1
    });

    // Listen for clicks.
    GaaMeteringRegwall.addClickListenerOnPublisherSignInButton_();

    // Focus on the title after the dialog animates in.
    // This helps people using screenreaders.
    const dialogEl = self.document.getElementById(REGWALL_DIALOG_ID);
    dialogEl.addEventListener('animationend', () => {
      const titleEl = self.document.getElementById(REGWALL_TITLE_ID);
      titleEl.focus();
    });
    return containerEl;
  }

  /**
   * Gets publisher name from page config.
   * @private
   * @nocollapse
   * @return {string}
   */
  static getPublisherNameFromPageConfig_() {
    const jsonLdPageConfig = GaaMeteringRegwall.getPublisherNameFromJsonLdPageConfig_();
    if (jsonLdPageConfig) {
      return jsonLdPageConfig;
    }
    const microdataPageConfig = GaaMeteringRegwall.getPublisherNameFromMicrodataPageConfig_();
    if (microdataPageConfig) {
      return microdataPageConfig;
    }
    throw new Error('Showcase articles must define a publisher name with either JSON-LD or Microdata.');
  }

  /**
   * Gets publisher name from JSON-LD page config.
   * @private
   * @nocollapse
   * @return {string|undefined}
   */
  static getPublisherNameFromJsonLdPageConfig_() {
    // Get JSON from ld+json scripts.
    const ldJsonScripts = Array.prototype.slice.call(self.document.querySelectorAll('script[type="application/ld+json"]'));
    const jsonQueue = /** @type {!Array<*>} */
    ldJsonScripts.map(script => (0, _json.parseJson)(script.textContent));

    // Search for publisher name, breadth-first.
    for (let i = 0; i < jsonQueue.length; i++) {
      var _json$publisher;
      const json = /** @type {!Object<?,?>} */jsonQueue[i];

      // Return publisher name, if possible.
      const publisherName = json === null || json === void 0 ? void 0 : (_json$publisher = json.publisher) === null || _json$publisher === void 0 ? void 0 : _json$publisher.name;
      if (publisherName) {
        return publisherName;
      }

      // Explore JSON.
      if (json && typeof json === 'object') {
        jsonQueue.push(...Object.values(json));
      }
    }
  }

  /**
   * Gets publisher name from Microdata page config.
   * @private
   * @nocollapse
   * @return {string|undefined}
   */
  static getPublisherNameFromMicrodataPageConfig_() {
    const publisherNameElements = self.document.querySelectorAll('[itemscope][itemtype][itemprop="publisher"] [itemprop="name"]');
    for (const publisherNameElement of publisherNameElements) {
      const publisherName = publisherNameElement.content;
      if (publisherName) {
        return publisherName;
      }
    }
  }

  /**
   * Adds a click listener on the publisher sign-in button.
   * @private
   * @nocollapse
   */
  static addClickListenerOnPublisherSignInButton_() {
    self.document.getElementById(PUBLISHER_SIGN_IN_BUTTON_ID).addEventListener('click', e => {
      e.preventDefault();
      logEvent({
        analyticsEvent: _api_messages.AnalyticsEvent.ACTION_SHOWCASE_REGWALL_EXISTING_ACCOUNT_CLICK,
        isFromUserAction: true
      });
      callSwg(swg => swg.triggerLoginRequest({
        linkRequested: false
      }));
    });
  }

  /**
   * Returns the GAA user, after the user signs in.
   * @private
   * @nocollapse
   * @return {!Promise<!GoogleUserDef>}
   */
  static getGaaUser_() {
    // Listen for GAA user.
    return new Promise((resolve, reject) => {
      self.addEventListener('message', e => {
        if (e.data.stamp === POST_MESSAGE_STAMP) {
          if (e.data.command === POST_MESSAGE_COMMAND_USER) {
            // Pass along user details.
            resolve(e.data.gaaUser || e.data.returnedJwt);
          }
          if (e.data.command === POST_MESSAGE_COMMAND_ERROR) {
            // Reject promise due to Google Sign-In error.
            reject('Google Sign-In could not render');
          }
        }
      });
    });
  }

  /**
   * Logs button click events.
   * @private
   * @nocollapse
   */
  static logButtonClickEvents_() {
    // Listen for button event messages.
    self.addEventListener('message', e => {
      if (e.data.stamp === POST_MESSAGE_STAMP && e.data.command === POST_MESSAGE_COMMAND_BUTTON_CLICK) {
        // Log button click event.
        logEvent({
          analyticsEvent: _api_messages.AnalyticsEvent.ACTION_SHOWCASE_REGWALL_GSI_CLICK,
          isFromUserAction: true
        });
      }
      if (e.data.stamp === POST_MESSAGE_STAMP && e.data.command === POST_MESSAGE_COMMAND_3P_BUTTON_CLICK) {
        // Log button click event.
        logEvent({
          analyticsEvent: _api_messages.AnalyticsEvent.ACTION_SHOWCASE_REGWALL_3P_BUTTON_CLICK,
          isFromUserAction: true
        });
      }
    });
  }

  /**
   * Sends intro post message to Google Sign-In iframe.
   * @private
   * @nocollapse
   * @param {{ iframeUrl: string }} params
   */
  static sendIntroMessageToGsiIframe_(_ref5) {
    let {
      iframeUrl
    } = _ref5;
    // Introduce this window to the publisher's Google Sign-In iframe.
    // This lets the iframe send post messages back to this window.
    // Without the introduction, the iframe wouldn't have a reference to this window.
    const googleSignInIframe = /** @type {!HTMLIFrameElement} */
    self.document.getElementById(GOOGLE_SIGN_IN_IFRAME_ID);
    googleSignInIframe.onload = () => {
      googleSignInIframe.contentWindow.postMessage({
        stamp: POST_MESSAGE_STAMP,
        command: POST_MESSAGE_COMMAND_INTRODUCTION
      }, new URL(iframeUrl).origin);
    };
  }
  static createNativeRegistrationButton(_ref6) {
    let {
      googleApiClientId
    } = _ref6;
    const languageCode = (0, _i18n.getLanguageCodeFromElement)(self.document.body);
    const parentElement = self.document.getElementById(REGISTRATION_BUTTON_CONTAINER_ID);
    if (!parentElement) {
      return false;
    }
    // Apply iframe styles.
    const styleText = GOOGLE_SIGN_IN_BUTTON_STYLES.replace('$SHOWCASE_REGWALL_GOOGLE_SIGN_IN_BUTTON$', (0, _i18n.msg)(_strings.I18N_STRINGS['SHOWCASE_REGWALL_GOOGLE_SIGN_IN_BUTTON'], languageCode));
    (0, _dom.injectStyleSheet)((0, _doc.resolveDoc)(self.document), styleText);

    // Create and append button to regwall
    const buttonEl = (0, _dom.createElement)(self.document, 'div', {
      id: SIGN_IN_WITH_GOOGLE_BUTTON_ID,
      tabIndex: 0
    });
    parentElement.appendChild(buttonEl);

    // Track button clicks.
    buttonEl.addEventListener('click', () => {
      logEvent({
        analyticsEvent: _api_messages.AnalyticsEvent.ACTION_SHOWCASE_REGWALL_SWIG_CLICK,
        isFromUserAction: true
      });
    });
    return new Promise(resolve => {
      self.google.accounts.id.initialize({
        /* eslint-disable google-camelcase/google-camelcase */
        client_id: googleApiClientId,
        callback: resolve
        /* eslint-enable google-camelcase/google-camelcase */
      });

      self.google.accounts.id.renderButton(buttonEl, {
        'type': 'standard',
        'theme': 'outline',
        'text': 'continue_with',
        'logo_alignment': 'center'
      });
    });
  }
  static createNative3PRegistrationButton(_ref7) {
    let {
      authorizationUrl
    } = _ref7;
    const languageCode = (0, _i18n.getLanguageCodeFromElement)(self.document.body);
    const parentElement = self.document.getElementById(REGISTRATION_BUTTON_CONTAINER_ID);
    if (!parentElement) {
      return false;
    }
    // Apply iframe styles.
    const styleText = GOOGLE_3P_SIGN_IN_IFRAME_STYLES.replace('$SHOWCASE_REGWALL_GOOGLE_SIGN_IN_BUTTON$', (0, _i18n.msg)(_strings.I18N_STRINGS['SHOWCASE_REGWALL_GOOGLE_SIGN_IN_BUTTON'], languageCode));
    (0, _dom.injectStyleSheet)((0, _doc.resolveDoc)(self.document), styleText);

    // Render the third party Google Sign-In button.
    const buttonEl = (0, _dom.createElement)(self.document, 'div', {
      id: GOOGLE_3P_SIGN_IN_BUTTON_ID,
      tabIndex: 0
    });
    buttonEl. /*OK*/innerHTML = GOOGLE_3P_SIGN_IN_BUTTON_HTML;
    parentElement.appendChild(buttonEl);
    buttonEl.addEventListener('click', () => {
      // Track button clicks.
      logEvent({
        analyticsEvent: _api_messages.AnalyticsEvent.ACTION_SHOWCASE_REGWALL_3P_BUTTON_CLICK,
        isFromUserAction: true
      });
      // Redirect user using the parent window.
      // TODO(b/242998655): Fix the downstream calls for logEvent to be chained to remove the need of delaying redirect.
      self.setTimeout(() => {
        self.open(authorizationUrl, '_parent');
      }, REDIRECT_DELAY);
    });
    return buttonEl;
  }
}
exports.GaaMeteringRegwall = GaaMeteringRegwall;
class GaaGoogleSignInButton {
  /**
   * Renders the Google Sign-In button.
   * @nocollapse
   * @param {{ allowedOrigins: !Array<string> }} params
   */
  static show(_ref8) {
    let {
      allowedOrigins
    } = _ref8;
    // Optionally grab language code from URL.
    const queryString = GaaUtils.getQueryString();
    const queryParams = (0, _url.parseQueryString)(queryString);
    const languageCode = queryParams['lang'] || 'en';

    // Apply iframe styles.
    const styleText = GOOGLE_SIGN_IN_IFRAME_STYLES.replace('$SHOWCASE_REGWALL_GOOGLE_SIGN_IN_BUTTON$', (0, _i18n.msg)(_strings.I18N_STRINGS['SHOWCASE_REGWALL_GOOGLE_SIGN_IN_BUTTON'], languageCode));
    (0, _dom.injectStyleSheet)((0, _doc.resolveDoc)(self.document), styleText);

    // Promise a function that sends messages to the parent frame.
    // Note: A function is preferable to a reference to the parent frame
    // because referencing the parent frame outside of the 'message' event
    // handler throws an Error. A function defined within the handler can
    // effectively save a reference to the parent frame though.
    const sendMessageToParentFnPromise = new Promise(resolve => {
      self.addEventListener('message', e => {
        if (allowedOrigins.indexOf(e.origin) !== -1 && e.data.stamp === POST_MESSAGE_STAMP && e.data.command === POST_MESSAGE_COMMAND_INTRODUCTION) {
          resolve(message => {
            e.source.postMessage(message, e.origin);
          });
        }
      });
    });
    function sendErrorMessageToParent() {
      sendMessageToParentFnPromise.then(sendMessageToParent => {
        sendMessageToParent({
          stamp: POST_MESSAGE_STAMP,
          command: POST_MESSAGE_COMMAND_ERROR
        });
      });
    }

    // Validate origins.
    for (const allowedOrigin of allowedOrigins) {
      const url = new URL(allowedOrigin);
      const isOrigin = url.origin === allowedOrigin;
      const protocolIsValid = url.protocol === 'http:' || url.protocol === 'https:';
      const isValidOrigin = isOrigin && protocolIsValid;
      if (!isValidOrigin) {
        (0, _log.warn)(`[swg-gaa.js:GaaGoogleSignInButton.show]: You specified an invalid origin: ${allowedOrigin}`);
        sendErrorMessageToParent();
        return;
      }
    }

    // Render the Google Sign-In button.
    configureGoogleSignIn().then(
    // Promise credentials.
    () => new Promise(resolve => {
      // Render the Google Sign-In button.
      const buttonEl = (0, _dom.createElement)(self.document, 'div', {
        id: GOOGLE_SIGN_IN_BUTTON_ID,
        tabIndex: 0
      });
      self.document.body.appendChild(buttonEl);
      self.gapi.signin2.render(GOOGLE_SIGN_IN_BUTTON_ID, {
        'longtitle': true,
        'onsuccess': resolve,
        'prompt': 'select_account',
        'scope': 'profile email',
        'theme': 'dark'
      });

      // Track button clicks.
      buttonEl.addEventListener('click', () => {
        // Tell parent frame about button click.
        sendMessageToParentFnPromise.then(sendMessageToParent => {
          sendMessageToParent({
            stamp: POST_MESSAGE_STAMP,
            command: POST_MESSAGE_COMMAND_BUTTON_CLICK
          });
        });
      });
    })).then(googleUser => {
      // Gather GAA user details.
      const basicProfile = /** @type {!GoogleUserDef} */googleUser.getBasicProfile();
      // Gather authorization response.
      const authorizationData = /** @type {!GoogleUserDef} */googleUser.getAuthResponse(true);
      /** @type {!GaaUserDef} */
      const gaaUser = {
        idToken: authorizationData.id_token,
        name: basicProfile.getName(),
        givenName: basicProfile.getGivenName(),
        familyName: basicProfile.getFamilyName(),
        imageUrl: basicProfile.getImageUrl(),
        email: basicProfile.getEmail(),
        authorizationData
      };

      // Send GAA user to parent frame.
      sendMessageToParentFnPromise.then(sendMessageToParent => {
        sendMessageToParent({
          stamp: POST_MESSAGE_STAMP,
          command: POST_MESSAGE_COMMAND_USER,
          gaaUser
        });
      });
    }).catch(sendErrorMessageToParent);
  }
}
exports.GaaGoogleSignInButton = GaaGoogleSignInButton;
class GaaSignInWithGoogleButton {
  /**
   * Renders the Google Sign-In button.
   * @nocollapse
   * @param {{ clientId: string, allowedOrigins: !Array<string>, rawJwt: boolean }} params
   */
  static show(_ref9) {
    let {
      clientId,
      allowedOrigins,
      rawJwt = false
    } = _ref9;
    // Optionally grab language code from URL.
    const queryString = GaaUtils.getQueryString();
    const queryParams = (0, _url.parseQueryString)(queryString);
    const languageCode = queryParams['lang'] || 'en';

    // Apply iframe styles.
    const styleText = GOOGLE_SIGN_IN_IFRAME_STYLES.replace('$SHOWCASE_REGWALL_GOOGLE_SIGN_IN_BUTTON$', (0, _i18n.msg)(_strings.I18N_STRINGS['SHOWCASE_REGWALL_GOOGLE_SIGN_IN_BUTTON'], languageCode));
    (0, _dom.injectStyleSheet)((0, _doc.resolveDoc)(self.document), styleText);

    // Promise a function that sends messages to the parent frame.
    // Note: A function is preferable to a reference to the parent frame
    // because referencing the parent frame outside of the 'message' event
    // handler throws an Error. A function defined within the handler can
    // effectively save a reference to the parent frame though.
    const sendMessageToParentFnPromise = new Promise(resolve => {
      self.addEventListener('message', e => {
        if (allowedOrigins.indexOf(e.origin) !== -1 && e.data.stamp === POST_MESSAGE_STAMP && e.data.command === POST_MESSAGE_COMMAND_INTRODUCTION) {
          resolve(message => {
            e.source.postMessage(message, e.origin);
          });
        }
      });
    });
    function sendErrorMessageToParent() {
      sendMessageToParentFnPromise.then(sendMessageToParent => {
        sendMessageToParent({
          stamp: POST_MESSAGE_STAMP,
          command: POST_MESSAGE_COMMAND_ERROR
        });
      });
    }

    // Validate origins.
    for (let i = 0; i < allowedOrigins.length; i++) {
      const allowedOrigin = allowedOrigins[i];
      const url = new URL(allowedOrigin);
      const isOrigin = url.origin === allowedOrigin;
      const protocolIsValid = url.protocol === 'http:' || url.protocol === 'https:';
      const isValidOrigin = isOrigin && protocolIsValid;
      if (!isValidOrigin) {
        (0, _log.warn)(`[swg-gaa.js:GaaSignInWithGoogleButton.show]: You specified an invalid origin: ${allowedOrigin}`);
        sendErrorMessageToParent();
        return;
      }
    }
    new Promise(resolve => {
      const buttonEl = (0, _dom.createElement)(self.document, 'div', {
        id: SIGN_IN_WITH_GOOGLE_BUTTON_ID,
        tabIndex: 0
      });
      self.document.body.appendChild(buttonEl);
      self.google.accounts.id.initialize({
        /* eslint-disable google-camelcase/google-camelcase */
        client_id: clientId,
        callback: resolve,
        allowed_parent_origin: allowedOrigins
        /* eslint-enable google-camelcase/google-camelcase */
      });

      self.google.accounts.id.renderButton(self.document.getElementById(SIGN_IN_WITH_GOOGLE_BUTTON_ID), {
        'type': 'standard',
        'theme': 'outline',
        'text': 'continue_with',
        'logo_alignment': 'center',
        'width': buttonEl.offsetWidth,
        'height': buttonEl.offsetHeight
      });

      // Track button clicks.
      buttonEl.addEventListener('click', () => {
        // Tell parent frame about button click.
        sendMessageToParentFnPromise.then(sendMessageToParent => {
          sendMessageToParent({
            stamp: POST_MESSAGE_STAMP,
            command: POST_MESSAGE_COMMAND_BUTTON_CLICK
          });
        });
      });
    }).then(jwt => {
      const jwtPayload = /** @type {!GoogleIdentityV1} */
      new _jwt.JwtHelper().decode(jwt.credential);
      const returnedJwt = rawJwt ? jwt : jwtPayload;

      // Send GAA user to parent frame.
      sendMessageToParentFnPromise.then(sendMessageToParent => {
        sendMessageToParent({
          stamp: POST_MESSAGE_STAMP,
          command: POST_MESSAGE_COMMAND_USER,
          // Note: jwtPayload is deprecated in favor of returnedJwt.
          jwtPayload,
          returnedJwt
        });
      });
    }).catch(sendErrorMessageToParent);
  }
}

/**
 * Loads the Google Sign-In API.
 *
 * This function is used in two places.
 * 1. The publisher's Google Sign-In iframe.
 * 2. (Optional) Demos that allow users to sign out.
 *
 * @return {!Promise}
 */
exports.GaaSignInWithGoogleButton = GaaSignInWithGoogleButton;
function configureGoogleSignIn() {
  // Wait for Google Sign-In API.
  return new Promise(resolve => {
    const apiCheckInterval = setInterval(() => {
      if (!!self.gapi) {
        clearInterval(apiCheckInterval);
        resolve();
      }
    }, 50);
  })
  // Load Auth2 module.
  .then(() => new Promise(resolve => self.gapi.load('auth2', resolve)))
  // Specify "redirect" mode. It plays nicer with webviews.
  .then(() =>
  // Only initialize Google Sign-In once.
  self.gapi.auth2.getAuthInstance() || self.gapi.auth2.init());
}

/**
 * Calls Swgjs.
 * @param { function(!SubscriptionsDef) } callback
 */
function callSwg(callback) {
  (self.SWG = self.SWG || []).push(callback);
}

/** Styles for the third party Google Sign-In button iframe. */
const GOOGLE_3P_SIGN_IN_IFRAME_STYLES = GOOGLE_SIGN_IN_IFRAME_STYLES + `
  #${GOOGLE_3P_SIGN_IN_BUTTON_ID} .abcRioButtonContents {
    font-family: Roboto,arial,sans-serif;
    font-size: 14px;
    font-weight: 500;
    letter-spacing: .21px;
    margin-left: 6px;
    margin-right: 6px;
    vertical-align: top;
  }
  #${GOOGLE_3P_SIGN_IN_BUTTON_ID} .abcRioButton {
    border-radius: 1px;
    box-shadow: 0 2px 4px 0 rgb(0 0 0 / 25%);
    -moz-box-sizing: border-box;
    box-sizing: border-box;
    -webkit-transition: background-color .218s,border-color .218s,box-shadow .218s;
    transition: background-color .218s,border-color .218s,box-shadow .218s;
    -webkit-user-select: none;
    -webkit-appearance: none;
    background-color: #fff;
    background-image: none;
    color: #262626;
    cursor: pointer;
    outline: none;
    overflow: hidden;
    position: relative;
    text-align: center;
    vertical-align: middle;
    white-space: nowrap;
    width: auto;
  }
  #${GOOGLE_3P_SIGN_IN_BUTTON_ID} .abcRioButtonBlue {
    border: none;
    color: #fff;
  }
  `;
const GOOGLE_3P_SIGN_IN_BUTTON_HTML = `
<div style="height:36px;width:180px;" class="abcRioButton abcRioButtonBlue">
  <span style="font-size:15px;line-height:34px;" class="abcRioButtonContents">
    <span id="not_signed_in">Sign in with Google</span>
  </span>
</div>
`;
class GaaGoogle3pSignInButton {
  /**
   * Renders the third party Google Sign-In button for external authentication.
   * @nocollapse
   * @param {{
   *    allowedOrigins: !Array<string>,
   *    authorizationUrl: string,
   *    redirectMode: boolean,
   * }} params GaaGoogle3pSignInButton operates in two modes: redirect and
   * popup. The default mode is pop-up mode which opens the authorizationUrl
   * in a new window. To use a redirect mode and open the authorizationUrl in
   * the same window, set redirectMode to true. For webview applications
   * redirectMode is recommended.
   */
  static show(_ref10) {
    let {
      allowedOrigins,
      authorizationUrl,
      redirectMode = false
    } = _ref10;
    // Optionally grab language code from URL.
    const queryString = GaaUtils.getQueryString();
    const queryParams = (0, _url.parseQueryString)(queryString);
    const languageCode = queryParams['lang'] || 'en';

    // Apply iframe styles.
    const styleText = GOOGLE_3P_SIGN_IN_IFRAME_STYLES.replace('$SHOWCASE_REGWALL_GOOGLE_SIGN_IN_BUTTON$', (0, _i18n.msg)(_strings.I18N_STRINGS['SHOWCASE_REGWALL_GOOGLE_SIGN_IN_BUTTON'], languageCode));
    (0, _dom.injectStyleSheet)((0, _doc.resolveDoc)(self.document), styleText);

    // Render the third party Google Sign-In button.
    const buttonEl = (0, _dom.createElement)(self.document, 'div', {
      id: GOOGLE_3P_SIGN_IN_BUTTON_ID,
      tabIndex: 0
    });
    buttonEl. /*OK*/innerHTML = GOOGLE_3P_SIGN_IN_BUTTON_HTML;
    buttonEl.onclick = () => {
      sendMessageToParentFnPromise.then(sendMessageToParent => {
        sendMessageToParent({
          stamp: POST_MESSAGE_STAMP,
          command: POST_MESSAGE_COMMAND_3P_BUTTON_CLICK
        });
      });
      if (redirectMode) {
        // TODO(b/242998655): Fix the downstream calls for logEvent to be chained to remove the need of delaying redirect.
        self.setTimeout(() => {
          self.open(authorizationUrl, '_parent');
        }, REDIRECT_DELAY);
        self.open(authorizationUrl, '_parent');
      } else {
        self.open(authorizationUrl);
      }
    };
    self.document.body.appendChild(buttonEl);

    // Promise a function that sends messages to the parent frame.
    // Note: A function is preferable to a reference to the parent frame
    // because referencing the parent frame outside of the 'message' event
    // handler throws an Error. A function defined within the handler can
    // effectively save a reference to the parent frame though.
    const sendMessageToParentFnPromise = new Promise(resolve => {
      self.addEventListener('message', e => {
        if (allowedOrigins.indexOf(e.origin) !== -1 && e.data.stamp === POST_MESSAGE_STAMP && e.data.command === POST_MESSAGE_COMMAND_INTRODUCTION) {
          resolve(message => {
            e.source.postMessage(message, e.origin);
          });
        }
      });
    });
    function sendErrorMessageToParent() {
      sendMessageToParentFnPromise.then(sendMessageToParent => {
        sendMessageToParent({
          stamp: POST_MESSAGE_STAMP,
          command: POST_MESSAGE_COMMAND_ERROR
        });
      });
    }

    // Validate origins.
    for (let i = 0; i < allowedOrigins.length; i++) {
      const allowedOrigin = allowedOrigins[i];
      const url = new URL(allowedOrigin);
      const isOrigin = url.origin === allowedOrigin;
      const protocolIsValid = url.protocol === 'http:' || url.protocol === 'https:';
      const isValidOrigin = isOrigin && protocolIsValid;
      if (!isValidOrigin) {
        (0, _log.warn)(`[swg-gaa.js:GaaGoogle3pSignInButton.show]: You specified an invalid origin: ${allowedOrigin}`);
        sendErrorMessageToParent();
        return;
      }
    }

    // Relay message to the parent frame (GAA Intervention).
    self.addEventListener('message', e => {
      if (allowedOrigins.indexOf(e.origin) !== -1 && e.data.stamp === POST_MESSAGE_STAMP && e.data.command === POST_MESSAGE_COMMAND_USER) {
        self.parent.postMessage(e.data, e.origin);
      }
    });
  }
  /**
   * Notify Google Intervention of a complete sign-in event.
   * @nocollapse
   * @param {{ gaaUser: GaaUserDef}} params
   */
  static gaaNotifySignIn(_ref11) {
    let {
      gaaUser
    } = _ref11;
    self.opener.postMessage({
      stamp: POST_MESSAGE_STAMP,
      command: POST_MESSAGE_COMMAND_USER,
      gaaUser
    });
  }
}

/**
 * Logs Showcase events.
 * @param {{
 *   analyticsEvent: (AnalyticsEvent|undefined),
 *   showcaseEvent: (ShowcaseEvent|undefined),
 *   isFromUserAction: boolean,
 * }} params
 */
exports.GaaGoogle3pSignInButton = GaaGoogle3pSignInButton;
function logEvent() {
  let {
    analyticsEvent,
    showcaseEvent,
    isFromUserAction
  } = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  callSwg(swg => {
    // Get reference to event manager.
    swg.getEventManager().then(eventManager => {
      // Get list of analytics events.
      const eventTypes = showcaseEvent ? (0, _eventTypeMapping.showcaseEventToAnalyticsEvents)(showcaseEvent) : [analyticsEvent];

      // Log each analytics event.
      for (const eventType of eventTypes) {
        eventManager.logEvent({
          eventType,
          eventOriginator: _api_messages.EventOriginator.SWG_CLIENT,
          isFromUserAction,
          additionalParameters: null
        });
      }
    });
  });
}
class GaaUtils {
  /**
   * Returns query string from current URL.
   * Tests can override this method to return different URLs.
   * @return {string}
   */
  static getQueryString() {
    return self.location.search;
  }
}

/**
 * Types of grantReason that can be specified by the user as part of
 * the userState object
 * @enum {string}
 */
exports.GaaUtils = GaaUtils;
const GrantReasonType = {
  FREE: 'FREE',
  SUBSCRIBER: 'SUBSCRIBER',
  METERING: 'METERING'
};

/**
 * Types of paywallReason that can be specified by the user as part of
 * the userState object
 * @enum {string}
 */
exports.GrantReasonType = GrantReasonType;
const PaywallReasonType = {
  RESERVED_USER: 'RESERVED_USER'
};
exports.PaywallReasonType = PaywallReasonType;
class GaaMetering {
  constructor() {
    this.userState = {};
    this.gaaUserPromiseResolve_ = function () {};
    this.loginPromiseResolve_ = function () {};
  }

  /**
   * Returns a promise that resolves with a gaaUser.
   * @nocollapse
   * @return {!Promise}
   */
  static getGaaUserPromise() {
    return new Promise(resolve => {
      GaaMetering.gaaUserPromiseResolve_ = resolve;
    });
  }
  static setGaaUser(jwt) {
    GaaMetering.gaaUserPromiseResolve_(jwt);
  }

  /**
   * Returns a promise that resolves when the user clicks "Already registered? Sign in".
   * @nocollapse
   * @return {!Promise}
   */
  static getLoginPromise() {
    return new Promise(resolve => {
      GaaMetering.loginPromiseResolve_ = resolve;
    });
  }
  static resolveLogin() {
    GaaMetering.loginPromiseResolve_();
  }

  /**
   * Initialize GaaMetering flow
   * @nocollapse
   * @param {InitParams} params
   */
  static init(params) {
    // Validate GaaMetering parameters
    if (!params || !GaaMetering.validateParameters(params)) {
      (0, _log.debugLog)('[gaa.js:GaaMetering.init]: Invalid params.');
      return false;
    }

    // Register publisher's callbacks, promises, and parameters
    const productId = GaaMetering.getProductIDFromPageConfig_();
    const {
      googleApiClientId,
      authorizationUrl,
      allowedReferrers,
      showcaseEntitlement,
      caslUrl,
      showPaywall,
      userState,
      unlockArticle,
      handleSwGEntitlement,
      registerUserPromise,
      handleLoginPromise,
      publisherEntitlementPromise,
      rawJwt
    } = params;

    // Set class variables
    GaaMetering.userState = userState;
    GaaMetering.publisherEntitlementPromise = publisherEntitlementPromise;

    // Validate gaa parameters and referrer
    if (!GaaMetering.isGaa(allowedReferrers)) {
      (0, _log.debugLog)('Extended Access - Invalid gaa parameters or referrer.');
      return false;
    }
    callSwg(subscriptions => {
      subscriptions.init(productId);
      logEvent({
        analyticsEvent: _api_messages.AnalyticsEvent.EVENT_SHOWCASE_METERING_INIT,
        isFromUserAction: false
      });
      subscriptions.setOnLoginRequest(() => GaaMetering.handleLoginRequest(handleLoginPromise, unlockArticleIfGranted));
      subscriptions.setOnNativeSubscribeRequest(() => showPaywall());
      subscriptions.setOnEntitlementsResponse(googleEntitlementsPromise => GaaMetering.setEntitlements(googleEntitlementsPromise, allowedReferrers, unlockArticle, handleSwGEntitlement, showGoogleRegwall, showPaywall));
      if ('granted' in userState && 'grantReason' in userState) {
        unlockArticleIfGranted();
      } else if (GaaMetering.isArticleFreeFromPageConfig_()) {
        GaaMetering.userState.grantReason = GrantReasonType.FREE;
        GaaMetering.userState.granted = true;
        (0, _log.debugLog)('Article free from markup.');
        unlockArticleIfGranted();
      } else if (showcaseEntitlement) {
        (0, _log.debugLog)(showcaseEntitlement);
        subscriptions.consumeShowcaseEntitlementJwt(showcaseEntitlement);
      } else {
        (0, _log.debugLog)('resolving publisherEntitlement');
        publisherEntitlementPromise.then(fetchedPublisherEntitlements => {
          if (GaaMetering.validateUserState(fetchedPublisherEntitlements)) {
            GaaMetering.userState = fetchedPublisherEntitlements;
            unlockArticleIfGranted();
          } else {
            (0, _log.debugLog)("Publisher entitlement isn't valid");
          }
        });
      }
    });

    // Show the Google registration intervention.
    function showGoogleRegwall() {
      (0, _log.debugLog)('show Google Regwall');
      // Don't render the regwall until the window has loaded.
      GaaMetering.getOnReadyPromise().then(() => {
        if (googleApiClientId) {
          GaaMeteringRegwall.showWithNativeRegistrationButton({
            caslUrl,
            googleApiClientId,
            rawJwt
          }).then(jwt => {
            // Handle registration for new users
            // Save credentials object so that registerUserPromise can use it using getGaaUser.
            GaaMetering.setGaaUser(jwt);
            registerUserPromise.then(registerUserUserState => {
              (0, _log.debugLog)('registerUserPromise resolved');
              if (GaaMetering.validateUserState(registerUserUserState)) {
                GaaMetering.userState = registerUserUserState;
                unlockArticleIfGranted();
              }
            });
          });
        } else {
          GaaMeteringRegwall.showWithNative3PRegistrationButton({
            caslUrl,
            authorizationUrl
          });
        }
      });
    }
    function unlockArticleIfGranted() {
      if (!GaaMetering.validateUserState(GaaMetering.userState)) {
        (0, _log.debugLog)('Invalid userState object');
        return false;
      } else if (GaaMetering.userState.granted === true) {
        const grantReasonToShowCaseEventMap = {
          [GrantReasonType.SUBSCRIBER]: _subscriptions.ShowcaseEvent.EVENT_SHOWCASE_UNLOCKED_BY_SUBSCRIPTION,
          [GrantReasonType.FREE]: _subscriptions.ShowcaseEvent.EVENT_SHOWCASE_UNLOCKED_FREE_PAGE,
          [GrantReasonType.METERING]: _subscriptions.ShowcaseEvent.EVENT_SHOWCASE_UNLOCKED_BY_METER
        };
        if (GrantReasonType[GaaMetering.userState.grantReason] !== undefined) {
          callSwg(subscriptions => {
            subscriptions.setShowcaseEntitlement({
              entitlement: grantReasonToShowCaseEventMap[GaaMetering.userState.grantReason],
              isUserRegistered: GaaMetering.isCurrentUserRegistered(),
              subscriptionTimestamp: GaaMetering.getSubscriptionTimestamp()
            });
            (0, _log.debugLog)('unlocked for ' + GaaMetering.userState.grantReason);
          });
        }
        // User has access from publisher so unlock article
        unlockArticle();
      } else {
        checkShowcaseEntitlement(GaaMetering.userState);
      }
    }
    function checkShowcaseEntitlement(userState) {
      if (userState.registrationTimestamp) {
        // Send userState to Google
        callSwg(subscriptions => {
          (0, _log.debugLog)('getting entitlements from Google');
          (0, _log.debugLog)(GaaMetering.newUserStateToUserState(userState));
          subscriptions.getEntitlements(GaaMetering.newUserStateToUserState(userState));
        });
      } else {
        // If userState is undefined, it’s likely the user isn’t
        // logged in. Do not send an empty userState to Google in
        // this case.
        showGoogleRegwall();
      }
    }
  }
  static handleLoginRequest(handleLoginPromise, unlockArticleIfGranted) {
    GaaMetering.resolveLogin();
    handleLoginPromise.then(handleLoginUserState => {
      if (GaaMetering.validateUserState(handleLoginUserState)) {
        GaaMetering.userState = handleLoginUserState;
        GaaMeteringRegwall.remove();
        (0, _log.debugLog)('GaaMeteringRegwall removed');
        unlockArticleIfGranted();
      } else {
        (0, _log.debugLog)('invalid handleLoginUserState');
        return false;
      }
    });
  }
  static setEntitlements(googleEntitlementsPromise, allowedReferrers, unlockArticle, handleSwGEntitlement, showGoogleRegwall, showPaywall) {
    // Wait for Google check to finish
    googleEntitlementsPromise.then(googleEntitlement => {
      // Determine Google response from publisher response.
      if (googleEntitlement.enablesThisWithGoogleMetering()) {
        // Google returned metering entitlement so grant access
        googleEntitlement.consume(() => {
          // Consume the entitlement and trigger a dialog that lets the user
          // know Google provided them with a free read.
          unlockArticle();
        });
      } else if (googleEntitlement.enablesThis()) {
        // Google returned a non-metering entitlement
        // This is only relevant for publishers doing SwG
        handleSwGEntitlement();
      } else if (!GaaMetering.isCurrentUserRegistered() && GaaMetering.isGaa(allowedReferrers)) {
        // This is an anonymous user so show the Google registration intervention
        showGoogleRegwall();
      } else {
        // User does not any access from publisher or Google so show the standard paywall
        callSwg(subscriptions => {
          switch (GaaMetering.userState.paywallReason) {
            case PaywallReasonType.RESERVED_USER:
              subscriptions.setShowcaseEntitlement({
                entitlement: _subscriptions.ShowcaseEvent.EVENT_SHOWCASE_INELIGIBLE_PAYWALL,
                isUserRegistered: GaaMetering.isCurrentUserRegistered(),
                subscriptionTimestamp: GaaMetering.getSubscriptionTimestamp()
              });
              break;
            default:
              subscriptions.setShowcaseEntitlement({
                entitlement: _subscriptions.ShowcaseEvent.EVENT_SHOWCASE_NO_ENTITLEMENTS_PAYWALL,
                isUserRegistered: GaaMetering.isCurrentUserRegistered(),
                subscriptionTimestamp: GaaMetering.getSubscriptionTimestamp()
              });
          }
        });
        // Show the paywall
        showPaywall();
      }
    });
  }
  static isCurrentUserRegistered() {
    return GaaMetering.isUserRegistered(GaaMetering.userState);
  }
  static isUserRegistered(userState) {
    return userState.id !== undefined && userState.id != '';
  }

  /**
   * Validates parameters for GaaMetering.init flow
   * @nocollapse
   * @param {InitParams} params
   */
  static validateParameters(params) {
    let noIssues = true;
    if ('googleApiClientId' in params && 'authorizationUrl' in params || !('googleApiClientId' in params) && !('authorizationUrl' in params)) {
      (0, _log.debugLog)('Either googleApiClientId or authorizationUrl should be supplied but not both.');
      noIssues = false;
    } else if ('authorizationUrl' in params) {
      if (!(typeof params.authorizationUrl === 'string') || (0, _url.parseUrl)(params.authorizationUrl).href !== params.authorizationUrl) {
        (0, _log.debugLog)('authorizationUrl is not a valid URL');
        noIssues = false;
      }
    } else if (!(typeof params.googleApiClientId === 'string') || params.googleApiClientId.indexOf('.apps.googleusercontent.com') == -1) {
      (0, _log.debugLog)('Missing googleApiClientId, or it is not a string, or it is not in a correct format');
      noIssues = false;
    }
    if (!('allowedReferrers' in params && Array.isArray(params.allowedReferrers))) {
      (0, _log.debugLog)('Missing allowedReferrers or it is not an array');
      noIssues = false;
    }
    const reqFunc = ['unlockArticle', 'showPaywall'];
    for (let reqFuncNo = 0; reqFuncNo < reqFunc.length; reqFuncNo++) {
      if (!(reqFunc[reqFuncNo] in params && typeof params[reqFunc[reqFuncNo]] === 'function')) {
        (0, _log.debugLog)(`Missing ${reqFunc[reqFuncNo]} or it is not a function`);
        noIssues = false;
      }
    }
    if ('handleSwGEntitlement' in params && typeof params.handleSwGEntitlement != 'function') {
      (0, _log.debugLog)('handleSwGEntitlement is provided but it is not a function');
      noIssues = false;
    }
    const reqPromise = 'authorizationUrl' in params ? ['handleLoginPromise'] : ['handleLoginPromise', 'registerUserPromise'];
    for (let reqPromiseNo = 0; reqPromiseNo < reqPromise.length; reqPromiseNo++) {
      if (!(reqPromise[reqPromiseNo] in params && GaaMetering.isPromise(params[reqPromise[reqPromiseNo]]))) {
        (0, _log.debugLog)(`Missing ${reqPromise[reqPromiseNo]} or it is not a promise`);
        noIssues = false;
      }
    }
    if ('publisherEntitlementPromise' in params && !GaaMetering.isPromise(params.publisherEntitlementPromise)) {
      (0, _log.debugLog)('publisherEntitlementPromise is provided but it is not a promise');
      noIssues = false;
    }

    // Check userState is an 'object'
    if (!('userState' in params) && !('publisherEntitlementPromise' in params)) {
      (0, _log.debugLog)(`userState or publisherEntitlementPromise needs to be provided`);
      noIssues = false;
    } else if ('userState' in params && typeof params.userState != 'object') {
      (0, _log.debugLog)(`userState is not an object`);
      noIssues = false;
    } else {
      const userState = params.userState;
      if ((!('granted' in userState) || userState.granted && !GaaMetering.isArticleFreeFromPageConfig_() && !('grantReason' in userState)) && !('publisherEntitlementPromise' in params)) {
        (0, _log.debugLog)('Either granted and grantReason have to be supplied or you have to provide pubisherEntitlementPromise');
        noIssues = false;
      }
    }
    return noIssues;
  }
  static isGaa() {
    let publisherReferrers = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
    // Validate GAA params.
    const queryString = GaaUtils.getQueryString();
    if (!queryStringHasFreshGaaParams(queryString, true)) {
      return false;
    }

    // Validate referrer.
    const referrer = (0, _url.parseUrl)(self.document.referrer);
    if (!(0, _url.wasReferredByGoogle)(referrer) && publisherReferrers.indexOf(referrer.hostname) == -1) {
      // Real publications should bail if this referrer check fails.
      // This script is only logging a warning for metering demo purposes.
      (0, _log.debugLog)(`This page's referrer ("${referrer.origin}") can't grant Google Article Access.`);
      return false;
    }
    return true;
  }
  static getProductIDFromPageConfig_() {
    const jsonLdPageConfig = GaaMetering.getProductIDFromJsonLdPageConfig_();
    if (jsonLdPageConfig) {
      return jsonLdPageConfig;
    }
    const microdataPageConfig = GaaMetering.getProductIDFromMicrodataPageConfig_();
    if (microdataPageConfig) {
      return microdataPageConfig;
    }
    throw new Error('Showcase articles must define a publisher ID with either JSON-LD or Microdata.');
  }

  /**
   * Gets publisher ID from JSON-LD page config.
   * @private
   * @nocollapse
   * @return {string|undefined}
   */
  static getProductIDFromJsonLdPageConfig_() {
    const ldJsonElements = self.document.querySelectorAll('script[type="application/ld+json"]');
    for (let i = 0; i < ldJsonElements.length; i++) {
      var _findInArray;
      const ldJsonElement = ldJsonElements[i];
      let ldJson = /** @type {*} */(0, _json.parseJson)(ldJsonElement.textContent);
      if (!Array.isArray(ldJson)) {
        ldJson = [ldJson];
      }
      const productId = (_findInArray = (0, _object.findInArray)(ldJson, entry => {
        var _entry$isPartOf;
        return entry === null || entry === void 0 ? void 0 : (_entry$isPartOf = entry.isPartOf) === null || _entry$isPartOf === void 0 ? void 0 : _entry$isPartOf.productID;
      })) === null || _findInArray === void 0 ? void 0 : _findInArray.isPartOf.productID;
      if (productId) {
        return productId;
      }
    }
  }

  /**
   * Gets product ID from Microdata page config.
   * @private
   * @nocollapse
   * @return {string|undefined}
   */
  static getProductIDFromMicrodataPageConfig_() {
    const productIdElements = self.document.querySelectorAll('[itemscope][itemtype][itemprop="isPartOf"] [itemprop="productID"]');
    for (let i = 0; i < productIdElements.length; i++) {
      const productIdElement = productIdElements[i];
      const productId = productIdElement.content;
      if (productId) {
        return productId;
      }
    }
  }
  static isArticleFreeFromPageConfig_() {
    return GaaMetering.isArticleFreeFromJsonLdPageConfig_() || GaaMetering.isArticleFreeFromMicrodataPageConfig_() || false;
  }

  /**
   * @private
   * @nocollapse
   * @return {boolean}
   */
  static isArticleFreeFromJsonLdPageConfig_() {
    const ldJsonElements = [...self.document.querySelectorAll('script[type="application/ld+json"]')];
    for (const ldJsonElement of ldJsonElements) {
      var _findInArray2;
      let ldJson = /** @type {*} */(0, _json.parseJson)(ldJsonElement.textContent);
      if (!Array.isArray(ldJson)) {
        ldJson = [ldJson];
      }
      const accessibleForFree = (_findInArray2 = (0, _object.findInArray)(ldJson, entry => entry === null || entry === void 0 ? void 0 : entry.isAccessibleForFree)) === null || _findInArray2 === void 0 ? void 0 : _findInArray2.isAccessibleForFree;
      if (typeof accessibleForFree === 'boolean') {
        return accessibleForFree;
      }
      if (typeof accessibleForFree === 'string') {
        return accessibleForFree.toLowerCase() === 'true';
      }
    }
    return false;
  }

  /**
   * @private
   * @nocollapse
   * @return {boolean}
   */
  static isArticleFreeFromMicrodataPageConfig_() {
    const accessibleForFreeElements = self.document.querySelectorAll('[itemscope][itemtype] [itemprop="isAccessibleForFree"]');
    for (let i = 0; i < accessibleForFreeElements.length; i++) {
      const accessibleForFreeElement = accessibleForFreeElements[i];
      const accessibleForFree = accessibleForFreeElement.content;
      (0, _log.debugLog)(typeof accessibleForFree);
      if (accessibleForFree) {
        const lowercase = accessibleForFree.toLowerCase();
        return lowercase == 'true';
      }
    }
    return false;
  }
  static isPromise(p) {
    return p && Object.prototype.toString.call(p) === '[object Promise]';
  }
  static newUserStateToUserState(newUserState) {
    // Convert registrationTimestamp to seconds
    const registrationTimestampSeconds = (0, _dateUtils.convertPotentialTimestampToSeconds)(newUserState.registrationTimestamp);
    return {
      'metering': {
        'state': {
          'id': newUserState.id,
          'standardAttributes': {
            'registered_user': {
              'timestamp': registrationTimestampSeconds
            }
          }
        }
      }
    };
  }
  static validateUserState(newUserState) {
    if (!newUserState) {
      return false;
    }
    let noIssues = true;
    if (!('granted' in newUserState && typeof newUserState.granted === 'boolean')) {
      (0, _log.debugLog)('userState.granted is missing or invalid (must be true or false)');
      noIssues = false;
    }
    if (newUserState.granted === true && GrantReasonType[newUserState.grantReason] === undefined) {
      (0, _log.debugLog)('if userState.granted is true then userState.grantReason has to be either METERING, or SUBSCRIBER');
      noIssues = false;
    }
    if (newUserState.granted === true && newUserState.grantReason === GrantReasonType.SUBSCRIBER) {
      if (!('id' in newUserState) || !('registrationTimestamp' in newUserState)) {
        (0, _log.debugLog)('Missing user ID or registrationTimestamp in userState object');
        noIssues = false;
      } else {
        // Check if the provided timestamp is an integer
        if (!(typeof newUserState.registrationTimestamp === 'number' && newUserState.registrationTimestamp % 1 === 0)) {
          (0, _log.debugLog)('userState.registrationTimestamp invalid, userState.registrationTimestamp needs to be an integer and in seconds');
          noIssues = false;
        } else if ((0, _dateUtils.convertPotentialTimestampToSeconds)(newUserState.registrationTimestamp) > Date.now() / 1000) {
          (0, _log.debugLog)('userState.registrationTimestamp is in the future');
          noIssues = false;
        }
        if (newUserState.grantReason === GrantReasonType.SUBSCRIBER) {
          if (!('subscriptionTimestamp' in newUserState)) {
            (0, _log.debugLog)('subscriptionTimestamp is required if userState.grantReason is SUBSCRIBER');
            noIssues = false;
          } else if (
          // Check if the provided timestamp is an integer
          !(typeof newUserState.subscriptionTimestamp === 'number' && newUserState.subscriptionTimestamp % 1 === 0)) {
            (0, _log.debugLog)('userState.subscriptionTimestamp invalid, userState.subscriptionTimestamp needs to be an integer and in seconds');
            noIssues = false;
          } else if ((0, _dateUtils.convertPotentialTimestampToSeconds)(newUserState.subscriptionTimestamp) > Date.now() / 1000) {
            (0, _log.debugLog)('userState.subscriptionTimestamp is in the future');
            noIssues = false;
          }
        }
      }
    }
    if ('id' in newUserState || 'registrationTimestamp' in newUserState) {
      if (!('id' in newUserState)) {
        (0, _log.debugLog)('Missing user ID in userState object');
        return false;
      }
      if (!('registrationTimestamp' in newUserState)) {
        (0, _log.debugLog)('Missing registrationTimestamp in userState object');
        return false;
      }
    }
    if ('paywallReason' in newUserState) {
      if (newUserState.granted) {
        (0, _log.debugLog)('userState.granted must be false when paywallReason is supplied.');
        noIssues = false;
      }
      if (PaywallReasonType[newUserState.paywallReason] === undefined) {
        (0, _log.debugLog)('userState.paywallReason has to be empty or set to RESERVED_USER.');
        noIssues = false;
      }
    }
    return noIssues;
  }
  static getOnReadyPromise() {
    return new Promise(resolve => {
      if (self.document.readyState === 'complete') {
        resolve();
      } else {
        self.window.addEventListener('load', () => {
          resolve();
        });
      }
    });
  }
  static getSubscriptionTimestamp() {
    var _GaaMetering$userStat;
    return (GaaMetering === null || GaaMetering === void 0 ? void 0 : (_GaaMetering$userStat = GaaMetering.userState) === null || _GaaMetering$userStat === void 0 ? void 0 : _GaaMetering$userStat.subscriptionTimestamp) || null;
  }
}
exports.GaaMetering = GaaMetering;

},{"../api/subscriptions":13,"../i18n/strings":21,"../model/doc":27,"../proto/api_messages":30,"../runtime/event-type-mapping":40,"./date-utils":69,"./dom":71,"./i18n":75,"./json":76,"./jwt":77,"./log":78,"./object":79,"./style":83,"./url":85}],75:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getLanguageCodeFromElement = getLanguageCodeFromElement;
exports.msg = msg;
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
const DEFAULT_LANGUAGE_CODE = 'en';

/**
 * Gets a message for a given language code, from a map of messages.
 * @param {!Object<string, string>} map
 * @param {?string|?Element} languageCodeOrElement
 * @return {?string}
 */
function msg(map, languageCodeOrElement) {
  const defaultMsg = map[DEFAULT_LANGUAGE_CODE];

  // Verify params.
  if (typeof map !== 'object' || !languageCodeOrElement) {
    return defaultMsg;
  }

  // Get language code.
  let languageCode = typeof languageCodeOrElement === 'string' ? languageCodeOrElement : getLanguageCodeFromElement(languageCodeOrElement);

  // Normalize language code.
  languageCode = languageCode.toLowerCase();
  languageCode = languageCode.replace(/_/g, '-');

  // Search for a message matching the language code.
  // If a message can't be found, try again with a less specific language code.
  const languageCodeSegments = languageCode.split('-');
  while (languageCodeSegments.length) {
    const key = languageCodeSegments.join('-');
    if (key in map) {
      return map[key];
    }

    // Simplify language code.
    // Ex: "en-US-SF" => "en-US"
    languageCodeSegments.pop();
  }

  // There was an attempt.
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
  }

  // There was an attempt.
  return DEFAULT_LANGUAGE_CODE;
}

},{}],76:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getPropertyFromJsonString = getPropertyFromJsonString;
exports.parseJson = parseJson;
exports.tryParseJson = tryParseJson;
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
  return (/** @type {?JsonObject} */JSON.parse( /** @type {string} */json)
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
  const json = tryParseJson(jsonString);
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
 * @typedef {{
 *   header: (?JsonObject|undefined),
 *   payload: (?JsonObject|undefined),
 *   verifiable: string,
 *   sig: string,
 * }}
 */
let JwtTokenInternalDef;

/**
 * Provides helper methods to decode and verify JWT tokens.
 */
class JwtHelper {
  constructor() {}

  /**
   * Decodes JWT token and returns its payload.
   * @param {string} encodedToken
   * @return {?JsonObject|undefined}
   */
  decode(encodedToken) {
    return this.decodeInternal_(encodedToken).payload;
  }

  /**
   * @param {string} encodedToken
   * @return {!JwtTokenInternalDef}
   * @private
   */
  decodeInternal_(encodedToken) {
    // See https://jwt.io/introduction/
    /**
     * Throws error about invalid token.
     */
    function invalidToken() {
      throw new Error(`Invalid token: "${encodedToken}"`);
    }

    // Encoded token has three parts: header.payload.sig
    // Note! The padding is not allowed by JWT spec:
    // http://self-issued.info/docs/draft-goland-json-web-token-00.html#rfc.section.5
    const parts = encodedToken.split('.');
    if (parts.length != 3) {
      invalidToken();
    }
    const headerUtf8Bytes = (0, _bytes.base64UrlDecodeToBytes)(parts[0]);
    const payloadUtf8Bytes = (0, _bytes.base64UrlDecodeToBytes)(parts[1]);
    return {
      header: (0, _json.tryParseJson)((0, _bytes.utf8DecodeSync)(headerUtf8Bytes), invalidToken),
      payload: (0, _json.tryParseJson)((0, _bytes.utf8DecodeSync)(payloadUtf8Bytes), invalidToken),
      verifiable: `${parts[0]}.${parts[1]}`,
      sig: parts[2]
    };
  }
}
exports.JwtHelper = JwtHelper;

},{"./bytes":67,"./json":76}],78:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.assert = assert;
exports.debugLog = debugLog;
exports.log = log;
exports.warn = warn;
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
    const logArgs = Array.prototype.slice.call(arguments, 0);
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
  let firstElement;
  if (!shouldBeTrueish) {
    message = message || 'Assertion failed';
    const splitMessage = message.split('%s');
    const first = splitMessage.shift();
    let formatted = first;
    const messageArray = [];
    pushIfNonEmpty(messageArray, first);
    for (let i = 2; i < arguments.length; i++) {
      const val = arguments[i];
      if (val && val.tagName) {
        firstElement = val;
      }
      const nextConstant = splitMessage.shift();
      messageArray.push(val);
      pushIfNonEmpty(messageArray, nextConstant.trim());
      formatted += toString(val) + nextConstant;
    }
    const e = new Error(formatted);
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
  return (/** @type {string} */val
  );
}

},{}],79:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.findInArray = findInArray;
exports.map = map;
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
  const obj = Object.create(null);
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
  const len = array.length || 0;
  if (len > 0) {
    for (let i = 0; i < len; i++) {
      const other = array[i];
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

class Preconnect {
  /**
   * @param {!Document} doc
   */
  constructor(doc) {
    /** @private @const {!Document} */
    this.doc_ = doc;
  }

  /**
   * @param {string} url
   */
  preconnect(url) {
    this.pre_(url, 'preconnect');
  }

  /**
   * @param {string} url
   */
  dnsPrefetch(url) {
    this.pre_(url, 'dns-prefetch');
  }

  /**
   * @param {string} url
   */
  prefetch(url) {
    this.pre_(url, 'preconnect prefetch');
  }

  /**
   * @param {string} url
   * @param {string} as
   */
  preload(url, as) {
    this.pre_(url, 'preconnect preload', as);
  }

  /**
   * @param {string} url
   * @param {string} rel
   * @param {?string=} as
   * @private
   */
  pre_(url, rel, as) {
    // <link rel="prefetch" href="..." as="">
    const linkEl = (0, _dom.createElement)(this.doc_, 'link', {
      'rel': rel,
      'href': url
    });
    if (as) {
      linkEl.setAttribute('as', as);
    }
    this.doc_.head.appendChild(linkEl);
  }
}
exports.Preconnect = Preconnect;

},{"./dom":71}],81:[function(require,module,exports){
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
  const arr = maxVal < 256 ? new Uint8Array(numInts) : maxVal < 32768 ? new Uint16Array(numInts) : new Uint32Array(numInts);
  const isIE = !!self['msCrypto'];
  const localCrypto = isIE ? self['msCrypto'] : self.crypto;
  if (localCrypto && localCrypto.getRandomValues) {
    localCrypto.getRandomValues(arr);
    for (let i = arr.length - 1; i > -1; i--) {
      arr[i] = arr[i] % maxVal;
    }
  } else {
    // For older browsers
    for (let i = arr.length - 1; i > -1; i--) {
      arr[i] = Math.floor(Math.random() * maxVal);
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
exports.expandTemplate = expandTemplate;
exports.getSwgTransactionId = getSwgTransactionId;
exports.getUuid = getUuid;
exports.hash = hash;
exports.startsWith = startsWith;
exports.stringHash32 = stringHash32;
var _random = require("./random");
var _bytes = require("./bytes");
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

const CHARS = '0123456789ABCDEF';

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
  const index = string.length - suffix.length;
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
  let maxIterations = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 1;
  for (let i = 0; i < maxIterations; i++) {
    let matches = 0;
    template = template.replace(/\${([^}]*)}/g, (_a, b) => {
      matches++;
      return getter(b);
    });
    if (!matches) {
      break;
    }
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
  const length = str.length;
  let hash = 5381;
  for (let i = 0; i < length; i++) {
    hash = hash * 33 ^ str.charCodeAt(i);
  }
  // Convert from 32-bit signed to unsigned.
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
  const hexTime = Date.now().toString(16);
  return hexTime.substring(hexTime.length - 8).toUpperCase();
}

/**
 * Generates a RFC 4122 V4 UUID. Ex: "92329D39-6F5C-4520-ABFC-AAB64544E172"
 * The first 8 digits are unique for the millisecond of the month.  The rest
 * are randomly generated.
 */
function getUuid() {
  let uuid = getMonthlyTimeIdentifier() + '-';
  let rIndex = 0;
  const rands = (0, _random.getRandomInts)(23, 16);
  for (let i = 9; i < 36; i++) {
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
const PADDING = '00000000';
function toHex(buffer) {
  const hexCodes = [];
  const view = new DataView(buffer);
  for (let i = 0; i < view.byteLength; i += 4) {
    // toString(16) will give the hex representation of the number without padding
    const stringValue = view.getUint32(i).toString(16);
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
  const crypto = self.crypto || self.msCrypto;
  const subtle = crypto === null || crypto === void 0 ? void 0 : crypto.subtle;
  if (!subtle) {
    const message = 'Swgjs only works on secure (HTTPS or localhost) pages.';
    (0, _log.warn)(message);
    return Promise.reject(message);
  }
  return subtle.digest('SHA-512', (0, _bytes.utf8EncodeSync)(stringToHash)).then(digest => toHex(digest));
}

},{"./bytes":67,"./log":78,"./random":81}],83:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.camelCaseToTitleCase = camelCaseToTitleCase;
exports.computedStyle = computedStyle;
exports.defaultStyles = void 0;
exports.getStyle = getStyle;
exports.getVendorJsPropertyName = getVendorJsPropertyName;
exports.googleFontsUrl = void 0;
exports.px = px;
exports.removeAlphaFromColor = removeAlphaFromColor;
exports.resetAllStyles = resetAllStyles;
exports.resetStyles = resetStyles;
exports.scale = scale;
exports.setImportantStyles = setImportantStyles;
exports.setStyle = setStyle;
exports.setStyles = setStyles;
exports.toggle = toggle;
exports.translate = translate;
exports.translateX = translateX;
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
let propertyNameCache;

/** @const {!Array<string>} */
const vendorPrefixes = ['Webkit', 'webkit', 'Moz', 'moz', 'ms', 'O', 'o'];

/**
 * Default styles to be set for top level friendly iframe.
 * Some attributes are not included such as height, left, margin-left; since
 * these attributes are updated by @media queries and having these values
 * defined here as !important does not work on IE/edge browsers.
 * @const {!Object<string, string|number>}
 */
const defaultStyles = {
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
  'margin-bottom': '0',
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
const googleFontsUrl = 'https://fonts.googleapis.com/css?family=Google+Sans';

/**
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
  for (let i = 0; i < vendorPrefixes.length; i++) {
    const propertyName = vendorPrefixes[i] + titleCase;
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
  let propertyName = propertyNameCache[camelCase];
  if (!propertyName || bypassCache) {
    propertyName = camelCase;
    if (style[camelCase] === undefined) {
      const titleCase = camelCaseToTitleCase(camelCase);
      const prefixedPropertyName = getVendorJsPropertyName_(style, titleCase);
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
  for (const k in styles) {
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
  const propertyName = getVendorJsPropertyName(element.style, property, bypassCache);
  if (propertyName) {
    element.style[propertyName] = /** @type {string} */
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
  const propertyName = getVendorJsPropertyName(element.style, property, bypassCache);
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
  for (const k in styles) {
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
    return `translateX(${value})`;
  }
  return `translateX(${px(value)})`;
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
    return `translate(${x})`;
  }
  if (typeof y == 'number') {
    y = px(y);
  }
  return `translate(${x}, ${y})`;
}

/**
 * Returns a "scale" for CSS "transform" property.
 * @param {number|string} value
 * @return {string}
 */
function scale(value) {
  return `scale(${value})`;
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
  const style = /** @type {?CSSStyleDeclaration} */win.getComputedStyle(el);
  return (/** @type {!Object<string, string>} */style || (0, _object.map)()
  );
}

/**
 * Resets styles that were set dynamically (i.e. inline)
 * @param {!Element} element
 * @param {!Array<string>} properties
 */
function resetStyles(element, properties) {
  const styleObj = {};
  for (const property of properties) {
    styleObj[property] = null;
  }
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
exports.isBoolean = isBoolean;
exports.isEnumValue = isEnumValue;
exports.isFunction = isFunction;
exports.isObject = isObject;
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
  const str = Object.prototype.toString.call(value);
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
  for (const k in enumObj) {
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
exports.addQueryParam = addQueryParam;
exports.getCanonicalUrl = getCanonicalUrl;
exports.getHostUrl = getHostUrl;
exports.isSecure = isSecure;
exports.parseQueryString = parseQueryString;
exports.parseUrl = parseUrl;
exports.serializeProtoMessageForUrl = serializeProtoMessageForUrl;
exports.serializeQueryString = serializeQueryString;
exports.wasReferredByGoogle = wasReferredByGoogle;
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

// NOTE: This regex was copied from SwG's AMP extension. https://github.com/ampproject/amphtml/blob/c23bf281f817a2ee5df73f6fd45e9f4b71bb68b6/extensions/amp-subscriptions-google/0.1/amp-subscriptions-google.js#L56
const GOOGLE_DOMAIN_RE = /(^|\.)google\.(com?|[a-z]{2}|com?\.[a-z]{2}|cat)$/;

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
let LocationDef;

/**
 * Cached a-tag to avoid memory allocation during URL parsing.
 * @type {HTMLAnchorElement}
 */
let a;

/**
 * We cached all parsed URLs. As of now there are no use cases
 * of AMP docs that would ever parse an actual large number of URLs,
 * but we often parse the same one over and over again.
 * @type {Object<string, !LocationDef>}
 */
let cache;

/**
 * Serializes the passed parameter map into a query string with both keys
 * and values encoded.
 * @param {!JsonObject} params
 * @return {string}
 */
function serializeQueryString(params) {
  const s = [];
  for (const k in params) {
    const v = params[k];
    if (v == null) {
      continue;
    } else if (Array.isArray(v)) {
      for (let i = 0; i < v.length; i++) {
        const sv = /** @type {string} */v[i];
        s.push(`${encodeURIComponent(k)}=${encodeURIComponent(sv)}`);
      }
    } else {
      const sv = /** @type {string} */v;
      s.push(`${encodeURIComponent(k)}=${encodeURIComponent(sv)}`);
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
    a = /** @type {!HTMLAnchorElement} */self.document.createElement('a');
    cache = self.UrlCache || (self.UrlCache = Object.create(null));
  }
  const fromCache = cache[url];
  if (fromCache) {
    return fromCache;
  }
  const info = parseUrlWithA(a, url);
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
  a.href = url;

  /** @type {!LocationDef} */
  const info = {
    href: a.href,
    protocol: a.protocol,
    host: a.host,
    hostname: a.hostname,
    port: a.port == '0' ? '' : a.port,
    pathname: a.pathname,
    search: a.search,
    hash: a.hash,
    origin: a.protocol + '//' + a.host
  };

  // For data URI a.origin is equal to the string 'null' which is not useful.
  // We instead return the actual origin which is the full URL.
  if (a.origin && a.origin !== 'null') {
    info.origin = a.origin;
  } else if (info.protocol === 'data:' || !info.host) {
    info.origin = info.href;
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
  return (/^[?#]/.test(query) ? query.slice(1) : query).split('&').reduce((params, param) => {
    const item = param.split('=');
    try {
      const key = decodeURIComponent(item[0] || '');
      const value = decodeURIComponent(item[1] || '');
      if (key) {
        params[key] = value;
      }
    } catch (err) {
      // eslint-disable-next-line no-console
      (0, _log.warn)(`SwG could not parse a URL query param: ${item[0]}`);
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
  const queryIndex = url.indexOf('?');
  const fragmentIndex = url.indexOf('#');
  let fragment = '';
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
  return JSON.stringify(message.toArray(false));
}

/**
 * Returns the Url including the path and search, without fregment.
 * @param {string} url
 * @return {string}
 */
function getHostUrl(url) {
  const locationHref = parseUrl(url);
  return locationHref.origin + locationHref.pathname + locationHref.search;
}

/**
 * @param {!../model/doc.Doc} doc
 * @return {string}
 */
function getCanonicalUrl(doc) {
  const node = doc.getRootNode().querySelector("link[rel='canonical']");
  return node && node.href || '';
}
const PARSED_URL = parseUrl(self.window.location.href);
const PARSED_REFERRER = parseUrl(self.document.referrer);

/**
 * True for Google domains
 * @param {LocationDef=} parsedUrl Defaults to the current page's URL
 * @return {boolean}
 */
function isGoogleDomain(parsedUrl) {
  parsedUrl = parsedUrl || PARSED_URL;
  return GOOGLE_DOMAIN_RE.test(parsedUrl.hostname);
}

/**
 * True for HTTPS URLs
 * @param {LocationDef=} parsedUrl Defaults to the current page's URL
 * @return {boolean}
 */
function isSecure(parsedUrl) {
  parsedUrl = parsedUrl || PARSED_URL;
  return parsedUrl.protocol === 'https' || parsedUrl.protocol === 'https:';
}

/**
 * True when the page is rendered within a secure Google application or
 * was linked to from a secure Google domain.
 * @param {LocationDef=} parsedReferrer Defaults to the current page's referrer
 * @return {boolean}
 */
function wasReferredByGoogle(parsedReferrer) {
  parsedReferrer = parsedReferrer || PARSED_REFERRER;
  return isSecure(parsedReferrer) && isGoogleDomain(parsedReferrer);
}

},{"./log":78}],86:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Xhr = exports.FetchResponseHeaders = exports.FetchResponse = exports.FetchInitDef = void 0;
exports.assertSuccess = assertSuccess;
exports.fetchPolyfill = fetchPolyfill;
var _log = require("./log");
var _json = require("./json");
var _url = require("./url");
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
let FetchInitDef;

/** @private @const {!Array<string>} */
exports.FetchInitDef = FetchInitDef;
const allowedMethods_ = ['GET', 'POST'];

/** @private @enum {number} Allowed fetch responses. */
const allowedFetchTypes_ = {
  document: 1,
  text: 2
};

/**
 * A class that polyfills Fetch API.
 */
class Xhr {
  /**
   * @param {!Window} win
   */
  constructor(win) {
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
  fetch_(input, init) {
    // TODO(avimehta): Should the requests go through when page is not visible?
    (0, _log.assert)(typeof input == 'string', 'Only URL supported: %s', input);
    // In particular, Firefox does not tolerate `null` values for
    // `credentials`.
    const creds = init.credentials;
    (0, _log.assert)(creds === undefined || creds == 'include' || creds == 'omit', 'Only credentials=include|omit support: %s', creds);
    // Fallback to xhr polyfill since `fetch` api does not support
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
  fetch(input, init) {
    init = setupInit(init);
    return this.fetch_(input, init).catch(reason => {
      /*
       * If the domain is not valid for SwG we return 404 without
       * CORS headers and the browser throws a CORS error.
       * We include some helpful text in the message to point the
       * publisher towards the real problem.
       */
      const targetOrigin = (0, _url.parseUrl)(input).origin;
      throw new Error(`XHR Failed fetching (${targetOrigin}/...): (Note: a CORS error above may indicate that this publisher or domain is not configured in Publisher Center. The CORS error happens becasue 4xx responses do not set CORS headers.)`, reason && reason.message);
    }).then(response => assertSuccess(response));
  }
}

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
  init = init || /** @type {FetchInitDef} */{};
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
    const xhr = createXhrRequest(init.method || 'GET', input);
    if (init.credentials == 'include') {
      xhr.withCredentials = true;
    }
    if (init.responseType in allowedFetchTypes_) {
      xhr.responseType = init.responseType;
    }
    if (init.headers) {
      for (const header of Object.keys(init.headers)) {
        xhr.setRequestHeader(header, init.headers[header]);
      }
    }
    xhr.onreadystatechange = () => {
      if (xhr.readyState < /* STATUS_RECEIVED */2) {
        return;
      }
      if (xhr.status < 100 || xhr.status > 599) {
        xhr.onreadystatechange = null;
        reject(new Error(`Unknown HTTP status ${xhr.status}`));
        return;
      }

      // TODO(dvoytenko): This is currently simplified: we will wait for the
      // whole document loading to complete. This is fine for the use cases
      // we have now, but may need to be reimplemented later.
      if (xhr.readyState == /* COMPLETE */4) {
        resolve(new FetchResponse(xhr));
      }
    };
    xhr.onerror = () => {
      reject(new Error('Network failure'));
    };
    xhr.onabort = () => {
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
  const xhr = new XMLHttpRequest();
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
  return new Promise(resolve => {
    if (response.ok) {
      return resolve(response);
    }
    const {
      status
    } = response;
    const err = new Error(`HTTP error ${status}`);
    err.retriable = isRetriable(status);
    // TODO(@jridgewell, #9448): Callers who need the response should
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
class FetchResponse {
  /**
   * @param {!XMLHttpRequest} xhr
   */
  constructor(xhr) {
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
  clone() {
    (0, _log.assert)(!this.bodyUsed, 'Body already used');
    return new FetchResponse(this.xhr_);
  }

  /**
   * Drains the response and returns the text.
   * @return {!Promise<string>}
   * @private
   */
  drainText_() {
    (0, _log.assert)(!this.bodyUsed, 'Body already used');
    this.bodyUsed = true;
    return Promise.resolve(this.xhr_.responseText);
  }

  /**
   * Drains the response and returns a promise that resolves with the response
   * text.
   * @return {!Promise<string>}
   */
  text() {
    return this.drainText_();
  }

  /**
   * Drains the response and returns the JSON object.
   * @return {!Promise<!JsonObject>}
   */
  json() {
    return (/** @type {!Promise<!JsonObject>} */
      this.drainText_().then(_json.parseJson)
    );
  }

  /**
   * Drains the response and returns a promise that resolves with the response
   * ArrayBuffer.
   * @return {!Promise<!ArrayBuffer>}
   */
  arrayBuffer() {
    return (/** @type {!Promise<!ArrayBuffer>} */
      this.drainText_().then(_bytes.utf8EncodeSync)
    );
  }
}

/**
 * Provides access to the response headers as defined in the Fetch API.
 * @private Visible for testing.
 */
exports.FetchResponse = FetchResponse;
class FetchResponseHeaders {
  /**
   * @param {!XMLHttpRequest} xhr
   */
  constructor(xhr) {
    /** @private @const {!XMLHttpRequest} */
    this.xhr_ = xhr;
  }

  /**
   * @param {string} name
   * @return {?string}
   */
  get(name) {
    return this.xhr_.getResponseHeader(name);
  }

  /**
   * @param {string} name
   * @return {boolean}
   */
  has(name) {
    return this.xhr_.getResponseHeader(name) != null;
  }
}
exports.FetchResponseHeaders = FetchResponseHeaders;

},{"./bytes":67,"./json":76,"./log":78,"./url":85}],87:[function(require,module,exports){
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

const MAX_Z_INDEX = 2147483647;
const Constants = {};

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
Constants.IFRAME_ACTIVE_CONTAINER_CLASS = `${Constants.CLASS_PREFIX}activeContainer`;
Constants.IFRAME_CONTAINER_CLASS = `${Constants.CLASS_PREFIX}dialogContainer`;
Constants.IFRAME_STYLE_CENTER_CLASS = `${Constants.CLASS_PREFIX}dialogCenter`;
Constants.IFRAME_STYLE_CLASS = `${Constants.CLASS_PREFIX}dialog`;
Constants.IFRAME_STYLE = `
.${Constants.IFRAME_STYLE_CLASS} {
    animation: none 0s ease 0s 1 normal none running;
    background: none 0 0 / auto repeat scroll padding-box border-box #fff;
    background-blend-mode: normal;
    border: 0 none #333;
    border-radius: 8px 8px 0 0;
    border-collapse: separate;
    bottom: 0;
    box-shadow: #808080 0 3px 0 0, #808080 0 0 22px;
    box-sizing: border-box;
    letter-spacing: normal;
    max-height: 100%;
    overflow: visible;
    position: fixed;
    width: 100%;
    z-index: ${MAX_Z_INDEX};
    -webkit-appearance: none;
    left: 0;
}
@media (min-width: 480px) {
  .${Constants.IFRAME_STYLE_CLASS} {
    width: 480px !important;
    left: -240px !important;
    margin-left: calc(100vw - 100vw / 2) !important;
  }
}
.${Constants.IFRAME_CONTAINER_CLASS} {
  background-color: rgba(0,0,0,0.26);
  bottom: 0;
  height: 100%;
  left: 0;
  position: absolute;
  right: 0;
}
.iframeContainer {
  -webkit-overflow-scrolling: touch;
}
`;
Constants.IFRAME_STYLE_CENTER = `
.${Constants.IFRAME_STYLE_CENTER_CLASS} {
  animation: none 0s ease 0s 1 normal none running;
  background-blend-mode: normal;
  background: none 0 0 / auto repeat scroll padding-box border-box #fff;
  border-collapse: separate;
  border-radius: 8px;
  border: 0px none #333;
  bottom: auto;
  box-shadow: #808080 0 0 22px;
  box-sizing: border-box;
  left: -240px;
  letter-spacing: normal;
  margin-left: calc(100vw - 100vw / 2) !important;
  max-height: 90%;
  overflow: visible;
  position: absolute;
  top: 100%;
  transform: scale(0.8);
  width: 480px;
  z-index: ${MAX_Z_INDEX};
  -webkit-appearance: none;
}
@media (min-height: 667px) {
  .${Constants.IFRAME_STYLE_CENTER_CLASS} {
    max-height: 600px;
  }
}
.${Constants.IFRAME_ACTIVE_CONTAINER_CLASS} {
  top: 50%;
  transform: scale(1.0) translateY(-50%);
}
`;
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
Constants.BUTTON_STYLE = `
.${Constants.GPAY_BUTTON_CLASS} {
  background-origin: content-box;
  background-position: center center;
  background-repeat: no-repeat;
  background-size: contain;
  border: 0px;
  border-radius: 4px;
  box-shadow: rgba(60, 64, 67, 0.3) 0px 1px 1px 0px, rgba(60, 64, 67, 0.15) 0px 1px 3px 1px;
  cursor: pointer;
  height: 40px;
  min-height: 40px;
  padding: 11px 24px;
}

.${Constants.GPAY_BUTTON_CLASS}.black {
  background-color: #000;
  box-shadow: none;
  padding: 12px 24px 10px;
}

.${Constants.GPAY_BUTTON_CLASS}.white {
  background-color: #fff;
}

.${Constants.GPAY_BUTTON_CLASS}.short {
  min-width: 90px;
  width: 160px;
}

.${Constants.GPAY_BUTTON_CLASS}.black.short {
  background-image: url(https://www.gstatic.com/instantbuy/svg/dark_gpay.svg);
}

.${Constants.GPAY_BUTTON_CLASS}.white.short {
  background-image: url(https://www.gstatic.com/instantbuy/svg/light_gpay.svg);
}

.${Constants.GPAY_BUTTON_CLASS}.black.active {
  background-color: #5f6368;
}

.${Constants.GPAY_BUTTON_CLASS}.black.hover {
  background-color: #3c4043;
}

.${Constants.GPAY_BUTTON_CLASS}.white.active {
  background-color: #fff;
}

.${Constants.GPAY_BUTTON_CLASS}.white.focus {
  box-shadow: #e8e8e8 0 1px 1px 0, #e8e8e8 0 1px 3px;
}

.${Constants.GPAY_BUTTON_CLASS}.white.hover {
  background-color: #f8f8f8;
}
`;
Constants.GPAY_BUTTON_WITH_OFFER_ICON_ADDITIONAL_STYLE = 'position: relative;';
Constants.GPAY_OFFER_ICON_CLASS = 'gpay-offer-icon';
Constants.GPAY_OFFER_ICON_SVG = "<svg width=\"20px\" height=\"20px\" viewBox=\"0 0 20 20\" " + "version=\"1.1\" xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=" + "\"http://www.w3.org/1999/xlink\" class=\"gpay-offer-icon\"><defs><path d=\"M19.41,9.58 L10.41,0.58 " + "C10.05,0.22 9.55,0 9,0 L2,0 C0.9,0 0,0.9 0,2 L0,9 C0,9.55 0.22,10.05 " + "0.59,10.42 L9.59,19.42 C9.95,19.78 10.45,20 11,20 C11.55,20 12.05,19.78 " + "12.41,19.41 L19.41,12.41 C19.78,12.05 20,11.55 20,11 C20,10.45 19.77," + "9.94 19.41,9.58 Z\" id=\"path-1\"></path></defs><g id=\"buttons_10.05\"" + " stroke=\"none\" stroke-width=\"1\" fill=\"none\" fill-rule=\"evenodd\">" + "<g id=\"Artboard\" transform=\"translate(-40.000000, -43.000000)\">" + "<g id=\"Group-3\" transform=\"translate(40.000000, 43.000000)\">" + "<g id=\"Group-2-Copy-2\"><g id=\"Group-Copy\"><g id=\"ic_loyalty_24px\">" + "<mask id=\"mask-2\" fill=\"white\"><use xlink:href=\"#path-1\"></use>" + "</mask><use id=\"gpay-Shape\" fill=\"#FF6100\" fill-rule=\"nonzero\" " + "xlink:href=\"#path-1\"></use><path d=\"M3.5,5 C2.67,5 2,4.33 2,3.5 C2," + "2.67 2.67,2 3.5,2 C4.33,2 5,2.67 5,3.5 C5,4.33 4.33,5 3.5,5 Z\" " + "id=\"Path\" fill=\"#FFFFFF\" fill-rule=\"nonzero\" mask=\"url(#mask-2)\">" + "</path></g></g></g><g id=\"Group-13-Copy-7\" transform=\"translate" + "(6.000000, 6.000000)\" fill=\"#FFFFFF\" fill-rule=\"nonzero\">" + "<g id=\"Group-13-Copy-2\"><path d=\"M2.15217391,4.55172414 C0.963561082," + "4.55172414 1.99840144e-14,3.53278598 1.99840144e-14,2.27586207 " + "C1.99840144e-14,1.01893816 0.963561082,6.30606678e-14 2.15217391,6." + "30606678e-14 C3.34078674,6.30606678e-14 4.30434783,1.01893816 4.30434783," + "2.27586207 C4.30434783,3.53278598 3.34078674,4.55172414 2.15217391," + "4.55172414 Z M2.15217391,3.31034483 C2.69245247,3.31034483 3.13043478,2." + "84719112 3.13043478,2.27586207 C3.13043478,1.70453302 2.69245247," + "1.24137931 2.15217391,1.24137931 C1.61189535,1.24137931 1.17391304,1" + ".70453302 1.17391304,2.27586207 C1.17391304,2.84719112 1.61189535,3." + "31034483 2.15217391,3.31034483 Z\" id=\"Combined-Shape\"></path>" + "<path d=\"M6.84782609,9 C5.65921326,9 4.69565217,7.98106184 4.69565217," + "6.72413793 C4.69565217,5.46721402 5.65921326,4.44827586 6.84782609," + "4.44827586 C8.03643892,4.44827586 9,5.46721402 9,6.72413793 C9,7.98106184" + " 8.03643892,9 6.84782609,9 Z M6.84782609,7.75862069 C7.38810465," + "7.75862069 7.82608696,7.29546698 7.82608696,6.72413793 C7.82608696" + ",6.15280888 7.38810465,5.68965517 6.84782609,5.68965517 C6.30754753," + "5.68965517 5.86956522,6.15280888 5.86956522,6.72413793 C5.86956522," + "7.29546698 6.30754753,7.75862069 6.84782609,7.75862069 Z\" " + "id=\"Combined-Shape\"></path><polygon id=\"Rectangle\" " + "transform=\"translate(4.497720, 4.541938) rotate(34.000000) " + "translate(-4.497720, -4.541938) \" points=\"3.77901778 -0.202295978 " + "4.9740273 -0.171019161 5.21642263 9.28617278 4.02141311 9.25489596\">" + "</polygon></g></g></g></g></g></svg>";
Constants.GPAY_OFFER_ICON_STYLE = `
.${Constants.GPAY_OFFER_ICON_CLASS} {
  position: absolute;
  right: -5px;
  top: -5px;
}

#ic_loyalty_24px use.hover {
  fill: #FC853B;
}
`;
Constants.GPAY_OFFER_DESCRIPTION_CLASS = 'gpay-offer-description';
Constants.GPAY_OFFER_DESCRIPTION_STYLE = `
@import url(//fonts.googleapis.com/css?family=Google+Sans:500);
.${Constants.GPAY_OFFER_DESCRIPTION_CLASS} {
  text-align: center;
  font: 10px 'Google Sans';
  margin-top: 2px;
  margin-bottom: 0px;
}

.${Constants.GPAY_OFFER_DESCRIPTION_CLASS}.gpay-btn-clicked {
  color: #3C4043;
}

.${Constants.GPAY_OFFER_DESCRIPTION_CLASS}.short {
  min-width: 90px;
  width: 160px;
}

.${Constants.GPAY_OFFER_DESCRIPTION_CLASS}.long {
  min-width: 152px;
  width: 240px;
}
`;

/**
 * Class used for the new gpay button with card info (last 4 digits, card net).
 *
 * @const {string}
 */
Constants.GPAY_BUTTON_CARD_INFO_CLASS = 'gpay-card-info-btn';
Constants.GPAY_BUTTON_CARD_INFO_BUTTON_STYLE = `
  .${Constants.GPAY_BUTTON_CARD_INFO_CLASS} {
    background-origin: content-box;
    background-position: center center;
    background-repeat: no-repeat;
    background-size: contain;
    border: 0px;
    border-radius: 4px;
    box-shadow: rgba(60, 64, 67, 0.3) 0px 1px 1px 0px, rgba(60, 64, 67, 0.15) 0px 1px 3px 1px;
    cursor: pointer;
    height: 40px;
    min-height: 40px;
    padding: 11px 24px;
    background-color: #000;
    box-shadow: none;
    padding: 9px 24px 10px;
    min-width: 190px;
    width: 240px;
  }

  .${Constants.GPAY_BUTTON_CARD_INFO_CLASS}.active {
    background-color: #5f6368;
  }

  .${Constants.GPAY_BUTTON_CARD_INFO_CLASS}.hover {
    background-color: #3c4043;
  }
  `;

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
exports.injectIframe = injectIframe;
exports.injectStyleSheet = injectStyleSheet;
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
  const styleElement = document.createElement('style');
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
  const container = document.createElement('div');
  container.classList.add(_constants.Constants.IFRAME_CONTAINER_CLASS);
  const iframeContainer = document.createElement('div');
  iframeContainer.classList.add('iframeContainer');
  /** @private @const {!HTMLIFrameElement} */
  const iframe = /** @type {!HTMLIFrameElement} */document.createElement('iframe');
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

const MAX_Z_INDEX = 2147483647;
class Graypane {
  /**
   * @param {!Document} doc
   */
  constructor(doc) {
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
    this.element_.addEventListener('click', () => {
      if (this.popupWindow_) {
        try {
          this.popupWindow_.focus();
        } catch (e) {
          // Ignore error.
        }
      }
    });
  }

  /**
   * Shows the graypane.
   * @param {?Window|undefined} popupWindow
   * @return {!Promise}
   */
  show(popupWindow) {
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
  hide() {
    this.popupWindow_ = null;
    if (!this.element_.parentElement) {
      // Has already been removed or haven't been even added to DOM.
      // This could be possible after redirect.
      return;
    }
    return transition(this.element_, {
      'opacity': 0
    }, 300, 'ease-out').then(() => {
      setImportantStyles(this.element_, {
        'display': 'none'
      });
      this.doc_.body.removeChild(this.element_);
    });
  }
}

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
  for (const k in styles) {
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
  const win = el.ownerDocument.defaultView;
  const previousTransitionValue = el.style.transition || '';
  return new Promise(resolve => {
    win.setTimeout(() => {
      win.setTimeout(resolve, durationMillis);
      const tr = `${durationMillis}ms ${curve}`;
      setImportantStyles(el, Object.assign({
        'transition': `transform ${tr}, opacity ${tr}`
      }, props));
    });
  }).then(() => {
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
 * Supported interactions between iframe and merchant page.
 *
 * @enum {number}
 */
// Next Id: 10
const PostMessageEventType = {
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
const BuyFlowActivityMode = {
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
const PublicErrorCode = {
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
const BuyFlowMode = {
  PAY_WITH_GOOGLE: 5,
  SUBSCRIBE_WITH_GOOGLE: 6
};

/**
 * Iframe used for logging and prefetching.
 *
 * @type {?Element}
 */
exports.BuyFlowMode = BuyFlowMode;
let iframe = null;

/** @type {?PostMessageService} */
let postMessageService = null;

/** @type {?string} */
let environment = null;

/** @type {?string} */
let googleTransactionId = null;

/** @type {number} */
let originTimeMs = Date.now();

/** @type {?BuyFlowActivityMode} */
let buyFlowActivityMode = null;

/** @type {boolean} */
let iframeLoaded = false;

/** @type {!Array<!Object>} */
let buffer = [];
class PayFrameHelper {
  /**
   * Creates a hidden iframe for logging and appends it to the top level
   * document.
   */
  static load() {
    if (iframe) {
      return;
    }
    const initOptions = /** @type {!PaymentOptions} */window['gpayInitParams'] || {};
    environment = initOptions.environment || _constants.Constants.Environment.PRODUCTION;
    iframe = document.createElement('iframe');
    // Pass in origin because document.referrer inside iframe is empty in
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
    };
    // If the body is already loaded, just append the iframe. Otherwise, we wait
    // until the DOM has loaded to append the iframe, otherwise document.body is
    // null.
    if (document.body) {
      PayFrameHelper.initialize_();
    } else {
      document.addEventListener('DOMContentLoaded', () => PayFrameHelper.initialize_());
    }
  }

  /**
   * Appends the iframe to the DOM and updates the post message service.
   * @private
   */
  static initialize_() {
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
  static sendAndWaitForResponse(data, eventType, responseType, responseHandler) {
    function callback(event) {
      if (event.data[responseType]) {
        responseHandler(event);
        // We only want to process the response from the payframe once.
        // so stop listening to the event once processed.
        PayFrameHelper.removeMessageEventListener_(callback);
      }
    }
    PayFrameHelper.addMessageEventListener_(callback);
    const postMessageData = Object.assign({
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
  static addMessageEventListener_(callback) {
    window.addEventListener('message', callback);
  }

  /**
   * Remove the event listener for listening to messages.
   *
   * @param {function(!Event)} callback
   * @private
   */
  static removeMessageEventListener_(callback) {
    window.removeEventListener('message', callback);
  }

  /**
   * Posts a message to the iframe with the given data.
   *
   * @param {!Object} data
   */
  static postMessage(data) {
    if (!iframeLoaded) {
      buffer.push(data);
      return;
    }
    const postMessageData = Object.assign({
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
  static setBuyFlowActivityMode(mode) {
    buyFlowActivityMode = mode;
  }

  /**
   * Sets the google transaction id.
   *
   * @param {string} txnId
   */
  static setGoogleTransactionId(txnId) {
    googleTransactionId = txnId;
  }

  /**
   * Sets the originTimeMs. To be used only for tests.
   *
   * @param {number} originTimeMsTemp
   */
  static setOriginTimeMs(originTimeMsTemp) {
    originTimeMs = originTimeMsTemp;
  }

  /**
   * Override postMessageService for testing.
   *
   * @param {!PostMessageService} messageService
   */
  static setPostMessageService(messageService) {
    postMessageService = messageService;
  }

  /**
   * Clears the singleton variables.
   */
  static reset() {
    iframe = null;
    buffer.length = 0;
    iframeLoaded = false;
    buyFlowActivityMode = null;
  }

  /**
   * Sets whether the iframe has been loaded or not.
   *
   * @param {boolean} loaded
   */
  static setIframeLoaded(loaded) {
    iframeLoaded = loaded;
  }

  /**
   * Called whenever the iframe is loaded.
   */
  static iframeLoaded() {
    iframeLoaded = true;
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
  static getBuffer() {
    return buffer;
  }

  /**
   * Mocks the iframe as an arbitrary html element instead of actually injecting
   * it for testing.
   */
  static injectIframeForTesting() {
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
  static getIframeOrigin_() {
    let iframeUrl = 'https://pay';
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
  static getIframeUrl_(origin, merchantId) {
    // TrustedResourceUrl header needs to start with https or '//'.
    const iframeUrl = `https://pay${environment == _constants.Constants.Environment.PREPROD ? '-preprod.sandbox' : environment == _constants.Constants.Environment.SANDBOX ? '.sandbox' : ''}.google.com/gp/p/ui/payframe?origin=${origin}&mid=%{merchantId}`;
    return iframeUrl;
  }
}
exports.PayFrameHelper = PayFrameHelper;

},{"./constants.js":87,"./post_message_service.js":95}],91:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PaymentsAsyncClient = void 0;
var _pay_frame_helper = require("./pay_frame_helper.js");
var _constants = require("./constants.js");
var _payments_client_delegate_interface = require("./payments_client_delegate_interface.js");
var _payments_request_delegate = require("./payments_request_delegate.js");
var _payments_web_activity_delegate = require("./payments_web_activity_delegate.js");
var _upi_handler = require("./upi_handler.js");
var _validator = require("./validator.js");
var _utils = require("./utils.js");
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

const {
  ActivityPorts
} = require('web-activities/activity-ports');
const TRUSTED_DOMAINS = ['actions.google.com', 'amp-actions.sandbox.google.com', 'amp-actions-staging.sandbox.google.com', 'amp-actions-autopush.sandbox.google.com', 'payments.developers.google.com', 'payments.google.com'];

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
class PaymentsAsyncClient {
  /**
   * @param {!PaymentOptions} paymentOptions
   * @param {function(!Promise<!PaymentData>)} onPaymentResponse
   * @param {boolean=} useIframe
   * @param {!ActivityPorts=} activities Can be used to provide a shared
   *   activities manager. By default, the new manager is created.
   */
  constructor(paymentOptions, onPaymentResponse, useIframe, activities) {
    this.onPaymentResponse_ = onPaymentResponse;
    (0, _validator.validatePaymentOptions)(paymentOptions);

    /** @private {?number} */
    this.loadPaymentDataApiStartTimeMs_ = null;

    /** @private @const {string} */
    this.environment_ = paymentOptions.environment || _constants.Constants.Environment.TEST;
    if (!PaymentsAsyncClient.googleTransactionId_) {
      PaymentsAsyncClient.googleTransactionId_ = /** @type {string} */this.isInTrustedDomain_() && paymentOptions['i'] && paymentOptions['i']['googleTransactionId'] ? paymentOptions['i']['googleTransactionId'] : (0, _utils.createGoogleTransactionId)(this.environment_);
    }

    /** @private @const {!PaymentOptions} */
    this.paymentOptions_ = paymentOptions;

    /** @private @const {!PaymentsClientDelegateInterface} */
    this.webActivityDelegate_ = new _payments_web_activity_delegate.PaymentsWebActivityDelegate(this.environment_, PaymentsAsyncClient.googleTransactionId_, useIframe, activities, paymentOptions['i'] && paymentOptions['i']['redirectKey']);

    /** @private {number} */
    this.buyFlowMode_ = _pay_frame_helper.BuyFlowMode.PAY_WITH_GOOGLE;
    const paymentRequestSupported = (0, _validator.chromeSupportsPaymentRequest)();
    // TODO: Remove the temporary hack that disable payments
    // request for inline flow.
    /** @private @const {?PaymentsClientDelegateInterface} */
    this.delegate_ = paymentRequestSupported && !useIframe ? new _payments_request_delegate.PaymentsRequestDelegate(this.environment_) : this.webActivityDelegate_;
    this.upiHandler_ = new _upi_handler.UpiHandler();
    this.webActivityDelegate_.onResult(this.onResult_.bind(this));
    this.delegate_.onResult(this.onResult_.bind(this));

    // Load PayFrameHelper upon client construction.
    _pay_frame_helper.PayFrameHelper.load();

    // If web delegate is used anyway then this is overridden in the web
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
    window.addEventListener('message', event => this.handleMessageEvent_(event));
  }

  /**
   * Check whether the user can make payments using the Payment API.
   *
   * @param {!IsReadyToPayRequest} isReadyToPayRequest
   * @return {!Promise} The promise will contain the boolean result and error
   *     message when possible.
   */
  isReadyToPay(isReadyToPayRequest) {
    // Merge with paymentOptions, preferring values from isReadyToPayRequest
    if (isReadyToPayRequest) {
      isReadyToPayRequest = Object.assign({}, this.paymentOptions_, isReadyToPayRequest);
    }
    const startTimeMs = Date.now();
    /** @type {?string} */
    const errorMessage = (0, _validator.validateSecureContext)() || (0, _validator.validateIsReadyToPayRequest)(isReadyToPayRequest);
    if (errorMessage) {
      return new Promise((resolve, reject) => {
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
    const isReadyToPayPromise = this.isReadyToPay_(isReadyToPayRequest);
    isReadyToPayPromise.then(response => {
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
  isReadyToPay_(isReadyToPayRequest) {
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
        const webPromise = this.webActivityDelegate_.isReadyToPay(isReadyToPayRequest);
        const nativePromise = this.delegate_.isReadyToPay(isReadyToPayRequest);
        if ((0, _validator.doesMerchantSupportOnlyTokenizedCards)(isReadyToPayRequest) && !(0, _validator.chromeSupportsPaymentHandler)()) {
          return nativePromise;
        }
        // Return webIsReadyToPay only if delegateIsReadyToPay has been
        // executed.
        return nativePromise.then(() => webPromise);
      }
    }
    const webPromise = this.webActivityDelegate_.isReadyToPay(isReadyToPayRequest);
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
  isReadyToPayApiV2ForChromePaymentRequest_(isReadyToPayRequest) {
    let defaultPromise = Promise.resolve({
      'result': false
    });
    if (isReadyToPayRequest.existingPaymentMethodRequired) {
      defaultPromise = Promise.resolve({
        'result': false,
        'paymentMethodPresent': false
      });
    }
    let nativePromise = defaultPromise;
    if ((0, _validator.apiV2DoesMerchantSupportSpecifiedCardType)(isReadyToPayRequest, _constants.Constants.AuthMethod.CRYPTOGRAM_3DS)) {
      // If the merchant supports tokenized cards.
      // Make a separate call to gms core to check if the user isReadyToPay
      // with just tokenized cards. We can't pass in PAN_ONLY here
      // because gms core always returns true for PAN_ONLY.
      // Leave other payment methods as is.
      const nativeRtpRequest /** @type {!IsReadyToPayRequest} */ = JSON.parse(JSON.stringify(isReadyToPayRequest));
      for (let i = 0; i < nativeRtpRequest.allowedPaymentMethods.length; i++) {
        if (nativeRtpRequest.allowedPaymentMethods[i].type == _constants.Constants.PaymentMethod.CARD) {
          nativeRtpRequest.allowedPaymentMethods[i].parameters['allowedAuthMethods'] = [_constants.Constants.AuthMethod.CRYPTOGRAM_3DS];
        }
      }
      nativePromise = this.delegate_.isReadyToPay(nativeRtpRequest);
    }
    let webPromise = defaultPromise;
    if ((0, _validator.apiV2DoesMerchantSupportSpecifiedCardType)(isReadyToPayRequest, _constants.Constants.AuthMethod.PAN_ONLY)) {
      webPromise = this.webActivityDelegate_.isReadyToPay(isReadyToPayRequest);
    }

    // Update session storage with payment handler canMakePayment result but
    // rely on web delegate for actual response
    if ((0, _validator.chromeSupportsPaymentHandler)()) {
      return nativePromise.then(() => webPromise);
    }
    return nativePromise.then(nativeResult => {
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
   */
  prefetchPaymentData(paymentDataRequest) {
    /** @type {?string} */
    const errorMessage = (0, _validator.validateSecureContext)() || (0, _validator.validatePaymentDataRequest)(paymentDataRequest);
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
   */
  loadPaymentData(paymentDataRequest) {
    _pay_frame_helper.PayFrameHelper.postMessage({
      'eventType': _pay_frame_helper.PostMessageEventType.LOG_BUTTON_CLICK
    });
    const errorMessage = (0, _validator.validateSecureContext)() || (0, _validator.validatePaymentDataRequest)(paymentDataRequest);
    this.buyFlowMode_ = paymentDataRequest && paymentDataRequest.swg ? _pay_frame_helper.BuyFlowMode.SUBSCRIBE_WITH_GOOGLE : _pay_frame_helper.BuyFlowMode.PAY_WITH_GOOGLE;
    if (errorMessage) {
      this.onPaymentResponse_(new Promise((resolve, reject) => {
        _pay_frame_helper.PayFrameHelper.postMessage({
          'eventType': _pay_frame_helper.PostMessageEventType.LOG_LOAD_PAYMENT_DATA_API,
          'error': _pay_frame_helper.PublicErrorCode.DEVELOPER_ERROR,
          'buyFlowMode': this.buyFlowMode_
        });
        PaymentsAsyncClient.logDevErrorToConsole_('loadPaymentData', errorMessage);
        reject({
          'statusCode': _constants.Constants.ResponseStatus.DEVELOPER_ERROR,
          'statusMessage': errorMessage
        });
      }));
      return;
    }

    // Handler for UPI PaymentMethod
    // Currently we don't support UPI along with other payment methods, if
    // UPI is in payment methods then we assume it is UPI only.
    const upiPaymentMethod = (0, _validator.getUpiPaymentMethod)(paymentDataRequest);
    if (upiPaymentMethod) {
      this.upiHandler_.loadPaymentData(paymentDataRequest, upiPaymentMethod, this.onResult_.bind(this));
      return;
    }
    this.loadPaymentDataApiStartTimeMs_ = Date.now();
    this.assignInternalParams_(paymentDataRequest);
    // We want to fall back to the web delegate if payment handler is supported
    // and isReadyToPay bit is not explicitly set to true (fallback to web if
    // isReadyToPay wasn't called for PH)
    if ((0, _validator.chromeSupportsPaymentHandler)() || isNativeDisabledInRequest(paymentDataRequest)) {
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
  static logDevErrorToConsole_(apiName, errorMessage) {
    console.error('DEVELOPER_ERROR in ' + apiName + ' : ' + errorMessage);
  }

  /**
   * Return a <div> element containing a Google Pay payment button.
   *
   * @param {!ButtonOptions=} options
   * @return {!Element}
   */
  createButton() {
    let options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    const button = null;
    // Only log if button was created successfully
    const startTimeMs = Date.now();
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
  handleMessageEvent_(e) {
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
  isInTrustedDomain_() {
    return TRUSTED_DOMAINS.indexOf(window.location.hostname) != -1;
  }

  /**
   * Called when load payment data result is returned. This triggers the payment
   * response callback passed to the client.
   *
   * @private
   */
  onResult_(response) {
    response.then(result => {
      _pay_frame_helper.PayFrameHelper.postMessage({
        'eventType': _pay_frame_helper.PostMessageEventType.LOG_LOAD_PAYMENT_DATA_API,
        'clientLatencyStartMs': this.loadPaymentDataApiStartTimeMs_,
        'buyFlowMode': this.buyFlowMode_
      });
    }).catch(result => {
      if (result['errorCode']) {
        _pay_frame_helper.PayFrameHelper.postMessage({
          'eventType': _pay_frame_helper.PostMessageEventType.LOG_LOAD_PAYMENT_DATA_API,
          'error': /** @type {!PublicErrorCode} */result['errorCode'],
          'buyFlowMode': this.buyFlowMode_
        });
      } else {
        // If user closes window we don't get a error code
        _pay_frame_helper.PayFrameHelper.postMessage({
          'eventType': _pay_frame_helper.PostMessageEventType.LOG_LOAD_PAYMENT_DATA_API,
          'error': _pay_frame_helper.PublicErrorCode.BUYER_CANCEL,
          'buyFlowMode': this.buyFlowMode_
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
  assignInternalParams_(paymentDataRequest) {
    const internalParam = {
      'startTimeMs': Date.now(),
      'googleTransactionId': PaymentsAsyncClient.googleTransactionId_
    };
    paymentDataRequest['i'] = paymentDataRequest['i'] ? Object.assign(internalParam, paymentDataRequest['i']) : internalParam;
    return paymentDataRequest;
  }
}

/** @type {?string} */
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

},{"./constants.js":87,"./pay_frame_helper.js":90,"./payments_client_delegate_interface.js":92,"./payments_request_delegate.js":93,"./payments_web_activity_delegate.js":94,"./upi_handler.js":96,"./utils.js":97,"./validator.js":98,"web-activities/activity-ports":3}],92:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PaymentsClientDelegateInterface = void 0;
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
class PaymentsClientDelegateInterface {
  /**
   * Check whether the user can make payments using the Payment API.
   *
   * @param {!IsReadyToPayRequest} isReadyToPayRequest
   * @return {!Promise} The promise will contain the boolean result and error
   *     message when possible.
   */
  isReadyToPay(isReadyToPayRequest) {}

  /**
   * Prefetch paymentData to speed up loadPaymentData call. Note the provided
   * paymentDataRequest should exactly be the same as provided in
   * loadPaymentData to make the loadPaymentData call fast.
   *
   * @param {!PaymentDataRequest} paymentDataRequest Provides necessary
   *     information to support a payment.
   */
  prefetchPaymentData(paymentDataRequest) {}

  /**
   * Request PaymentData, which contains necessary infomartion to complete a
   * payment.
   *
   * @param {!PaymentDataRequest} paymentDataRequest Provides necessary
   *     information to support a payment.
   */
  loadPaymentData(paymentDataRequest) {}

  /**
   * @param {function(!Promise<!PaymentData>)} callback
   */
  onResult(callback) {}
}
exports.PaymentsClientDelegateInterface = PaymentsClientDelegateInterface;

},{}],93:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PaymentsRequestDelegate = void 0;
var _constants = require("./constants.js");
var _payments_client_delegate_interface = require("./payments_client_delegate_interface.js");
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
 * @fileoverview Description of this file.
 */

/**
 * An implementation of PaymentsClientDelegateInterface that leverages payment
 * request.
 * @implements {PaymentsClientDelegateInterface}
 */
class PaymentsRequestDelegate {
  /**
   * @param {string} environment
   */
  constructor(environment) {
    this.environment_ = environment;

    /** @private {?function(!Promise<!PaymentData>)} */
    this.callback_ = null;
  }

  /** @override */
  onResult(callback) {
    this.callback_ = callback;
  }

  /** @override */
  isReadyToPay(isReadyToPayRequest) {
    /** @type{!PaymentRequest} */
    const paymentRequest = this.createPaymentRequest_(isReadyToPayRequest);
    return new Promise((resolve, reject) => {
      paymentRequest.canMakePayment().then(result => {
        window.sessionStorage.setItem(_constants.Constants.IS_READY_TO_PAY_RESULT_KEY, result.toString());
        const response = {
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
      }).catch(function (err) {
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
  prefetchPaymentData(paymentDataRequest) {
    // Creating PaymentRequest instance will call
    // Gcore isReadyToPay internally which will prefetch tempaltes.
    this.createPaymentRequest_(paymentDataRequest, this.environment_, paymentDataRequest.transactionInfo.currencyCode, paymentDataRequest.transactionInfo.totalPrice);
  }

  /** @override */
  loadPaymentData(paymentDataRequest) {
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
  createPaymentRequest_(request, environment, currencyCode, totalPrice) {
    let data = {};
    if (request) {
      data = JSON.parse(JSON.stringify(request));
    }

    // Only set the apiVersion if the merchant doesn't set it.
    if (!data['apiVersion']) {
      data['apiVersion'] = 1;
    }

    // Add allowedPaymentMethods for swg to get through gms core validation.
    if (data['swg']) {
      data['allowedPaymentMethods'] = [_constants.Constants.PaymentMethod.CARD];
    }
    if (environment && environment == _constants.Constants.Environment.TEST) {
      data['environment'] = environment;
    }
    const supportedInstruments = [{
      'supportedMethods': ['https://google.com/pay'],
      'data': data
    }];
    const details = {
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
  loadPaymentDataThroughPaymentRequest_(paymentDataRequest) {
    const currencyCode = paymentDataRequest.transactionInfo && paymentDataRequest.transactionInfo.currencyCode || undefined;
    const totalPrice = paymentDataRequest.transactionInfo && paymentDataRequest.transactionInfo.totalPrice || undefined;
    const paymentRequest = this.createPaymentRequest_(paymentDataRequest, this.environment_, currencyCode, totalPrice);
    this.callback_( /** @type{!Promise<!PaymentData>} */
    paymentRequest.show().then(
    /**
     * @param {!PaymentResponse} paymentResponse
     * @return {!PaymentData}
     */
    paymentResponse => {
      // Should be called to dismiss any remaining UI
      paymentResponse.complete('success');
      return paymentResponse.details;
    }).catch(function (err) {
      err['statusCode'] = _constants.Constants.ResponseStatus.CANCELED;
      throw err;
    }));
  }
}
exports.PaymentsRequestDelegate = PaymentsRequestDelegate;

},{"./constants.js":87,"./payments_client_delegate_interface.js":92}],94:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PaymentsWebActivityDelegate = void 0;
var _pay_frame_helper = require("./pay_frame_helper.js");
var _constants = require("./constants.js");
var _graypane = require("./graypane.js");
var _payments_client_delegate_interface = require("./payments_client_delegate_interface.js");
var _validator = require("./validator.js");
var _element_injector = require("./element_injector.js");
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

const {
  ActivityPort,
  ActivityPorts,
  ActivityIframePort
} = require('web-activities/activity-ports');
const GPAY_ACTIVITY_REQUEST = 'GPAY';
const IFRAME_CLOSE_DURATION_IN_MS = 250;
const IFRAME_SHOW_UP_DURATION_IN_MS = 250;
const IFRAME_SMOOTH_HEIGHT_TRANSITION = `height ${IFRAME_SHOW_UP_DURATION_IN_MS}ms`;
const ERROR_PREFIX = 'Error: ';

/**
 * Supported browser user agent keys.
 *
 * @enum {string}
 */
const BrowserUserAgent = {
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
let ResizePayload;

/**
 * An implementation of PaymentsClientDelegateInterface that uses the custom
 * hosting page along with web activities to actually get to the hosting page.
 * @implements {PaymentsClientDelegateInterface}
 */
class PaymentsWebActivityDelegate {
  /**
   * @param {string} environment
   * @param {string} googleTransactionId
   * @param {boolean=} useIframe
   * @param {!ActivityPorts=} activities Can be used to provide a shared
   *   activities manager. By default, the new manager is created.
   * @param {?string=} redirectKey The redirect key used for redirect mode.
   */
  constructor(environment, googleTransactionId, useIframe, activities, redirectKey) {
    this.environment_ = environment;
    /** @private @const {boolean} */

    /** @const {!ActivityPorts} */
    this.activities = activities || new ActivityPorts(window);
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
    this.savedResizePayload_ = null;

    // Only install dialog styles when iframing is allowed.
    if (null) {
      (0, _element_injector.injectStyleSheet)(_constants.Constants.IFRAME_STYLE);
      if (null) {
        (0, _element_injector.injectStyleSheet)(_constants.Constants.IFRAME_STYLE_CENTER);
      }
    }
  }

  /** @override */
  onResult(callback) {
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
  onActivityResult_(port) {
    // Hide the graypane.
    this.graypane_.hide();
    // Only verified origins are allowed.
    this.callback_(port.acceptResult().then(result => {
      // Origin must always match: popup, iframe or redirect.
      if (result.origin != this.getOrigin_()) {
        throw new Error('channel mismatch');
      }
      const data = /** @type {!PaymentData} */result.data;
      if (data['redirectEncryptedCallbackData']) {
        _pay_frame_helper.PayFrameHelper.setBuyFlowActivityMode(_pay_frame_helper.BuyFlowActivityMode.REDIRECT);
        return this.fetchRedirectResponse_(data['redirectEncryptedCallbackData']).then(decrypedJson => {
          // Merge other non-encrypted fields into the final response.
          const clone = Object.assign({}, data);
          delete clone['redirectEncryptedCallbackData'];
          return Object.assign(clone, decrypedJson);
        });
      }
      // Unencrypted data supplied: must be a verified and secure channel.
      if (!result.originVerified || !result.secureChannel) {
        throw new Error('channel mismatch');
      }
      return data;
    }, error => {
      // TODO: Log the original and the inferred error to eye3.
      const originalError = error['message'];
      let inferredError = error['message'];
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
  fetchRedirectResponse_(redirectEncryptedCallbackData) {
    // This method has to rely on the legacy XHR API because the redirect
    // functionality is, in part, aimed at older browsers.
    return new Promise((resolve, reject) => {
      const url = this.getDecryptionUrl_();
      const xhr = new XMLHttpRequest();
      xhr.open('POST', url, true);
      if ('withCredentials' in xhr) {
        // It's fine to proceed in a non-redirect mode because redirectVerifier
        // plays the part of CORS propagation.
        xhr.withCredentials = true;
      }
      xhr.onreadystatechange = () => {
        if (xhr.readyState < /* STATUS_RECEIVED */2) {
          return;
        }
        if (xhr.status < 100 || xhr.status > 599) {
          xhr.onreadystatechange = null;
          reject(new Error(`Unknown HTTP status ${xhr.status}`));
          return;
        }
        if (xhr.readyState == /* COMPLETE */4) {
          try {
            resolve(JSON.parse(xhr.responseText));
          } catch (e) {
            // JSON parsing error is expected here.
            reject(e);
          }
        }
      };
      xhr.onerror = () => {
        reject(new Error('Network failure'));
      };
      xhr.onabort = () => {
        reject(new Error('Request aborted'));
      };

      // Send POST.
      xhr.send(redirectEncryptedCallbackData);
    });
  }

  /** @override */
  isReadyToPay(isReadyToPayRequest) {
    return new Promise((resolve, reject) => {
      if ((0, _validator.doesMerchantSupportOnlyTokenizedCards)(isReadyToPayRequest)) {
        resolve({
          'result': false
        });
        return;
      }
      const userAgent = window.navigator.userAgent;
      const isIosGsa = userAgent.indexOf('GSA/') > 0 && userAgent.indexOf(BrowserUserAgent.SAFARI) > 0;
      // pop up in IGSA doesn't work.
      if (isIosGsa && !null) {
        resolve({
          'result': false
        });
        return;
      }
      const isFirefoxIos = userAgent.indexOf('FxiOS') > 0;
      if (isFirefoxIos) {
        resolve({
          'result': false
        });
        return;
      }
      const isSupported = userAgent.indexOf(BrowserUserAgent.CHROME) > 0 || userAgent.indexOf(BrowserUserAgent.FIREFOX) > 0 || userAgent.indexOf(BrowserUserAgent.SAFARI) > 0;
      if (isSupported && isReadyToPayRequest.apiVersion >= 2 && isReadyToPayRequest.existingPaymentMethodRequired) {
        isReadyToPayRequest.environment = this.environment_;
        _pay_frame_helper.PayFrameHelper.sendAndWaitForResponse(isReadyToPayRequest, _pay_frame_helper.PostMessageEventType.IS_READY_TO_PAY, 'isReadyToPayResponse', function (event) {
          const response = {
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
  prefetchPaymentData(paymentDataRequest) {
    // Only handles prefetch for iframe for now.
    if (!null) {
      return;
    }
    const containerAndFrame = this.injectIframe_(paymentDataRequest);
    const paymentDataPromise = this.openIframe_(containerAndFrame['container'], containerAndFrame['iframe'], paymentDataRequest);
    this.prefetchedObjects_ = {
      'container': containerAndFrame['container'],
      'iframe': containerAndFrame['iframe'],
      'request': paymentDataRequest,
      'dataPromise': paymentDataPromise
    };
  }

  /** @override */
  loadPaymentData(paymentDataRequest) {
    if (!paymentDataRequest.swg) {
      // Only set the apiVersion if the merchant is not setting it.
      if (!paymentDataRequest.apiVersion) {
        paymentDataRequest.apiVersion = 1;
      }
    }
    paymentDataRequest.environment = this.environment_;
    if (null) {
      _pay_frame_helper.PayFrameHelper.setBuyFlowActivityMode(_pay_frame_helper.BuyFlowActivityMode.IFRAME);
      // TODO: Compare the request with prefetched request.
      let containerAndFrame;
      let paymentDataPromise;
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
      const onPopState = e => {
        e.preventDefault();
        this.backButtonHandler_(containerAndFrame);
        window.removeEventListener('popstate', onPopState);
      };
      window.addEventListener('popstate', onPopState);
      const dismissPromise = new Promise(resolve => {
        this.dismissPromiseResolver_ = resolve;
      });
      this.callback_(Promise.race([paymentDataPromise, dismissPromise]));
      return;
    }
    _pay_frame_helper.PayFrameHelper.setBuyFlowActivityMode(paymentDataRequest['forceRedirect'] ? _pay_frame_helper.BuyFlowActivityMode.REDIRECT : _pay_frame_helper.BuyFlowActivityMode.POPUP);
    const opener = this.activities.open(GPAY_ACTIVITY_REQUEST, this.getHostingPageUrl_(), this.getRenderMode_(paymentDataRequest), paymentDataRequest, {
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
  getRenderMode_(paymentDataRequest) {
    return paymentDataRequest['forceRedirect'] ? '_top' : 'gp-js-popup';
  }

  /**
   * Returns the server origin based on the environment.
   *
   * @private
   * @return {string}
   */
  getOrigin_() {
    if (this.environment_ == _constants.Constants.Environment.LOCAL) {
      return '';
    }
    let baseDomain;
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
  getBasePath_() {
    return this.getOrigin_() + '/gp/p';
  }

  /**
   * Returns the decryption url to be used to decrypt the encrypted payload.
   *
   * @private
   * @return {string} The decryption url
   */
  getDecryptionUrl_() {
    let url = this.getBasePath_() + '/apis/buyflow/process';
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
  getHostingPageUrl_() {
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
  getIframeUrl(environment, origin) {
    // TODO: These should be compile time constants and not dependent
    // on the environment.
    let iframeUrl = `https://pay.google.com/gp/p/ui/pay?origin=${origin}`;
    if (environment == _constants.Constants.Environment.SANDBOX || environment == _constants.Constants.Environment.PREPROD) {
      iframeUrl = `https://pay'+  (environment == Constants.Environment.PREPROD ? '-preprod' : '')+  '.sandbox.google.com/gp/p/ui/pay?origin=${origin}`;
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
  removeIframeAndContainer_(container, iframe) {
    const transitionStyle = 'all ' + IFRAME_CLOSE_DURATION_IN_MS + 'ms ease 0s';
    this.setTransition_(iframe, transitionStyle);
    iframe.height = '0px';
    // TODO: This should be replaced by listening to TransitionEnd event
    setTimeout(() => {
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
  injectIframe_(paymentDataRequest) {
    const containerAndFrame = (0, _element_injector.injectIframe)(this.isVerticalCenterExperimentEnabled_(paymentDataRequest) ? _constants.Constants.IFRAME_STYLE_CENTER_CLASS : _constants.Constants.IFRAME_STYLE_CLASS);
    const iframe = containerAndFrame['iframe'];
    const container = containerAndFrame['container'];
    container.addEventListener('click', this.closeActionHandler_.bind(this, containerAndFrame));
    // Hide iframe and disable resize at initialize.
    container.style.display = 'none';
    iframe.style.display = 'none';
    iframe.height = '0px';
    const transitionStyle = 'all ' + IFRAME_SHOW_UP_DURATION_IN_MS + 'ms ease 0s';
    this.setTransition_(iframe, transitionStyle);
    this.shouldHandleResizing_ = false;
    return containerAndFrame;
  }

  /**
   * Handler when back button is triggered, should dismiss iframe if present.
   * @param {{container: !Element, iframe:!HTMLIFrameElement}} containerAndFrame
   * @private
   */
  backButtonHandler_(containerAndFrame) {
    this.dismissIframe_(containerAndFrame);
  }

  /**
   * Handler when close action is triggered, will pop history state to close
   * the iframe.
   * @param {{container: !Element, iframe:!HTMLIFrameElement}} containerAndFrame
   * @private
   */
  closeActionHandler_(containerAndFrame) {
    if (containerAndFrame['container'].parentNode) {
      // Close action only when container is still attached to the page.
      history.back();
    }
  }

  /**
   * @param {{container: !Element, iframe:!HTMLIFrameElement}} containerAndFrame
   * @private
   */
  dismissIframe_(containerAndFrame) {
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
  isVerticalCenterExperimentEnabled_(paymentDataRequest) {
    return null && paymentDataRequest['i'] && paymentDataRequest['i'].renderContainerCenter;
  }

  /**
   * @param {!Element} container
   * @param {!HTMLIFrameElement} iframe
   * @param {!PaymentDataRequest} paymentDataRequest
   * @private
   */
  showContainerAndIframeWithAnimation_(container, iframe, paymentDataRequest) {
    container.style.display = 'block';
    iframe.style.display = 'block';
    setTimeout(() => {
      // Hard code the apprx height here, it will be resize to expected height
      // later.
      iframe.height = '280px';
      if (this.isVerticalCenterExperimentEnabled_(paymentDataRequest)) {
        iframe.classList.add(_constants.Constants.IFRAME_ACTIVE_CONTAINER_CLASS);
      }
      // TODO: This should be handles properly by listening to
      // TransitionEnd event.
      setTimeout(() => {
        this.shouldHandleResizing_ = true;
        // TODO: Add browser test that catches this.
        if (this.savedResizePayload_) {
          this.setTransition_(iframe, this.savedResizePayload_['transition']);
          iframe.height = this.savedResizePayload_['height'];
          this.savedResizePayload_ = null;
        }
      }, IFRAME_SHOW_UP_DURATION_IN_MS);
    }, 1);
  }

  /**
   * @param {!HTMLIFrameElement} iframe
   * @param {string} transitionStyle
   * @private
   */
  setTransition_(iframe, transitionStyle) {
    iframe.style.setProperty('transition', transitionStyle);
    // For safari.
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
  openIframe_(container, iframe, paymentDataRequest) {
    if (!paymentDataRequest.swg) {
      if (!paymentDataRequest.apiVersion) {
        paymentDataRequest.apiVersion = 1;
      }
    }
    paymentDataRequest.environment = this.environment_;
    let iframeLoadStartTime;
    const trustedUrl = this.getIframeUrl(this.environment_, window.location.origin);
    return this.activities.openIframe(iframe, trustedUrl, paymentDataRequest).then(port => {
      // Handle custom resize message.
      this.port_ = port;
      port.onMessage(payload => {
        if (payload['type'] !== 'resize' || !this.shouldHandleResizing_) {
          // Save the resize event later after initial animation is finished
          this.savedResizePayload_ = {
            'height': payload['height'],
            'transition': payload['transition']
          };
          return;
        }
        // b/111310899: Smooth out initial iFrame loading
        if (!iframeLoadStartTime) {
          iframeLoadStartTime = Date.now();
        }
        if (Date.now() < iframeLoadStartTime + IFRAME_SHOW_UP_DURATION_IN_MS) {
          this.setTransition_(iframe, payload['transition'] + ', ' + IFRAME_SMOOTH_HEIGHT_TRANSITION);
        } else {
          this.setTransition_(iframe, payload['transition']);
        }
        iframe.height = payload['height'];
      });
      return (/** @type {!Promise<!Object>} */port.acceptResult()
      );
    }).then(
    /**
     * @param {!Object} result
     * @return {!PaymentData}
     */
    result => {
      this.removeIframeAndContainer_(container, iframe);
      // This is only for popping the state we pushed earlier.
      history.back();
      const data = /** @type {!PaymentData} */result['data'];
      return data;
    }, error => {
      this.removeIframeAndContainer_(container, iframe);
      // This is only for popping the state we pushed earlier.
      history.back();
      return Promise.reject(error);
    });
  }
}
exports.PaymentsWebActivityDelegate = PaymentsWebActivityDelegate;

},{"./constants.js":87,"./element_injector.js":88,"./graypane.js":89,"./pay_frame_helper.js":90,"./payments_client_delegate_interface.js":92,"./validator.js":98,"web-activities/activity-ports":3}],95:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PostMessageService = void 0;
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
class PostMessageService {
  constructor(window) {
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
  postMessage(message, targetOrigin) {
    this.window_.postMessage(message, targetOrigin);
  }
}
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

class UpiHandler {
  constructor() {}

  /**
   * Returns upi payment method object if it exists in allowed payment methods
   * or null if it doesn't
   *
   * @param {!IsReadyToPayRequest|!PaymentDataRequest} request
   * @return {boolean}
   */
  isUpiRequest(request) {
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
  isReadyToPay(request) {
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
  loadPaymentData(paymentDataRequest, upiPaymentMethod, onResultCallback) {
    const parameters = upiPaymentMethod['parameters'];
    const transactionInfo = paymentDataRequest['transactionInfo'];
    const supportedInstruments = null ? [{
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
    const details = {
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
    let request = new PaymentRequest(supportedInstruments, details);
    onResultCallback(this.checkCanMakePayment_(request).then(result => {
      if (result) {
        return this.showUi_(request);
      } else {
        return this.redirectToGooglePlay_();
      }
    }).then(paymentData => {
      return this.processData_(paymentData, paymentDataRequest, upiPaymentMethod);
    }).catch(error => {
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
  showUi_(request) {
    return request.show().then(paymentResponse => {
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
  checkCanMakePayment_(request) {
    // Checks canMakePayment cache, and use the cache result if it exists.
    const cacheResult = window.sessionStorage.getItem(_constants.Constants.UPI_CAN_MAKE_PAYMENT_CACHE_KEY);
    if (cacheResult) {
      return Promise.resolve(cacheResult === 'true');
    }

    // Feature detect canMakePayment().
    if (!request.canMakePayment) {
      return Promise.resolve(true);
    }
    let canMakePaymentPromise = request.canMakePayment();
    return canMakePaymentPromise.then(result => {
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
  redirectToGooglePlay_() {
    window.location.replace(null ? 'https://play.google.com/store/apps/details?id=com.google.android.apps.nbu.paisa.user.teamfood ' :
    // NOLINT
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
  processData_(tezPaymentData, paymentDataRequest, upiPaymentMethod) {
    const tezResponse = JSON.parse(tezPaymentData['tezResponse']);
    if (tezResponse['Status'] === 'FAILURE') {
      let error;
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
    const signedMessage = {
      'paymentMethodType': 'UPI',
      'payeeVpa': upiPaymentMethod['parameters']['payeeVpa'],
      'status': tezResponse['Status'],
      'transactionReferenceId': upiPaymentMethod['parameters']['transactionReferenceId'],
      'transactionId': upiPaymentMethod['parameters']['transactionId'] ? upiPaymentMethod['parameters']['transactionId'] : tezResponse['txnId'],
      'transactionInfo': paymentDataRequest['transactionInfo']
    };
    let paymentData = {
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
}
exports.UpiHandler = UpiHandler;

},{"./constants.js":87,"./pay_frame_helper.js":90,"./validator.js":98}],97:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createGoogleTransactionId = createGoogleTransactionId;
var _RandomUuid = _interopRequireDefault(require("../third_party/random_uuid/Random.uuid.js"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
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
  return _RandomUuid.default.uuidFast() + '.' + environment;
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
exports.validatePaymentDataRequest = validatePaymentDataRequest;
exports.validatePaymentOptions = validatePaymentOptions;
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
  }

  // Payment handler isn't supported on mobile
  const mobilePlatform = window.navigator.userAgent.match(/Android|iPhone|iPad|iPod|BlackBerry|IEMobile/i);
  if (mobilePlatform != null) {
    return false;
  }
  const chromeVersion = window.navigator.userAgent.match(/Chrome\/([0-9]+)\./i);
  return 'PaymentRequest' in window && chromeVersion != null && Number(chromeVersion[1]) >= 68 && window.navigator.vendor == 'Google Inc.';
}

/**
 * @return {boolean} true if this version of Chrome supports PaymentRequest.
 */
function chromeSupportsPaymentRequest() {
  // Opera uses chrome as rendering engine and sends almost the exact same
  // user agent as chrome thereby fooling us on android.
  const isOpera = window.navigator.userAgent.indexOf('OPR/') != -1;
  if (isOpera) {
    return false;
  }
  if (chromeSupportsPaymentHandler()) {
    return true;
  }
  const androidPlatform = window.navigator.userAgent.match(/Android/i);
  const chromeVersion = window.navigator.userAgent.match(/Chrome\/([0-9]+)\./i);
  return androidPlatform != null && 'PaymentRequest' in window &&
  // Make sure skipping PaymentRequest UI when only one PaymentMethod is
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
    const allowedAuthMethods = extractAllowedAuthMethodsForCards_(isReadyToPayRequest);
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
    const allowedAuthMethods = extractAllowedAuthMethodsForCards_(isReadyToPayRequest);
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
      let allowedPaymentMethod = isReadyToPayRequest.allowedPaymentMethods[i];
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
  }

  // Validate payment data request for UPI payment method
  const allowedPaymentMethod = getUpiPaymentMethod(paymentDataRequest);
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
    const allowedPaymentMethod = getAllowedPaymentMethodForType_(isReadyToPayRequest, _constants.Constants.PaymentMethod.CARD);
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
    const allowedPaymentMethod = isReadyToPayRequest.allowedPaymentMethods[i];
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
exports.default = void 0;
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

class Random_uuid {}
exports.default = Random_uuid;
;
// Private array of chars to use
var CHARS = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'.split('');
Random_uuid.uuid = function (len, radix) {
  var chars = CHARS,
    uuid = [],
    i;
  radix = radix || chars.length;
  if (len) {
    // Compact form
    for (i = 0; i < len; i++) uuid[i] = chars[0 | Math.random() * radix];
  } else {
    // rfc4122, version 4 form
    var r;

    // rfc4122 requires these characters
    uuid[8] = uuid[13] = uuid[18] = uuid[23] = '-';
    uuid[14] = '4';

    // Fill in random data.  At i==19 set the high bits of clock sequence as
    // per rfc4122, sec. 4.1.5
    for (i = 0; i < 36; i++) {
      if (!uuid[i]) {
        r = 0 | Math.random() * 16;
        uuid[i] = chars[i == 19 ? r & 0x3 | 0x8 : r];
      }
    }
  }
  return uuid.join('');
};

// A more performant, but slightly bulkier, RFC4122v4 solution.  We boost performance
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
};

// A more compact, but less performant, RFC4122v4 solution:
Random_uuid.uuidCompact = function () {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    var r = Math.random() * 16 | 0,
      v = c == 'x' ? r : r & 0x3 | 0x8;
    return v.toString(16);
  });
};

},{}]},{},[23])

})();//# sourceMappingURL=subscriptions.max.js.map
