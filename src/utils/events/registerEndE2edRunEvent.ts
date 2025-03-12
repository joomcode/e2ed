import {ExitCode, TMP_DIRECTORY_PATH} from '../../constants/internal';

import {exitFromE2ed} from '../exit';
import {removeDirectory} from '../fs';
import {generalLog} from '../generalLog';
import {setReadonlyProperty} from '../object';

import {getReports} from './getReports';
import {runAfterPackFunctions} from './runAfterPackFunctions';
import {writeReports} from './writeReports';

import type {LiteReport, ReportData, UtcTimeInMs} from '../../types/internal';

let isEndAlreadyCalled = false;

/**
 * Registers end e2ed run event (for report) after closing of all tests.
 * @internal
 */
// eslint-disable-next-line max-statements
export const registerEndE2edRunEvent = async (): Promise<void> => {
  if (isEndAlreadyCalled) {
    return;
  }

  isEndAlreadyCalled = true;

  const message = 'Starting to close e2ed...';

  try {
    generalLog(message);
  } catch {
    // eslint-disable-next-line no-console
    console.log(message);
  }

  let reportData: ReportData | undefined;

  try {
    let liteReport: LiteReport | undefined;

    ({liteReport, reportData} = await getReports());

    await removeDirectory(TMP_DIRECTORY_PATH);

    try {
      await runAfterPackFunctions(liteReport);
    } catch (error) {
      generalLog('Caught an error on run "after pack" functions', {error});

      setReadonlyProperty(liteReport, 'exitCode', ExitCode.HasErrorsInDoAfterPackFunctions);
      setReadonlyProperty(reportData, 'exitCode', ExitCode.HasErrorsInDoAfterPackFunctions);
    }

    const {customReportProperties} = liteReport;

    if (customReportProperties !== undefined) {
      setReadonlyProperty(reportData, 'customReportProperties', customReportProperties);
    }

    const endTimeInMs = Date.now() as UtcTimeInMs;

    setReadonlyProperty(liteReport, 'endTimeInMs', endTimeInMs);
    setReadonlyProperty(reportData, 'endTimeInMs', endTimeInMs);

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
