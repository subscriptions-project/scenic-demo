# Scenic Demo - sample integrations with Subscriptions Project

Scenic Demo is a sample content site that demonstrates integration with
Subscribe with Google (SwG).


## How to try out the demo

https://scenic-2017.appspot.com


## How to run the demo locally

First, install Nodejs, yarn, and gulp.

Then install the Nodejs dependencies with yarn.

```bash
yarn
```

Then start the server with gulp.

```bash
gulp
```
You can also use gulp with a local .env file for environmental variables.

```
npm run start-local
```

See [package.json](package.json)'s `scripts` section for more details.

### Local .env file configurations

Using a local .env file, you can set environmental vairables to emulate
different running conditions.

*   **PORT** Specify the default port that the server runs at.
*   **GOOGLE_SITE_VERIFICATION** Set a value for
    [HTML Meta tag site verification](https://support.google.com/webmasters/answer/9008080?hl=en)
*   **PROXY_URL** Circumvent https requirement for non-localhost testing
    environs.
*   **HOST** Can be set to `0.0.0.0` for
    [non-localhost routing using gulp](https://github.com/schickling/gulp-webserver#why-cant-i-reach-the-server-from-the-network).

A sample `.env` file:

```
PORT=8080
GOOGLE_SITE_VERIFICATION=abc123
PROXY_URL=test-url.local
HOST=0.0.0.0
```

## How to update swg.js for local mode

After the server starts to run in localhost, you can select `local` mode to
inspect swg.js served from ./swgjs directory. The way to update ./swgjs is

- In your swg-js local repo, run `gulp dist` to generate the minified swg js and
  then run `gulp build` to generate the unminified swg js.
- In dist directory, you should be able to see 4 files:
  - subscriptions.js
  - subscriptions.js.map
  - subscriptions.max.js
  - subscriptions.max.js.map
- Sets `$SWG_HOME` to be the path to swg-js repo
- In your scenic-demo local repo, run

  ```
  cp $SWG_HOME/dist/subscriptions.js swgjs/swg.js &
  cp $SWG_HOME/dist/subscriptions.js.map swgjs/swg.js.map &
  cp $SWG_HOME/dist/subscriptions.max.js swgjs/swg.max.js &
  cp $SWG_HOME/dist/subscriptions.max.js.map swgjs/swg.max.js.map
  ```

Then you can create a PR with these 4 files and merge.

Now you can visit http://scenic-2017.appspot.com/setup
and select `local` mode. http://scenic-2017.appspot.com will then serve swgjs
from `./swgjs` directory.

## How to deploy the demo

- Install gcloud: https://cloud.google.com/sdk/install
- Login: `gcloud auth login`
- Set the project: `gcloud config set project scenic-2017`
- Deploy: `npm run deploy`
