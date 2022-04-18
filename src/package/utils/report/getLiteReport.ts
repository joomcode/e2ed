import {assertValueIsNotNull} from '../asserts';

import {getLiteRetry} from './getLiteRetry';

import type {LiteReport, ReportData} from '../../types/internal';

/**
 * Get lite report with test runs results and without test run logs.
 * @internal
 */
export const getLiteReport = (reportData: ReportData): LiteReport => {
  const {endTimeInMs, errors, exitStatus, liteReportFileName, retries, startInfo, startTimeInMs} =
    reportData;

  assertValueIsNotNull(liteReportFileName);

  const liteRetries = retries.map(getLiteRetry);

  return {
    endTimeInMs,
    errors,
    exitStatus,
    liteReportFileName,
    retries: liteRetries,
    startInfo,
    startTimeInMs,
  };
};
