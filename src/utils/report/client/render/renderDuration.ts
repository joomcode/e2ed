import {getDurationWithUnits as clientGetDurationWithUnits} from '../../../getDurationWithUnits';

import {createSafeHtmlWithoutSanitize as clientCreateSafeHtmlWithoutSanitize} from '../sanitizeHtml';

import type {SafeHtml} from '../../../../types/internal';

const getDurationWithUnits = clientGetDurationWithUnits;
const createSafeHtmlWithoutSanitize = clientCreateSafeHtmlWithoutSanitize;

/**
 * Renders the duration of time interval in hours, minutes, seconds and milliseconds.
 * This base client function should not use scope variables (except other base functions).
 * @internal
 */
export function renderDuration(durationInMs: number): SafeHtml {
  const durationWithUnits = getDurationWithUnits(durationInMs);

  return createSafeHtmlWithoutSanitize`${durationWithUnits}`;
}
