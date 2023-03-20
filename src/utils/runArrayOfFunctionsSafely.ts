import {generalLog} from './generalLog';

import type {Fn} from '../types/internal';

/**
 * Safely run array of userland function (from `doBeforePack`/`doAfterPack`).
 * @internal
 */
export const runArrayOfFunctionsSafely = async <Args extends readonly unknown[], Return>(
  functions: readonly Fn<Args, Return>[],
  getCurrentFunctionArgs: () => Args,
  processCurrentFunctionResult: (result: Awaited<Return>) => void,
): Promise<void> => {
  let args: Args | undefined;

  for (const fn of functions) {
    try {
      args = getCurrentFunctionArgs();

      // eslint-disable-next-line @typescript-eslint/await-thenable
      const result = await fn(...args);

      processCurrentFunctionResult(result);
    } catch (error) {
      generalLog('Caught an error on running current function in array', {args, error, fn});
    }
  }
};
