import {inspect} from 'node:util';

import {assertValueHasProperty} from '../asserts';

import {getFunctionPresentationForLogs} from './getFunctionPresentationForLogs';

import type {Fn} from '../../types/internal';

function getFunctionPresentationForThis(this: Fn): string {
  return getFunctionPresentationForLogs(this);
}

/**
 * Set custom `node:inspect` presentation (with function code) on function.
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
};
