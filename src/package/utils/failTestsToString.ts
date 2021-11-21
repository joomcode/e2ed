import type {FailTest} from '../types/internal';

/**
 * Get string representation of fail tests (for logging).
 */
export const failTestsToString = (tests: FailTest[]): string => {
  const mappedTests = tests.map(({testName: name, fixturePath: path}) => ({name, path}));

  return JSON.stringify(mappedTests, null, 2);
};
