import {
  createSafeHtmlWithoutSanitize as clientCreateSafeHtmlWithoutSanitize,
  sanitizeHtml as clientSanitizeHtml,
} from '../sanitizeHtml';

import type {LogEvent, SafeHtml, UtcTimeInMs} from '../../../../types/internal';

const createSafeHtmlWithoutSanitize = clientCreateSafeHtmlWithoutSanitize;
const sanitizeHtml = clientSanitizeHtml;

type Options = Readonly<{
  endTimeInMs: UtcTimeInMs;
  logEvents: readonly LogEvent[];
}>;

/**
 * Render single step of test run.
 * This base client function should not use scope variables (except other base functions).
 * @internal
 */
export function renderSteps({endTimeInMs, logEvents}: Options): SafeHtml {
  const stepHtmls: SafeHtml[] = [];

  for (let index = 0; index < logEvents.length; index += 1) {
    const logEvent = logEvents[index];
    const {message, payload, time} = logEvent;
    const payloadString = JSON.stringify(payload, null, 2);
    const nextLogEvent = logEvents[index + 1];
    const nextTime = nextLogEvent?.time ?? endTimeInMs;
    const durationMs = nextTime - time;

    const stepHtml = sanitizeHtml`
<button aria-expanded="false" class="step-expanded step-expanded_status_passed">
  <span class="step-expanded__name">${message}</span>
  <span class="step-expanded__time">${durationMs}ms</span>
</button>
<pre class="step-expanded-panel step__panel"><code>${payloadString}</code></pre>
`;

    stepHtmls.push(stepHtml);
  }

  return createSafeHtmlWithoutSanitize`${stepHtmls.join('')}`;
}
