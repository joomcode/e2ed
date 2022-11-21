import {ClientFunction} from 'testcafe-without-typecheck';

import {getTestIdleTimeout} from './context/testIdleTimeout';
import {clientFunctionWrapper} from './utils/clientFunction';
// import {E2edError} from './utils/E2edError';
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

    return clientFunction(...args).catch((cause: unknown) => {
      generalLog(`Client function "${name}" rejected with cause`, {args, cause, originalFnCode});

      // throw new E2edError(`Client function "${name}" rejected with cause`, {
      //  args,
      //  cause,
      //  originalFnCode,
      // });
    });
  }) as WrappedClientFunction<R, A>;

  return wrappedClientFunction;
};
