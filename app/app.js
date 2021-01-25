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

const fetch = require('node-fetch');
const jsonwebtoken = require('jsonwebtoken');
const {
  decrypt,
  encrypt,
  fromBase64,
  toBase64,
  toBase64Url,
} = require('./crypto');
const {getConfig} = require('./config');

const app = (module.exports = require('express').Router());
app.use(require('cookie-parser')());
app.use('/', require('./oauth-app'));

const AMP_LOCAL = process.env.SERVE_AMP_LOCAL == 'true';

const BASE_URL =
  process.env.NODE_ENV == 'production'
    ? 'https://scenic-2017.appspot.com'
    : '//localhost:8000';

const SWG_JS_URLS = {
  local: '/swgjs/swg.max.js',
  /* eslint-disable-next-line google-camelcase/google-camelcase */
  local_min: '/swgjs/swg.js',
  prod: 'https://news.google.com/swg/js/v1/swg.js',
  autopush: 'https://news.google.com/swg/js/v1/swg-autopush.js',
  tt: 'https://news.google.com/swg/js/v1/swg-tt.js',
  qual: 'https://news.google.com/swg/js/v1/swg-qual.js',
};

const SWG_GAA_JS_URLS = {
  local: '/swgjs/swg-gaa.max.js',
  /* eslint-disable-next-line google-camelcase/google-camelcase */
  local_min: '/swgjs/swg-gaa.js',
  prod: 'https://news.google.com/swg/js/v1/swg-gaa.js',
  autopush: 'https://news.google.com/swg/js/v1/swg-gaa-autopush.js',
  tt: 'https://news.google.com/swg/js/v1/swg-gaa-tt.js',
};

const AUTH_COOKIE = 'SCENIC_AUTH';
const METER_COOKIE = 'SCENIC_METER';
const MAX_METER = 3;

const DECRYPTED_DOCUMENT_KEY = 'd4ZoJQJLWrV6DiF9oI40fw==';

const ARTICLES = require('./content').ARTICLES;

const googleSignInClientId =
  process.env.GSI_CLIENT_ID ||
  '520465458218-e9vp957krfk2r0i4ejeh6aklqm7c25p4.apps.googleusercontent.com';

/**
 * Maps AMP reader IDs to emails from Google Sign-In.
 * @type {{ [ampReaderId: string]: string }}
 */
const ampReaderIdToEmailMap = {};

// Info.
if (console.log) {
  console.log('Scenic started. Publication: ' + getConfig().publicationId);
}

/**
 * List all Articles.
 */
app.get(['/', '/config/:configId'], (req, res) => {
  let originalUrl = req.originalUrl;
  let originalQuery = '';
  const queryIndex = originalUrl.indexOf('?');
  if (queryIndex != -1) {
    originalQuery = originalUrl.substring(queryIndex);
    originalUrl = originalUrl.substring(0, queryIndex);
  }
  if (originalUrl.charAt(originalUrl.length - 1) != '/') {
    res.redirect(302, originalUrl + '/' + originalQuery);
    return;
  }
  res.render('../app/views/list', {
    title: 'Select an article to get started',
    config: getConfig(req.params.configId),
    articles: ARTICLES,
    gsv: process.env.GOOGLE_SITE_VERIFICATION || null,
  });
});

app.get(['/config/:configId/landing.html', '/landing.html'], (req, res) => {
  res.render('../app/views/landing.html', {
    config: getConfig(req.params.configId),
    swgJsUrl: getSwgJsUrl(req),
  });
});

/**
 * An Article.
 */
app.get(['/config/:configId/((\\d+))', '/((\\d+))'], (req, res) => {
  const id = parseInt(req.params[0], 10);
  const article = ARTICLES[id - 1];
  const prevId = id - 1 >= 0 ? String(id - 1) : false;
  const nextId = id + 1 < ARTICLES.length ? String(id + 1) : false;
  const setup = getSetup(req);
  res.render('../app/views/article', {
    swgJsUrl: getSwgJsUrl(req),
    swgGaaJsUrl: getSwgGaaJsUrl(req),
    setup,
    config: getConfig(req.params.configId),
    id,
    article,
    prev: prevId,
    next: nextId,
    googleSignInClientId,
  });
});

/**
 * An AMP Article.
 * TODO(dvoytenko): remove "/examples/" path
 */
