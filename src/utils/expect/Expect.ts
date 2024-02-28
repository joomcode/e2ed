import {assertionMessageGetters} from './assertionMessageGetters';
import {createExpectMethod} from './createExpectMethod';

import type {AssertionFunctionKey} from './types';

/**
 * `testController.expect` wrapper with logs.
 * @internal
 */
// eslint-disable-next-line import/exports-last
export class Expect {
  [key: string]: unknown;

  /**
   * Actual value of `expect`.
   */
  readonly actualValue: unknown;

  /**
   * Description of `expect`.
   */
  readonly description: string;

  constructor(actualValue: unknown, description: string) {
    this.actualValue = actualValue;
    this.description = description;
  }
}

for (const [key, getAssertionMessage] of Object.entries(assertionMessageGetters)) {
  Expect.prototype[key] = createExpectMethod(key as AssertionFunctionKey, getAssertionMessage);
}
