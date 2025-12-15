import {LogEventType} from '../../../../constants/internal';

import {assertValueIsDefined as clientAssertValueIsDefined} from '../assertValueIsDefined';

import {List as clientList} from './List';
import {Step as clientStep} from './Step';

import type {LogEvent, SafeHtml, UtcTimeInMs} from '../../../../types/internal';

const assertValueIsDefined: typeof clientAssertValueIsDefined = clientAssertValueIsDefined;
const List = clientList;
const Step = clientStep;

declare const jsx: JSX.Runtime;

type Props = Readonly<{
  endTimeInMs: UtcTimeInMs;
  isRoot?: boolean;
  logEvents: readonly LogEvent[] | undefined;
}>;

/**
 * Renders list of step of test run.
 * This base client function should not use scope variables (except other base functions).
 * @internal
 */
export const Steps: JSX.Component<Props> = ({endTimeInMs, isRoot = false, logEvents}) => {
  if (logEvents === undefined || logEvents.length === 0) {
    return <></>;
  }

  const stepHtmls: SafeHtml[] = [];

  for (let index = 0; index < logEvents.length; index += 1) {
    const logEvent: LogEvent | undefined = logEvents[index];

    assertValueIsDefined(logEvent);

    const nextLogEvent = logEvents[index + 1];
    const nextLogEventTime = nextLogEvent?.time ?? endTimeInMs;
    const stepHtml = <Step logEvent={logEvent} nextLogEventTime={nextLogEventTime} />;

    stepHtmls.push(stepHtml);
  }

  if (isRoot) {
    const endLogEvent: LogEvent = {
      children: [],
      endTime: undefined,
      message: '',
      payload: undefined,
      time: endTimeInMs,
      type: LogEventType.InternalUtil,
    };

    stepHtmls.push(<Step isEnd logEvent={endLogEvent} nextLogEventTime={endTimeInMs} />);
  }

  return (
    <ol class="steps-group">
      <List elements={stepHtmls} />
    </ol>
  );
};
