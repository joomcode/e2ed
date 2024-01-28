import type {ClientFunctionWrapperResult, Fn} from '../../types/internal';

type MaybePromiseLike = {then?: Fn<[unknown?, unknown?]>} | null | undefined;
type OriginalClientFunctionResult = Promise<unknown> | null | undefined;

declare const originalFn: (...args: unknown[]) => OriginalClientFunctionResult;
declare const printedClientFunctionName: string;

/**
 * This client function wraps all `ClientFunction` bodies and maps them errors to error messages.
 * @internal
 */
export const clientFunctionWrapper = <Args extends readonly unknown[], R>(
  ...args: Args
): Promise<ClientFunctionWrapperResult<R>> => {
  let errorMessage: string | undefined;
  let resolve!: (value: ClientFunctionWrapperResult<R>) => void;

  const promise = new Promise<ClientFunctionWrapperResult<R>>((res) => {
    resolve = res;
  });

  const getErrorMessage = (message: string, error: unknown): string => {
    const stack = error ? String((error as Error).stack ?? '') : '';

    return `${message} on calling ${printedClientFunctionName}: ${String(error ?? '')}\n${stack}`;
  };

  try {
    const result = originalFn.call(undefined, ...args) as R;

    if (typeof (result as MaybePromiseLike)?.then === 'function') {
      (result as MaybePromiseLike)?.then?.(
        (awaitedResult: R) => {
          resolve({errorMessage: undefined, result: awaitedResult});
        },
        (error: unknown) => {
          errorMessage = getErrorMessage('Caught rejected promise', error);

          resolve({errorMessage, result: undefined});
        },
      );
    } else {
      resolve({errorMessage: undefined, result});
    }
  } catch (error) {
    errorMessage = getErrorMessage('Caught an error', error);

    resolve({errorMessage, result: undefined});
  }

  return promise;
};
