/**
 * @file Fix bug with circular require 'convert-source-map'.
 * {@link https://github.com/babel/babel/issues/11964}
 */

import {stat} from 'fs/promises';

import {JSON_REPORT_PATH} from '../constants/internal';
import {generalLog} from '../utils/generalLog';
import {getIntegerFromEnvVariable} from '../utils/getIntegerFromEnvVariable';
import {getStartMessage} from '../utils/getStartMessage';
import {registerFinishE2edEvent} from '../utils/registerFinishE2edEvent';
import {registerRunE2edEvent} from '../utils/registerRunE2edEvent';

import type {RunE2edEvent, UtcTimeInMs} from '../types/internal';

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

const runE2edEvent: RunE2edEvent = {
  concurrency,
  runEnvironment: 'local',
  startMessage,
  utcTimeInMs: Date.now() as UtcTimeInMs,
};

generalLog(`${startMessage}\n`);

void registerRunE2edEvent(runE2edEvent);

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

        registerFinishE2edEvent({utcTimeInMs});

        clear(timer);
      }

      previousStatData = statData;
    }
  });
}, 1_000);
