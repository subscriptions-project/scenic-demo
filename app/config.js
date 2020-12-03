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
exports.getConfig = function (id) {
  const config = CONFIG[id] || DEFAULT_CONFIG;
  return config;
};

/** @const {Config} */
const DEFAULT_CONFIG = {
  name: 'The Scenic - USA',
  countryCode: 'us',
  publicationId: process.env.SERVE_PUBID || 'scenic-2017.appspot.com',
};

/** @const {Object<Config>} */
const CONFIG = {
  'us': DEFAULT_CONFIG,
  'ar': {
    name: 'The Scenic - Argentina',
    countryCode: 'ar',
    publicationId: 'ar.scenic-2017.appspot.com',
  },
  'at': {
    name: 'The Scenic - Austria',
    countryCode: 'at',
    publicationId: 'at.scenic-2017.appspot.com',
  },
  'au': {
    name: 'The Scenic - Australia',
    countryCode: 'au',
    publicationId: 'au.scenic-2017.appspot.com',
  },
  'be': {
    name: 'The Scenic - Belgium',
    countryCode: 'be',
    publicationId: 'be.scenic-2017.appspot.com',
  },
  'bg': {
    name: 'The Scenic - Bulgaria',
    countryCode: 'bg',
    publicationId: 'bg.scenic-2017.appspot.com',
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
  'cl': {
    name: 'The Scenic - Chile',
    countryCode: 'cl',
    publicationId: 'cl.scenic-2017.appspot.com',
  },
  'co': {
    name: 'The Scenic - Colombia',
    countryCode: 'co',
    publicationId: 'co.scenic-2017.appspot.com',
  },
  'cr': {
    name: 'The Scenic - Costa Rica',
    countryCode: 'cr',
    publicationId: 'cr.scenic-2017.appspot.com',
  },
  'cz': {
    name: 'The Scenic - Czech Republic',
    countryCode: 'cz',
    publicationId: 'cz.scenic-2017.appspot.com',
  },
  'de': {
    name: 'The Scenic - Germany',
    countryCode: 'de',
    publicationId: 'de.scenic-2017.appspot.com',
  },
  'dk': {
    name: 'The Scenic - Denmark',
    countryCode: 'dk',
    publicationId: 'dk.scenic-2017.appspot.com',
  },
  'es': {
    name: 'The Scenic - Spain',
    countryCode: 'es',
    publicationId: 'es.scenic-2017.appspot.com',
  },
  'fr': {
    name: 'The Scenic - France',
    countryCode: 'fr',
    publicationId: 'fr.scenic-2017.appspot.com',
  },
  'gr': {
    name: 'The Scenic - Greece',
    countryCode: 'gr',
    publicationId: 'gr.scenic-2017.appspot.com',
  },
  'hk': {
    name: 'The Scenic - Hong Kong',
    countryCode: 'hk',
    publicationId: 'hk.scenic-2017.appspot.com',
  },
  'hu': {
    name: 'The Scenic - Hungary',
    countryCode: 'hu',
    publicationId: 'hu.scenic-2017.appspot.com',
  },
  'id': {
    name: 'The Scenic - Indonesia',
    countryCode: 'id',
    publicationId: 'id.scenic-2017.appspot.com',
  },
  'ie': {
    name: 'The Scenic - Ireland',
    countryCode: 'ie',
    publicationId: 'ie.scenic-2017.appspot.com',
  },
  'il': {
    name: 'The Scenic - Israel',
    countryCode: 'il',
    publicationId: 'il.scenic-2017.appspot.com',
  },
  'in': {
    name: 'The Scenic - India',
    countryCode: 'in',
    publicationId: 'in.scenic-2017.appspot.com',
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
  'kr': {
    name: 'The Scenic - South Korea',
    countryCode: 'kr',
    publicationId: 'kr.scenic-2017.appspot.com',
  },
  'mx': {
    name: 'The Scenic - Mexico',
    countryCode: 'mx',
    publicationId: 'mx.scenic-2017.appspot.com',
  },
  'my': {
    name: 'The Scenic - Malaysia',
    countryCode: 'my',
    publicationId: 'my.scenic-2017.appspot.com',
  },
  'nl': {
    name: 'The Scenic - Netherlands',
    countryCode: 'nl',
    publicationId: 'nl.scenic-2017.appspot.com',
  },
  'no': {
    name: 'The Scenic - Norway',
    countryCode: 'no',
    publicationId: 'no.scenic-2017.appspot.com',
  },
  'nz': {
    name: 'The Scenic - New Zealand',
    countryCode: 'nz',
    publicationId: 'nz.scenic-2017.appspot.com',
  },
  'pe': {
    name: 'The Scenic - Peru',
    countryCode: 'pe',
    publicationId: 'pe.scenic-2017.appspot.com',
  },
  'ph': {
    name: 'The Scenic - Philippines',
    countryCode: 'ph',
    publicationId: 'ph.scenic-2017.appspot.com',
  },
  'pl': {
    name: 'The Scenic - Poland',
    countryCode: 'pl',
    publicationId: 'pl.scenic-2017.appspot.com',
  },
  'pt': {
    name: 'The Scenic - Portugal',
    countryCode: 'pt',
    publicationId: 'pt.scenic-2017.appspot.com',
  },
  'ro': {
    name: 'The Scenic - Romania',
    countryCode: 'ro',
    publicationId: 'ro.scenic-2017.appspot.com',
  },
  'ru': {
    name: 'The Scenic - Russia',
    countryCode: 'ru',
    publicationId: 'ru.scenic-2017.appspot.com',
  },
  'sa': {
    name: 'The Scenic - Saudi Arabia',
    countryCode: 'sa',
    publicationId: 'sa.scenic-2017.appspot.com',
  },
  'se': {
    name: 'The Scenic - Sweden',
    countryCode: 'se',
    publicationId: 'se.scenic-2017.appspot.com',
  },
  'sg': {
    name: 'The Scenic - Singapore',
    countryCode: 'sg',
    publicationId: 'sg.scenic-2017.appspot.com',
  },
  'sk': {
    name: 'The Scenic - Slovakia',
    countryCode: 'sk',
    publicationId: 'sk.scenic-2017.appspot.com',
  },
  'th': {
    name: 'The Scenic - Thailand',
    countryCode: 'th',
    publicationId: 'th.scenic-2017.appspot.com',
  },
  'tr': {
    name: 'The Scenic - Turkey',
    countryCode: 'tr',
    publicationId: 'tr.scenic-2017.appspot.com',
  },
  'tw': {
    name: 'The Scenic - Taiwan',
    countryCode: 'tw',
    publicationId: 'tw.scenic-2017.appspot.com',
  },
  'uy': {
    name: 'The Scenic - Uruguay',
    countryCode: 'uy',
    publicationId: 'uy.scenic-2017.appspot.com',
  },
  'vn': {
    name: 'The Scenic - Vietnam',
    countryCode: 'vn',
    publicationId: 'vn.scenic-2017.appspot.com',
  },
  'za': {
    name: 'The Scenic - South Africa',
    countryCode: 'za',
    publicationId: 'za.scenic-2017.appspot.com',
  },
};
