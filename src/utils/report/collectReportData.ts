import {getExitCode} from '../exit';
import {getFullPackConfig} from '../getFullPackConfig';

import {assertThatTestNamesAndFilePathsAreUnique} from './assertThatTestNamesAndFilePathsAreUnique';
import {getFailedTestsMainParams} from './getFailedTestsMainParams';
import {getReportErrors} from './getReportErrors';
import {getRetries} from './getRetries';
import {getSummaryPackResults} from './getSummaryPackResults';
import {unificateRunHashes} from './unificateRunHashes';

import type {FullEventsData, ReportData} from '../../types/internal';

/**
 * Collect complete report data from all sources.
 * @internal
 */
export const collectReportData = async ({
  endE2edReason,
  endTimeInMs,
  fullTestRuns,
  startInfo,
}: FullEventsData): Promise<ReportData> => {
  const {liteReportFileName, reportFileName} = getFullPackConfig();

  const errors = await getReportErrors(startInfo.runEnvironment, fullTestRuns);

  assertThatTestNamesAndFilePathsAreUnique(fullTestRuns);

  unificateRunHashes(fullTestRuns);

  const retries = getRetries(fullTestRuns);
  const exitCode = getExitCode(retries);

  const failedTestsMainParams = getFailedTestsMainParams(retries.at(-1));
  const summaryPackResults = getSummaryPackResults(fullTestRuns, retries.at(-1));

  return {
    customReportProperties: undefined,
    endE2edReason,
    endTimeInMs,
    errors,
    exitCode,
    failedTestsMainParams,
    fullTestRuns,
    liteReportFileName,
    reportFileName,
    retries,
    startInfo,
    summaryPackResults,
  };
};
