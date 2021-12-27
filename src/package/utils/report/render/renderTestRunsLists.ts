import {e2edCreateSafeHtmlWithoutSanitize} from '../client';

import {renderRetry} from './renderRetry';

import type {RetryProps, SafeHtml} from '../../../types/internal';

/**
 * Render test runs lists.
 * @internal
 */
export const renderTestRunsLists = (retries: RetryProps[]): SafeHtml => {
  const retriesHtml = retries.map(renderRetry);

  return e2edCreateSafeHtmlWithoutSanitize`${retriesHtml.join('')}`;
};
