import {createSafeHtmlWithoutSanitize} from '../client';

import {locator} from './locator';
import {renderAttributes} from './renderAttributes';
import {renderRetryHeader} from './renderRetryHeader';
import {renderTestRunButton} from './renderTestRunButton';

import type {RetryProps, SafeHtml} from '../../../types/internal';

type Props = Readonly<{retry: RetryProps}>;

/**
 * Renders test runs list for one retry.
 * @internal
 */
export const renderRetry = ({retry}: Props): SafeHtml => {
  const buttons = retry.testRunButtons.map((props, index) =>
    renderTestRunButton({...props, index}),
  );

  return createSafeHtmlWithoutSanitize`
<article class="retry" id="retry${retry.retryIndex}" ${
    retry.hidden ? 'hidden' : ''
  } ${renderAttributes(locator('Retry', {index: retry.retryIndex}))}>
  ${renderRetryHeader({...retry})}
  ${buttons.join('')}
</article>`;
};
