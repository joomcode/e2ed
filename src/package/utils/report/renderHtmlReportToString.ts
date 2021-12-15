import {getTestRunsLists} from './getTestRunsLists';

import type {ReportData} from '../../types/internal';

/**
 * Render report data to HTML report page.
 */
export const renderHtmlReportToString = (reportData: ReportData): string => {
  const testRunsLists = getTestRunsLists(reportData);

  return String(testRunsLists.length);
};
