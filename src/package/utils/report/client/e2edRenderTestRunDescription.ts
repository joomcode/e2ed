import {e2edRenderDatesInterval as clientE2edRenderDatesInterval} from './e2edRenderDatesInterval';
import {e2edRenderDuration as clientE2edRenderDuration} from './e2edRenderDuration';
import {
  e2edCreateSafeHtmlWithoutSanitize as clientE2edCreateSafeHtmlWithoutSanitize,
  e2edSanitizeHtml as clientE2edSanitizeHtml,
} from './sanitizeHtml';

import type {SafeHtml, TestRunWithHooks} from '../../../types/internal';

const e2edCreateSafeHtmlWithoutSanitize = clientE2edCreateSafeHtmlWithoutSanitize;
const e2edRenderDatesInterval = clientE2edRenderDatesInterval;
const e2edRenderDuration = clientE2edRenderDuration;
const e2edSanitizeHtml = clientE2edSanitizeHtml;

/**
 * Render tag <dl class="test-description"> with test run description.
 * This global client function should not use scope variables (except other global functions).
 * @internal
 */
export function e2edRenderTestRunDescription(testRunWithHooks: TestRunWithHooks): SafeHtml {
  const {endTimeInMs, startTimeInMs} = testRunWithHooks;
  const durationMs = endTimeInMs - startTimeInMs;
  const {meta} = testRunWithHooks.options;
  const metaHtmls: SafeHtml[] = [];

  //  for (const [key, value] of Object.entries(y) as Array<[keyof T, T[keyof T]]>) {
  for (const [key, value] of Object.entries(meta)) {
    const metaHtml = e2edSanitizeHtml`
<dt class="test-description__term">${key}</dt>
<dd class="test-description__definition">${value}</dd>`;

    metaHtmls.push(metaHtml);
  }

  return e2edCreateSafeHtmlWithoutSanitize`
<dl class="test-description test-description_type_meta">
  ${metaHtmls.join('')}
  <dt class="test-description__term">Date</dt>
  <dd class="test-description__definition">
    ${e2edRenderDatesInterval({endTimeInMs, startTimeInMs})}
  </dd>
  <dt class="test-description__term">Duration</dt>
  <dd class="test-description__definition">
    ${e2edRenderDuration(durationMs)}
  </dd>
</dl>`;
}
