import {writeFile} from 'fs/promises';
import {join} from 'path';

import {REPORTS_DIRECTORY_PATH} from '../../constants/internal';
import {generalLog} from '../generalLog';

import {renderReportToHtml} from './render';

import type {ReportData} from '../../types/internal';

/**
 * Save HTML report (report.html file) with test runs results.
 * @internal
 */
export const writeHtmlReport = (reportData: ReportData): Promise<void> => {
  const reportHtml = renderReportToHtml(reportData);
  const reportFileName = `${reportData.name}.html`;
  const reportFilePath = join(REPORTS_DIRECTORY_PATH, reportFileName);

  generalLog(`Write HTML report (${reportHtml.length} symbols) to "${reportFilePath}"`);

  return writeFile(reportFilePath, reportHtml);
};
