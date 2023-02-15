import {LogEventType} from '../../constants/internal';

import {assertValueIsDefined} from '../asserts';
import {E2edError} from '../error';
import {getFunctionCode} from '../fn';
import {log} from '../log';
import {wrapInTestRunTracker} from '../testRun';

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

  let isClientFunctionAlreadyRerunned = false;

  /**
   * Potentially cicle function for running client function.
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
            `The ${printedClientFunctionName} rejected in browser with cause`,
            {args, cause: new Error(errorMessage), originalFnCode},
          );

          reject(error);
        }
      },
      (cause: MaybeTestCafeError) => {
        if (
          isClientFunctionAlreadyRerunned !== true &&
          isNeedRerunClientFunction(cause, clientFunctionState)
        ) {
          isClientFunctionAlreadyRerunned = true;

          log(
            `The ${printedClientFunctionName} will be rerun`,
            {args, originalFnCode},
            LogEventType.InternalUtil,
          );

          runClientFunction();

          return;
        }

        const error = new E2edError(`The ${printedClientFunctionName} rejected with cause`, {
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
