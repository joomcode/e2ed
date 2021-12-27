import {e2edRenderDatesInterval, e2edRenderDuration, e2edSanitizeHtml} from '../client';

import type {RetryProps, SafeHtml} from '../../../types/internal';

/**
 * Render retry header.
 * @internal
 */
export const renderRetryHeader = ({endTimeInMs, retry, startTimeInMs}: RetryProps): SafeHtml => {
  const durationMs = endTimeInMs - startTimeInMs;

  return e2edSanitizeHtml`
<h3 class="__title">Retry ${retry}</h3>
<p class="__date">
  ${e2edRenderDatesInterval({endTimeInMs, startTimeInMs})}
  (${e2edRenderDuration(durationMs)})
</p>`;
};
