import {renderListOfTestRuns} from './renderListOfTestRuns';

import type {TestRunsListProps} from '../../types/internal';

/**
 * Render test runs lists.
 * @internal
 */
export const renderTestRunsLists = (testRunsLists: TestRunsListProps[]): string => {
  const lists = testRunsLists.map(renderListOfTestRuns);

  return lists.join('');
};
