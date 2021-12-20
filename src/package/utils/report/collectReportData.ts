import {getReportErrors} from './getReportErrors';
import {getReportName} from './getReportName';

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
  const {utcTimeInMs: startTimeInMs, ...restE2edRunEvent} = e2edRunEvent;
  const {utcTimeInMs: endTimeInMs} = endE2edRunEvent;

  const name = getReportName(startTimeInMs);

  const errors = await getReportErrors(testRunsWithHooks);

  const reportData = {
    startTimeInMs,
    errors,
    endTimeInMs,
    name,
    testRunsWithHooks,
    ...restE2edRunEvent,
  };

  return reportData;
};
