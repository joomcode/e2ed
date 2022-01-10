import {createSafeHtmlWithoutSanitize} from '../client';

import {renderRetryHeader} from './renderRetryHeader';
import {renderTestRunButton} from './renderTestRunButton';

import type {RetryProps, SafeHtml} from '../../../types/internal';

/**
 * Render test runs list for one retry.
 * @internal
 */
export const renderRetry = (retryProps: RetryProps): SafeHtml => {
  const buttons = retryProps.testRunButtons.map(renderTestRunButton);

  return createSafeHtmlWithoutSanitize`
<article class="retry" id="retry${retryProps.retry}" ${retryProps.hidden ? 'hidden' : ''}>
  ${renderRetryHeader(retryProps)}
  ${buttons.join('')}
</article>`;
};
