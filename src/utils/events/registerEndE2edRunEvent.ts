import {ExitCode} from '../../constants/internal';

import {exitFromE2ed} from '../exit';
import {failMessage, generalLog, okMessage} from '../generalLog';
import {collectReportData, getLiteReport, writeHtmlReport, writeLiteJsonReport} from '../report';
import {setReadonlyProperty} from '../setReadonlyProperty';

import {collectFullEventsData} from './collectFullEventsData';
import {runAfterPackFunctions} from './runAfterPackFunctions';

import type {ReportData} from '../../types/internal';

/**
 * Registers end e2ed run event (for report) after closing of all tests.
 * @internal
 */
export const registerEndE2edRunEvent = async (): Promise<void> => {
  generalLog('Starting to close e2ed...');

  let reportData: ReportData | undefined;

  try {
    const fullEventsData = await collectFullEventsData();

    reportData = await collectReportData(fullEventsData);

    const stateMessage = reportData.exitCode === ExitCode.Passed ? okMessage : failMessage;

    generalLog(`Results of pack: ${stateMessage} ${reportData.summaryPackResults}`);

    const liteReport = getLiteReport(reportData);

    try {
      await runAfterPackFunctions(liteReport);
    } catch (error) {
      generalLog('Caught an error on run "after pack" functions', {error});

      setReadonlyProperty(reportData, 'exitCode', ExitCode.HasErrorsInDoAfterPackFunctions);
    }

    const {customReportProperties} = liteReport;

    if (customReportProperties !== undefined) {
      setReadonlyProperty(reportData, 'customReportProperties', customReportProperties);
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
    await exitFromE2ed(reportData?.exitCode);
  }
};
