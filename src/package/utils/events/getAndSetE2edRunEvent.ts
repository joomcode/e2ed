import {assertValueIsDefined, assertValueIsTrue} from '../asserts';

import type {E2edRunEvent} from '../../types/internal';

let e2edRunEvent: E2edRunEvent | undefined;

/**
 * Get run e2ed event (for report).
 * @internal
 */
export const getE2edRunEvent = (): E2edRunEvent => {
  assertValueIsDefined(e2edRunEvent);

  return e2edRunEvent;
};

/**
 * Set run e2ed event (for report).
 * @internal
 */
export const setE2edRunEvent = (event: E2edRunEvent): void => {
  assertValueIsTrue(e2edRunEvent === undefined);

  e2edRunEvent = event;
};
