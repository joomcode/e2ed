import {getFullPackConfig} from '../config';
import {getTestRunEventFileName, readEventFromFile, writeLogEventTime} from '../fs';
import {generalLog} from '../generalLog';
import {getTimeoutPromise} from '../promise';

import {getPreviousRunId} from './getPreviousRunId';

import type {FullTestRun, RunId, TestStaticOptions} from '../../types/internal';

import {test} from '@playwright/test';

const additionToTimeout = 500;

/**
 * Waits before running test for some time from pack config (for retries).
 * @internal
 */
export const waitBeforeRetry = async (
  runId: RunId,
  testStaticOptions: TestStaticOptions,
): Promise<number | undefined> => {
  const {previousRunId, retryIndex} = getPreviousRunId(runId);

  if (previousRunId === undefined) {
    return;
  }

  const fileName = getTestRunEventFileName(previousRunId);
  const fileText = await readEventFromFile(fileName);

  if (fileText === undefined) {
    generalLog('Cannot find JSON file of previous test run', {
      previousRunId,
      runId,
      testStaticOptions,
    });

    return;
  }

  try {
    const fullTestRun = JSON.parse(fileText) as FullTestRun;

    const {runError, status} = fullTestRun;
    const {testIdleTimeout, waitBeforeRetry: waitBeforeRetryFromConfig} = getFullPackConfig();

    const previousError = runError === undefined ? undefined : String(runError);

    const timeoutInMs = await waitBeforeRetryFromConfig({
      previousError,
      retryIndex,
      status,
      testStaticOptions,
    });

    if (timeoutInMs === 0) {
      return;
    }

    test.setTimeout(timeoutInMs + additionToTimeout);

    const timeoutObject = setInterval(() => {
      void writeLogEventTime();
    }, testIdleTimeout);

    timeoutObject.unref();

    await getTimeoutPromise(timeoutInMs);

    clearInterval(timeoutObject);

    return timeoutInMs;
  } catch (error) {
    generalLog('Caught an error on getting timeout for "before retry" waiting', {
      error,
      runId,
      testStaticOptions,
    });

    return undefined;
  }
};
