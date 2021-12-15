import {TestRunStatus} from '../../constants/internal';

import {getRunHashUnificator} from './getRunHashUnificator';

import type {ReportData, TestRunButtonProps, TestRunsListProps} from '../../types/internal';

/**
 * Get array of TestRunsListProps (by retries) from report data.
 * @internal
 */
export const getTestRunsLists = ({testRuns}: ReportData): TestRunsListProps[] => {
  // eslint-disable-next-line global-require, @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-var-requires
  const hooks: typeof import('../../hooks') = require('../../hooks');

  const runHashUnificator = getRunHashUnificator();

  const testRunsLists: TestRunsListProps[] = [];
  const testRunButtonsHash: Record<number, TestRunButtonProps[]> = {};

  for (const testRun of testRuns) {
    const {filePath, errors, name, runId, runLabel, startTimeInMs, finishTimeInMs} = testRun;

    const mainParams = hooks.mainTestRunParams(testRun);

    const durationInMs = finishTimeInMs - startTimeInMs;

    const retry = parseInt((runLabel || 'retry 1').slice(6), 10);

    const maybeDuplicateRunHash = hooks.testRunHash(testRun);
    const {duplicate, runHash} = runHashUnificator(maybeDuplicateRunHash);

    let status = errors.length === 0 ? TestRunStatus.Passed : TestRunStatus.Failed;

    if (duplicate) {
      status = TestRunStatus.Unknown;
    }

    const testRunButtonProps = {durationInMs, filePath, mainParams, name, runHash, runId, status};

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
