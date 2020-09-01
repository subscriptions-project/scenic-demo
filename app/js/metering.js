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

/** Helps demonstrate metering functionality. */
export const MeteringDemo = {
  /** Sets up controls for the metering demo. */
  setupControls: () => {
    // Wire up reset button.
    document
        .querySelector('#metering-controls button')
        .addEventListener('click', () => {
        // Forget the existing PPID.
          delete localStorage.meteringStateId;

          // Refresh so a new PPID will be created and used.
          window.location.reload();
        });

    // Show reset button.
    document.body.classList.add('metering');

    // Update nav button to carry over full URL query.
    document.querySelectorAll('header .nav-button').forEach(navButton => {
      navButton.href = navButton.href.replace(/\?.*/, location.search);
    });
  },

  /** Returns a new Publisher Provided ID (PPID) suitable for demo purposes. */
  createPpid: () => 'ppid' + Math.round(Math.random() * 9999999999999999),

  /** Returns a Publisher Provided ID (PPID) suitable for demo purposes. */
  getPpid: () => {
    if (!localStorage.meteringStateId) {
      localStorage.meteringStateId = MeteringDemo.createPpid();
    }
    console.log('Metering PPID: ' + localStorage.meteringStateId);
    return localStorage.meteringStateId;
  },

  /** Opens the paywall for demo purposes. */
  openPaywall: () => {
    document.documentElement.classList.add('open-paywall');
  },
};
