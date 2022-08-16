type Options = Readonly<{
  maxRetriesCount: number;
  retryIndex: number;
}>;

/**
 * Get printed message about one retry.
 * @internal
 */
export const getPrintedRetry = ({maxRetriesCount, retryIndex}: Options): string =>
  `retry ${retryIndex}/${maxRetriesCount}`;
