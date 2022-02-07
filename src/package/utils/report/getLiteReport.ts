import {getLiteRetry} from './getLiteRetry';

import type {LiteReport, ReportData} from '../../types/internal';

/**
 * Get lite report with test runs results and without test run logs.
 * @internal
 */
export const getLiteReport = (reportData: ReportData): LiteReport => {
  const {
    concurrency,
    endTimeInMs,
    errors,
    name,
    retries,
    runEnvironment,
    startMessage,
    startTimeInMs,
  } = reportData;

  const liteRetries = retries.map(getLiteRetry);

  return {
    concurrency,
    endTimeInMs,
    errors,
    name,
    retries: liteRetries,
    runEnvironment,
    startMessage,
    startTimeInMs,
  };
};
