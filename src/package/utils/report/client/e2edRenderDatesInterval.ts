import {e2edSanitizeHtml as clientE2edSanitizeHtml} from './sanitizeHtml';

import type {SafeHtml, UtcTimeInMs} from '../../../types/internal';

type Options = Readonly<{
  endTimeInMs: UtcTimeInMs;
  startTimeInMs: UtcTimeInMs;
}>;

const e2edSanitizeHtml = clientE2edSanitizeHtml;

/**
 * Render the interval between two dates.
 * This global client function should not use scope variables (except other global functions).
 * @internal
 */
export function e2edRenderDatesInterval({endTimeInMs, startTimeInMs}: Options): SafeHtml {
  const startDate = new Date(startTimeInMs);
  const endDate = new Date(endTimeInMs);

  const startDatetime = startDate.toISOString();
  const endDatetime = endDate.toISOString();

  const date = startDatetime.slice(0, 10);

  const startTime = startDatetime.slice(11, 19);
  const endTime = endDatetime.slice(11, 19);

  return e2edSanitizeHtml`<time datetime="${startDatetime}">${date} ${startTime}</time> –
<time datetime="${endDatetime}">${endTime}</time>`;
}
