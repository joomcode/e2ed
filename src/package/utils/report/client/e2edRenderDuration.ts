import {e2edSanitizeHtml as clientE2edSanitizeHtml} from './sanitizeHtml';

import type {SafeHtml} from '../../../types/internal';

const e2edSanitizeHtml = clientE2edSanitizeHtml;

/**
 * Render the duration of time interval in minutes and seconds.
 * This global client function should not use scope variables (except other global functions).
 * @internal
 */
export function e2edRenderDuration(durationMs: number): SafeHtml {
  const durationInSeconds = Math.round(durationMs / 1000);
  const minutes = Math.floor(durationInSeconds / 60);
  const minutesString = minutes === 0 ? '' : `${minutes}m `;
  const secondsString = `${durationInSeconds % 60}s`;

  return e2edSanitizeHtml`${minutesString}${secondsString}`;
}
