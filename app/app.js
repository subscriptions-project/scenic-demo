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

const jsonwebtoken = require('jsonwebtoken');
const {
  decrypt,
  encrypt,
  fromBase64,
  toBase64,
} = require('./crypto');

const app = module.exports = require('express').Router();
app.use(require('cookie-parser')())
app.use('/', require('./oauth-app'));

const PUBLICATION_ID = process.env.SERVE_PUBID || 'scenic-2017.appspot.com';
const AMP_LOCAL = process.env.SERVE_AMP_LOCAL == 'true';

const BASE_URL = process.env.NODE_ENV == 'production' ?
    'https://scenic-2017.appspot.com' :
    '//localhost:8000'

const SWG_JS_URLS = {
  local: '/swgjs/swg.max.js',
  local_min: '/swgjs/swg.js',
  prod: 'https://news.google.com/swg/js/v1/swg.js',
  autopush: 'https://news.google.com/swg/js/v1/swg-autopush.js',
  tt: 'https://news.google.com/swg/js/v1/swg-tt.js',
  qual: 'https://news.google.com/swg/js/v1/swg-qual.js',
};

const AUTH_COOKIE = 'SCENIC_AUTH';
const METER_COOKIE = 'SCENIC_METER';
const MAX_METER = 3;

const ARTICLES = require('./content').ARTICLES;

// Info.
if (console.log) {
  console.log('Scenic started. Publication: ' + PUBLICATION_ID);
}


/**
 * List all Articles.
 */
app.get('/', (req, res) => {
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
    articles: ARTICLES,
  });
});


/**
 * An Article.
 * TODO(dvoytenko): remove "/examples/" path
 */
app.get(['/((\\d+))', '/examples/sample-pub/((\\d+))'], (req, res) => {
  const id = parseInt(req.params[0], 10);
  const article = ARTICLES[id - 1];
  const prevId = (id - 1) >= 0 ? String(id - 1) : false;
  const nextId = (id + 1) < ARTICLES.length ? String(id + 1) : false;
  const setup = getSetup(req);
  res.render('../app/views/article', {
    swgJsUrl: SWG_JS_URLS[setup.script],
    setup: setup,
    publicationId: PUBLICATION_ID,
    id,
    article,
    prev: prevId,
    next: nextId,
  });
});


/**
 * An AMP Article.
 * TODO(dvoytenko): remove "/examples/" path
 */
app.get(['/((\\d+))\.amp', '/examples/sample-pub/((\\d+))\.amp'], (req, res) => {
  const id = parseInt(req.params[0], 10);
  const article = ARTICLES[id - 1];
  const prevId = (id - 1) >= 0 ? String(id - 1) + '.amp' : false;
  const nextId = (id + 1) < ARTICLES.length ? String(id + 1) + '.amp' : false;
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
    publicationId: PUBLICATION_ID,
    // TODO(dvoytenko): remove completely.
    // authConnect: ac,
    id,
    article,
    prev: prevId,
    next: nextId,
  });
});


/**
 * RSS Feed.
 */
app.get('/feed.xml', (req, res) => {
  res.set('Content-Type', 'text/xml');
  res.render('../app/views/feed-xml', {
    updateTimeIso: new Date().toISOString(),
    articles: ARTICLES.map(article => {
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
  setUserInfoInCookies(res, email);
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
  const pubId = req.query.pubid;
  // TODO(dvoytenko): test if the origin is actually allowed.
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', req.headers.origin || '*');
  res.setHeader('Access-Control-Expose-Headers',
      'AMP-Access-Control-Allow-Source-Origin');
  res.setHeader('Content-Type', 'application/json');
  if (req.query.__amp_source_origin) {
    res.setHeader('AMP-Access-Control-Allow-Source-Origin',
        req.query.__amp_source_origin);
  }
  const email = getUserInfoFromCookies(req);
  if (email) {
    res.json({
      'products': [pubId + ':news'],
      'subscriptionToken': 'subtok-' + pubId + '-' + toBase64(encrypt(email)),
    });
  } else if (req.query.meter == '1') {
    const meter = getMeterFromCookies(req);
    if (meter > 0) {
      res.json({
        'products': [pubId + ':news'],
        'metering': {
          'left': meter,
          'total': MAX_METER,
        },
      });
    } else {
      res.json({});
    }
  } else {
    res.json({});
  }
});


/**
 * AMP pingback request.
 */
app.post('/amp-pingback', (req, res) => {
  const pubId = req.query.pubid;
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', req.headers.origin || '*');
  res.setHeader('Access-Control-Expose-Headers',
      'AMP-Access-Control-Allow-Source-Origin');
  res.setHeader('Content-Type', 'application/json');
  if (req.query.__amp_source_origin) {
    res.setHeader('AMP-Access-Control-Allow-Source-Origin',
        req.query.__amp_source_origin);
  }
  decMeterInCookies(req, res);
  res.json({});
});


/**
 * Setup page.
 */
app.get('/setup', (req, res) => {
  const state = getSetup(req);
  const args = {};
  args['script'] = state.script;
  args['script_' + state.script] = true;
  res.render('../app/views/setup', args);
});


/**
 * Update setup page.
 */
app.post('/update-setup', (req, res) => {
  // Update data.
  const state = {
    script: req.body['script'] || 'local',
  };
  res.clearCookie('script');
  res.cookie('script', state.script);

  // Redirect back.
  res.redirect(302, '/setup');
});


/**
 * @param {!HttpRequest} req
 * @return {{
 *   script: string,
 * }}
 */
function getSetup(req) {
  return {
    script: req.cookies && req.cookies['script'] || 'prod',
  };
}


/**
 * @param {!HttpRequest} req
 * @param {string} name
 * @return {?string}
 */
function getParam(req, name) {
  return req.query[name] || req.body && req.body[name] || null;
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
    res.cookie(AUTH_COOKIE, toBase64(encrypt(email)),
        {maxAge: /* 60 minutes */1000 * 60 * 60});
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
  if (!returnUrl.startsWith('/') &&
      !returnUrl.startsWith('https://cdn.ampproject.org') &&
      !returnUrl.startsWith('https://scenic-2017.appspot.com') &&
      !returnUrl.startsWith('http://localhost:') &&
      !returnUrl.startsWith('https://localhost:')) {
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
  res.cookie(METER_COOKIE, String(newMeter),
      {maxAge: /* 60 minutes */ 1000 * 60 * 60});
}

/**
 * @param {string} name
 * @param {?string} rtv
 * @return {string}
 */
function ampJsUrl(name, rtv) {
  const cdnBase = rtv ?
      'https://cdn.ampproject.org/rtv/' + rtv :
      'https://cdn.ampproject.org';
  if (name == 'amp') {
    return AMP_LOCAL ?
        'http://localhost:8001/dist/amp.js' :
        cdnBase + '/v0.js';
  }
  return AMP_LOCAL ?
      'http://localhost:8001/dist/v0/' + name + '-0.1.max.js' :
      cdnBase + '/v0/' + name + '-0.1.js';
}
