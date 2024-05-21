import {setTestRunPromise} from '../../context/testRunPromise';
import {getTestTimeout} from '../../context/testTimeout';
import {getWaitForEventsState} from '../../context/waitForEventsState';

import {getFullPackConfig} from '../config';
import {getTestRunEvent} from '../events';
import {enableFullMocks, getShouldApplyMocks} from '../fullMocks';
import {getPromiseWithResolveAndReject} from '../promise';
import {RequestHookToWaitForEvents} from '../requestHooks';

import type {RunId, TestController, TestStaticOptions} from '../../types/internal';

const delayForTestRunPromiseResolutionAfterTestTimeoutInMs = 100;

/**
 * Runs test function with reject in test run event.
 * @internal
 */
export const runTestFn = async (
  runId: RunId,
  testController: TestController,
  testStaticOptions: TestStaticOptions,
): Promise<void> => {
  const testRunEvent = getTestRunEvent(runId);
  const testTimeout = getTestTimeout();

  const {promiseWithTimeout: testRunPromise, resolve: resolveTestRunPromise} =
    getPromiseWithResolveAndReject<undefined>(
      testTimeout + delayForTestRunPromiseResolutionAfterTestTimeoutInMs,
    );

  setTestRunPromise(testRunPromise);

  const waitForEventsState = getWaitForEventsState(RequestHookToWaitForEvents);

  await testController.addRequestHooks(waitForEventsState.hook);

  const {fullMocks} = getFullPackConfig();

  if (fullMocks?.filterTests(testStaticOptions)) {
    const shouldApplyMocks = getShouldApplyMocks(testStaticOptions.name);

    await enableFullMocks(fullMocks, shouldApplyMocks, testStaticOptions.filePath);
  }

  await testRunEvent.testFnWithReject().finally(() => resolveTestRunPromise(undefined));
};
