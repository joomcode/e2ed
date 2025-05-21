import {assertValueIsDefined as clientAssertValueIsDefined} from './assertValueIsDefined';
import {maybeRenderApiStatistics as clientMaybeRenderApiStatistics} from './maybeRenderApiStatistics';
import {renderTestRunDetails as clientRenderTestRunDetails} from './render';

import type {ReportClientState, RunHash, SafeHtml} from '../../../types/internal';

const assertValueIsDefined: typeof clientAssertValueIsDefined = clientAssertValueIsDefined;
const maybeRenderApiStatistics = clientMaybeRenderApiStatistics;
const renderTestRunDetails = clientRenderTestRunDetails;

declare const reportClientState: ReportClientState;

/**
 * Chooses `TestRun` (render chosen `TestRun` in right panel).
 * This base client function should not use scope variables (except other base functions).
 * @internal
 */
// eslint-disable-next-line max-statements
export function chooseTestRun(runHash: RunHash): void {
  const {e2edRightColumnContainer} = reportClientState;

  if (e2edRightColumnContainer === undefined) {
    // eslint-disable-next-line no-console
    console.error(
      'Cannot find right column container (id="e2edRightColumnContainer"). Probably page not yet completely loaded. Please try click again later',
    );

    return;
  }

  const previousHash = window.location.hash.replaceAll('#', '') as RunHash;

  window.location.hash = runHash;

  if (reportClientState.testRunDetailsElementsByHash === undefined) {
    reportClientState.testRunDetailsElementsByHash = Object.create(null) as {};
  }

  const {testRunDetailsElementsByHash} = reportClientState;

  const previousTestRunDetailsElement = e2edRightColumnContainer.firstElementChild as HTMLElement;

  if (
    !(previousHash in testRunDetailsElementsByHash) &&
    !previousTestRunDetailsElement.classList.contains('test-details-empty')
  ) {
    testRunDetailsElementsByHash[previousHash] = previousTestRunDetailsElement;
  }

  if (runHash in testRunDetailsElementsByHash) {
    const e2edTestRunDetailsElement = testRunDetailsElementsByHash[runHash];

    assertValueIsDefined(e2edTestRunDetailsElement);

    previousTestRunDetailsElement.replaceWith(e2edTestRunDetailsElement);

    return;
  }

  let rightColumnHtml: SafeHtml | undefined = maybeRenderApiStatistics(runHash);

  if (rightColumnHtml === undefined) {
    const {fullTestRuns} = reportClientState;
    const fullTestRun = fullTestRuns.find((testRun) => testRun.runHash === runHash);

    if (fullTestRun === undefined) {
      // eslint-disable-next-line no-console
      console.error(
        `Cannot find test run with hash ${runHash} in JSON report data. Probably JSON report data for this test run not yet loaded. Please try click again later`,
      );

      return;
    }

    rightColumnHtml = renderTestRunDetails(fullTestRun);
  }

  e2edRightColumnContainer.innerHTML = String(rightColumnHtml);

  const nextTestRunDetailsElement = e2edRightColumnContainer.firstElementChild as HTMLElement;

  testRunDetailsElementsByHash[runHash] = nextTestRunDetailsElement;
}
