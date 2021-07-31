type Options = Readonly<{
  currentConcurrency: number;
  testsCount: number;
  lastRetryHasError: boolean;
}>;

/**
 * Gets concurrency for next tests-run retry,
 * by current concurrency, tests count and hasError flag.
 * @internal
 */
export const getConcurrencyForNextRetry = ({
  currentConcurrency,
  testsCount,
  lastRetryHasError,
}: Options): number => {
  const newBaseConcurrency = lastRetryHasError
    ? Math.ceil(currentConcurrency / 2)
    : currentConcurrency;

  if (testsCount > 0) {
    return Math.min(newBaseConcurrency, testsCount);
  }

  return newBaseConcurrency;
};
