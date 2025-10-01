import {assertValueIsDefined as clientAssertValueIsDefined} from '../assertValueIsDefined';

import {Steps as clientSteps} from './Steps';
import {TestRunDescription as clientTestRunDescription} from './TestRunDescription';
import {TestRunError as clientTestRunError} from './TestRunError';

import type {FullTestRun, ReportClientState} from '../../../../types/internal';

declare const jsx: JSX.Runtime;
declare const reportClientState: ReportClientState;

const assertValueIsDefined: typeof clientAssertValueIsDefined = clientAssertValueIsDefined;
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

  return (
    <article class="test-details">
      <p class="test-details__path">{filePath}</p>
      <h2 class="test-details__title" {...locator('test-details-title', {capitalizedStatus})}>
        <span class={`color-cell color-cell_status_${status} test-details__status`}>
          {capitalizedStatus}
        </span>
        {name}
      </h2>
      <div role="tabpanel">
        <TestRunDescription fullTestRun={fullTestRun} />
        <article class="overview">
          <h3 class="overview__title">Execution</h3>
          <Steps endTimeInMs={endTimeInMs} logEvents={logEvents} />
          <TestRunError runError={runError} />
        </article>
      </div>
    </article>
  );
};
