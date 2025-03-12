import {FAILED_TEST_RUN_STATUSES} from '../../../constants/internal';

import {createSafeHtmlWithoutSanitize, sanitizeJson} from '../client';

import type {
  FullTestRun,
  ReportClientData,
  ReportData,
  SafeHtml,
  ScriptJsonData,
} from '../../../types/internal';

type FullTestRuns = readonly FullTestRun[];

const filterErrors = (fullTestRuns: FullTestRuns): [errors: FullTestRuns, rest: FullTestRuns] => {
  const errors: FullTestRun[] = [];
  const rest: FullTestRun[] = [];

  for (const fullTestRun of fullTestRuns) {
    if (FAILED_TEST_RUN_STATUSES.includes(fullTestRun.status)) {
      errors.push(fullTestRun);
    } else {
      rest.push(fullTestRun);
    }
  }

  return [errors, rest];
};

/**
 * Renders `<script>` tags with JSON presentation of report data.
 * In first tag renders the errors of the last retry, then the entire last retry,
 * then all the remaining errors, tnen general client data, and then all the remaining data.
 * @internal
 */
export const renderJsonData = (reportData: ReportData): SafeHtml => {
  const {apiStatistics, retries} = reportData;
  const reportClientData: ReportClientData = {apiStatistics};

  const fullTestRunsNotFromLastRetry: FullTestRun[] = [];
  const lastRetry = retries.at(-1);

  for (let index = 0; index < retries.length - 1; index += 1) {
    fullTestRunsNotFromLastRetry.push(...(retries[index]?.fullTestRuns ?? []));
  }

  const [lastRetryErrors, lastRetryRest] = filterErrors(lastRetry?.fullTestRuns ?? []);
  const [restErrors, rest] = filterErrors(fullTestRunsNotFromLastRetry);

  const parts: readonly ScriptJsonData[] = [
    lastRetryErrors,
    lastRetryRest,
    restErrors,
    reportClientData,
    rest,
  ].filter((part) => !('length' in part) || part.length > 0);

  const scripts = parts.map((fullTestRuns) => {
    const json = JSON.stringify(fullTestRuns);
    const sanitizedJson = sanitizeJson(json);

    return createSafeHtmlWithoutSanitize`<script class="e2edJsonReportData" type="plain/text">${sanitizedJson}</script>`;
  });

  return createSafeHtmlWithoutSanitize`${scripts.join('')}`;
};
