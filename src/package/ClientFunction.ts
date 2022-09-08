import {ClientFunction as BaseClientFunction} from 'testcafe-without-typecheck';

import {generalLog} from './utils/generalLog';

import type {TestClientGlobal, WrappedClientFunction} from './types/internal';

/**
 * This client function wraps all ClientFunction bodies and terminates them on page unload.
 */
const clientFunctionWrapper = function clientFunctionWrapper(): unknown {
  // eslint-disable-next-line
  const args: unknown[] = Array.prototype.slice.call(arguments);

  const global: TestClientGlobal = window;

  if (!global.e2edClientFunctionResolves) {
    global.e2edClientFunctionResolves = [];

    global.addEventListener('beforeunload', () => {
      const {e2edClientFunctionResolves} = global;

      if (!e2edClientFunctionResolves) {
        return;
      }

      e2edClientFunctionResolves.forEach((resolve, index) => {
        e2edClientFunctionResolves[index] = undefined;

        resolve?.();
      });
    });
  }

  const {e2edClientFunctionResolves} = global;
  let result: Promise<void> | undefined;

  try {
    // @ts-expect-error: originalFn is out of scope
    result = originalFn.apply(undefined, args); // eslint-disable-line
  } catch (error) {
    // do nothing
  }

  if (!result || typeof result.then !== 'function') {
    return result;
  }

  return new Promise<void>((resolve, reject) => {
    const index = e2edClientFunctionResolves.push(resolve) - 1;

    result?.then(
      (value) => {
        e2edClientFunctionResolves[index] = undefined;

        resolve(value);
      },
      (error) => {
        e2edClientFunctionResolves[index] = undefined;

        reject(error);
      },
    );
  });
};

/**
 * Creates a client function.
 */
export const ClientFunction = <R, A extends unknown[]>(
  originalFn: (...args: A) => R,
  name: string,
): WrappedClientFunction<R, A> => {
  const clientFunction = BaseClientFunction<Awaited<R> | undefined, A>(
    clientFunctionWrapper as unknown as (...args: A) => Awaited<R> | undefined,
    {
      dependencies: {originalFn},
    },
  );

  generalLog(`Create client function "${name}"`, {
    originalFn: String(originalFn).slice(0, 80),
  });

  const wrappedClientFunction = (async (...args: A) => {
    try {
      return clientFunction(...args).catch((error: unknown) => {
        generalLog(`Client function "${name}" rejected with error`, {args, error, originalFn});

        return undefined;
      });
    } catch (error) {
      generalLog(`Client function "${name}" thrown an error`, {args, error, originalFn});
    }

    return undefined;
  }) as WrappedClientFunction<R, A>;

  return wrappedClientFunction;
};
