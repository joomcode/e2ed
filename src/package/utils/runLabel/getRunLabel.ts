import type {RunLabel, RunLabelObject} from '../../types/internal';

/**
 * Get RunLabel from RunLabelObject.
 */
export const getRunLabel = ({concurrency, maxRetry, retry}: RunLabelObject): RunLabel =>
  `r:${retry}/${maxRetry},c:${concurrency}` as RunLabel;
