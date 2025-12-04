/* eslint-disable no-console */

import {assertValueIsDefined as clientAssertValueIsDefined} from './assertValueIsDefined';
import {
  MaybeApiStatistics as clientMaybeApiStatistics,
  TestRunDetails as clientTestRunDetails,
} from './render';

import type {ReportClientState, RunHash} from '../../../types/internal';

const assertValueIsDefined: typeof clientAssertValueIsDefined = clientAssertValueIsDefined;
const MaybeApiStatistics = clientMaybeApiStatistics;
const TestRunDetails = clientTestRunDetails;

declare const jsx: JSX.Runtime;
declare const reportClientState: ReportClientState;

/**
 * Chooses `TestRun` (render chosen `TestRun` in right panel).
 * This base client function should not use scope variables (except other base functions).
 * @internal
 */
// eslint-disable-next-line max-statements
export const chooseTestRun = (runHash: RunHash): void => {
  const {e2edRightColumnContainer} = reportClientState;

  if (!e2edRightColumnContainer) {
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

  const previousTestRunDetailsElement =
    e2edRightColumnContainer.firstElementChild as HTMLElement | null;

  if (!previousTestRunDetailsElement) {
    console.error(
      'Cannot find first child element in right column container (id="e2edRightColumnContainer"). Probably page not yet completely loaded. Please try click again later',
    );

    return;
  }

  if (
    !(previousHash in testRunDetailsElementsByHash) &&
    !previousTestRunDetailsElement.classList.contains('empty-state')
  ) {
    testRunDetailsElementsByHash[previousHash] = previousTestRunDetailsElement;
  }

  if (runHash in testRunDetailsElementsByHash) {
    const e2edTestRunDetailsElement = testRunDetailsElementsByHash[runHash];

    assertValueIsDefined(e2edTestRunDetailsElement);

    previousTestRunDetailsElement.replaceWith(e2edTestRunDetailsElement);

    return;
  }

  let rightColumnHtml = <MaybeApiStatistics runHash={runHash} />;

  if (rightColumnHtml.length === 0) {
    const {fullTestRuns} = reportClientState;
    const fullTestRun = fullTestRuns.find((testRun) => testRun.runHash === runHash);

    if (fullTestRun === undefined) {
      console.error(
        `Cannot find test run with hash ${runHash} in JSON report data. Probably JSON report data for this test run not yet loaded. Please try click again later`,
      );

      return;
    }

    rightColumnHtml = <TestRunDetails fullTestRun={fullTestRun} />;
  }

  e2edRightColumnContainer.innerHTML = String(rightColumnHtml);

  const nextTestRunDetailsElement = e2edRightColumnContainer.firstElementChild as HTMLElement;

  testRunDetailsElementsByHash[runHash] = nextTestRunDetailsElement;
};
