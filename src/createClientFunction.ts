import {getClientFunctionWithTimeout, getPrintedClientFunctionName} from './utils/clientFunction';
import {setCustomInspectOnFunction} from './utils/fn';
import {generalLog} from './utils/generalLog';
import {createTestRunCallback} from './utils/testRun';

import type {ClientFunction, ClientFunctionState} from './types/internal';

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
  const printedClientFunctionName = getPrintedClientFunctionName(name);

  const clientFunctionState: ClientFunctionState<Args, Result> = {
    clientFunction: undefined,
    name,
    originalFn,
    timeout,
  };

  const clientFunctionWithTimeout = getClientFunctionWithTimeout(clientFunctionState);

  generalLog(`Create ${printedClientFunctionName}`, {originalFn});

  /**
   * TODO: support Smart Assertions.
   */
  return (...args: Args) => {
    const clientFunctionWithTestRun = createTestRunCallback({
      targetFunction: clientFunctionWithTimeout,
      throwExceptionAtCallPoint: true,
    });

    return clientFunctionWithTestRun(...args);
  };
};
