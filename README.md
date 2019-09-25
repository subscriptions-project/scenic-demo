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


## How to deploy the demo

- Install gcloud: https://cloud.google.com/sdk/install
- Login: `gcloud auth login`
- Set the project: `gcloud config set project scenic-2017`
- Deploy: `gcloud app deploy`
