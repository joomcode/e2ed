import {E2edError} from '../error';
import {getDurationWithUnits} from '../getDurationWithUnits';

import type {Fn, UtcTimeInMs} from '../../types/internal';

/**
 * Run array of userland function (from `doBeforePack`/`doAfterPack`).
 * @internal
 */
export const runArrayOfUserlandFunctions = async <Args extends readonly unknown[], Return>(
  functions: readonly Fn<Args, Return>[],
  getCurrentFunctionArgs: () => Args,
  processCurrentFunctionResult: (result: Awaited<Return>) => void,
): Promise<string> => {
  const startTimeInMs = Date.now() as UtcTimeInMs;
  let args: Args | undefined;

  for (const fn of functions) {
    try {
      args = getCurrentFunctionArgs();

      // eslint-disable-next-line @typescript-eslint/await-thenable
      const result = await fn(...args);

      processCurrentFunctionResult(result);
    } catch (cause) {
      throw new E2edError('Caught an error on running userland function', {args, cause, fn});
    }
  }

  const executionTimeWithUnits = getDurationWithUnits(Date.now() - startTimeInMs);

  return executionTimeWithUnits;
};
