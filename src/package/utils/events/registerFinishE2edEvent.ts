import {TMP_DIRECTORY_PATH} from '../../constants/internal';
import {generalLog} from '../generalLog';
import {getRunE2edEvent} from '../getAndSetRunE2edEvent';
import {readEventsFromFiles} from '../readEventsFromFiles';
import {removeDirectory} from '../removeDirectory';
import {saveHtmlReport} from '../report';

import type {FinishE2edEvent} from '../../types/internal';

/**
 * Register finishing e2ed event (for report) after closing of all tests.
 * @internal
 */
export const registerFinishE2edEvent = async ({
  utcTimeInMs: finishTimeInMs,
}: FinishE2edEvent): Promise<void> => {
  generalLog('Close e2ed');

  const testRunsWithHooks = await readEventsFromFiles();
  const runE2edEvent = getRunE2edEvent();
  const {utcTimeInMs: startTimeInMs, ...restRunE2edEvent} = runE2edEvent;

  const reportData = {startTimeInMs, finishTimeInMs, testRunsWithHooks, ...restRunE2edEvent};

  await saveHtmlReport(reportData);

  await removeDirectory(TMP_DIRECTORY_PATH);
};
