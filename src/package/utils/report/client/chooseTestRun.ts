import {renderTestRunDetails as clientRenderTestRunDetails} from './render';

import type {ReportClientGlobal, RunHash} from '../../../types/internal';

const renderTestRunDetails = clientRenderTestRunDetails;

declare const e2edTestRunDetailsContainer: HTMLElement;

/**
 * Choose TestRun (render chosen TestRun in right panel).
 * This base client function should not use scope variables (except other base functions).
 * @internal
 */
export function chooseTestRun(runHash: RunHash): void {
  const previousHash = window.location.hash as RunHash;

  window.location.hash = runHash;

  const global: ReportClientGlobal = window;

  if (global.e2edTestRunDetailsElementsByHash === undefined) {
    global.e2edTestRunDetailsElementsByHash = {};
  }

  const {e2edTestRunDetailsElementsByHash} = global;

  if (e2edTestRunDetailsElementsByHash === undefined) {
    return;
  }

  const previousTestRunDetailsElement =
    e2edTestRunDetailsContainer.firstElementChild as HTMLElement;

  if (!(previousHash in e2edTestRunDetailsElementsByHash)) {
    e2edTestRunDetailsElementsByHash[previousHash] = previousTestRunDetailsElement;
  }

  if (runHash in e2edTestRunDetailsElementsByHash) {
    previousTestRunDetailsElement.replaceWith(e2edTestRunDetailsElementsByHash[runHash]);

    return;
  }

  const {e2edFullTestRuns} = global;

  if (e2edFullTestRuns === undefined) {
    // eslint-disable-next-line no-console
    console.log('JSON report data not yet loaded');

    return;
  }

  const fullTestRun = e2edFullTestRuns.find((testRun) => testRun.runHash === runHash);

  if (fullTestRun === undefined) {
    // eslint-disable-next-line no-console
    console.error(`Cannot find test run with hash ${runHash} in JSON report data`);

    return;
  }

  const testRunDetailsHtml = renderTestRunDetails(fullTestRun);

  e2edTestRunDetailsContainer.innerHTML = String(testRunDetailsHtml);

  const nextTestRunDetailsElement = e2edTestRunDetailsContainer.firstElementChild as HTMLElement;

  e2edTestRunDetailsElementsByHash[runHash] = nextTestRunDetailsElement;
}
