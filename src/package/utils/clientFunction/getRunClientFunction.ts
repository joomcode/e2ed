import {assertValueIsDefined} from '../asserts';
import {E2edError} from '../E2edError';
import {getFunctionCode} from '../fn';
import {wrapInTestRunTracker} from '../wrapInTestRunTracker';

import {getPrintedClientFunctionName} from './getPrintedClientFunctionName';
import {isNeedRerunClientFunction} from './isNeedRerunClientFunction';

import type {ClientFunctionState, MaybeTestCafeError} from '../../types/internal';

type Options<Args extends unknown[], R> = Readonly<{
  args: Args;
  clientFunctionState: ClientFunctionState<Args, R>;
  reject: (error: unknown) => void;
  resolve: (value: Awaited<R>) => void;
}>;

/**
 * Get cicle function for running client function.
 * @internal
 */
export const getRunClientFunction = <Args extends unknown[], R>(
  options: Options<Args, R>,
): (() => void) => {
  const {args, clientFunctionState, reject, resolve} = options;
  const {name, originalFn} = clientFunctionState;

  const originalFnCode = getFunctionCode(originalFn);
  const printedClientFunctionName = getPrintedClientFunctionName(name);

  /**
   * Cicle function for running client function.
   */
  const runClientFunction = (): void => {
    const clientFunctionPromise = clientFunctionState.clientFunction?.(...args);

    assertValueIsDefined(clientFunctionPromise, 'clientFunctionPromise is defined', {
      originalFnCode,
      printedClientFunctionName,
    });

    // eslint-disable-next-line @typescript-eslint/unbound-method
    clientFunctionPromise.then = wrapInTestRunTracker(clientFunctionPromise.then);

    clientFunctionPromise.then(
      ({errorMessage, result}) => {
        if (errorMessage === undefined) {
          resolve(result);
        } else {
          const error = new E2edError(
            `A ${printedClientFunctionName} rejected in browser with cause`,
            {args, cause: new Error(errorMessage), originalFnCode},
          );

          reject(error);
        }
      },
      (cause: MaybeTestCafeError) => {
        if (isNeedRerunClientFunction(cause, clientFunctionState)) {
          clientFunctionState.isClientFunctionAlreadyRerunned = true;

          runClientFunction();

          return;
        }

        const error = new E2edError(`A ${printedClientFunctionName} rejected with cause`, {
          args,
          cause,
          originalFnCode,
        });

        reject(error);
      },
    );
  };

  return runClientFunction;
};
