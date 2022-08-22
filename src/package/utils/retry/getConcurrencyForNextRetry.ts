type Options = Readonly<{
  currentConcurrency: number;
  noTestsInLastRetry: boolean;
  testsCount: number;
}>;

/**
 * Gets concurrency for next tests-run retry by current concurrency,
 * noTestsInLastRetry flag and tests count.
 * @internal
 */
export const getConcurrencyForNextRetry = ({
  currentConcurrency,
  noTestsInLastRetry,
  testsCount,
}: Options): number => {
  const newBaseConcurrency = noTestsInLastRetry
    ? Math.ceil(currentConcurrency / 2)
    : currentConcurrency;

  if (testsCount > 0) {
    return Math.min(newBaseConcurrency, testsCount);
  }

  return newBaseConcurrency;
};
