import {e2edCreateSafeHtmlWithoutSanitize} from '../client';

import {renderTestRunButton} from './renderTestRunButton';

import type {SafeHtml, TestRunsListProps} from '../../../types/internal';

/**
 * Render test runs list for one retry.
 * @internal
 */
export const renderListOfTestRuns = ({
  hidden,
  retry,
  testRunButtons,
}: TestRunsListProps): SafeHtml => {
  const buttons = testRunButtons.map(renderTestRunButton);

  return e2edCreateSafeHtmlWithoutSanitize`
<div role="tablist" id="retry${retry}-nav-tablist" ${hidden ? 'hidden' : ''}>${buttons.join(
    '',
  )}</div>`;
};
