import {TestRunStatus} from '../../constants/internal';

import {getNewFullTestRuns} from './getNewFullTestRuns';

import type {FullTestRun, RetriesState} from '../../types/internal';

type Return = Readonly<{
  failedNewFullTestRuns: readonly FullTestRun[];
  newFullTestRuns: readonly FullTestRun[];
  successfulNewFullTestRuns: readonly FullTestRun[];
  unbrokenNewFullTestRuns: readonly FullTestRun[];
}>;

/**
 * Get new full test runs for different statuses by retries state.
 * @internal
 */
export const getNewFullTestRunsByStatuses = async (retriesState: RetriesState): Promise<Return> => {
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

  return {
    failedNewFullTestRuns,
    newFullTestRuns,
    successfulNewFullTestRuns,
    unbrokenNewFullTestRuns,
  };
};
