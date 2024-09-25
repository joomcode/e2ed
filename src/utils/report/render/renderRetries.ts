import {createSafeHtmlWithoutSanitize} from '../client';

import {renderRetry} from './renderRetry';

import type {RetryProps, SafeHtml} from '../../../types/internal';

type Props = Readonly<{retries: readonly RetryProps[]}>;

/**
 * Renders list of retries (with test runs).
 * @internal
 */
export const renderRetries = ({retries}: Props): SafeHtml => {
  const retriesHtml = retries.map((retry) => renderRetry({retry}));

  return createSafeHtmlWithoutSanitize`${retriesHtml.join('')}`;
};
