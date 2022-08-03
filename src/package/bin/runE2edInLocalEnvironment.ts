/**
 * @file Fix bug with circular require 'convert-source-map'.
 * {@link https://github.com/babel/babel/issues/11964}
 */

import {RunEnvironment, setRunEnvironment, startTimeInMs} from '../configurator';
import {registerStartE2edRunEvent, waitForEndE2edRunEvent} from '../utils/events';
import {generalLog} from '../utils/generalLog';
import {getFullConfig} from '../utils/getFullConfig';
import {hasBrowsersArg} from '../utils/hasBrowsersArg';
import {getRunLabel} from '../utils/runLabel';

import type {E2edEnvironment, E2edRunEvent} from '../types/internal';

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
  generalLog(`Error in convert-source-map fix: ${String(error)}`);
}

setRunEnvironment(RunEnvironment.Local);

const e2edRunEvent: E2edRunEvent = {
  utcTimeInMs: startTimeInMs,
};

void registerStartE2edRunEvent(e2edRunEvent).then(() => {
  const {browsers, concurrency} = getFullConfig();
  const runLabel = getRunLabel({concurrency, maxRetriesCount: 1, retryIndex: 1});

  (process.env as E2edEnvironment).E2ED_RUN_LABEL = runLabel;

  if (browsers.length > 0 && hasBrowsersArg() === false) {
    process.argv.splice(2, 0, String(browsers));
  }

  process.argv.push('--concurrency', String(concurrency));
  process.argv.push('--config-file', './node_modules/e2ed/testcaferc.js');

  // eslint-disable-next-line global-require, import/no-internal-modules, import/no-unassigned-import
  require('testcafe-without-typecheck/lib/cli/cli');

  waitForEndE2edRunEvent();
});
