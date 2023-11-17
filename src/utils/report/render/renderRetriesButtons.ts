import {createLocator, type Locator, type Mark} from 'create-locator';

import {createSafeHtmlWithoutSanitize} from '../client';

import {renderAttributes} from './renderAttributes';
import {renderRetryButton, type RetryButtonLocator} from './renderRetryButton';

import type {RetryProps, SafeHtml} from '../../../types/internal';

type Props = Readonly<{retries: readonly RetryProps[]}> & Mark<RetriesButtonsLocator>;

export type RetriesButtonsLocator = Locator<{
  button: RetryButtonLocator;
}>;

/**
 * Renders retries navigation buttons.
 * @internal
 */
export const renderRetriesButtons = ({retries, ...rest}: Props): SafeHtml => {
  const locator = createLocator(rest);
  const retryNumbers = retries.map(({retryIndex}) => retryIndex);
  const maxRetry = Math.max(...retryNumbers);
  const buttons: SafeHtml[] = [];

  for (let index = 1; index <= maxRetry; index += 1) {
    const isRetry = retryNumbers.includes(index);

    buttons[index] = renderRetryButton({
      disabled: !isRetry,
      retry: index,
      selected: index === maxRetry,
      ...locator.button(),
    });
  }

  return createSafeHtmlWithoutSanitize`
<div role="tablist" aria-label="Retries" class="nav-tabs" ${renderAttributes(
    locator(),
  )}>${buttons.join('')}</div>`;
};
