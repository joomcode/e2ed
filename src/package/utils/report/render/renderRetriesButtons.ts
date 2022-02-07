import {createSafeHtmlWithoutSanitize} from '../client';

import {renderRetryButton} from './renderRetryButton';

import type {RetryProps, SafeHtml} from '../../../types/internal';

/**
 * Render retries navigation buttons.
 * @internal
 */
export const renderRetriesButtons = (retries: readonly RetryProps[]): SafeHtml => {
  const retryNumbers = retries.map(({retry}) => retry);
  const maxRetry = Math.max(...retryNumbers);
  const minRetry = Math.min(...retryNumbers);
  const buttons: SafeHtml[] = [];

  for (let index = 1; index <= maxRetry; index += 1) {
    const isRetry = retryNumbers.includes(index);

    buttons[index] = renderRetryButton({
      disabled: !isRetry,
      retry: index,
      selected: index === minRetry,
    });
  }

  return createSafeHtmlWithoutSanitize`
<div role="tablist" aria-label="Retries" class="nav-tabs">${buttons.join('')}</div>`;
};
