import {sanitizeHtml as clientSanitizeHtml} from '../sanitizeHtml';

import type {SafeHtml} from '../../../../types/internal';

const sanitizeHtml = clientSanitizeHtml;

/**
 * Render the duration of time interval in minutes and seconds.
 * This base client function should not use scope variables (except other base functions).
 * @internal
 */
export function renderDuration(durationMs: number): SafeHtml {
  const durationInSeconds = Math.round(durationMs / 1000);
  const minutes = Math.floor(durationInSeconds / 60);
  const minutesString = minutes === 0 ? '' : `${minutes}m `;
  const secondsString = `${durationInSeconds % 60}s`;

  return sanitizeHtml`${minutesString}${secondsString}`;
}
