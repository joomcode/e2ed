import {ClientFunction} from 'testcafe-without-typecheck';

import {getTestIdleTimeout} from './context/testIdleTimeout';
import {clientFunctionWrapper} from './utils/clientFunction';
import {E2edError} from './utils/E2edError';
import {generalLog} from './utils/generalLog';
import {getPromiseWithResolveAndReject} from './utils/promise';
import {createTestRunCallback} from './utils/test';
import {wrapInTestRunTracker} from './utils/wrapInTestRunTracker';

import type {ClientFunctionWrapper, ClientFunctionWrapperResult} from './types/internal';

type Options = Readonly<{name?: string; timeout?: number}>;

/**
 * Creates a client function.
 */
export const createClientFunction = <Args extends unknown[], R>(
  originalFn: (...args: Args) => R,
  {name: nameFromOptions, timeout}: Options = {},
): ((this: void, ...args: Args) => Promise<R>) => {
  const name = nameFromOptions ?? originalFn.name;
  const originalFnCode = String(originalFn).slice(0, 200);
  const printedClientFunctionName = `client function${name ? ` "${name}"` : ''}`;

  let clientFunction: ClientFunctionWrapper<Args, R> | undefined;

  generalLog(`Create ${printedClientFunctionName}`, {originalFnCode});

  /**
   * Wrapped client function with timeout and error logging.
   * TODO: support Smart Assertions.
   */
  const clientFunctionWithTimeout = (...args: Args): Promise<R> => {
    if (clientFunction === undefined) {
      clientFunction = ClientFunction<ClientFunctionWrapperResult<Awaited<R>>, Args>(
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

    wrappedSetRejectTimeoutFunction(() => {
      const error = new E2edError(
        `Promise of ${printedClientFunctionName} was rejected after ${String(
          clientFunctionTimeout,
        )}ms timeout`,
      );

      reject(error);
    });

    clientFunction(...args)
      .then(({errorMessage, result}) => {
        if (errorMessage === undefined) {
          resolve(result);
        } else {
          const error = new E2edError(
            `A ${printedClientFunctionName} rejected in browser with cause`,
            {args, cause: new Error(errorMessage), originalFnCode},
          );

          reject(error);
        }
      })
      .catch((cause: unknown) => {
        const error = new E2edError(`A ${printedClientFunctionName} rejected with cause`, {
          args,
          cause,
          originalFnCode,
        });

        reject(error);
      });

    return promise;
  };

  return (...args: Args) => {
    const clientFunctionWithTestRun = createTestRunCallback(clientFunctionWithTimeout, true);

    return clientFunctionWithTestRun(...args);
  };
};
