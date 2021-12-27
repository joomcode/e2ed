import {
  E2ED_TEST_STATUS_TO_STATUS_STRING as CLIENT_E2ED_TEST_STATUS_TO_STATUS_STRING,
  TestRunStatus,
} from '../../../constants/internal';

import {e2edRenderSteps as clientE2edRenderSteps} from './e2edRenderSteps';
import {e2edRenderTestRunDescription as clientE2edRenderTestRunDescription} from './e2edRenderTestRunDescription';
import {e2edRenderTestRunErrors as clientE2edRenderTestRunErrors} from './e2edRenderTestRunErrors';
import {e2edSanitizeHtml as clientE2edSanitizeHtml} from './sanitizeHtml';

import type {SafeHtml, TestRunWithHooks} from '../../../types/internal';

const e2edRenderSteps = clientE2edRenderSteps;
const e2edRenderTestRunDescription = clientE2edRenderTestRunDescription;
const e2edRenderTestRunErrors = clientE2edRenderTestRunErrors;
const E2ED_TEST_STATUS_TO_STATUS_STRING = CLIENT_E2ED_TEST_STATUS_TO_STATUS_STRING;
const e2edSanitizeHtml = clientE2edSanitizeHtml;

/**
 * Render tag <article class="test-details"> with test run details.
 * This global client function should not use scope variables (except other global functions).
 * @internal
 */
export function e2edRenderTestRunDetails(testRunWithHooks: TestRunWithHooks): SafeHtml {
  const {endTimeInMs, errors, filePath, logEvents, name} = testRunWithHooks;
  const status = errors.length > 0 ? TestRunStatus.Failed : TestRunStatus.Passed;
  const statusString = E2ED_TEST_STATUS_TO_STATUS_STRING[status];
  const capitalizedStatus = `${statusString[0].toUpperCase()}${statusString.slice(1)}`;

  return e2edSanitizeHtml`<article class="test-details">
  <p class="test-details__path">${filePath}</p>
  <h2 class="test-details__title">
    <span class="color-cell color-cell_status_${statusString} test-details__status">${capitalizedStatus}</span>
    ${name}
  </h2>
  <div role="tabpanel">
    ${e2edRenderTestRunDescription(testRunWithHooks)}
    <article class="overview">
      <h3 class="overview__title">Execution</h3>
      ${e2edRenderSteps({endTimeInMs, logEvents})}
      ${e2edRenderTestRunErrors(errors)}
    </article>
  </div>
</article>`;
}
