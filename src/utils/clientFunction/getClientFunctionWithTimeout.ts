import {ClientFunction} from 'testcafe-without-typecheck';

import {getTestIdleTimeout} from '../../context/testIdleTimeout';

import {E2edError} from '../error';
import {getDurationWithUnits} from '../getDurationWithUnits';
import {getPromiseWithResolveAndReject} from '../promise';
import {wrapInTestRunTracker} from '../testRun';

import {clientFunctionWrapper} from './clientFunctionWrapper';
import {getPrintedClientFunctionName} from './getPrintedClientFunctionName';
import {getRunClientFunction} from './getRunClientFunction';

import type {ClientFunctionState, ClientFunctionWrapperResult} from '../../types/internal';

/**
 * Get client function with timeout (wrapped into timeout) and error logging.
 * @internal
 */
export const getClientFunctionWithTimeout = <Args extends unknown[], R>(
  clientFunctionState: ClientFunctionState<Args, R>,
): ((...args: Args) => Promise<R>) => {
  const {name, originalFn, timeout} = clientFunctionState;
  const printedClientFunctionName = getPrintedClientFunctionName(name);

  const clientFunctionWithTimeout = (...args: Args): Promise<R> => {
    if (clientFunctionState.clientFunction === undefined) {
      // eslint-disable-next-line no-param-reassign
      clientFunctionState.clientFunction = ClientFunction<
        ClientFunctionWrapperResult<Awaited<R>>,
        Args
      >(
        clientFunctionWrapper as unknown as (
          ...args: Args
        ) => ClientFunctionWrapperResult<Awaited<R>>,
        {dependencies: {originalFn, printedClientFunctionName}},
      );
    }

    const clientFunctionTimeout = timeout ?? getTestIdleTimeout();

    const {promise, reject, resolve, setRejectTimeoutFunction} =
      getPromiseWithResolveAndReject<Awaited<R>>(clientFunctionTimeout);
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

    return promise;
  };

  return clientFunctionWithTimeout;
};
