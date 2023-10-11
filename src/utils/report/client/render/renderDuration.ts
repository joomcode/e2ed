import {createSafeHtmlWithoutSanitize as clientCreateSafeHtmlWithoutSanitize} from '../sanitizeHtml';

import type {SafeHtml} from '../../../../types/internal';

const createSafeHtmlWithoutSanitize = clientCreateSafeHtmlWithoutSanitize;

/**
 * Renders the duration of time interval in hours, minutes, seconds and milliseconds.
 * This base client function should not use scope variables (except other base functions).
 * @internal
 */
export function renderDuration(durationInMs: number): SafeHtml {
  const remainderInMs = durationInMs % 1000;
  const durationInSeconds = Math.round((durationInMs - remainderInMs) / 1000);
  const remainderInSeconds = durationInSeconds % 60;
  const durationInMinutes = Math.round((durationInSeconds - remainderInSeconds) / 60);
  const remainderInMinutes = durationInMinutes % 60;
  const durationInHours = Math.round((durationInMinutes - remainderInMinutes) / 60);

  const parts: string[] = [`${remainderInMs}ms`];

  if (remainderInSeconds > 0) {
    parts.unshift(`${remainderInSeconds}s`);
  }

  if (remainderInMinutes > 0) {
    parts.unshift(`${remainderInMinutes}m`);
  }

  if (durationInHours > 0) {
    parts.unshift(`${durationInHours}h`);
  }

  return createSafeHtmlWithoutSanitize`${parts.slice(-2).join(' ')}`;
}
