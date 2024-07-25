import {spawn} from 'node:child_process';

import {CONFIG_PATH, e2edEnvironment, EndE2edReason} from '../../constants/internal';

import {getFullPackConfig} from '../config';
import {endE2ed} from '../end';
import {setRunLabel} from '../environment';
import {generalLog} from '../generalLog';
import {startResourceUsageReading} from '../resourceUsage';
import {createRunLabel} from '../runLabel';

/**
 * Runs e2ed pack of tests (or tasks) with command line arguments.
 * @internal
 */
export const runPackWithArgs = async (): Promise<void> => {
  const {concurrency, enableLiveMode, resourceUsageReadingInternal} = getFullPackConfig();
  const runLabel = createRunLabel({
    concurrency,
    disconnectedBrowsersCount: 0,
    maxRetriesCount: 1,
    retryIndex: 1,
  });

  startResourceUsageReading(resourceUsageReadingInternal);
  setRunLabel(runLabel);

  await new Promise<void>((res) => {
    const playwrightArgs = ['playwright', 'test', '--config', CONFIG_PATH];

    // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
    if (e2edEnvironment.E2ED_DEBUG) {
      e2edEnvironment.PWDEBUG = 'console';
      playwrightArgs.push('--debug');
    }

    const playwrightProcess = spawn('npx', playwrightArgs);

    playwrightProcess.stdout.on('data', (data) => {
      const stringData = String(data).trim();

      if (stringData !== '') {
        if (stringData.startsWith('[e2ed]')) {
          // eslint-disable-next-line no-console
          console.log(stringData);
        } else {
          generalLog(stringData);
        }
      }
    });
    playwrightProcess.stderr.on('data', (data) => generalLog(`Error: ${String(data)}`));

    playwrightProcess.on('close', () => {
      res();
    });
  });

  if (enableLiveMode) {
    process.argv.push('--live');
  }

  endE2ed(EndE2edReason.LocalRunEnded);
};
