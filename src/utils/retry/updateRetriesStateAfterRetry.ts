import {assertValueIsFalse} from '../asserts';
import {cloneWithoutLogEvents} from '../clone';
import {getTestRunEventFileName} from '../fs';

import {getConcurrencyForNextRetry} from './getConcurrencyForNextRetry';
import {getNewFullTestRunsByStatuses} from './getNewFullTestRunsByStatuses';
import {logRetryResult} from './logRetryResult';

import type {Mutable, RetriesState} from '../../types/internal';

/**
 * Update retries states after running retry.
 * @internal
 */
export const updateRetriesStateAfterRetry = async (retriesState: RetriesState): Promise<void> => {
  const {concurrency, successfulTestRunNamesHash, visitedTestRunEventsFileName} = retriesState;
  const {
    failedNewFullTestRuns,
    newFullTestRuns,
    successfulNewFullTestRuns,
    unbrokenNewFullTestRuns,
  } = await getNewFullTestRunsByStatuses(retriesState);

  const successfulTotalInPreviousRetries = Object.keys(successfulTestRunNamesHash).length;

  for (const successfulNewFullTestRun of successfulNewFullTestRuns) {
    const {name} = successfulNewFullTestRun;

    assertValueIsFalse(
      name in successfulTestRunNamesHash,
      `a successful test "${name}" has a unique name`,
      {retriesState, successfulNewFullTestRun: cloneWithoutLogEvents(successfulNewFullTestRun)},
    );

    successfulTestRunNamesHash[name] = true;
  }

  for (const {runId} of newFullTestRuns) {
    (visitedTestRunEventsFileName as string[]).push(getTestRunEventFileName(runId));
  }

  logRetryResult({
    failedLength: failedNewFullTestRuns.length,
    newLength: newFullTestRuns.length,
    retriesState,
    successfulLength: successfulNewFullTestRuns.length,
    successfulTotalInPreviousRetries,
    unbrokenLength: unbrokenNewFullTestRuns.length,
  });

  const concurrencyForNextRetry = getConcurrencyForNextRetry({
    currentConcurrency: concurrency,
    noSuccessfulTestsInLastRetry: successfulNewFullTestRuns.length === 0,
    testsCount: failedNewFullTestRuns.length,
  });

  const failedTestNamesInLastRetry = failedNewFullTestRuns.map(({name}) => name);

  const retriesStateUpdate: Partial<Mutable<RetriesState>> = {
    concurrency: concurrencyForNextRetry,
    failedTestNamesInLastRetry,
  };

  Object.assign<RetriesState, Partial<RetriesState>>(retriesState, retriesStateUpdate);
};
