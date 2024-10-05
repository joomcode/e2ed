import {createSafeHtmlWithoutSanitize} from '../client';

import {locator} from './locator';
import {renderRetryButton} from './renderRetryButton';

import type {RetryProps, SafeHtml} from '../../../types/internal';

type Props = Readonly<{retries: readonly RetryProps[]}>;

/**
 * Renders retries navigation buttons.
 * @internal
 */
export const renderRetriesButtons = ({retries}: Props): SafeHtml => {
  const retryNumbers = retries.map(({retryIndex}) => retryIndex);
  const maxRetry = Math.max(...retryNumbers);
  const buttons: SafeHtml[] = [];

  for (let index = 1; index <= maxRetry; index += 1) {
    const isRetry = retryNumbers.includes(index);

    buttons[index] = renderRetryButton({
      disabled: !isRetry,
      retry: index,
      selected: index === maxRetry,
    });
  }

  return createSafeHtmlWithoutSanitize`
<div role="tablist" aria-label="Retries" class="nav-tabs" ${locator('RetriesButtons')}>${buttons.join('')}</div>`;
};
