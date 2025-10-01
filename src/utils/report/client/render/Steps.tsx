import {assertValueIsDefined as clientAssertValueIsDefined} from '../assertValueIsDefined';
import {createSafeHtmlWithoutSanitize as clientCreateSafeHtmlWithoutSanitize} from '../sanitizeHtml';

import {Step as clientStep} from './Step';

import type {LogEvent, SafeHtml, UtcTimeInMs} from '../../../../types/internal';

const assertValueIsDefined: typeof clientAssertValueIsDefined = clientAssertValueIsDefined;
const createSafeHtmlWithoutSanitize = clientCreateSafeHtmlWithoutSanitize;
const Step = clientStep;

declare const jsx: JSX.Runtime;

type Props = Readonly<{
  endTimeInMs: UtcTimeInMs;
  logEvents: readonly LogEvent[];
}>;

/**
 * Renders list of step of test run.
 * This base client function should not use scope variables (except other base functions).
 * @internal
 */
export const Steps: JSX.Component<Props> = ({endTimeInMs, logEvents}) => {
  const stepHtmls: SafeHtml[] = [];

  for (let index = 0; index < logEvents.length; index += 1) {
    const logEvent = logEvents[index];

    assertValueIsDefined(logEvent);

    const nextLogEvent = logEvents[index + 1];
    const nextLogEventTime = nextLogEvent?.time ?? endTimeInMs;
    const stepHtml = <Step logEvent={logEvent} nextLogEventTime={nextLogEventTime} />;

    stepHtmls.push(stepHtml);
  }

  return createSafeHtmlWithoutSanitize`${stepHtmls.join('')}`;
};
