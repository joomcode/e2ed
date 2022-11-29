import {getClientFunctionWithTimeout, getPrintedClientFunctionName} from './utils/clientFunction';
import {getFunctionCode} from './utils/fn';
import {generalLog} from './utils/generalLog';
import {createTestRunCallback} from './utils/test';

import type {ClientFunctionState} from './types/internal';

type Options = Readonly<{name?: string; timeout?: number}>;

/**
 * Creates a client function.
 */
export const createClientFunction = <Args extends unknown[], R>(
  originalFn: (...args: Args) => R,
  {name: nameFromOptions, timeout}: Options = {},
): ((this: void, ...args: Args) => Promise<R>) => {
  const name = nameFromOptions ?? originalFn.name;
  const originalFnCode = getFunctionCode(originalFn);
  const printedClientFunctionName = getPrintedClientFunctionName(name);

  const clientFunctionState: ClientFunctionState<Args, R> = {
    clientFunction: undefined,
    name,
    originalFn,
    timeout,
  };

  const clientFunctionWithTimeout = getClientFunctionWithTimeout(clientFunctionState);

  generalLog(`Create ${printedClientFunctionName}`, {originalFnCode});

  /**
   * TODO: support Smart Assertions.
   */
  return (...args: Args) => {
    const clientFunctionWithTestRun = createTestRunCallback(clientFunctionWithTimeout, true);

    return clientFunctionWithTestRun(...args);
  };
};
