import {LogEventStatus, LogEventType} from '../../../../constants/internal';

import {sanitizeHtml as clientSanitizeHtml} from '../sanitizeHtml';

import {renderDuration as clientRenderDuration} from './renderDuration';
import {renderStepContent as clientRenderStepContent} from './renderStepContent';

import type {LogEvent, ReportClientState, SafeHtml, UtcTimeInMs} from '../../../../types/internal';

const renderDuration = clientRenderDuration;
const renderStepContent = clientRenderStepContent;
const sanitizeHtml = clientSanitizeHtml;

declare const reportClientState: ReportClientState;

type Options = Readonly<{
  logEvent: LogEvent;
  nextLogEventTime: UtcTimeInMs;
}>;

/**
 * Renders single step of test run.
 * This base client function should not use scope variables (except other base functions).
 * @internal
 */
export function renderStep({logEvent, nextLogEventTime}: Options): SafeHtml {
  const {message, payload, time, type} = logEvent;
  const durationInMs = nextLogEventTime - time;
  const isPayloadEmpty = !payload || Object.keys(payload).length === 0;
  const status = payload?.logEventStatus ?? LogEventStatus.Passed;

  let pathToScreenshotOfPage: string | undefined;

  if (type === LogEventType.InternalAction && typeof payload?.['pathToScreenshot'] === 'string') {
    const {pathToScreenshot} = payload;
    const {pathToScreenshotsDirectoryForReport} = reportClientState;

    if (pathToScreenshotsDirectoryForReport !== null) {
      const pathToDirectoryWithoutSlashes = pathToScreenshotsDirectoryForReport.replace(/\/+$/, '');

      pathToScreenshotOfPage = `${pathToDirectoryWithoutSlashes}/${pathToScreenshot}`;
    }
  }

  const content = renderStepContent({
    pathToScreenshotOfPage,
    payload: isPayloadEmpty ? undefined : payload,
    type,
  });
  const maybeEmptyClass = isPayloadEmpty ? 'step-expanded_is-empty' : '';
  const isErrorScreenshot = pathToScreenshotOfPage !== undefined;

  return sanitizeHtml`
<button aria-expanded="${isErrorScreenshot}" class="step-expanded step-expanded_status_${status} ${maybeEmptyClass}">
  <span class="step-expanded__name">${message}</span>
  <span class="step-expanded__time">${renderDuration(durationInMs)}</span>
</button>
${content}
`;
}
