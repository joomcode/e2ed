import type {E2edClientFunctionResolvesSymbol, TestClientGlobal} from '../../types/internal';

type ClientFunctionResult = Promise<unknown> | null | undefined;

declare const clientFunctionTimeout: number;
declare const originalFn: (...args: unknown[]) => ClientFunctionResult;

/**
 * This client function wraps all ClientFunction bodies and terminates them on page unload.
 * @internal
 */
// eslint-disable-next-line no-restricted-syntax
export const clientFunctionWrapper = function clientFunctionWrapper(): unknown {
  const e2edClientFunctionResolvesSymbol: E2edClientFunctionResolvesSymbol = Symbol.for(
    'e2edClientFunctionResolvesSymbol',
  ) as E2edClientFunctionResolvesSymbol;

  const log = (message: string): void => {
    const dateTimeInISO = new Date().toISOString();

    // eslint-disable-next-line no-console
    console.log(`[e2ed:client][${dateTimeInISO}] ${message}\n`);
  };

  // eslint-disable-next-line
  const args: unknown[] = Array.prototype.slice.call(arguments);

  const global: TestClientGlobal = window;

  if (!global[e2edClientFunctionResolvesSymbol]) {
    global[e2edClientFunctionResolvesSymbol] = [];

    global.addEventListener('beforeunload', () => {
      const e2edClientFunctionResolves = global[e2edClientFunctionResolvesSymbol];

      e2edClientFunctionResolves?.forEach((resolve, index) => {
        e2edClientFunctionResolves[index] = undefined;

        try {
          resolve?.(undefined);
        } catch (error) {
          log(`Error on resolving client function promise: ${String(error)}`);
        }
      });
    });
  }

  const e2edClientFunctionResolves = global[e2edClientFunctionResolvesSymbol];
  let result: ClientFunctionResult;

  try {
    result = originalFn.call(undefined, ...args);
  } catch (error) {
    log(`Error on calling client function: ${String(error)}`);
  }

  if (!result || typeof result.then !== 'function') {
    return result;
  }

  return new Promise<unknown>((resolve, reject) => {
    const index = e2edClientFunctionResolves.push(resolve) - 1;
    const timeoutId = setTimeout(() => {
      const timeoutError = new Error(
        `Client function promise rejected after ${clientFunctionTimeout}ms timeout`,
      );

      reject(timeoutError);
    }, clientFunctionTimeout);

    try {
      result?.then(
        (value) => {
          e2edClientFunctionResolves[index] = undefined;
          clearTimeout(timeoutId);

          resolve(value);
        },
        (error) => {
          e2edClientFunctionResolves[index] = undefined;
          clearTimeout(timeoutId);

          reject(error);
        },
      );
    } catch (error) {
      log(`Error on calling then(...) on client function promise: ${String(error)}`);
    }
  });
};