app.get(['/config/:configId/((\\d+)).amp', '/((\\d+)).amp'], (req, res) => {
  const id = parseInt(req.params[0], 10);
  const article = ARTICLES[id - 1];
  const prevId = id - 1 >= 0 ? String(id - 1) + '.amp' : false;
  const nextId = id + 1 < ARTICLES.length ? String(id + 1) + '.amp' : false;
  const setup = getSetup(req);
  const ac = req.query['ac'] == '1';
  // TODO(dvoytenko): eventually only look for rtv value, regardless of ac.
  const rtv = ac ? req.query['rtv'] || '001523056882788' : null;
  const amp = {
    'amp_js': ampJsUrl('amp', rtv),
    'subscriptions_js': ampJsUrl('amp-subscriptions', rtv),
    'subscriptions_google_js': ampJsUrl('amp-subscriptions-google', rtv),
    'mustache_js': ampJsUrl('amp-mustache', rtv),
  };
  res.render('../app/views/article-amp', {
    amp,
    setup,
    serviceBase: BASE_URL,
    config: getConfig(req.params.configId),
    // TODO(dvoytenko): remove completely.
    // authConnect: ac,
    id,
    article,
    prev: prevId,
    next: nextId,
  });
});

/**
 * A Showcase article with a server-side paywall.
 */
app.get(
  [
    '/config/:configId/showcase-article-with-server-side-paywall',
    '/showcase-article-with-server-side-paywall',
  ],
  async (req, res) => {
    const article = ARTICLES[0];
    const setup = getSetup(req);
    const config = getConfig(req.params.configId);

    // Mock a publisher provided user ID, for demo purposes.
    const publisherProvidedId =
      'ppidfromscenic' + Math.floor(Math.random() * 9999999999);

    // Mock a registration timestamp, for demo purposes.
    const registrationTimestamp = Math.floor(Date.now() / 1000);

    // Prepare a request for a Showcase entitlement.
    const showcaseEntitlementRequestParams = {
      'metering': {
        'clientTypes': [
          1, // Just pass 1 here
        ],
        'owner': 'scenic-2017.appspot.com', // Pass your publicationID here
        'resource': {
          'hashedCanonicalUrl':
            '37d9f8ef6e6a2f3e153959b7c126d73cbc9d1d0549ab2a0b389516122cb960d562cbd4cc7d4c8b1b2e488f073c557645088ea2d60f959f847e8b7e7cee931eaf', // Pass your article's hashed canonical URL here
        },
        'state': {
          'id': publisherProvidedId, // Pass your reader's hashed ID
          'attributes': [
            {
              'name': 'standard_registered_user',
              'timestamp': registrationTimestamp, // Pass registration timestamp in seconds
            },
          ],
        },
      },
    };

    // Encode params as Base64 for URLs.
    // https://en.wikipedia.org/wiki/Base64#URL_applications
    const encodedParams = toBase64Url(
      JSON.stringify(showcaseEntitlementRequestParams)
    );

    // Request a Showcase entitlement.
    const showcaseEntitlementRequest = `https://news.google.com/swg/_/api/v1/publication/${config.publicationId}/entitlements?encodedParams=${encodedParams}`;
    const showcaseEntitlementResponse = await fetch(
      showcaseEntitlementRequest
    ).then((res) => res.json());

    // Extract the Showcase entitlement JWT.
    const showcaseEntitlementJwt =
      showcaseEntitlementResponse.signedEntitlements;

    // Render the page.
    // If the Showcase entitlement JWT exists, then the article will:
    // - Render unlocked
    // - Include additional JS to consume the Showcase entitlement
    res.render('../app/views/showcase-article-with-server-side-paywall', {
      swgJsUrl: getSwgJsUrl(req),
      swgGaaJsUrl: getSwgGaaJsUrl(req),
      setup,
      serviceBase: BASE_URL,
      config,
      article,
      showcaseEntitlementJwt,
    });
  }
);

/**
 * RSS Feed.
 */
app.get('/feed.xml', (req, res) => {
  res.set('Content-Type', 'text/xml');
  res.render('../app/views/feed-xml', {
    updateTimeIso: new Date().toISOString(),
    articles: ARTICLES.map((article) => {
      return Object.assign({}, article, {
        dateIso: new Date(article.date).toISOString(),
        updateTimeIso: new Date().toISOString(),
      });
    }),
  });
});

/**
 * Subscribe page. Format:
 * /signin?return=RETURN_URL
 */
app.get('/subscribe', (req, res) => {
  const returnUrl = cleanupReturnUrl(req.query['return'] || null);
  res.render('../app/views/signin', {
    'type_subscribe': true,
    'returnUrl': returnUrl,
    googleSignInClientId,
  });
});

/**
 * Signin page. Format:
 * /signin?return=RETURN_URL
 */
app.get('/signin', (req, res) => {
  const returnUrl = cleanupReturnUrl(req.query['return'] || null);
  res.render('../app/views/signin', {
    'type_signin': true,
    'returnUrl': returnUrl,
    googleSignInClientId,
  });
});

/**
 * Logs-in user on the publication's domain and redirects to the referrer.
 * Also sets the authorized user's name in the cookie.
 */
