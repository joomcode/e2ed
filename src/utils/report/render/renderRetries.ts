import {createLocator, type Locator, type Mark} from 'create-locator';

import {createSafeHtmlWithoutSanitize} from '../client';

import {renderRetry, type RetryLocator} from './renderRetry';

import type {RetryProps, SafeHtml} from '../../../types/internal';

type Props = Readonly<{retries: readonly RetryProps[]}> & Mark<RetriesLocator>;

export type RetriesLocator = Locator<{retry: RetryLocator}>;

/**
 * Renders list of retries (with test runs).
 * @internal
 */
export const renderRetries = ({retries, ...rest}: Props): SafeHtml => {
  const locator = createLocator(rest);
  const retriesHtml = retries.map((retry) => renderRetry({retry, ...locator.retry()}));

  return createSafeHtmlWithoutSanitize`${retriesHtml.join('')}`;
};
