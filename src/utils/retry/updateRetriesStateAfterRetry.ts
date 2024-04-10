import {TestRunStatus} from '../../constants/internal';

import {assertValueIsFalse, assertValueIsTrue} from '../asserts';
import {cloneWithoutLogEvents} from '../clone';
import {getTestRunEventFileName} from '../fs';
import {setReadonlyProperty} from '../setReadonlyProperty';

import {getConcurrencyForNextRetry} from './getConcurrencyForNextRetry';
import {getNewFullTestRuns} from './getNewFullTestRuns';
import {getPrintedRetry} from './getPrintedRetry';
import {logRetryResult} from './logRetryResult';
import {truncateRetriesStateForLogs} from './truncateRetriesStateForLogs';

import type {Mutable, RetriesState} from '../../types/internal';

/**
 * Update retries states after running retry.
 * @internal
 */
export const updateRetriesStateAfterRetry = async (retriesState: RetriesState): Promise<void> => {
  const {
    concurrency,
    maxRetriesCount,
    retryIndex,
    successfulTestRunNamesHash,
    visitedTestRunEventsFileName,
  } = retriesState;
  const newFullTestRuns = await getNewFullTestRuns(retriesState);

  const unbrokenNewFullTestRuns = newFullTestRuns.filter(
    ({status}) => status !== TestRunStatus.Broken,
  );
  const failedNewFullTestRuns = unbrokenNewFullTestRuns.filter(
    ({status}) => status === TestRunStatus.Failed,
  );
  const successfulNewFullTestRuns = unbrokenNewFullTestRuns.filter(
    ({status}) => status !== TestRunStatus.Failed,
  );

  const printedRetry = getPrintedRetry({maxRetriesCount, retryIndex});
  const successfulTotalInPreviousRetries = Object.keys(successfulTestRunNamesHash).length;

  for (const successfulNewFullTestRun of successfulNewFullTestRuns) {
    const {name} = successfulNewFullTestRun;

    assertValueIsFalse(
      name in successfulTestRunNamesHash,
      `a successful test "${name}" from the last ${printedRetry} has a unique name`,
      {retriesState, successfulNewFullTestRun: cloneWithoutLogEvents(successfulNewFullTestRun)},
    );

    successfulTestRunNamesHash[name] = true;
  }

  for (const {runId} of newFullTestRuns) {
    (visitedTestRunEventsFileName as string[]).push(getTestRunEventFileName(runId));
  }

  if (failedNewFullTestRuns.length > 0) {
    setReadonlyProperty(retriesState, 'isLastRetrySuccessful', false);
  }

  if (retriesState.isLastRetrySuccessful) {
    assertValueIsTrue(
      successfulNewFullTestRuns.length > 0,
      'a successful retry has successful tests',
      {retriesState: truncateRetriesStateForLogs(retriesState), successfulNewFullTestRuns},
    );
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

  if (newFullTestRuns.length === 0 && concurrencyForNextRetry !== concurrency) {
    retriesStateUpdate.retryIndex = retriesState.retryIndex - 1;
  }

  Object.assign<RetriesState, Partial<RetriesState>>(retriesState, retriesStateUpdate);
};
