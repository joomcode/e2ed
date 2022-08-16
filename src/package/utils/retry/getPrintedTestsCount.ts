/**
 * Get printed message about some tests count.
 * @internal
 */
export const getPrintedTestsCount = (testsCount: number, failed = false): string => {
  const failedString = failed ? 'failed ' : '';

  if (testsCount === 0) {
    return `0 ${failedString}tests (no tests)`;
  }

  const wordTest = testsCount === 1 ? 'test' : 'tests';

  return `${testsCount} ${failedString}${wordTest}`;
};
