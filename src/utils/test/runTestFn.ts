import {setTestRunPromise} from '../../context/testRunPromise';
import {getTestTimeout} from '../../context/testTimeout';
import {getWaitForEventsState} from '../../context/waitForEventsState';

import {getTestRunEvent} from '../events';
import {getPromiseWithResolveAndReject} from '../promise';
import {RequestHookToWaitForEvents} from '../requestHooks';

import type {RunId, TestController} from '../../types/internal';

/**
 * Runs test function with reject in test run event.
 * @internal
 */
export const runTestFn = async (runId: RunId, testController: TestController): Promise<void> => {
  const testRunEvent = getTestRunEvent(runId);
  const testTimeout = getTestTimeout();

  const {promiseWithTimeout: testRunPromise, resolve: resolveTestRunPromise} =
    getPromiseWithResolveAndReject<undefined>(testTimeout + 100);

  setTestRunPromise(testRunPromise);

  const waitForEventsState = getWaitForEventsState(RequestHookToWaitForEvents);

  await testController.addRequestHooks(waitForEventsState.hook);

  await testRunEvent.testFnWithReject().finally(() => resolveTestRunPromise(undefined));
};
