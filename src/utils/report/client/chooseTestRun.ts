import {assertValueIsDefined as clientAssertValueIsDefined} from './assertValueIsDefined';
import {renderTestRunDetails as clientRenderTestRunDetails} from './render';

import type {ReportClientState, RunHash} from '../../../types/internal';

const assertValueIsDefined: typeof clientAssertValueIsDefined = clientAssertValueIsDefined;
const renderTestRunDetails = clientRenderTestRunDetails;

declare const e2edTestRunDetailsContainer: HTMLElement;
declare const reportClientState: ReportClientState;

/**
 * Choose TestRun (render chosen TestRun in right panel).
 * This base client function should not use scope variables (except other base functions).
 * @internal
 */
export function chooseTestRun(runHash: RunHash): void {
  const previousHash = window.location.hash as RunHash;

  window.location.hash = runHash;

  if (reportClientState.testRunDetailsElementsByHash === undefined) {
    reportClientState.testRunDetailsElementsByHash = {};
  }

  const {testRunDetailsElementsByHash} = reportClientState;

  const previousTestRunDetailsElement =
    e2edTestRunDetailsContainer.firstElementChild as HTMLElement;

  if (!(previousHash in testRunDetailsElementsByHash)) {
    testRunDetailsElementsByHash[previousHash] = previousTestRunDetailsElement;
  }

  if (runHash in testRunDetailsElementsByHash) {
    const e2edTestRunDetailsElement = testRunDetailsElementsByHash[runHash];

    assertValueIsDefined(e2edTestRunDetailsElement);

    previousTestRunDetailsElement.replaceWith(e2edTestRunDetailsElement);

    return;
  }

  const {fullTestRuns} = reportClientState;

  if (fullTestRuns === undefined) {
    // eslint-disable-next-line no-console
    console.log('JSON report data not yet loaded. Please try click again later');

    return;
  }

  const fullTestRun = fullTestRuns.find((testRun) => testRun.runHash === runHash);

  if (fullTestRun === undefined) {
    // eslint-disable-next-line no-console
    console.error(`Cannot find test run with hash ${runHash} in JSON report data`);

    return;
  }

  const testRunDetailsHtml = renderTestRunDetails(fullTestRun);

  e2edTestRunDetailsContainer.innerHTML = String(testRunDetailsHtml);

  const nextTestRunDetailsElement = e2edTestRunDetailsContainer.firstElementChild as HTMLElement;

  testRunDetailsElementsByHash[runHash] = nextTestRunDetailsElement;
}
