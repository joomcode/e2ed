import {renderDatesInterval, renderDuration, sanitizeHtml} from '../client';

import type {RetryProps, SafeHtml} from '../../../types/internal';

/**
 * Render retry header.
 * @internal
 */
export const renderRetryHeader = ({endTimeInMs, retry, startTimeInMs}: RetryProps): SafeHtml => {
  const durationMs = endTimeInMs - startTimeInMs;

  return sanitizeHtml`
<h3 class="__title">Retry ${retry}</h3>
<p class="__date">
  ${renderDatesInterval({endTimeInMs, startTimeInMs})}
  (${renderDuration(durationMs)})
</p>`;
};
