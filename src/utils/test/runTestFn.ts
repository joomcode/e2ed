import {setTestRunPromise} from '../../context/testRunPromise';
import {getTestTimeout} from '../../context/testTimeout';

import {getTestRunEvent} from '../events';
import {getPromiseWithResolveAndReject} from '../promise';

import type {RunId} from '../../types/internal';

/**
 * Run test function with reject in test run event.
 * @internal
 */
export const runTestFn = async (runId: RunId): Promise<void> => {
  const testRunEvent = getTestRunEvent(runId);
  const testTimeout = getTestTimeout();

  const {promise: testRunPromise, resolve: resolveTestRunPromise} =
    getPromiseWithResolveAndReject<undefined>(testTimeout + 100);

  setTestRunPromise(testRunPromise);

  await testRunEvent.testFnWithReject().finally(() => resolveTestRunPromise(undefined));
};
