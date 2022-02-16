import {TEST_STATUS_TO_STATUS_STRING as CLIENT_TEST_STATUS_TO_STATUS_STRING} from '../../../../constants/internal';

import {sanitizeHtml as clientSanitizeHtml} from '../sanitizeHtml';

import {renderSteps as clientRenderSteps} from './renderSteps';
import {renderTestRunDescription as clientRenderTestRunDescription} from './renderTestRunDescription';
import {renderTestRunErrors as clientRenderTestRunErrors} from './renderTestRunErrors';

import type {FullTestRun, SafeHtml} from '../../../../types/internal';

const renderSteps = clientRenderSteps;
const renderTestRunDescription = clientRenderTestRunDescription;
const renderTestRunErrors = clientRenderTestRunErrors;
const sanitizeHtml = clientSanitizeHtml;
const TEST_STATUS_TO_STATUS_STRING = CLIENT_TEST_STATUS_TO_STATUS_STRING;

/**
 * Render tag <article class="test-details"> with test run details.
 * This base client function should not use scope variables (except other base functions).
 * @internal
 */
export function renderTestRunDetails(fullTestRun: FullTestRun): SafeHtml {
  const {endTimeInMs, errors, filePath, logEvents, name, status} = fullTestRun;
  const statusString = TEST_STATUS_TO_STATUS_STRING[status];
  const capitalizedStatus = `${statusString[0].toUpperCase()}${statusString.slice(1)}`;

  return sanitizeHtml`<article class="test-details">
  <p class="test-details__path">${filePath}</p>
  <h2 class="test-details__title">
    <span class="color-cell color-cell_status_${statusString} test-details__status">${capitalizedStatus}</span>${name}
  </h2>
  <div role="tabpanel">
    ${renderTestRunDescription(fullTestRun)}
    <article class="overview">
      <h3 class="overview__title">Execution</h3>
      ${renderSteps({endTimeInMs, logEvents})}
      ${renderTestRunErrors(errors)}
    </article>
  </div>
</article>`;
}
