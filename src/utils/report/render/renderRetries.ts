import {createSafeHtmlWithoutSanitize} from '../client';

import {renderMetadata} from './renderMetadata';
import {renderRetry} from './renderRetry';

import type {RetryProps, SafeHtml} from '../../../types/internal';

type Props = Readonly<{retries: readonly RetryProps[]}>;

/**
 * Renders list of retries (with test runs).
 * @internal
 */
export const renderRetries = ({retries}: Props): SafeHtml => {
  const retriesHtml = retries.map((retry) => renderRetry({retry}));

  retriesHtml.push(renderMetadata({menuIndex: retries.length + 1}));

  return createSafeHtmlWithoutSanitize`${retriesHtml.join('')}`;
};
