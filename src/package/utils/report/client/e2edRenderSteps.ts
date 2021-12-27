import {
  e2edCreateSafeHtmlWithoutSanitize as clientE2edCreateSafeHtmlWithoutSanitize,
  e2edSanitizeHtml as clientE2edSanitizeHtml,
} from './sanitizeHtml';

import type {LogEvent, SafeHtml, UtcTimeInMs} from '../../../types/internal';

const e2edCreateSafeHtmlWithoutSanitize = clientE2edCreateSafeHtmlWithoutSanitize;
const e2edSanitizeHtml = clientE2edSanitizeHtml;

type Options = Readonly<{
  endTimeInMs: UtcTimeInMs;
  logEvents: readonly LogEvent[];
}>;

/**
 * Render single step of test run.
 * This global client function should not use scope variables (except other global functions).
 * @internal
 */
export function e2edRenderSteps({endTimeInMs, logEvents}: Options): SafeHtml {
  const stepHtmls: SafeHtml[] = [];

  for (let index = 0; index < logEvents.length; index += 1) {
    const logEvent = logEvents[index];
    const {message, payload, time} = logEvent;
    const payloadString = JSON.stringify(payload, null, 2);
    const nextLogEvent = logEvents[index + 1];
    const nextTime = nextLogEvent?.time ?? endTimeInMs;
    const durationMs = nextTime - time;

    const stepHtml = e2edSanitizeHtml`
<button aria-expanded="false" class="step-expanded step-expanded_status_passed">
  <span class="step-expanded__name">${message}</span>
  <span class="step-expanded__time">${durationMs}ms</span>
</button>
<pre class="step-expanded-panel step__panel"><code>${payloadString}</code></pre>
`;

    stepHtmls.push(stepHtml);
  }

  return e2edCreateSafeHtmlWithoutSanitize`${stepHtmls.join('')}`;
}
