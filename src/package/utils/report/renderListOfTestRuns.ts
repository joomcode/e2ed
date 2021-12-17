import {renderTestRunButton} from './renderTestRunButton';

import type {TestRunsListProps} from '../../types/internal';

/**
 * Render test runs list for one retry.
 * @internal
 */
export const renderListOfTestRuns = ({
  hidden,
  retry,
  testRunButtons,
}: TestRunsListProps): string => {
  const buttons = testRunButtons.map(renderTestRunButton);

  return `<div role="tablist" id="retry${retry}-nav-tablist" ${
    hidden ? 'hidden' : ''
  }>${buttons.join('')}</div>`;
};
