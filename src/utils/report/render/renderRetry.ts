import {createSafeHtmlWithoutSanitize} from '../client';

import {compareByStatuses} from './compareByStatuses';
import {locatorAttributes} from './locator';
import {renderTestRunButton} from './renderTestRunButton';
import {RetryHeader} from './RetryHeader';

import type {RetryProps, SafeHtml} from '../../../types/internal';

type Props = Readonly<{retry: RetryProps}>;

/**
 * Renders test runs list for one retry.
 * @internal
 */
export const renderRetry = ({retry}: Props): SafeHtml => {
  const sortedTestRunButtons = [...retry.testRunButtons].sort(compareByStatuses);

  const buttons = sortedTestRunButtons.map((props, index) =>
    renderTestRunButton({...props, index}),
  );

  return createSafeHtmlWithoutSanitize`
<article class="retry" id="retry${retry.retryIndex}" ${
    retry.hidden ? 'hidden' : ''
  } ${locatorAttributes('Retry', {index: retry.retryIndex})}>
  ${RetryHeader({...retry})}
  ${buttons.join('')}
</article>`;
};
