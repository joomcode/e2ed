import {assertValueIsDefined as clientAssertValueIsDefined} from '../assertValueIsDefined';
import {sanitizeHtml as clientSanitizeHtml} from '../sanitizeHtml';

import {renderSteps as clientRenderSteps} from './renderSteps';
import {renderTestRunDescription as clientRenderTestRunDescription} from './renderTestRunDescription';
import {renderTestRunError as clientRenderTestRunError} from './renderTestRunError';

import type {FullTestRun, ReportClientState, SafeHtml} from '../../../../types/internal';

declare const reportClientState: ReportClientState;

const assertValueIsDefined: typeof clientAssertValueIsDefined = clientAssertValueIsDefined;
const renderSteps = clientRenderSteps;
const renderTestRunDescription = clientRenderTestRunDescription;
const renderTestRunError = clientRenderTestRunError;
const sanitizeHtml = clientSanitizeHtml;

/**
 * Renders tag `<article class="test-details">` with test run details.
 * This base client function should not use scope variables (except other base functions).
 * @internal
 */
export function renderTestRunDetails(fullTestRun: FullTestRun): SafeHtml {
  const {endTimeInMs, filePath, logEvents, name, runError, status} = fullTestRun;
  const {locator} = reportClientState;

  const firstStatusString = status[0];

  assertValueIsDefined(firstStatusString);

  const capitalizedStatus = `${firstStatusString.toUpperCase()}${status.slice(1)}`;

  return sanitizeHtml`<article class="test-details">
  <p class="test-details__path">${filePath}</p>
  <h2 class="test-details__title" ${locator('test-details-title', {capitalizedStatus})}>
    <span class="color-cell color-cell_status_${status} test-details__status">${capitalizedStatus}</span>${name}
  </h2>
  <div role="tabpanel">
    ${renderTestRunDescription(fullTestRun)}
    <article class="overview">
      <h3 class="overview__title">Execution</h3>
      ${renderSteps({endTimeInMs, logEvents})}
      ${renderTestRunError(runError)}
    </article>
  </div>
</article>`;
}
