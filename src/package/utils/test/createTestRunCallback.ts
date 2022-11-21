import {getRunId} from '../../context/runId';
import {getTestRunPromise} from '../../context/testRunPromise';

import {E2edError} from '../E2edError';
import {getTestRunEvent} from '../events';

import type {AsyncVoid} from '../../types/internal';

/**
 * Creates a callback for a test run from the target function.
 * If the function throw an error, the error is thrown into the test run.
 * When the test launch is completed, the target function is no longer called
 * (even if callback is called).
 * @internal
 */
export const createTestRunCallback = <Args extends unknown[], This>(
  targetFunction: (this: This, ...args: Args) => AsyncVoid,
): ((this: This, ...args: Args) => Promise<void>) => {
  const runId = getRunId();
  const testRunEvent = getTestRunEvent(runId);
  const testRunPromise = getTestRunPromise();

  let isTestRunCompleted = false;

  void testRunPromise.then(() => {
    isTestRunCompleted = true;
  });

  // eslint-disable-next-line no-restricted-syntax
  return async function testRunCallback(...args: Args): Promise<void> {
    if (isTestRunCompleted) {
      return;
    }

    try {
      await targetFunction.call(this, ...args);
    } catch (cause) {
      const error = new E2edError(
        `Callback "${targetFunction.name}" was rejected because his target function threw an error`,
        {cause},
      );

      testRunEvent.reject(error);
    }
  };
};
