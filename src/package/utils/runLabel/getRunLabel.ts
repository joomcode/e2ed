import type {RunLabel, RunLabelObject} from '../../types/internal';

/**
 * Get RunLabel from RunLabelObject.
 */
export const getRunLabel = ({concurrency, maxRetriesCount, retryIndex}: RunLabelObject): RunLabel =>
  `r:${retryIndex}/${maxRetriesCount},c:${concurrency}` as RunLabel;
