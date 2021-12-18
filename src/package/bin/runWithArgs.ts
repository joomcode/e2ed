/**
 * @file Fix bug with circular require 'convert-source-map'.
 * {@link https://github.com/babel/babel/issues/11964}
 */

import {stat} from 'fs/promises';

import {JSON_REPORT_PATH} from '../constants/internal';
import {generalLog} from '../utils/generalLog';
import {getIntegerFromEnvVariable} from '../utils/getIntegerFromEnvVariable';
import {getStartMessage} from '../utils/getStartMessage';
import {registerEndE2edRunEvent, registerStartE2edRunEvent} from '../utils/events';

import type {E2edRunEvent, UtcTimeInMs} from '../types/internal';

try {
  // eslint-disable-next-line
  require('@babel/core').transformSync('1', {
    sourceMaps: 'inline',
    configFile: false,
    babelrc: false,
  });
  delete require.cache[require.resolve('convert-source-map')];
} catch (error) {
  generalLog(`Error in convert-source-map fix: ${String(error)}`);
}

process.env.E2ED_IS_LOCAL_RUN = 'true';

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

process.argv.push('--concurrency', String(concurrency));

process.argv.push('--config-file', './node_modules/e2ed/testcaferc.js');

require('testcafe-without-typecheck/lib/cli/cli');

/**
 * TODO: Need refactor.
 */
const startTimeInMs = Date.now() as UtcTimeInMs;
let previousStatData: string | undefined;
let cleared = false;

const clear = (id: NodeJS.Timer) => {
  clearInterval(id);
  cleared = true;
};

const timer: NodeJS.Timer = setInterval(() => {
  if (cleared) {
    return;
  }

  if (Date.now() - startTimeInMs > 10 * 60_000) {
    return clear(timer);
  }

  stat(JSON_REPORT_PATH).then((statObject) => {
    if (cleared) {
      return;
    }

    const statData = JSON.stringify(statObject);

    if (statData !== previousStatData) {
      if (previousStatData !== undefined) {
        const utcTimeInMs = Date.now() as UtcTimeInMs;

        registerEndE2edRunEvent({utcTimeInMs});

        clear(timer);
      }

      previousStatData = statData;
    }
  });
}, 1_000);
