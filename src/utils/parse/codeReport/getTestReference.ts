import type {TestReport} from '../../../types/internal';

/**
 * Get reference to test for errors.
 */
export const getTestReference = (test: TestReport, testIdentifierKey: string): string => {
  const maybeTestIdentifier =
    test.testIdentifier === undefined ? '' : ` (${testIdentifierKey}=${test.testIdentifier})`;

  return `test "${test.name}"${maybeTestIdentifier} in ${test.path}:${test.testLineNumber}:1`;
};
