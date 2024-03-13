import type {CreateLocator} from 'e2ed/createLocator';
import type {Selector, TestRunButtonLocator} from 'e2ed/types';

type Locator = CreateLocator<TestRunButtonLocator, Selector>;

/**
 * `TestRun` button.
 */
export class TestRunButton {
  readonly locator: Locator;

  constructor(locator: Locator) {
    this.locator = locator;
  }

  /**
   * Element with `mainParams` of test.
   */
  get parameters(): Selector {
    return this.locator.parameters();
  }
}
