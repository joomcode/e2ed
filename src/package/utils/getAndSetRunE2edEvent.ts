import {assertValueIsDefined, assertValueIsTrue} from './asserts';

import type {RunE2edEvent} from '../types/internal';

let runE2edEvent: RunE2edEvent | undefined;

/**
 * Get run e2ed event (for report).
 * @internal
 */
export const getRunE2edEvent = (): RunE2edEvent => {
  assertValueIsDefined(runE2edEvent);

  return runE2edEvent;
};

/**
 * Set run e2ed event (for report).
 * @internal
 */
export const setRunE2edEvent = (event: RunE2edEvent): void => {
  assertValueIsTrue(runE2edEvent === undefined);

  runE2edEvent = event;
};
