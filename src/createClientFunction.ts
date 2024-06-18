import {getTestIdleTimeout} from './context/testIdleTimeout';
import {getPage} from './useContext';
import {E2edError} from './utils/error';
import {setCustomInspectOnFunction} from './utils/fn';
import {generalLog} from './utils/generalLog';
import {getDurationWithUnits} from './utils/getDurationWithUnits';
import {addTimeoutToPromise} from './utils/promise';
import {createTestRunCallback} from './utils/testRun';

import type {ClientFunction} from './types/internal';

type Options = Readonly<{name?: string; timeout?: number}>;

/**
 * Creates a client function.
 */
export const createClientFunction = <Args extends readonly unknown[], Result>(
  originalFn: (...args: Args) => Result,
  {name: nameFromOptions, timeout}: Options = {},
): ClientFunction<Args, Result> => {
  setCustomInspectOnFunction(originalFn);

  const name = nameFromOptions ?? originalFn.name;
  const printedClientFunctionName = `client function${name ? ` "${name}"` : ''}`;

  const clientFunctionWithTimeout = (...args: Args): Promise<Result> => {
    const page = getPage();

    const clientFunctionTimeout = timeout ?? getTestIdleTimeout();

    const timeoutWithUnits = getDurationWithUnits(clientFunctionTimeout);
    const error = new E2edError(
      `Client function "${name}" rejected after ${timeoutWithUnits} timeout`,
    );

    return addTimeoutToPromise(
      page.evaluate(`args => (${originalFn.toString()})(...args)`, args),
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
