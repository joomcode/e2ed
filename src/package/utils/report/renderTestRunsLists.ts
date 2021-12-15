import {TEST_RUN_STATUS_TO_MODIFIER_HASH} from '../../constants/internal';

import type {TestRunButtonProps, TestRunsListProps} from '../../types/internal';

/**
 * Render single test run button (in test runs list).
 */
const renderTestRunButton = (
  {durationInMs, status, mainParams, name}: TestRunButtonProps,
  index: number,
): string => {
  const statusModifier = TEST_RUN_STATUS_TO_MODIFIER_HASH[status];

  return `<button role="tab" aria-selected="false" class="test-button test-button_status_${statusModifier}">
  <span class="test-button__order">#${index + 1}</span>
  <span class="test-button__name">${name}</span>
  <span class="test-button__parameters">${mainParams}</span>
  <span class="test-button__time">${durationInMs}ms</span>
</button>`;
};

/**
 * Render test runs list for one retry.
 */
const renderTestRunsList = ({hidden, testRunButtons}: TestRunsListProps): string => {
  const buttons = testRunButtons.map(renderTestRunButton);

  return `<div role="tablist" ${hidden ? 'hidden' : ''}>${buttons.join('')}</div>`;
};

/**
 * Render test runs lists.
 * @internal
 */
export const renderTestRunsLists = (testRunsLists: TestRunsListProps[]): string => {
  const lists = testRunsLists.map(renderTestRunsList);

  return lists.join('');
};
