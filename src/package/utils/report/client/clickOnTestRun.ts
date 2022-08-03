import {chooseTestRun as clientChooseTestRun} from './chooseTestRun';

import type {RunHash} from '../../../types/internal';

const chooseTestRun = clientChooseTestRun;

/**
 * Handler for click on choose TestRun button.
 * This base client function should not use scope variables (except other base functions).
 * @internal
 */
export function clickOnTestRun(element: HTMLElement): void {
  const runHash = (element.dataset as {runhash: RunHash}).runhash;

  const previousChosenTestRunButton = document.querySelector('.test-button[aria-selected="true"]');

  if (previousChosenTestRunButton) {
    previousChosenTestRunButton.setAttribute('aria-selected', 'false');
  }

  element.setAttribute('aria-selected', 'true');

  chooseTestRun(runHash);
}
