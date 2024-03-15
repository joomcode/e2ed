import {ExitCode} from '../../constants/internal';

import {exitFromE2ed} from '../exit';
import {generalLog} from '../generalLog';
import {setReadonlyProperty} from '../setReadonlyProperty';

import {getReports} from './getReports';
import {runAfterPackFunctions} from './runAfterPackFunctions';
import {writeReports} from './writeReports';

import type {LiteReport, ReportData} from '../../types/internal';

let isEndAlreadyCalled = false;

/**
 * Registers end e2ed run event (for report) after closing of all tests.
 * @internal
 */
export const registerEndE2edRunEvent = async (): Promise<void> => {
  if (isEndAlreadyCalled) {
    return;
  }

  isEndAlreadyCalled = true;

  const message = 'Starting to close e2ed...';

  // eslint-disable-next-line no-console
  console.log(message);
  generalLog(message);

  let reportData: ReportData | undefined;

  try {
    let liteReport: LiteReport | undefined;

    ({liteReport, reportData} = await getReports());

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

    await writeReports({liteReport, reportData});
  } catch (error) {
    generalLog(
      'Caught an error while collecting the report data or writing the HTML report and lite report',
      {error},
    );
  } finally {
    await exitFromE2ed(reportData?.exitCode);
  }
};
