/**
 * Copyright (c) 2019-present, Mik BRY
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import chalk from 'chalk';
import emoji from 'node-emoji';
import minimist from 'minimist';
import { getPackage } from './utils/package';
import Cooverage from './Cooverage';

class CooverageCli {
  constructor(args, output, exit) {
    this.output = output;
    this.args = args;
    this.exit = exit;
    this.chalk = chalk;
    this.options = {
      string: ['dist'],
      boolean: ['help'],
      stopEarly: true,
      alias: {
        h: 'help',
      },
      default: {
        help: false,
      },
    };
  }

  log(text, ...opts) {
    this.output.log(text, ...opts);
  }

  error(text, ...opts) {
    this.output.error(text, ...opts);
  }

  header() {
    const { version } = getPackage();
    this.log(chalk.bold(emoji.emojify(`Cooverage v${version}`)));
  }

  usage() {
    this.log('Usage: $ cooverage [options]');
  }

  help() {
    this.usage();
    this.log('');
    this.log('Displays help informations.');
    this.log('');
    this.log('Options:');
    this.log('-h, --help               Displays help informations');
    this.log('');
    this.log('Examples:');
    this.log('$ cooverage');
  }

  async execute() {
    this.hrstart = process.hrtime();
    this.header();
    const args = minimist(this.args, this.options);
    if (args.help) {
      // Display help
      this.help();
    } else {
      // WIP execute
      const cooverage = new Cooverage(args.dist, args.n, args._);
      await cooverage.transform();
      await cooverage.write();
      // this.log('args=', args);
    }
  }
}
/* istanbul ignore next */
const start = async (output = console) => {
  const version = process.versions.node;
  const major = parseInt(version.split('.')[0], 10);

  if (major < 10) {
    output.error(`Node version ${version} is not supported, please use Node.js 10.0 or higher.`);
    process.exit(1);
  }

  // Grab arguments
  const [, , ...args] = process.argv;
  const cli = new CooverageCli(args, output, process.exit);
  await cli.execute();
  return cli;
};
export { CooverageCli };
export default start;
