import {e2edCreateSafeHtmlWithoutSanitize} from '../client';

import {renderRetryButton} from './renderRetryButton';

import type {RetryProps, SafeHtml} from '../../../types/internal';

/**
 * Render retries navigation buttons.
 * @internal
 */
export const renderRetriesButtons = (retries: RetryProps[]): SafeHtml => {
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

  return e2edCreateSafeHtmlWithoutSanitize`
<div role="tablist" aria-label="Retries" class="nav-tabs">${buttons.join('')}</div>`;
};
