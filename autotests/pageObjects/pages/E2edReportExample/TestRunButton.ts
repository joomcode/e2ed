import {getCssSelector} from 'autotests/selectors';

import type {Selector} from 'e2ed/types';

const testId = 'TestRunButton';

/**
 * `TestRun` button.
 */
export class TestRunButton {
  static readonly parameters: string = getCssSelector(testId, 'parameters');

  readonly selector: Selector;

  constructor(selector: Selector) {
    this.selector = selector;
  }

  /**
   * Element with `mainParams` of test.
   */
  get parameters(): Selector {
    return this.selector.find(TestRunButton.parameters);
  }
}
