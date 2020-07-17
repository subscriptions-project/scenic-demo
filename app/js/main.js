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

import {DemoPaywallController} from './demo-controller';
import {log} from './log';

log('started');

/**
 * Add subsciptions when ready.
 * @param {function()} callback
 */
function whenReady(callback) {
  (self.SWG = self.SWG || []).push(function(subscriptions) {
    // Available for testing only. A very bad idea to have a global like this.
    self['TEST_SWG'] = subscriptions;
    callback(subscriptions);
  });
}

// Callbacks.
whenReady(function(subscriptions) {
  function eventCallback(eventName) {
    return function(value) {
      const promise = Promise.resolve(value);
      promise.then(
          function(response) {
            log(eventName, response);
          },
          function(reason) {
            log(eventName + 'failed', reason);
          }
      );
    };
  }
  subscriptions.setOnEntitlementsResponse(eventCallback('entitlements'));
  subscriptions.setOnLinkComplete(eventCallback('link-complete'));
  subscriptions.setOnLoginRequest(eventCallback('login-request'));
  subscriptions.setOnSubscribeResponse(eventCallback('subscribe'));
  subscriptions.setOnFlowStarted(eventCallback('flow-started'));
  subscriptions.setOnFlowCanceled(eventCallback('flow-canceled'));
});

/**
 * Selects the flow based on the URL query parameter.
 * The query parameter is the name of the function defined in runtime.
 * Defaults to 'showOffers'.
 * Current valid values are: 'showOffers', 'linkAccount', 'getEntitlements'.
 * @param {string} flow
 * @param {...} var_args
 */
function startFlow(flow, var_args) {
  var_args = Array.prototype.slice.call(arguments, 1);
  whenReady(function(subscriptions) {
    const flowFunc = subscriptions[flow];
    const flows = Object.keys(subscriptions);
    if (!(typeof flowFunc == 'function')) {
      throw new Error(
          'Flow "' + flow + '" not found: Available flows: "' + flows + '"'
      );
    }
    log('starting flow', flow, '(', var_args, ')', ' {' + flows + '}');
    const result = flowFunc.apply(subscriptions, var_args);
    Promise.resolve(result).then(function() {
      log('flow complete', flow);
    });
  });
}

/**
 * Selects the flow based on the URL query parameter.
 * The query parameter is the name of the function defined in runtime.
 * Defaults to 'showOffers'.
 * Current valid values are: 'showOffers', 'linkAccount', 'getEntitlements',
 * 'demoConsentRequired', 'demoUnknownSubscription', 'smartbutton',
 * and 'updateSubscription'.
 */
function startFlowAuto() {
  const flow = ((window.location.search || '')
      .split('?')[1] || '').split('&')[0] || 'demo';
  if (flow == 'none') {
    return;
  }
  if (flow == 'demo') {
    whenReady(function(subscriptions) {
      const controller = new DemoPaywallController(subscriptions);
      controller.start();
    });
    return;
  }
  if (flow == 'demoConsentRequired') {
    whenReady(function(subscriptions) {
      const controller = new DemoPaywallController(subscriptions, {
        consentRequired: 'true',
      });
      controller.start();
    });
    return;
  }
  if (flow == 'demoUnknownSubscription') {
    whenReady(function(subscriptions) {
      const controller = new DemoPaywallController(subscriptions, {
        unknownSubscription: true,
      });
      controller.start();
    });
    return;
  }
  if (flow === 'swgButton') {
    whenReady(subscriptions => {
      // Create button element.
      const swgButton = document.createElement('button');
      swgButton.className = 'swg-button';
      swgButton.onclick = () => {
        const controller = new DemoPaywallController(subscriptions);
        controller.start();
      };
      const firstParagraph = document.querySelector('.text');
      const container = firstParagraph.parentNode;
      container.insertBefore(swgButton, firstParagraph);
    });
  }
  if (flow === 'smartbutton') {
    whenReady(subscriptions => {
      let smartButton = document.querySelector('button#smartButton');
      if (!smartButton) {
        // Create a DOM element for SmartButton demo.
        smartButton = document.createElement('button');
        smartButton.id = 'smartButton';
        const firstParagraph = document.querySelector('.text');
        const container = firstParagraph.parentNode;
        container.insertBefore(smartButton, firstParagraph);
      }
      subscriptions.attachSmartButton(
          smartButton,
          {
            theme: 'light',
            lang: 'en',
            messageTextColor: 'rgba(66, 133, 244, 0.95)',
          },
          () => {
            subscriptions.showOffers({isClosable: true});
          }
      );
    });
    return;
  }
  if (flow === 'updateSubscription') {
    whenReady(subscriptions => {
      let smartButton = document.querySelector('button#smartButton');
      if (!smartButton) {
        // Create a button that, when clicked, will trigger Update flow
        smartButton = document.createElement('button');
        smartButton.id = 'smartButton';
        const firstParagraph = document.querySelector('.text');
        const container = firstParagraph.parentNode;
        container.insertBefore(smartButton, firstParagraph);
      }
      subscriptions.attachButton(
          smartButton,
          {
            theme: 'light',
            lang: 'en',
            messageTextColor: 'rgba(66, 133, 244, 0.95)',
          },
          () => {
            subscriptions.getEntitlements().then(entitlements => {
              if (entitlements.entitlements.length) {
                const entitlement = entitlements.entitlements[0];
                const sku = entitlement.getSku();
                if (sku) {
                  subscriptions.showUpdateOffers({
                    isClosable: true,
                    oldSku: sku,
                    skus:
                      [
                        'basic_1', 'premium_1', 'quarterly_offer_1', 'annual_1', //qual skus
                        'basic', 'basic_monthly', 'premium', 'premium_monthly', //prod skus
                      ],
                  });
                } else {
                  log(flow + ' failed:', "user doesn't have SwG entitlements");
                }
              } else {
                log(flow + ' failed:', "user doesn't have entitlements yet");
              }
            });
          }
      );
    });
    return;
  }
  startFlow(flow);
}

// Initiates the flow, if valid.
startFlowAuto();
