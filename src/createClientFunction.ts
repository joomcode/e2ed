import {TEST_ENDED_ERROR_MESSAGE} from './constants/internal';
import {getTestIdleTimeout} from './context/testIdleTimeout';
import {E2edError} from './utils/error';
import {setCustomInspectOnFunction} from './utils/fn';
import {generalLog} from './utils/generalLog';
import {getDurationWithUnits} from './utils/getDurationWithUnits';
import {addTimeoutToPromise} from './utils/promise';
import {createTestRunCallback} from './utils/testRun';
import {getPlaywrightPage} from './useContext';

import type {ClientFunction} from './types/internal';

type Options = Readonly<{name?: string; retries?: number; timeout?: number}>;

const contextErrorMessage = 'Execution context was destroyed';
const targetErrorMessage = 'Target page, context or browser has been closed';

/**
 * Creates a client function.
 */
export const createClientFunction = <Args extends readonly unknown[], Result>(
  originalFn: (...args: Args) => Result,
  {name: nameFromOptions, retries = 0, timeout}: Options = {},
): ClientFunction<Args, Result> => {
  setCustomInspectOnFunction(originalFn);

  const name = nameFromOptions ?? originalFn.name;
  const printedClientFunctionName = `client function${name ? ` "${name}"` : ''}`;

  const clientFunctionWithTimeout = (...args: Args): Promise<Result> => {
    const page = getPlaywrightPage();

    const clientFunctionTimeout = timeout ?? getTestIdleTimeout();

    const timeoutWithUnits = getDurationWithUnits(clientFunctionTimeout);
    const error = new E2edError(
      `Client function "${name}" rejected after ${timeoutWithUnits} timeout`,
    );

    // eslint-disable-next-line @typescript-eslint/no-implied-eval, no-new-func
    const func = new Function('args', `return (${originalFn.toString()})(...args)`) as (
      args: readonly unknown[],
    ) => Result;

    return addTimeoutToPromise(
      page.evaluate(func, args).catch(async (evaluateError: unknown) => {
        const errorString = String(evaluateError);

        if (
          errorString.includes(contextErrorMessage) ||
          errorString.includes(targetErrorMessage) ||
          errorString.includes(TEST_ENDED_ERROR_MESSAGE)
        ) {
          await page.waitForLoadState();

          return page.evaluate(func, args).catch((suberror: unknown) => {
            const suberrorString = String(suberror);

            if (
              suberrorString.includes(contextErrorMessage) ||
              suberrorString.includes(targetErrorMessage) ||
              suberrorString.includes(TEST_ENDED_ERROR_MESSAGE)
            ) {
              return new Promise(() => {});
            }

            throw suberror;
          });
        }

        if (retries > 0) {
          let retryIndex = 1;

          while (retryIndex <= retries) {
            retryIndex += 1;

            try {
              return page.evaluate(func, args).catch((suberror: unknown) => {
                const suberrorString = String(suberror);

                if (
                  suberrorString.includes(contextErrorMessage) ||
                  suberrorString.includes(targetErrorMessage) ||
                  suberrorString.includes(TEST_ENDED_ERROR_MESSAGE)
                ) {
                  return new Promise(() => {});
                }

                throw suberror;
              });
            } catch {}
          }
        }

        throw evaluateError;
      }),
      clientFunctionTimeout,
      error,
    );
  };

  generalLog(`Create ${printedClientFunctionName}`, {originalFn});

  return (...args: Args) => {
    const clientFunctionWithTestRun = createTestRunCallback({
      targetFunction: clientFunctionWithTimeout,
      throwExceptionAtCallPoint: true,
    });

    return clientFunctionWithTestRun(...args);
  };
};
