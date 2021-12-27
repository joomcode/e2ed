import {
  e2edCreateSafeHtmlWithoutSanitize as clientE2edCreateSafeHtmlWithoutSanitize,
  e2edSanitizeHtml as clientE2edSanitizeHtml,
} from './sanitizeHtml';

import type {LogEvent, SafeHtml} from '../../../types/internal';

const e2edCreateSafeHtmlWithoutSanitize = clientE2edCreateSafeHtmlWithoutSanitize;
const e2edSanitizeHtml = clientE2edSanitizeHtml;

/**
 * Render single step of test run.
 * This global client function should not use scope variables (except other global functions).
 * @internal
 */
export function e2edRenderSteps(logEvents: readonly LogEvent[]): SafeHtml {
  const stepHtmls: SafeHtml[] = [];

  for (const logEvent of logEvents) {
    const {message, payload} = logEvent;
    const payloadString = JSON.stringify(payload, null, 2);
    const stepHtml = e2edSanitizeHtml`
<button aria-expanded="false" class="step-expanded step-expanded_status_passed">
  <span class="step-expanded__name">${message}</span>
  <span class="step-expanded__time"></span>
</button>
<pre class="step-expanded-panel step__panel"><code>${payloadString}</code></pre>
`;

    stepHtmls.push(stepHtml);
  }

  return e2edCreateSafeHtmlWithoutSanitize`${stepHtmls.join('')}`;
}
