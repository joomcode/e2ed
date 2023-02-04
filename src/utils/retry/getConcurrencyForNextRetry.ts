type Options = Readonly<{
  currentConcurrency: number;
  noSuccessfulTestsInLastRetry: boolean;
  testsCount: number;
}>;

/**
 * Gets concurrency for next tests-run retry by current concurrency,
 * noSuccessfulTestsInLastRetry flag and tests count.
 * @internal
 */
export const getConcurrencyForNextRetry = ({
  currentConcurrency,
  noSuccessfulTestsInLastRetry,
  testsCount,
}: Options): number => {
  const newBaseConcurrency = noSuccessfulTestsInLastRetry
    ? Math.ceil(currentConcurrency / 2)
    : currentConcurrency;

  if (testsCount > 0) {
    return Math.min(newBaseConcurrency, testsCount);
  }

  return newBaseConcurrency;
};
