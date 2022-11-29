import {getRunId} from '../../context/runId';
import {getTestRunPromise} from '../../context/testRunPromise';

import {E2edError} from '../E2edError';
import {getTestRunEvent} from '../events';

import type {Fn} from '../../types/internal';

type Options<
  Args extends readonly unknown[],
  Result,
  This,
  ThrowExceptionAtCallPoint extends boolean,
> = Readonly<{
  targetFunction: (this: This, ...args: Args) => Promise<Result>;
  throwExceptionAtCallPoint: ThrowExceptionAtCallPoint;
}>;

type CreateTestRunCallback = (<Args extends readonly unknown[], Result, This>(
  options: Options<Args, Result, This, true>,
) => Fn<Args, Promise<Result>, This>) &
  (<Args extends readonly unknown[], Result, This>(
    options: Options<Args, Result, This, false>,
  ) => Fn<Args, Promise<Result | undefined>, This>);

/**
 * Creates a callback for a test run from the target function.
 * If the function throw an error, the error is thrown into the test run
 * or at the call point.
 * When the test launch is completed, the target function is no longer called
 * (even if callback is called).
 * @internal
 */
export const createTestRunCallback = (<Args extends readonly unknown[], Result, This>(
  options: Options<Args, Result, This, boolean>,
) => {
  const {targetFunction, throwExceptionAtCallPoint} = options;

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
