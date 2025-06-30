import {createSafeHtmlWithoutSanitize} from '../client';

import {locatorAttributes} from './locator';
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

  for (let index = 1; index <= maxRetry + 1; index += 1) {
    const isRetry = retryNumbers.includes(index);
    const isMeta = index === maxRetry + 1;

    buttons[index] = renderRetryButton({
      disabled: isMeta ? false : !isRetry,
      name: isMeta ? 'Meta' : `Retry ${index}`,
      retry: index,
      selected: index === maxRetry,
    });
  }

  return createSafeHtmlWithoutSanitize`
<div role="tablist" aria-label="Retries" class="nav-tabs" ${locatorAttributes('RetriesButtons')}>${buttons.join('')}</div>`;
};
