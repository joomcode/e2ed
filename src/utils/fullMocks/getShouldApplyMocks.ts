import {getVisitedTestNamesHash} from '../globalState';

/**
 * Returns `true`, if we should apply full mocks for test (by test name).
 * @internal
 */
export const getShouldApplyMocks = (testName: string): boolean => {
  const visitedTestNamesHash = getVisitedTestNamesHash();

  return !visitedTestNamesHash?.[testName];
};
