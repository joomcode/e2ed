import {TMP_DIRECTORY_PATH} from '../../constants/internal';
import {generalLog} from '../generalLog';
import {getE2edRunEvent} from '../getAndSetE2edRunEvent';
import {readEventsFromFiles} from '../readEventsFromFiles';
import {removeDirectory} from '../removeDirectory';
import {saveHtmlReport} from '../report';
import {getReportName} from '../report/getReportName';

import type {EndE2edRunEvent} from '../../types/internal';

/**
 * Register end e2ed run event (for report) after closing of all tests.
 * @internal
 */
export const registerEndE2edRunEvent = async ({
  utcTimeInMs: endTimeInMs,
}: EndE2edRunEvent): Promise<void> => {
  generalLog('Close e2ed');

  const testRunsWithHooks = await readEventsFromFiles();
  const e2edRunEvent = getE2edRunEvent();
  const {utcTimeInMs: startTimeInMs, ...restE2edRunEvent} = e2edRunEvent;
  const name = getReportName(startTimeInMs);

  const reportData = {startTimeInMs, endTimeInMs, name, testRunsWithHooks, ...restE2edRunEvent};

  await saveHtmlReport(reportData);

  await removeDirectory(TMP_DIRECTORY_PATH);
};
