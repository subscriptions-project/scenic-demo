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
