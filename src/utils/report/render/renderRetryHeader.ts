import {createLocator, type Locator, type Mark} from 'create-locator';

import {renderDatesInterval, renderDuration, sanitizeHtml} from '../client';

import {renderAttributes} from './renderAttributes';

import type {RetryProps, SafeHtml, Void} from '../../../types/internal';

type Props = RetryProps & Mark<RetryHeaderLocator>;

export type RetryHeaderLocator = Locator<{date: Void; title: Void}>;

/**
 * Renders retry header.
 * @internal
 */
export const renderRetryHeader = ({
  endTimeInMs,
  retryIndex,
  startTimeInMs,
  ...rest
}: Props): SafeHtml => {
  const locator = createLocator(rest);
  const durationInMs = endTimeInMs - startTimeInMs;

  return sanitizeHtml`
<h3 class="__title" ${renderAttributes(locator.title())}>Retry ${retryIndex}</h3>
<p class="__date" ${renderAttributes(locator.date())}>
  ${renderDatesInterval({endTimeInMs, startTimeInMs})}
  (${renderDuration(durationInMs)})
</p>`;
};
