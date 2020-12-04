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
import {MeteringDemo} from './metering';
import {log} from './log';

/* eslint-disable */
const REGWALL = GaaMeteringRegwall;
/* eslint-enable */

log('started');

function hasPublisherSubscription() {
  getQueryParams().hasPublisherSubscription === 'true';
}

function consumedPublisherMeter() {
  getQueryParams().consumedPublisherMeter === 'true';
}

function isFreeArticle() {
  getQueryParams().isFreeArticle === 'true';
}

/**
 * Add subsciptions when ready.
 * @param {function()} callback
 */
function whenReady(callback) {
  (self.SWG = self.SWG || []).push(function (subscriptions) {
    // Available for testing only. A very bad idea to have a global like this.
    self['TEST_SWG'] = subscriptions;
    callback(subscriptions);
  });
}

// Callbacks.
whenReady(function (subscriptions) {
  function eventCallback(eventName) {
    return function (value) {
      const promise = Promise.resolve(value);
      promise.then(
        function (response) {
          log(eventName, response);
        },
        function (reason) {
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
  whenReady(function (subscriptions) {
    const flowFunc = subscriptions[flow];
    const flows = Object.keys(subscriptions);
    if (!(typeof flowFunc == 'function')) {
      throw new Error(
        'Flow "' + flow + '" not found: Available flows: "' + flows + '"'
      );
    }
    log('starting flow', flow, '(', var_args, ')', ' {' + flows + '}');
    const result = flowFunc.apply(subscriptions, var_args);
    Promise.resolve(result).then(function () {
      log('flow complete', flow);
    });
  });
}

function startDemoController(options) {
  whenReady((subscriptions) =>
    new DemoPaywallController(subscriptions, options).start()
  );
}

function setupSwgButton(subscriptions) {
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
}

function setupSmartButton(subscriptions) {
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
}

function setupUpdateSubscription(subscriptions) {
  const flow = 'updateSubscription';
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
      subscriptions.getEntitlements().then((entitlements) => {
        if (entitlements.entitlements.length) {
          const entitlement = entitlements.entitlements[0];
          const sku = entitlement.getSku();
          if (sku) {
            subscriptions.showUpdateOffers({
              isClosable: true,
              oldSku: sku,
              skus: [
                'basic_1',
                'premium_1',
                'quarterly_offer_1',
                'annual_1', //qual skus
                'basic',
                'basic_monthly',
                'premium',
                'premium_monthly', //prod skus
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
}

function setupMeteringDemo(subscriptions) {
  // Forget any subscriptions, for metering demo purposes.
  subscriptions.clear();

  // Set up metering demo language.
  document.documentElement.lang = getQueryParams().lang || 'en';

  // Set up metering demo controls.
  MeteringDemo.setupControls();

  // Handle clicks on the Metering Toast's "Subscribe" button.
  subscriptions.setOnNativeSubscribeRequest(() => {
    // Show a publisher paywall for demo purposes.
    startFlow('showOffers');
  });

  // Handle clicks on the "Already have an account?" link within the
  // Metering Regwall dialog.
  subscriptions.setOnLoginRequest(() => {
    subscriptions.linkAccount();
  });

  // Handle users linking their account.
  subscriptions.setOnLinkComplete(() => {
    subscriptions.reset();

    location.reload();
  });

  // Determine whether there is a publisher based entitlement
  let entitlement = null;
  let isUserRegistered = false; // Set this if known
  let unlockContent = true;
  if (hasPublisherSubscription()) {
    isUserRegistered = true;
    entitlement = 'EVENT_SHOWCASE_UNLOCKED_BY_SUBSCRIPTION';
    return;
  } else if (consumedPublisherMeter()) {
    isUserRegistered = true;
    entitlement = 'EVENT_SHOWCASE_UNLOCKED_BY_METER';
  } else if (isFreeArticle()) {
    // set isUserRegistered if known
    entitlement = 'EVENT_SHOWCASE_UNLOCKED_FREE_PAGE';
  } else {
    unlockContent = false;
    entitlement = isUserRegistered
      ? 'EVENT_SHOWCASE_NO_ENTITLEMENTS_PAYWALL'
      : 'EVENT_SHOWCASE_NO_ENTITLEMENTS_REGWALL';
    subscriptions.setShowcaseEntitlement({isUserRegistered,entitlement});
  }

  // Inform showcase of the  publisher's entitlement decision.  If google
  // decides to unlock the article, an additional event indicating why
  // will automatically be generated.
  subscriptions.setShowcaseEntitlement({isUserRegistered, entitlement});

  // If we unlocked the content, display it and exit.
  if (unlockContent) {
    MeteringDemo.openPaywall();
    return;
  }

  // Fetch entitlements.
  subscriptions.getEntitlements().then(entitlements => {
    if (entitlements.enablesThis()) {
      // Unlock article right away, since the user has a subscription.
      MeteringDemo.openPaywall();
    } else {
      // Attempt to unlock article with metering.
      maybeUnlockWithMetering();
    }
  });

  function maybeUnlockWithMetering() {
    // Fetch the current user's metering state.
    MeteringDemo.fetchMeteringState().then(meteringState => {
      if (meteringState.registrationTimestamp) {
        // Skip metering regwall for registered users.
        return meteringState;
      }

      // Show metering regwall for unregistered users.
      return REGWALL.show({
        // Specify a URL that renders a Google Sign-In button.
        iframeUrl: MeteringDemo.GOOGLE_SIGN_IN_IFRAME_URL,
      }).then(googleSignInUser =>
        // Register a user based on data from Google Sign-In.
        //
        // We advise setting a 1st party, secure, HTTP-only cookie,
        // so it lives past 7 days in Safari.
        // https://webkit.org/blog/10218/full-third-party-cookie-blocking-and-more/
        MeteringDemo.registerUser(googleSignInUser)
      ).then(() =>
        // Fetch the current user's metering state again
        // since they registered.
        MeteringDemo.fetchMeteringState()
      );
    }).then(meteringState => {
      // Forget previous entitlements fetches.
      subscriptions.clear();
      /* eslint-disable */
      const state = {
        metering: {
          state: {
            // Hashed identifier for a specific user. Hash this value yourself
            // to avoid sending PII.
            id: meteringState.id,
            // Standard attributes which affect your meters.
            // Each attribute has a corresponding timestamp, which
            // allows meters to do things like granting access
            // for up to 30 days after a certain action.
            //
            // TODO: Describe standard attributes, once they're defined.
            standardAttributes: {
              registered_user: {
                timestamp: meteringState.registrationTimestamp,
              },
            },
          },
        },
      };
      /* eslint-enable */

      // Get SwG entitlements.
      return subscriptions.getEntitlements(state);
    }).catch(() => false)
        .then(entitlements => {
          // Check if a Google metering entitlement unlocks the article.
          if (entitlements && entitlements.enablesThisWithGoogleMetering()) {
            // Consume the entitlement. This lets Google know a specific free
            // read was "used up", which allows Google to calculate how many
            // free reads are left for a given user.
            //
            // Consuming an entitlement will also trigger a dialog that lets the user
            // know Google provided them with a free read.
            entitlements.consume(() => {
              // Unlock the article AFTER the user consumes a free read.
              // Note: If you unlock the article outside of this callback,
              // users might be able to scroll down and read the article
              // without closing the dialog, and closing the dialog is
              // what actually consumes a free read.
              MeteringDemo.openPaywall();
            });
          } else {
            // Handle failures to unlock the article with metering entitlements.
            // Perhaps the user ran out of free reads. Or perhaps the user
            // dismissed the Regwall. Either way, the publisher determines
            // what happens next. This demo shows offers.
            startFlow('showOffers');
          }
        });
  }
}

/**
 * Selects the flow based on the URL query parameter.
 * (ex: http://localhost:8000/examples/sample-pub/1?metering)
 * The query parameter is the name of the function defined in runtime.
 * Defaults to 'showOffers'.
 * Current valid values are: 'showOffers', 'linkAccount', 'getEntitlements',
 * 'demoConsentRequired', 'demoUnknownSubscription', 'smartbutton',
 * and 'updateSubscription'.
 */
function startFlowAuto() {
  let flow =
    ((window.location.search || '').split('?')[1] || '').split('&')[0] ||
    'demo';

  // Check for valid Google Article Access (GAA) params.
  if (isGaa()) {
    console.log(
      'Google Article Access (GAA) params triggered the "metering" flow.'
    );
    flow = 'metering';
  }

  if (flow == 'none') {
    return;
  }
  if (flow == 'demo') {
    startDemoController();
    return;
  }

  if (flow == 'demoConsentRequired') {
    startDemoController({consentRequired: true});
    return;
  }
  if (flow == 'demoUnknownSubscription') {
    startDemoController({unknownSubscription: true});
    return;
  }
  if (flow === 'swgButton') {
    whenReady(setupSwgButton);
  }
  if (flow === 'smartbutton') {
    whenReady(setupSmartButton);
    return;
  }
  if (flow === 'updateSubscription') {
    whenReady(setupUpdateSubscription);
    return;
  }

  if (flow == 'metering') {
    whenReady(setupMeteringDemo);
    return;
  }

  startFlow(flow);
}

/**
 * Returns true if the URL contains valid Google Article Access (GAA) params.
 * TODO: Link to a public document describing GAA params.
 * @return {boolean}
 */
function isGaa() {
  // Validate GAA params.
  const params = getQueryParams();
  if (!params.gaa_at) {
    return false;
  }
  if (!params.gaa_n) {
    console.error('SwG Entitlements: The `gaa_n` URL param is missing.');
    return false;
  }
  if (!params.gaa_sig) {
    console.error('SwG Entitlements: The `gaa_sig` URL param is missing.');
    return false;
  }
  if (!params.gaa_ts) {
    console.error('SwG Entitlements: The `gaa_ts` URL param is missing.');
    return false;
  }
  if (parseInt(params.gaa_ts, 16) < Date.now() / 1000) {
    console.error(
      'SwG Entitlements: The `gaa_ts` URL param should ' +
        'contain a hex string timestamp which points to the future.'
    );
    return false;
  }

  // Validate referrer.
  // NOTE: This regex was copied from SwG's AMP extension. https://github.com/ampproject/amphtml/blob/c23bf281f817a2ee5df73f6fd45e9f4b71bb68b6/extensions/amp-subscriptions-google/0.1/amp-subscriptions-google.js#L56
  const GOOGLE_DOMAIN_RE = /(^|\.)google\.(com?|[a-z]{2}|com?\.[a-z]{2}|cat)$/;
  const referrer = getAnchorFromUrl(document.referrer);
  if (
    referrer.protocol !== 'https' ||
    !GOOGLE_DOMAIN_RE.test(referrer.hostname)
  ) {
    // Real publications should bail if this referrer check fails.
    // This script is only logging a warning for metering demo purposes.
    console.warn(
      `SwG Entitlements: This page's referrer ("${referrer.origin}") can't ` +
        'grant Google Article Access. Real publications should bail if this ' +
        'referrer check fails.'
    );
  }

  return true;
}

/**
 * Returns anchor element from a given URL.
 * @return {HTMLAnchorElement}
 */
function getAnchorFromUrl(url) {
  const a = document.createElement('a');
  a.href = url;
  return a.hostname;
}

/**
 * Returns query params from URL.
 * @return {!Object<string, string>}
 */
function getQueryParams() {
  const queryParams = {};
  location.search
    .substring(1)
    .split('&')
    .forEach((pair) => {
      const parts = pair.split('=');
      queryParams[parts[0]] = parts[1];
    });
  return queryParams;
}

// Initiates the flow, if valid.
startFlowAuto();