app.post('/signin', (req, res) => {
  const returnUrl = cleanupReturnUrl(getParam(req, 'returnUrl'));
  let email = req.body['email'];
  const password = req.body['password'];
  const idToken = req.body['id_token'];
  if ((!email || !password) && !idToken) {
    throw new Error('Missing email and/or password');
  }
  if (idToken) {
    // TODO(dvoytenko): verify token as well.
    const jwt = jsonwebtoken.decode(idToken);
    email = jwt['email'];
  }

  const ampReaderId = req.body.rid;
  if (ampReaderId) {
    // Remember this AMP reader ID has entitlements to content.
    // This supports articles on the AMP cache. Entitlements requests from AMP
    // will include the AMP reader ID as a URL param (`rid`).
    console.log(`Registering ${email} based on their AMP reader ID.`);
    ampReaderIdToEmailMap[ampReaderId] = email;
  } else {
    // Save a 1p cookie that entitles the user to content.
    // This doesn't support articles on the AMP cache, since
    // it would then be a 3rd party cookie, which browsers won't send.
    setUserInfoInCookies(res, email);
  }

  res.redirect(302, returnUrl);
});

/**
 * Signout page. Format:
 * /signin?return=RETURN_URL
 */
app.get('/signout', (req, res) => {
  setUserInfoInCookies(res, null);
  res.redirect(302, '/');
});

/**
 * AMP entitlements request.
 */
app.get('/amp-entitlements', (req, res) => {
  // Add headers.
  // TODO(dvoytenko): test if the origin is actually allowed.
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', req.headers.origin || '*');
  res.setHeader(
    'Access-Control-Expose-Headers',
    'AMP-Access-Control-Allow-Source-Origin'
  );
  res.setHeader('Content-Type', 'application/json');
  if (req.query.__amp_source_origin) {
    res.setHeader(
      'AMP-Access-Control-Allow-Source-Origin',
      req.query.__amp_source_origin
    );
  }

  // Support AMP reader IDs.
  // This works on the AMP cache.
  const ampReaderId = req.query.rid;
  const emailFromAmpReaderId = ampReaderIdToEmailMap[ampReaderId];
  if (emailFromAmpReaderId) {
    console.log(
      `Granting access to ${emailFromAmpReaderId} based on their AMP reader ID.`
    );
    res.json({
      'granted': true,
      'decryptedDocumentKey': DECRYPTED_DOCUMENT_KEY,
      'reason': 'AMP reader ID gives entitlements',
    });
    return;
  }

  // Support entitlements from 1p cookies.
  // This doesn't work on the AMP cache.
  const cookieHasEntitlements = getUserInfoFromCookies(req);
  if (cookieHasEntitlements) {
    res.json({
      'granted': true,
      'decryptedDocumentKey': DECRYPTED_DOCUMENT_KEY,
      'reason': '1p cookie gives entitlements',
    });
    return;
  }

  // Support publisher metering.
  // This doesn't work on the AMP cache.
  // TODO: Support AMP cache using AMP reader IDs.
  const meteringIsEnabled = req.query.meter === '1';
  if (meteringIsEnabled) {
    const publicationId = req.query.pubid;
    const meter = getMeterFromCookies(req);
    if (meter > 0) {
      res.json({
        'products': [publicationId + ':news'],
        'metering': {
          'left': meter,
          'total': MAX_METER,
        },
      });
    } else {
      res.json({});
    }
    return;
  }

  // Default to an empty response.
  res.json({});
});

/**
 * AMP pingback request.
 */
app.post('/amp-pingback', (req, res) => {
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', req.headers.origin || '*');
  res.setHeader(
    'Access-Control-Expose-Headers',
    'AMP-Access-Control-Allow-Source-Origin'
  );
  res.setHeader('Content-Type', 'application/json');
  if (req.query.__amp_source_origin) {
    res.setHeader(
      'AMP-Access-Control-Allow-Source-Origin',
      req.query.__amp_source_origin
    );
  }
  decMeterInCookies(req, res);
  res.json({});
});

/**
 * GSI iframe for metering demo.
 */
app.get('/gsi-iframe', (req, res) => {
  res.render('../app/views/gsi-signin-iframe', {
    swgGaaJsUrl: getSwgGaaJsUrl(req),
    googleSignInClientId,
  });
});

/**
 * Setup page.
 */
app.get('/setup', (req, res) => {
  const state = getSetup(req);
  const args = {};
  args['script'] = state.script;
  args['script_' + state.script] = true;
  args['script_custom_url'] = state.scriptCustomServerUrl;
  res.render('../app/views/setup', args);
});

/**
 * Update setup page.
 */
