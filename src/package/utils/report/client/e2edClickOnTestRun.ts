import type {RunHash} from '../../../types/internal';

import type {e2edChooseTestRun as E2edChooseTestRun} from './e2edChooseTestRun';

declare const e2edChooseTestRun: typeof E2edChooseTestRun;

/**
 * Handler for click on choose TestRun button.
 * This global client function should not use scope variables (except other global functions).
 * @internal
 */
export function e2edClickOnTestRun(element: HTMLElement): void {
  const runHash = element.dataset.runhash as RunHash;

  const previousChosenTestRunButton = document.querySelector('.test-button[aria-selected="true"]');

  if (previousChosenTestRunButton) {
    previousChosenTestRunButton.setAttribute('aria-selected', 'false');
  }

  element.setAttribute('aria-selected', 'true');

  e2edChooseTestRun(runHash);
}
