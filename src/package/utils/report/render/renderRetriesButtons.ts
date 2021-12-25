import {e2edCreateSafeHtmlWithoutSanitize} from '../client';

import {renderRetryButton} from './renderRetryButton';

import type {SafeHtml, TestRunsListProps} from '../../../types/internal';

/**
 * Render retries navigation buttons.
 * @internal
 */
export const renderRetriesButtons = (testRunsLists: TestRunsListProps[]): SafeHtml => {
  const retries = testRunsLists.map(({retry}) => retry);
  const maxRetry = Math.max(...retries);
  const minRetry = Math.min(...retries);
  const buttons: SafeHtml[] = [];

  for (let index = 1; index <= maxRetry; index += 1) {
    const isRetry = retries.includes(index);

    buttons[index] = renderRetryButton({
      disabled: !isRetry,
      retry: index,
      selected: index === minRetry,
    });
  }

  return e2edCreateSafeHtmlWithoutSanitize`
<div role="tablist" aria-label="Retries" class="nav-tabs">${buttons.join('')}</div>`;
};
