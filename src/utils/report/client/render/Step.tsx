import {LogEventStatus, LogEventType} from '../../../../constants/internal';

import {Duration as clientDuration} from './Duration';
import {StepContent as clientStepContent} from './StepContent';

import type {LogEvent, ReportClientState, UtcTimeInMs} from '../../../../types/internal';

const Duration = clientDuration;
const StepContent = clientStepContent;

declare const jsx: JSX.Runtime;
declare const reportClientState: ReportClientState;

type Props = Readonly<{
  logEvent: LogEvent;
  nextLogEventTime: UtcTimeInMs;
}>;

/**
 * Renders single step of test run.
 * This base client function should not use scope variables (except other base functions).
 * @internal
 */
export const Step: JSX.Component<Props> = ({logEvent, nextLogEventTime}) => {
  const {message, payload, time, type} = logEvent;
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

  const maybeEmptyClass = isPayloadEmpty ? 'step-expanded_is-empty' : '';
  const isErrorScreenshot = pathToScreenshotOfPage !== undefined;

  return (
    <>
      <button
        aria-expanded={isErrorScreenshot}
        class={`step-expanded step-expanded_status_${status} ${maybeEmptyClass}`}
      >
        <span class="step-expanded__name">{message}</span>
        <span class="step-expanded__time">
          <Duration durationInMs={nextLogEventTime - time} />
        </span>
      </button>
      <StepContent
        pathToScreenshotOfPage={pathToScreenshotOfPage}
        payload={isPayloadEmpty ? undefined : payload}
        type={type}
      />
    </>
  );
};
