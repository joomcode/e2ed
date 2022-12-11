import {assertValueIsDefined} from '../asserts';

import type {RawRunLabelObject, RunLabel, RunLabelObject} from '../../types/internal';

/**
 * Get RunLabelObject from RunLabel.
 * Not internal because runLabel is a part of TestRun type, used in userland hooks.
 */
export const getRunLabelObject = (runLabel: RunLabel): RunLabelObject => {
  const object = runLabel.match(
    /r:(?<retryIndex>\d+)\/(?<maxRetriesCount>\d+),c:(?<concurrency>\d+)/,
  )?.groups as RawRunLabelObject | undefined;

  assertValueIsDefined(object, 'runLabel is not match template', {runLabel});

  return {
    concurrency: Number(object.concurrency),
    maxRetriesCount: Number(object.maxRetriesCount),
    retryIndex: Number(object.retryIndex),
  };
};
