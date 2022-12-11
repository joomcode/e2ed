import {createSafeHtmlWithoutSanitize} from '../client';

import {renderRetry} from './renderRetry';

import type {RetryProps, SafeHtml} from '../../../types/internal';

/**
 * Render list of retries (with test runs).
 * @internal
 */
export const renderRetries = (retries: readonly RetryProps[]): SafeHtml => {
  const retriesHtml = retries.map(renderRetry);

  return createSafeHtmlWithoutSanitize`${retriesHtml.join('')}`;
};
