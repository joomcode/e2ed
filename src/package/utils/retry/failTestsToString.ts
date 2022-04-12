import type {FailTest} from '../../types/internal';

/**
 * Get string representation of fail tests (for logging).
 * @internal
 */
export const failTestsToString = (tests: readonly FailTest[]): string => {
  const mappedTests = tests.map(({testName: name, fixturePath: path}) => ({name, path}));

  return JSON.stringify(mappedTests, null, 2);
};
