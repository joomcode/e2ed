import {inspect} from 'node:util';

import {assertValueHasProperty} from '../asserts';

import {getFunctionPresentationForLogs} from './getFunctionPresentationForLogs';

import type {Fn} from '../../types/internal';

// eslint-disable-next-line @typescript-eslint/ban-types
function getFunctionPresentationForThis(this: Fn): string | String {
  return getFunctionPresentationForLogs(this);
}

/**
 * Set custom `node:inspect` and toJSON presentation (with function code) on function.
 */
export const setCustomInspectOnFunction = <Args extends readonly unknown[], Return, This>(
  fn: Fn<Args, Return, This>,
): void => {
  assertValueHasProperty(fn, inspect.custom, {
    check: 'fn has inspect.custom property',
    skipCheckInRuntime: true,
  });

  if (fn[inspect.custom]) {
    return;
  }

  // eslint-disable-next-line no-param-reassign
  fn[inspect.custom] = getFunctionPresentationForThis;
  // eslint-disable-next-line no-param-reassign, @typescript-eslint/ban-types
  (fn as unknown as {toJSON(): string | String}).toJSON = getFunctionPresentationForThis;
};
