import {assertValueIsTrue} from '../asserts';
import {getFullPackConfig} from '../config';
import {getTestRunEventFileName, readEventFromFile} from '../fs';
import {generalLog} from '../generalLog';
import {getTimeoutPromise} from '../promise';

import type {FullTestRun, RunId, TestStaticOptions} from '../../types/internal';

/**
 * Waits before running test for some time from pack config (for retries).
 * @internal
 */
export const waitBeforeRetry = async (
  runId: RunId,
  testStaticOptions: TestStaticOptions,
): Promise<number | undefined> => {
  const indexOfRetryIndex = runId.lastIndexOf('-');

  assertValueIsTrue(
    indexOfRetryIndex > 0 && indexOfRetryIndex < runId.length - 1,
    'runId has dash',
    {runId, testStaticOptions},
  );

  const retryIndex = Number(runId.slice(indexOfRetryIndex + 1));

  assertValueIsTrue(
    Number.isInteger(retryIndex) && retryIndex > 0,
    'retryIndex from runId is correct',
    {runId, testStaticOptions},
  );

  const previousRetryIndex = retryIndex - 1;

  if (previousRetryIndex < 1) {
    return;
  }

  const previousRunId = `${runId.slice(0, indexOfRetryIndex)}-${previousRetryIndex}` as RunId;

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
    const {waitBeforeRetry: waitBeforeRetryFromConfig} = getFullPackConfig();

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

    await getTimeoutPromise(timeoutInMs);

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
