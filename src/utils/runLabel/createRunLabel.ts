import type {RunLabel, RunLabelObject} from '../../types/internal';

/**
 * Creates `RunLabel` from `RunLabelObject` (for example, `'r:1/3,c:20'`).
 * @internal
 */
export const createRunLabel = ({
  concurrency,
  disconnectedBrowsersCount,
  maxRetriesCount,
  retryIndex,
}: RunLabelObject): RunLabel => {
  const disconnectedBrowsersPart =
    disconnectedBrowsersCount > 0 ? `-${disconnectedBrowsersCount}` : '';

  return `r:${retryIndex}/${maxRetriesCount},c:${concurrency}${disconnectedBrowsersPart}` as RunLabel;
};
