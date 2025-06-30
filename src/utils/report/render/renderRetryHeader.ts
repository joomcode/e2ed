import {renderDatesInterval, renderDuration, sanitizeHtml} from '../client';

import {locatorAttributes} from './locator';

import type {RetryProps, SafeHtml} from '../../../types/internal';

type Props = RetryProps;

const testId = 'RetryHeader';

/**
 * Renders retry header.
 * @internal
 */
export const renderRetryHeader = ({endTimeInMs, retryIndex, startTimeInMs}: Props): SafeHtml => {
  const durationInMs = endTimeInMs - startTimeInMs;

  return sanitizeHtml`
<h3 class="__title" ${locatorAttributes(testId, 'title')}>Retry ${retryIndex}</h3>
<p class="__date" ${locatorAttributes(testId, 'date')}>
  ${renderDatesInterval({endTimeInMs, startTimeInMs})}
  (${renderDuration(durationInMs)})
</p>`;
};
