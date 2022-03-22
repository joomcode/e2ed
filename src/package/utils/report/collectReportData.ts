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
  endE2edRunEvent,
  fullStartInfo,
  testRunsWithHooks,
}: FullEventsData): Promise<ReportData> => {
  const {utcTimeInMs: startTimeInMs, ...startInfo} = fullStartInfo;
  const {utcTimeInMs: endTimeInMs} = endE2edRunEvent;

  const name = getReportName(startTimeInMs);

  const errors = await getReportErrors(startInfo.runEnvironment, testRunsWithHooks);

  assertThatTestNamesAreUnique(testRunsWithHooks);

  unificateRunHashes(testRunsWithHooks);

  const fullTestRuns = testRunsWithHooks.map((testRun) => ({
    ...testRun,
    status: testRun.isSkipped ? TestRunStatus.Skipped : TestRunStatus.Unknown,
  }));

  const retries = getRetriesAndSetStatuses(fullTestRuns);

  const reportData = {
    endTimeInMs,
    errors,
    fullTestRuns,
    name,
    retries,
    startInfo,
    startTimeInMs,
  };

  return reportData;
};
