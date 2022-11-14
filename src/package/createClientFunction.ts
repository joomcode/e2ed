import {ClientFunction} from 'testcafe-without-typecheck';

import {getTestIdleTimeout} from './context/testIdleTimeout';
import {clientFunctionWrapper} from './utils/clientFunction';
import {generalLog} from './utils/generalLog';

import type {Fn, WrappedClientFunction} from './types/internal';

type Options = Readonly<{name?: string; timeout?: number}>;

/**
 * Creates a client function.
 */
export const createClientFunction = <A extends unknown[], R>(
  originalFn: (...args: A) => R,
  {name: nameFromOptions, timeout}: Options = {},
): WrappedClientFunction<R, A> => {
  const name = nameFromOptions ?? originalFn.name;
  const originalFnCode = String(originalFn).slice(0, 200);

  let clientFunction: Fn<A, Promise<Awaited<R> | undefined>> | undefined;

  generalLog(`Create client function${name ? ` "${name}"` : ''}`, {originalFnCode});

  /**
   * Wrapped client function with error logging.
   * TODO: support Smart Assertions.
   */
  const wrappedClientFunction = ((...args: A) => {
    if (clientFunction === undefined) {
      const clientFunctionTimeout = timeout ?? getTestIdleTimeout();

      clientFunction = ClientFunction<Awaited<R> | undefined, A>(
        clientFunctionWrapper as unknown as Fn<A, Awaited<R> | undefined>,
        {dependencies: {clientFunctionTimeout, originalFn}},
      );
    }

    try {
      return clientFunction(...args).catch((error: unknown) => {
        generalLog(`Client function "${name}" rejected with error`, {args, error, originalFnCode});

        return undefined;
      });
    } catch (error) {
      generalLog(`Client function "${name}" thrown an error`, {args, error, originalFnCode});
    }

    return Promise.resolve();
  }) as WrappedClientFunction<R, A>;

  return wrappedClientFunction;
};
