import {LogEventStatus, LogEventType} from '../../../../constants/internal';

import {assertValueIsDefined as clientAssertValueIsDefined} from '../assertValueIsDefined';
import {
  createSafeHtmlWithoutSanitize as clientCreateSafeHtmlWithoutSanitize,
  sanitizeHtml as clientSanitizeHtml,
} from '../sanitizeHtml';

import type {LogEvent, ReportClientState, SafeHtml, UtcTimeInMs} from '../../../../types/internal';

const assertValueIsDefined: typeof clientAssertValueIsDefined = clientAssertValueIsDefined;
const createSafeHtmlWithoutSanitize = clientCreateSafeHtmlWithoutSanitize;
const sanitizeHtml = clientSanitizeHtml;

declare const reportClientState: ReportClientState;

type Options = Readonly<{
  endTimeInMs: UtcTimeInMs;
  logEvents: readonly LogEvent[];
}>;

/**
 * Renders single step of test run.
 * This base client function should not use scope variables (except other base functions).
 * @internal
 */
export function renderSteps({endTimeInMs, logEvents}: Options): SafeHtml {
  const stepHtmls: SafeHtml[] = [];

  for (let index = 0; index < logEvents.length; index += 1) {
    const logEvent = logEvents[index];

    assertValueIsDefined(logEvent);

    const {message, payload, time, type} = logEvent;
    const payloadString = JSON.stringify(payload, null, 2);
    const nextLogEvent = logEvents[index + 1];
    const nextTime = nextLogEvent?.time ?? endTimeInMs;
    const durationMs = nextTime - time;
    const status = payload?.logEventStatus ?? LogEventStatus.Passed;

    const code = sanitizeHtml`<code>${payloadString}</code>`;
    let contentTag: 'div' | 'pre' = 'pre';
    let content = code;

    if (type === LogEventType.InternalAction && typeof payload?.['pathToScreenshot'] === 'string') {
      const {pathToScreenshot} = payload;
      const {pathToScreenshotsDirectoryForReport} = reportClientState;

      if (pathToScreenshotsDirectoryForReport !== null) {
        const pathToDirectoryWithoutSlashes = pathToScreenshotsDirectoryForReport.replace(
          /\/+$/,
          '',
        );
        const pathToScreenshotFromReportPage = `${pathToDirectoryWithoutSlashes}/${pathToScreenshot}`;

        contentTag = 'div';
        content = sanitizeHtml`<pre>${code}</pre><img src="${pathToScreenshotFromReportPage}" alt="Screenshot from test" loading="lazy">`;
      }
    }

    const stepHtml = sanitizeHtml`
<button aria-expanded="false" class="step-expanded step-expanded_status_${status}">
  <span class="step-expanded__name">${message}</span>
  <span class="step-expanded__time">${durationMs}ms</span>
</button>
<${contentTag} class="step-expanded-panel step__panel">${content}</${contentTag}>
`;

    stepHtmls.push(stepHtml);
  }

  return createSafeHtmlWithoutSanitize`${stepHtmls.join('')}`;
}
