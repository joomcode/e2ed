import {e2edCreateSafeHtmlWithoutSanitize} from '../client';

import {renderRetry} from './renderRetry';

import type {RetryProps, SafeHtml} from '../../../types/internal';

/**
 * Render list of retries (with test runs).
 * @internal
 */
export const renderRetries = (retries: RetryProps[]): SafeHtml => {
  const retriesHtml = retries.map(renderRetry);

  return e2edCreateSafeHtmlWithoutSanitize`${retriesHtml.join('')}`;
};
