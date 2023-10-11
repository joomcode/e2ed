import {renderDatesInterval, renderDuration, sanitizeHtml} from '../client';

import type {RetryProps, SafeHtml} from '../../../types/internal';

/**
 * Renders retry header.
 * @internal
 */
export const renderRetryHeader = ({
  endTimeInMs,
  retryIndex,
  startTimeInMs,
}: RetryProps): SafeHtml => {
  const durationInMs = endTimeInMs - startTimeInMs;

  return sanitizeHtml`
<h3 class="__title">Retry ${retryIndex}</h3>
<p class="__date">
  ${renderDatesInterval({endTimeInMs, startTimeInMs})}
  (${renderDuration(durationInMs)})
</p>`;
};
