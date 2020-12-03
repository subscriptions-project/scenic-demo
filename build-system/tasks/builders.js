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
'use strict';

const $$ = require('gulp-load-plugins')();
const babel = require('babelify');
const browserify = require('browserify');
const buffer = require('vinyl-buffer');
const colors = require('ansi-colors');
const del = require('del');
const fs = require('fs-extra');
const gulp = $$.help(require('gulp'));
const lazypipe = require('lazypipe');
const log = require('fancy-log');
const source = require('vinyl-source-stream');
const watchify = require('watchify');

/**
 * Clean up the build artifacts.
 * @return {!Promise}
 */
function clean() {
  return del(['dist', 'build']);
}

/**
 * Enables watching for file changes and re-compiles.
 * @return {!Promise}
 */
function watch() {
  return Promise.all([compile({watch: true})]);
}

/**
 * Main development build.
 * @param {boolean=} opt_prod
 * @return {!Promise}
 */
function build(opt_prod) {
  process.env.NODE_ENV = opt_prod ? 'production' : 'development';
  return Promise.all([compile()]);
}

/**
 * Dist build for prod.
 * @return {!Promise}
 */
function dist() {
  return clean().then(() => build(true));
}

/**
 * @param {!Object=} opt_opts
 * @return {!Promise}
 */
function compile(opt_opts) {
  const options = opt_opts || {};
  const srcDir = './app/js/';
  const srcFilename = 'main';
  const destDir = './dist';
  const destFilename = srcFilename + '.max.js';
  mkdirSync('build');

  let bundler = browserify(srcDir + srcFilename + '.js', {
    debug: true,
  }).transform(babel, {presets: ['@babel/preset-env']});
  if (options.watch) {
    bundler = watchify(bundler);
  }

  const wrapper = options.wrapper || '<%= contents %>';

  let lazybuild = lazypipe()
    .pipe(source, srcFilename + '.js')
    .pipe(buffer);

  // Complete build with wrapper and sourcemaps.
  lazybuild = lazybuild
    .pipe($$.wrap, wrapper)
    .pipe($$.sourcemaps.init.bind($$.sourcemaps), {loadMaps: true});

  const lazywrite = lazypipe()
    .pipe($$.sourcemaps.write.bind($$.sourcemaps), './')
    .pipe(gulp.dest.bind(gulp), destDir);

  async function rebundle() {
    const startTime = Date.now();
    await toPromise(
      bundler
        .bundle()
        .on('error', (err) => {
          console.error(colors.red(err));
        })
        .pipe(lazybuild())
        .pipe($$.rename(destFilename))
        .pipe(lazywrite())
    );

    endBuildStep('Compiled', srcFilename, startTime);
  }

  if (options.watch) {
    bundler.on('update', function () {
      rebundle();
    });
  }

  if (options.watch === false) {
    // Due to the two step build process, compileJs() is called twice, once with
    // options.watch set to true and, once with it set to false. However, we do
    // not need to call rebundle() twice. This avoids the duplicate compile seen
    // when you run `gulp watch` and touch a file.
    return Promise.resolve();
  } else {
    // This is the default options.watch === true case, and also covers the
    // `gulp build` / `gulp dist` cases where options.watch is undefined.
    return rebundle();
  }
}

/**
 * @param {string} path
 */
function mkdirSync(path) {
  try {
    fs.mkdirSync(path);
  } catch (e) {
    if (e.code != 'EEXIST') {
      throw e;
    }
  }
}

/**
 * @return {!Promise}
 */
function toPromise(readable) {
  return new Promise(function (resolve, reject) {
    readable.on('error', reject).on('end', resolve);
  });
}

/**
 * Stops the timer for the given build step and prints the execution time,
 * unless we are on Travis.
 * @param {string} stepName Name of the action, like 'Compiled' or 'Minified'
 * @param {string} targetName Name of the target, like a filename or path
 * @param {DOMHighResTimeStamp} startTime Start time of build step
 */
function endBuildStep(stepName, targetName, startTime) {
  const endTime = Date.now();
  const executionTime = new Date(endTime - startTime);
  const secs = executionTime.getSeconds();
  const ms = executionTime.getMilliseconds().toString();
  let timeString = '(';
  if (secs === 0) {
    timeString += ms + ' ms)';
  } else {
    timeString += secs + '.' + ms + ' s)';
  }
  if (!process.env.TRAVIS) {
    log(stepName, colors.cyan(targetName), colors.green(timeString));
  }
}

clean.description = 'Removes build output';
gulp.task('clean', clean);

watch.description = 'Watches for changes in files, re-build';
gulp.task('watch', watch);

build.description = 'Builds the demo';
gulp.task('build', build);

dist.description = 'Build the demo in prod mode';
gulp.task('dist', dist);
