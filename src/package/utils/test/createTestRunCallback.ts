import {getRunId} from '../../context/runId';
import {getTestRunPromise} from '../../context/testRunPromise';

import {E2edError} from '../E2edError';
import {getTestRunEvent} from '../events';

type CreateTestRunCallback = (<Args extends readonly unknown[], Result, This>(
  targetFunction: (this: This, ...args: Args) => Promise<Result>,
  throwExceptionAtCallPoint: true,
) => (this: This, ...args: Args) => Promise<Result>) &
  (<Args extends readonly unknown[], Result, This>(
    targetFunction: (this: This, ...args: Args) => Promise<Result>,
    throwExceptionAtCallPoint: false,
  ) => (this: This, ...args: Args) => Promise<Result | undefined>);

/**
 * Creates a callback for a test run from the target function.
 * If the function throw an error, the error is thrown into the test run
 * or at the call point.
 * When the test launch is completed, the target function is no longer called
 * (even if callback is called).
 * @internal
 */
export const createTestRunCallback = (<Args extends readonly unknown[], Result, This>(
  targetFunction: (this: This, ...args: Args) => Promise<Result>,
  throwExceptionAtCallPoint: boolean,
) => {
  const runId = getRunId();
  const testRunEvent = getTestRunEvent(runId);
  const testRunPromise = getTestRunPromise();

  let isTestRunCompleted = false;

  void testRunPromise.then(() => {
    isTestRunCompleted = true;
  });

  // eslint-disable-next-line no-restricted-syntax
  return async function testRunCallback(this: This, ...args: Args): Promise<Result | undefined> {
    if (isTestRunCompleted) {
      return undefined;
    }

    try {
      const result = await Promise.race([targetFunction.call(this, ...args), testRunPromise]);

      return result;
    } catch (cause) {
      const error = new E2edError(
        `Callback "${targetFunction.name}" was rejected because his target function threw an error`,
        {cause},
      );

      if (throwExceptionAtCallPoint) {
        throw error;
      } else {
        testRunEvent.reject(error);
      }
    }

    return undefined;
  };
}) as CreateTestRunCallback;
