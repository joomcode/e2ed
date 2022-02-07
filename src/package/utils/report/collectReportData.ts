import {TestRunStatus} from '../../constants/internal';

import {assertThatTestNamesAreUnique} from './assertThatTestNamesAreUnique';
import {getReportErrors} from './getReportErrors';
import {getReportName} from './getReportName';
import {getRetriesAndSetStatuses} from './getRetriesAndSetStatuses';
import {unificateRunHashes} from './unificateRunHashes';

import type {FullEventsData, ReportData} from '../../types/internal';

/**
 * Collect complete report data from all sources.
 * @internal
 */
export const collectReportData = async ({
  e2edRunEvent,
  endE2edRunEvent,
  testRunsWithHooks,
}: FullEventsData): Promise<ReportData> => {
  const {utcTimeInMs: startTimeInMs, runEnvironment, ...restE2edRunEvent} = e2edRunEvent;
  const {utcTimeInMs: endTimeInMs} = endE2edRunEvent;

  const name = getReportName(startTimeInMs);

  const errors = await getReportErrors(runEnvironment, testRunsWithHooks);

  assertThatTestNamesAreUnique(testRunsWithHooks);

  unificateRunHashes(testRunsWithHooks);

  const fullTestRuns = testRunsWithHooks.map((testRun) => ({
    ...testRun,
    status: TestRunStatus.Unknown,
  }));

  const retries = getRetriesAndSetStatuses(fullTestRuns);

  const reportData = {
    endTimeInMs,
    errors,
    fullTestRuns,
    name,
    retries,
    runEnvironment,
    startTimeInMs,
    ...restE2edRunEvent,
  };

  return reportData;
};
