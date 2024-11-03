import {assertValueIsTrue} from '../asserts';

import type {RunId} from '../../types/internal';

type Return = Readonly<{previousRunId: RunId | undefined; retryIndex: number}>;

/**
 * Get previous `runId` if any, by current `runId`.
 * @internal
 */
export const getPreviousRunId = (runId: RunId): Return => {
  const indexOfRetryIndex = runId.lastIndexOf('-');

  assertValueIsTrue(
    indexOfRetryIndex > 0 && indexOfRetryIndex < runId.length - 1,
    'runId has dash',
    {runId},
  );

  const retryIndex = Number(runId.slice(indexOfRetryIndex + 1));

  assertValueIsTrue(
    Number.isInteger(retryIndex) && retryIndex > 0,
    'retryIndex from runId is correct',
    {runId},
  );

  const previousRetryIndex = retryIndex - 1;

  if (previousRetryIndex < 1) {
    return {previousRunId: undefined, retryIndex};
  }

  const previousRunId = `${runId.slice(0, indexOfRetryIndex)}-${previousRetryIndex}` as RunId;

  return {previousRunId, retryIndex};
};
