/**
 * @file Fix bug with circular require 'convert-source-map'.
 * {@link https://github.com/babel/babel/issues/11964}
 */

import {RunEnvironment, setRunEnvironment} from '../configurator';
import {registerEndE2edRunEvent, registerStartE2edRunEvent} from '../utils/events';
import {generalLog} from '../utils/generalLog';
import {getFullConfig} from '../utils/getFullConfig';
import {hasBrowsersArg} from '../utils/hasBrowsersArg';
import {getRunLabel} from '../utils/runLabel';

import type {E2edEnvironment} from '../types/internal';

/**
 * @todo Remove this hack when it becomes unnecessary.
 */
try {
  // eslint-disable-next-line
  require('@babel/core').transformSync('1', {
    babelrc: false,
    configFile: false,
    sourceMaps: 'inline',
  });
  // eslint-disable-next-line @typescript-eslint/no-dynamic-delete
  delete require.cache[require.resolve('convert-source-map')];
} catch (error) {
  generalLog('Error in convert-source-map fix', {error});
}

setRunEnvironment(RunEnvironment.Local);

void registerStartE2edRunEvent().then(async () => {
  const {browsers, concurrency} = getFullConfig();
  const runLabel = getRunLabel({concurrency, maxRetriesCount: 1, retryIndex: 1});

  (process.env as E2edEnvironment).E2ED_RUN_LABEL = runLabel;

  if (browsers.length > 0 && hasBrowsersArg() === false) {
    process.argv.splice(2, 0, String(browsers));
  }

  process.argv.push('--concurrency', String(concurrency));
  process.argv.push('--config-file', './node_modules/e2ed/testcaferc.js');

  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const {
    runTestCafePromise,
  }: // eslint-disable-next-line global-require, import/no-internal-modules, @typescript-eslint/no-var-requires
  typeof import('testcafe-without-typecheck/lib/cli/cli') = require('testcafe-without-typecheck/lib/cli/cli');

  await runTestCafePromise;

  await registerEndE2edRunEvent();
});
