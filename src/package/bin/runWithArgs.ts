/**
 * @file Fix bug with circular require 'convert-source-map'.
 * {@link https://github.com/babel/babel/issues/11964}
 */

import {registerStartE2edRunEvent, waitForEndE2edRunEvent} from '../utils/events';
import {generalLog} from '../utils/generalLog';
import {getFullConfig} from '../utils/getFullConfig';
import {hasBrowsersArg} from '../utils/hasBrowsersArg';
import {getRunLabel} from '../utils/runLabel';

import type {E2edRunEvent, UtcTimeInMs} from '../types/internal';

try {
  // eslint-disable-next-line
  require('@babel/core').transformSync('1', {
    babelrc: false,
    configFile: false,
    sourceMaps: 'inline',
  });
  delete require.cache[require.resolve('convert-source-map')];
} catch (error) {
  generalLog(`Error in convert-source-map fix: ${String(error)}`);
}

process.env.E2ED_IS_LOCAL_RUN = 'true';

const e2edRunEvent: E2edRunEvent = {
  utcTimeInMs: Date.now() as UtcTimeInMs,
};

void registerStartE2edRunEvent(e2edRunEvent).then(() => {
  const {browsers, concurrency} = getFullConfig();
  const runLabel = getRunLabel({concurrency, maxRetriesCount: 1, retryIndex: 1});

  process.env.E2ED_RUN_LABEL = runLabel;

  if (browsers.length > 0 && hasBrowsersArg() === false) {
    process.argv.splice(2, 0, String(browsers));
  }

  process.argv.push('--concurrency', String(concurrency));
  process.argv.push('--config-file', './node_modules/e2ed/testcaferc.js');

  // eslint-disable-next-line global-require, import/no-internal-modules, import/no-unassigned-import
  require('testcafe-without-typecheck/lib/cli/cli');

  waitForEndE2edRunEvent();
});
