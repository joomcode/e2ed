import {assertValueIsDefined} from '../asserts';

import type {RunLabel, RunLabelObject} from '../../types/internal';

/**
 * Get RunLabelObject from RunLabel.
 */
export const getRunLabelObject = (runLabel: RunLabel): RunLabelObject => {
  const object = runLabel.match(/r:(?<retry>\d+)\/(?<maxRetry>\d+),c:(?<concurrency>\d+)/)?.groups;

  assertValueIsDefined(object);

  return {
    concurrency: Number(object.concurrency),
    maxRetry: Number(object.maxRetry),
    retry: Number(object.retry),
  };
};