app.post('/update-setup', (req, res) => {
  // Update data.
  const state = {
    script: req.body['script'] || 'local',
    scriptCustomServerUrl: req.body['script-custom-server-url'] || '',
  };

  res.clearCookie('script');
  res.cookie('script', state.script);

  res.clearCookie('script-custom-server-url');
  res.cookie('script-custom-server-url', state.scriptCustomServerUrl);

  // Redirect back.
  res.redirect(302, '/setup');
});

/** Returns swg-js with a custom server URL. */
app.get('/production-swg-js-with-custom-server-url', async (req, res) => {
  const setup = getSetup(req);
  const swgJs = await fetch(
    'https://news.google.com/swg/js/v1/swg.js'
  ).then((res) => res.text());
  const customizedSwgJs = swgJs
    .replace(/"https:\/\/news.google.com"/g, `"${setup.scriptCustomServerUrl}"`)
    .replace(
      /"https:\/\/news.google.com\/_/g,
      `"${setup.scriptCustomServerUrl}/_`
    );
  res.send(customizedSwgJs);
});

/**
 * @param {!HttpRequest} req
 * @return {{
 *   script: string,
 *   scriptCustomServerUrl: string|undefined,
 * }}
 */
function getSetup(req) {
  return {
    script: (req.cookies && req.cookies['script']) || 'prod',
    scriptCustomServerUrl:
      (req.cookies && req.cookies['script-custom-server-url']) || '',
  };
}

/**
 * Returns URL for swg-js for a given request.
 * @param {!HttpRequest} req
 */
function getSwgJsUrl(req) {
  const setup = getSetup(req);
  if (setup.script === 'custom') {
    return '/production-swg-js-with-custom-server-url';
  } else {
    return SWG_JS_URLS[setup.script];
  }
}

/**
 * Returns URL for swg-gaa for a given request.
 * @param {!HttpRequest} req
 */
function getSwgGaaJsUrl(req) {
  const setup = getSetup(req);
  if (setup.script === 'custom') {
    setup.script = 'prod';
  }
  return SWG_GAA_JS_URLS[setup.script];
}

/**
 * @param {!HttpRequest} req
 * @param {string} name
 * @return {?string}
 */
function getParam(req, name) {
  return req.query[name] || (req.body && req.body[name]) || null;
}

/**
 * Returns subscriber.
 * @param {!HttpRequest} req
 * @return {?string}
 * @private
 */
function getUserInfoFromCookies(req) {
  const cookie = req.cookies && req.cookies[AUTH_COOKIE];
  if (!cookie) {
    return null;
  }
  return decrypt(fromBase64(cookie));
}

/**
 * Sets user email in the cookie.
 * @param {!HttpResponse} res
 * @param {string} email
 * @private
 */
function setUserInfoInCookies(res, email) {
  res.clearCookie(AUTH_COOKIE);
  if (email) {
    res.cookie(AUTH_COOKIE, toBase64(encrypt(email)), {
      maxAge: /* 60 minutes */ 1000 * 60 * 60,
    });
  }
}

/**
 * @param {string} returnUrl
 * @return {string}
 */
function cleanupReturnUrl(returnUrl) {
  if (!returnUrl) {
    returnUrl = '/';
  }
  // Make sure we do not introduce a universal unbound redirector.
  if (
    !returnUrl.startsWith('/') &&
    !returnUrl.startsWith('https://cdn.ampproject.org') &&
    !returnUrl.startsWith('https://scenic-2017.appspot.com') &&
    !returnUrl.startsWith('http://localhost:') &&
    !returnUrl.startsWith('https://localhost:')
  ) {
    returnUrl = '/';
  }
  return returnUrl;
}

/**
 * @param {!HttpRequest} req
 * @return {number}
 */
function getMeterFromCookies(req) {
  const cookie = req.cookies && req.cookies[METER_COOKIE];
  if (!cookie) {
    return MAX_METER;
  }
  return parseInt(cookie, 10);
}

/**
 * @param {!HttpRequest} req
 * @param {!HttpResponse} res
 */
function decMeterInCookies(req, res) {
  const oldMeter = getMeterFromCookies(req);
  const newMeter = Math.max(oldMeter - 1, 0);
  res.cookie(METER_COOKIE, String(newMeter), {
    maxAge: /* 60 minutes */ 1000 * 60 * 60,
  });
}

/**
 * @param {string} name
 * @param {?string} rtv
 * @return {string}
 */
function ampJsUrl(name, rtv) {
  const cdnBase = rtv
    ? 'https://cdn.ampproject.org/rtv/' + rtv
    : 'https://cdn.ampproject.org';
  if (name == 'amp') {
    return AMP_LOCAL ? 'http://localhost:8001/dist/amp.js' : cdnBase + '/v0.js';
  }
  return AMP_LOCAL
    ? 'http://localhost:8001/dist/v0/' + name + '-0.1.max.js'
    : cdnBase + '/v0/' + name + '-0.1.js';
}
