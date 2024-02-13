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

  constructor(
    readonly actualValue: unknown,
    readonly description: string, // eslint-disable-next-line no-empty-function
  ) {}
}

for (const [key, getAssertionMessage] of Object.entries(assertionMessageGetters)) {
  Expect.prototype[key] = createExpectMethod(key as AssertionFunctionKey, getAssertionMessage);
}
