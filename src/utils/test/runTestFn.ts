import {LogEventType, TestRunStatus} from '../../constants/internal';
import {setTestRunPromise} from '../../context/testRunPromise';
import {getTestTimeout} from '../../context/testTimeout';

import {getFullPackConfig} from '../config';
import {getTestRunEvent} from '../events';
import {enableFullMocks} from '../fullMocks';
import {log} from '../log';
import {getPromiseWithResolveAndReject} from '../promise';

import type {PlaywrightTestArgs} from '@playwright/test';

import type {RunId, TestStaticOptions} from '../../types/internal';

const delayForTestRunPromiseResolutionAfterTestTimeoutInMs = 100;

type Options = Readonly<{
  beforeRetryTimeout: number | undefined;
  retryIndex: number;
  runId: RunId;
  testController: PlaywrightTestArgs;
  testStaticOptions: TestStaticOptions;
}>;

/**
 * Runs test function with reject in test run event.
 * @internal
 */
export const runTestFn = async ({
  beforeRetryTimeout,
  retryIndex,
  runId,
  testController,
  testStaticOptions,
}: Options): Promise<void> => {
  const {status, testFnWithReject} = getTestRunEvent(runId);
  const testTimeout = getTestTimeout();

  const {promiseWithTimeout: testRunPromise, resolve: resolveTestRunPromise} =
    getPromiseWithResolveAndReject<undefined>(
      testTimeout + delayForTestRunPromiseResolutionAfterTestTimeoutInMs,
    );

  setTestRunPromise(testRunPromise);

  if (beforeRetryTimeout !== undefined) {
    log(`Waited for ${beforeRetryTimeout}ms before running this retry`, LogEventType.InternalUtil);
  }

  const {fullMocks} = getFullPackConfig();

  if (status !== TestRunStatus.Skipped && fullMocks?.filterTests(testStaticOptions)) {
    const shouldApplyMocks = retryIndex === 1;

    await enableFullMocks(fullMocks, shouldApplyMocks, testStaticOptions.filePath);
  }

  await testFnWithReject(testController).finally(() => resolveTestRunPromise(undefined));
};
