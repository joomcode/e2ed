import {writeHtmlReport, writeLiteJsonReport} from '../report';

import type {LiteReport, ReportData} from '../../types/internal';

type Options = Readonly<{liteReport: LiteReport; reportData: ReportData}>;

/**
 * Writes HTML report and lite JSON report to corresponding files.
 * @internal
 */
export const writeReports = async ({liteReport, reportData}: Options): Promise<void> => {
  const {liteReportFileName, reportFileName} = reportData;

  if (liteReportFileName !== null) {
    await writeLiteJsonReport(liteReport);
  }

  if (reportFileName !== null) {
    await writeHtmlReport(reportData);
  }
};
