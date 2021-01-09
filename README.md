# Scenic Demo - sample integrations with Subscriptions Project

Scenic Demo is a sample content site that demonstrates integration with
Subscribe with Google (SwG).

## How to try out the demo

https://scenic-2017.appspot.com

## Glitch

[![Remix on Glitch](https://cdn.glitch.com/2703baf2-b643-4da7-ab91-7ee2a2d00b5b%2Fremix-button.svg)](https://glitch.com/edit/#!/import/github/everyplace/scenic-demo)

## How to run the demo locally

First, install Nodejs, yarn, and gulp.

Then install the Nodejs dependencies with yarn.

```bash
yarn
```

Then start the server with gulp.

```
gulp
```

### Local .env file configurations

Using a local .env file, you can set environmental variables to change the
running conditions.

-   **PORT** Specify the default port that the server runs at.
-   **GOOGLE_SITE_VERIFICATION** Set a value for
    [HTML Meta tag site verification](https://support.google.com/webmasters/answer/9008080?hl=en)
-   **PROXY_URL** Circumvent https requirement for non-localhost testing
    environs.
-   **HOST** Can be set to `0.0.0.0` for
    [non-localhost routing using gulp](https://github.com/schickling/gulp-webserver#why-cant-i-reach-the-server-from-the-network).
-   **GSI_CLIENT_ID** Can be set to specify a custom
    [Google Sign-in Client Id](https://developers.google.com/identity/sign-in/web/sign-in).

A sample `.env` file:

```
PORT=8080
GOOGLE_SITE_VERIFICATION=abc123
PROXY_URL=test-url.local
HOST=0.0.0.0
GSI_CLIENT_ID=520465458218-e9vp957krfk2r0i4ejeh6aklqm7c25p4.apps.googleusercontent.com
```

## How to update swg.js for local mode

After the server starts to run in localhost, you can select `local` mode to
inspect swg.js served from ./swgjs directory. The way to update ./swgjs is

-   In your swg-js local repo, run `gulp dist` to generate the minified swg js
    and then run `gulp build` to generate the unminified swg js.
-   In dist directory, you should be able to see 4 files:
    -   subscriptions.js
    -   subscriptions.js.map
    -   subscriptions.max.js
    -   subscriptions.max.js.map
-   Sets `$SWG_HOME` to be the path to swg-js repo
-   In your scenic-demo local repo, run

    ```
    cp $SWG_HOME/dist/subscriptions.js swgjs/swg.js &
    cp $SWG_HOME/dist/subscriptions.js.map swgjs/swg.js.map &
    cp $SWG_HOME/dist/subscriptions.max.js swgjs/swg.max.js &
    cp $SWG_HOME/dist/subscriptions.max.js.map swgjs/swg.max.js.map
    ```

Then you can create a PR with these 4 files and merge.

Now you can visit http://scenic-2017.appspot.com/setup and select `local` mode.
http://scenic-2017.appspot.com will then serve swgjs from `./swgjs` directory.

## How to deploy the demo

-   Install gcloud: https://cloud.google.com/sdk/install
-   Login: `gcloud auth login`
-   Set the project: `gcloud config set project scenic-2017`
-   Deploy: `npm run deploy`
