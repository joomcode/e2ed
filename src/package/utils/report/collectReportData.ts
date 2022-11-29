import {getExitCode} from '../exit';
import {getFullConfig} from '../getFullConfig';

import {assertThatTestNamesAndFilePathsAreUnique} from './assertThatTestNamesAndFilePathsAreUnique';
import {getReportErrors} from './getReportErrors';
import {getRetries} from './getRetries';
import {getSummaryRunE2edResults} from './getSummaryRunE2edResults';
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
  const {liteReportFileName, reportFileName} = getFullConfig();

  const errors = await getReportErrors(startInfo.runEnvironment, fullTestRuns);

  assertThatTestNamesAndFilePathsAreUnique(fullTestRuns);

  unificateRunHashes(fullTestRuns);

  const retries = getRetries(fullTestRuns);
  const exitCode = getExitCode(retries);

  const summaryRunE2edResults = getSummaryRunE2edResults(fullTestRuns, retries.at(-1));

  return {
    endE2edReason,
    endTimeInMs,
    errors,
    exitCode,
    fullTestRuns,
    liteReportFileName,
    reportFileName,
    retries,
    startInfo,
    summaryRunE2edResults,
  };
};
