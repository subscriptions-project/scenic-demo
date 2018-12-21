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
 *  @typedef {{
 *    name: string,
 *    countryCode: string,
 *    publicationId: string,
 * }}
 */
let Config;

/**
 * @param {?string|undefined} id
 * @return {Config}
 */
exports.getConfig = function(id) {
    const config = CONFIG[id] || DEFAULT_CONFIG;
    return config;
};

/** @const {Config} */
const DEFAULT_CONFIG = {
    name: 'The Scenic - USA',
    countryCode: 'us',
    publicationId: process.env.SERVE_PUBID || 'scenic-2017.appspot.com',
}

/** @const {Object<Config>} */
const CONFIG = {
    'us': DEFAULT_CONFIG,
    'be': {
        name: 'The Scenic - Belgium',
        countryCode: 'be',
        publicationId: 'be.scenic-2017.appspot.com',
    },
    'cr': {
        name: 'The Scenic - Costa Rica',
        countryCode: 'cr',
        publicationId: 'cr.scenic-2017.appspot.com',
    },
    'pt': {
        name: 'The Scenic - Portugal',
        countryCode: 'pt',
        publicationId: 'pt.scenic-2017.appspot.com',
    },
    'es': {
        name: 'The Scenic - Spain',
        countryCode: 'es',
        publicationId: 'es.scenic-2017.appspot.com',
    },
    'ie': {
        name: 'The Scenic - Ireland',
        countryCode: 'ie',
        publicationId: 'ie.scenic-2017.appspot.com',
    },
    'in': {
        name: 'The Scenic - India',
        countryCode: 'in',
        publicationId: 'in.scenic-2017.appspot.com',
    },
    'ar': {
        name: 'The Scenic - Argentina',
        countryCode: 'ar',
        publicationId: 'ar.scenic-2017.appspot.com',
    },
    'au': {
        name: 'The Scenic - Australia',
        countryCode: 'au',
        publicationId: 'au.scenic-2017.appspot.com',
    },
    'br': {
        name: 'The Scenic - Brazil',
        countryCode: 'br',
        publicationId: 'br.scenic-2017.appspot.com',
    },
    'ca': {
        name: 'The Scenic - Canada',
        countryCode: 'ca',
        publicationId: 'ca.scenic-2017.appspot.com',
    },
    'ch': {
        name: 'The Scenic - Switzerland',
        countryCode: 'ch',
        publicationId: 'ch.scenic-2017.appspot.com',
    },
    'fr': {
        name: 'The Scenic - France',
        countryCode: 'fr',
        publicationId: 'fr.scenic-2017.appspot.com',
    },
    'de': {
        name: 'The Scenic - Germany',
        countryCode: 'de',
        publicationId: 'de.scenic-2017.appspot.com',
    },
    'it': {
        name: 'The Scenic - Italy',
        countryCode: 'it',
        publicationId: 'it.scenic-2017.appspot.com',
    },
    'jp': {
        name: 'The Scenic - Japan',
        countryCode: 'jp',
        publicationId: 'jp.scenic-2017.appspot.com',
    },
    'mx': {
        name: 'The Scenic - Mexico',
        countryCode: 'mx',
        publicationId: 'mx.scenic-2017.appspot.com',
    },
    'nl': {
        name: 'The Scenic - Netherlands',
        countryCode: 'nl',
        publicationId: 'nl.scenic-2017.appspot.com',
    },
    'ru': {
        name: 'The Scenic - Russia',
        countryCode: 'ru',
        publicationId: 'ru.scenic-2017.appspot.com',
    },
    'pl': {
        name: 'The Scenic - Poland',
        countryCode: 'pl',
        publicationId: 'pl.scenic-2017.appspot.com',
    },
    'sa': {
        name: 'The Scenic - Saudi Arabia',
        countryCode: 'sa',
        publicationId: 'sa.scenic-2017.appspot.com',
    },
}
