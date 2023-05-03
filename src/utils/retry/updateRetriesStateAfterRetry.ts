import {TestRunStatus} from '../../constants/internal';

import {assertValueIsFalse, assertValueIsTrue} from '../asserts';
import {cloneWithoutLogEvents} from '../clone';
import {getTestRunEventFileName, readEventsFromFiles} from '../fs';
import {failMessage, generalLog, okMessage} from '../generalLog';

import {getConcurrencyForNextRetry} from './getConcurrencyForNextRetry';
import {getPrintedRetry} from './getPrintedRetry';
import {getPrintedTestsCount} from './getPrintedTestsCount';
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
    startLastRetryTimeInMs,
    successfulTestRunNamesHash,
    visitedTestRunEventsFileName,
  } = retriesState;
  const printedRetry = getPrintedRetry({maxRetriesCount, retryIndex});

  const newFullTestRuns = await readEventsFromFiles(visitedTestRunEventsFileName);

  for (const newFullTestRun of newFullTestRuns) {
    assertValueIsFalse(
      newFullTestRun.name in successfulTestRunNamesHash,
      `the test "${newFullTestRun.name}" from the last ${printedRetry} is not among the successful tests already passed in the previous retries`,
      {
        newFullTestRun: cloneWithoutLogEvents(newFullTestRun),
        retriesState: truncateRetriesStateForLogs(retriesState),
      },
    );
  }

  const unbrokenNewFullTestRuns = newFullTestRuns.filter(
    ({status}) => status !== TestRunStatus.Broken,
  );
  const failedNewFullTestRuns = unbrokenNewFullTestRuns.filter(
    ({status}) => status === TestRunStatus.Failed,
  );
  const successfulNewFullTestRuns = unbrokenNewFullTestRuns.filter(
    ({status}) => status !== TestRunStatus.Failed,
  );

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

  const stateMessage = retriesState.isLastRetrySuccessful ? okMessage : failMessage;

  generalLog(
    `Results of ${printedRetry}: ${stateMessage} ${getPrintedTestsCount(
      newFullTestRuns.length,
    )} with concurrency ${concurrency} ran in ${Date.now() - startLastRetryTimeInMs}ms (${
      failedNewFullTestRuns.length
    } failed, ${successfulNewFullTestRuns.length} successful, ${
      newFullTestRuns.length - unbrokenNewFullTestRuns.length
    } broken)`,
  );

  if (retriesState.isLastRetrySuccessful) {
    assertValueIsTrue(
      failedNewFullTestRuns.length === 0,
      'a successful retry has no failed tests',
      {failedNewFullTestRuns, retriesState: truncateRetriesStateForLogs(retriesState)},
    );

    assertValueIsTrue(
      successfulNewFullTestRuns.length > 0,
      'a successful retry has successful tests',
      {retriesState: truncateRetriesStateForLogs(retriesState), successfulNewFullTestRuns},
    );
  }

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
