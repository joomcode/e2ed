import {assertionMessageGetters} from './assertionMessageGetters';
import {createExpectMethod} from './createExpectMethod';
import {playwrightMethods} from './playwrightMethods';

import type {Payload} from '../../types/internal';

import type {AssertionFunctionKey} from './types';

/**
 * Wrapper of playwright's `expect` with logs.
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
   * Optional additional fields that will be added to the assert logs.
   */
  readonly additionalLogFields?: Payload;

  /**
   * Description of `expect`.
   */
  readonly description: string;

  /**
   * Optional error of assert method.
   */
  readonly error?: Error;

  constructor(actualValue: unknown, description: string) {
    this.actualValue = actualValue;
    this.description = description;
  }
}

const methods = [...Object.keys(assertionMessageGetters), ...playwrightMethods];

for (const key of methods) {
  Expect.prototype[key] = createExpectMethod(
    key,
    assertionMessageGetters[key as AssertionFunctionKey],
  );
}
