/**
 * Get printed message about one retry.
 * @internal
 */
export const getPrintedRetry = (maxRetriesCount: number): string => {
  const wordRetry = maxRetriesCount > 1 ? 'retries' : 'retry';

  return `${maxRetriesCount} ${wordRetry}`;
};
