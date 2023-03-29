import {processExit} from '../exit';
import {generalLog} from '../generalLog';
import {collectReportData, getLiteReport, writeHtmlReport, writeLiteJsonReport} from '../report';

import {collectFullEventsData} from './collectFullEventsData';
import {runAfterPackFunctions} from './runAfterPackFunctions';

import type {ReportData} from '../../types/internal';

/**
 * Register end e2ed run event (for report) after closing of all tests.
 * @internal
 */
export const registerEndE2edRunEvent = async (): Promise<void> => {
  generalLog('Close e2ed');

  let reportData: ReportData | undefined;

  try {
    const fullEventsData = await collectFullEventsData();

    reportData = await collectReportData(fullEventsData);

    const liteReport = getLiteReport(reportData);

    await runAfterPackFunctions(liteReport);

    const {customReportProperties} = liteReport;

    if (customReportProperties !== undefined) {
      Object.assign<ReportData, Partial<ReportData>>(reportData, {customReportProperties});
    }

    const {liteReportFileName, reportFileName} = reportData;

    if (liteReportFileName !== null) {
      await writeLiteJsonReport(liteReport);
    }
    if (reportFileName !== null) {
      await writeHtmlReport(reportData);
    }
  } catch (error) {
    generalLog(
      'Caught an error while collecting the report data or writing the HTML report and lite report',
      {error},
    );
  } finally {
    processExit(reportData?.exitCode);
  }
};
