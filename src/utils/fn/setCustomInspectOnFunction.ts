/* eslint-disable no-param-reassign */

import {inspect} from 'node:util';

import {assertValueHasProperty} from '../asserts';

import {getFunctionPresentationForLogs} from './getFunctionPresentationForLogs';

import type {Fn, StringForLogs} from '../../types/internal';

function getFunctionPresentationForThis(this: Fn): StringForLogs | string {
  return getFunctionPresentationForLogs(this);
}

/**
 * Set custom `node:inspect` and toJSON presentation (with function code) on function.
 */
export const setCustomInspectOnFunction = <Args extends readonly unknown[], Return, This>(
  fn: Fn<Args, Return, This>,
): void => {
  assertValueHasProperty(fn, inspect.custom, {
    check: '`func` has `inspect.custom` property',
    skipCheckInRuntime: true,
  });

  if (fn[inspect.custom] !== undefined) {
    return;
  }

  fn[inspect.custom] = getFunctionPresentationForThis;

  (fn as unknown as {toJSON: () => StringForLogs | string}).toJSON = getFunctionPresentationForThis;
};
