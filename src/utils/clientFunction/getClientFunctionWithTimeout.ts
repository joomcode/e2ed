import {ClientFunction as TestCafeClientFunction} from 'testcafe-without-typecheck';

import {getTestIdleTimeout} from '../../context/testIdleTimeout';

import {E2edError} from '../error';
import {getDurationWithUnits} from '../getDurationWithUnits';
import {getPromiseWithResolveAndReject} from '../promise';
import {wrapInTestRunTracker} from '../testRun';

import {clientFunctionWrapper} from './clientFunctionWrapper';
import {getPrintedClientFunctionName} from './getPrintedClientFunctionName';
import {getRunClientFunction} from './getRunClientFunction';

import type {
  ClientFunction,
  ClientFunctionState,
  ClientFunctionWrapperResult,
} from '../../types/internal';

/**
 * Get client function with timeout (wrapped into timeout) and error logging.
 * @internal
 */
export const getClientFunctionWithTimeout = <Args extends readonly unknown[], Result>(
  clientFunctionState: ClientFunctionState<Args, Result>,
): ClientFunction<Args, Result> => {
  const {name, originalFn, timeout} = clientFunctionState;
  const printedClientFunctionName = getPrintedClientFunctionName(name);

  const clientFunctionWithTimeout = (...args: Args): Promise<Result> => {
    if (clientFunctionState.clientFunction === undefined) {
      // eslint-disable-next-line no-param-reassign
      clientFunctionState.clientFunction = TestCafeClientFunction<
        ClientFunctionWrapperResult<Awaited<Result>>,
        // @ts-expect-error; readonly unknown[] cannot be assigned to any[]
        Args
      >(
        clientFunctionWrapper as unknown as (
          ...args: Args
        ) => ClientFunctionWrapperResult<Awaited<Result>>,
        {dependencies: {originalFn, printedClientFunctionName}},
      );
    }

    const clientFunctionTimeout = timeout ?? getTestIdleTimeout();

    const {promiseWithTimeout, reject, resolve, setRejectTimeoutFunction} =
      getPromiseWithResolveAndReject<Awaited<Result>>(clientFunctionTimeout);
    const wrappedSetRejectTimeoutFunction = wrapInTestRunTracker(setRejectTimeoutFunction);
    const timeoutWithUnits = getDurationWithUnits(clientFunctionTimeout);

    wrappedSetRejectTimeoutFunction(() => {
      const error = new E2edError(
        `Promise of ${printedClientFunctionName} was rejected after ${timeoutWithUnits} timeout`,
      );

      reject(error);
    });

    const runClientFunction = getRunClientFunction({args, clientFunctionState, reject, resolve});

    runClientFunction();

    return promiseWithTimeout;
  };

  return clientFunctionWithTimeout;
};
