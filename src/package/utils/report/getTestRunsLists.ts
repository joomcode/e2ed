import {TestRunStatus} from '../../constants/internal';

import type {ReportData, TestRunButtonProps, TestRunsListProps} from '../../types/internal';

/**
 * Get array of TestRunsListProps (by retries) from report data.
 * @internal
 */
export const getTestRunsLists = (reportData: ReportData): TestRunsListProps[] => {
  // eslint-disable-next-line global-require, @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-var-requires
  const hooks: typeof import('../../hooks') = require('../../hooks');

  const {testRuns} = reportData;

  const testRunsLists: TestRunsListProps[] = [];
  const testRunButtonsHash: Record<number, TestRunButtonProps[]> = {};

  for (const testRun of testRuns) {
    const {filePath, errors, name, runId, runLabel, startTimeInMs, finishTimeInMs} = testRun;

    const mainParams = hooks.mainParams(testRun);

    const durationInMs = finishTimeInMs - startTimeInMs;

    const retry = parseInt((runLabel || 'retry 1').slice(6), 10);

    const status = errors.length === 0 ? TestRunStatus.Passed : TestRunStatus.Failed;

    const testRunButtonProps = {durationInMs, filePath, mainParams, name, runId, status};

    if (testRunButtonsHash[retry] === undefined) {
      testRunButtonsHash[retry] = [];
    }

    testRunButtonsHash[retry].push(testRunButtonProps);
  }

  for (const [retryString, testRunButtons] of Object.entries(testRunButtonsHash)) {
    testRunButtons.sort((a, b) => (a.filePath > b.filePath ? 1 : -1));

    const retry = Number(retryString);

    const testRunsList = {hidden: retry !== 1, retry, testRunButtons};

    testRunsLists.push(testRunsList);
  }

  testRunsLists.sort((a, b) => a.retry - b.retry);

  return testRunsLists;
};
