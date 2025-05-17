import {clickOnTestRun as clientClickOnTestRun} from './clickOnTestRun';

import type {ReportClientState} from '../../../types/internal';

const clickOnTestRun = clientClickOnTestRun;

declare const reportClientState: ReportClientState;

/**
 * Handler of loading first part of JSON report data for report page.
 * This client function should not use scope variables (except global functions).
 * @internal
 */
export function onFirstJsonReportDataLoad(): void {
  if (window.location.hash !== '') {
    return;
  }

  const buttonForFailedTestRun = document.querySelector(
    '.retry:not([hidden]) .test-button_status_failed',
  );

  if (!buttonForFailedTestRun) {
    return;
  }

  clickOnTestRun(buttonForFailedTestRun as HTMLElement);

  const buttonOfOpenStep = document.querySelector('.step-expanded[aria-expanded="true"]');
  const scrollDelayInMs = 8;

  if (buttonOfOpenStep) {
    const {top} = buttonOfOpenStep.getBoundingClientRect();

    setTimeout(() => {
      if (reportClientState.e2edRightColumnContainer !== undefined) {
        reportClientState.e2edRightColumnContainer.scrollTop = top;
      }
    }, scrollDelayInMs);
  }
}
