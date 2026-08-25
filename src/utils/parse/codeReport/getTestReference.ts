import type {TestReport} from '../../../types/internal';

/**
 * Get reference to test for errors.
 * @internal
 */
export const getTestReference = (test: TestReport): string =>
  `test "${test.name}" in ${test.path}:${test.testLineNumber}:1`;
