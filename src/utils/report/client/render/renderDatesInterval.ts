import {sanitizeHtml as clientSanitizeHtml} from '../sanitizeHtml';

import type {SafeHtml, UtcTimeInMs} from '../../../../types/internal';

type Options = Readonly<{
  endTimeInMs: UtcTimeInMs;
  startTimeInMs: UtcTimeInMs;
}>;

const sanitizeHtml = clientSanitizeHtml;

/**
 * Renders the interval between two dates.
 * This base client function should not use scope variables (except other base functions).
 * @internal
 */
export function renderDatesInterval({endTimeInMs, startTimeInMs}: Options): SafeHtml {
  const startDate = new Date(startTimeInMs);
  const endDate = new Date(endTimeInMs);

  const startDatetime = startDate.toISOString();
  const endDatetime = endDate.toISOString();

  const date = startDatetime.slice(0, 10);

  const startTime = startDatetime.slice(11, 19);
  const endTime = endDatetime.slice(11, 19);

  return sanitizeHtml`<time datetime="${startDatetime}">${date} ${startTime}</time> –
<time datetime="${endDatetime}">${endTime}</time> UTC`;
}
