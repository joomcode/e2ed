import {setTestRunPromise} from '../../context/testRunPromise';
import {getTestTimeout} from '../../context/testTimeout';

import {getFullPackConfig} from '../config';
import {getTestRunEvent} from '../events';
import {enableFullMocks, getShouldApplyMocks} from '../fullMocks';
import {getPromiseWithResolveAndReject} from '../promise';

import type {PlaywrightTestArgs} from '@playwright/test';

import type {RunId, TestStaticOptions} from '../../types/internal';

const delayForTestRunPromiseResolutionAfterTestTimeoutInMs = 100;

/**
 * Runs test function with reject in test run event.
 * @internal
 */
export const runTestFn = async (
  runId: RunId,
  testController: PlaywrightTestArgs,
  testStaticOptions: TestStaticOptions,
): Promise<void> => {
  const testRunEvent = getTestRunEvent(runId);
  const testTimeout = getTestTimeout();

  const {promiseWithTimeout: testRunPromise, resolve: resolveTestRunPromise} =
    getPromiseWithResolveAndReject<undefined>(
      testTimeout + delayForTestRunPromiseResolutionAfterTestTimeoutInMs,
    );

  setTestRunPromise(testRunPromise);

  // TODO: support waitForEventsState
  // const waitForEventsState = getWaitForEventsState();

  const {fullMocks} = getFullPackConfig();

  if (fullMocks?.filterTests(testStaticOptions)) {
    const shouldApplyMocks = getShouldApplyMocks(testStaticOptions.name);

    await enableFullMocks(fullMocks, shouldApplyMocks, testStaticOptions.filePath);
  }

  await testRunEvent
    .testFnWithReject(testController)
    .finally(() => resolveTestRunPromise(undefined));
};
