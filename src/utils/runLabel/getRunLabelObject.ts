import {assertValueIsDefined} from '../asserts';

import type {RawRunLabelObject, RunLabel, RunLabelObject} from '../../types/internal';

/**
 * Get `RunLabelObject` from `RunLabel`.
 * Not internal because `runLabel` is a part of `TestRun` type, used in userland hooks.
 */
export const getRunLabelObject = (runLabel: RunLabel): RunLabelObject => {
  const rawRunLabelObject = runLabel.match(
    /r:(?<retryIndex>\d+)\/(?<maxRetriesCount>\d+),c:(?<concurrency>\d+)/,
  )?.groups as RawRunLabelObject | undefined;

  assertValueIsDefined(rawRunLabelObject, 'rawRunLabelObject is defined', {runLabel});

  return {
    concurrency: Number(rawRunLabelObject.concurrency),
    maxRetriesCount: Number(rawRunLabelObject.maxRetriesCount),
    retryIndex: Number(rawRunLabelObject.retryIndex),
  };
};
