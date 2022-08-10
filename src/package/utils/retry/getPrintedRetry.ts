import type {RetriesState} from '../../types/internal';

/**
 * Get printed message about one retry.
 * @internal
 */
export const getPrintedRetry = ({maxRetriesCount, retryIndex}: RetriesState): string =>
  `retry ${retryIndex}/${maxRetriesCount}`;
