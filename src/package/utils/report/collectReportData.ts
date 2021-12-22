import {getReportErrors} from './getReportErrors';
import {getReportName} from './getReportName';
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

  unificateRunHashes(testRunsWithHooks);

  const reportData = {
    startTimeInMs,
    errors,
    endTimeInMs,
    name,
    runEnvironment,
    testRunsWithHooks,
    ...restE2edRunEvent,
  };

  return reportData;
};
