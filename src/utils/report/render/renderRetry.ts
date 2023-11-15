import {createLocator, type Locator, type Mark} from 'create-locator';

import {createSafeHtmlWithoutSanitize} from '../client';

import {renderAttributes} from './renderAttributes';
import {renderRetryHeader, type RetryHeaderLocator} from './renderRetryHeader';
import {renderTestRunButton, type TestRunButtonLocator} from './renderTestRunButton';

import type {RetryProps, SafeHtml} from '../../../types/internal';

type Props = Readonly<{retry: RetryProps}> & Mark<RetryLocator>;

export type RetryLocator = Locator<
  {button: TestRunButtonLocator; header: RetryHeaderLocator},
  {index: string}
>;

/**
 * Renders test runs list for one retry.
 * @internal
 */
export const renderRetry = ({retry, ...rest}: Props): SafeHtml => {
  const locator = createLocator(rest);
  const buttons = retry.testRunButtons.map((props, index) =>
    renderTestRunButton({...props, index, ...locator.button()}),
  );

  return createSafeHtmlWithoutSanitize`
<article class="retry" id="retry${retry.retryIndex}" ${
    retry.hidden ? 'hidden' : ''
  } {${renderAttributes(locator({index: String(retry.retryIndex)}))}}>
  ${renderRetryHeader({...retry, ...locator.header()})}
  ${buttons.join('')}
</article>`;
};
