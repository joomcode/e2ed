type Options = Readonly<{
  currentConcurrency: number;
  lastRetryHasError: boolean;
  testsCount: number;
  testsHaveNotChangedSinceLastTime: boolean;
}>;

/**
 * Gets concurrency for next tests-run retry,
 * by current concurrency, tests count, hasError flag and
 * testsHaveNotchangedsincelasttime flag.
 * @internal
 */
export const getConcurrencyForNextRetry = ({
  currentConcurrency,
  lastRetryHasError,
  testsCount,
  testsHaveNotChangedSinceLastTime,
}: Options): number => {
  const newBaseConcurrency =
    lastRetryHasError || testsHaveNotChangedSinceLastTime
      ? Math.ceil(currentConcurrency / 2)
      : currentConcurrency;

  if (testsCount > 0) {
    return Math.min(newBaseConcurrency, testsCount);
  }

  return newBaseConcurrency;
};
