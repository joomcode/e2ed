import {assertValueIsDefined as clientAssertValueIsDefined} from '../assertValueIsDefined';
import {groupLogEvents as clientGroupLogEvents} from '../groupLogEvents';

import {Steps as clientSteps} from './Steps';
import {TestRunDescription as clientTestRunDescription} from './TestRunDescription';
import {TestRunError as clientTestRunError} from './TestRunError';

import type {FullTestRun, ReportClientState} from '../../../../types/internal';

declare const jsx: JSX.Runtime;
declare const reportClientState: ReportClientState;

const assertValueIsDefined: typeof clientAssertValueIsDefined = clientAssertValueIsDefined;
const groupLogEvents = clientGroupLogEvents;
const Steps = clientSteps;
const TestRunDescription = clientTestRunDescription;
const TestRunError = clientTestRunError;

type Props = Readonly<{fullTestRun: FullTestRun}>;

/**
 * Renders test run details for report.
 * This base client function should not use scope variables (except other base functions).
 * @internal
 */
export const TestRunDetails: JSX.Component<Props> = ({fullTestRun}) => {
  const {endTimeInMs, filePath, logEvents, name, runError, status} = fullTestRun;
  const {locator} = reportClientState;

  const firstStatusString = status[0];

  assertValueIsDefined(firstStatusString);

  const capitalizedStatus = `${firstStatusString.toUpperCase()}${status.slice(1)}`;
  const logEventsWithChildren = groupLogEvents(logEvents);

  return (
    <article class="test-details">
      <p class="test-details__path">{filePath}</p>
      <h2 class="test-details__title" {...locator('test-details-title', {capitalizedStatus})}>
        <span class="color-cell" data-status={status}>
          {capitalizedStatus}
        </span>
        {name}
      </h2>
      <TestRunDescription fullTestRun={fullTestRun} />
      <TestRunError runError={runError} />
      <h4 class="test-details__retry-title">Execution</h4>
      <Steps endTimeInMs={endTimeInMs} isRoot logEvents={logEventsWithChildren} />
    </article>
  );
};
