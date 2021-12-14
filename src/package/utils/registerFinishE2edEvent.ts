import {TMP_DIRECTORY_PATH} from '../constants/internal';

import {getRunE2edEvent} from './getAndSetRunE2edEvent';
import {readEventsFromFiles} from './readEventsFromFiles';
import {removeDirectory} from './removeDirectory';
import {printReport} from './report';

import type {FinishE2edEvent} from '../types/internal';

/**
 * Register finishing e2ed event (for report) after closing of all tests.
 * @internal
 */
export const registerFinishE2edEvent = async ({
  utcTimeInMs: finishTimeInMs,
}: FinishE2edEvent): Promise<void> => {
  const testRuns = await readEventsFromFiles();
  const runE2edEvent = getRunE2edEvent();
  const {utcTimeInMs: startTimeInMs, ...restRunE2edEvent} = runE2edEvent;

  const reportData = {startTimeInMs, finishTimeInMs, testRuns, ...restRunE2edEvent};

  await printReport(reportData);

  await removeDirectory(TMP_DIRECTORY_PATH);
};
