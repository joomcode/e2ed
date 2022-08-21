import {assertValueIsNotNull} from '../asserts';

import {getLiteRetry} from './getLiteRetry';

import type {LiteReport, ReportData} from '../../types/internal';

/**
 * Get lite report with test runs results and without test run logs.
 * @internal
 */
export const getLiteReport = (reportData: ReportData): LiteReport => {
  const {endE2edReason, endTimeInMs, errors, exitStatus, liteReportFileName, retries, startInfo} =
    reportData;

  assertValueIsNotNull(liteReportFileName, 'liteReportFileName is not null');

  const liteRetries = retries.map(getLiteRetry);

  return {
    endE2edReason,
    endTimeInMs,
    errors,
    exitStatus,
    liteReportFileName,
    retries: liteRetries,
    startInfo,
  };
};
