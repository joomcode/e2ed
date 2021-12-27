import {e2edChooseTestRun as clientE2edChooseTestRun} from './e2edChooseTestRun';

import type {RunHash} from '../../../types/internal';

const e2edChooseTestRun = clientE2edChooseTestRun;

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
