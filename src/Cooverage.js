/**
 * Copyright (c) Mik BRY
 * mik@miklabs.com
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
// import fs from 'fs';
/* import path from 'path';
import spawn from './utils/spawn'; */

// const fsp = fs.promises;

export default class Cooverage {
  constructor(outputDir, noPublish, publisherArguments) {
    this.outputDir = outputDir;
    this.noPublish = noPublish;
    this.publisherArguments = publisherArguments;
  }
}
