import {e2edCreateSafeHtmlWithoutSanitize} from '../client';

import type {RetryProps, SafeHtml} from '../../../types/internal';

/**
 * Render retry header.
 * @internal
 */
export const renderRetryHeader = ({endTimeInMs, retry, startTimeInMs}: RetryProps): SafeHtml => {
  const startDate = new Date(startTimeInMs);
  const endDate = new Date(endTimeInMs);

  const startDatetime = startDate.toISOString();
  const endDatetime = endDate.toISOString();

  const date = startDatetime.slice(0, 10);

  const startTime = startDatetime.slice(11, 19);
  const endTime = endDatetime.slice(11, 19);

  const durationMs = endTimeInMs - startTimeInMs;
  const durationInSeconds = Math.round(durationMs / 1000);
  const minutes = Math.floor(durationInSeconds / 60);
  const minutesString = minutes === 0 ? '' : `${minutes}m `;
  const secondsString = `${durationInSeconds % 60}s`;

  return e2edCreateSafeHtmlWithoutSanitize`
<h3 class="__title">Retry ${retry}</h3>
<p class="__date">
  <time datetime="${startDatetime}">${date} ${startTime}</time> –
  <time datetime="${endDatetime}">${endTime}</time>
  (${minutesString}${secondsString})
</p>`;
};
