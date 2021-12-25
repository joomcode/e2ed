import {e2edCreateSafeHtmlWithoutSanitize} from '../client';

import {renderListOfTestRuns} from './renderListOfTestRuns';

import type {SafeHtml, TestRunsListProps} from '../../../types/internal';

/**
 * Render test runs lists.
 * @internal
 */
export const renderTestRunsLists = (testRunsLists: TestRunsListProps[]): SafeHtml => {
  const lists = testRunsLists.map(renderListOfTestRuns);

  return e2edCreateSafeHtmlWithoutSanitize`${lists.join('')}`;
};
