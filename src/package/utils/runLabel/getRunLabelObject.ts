import {assertValueIsDefined} from '../asserts';

import type {RunLabel, RunLabelObject} from '../../types/internal';

/**
 * Get RunLabelObject from RunLabel.
 */
export const getRunLabelObject = (runLabel: RunLabel): RunLabelObject => {
  const object = runLabel.match(
    /r:(?<retryIndex>\d+)\/(?<maxRetriesCount>\d+),c:(?<concurrency>\d+)/,
  )?.groups;

  assertValueIsDefined(object, 'runLabel is not match template', {runLabel});

  return {
    concurrency: Number(object.concurrency),
    maxRetriesCount: Number(object.maxRetriesCount),
    retryIndex: Number(object.retryIndex),
  };
};
