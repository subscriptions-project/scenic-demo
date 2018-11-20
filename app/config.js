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
    console.log('Testing Scenic for this country: ' + config.name);
    console.log('Testing Scenic with this Publication: ' + config.publicationId);
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
        // TODO(chenshay): Change this to a Belgian pubId.
        publicationId: 'scenic-2017.appspot.com',
    },
}