import {assertValueIsFalse} from '../asserts';
import {cloneWithoutLogEvents} from '../clone';
import {readEventsFromFiles} from '../fs';

import {truncateRetriesStateForLogs} from './truncateRetriesStateForLogs';

import type {FullTestRun, RetriesState} from '../../types/internal';

/**
 * Get array of new full test runs after running retry.
 * @internal
 */
export const getNewFullTestRuns = async (
  retriesState: RetriesState,
): Promise<readonly FullTestRun[]> => {
  const {successfulTestRunNamesHash, visitedTestRunEventsFileName} = retriesState;

  const newFullTestRuns = await readEventsFromFiles(visitedTestRunEventsFileName);

  for (const newFullTestRun of newFullTestRuns) {
    assertValueIsFalse(
      newFullTestRun.name in successfulTestRunNamesHash,
      `the test "${newFullTestRun.name}" is not among the successful tests already passed in the previous retries`,
      {
        newFullTestRun: cloneWithoutLogEvents(newFullTestRun),
        retriesState: truncateRetriesStateForLogs(retriesState),
      },
    );
  }

  return newFullTestRuns;
};
