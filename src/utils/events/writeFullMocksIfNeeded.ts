import {TestRunStatus} from '../../constants/internal';
import {getFullMocksState} from '../../context/fullMocks';

import {cloneWithoutLogEvents} from '../clone';
import {generalLog} from '../generalLog';
import {getTimeoutPromise} from '../promise';

import {writeFullMocks} from './writeFullMocks';

import type {TestRunEvent} from '../../types/internal';

const delayForWritingFullMocksInMs = 100;

/**
 * Writes full mocks of one test, if needed.
 * @internal
 */
export const writeFullMocksIfNeeded = async (
  status: TestRunStatus,
  testRunEvent: TestRunEvent,
): Promise<void> => {
  if (status !== TestRunStatus.Passed) {
    return;
  }

  const fullMocksState = getFullMocksState();

  if (fullMocksState === undefined || fullMocksState.appliedMocks !== undefined) {
    return;
  }

  await getTimeoutPromise(delayForWritingFullMocksInMs);

  const {filePath, name} = testRunEvent;

  await writeFullMocks(fullMocksState, name, filePath).catch((error: unknown) => {
    generalLog('Cannot write "full mocks" for test', {
      error,
      testRunEvent: cloneWithoutLogEvents(testRunEvent),
    });
  });
};
