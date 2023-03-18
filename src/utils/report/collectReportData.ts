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
  notIncludedInPackTests,
  startInfo,
}: FullEventsData): Promise<ReportData> => {
  const {liteReportFileName, reportFileName} = getFullPackConfig();

  const errors = await getReportErrors(
    startInfo.runEnvironment,
    fullTestRuns,
    notIncludedInPackTests,
  );

  assertThatTestNamesAndFilePathsAreUnique(fullTestRuns);

  unificateRunHashes(fullTestRuns);

  const retries = getRetries(fullTestRuns);
  const exitCode = getExitCode(errors.length > 0, retries);

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
    notIncludedInPackTests,
    reportFileName,
    retries,
    startInfo,
    summaryPackResults,
  };
};
