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

import {log} from './log';

class Account {
  constructor(name, email) {
    this.name = name;
    this.email = email;
  }
}

/**
 * Demo paywall controller to demonstrate some key features.
 */
export class DemoPaywallController {

  /**
   * @param {!Subscriptions} subscriptions
   * @param {!{
   *   unknownSubscription: (boolean|undefined),
   * }=} opt_options
   */
  constructor(subscriptions, opt_options) {
    /** @const {!Subscriptions} */
    this.subscriptions = subscriptions;

    this.subscriptions.setOnEntitlementsResponse(
        this.onEntitlements_.bind(this));
    this.subscriptions.setOnLoginRequest(this.loginRequest_.bind(this));
    this.subscriptions.setOnLinkComplete(this.linkComplete_.bind(this));
    this.subscriptions.setOnSubscribeResponse(
        this.subscribeResponse_.bind(this));

    /** @const {?Entitlements} */
    this.entitlements = null;

    /** @private {boolean} */
    this.unknownSubscription_ =
        opt_options && opt_options.unknownSubscription || false;

    /** @private @const {boolean} */
    this.consentRequired_ = (opt_options &&
        opt_options['consentRequired'] == 'true') ? true : false;
  }

  start() {
    log('DemoPaywallController started');
    this.subscriptions.start();
  }

  /**
   * Returns a list of products
   * @param {!JsonObject} ents
   * @return {!Array<string>}
   * @private
   */
  getProductList_(ents) {
    const products = [];
    const entitlements = ents && ents['entitlements'];
    if (!entitlements) {
      return products;
    }
    for (i = 0; i < entitlements.length; i++) {
      const entitlement = entitlements[i];
      const entitlement_products = entitlement['products'];
      for(j = 0; j < entitlement_products.length; j++) {
        const product = entitlement_products[j];
        products.push(product);
      }
    }
    return products;
  }

  /** @private */
  onEntitlements_(entitlementsPromise) {
    entitlementsPromise.then(entitlements => {
      log('got entitlements: ', entitlements, entitlements.enablesThis());
      // Send event upon subscription state of the user discovery
      if (entitlements) {
        const products = this.getProductList_(entitlements.json());
        this.subscriptions.getPropensityModule().then(module => {
          if (products.length > 0) {
            module.sendSubscriptionState('subscriber', {'product': products});
          } else {
            module.sendSubscriptionState('non_subscriber');
          }
        });
      } else {
         this.subscriptions.getPropensityModule().then(module => {
           module.sendSubscriptionState('unknown');
         });
      }
      if (entitlements && entitlements.enablesThis()) {
        if (!this.completeDeferredAccountCreation_(entitlements)) {
          return; // Do nothing.
        } else {
          const account = new Account('John Doe', 'johndoe@email.com');
          const accountPromise = new Promise(resolve => {
            setTimeout(() => {
              resolve(account);
            }, 5000);
          });
          this.subscriptions.waitForSubscriptionLookup(accountPromise)
              .then(account => {
                if (account) {
                  this.showLoginPromptOrNotification_(this.subscriptions,
                      this.consentRequired_).then(result => {
                        if (result) {
                          this.openPaywall_();
                          entitlements.ack();
                        }
                      });
                }
              }, reason => {
                log('subscription look up failed: ', reason);
              });
        }
      } else {
        // In a simplest case, just launch offers flow.
        this.subscriptions.showOffers();
        this.subscriptions.getPropensityModule().then(module => {
          // If a list of offers was passed in to showOffers() or some
          // other interface that displays offers, that list can be
          // sent here instead of an empty array.
          module.sendEvent('offers_shown', {'offers': []});
        });
      }
    }, reason => {
      log('entitlements failed: ', reason);
      throw reason;
    });
  }

  /**
   * Based on if consent is required or not, show the login prompt or
   * login notification to the user.
   *
   * If consent is required, show login prompt first and if consent is
   * obtained show login notification. Otherwise, directly show login
   * notification.
   * @param {!Subscriptions} subscriptions
   * @param {boolean} consentRequired
   * @private
   */
  showLoginPromptOrNotification_(subscriptions, consentRequired) {
    let loginPromise;
    if (!consentRequired) {
      loginPromise = Promise.resolve();
    } else {
      loginPromise = subscriptions.showLoginPrompt();
    }
    return loginPromise.then(() => {
      return subscriptions.showLoginNotification();
    });
  }

  /**
   * The simplest possible implementation: they paywall is now open. A more
   * sophisticated implementation could fetch more data, or set cookies and
   * refresh the whole page.
   * @private
   */
  openPaywall_() {
    log('open paywall');
    document.documentElement.classList.add('open-paywall');
  }

  /**
   * The subscription has been complete.
   * @param {!Promise<!SubscribeResponse>} promise
   * @private
   */
  subscribeResponse_(promise) {
    promise.then(response => {
      // TODO: Start account creation flow.
      log('got subscription response', response);
      const toast = document.getElementById('creating_account_toast');
      const userEl = document.getElementById('creating_account_toast_user');
      userEl.textContent = response.userData.email;
      toast.style.display = 'block';
      // TODO: wait for account creation to be complete.
      setTimeout(() => {
        response.complete().then(() => {
          log('subscription has been confirmed');
          // Payment confirmation received, send payment_complete event
          this.subscriptions.getPropensityModule().then(module => {
            const jsonResponse = response && response.json();
            const entitlementsJson = jsonResponse && jsonResponse['entitlements'];
            const products = this.getProductList_(entitlementsJson);
            module.sendEvent('payment_complete', {'product': products});
          });
          // Open the content.
          this.subscriptions.reset();
          this.start();
        });
        toast.style.display = 'none';
      }, 3000);
    }, reason => {
      log('subscription response failed: ', reason);
      throw reason;
    });
  }

  /**
   * Login requested. This sample starts linking flow.
   * @private
   */
  loginRequest_() {
    log('login request');
    this.subscriptions.linkAccount();
  }

  /**
   * Linking has been complete. Possibly we have permissions now.
   * @private
   */
  linkComplete_() {
    log('linking complete');
    this.subscriptions.reset();
    this.start();
  }

  /**
   * @param {!Entitlements} entitlements
   * @return {!Promise|undefined}
   * @private
   */
  completeDeferredAccountCreation_(entitlements) {
    if (!this.unknownSubscription_) {
      // Subscription has already been recognized.
      // Nothing needs to be completed.
      return;
    }
    if (!entitlements.getEntitlementForSource('google')) {
      // No Google entitlement.
      return;
    }
    log('start deferred account creation');
    return this.subscriptions.completeDeferredAccountCreation({
      entitlements,
    }).then(response => {
      // TODO: Start deferred account creation flow.
      log('got deferred account response', response);
      this.unknownSubscription_ = false;
      const toast = document.getElementById('creating_account_toast');
      const userEl = document.getElementById('creating_account_toast_user');
      userEl.textContent = 'deferred/' + response.userData.email;
      toast.style.display = 'block';
      // TODO: wait for account creation to be complete.
      setTimeout(() => {
        response.complete().then(() => {
          log('subscription has been confirmed');
          // Open the content.
          this.subscriptions.reset();
          this.start();
        });
        toast.style.display = 'none';
      }, 3000);
    });
  }
}
