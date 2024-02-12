import {assertValueIsUndefined} from './asserts';

import type {TestCafeInstance} from '../types/internal';

let maybeTestCafeInstance: TestCafeInstance | undefined;

/**
 * Get TestCafe instance of current tests subprocess or `undefined`.
 * @internal
 */
export const getMaybeTestCafeInstance = (): TestCafeInstance | undefined => maybeTestCafeInstance;

/**
 * Set TestCafe instance of current tests subprocess (can only be called once).
 * @internal
 */
export const setTestCafeInstance = (testCafeInstance: TestCafeInstance | undefined): void => {
  assertValueIsUndefined(maybeTestCafeInstance, 'maybeTestCafeInstance is not defined', {
    testCafeInstance,
  });

  maybeTestCafeInstance = testCafeInstance;
};
