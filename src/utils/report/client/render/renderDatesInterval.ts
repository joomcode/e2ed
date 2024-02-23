/* eslint-disable @typescript-eslint/no-magic-numbers */

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

  const startDateTime = startDate.toISOString();
  const endDateTime = endDate.toISOString();

  const date = startDateTime.slice(0, 10);

  const startTime = startDateTime.slice(11, 19);
  const endTime = endDateTime.slice(11, 19);

  return sanitizeHtml`<time datetime="${startDateTime}">${date} ${startTime}</time> –
<time datetime="${endDateTime}">${endTime}</time> UTC`;
}
