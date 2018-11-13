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
 * - sku: Required. Sku to add to the user's subscriptions.
 * - oldSku: Optional. This is if you want to replace one sku with another. For
 *  example, if a user wants to upgrade or downgrade their current subscription.
 * - prorationMode: Optional. When replacing a subscription you can decide on a
 *  specific proration mode to charge the user.
 *  The default is IMMEDIATE_WITH_TIME_PRORATION.
 * 
 *  @typedef {{
 *    name: string,
 *    code: string,
 *    publicationId: string,
 * }}
 */
let CountryConfig;

/**
 * @param {string} countryCode 
 * @return {CountryConfig}
 */
exports.getCountryConfig = function(countryCode) {
    const config = CONFIG[countryCode];
    if (config) {
        return config;
    }
    return DEFAULT_CONFIG;
}

/** @const {CountryConfig} */
const DEFAULT_CONFIG = {
    name: 'USA',
    code: 'us',
    // publicationId: 'com.appspot.scenic-2017-test',
    publicationId: process.env.SERVE_PUBID || 'scenic-2017.appspot.com',
}

/** @const {Object<CountryConfig>} */
const CONFIG = {
    'us': DEFAULT_CONFIG,
    'be': {
        name: 'Belgium',
        code: 'be',
        // publicationId: 'com.appspot.scenic-2017-test',
        publicationId: 'scenic-2017.appspot.com',
    },
}