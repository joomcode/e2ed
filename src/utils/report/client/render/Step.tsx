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
  const date = new Date(time).toISOString();
  const isPayloadEmpty = !payload || Object.keys(payload).length === 0;
  const popoverId = Math.random().toString(16).slice(2);
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

  const content = isPayloadEmpty ? (
    <div class="step__head">
      <span class="step__name">{message}</span>
      <span class="step__duration">
        <Duration durationInMs={nextLogEventTime - time} />
      </span>
    </div>
  ) : (
    <details class="step__details">
      <summary class="step__head">
        <span class="step__name">{message}</span>
        <span class="step__duration">
          <Duration durationInMs={nextLogEventTime - time} />
        </span>
      </summary>
      <StepContent pathToScreenshotOfPage={pathToScreenshotOfPage} payload={payload} type={type} />
    </details>
  );

  return (
    <li class="step" data-status={status}>
      <button class="step__popover-button" popovertarget={popoverId} title={date}></button>
      <div id={popoverId} popover="auto">
        {date}
      </div>
      {content}
    </li>
  );
};
