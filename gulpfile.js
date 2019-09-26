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

const $$ = require('gulp-load-plugins')();
const gulp = $$.help(require('gulp'));
const {lint} = require('./build-system/tasks/lint');

/** @const {number} */
const NODE_MIN_VERSION = 4;

require('./build-system/tasks');

/**
 * Checks if installed local Node.js version is > NODE_MIN_VERSION.
 */
checkMinVersion();

/**
 * Exits the process if gulp is running with a node version lower than
 * the required version. This has to run very early to avoid parse
 * errors from modules that e.g. use let.
 */
function checkMinVersion() {
  const majorVersion = Number(process.version.replace(/v/, '').split('.')[0]);
  if (majorVersion < NODE_MIN_VERSION) {
    $$.util.log('Please run Subscribe with Google with node.js version ' +
        `${NODE_MIN_VERSION} or newer.`);
    $$.util.log('Your version is', process.version);
    process.exit(1);
  }
}


// Gulp tasks.
gulp.task('presubmit', lint);
gulp.task('default', gulp.series(['watch', 'serve']));
