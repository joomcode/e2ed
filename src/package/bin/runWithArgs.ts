/**
 * @file Fix bug with circular require 'convert-source-map'.
 * {@link https://github.com/babel/babel/issues/11964}
 */

import {JSON_REPORT_PATH} from '../constants/internal';
import {config} from '../testcaferc';
import {registerEndE2edRunEvent, registerStartE2edRunEvent} from '../utils/events';
import {generalLog} from '../utils/generalLog';
import {getFileSize} from '../utils/getFileSize';
import {getIntegerFromEnvVariable} from '../utils/getIntegerFromEnvVariable';
import {getStartMessage} from '../utils/getStartMessage';
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

const {browsers} = config;

const concurrency = getIntegerFromEnvVariable({
  defaultValue: 1,
  maxValue: 50,
  name: 'E2ED_CONCURRENCY',
});

const startMessage = getStartMessage();

const e2edRunEvent: E2edRunEvent = {
  concurrency,
  runEnvironment: 'local',
  startMessage,
  utcTimeInMs: Date.now() as UtcTimeInMs,
};

generalLog(`${startMessage}\n`);

void registerStartE2edRunEvent(e2edRunEvent);

const runLabel = getRunLabel({concurrency, maxRetry: 1, retry: 1});

process.env.E2ED_RUN_LABEL = runLabel;

const maybeBrowsersArg = process.argv[2];

const hasBrowsersArg =
  maybeBrowsersArg !== undefined &&
  !maybeBrowsersArg.startsWith('-') &&
  !maybeBrowsersArg.startsWith('e2ed');

if (browsers.length > 0 && hasBrowsersArg === false) {
  process.argv.splice(2, 0, String(browsers));
}

process.argv.push('--concurrency', String(concurrency));

process.argv.push('--config-file', './node_modules/e2ed/testcaferc.js');

// eslint-disable-next-line import/no-commonjs, import/no-internal-modules, import/no-unassigned-import
require('testcafe-without-typecheck/lib/cli/cli');

/**
 * @todo Next code need refactor.
 */

const startTimeInMs = Date.now() as UtcTimeInMs;

let previousSize: number | undefined;
let cleared = false;

const clear = (id: NodeJS.Timeout): void => {
  clearInterval(id);
  cleared = true;
};

const timer: NodeJS.Timeout = setInterval(() => {
  if (cleared) {
    return;
  }

  if (Date.now() - startTimeInMs > 10 * 60_000) {
    clear(timer);

    return;
  }

  void getFileSize(JSON_REPORT_PATH).then((size) => {
    if (cleared) {
      return;
    }

    if (size === previousSize) {
      return;
    }

    if (previousSize !== undefined && size > previousSize) {
      const utcTimeInMs = Date.now() as UtcTimeInMs;

      void registerEndE2edRunEvent({utcTimeInMs});

      clear(timer);
    }

    previousSize = size;
  });
}, 1_000);
