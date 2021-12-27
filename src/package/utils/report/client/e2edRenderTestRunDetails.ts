import {TestRunStatus} from '../../../constants/internal';

import type {E2ED_TEST_STATUS_TO_STATUS_STRING as E2ED_TEST_STATUS_TO_STATUS_STRING_TYPE} from '../../../constants/internal';
import type {SafeHtml, TestRunWithHooks} from '../../../types/internal';

import type {e2edSanitizeHtml as E2edSanitizeHtml} from './sanitizeHtml';

declare const e2edSanitizeHtml: typeof E2edSanitizeHtml;

declare const E2ED_TEST_STATUS_TO_STATUS_STRING: typeof E2ED_TEST_STATUS_TO_STATUS_STRING_TYPE;

/**
 * Render tag <article class="test-details"> with test run details.
 * This global client function should not use scope variables (except other global functions).
 * @internal
 */
export function e2edRenderTestRunDetails(testRunWithHooks: TestRunWithHooks): SafeHtml {
  const {errors, filePath, name} = testRunWithHooks;
  const status = errors.length > 0 ? TestRunStatus.Failed : TestRunStatus.Passed;
  const statusString = E2ED_TEST_STATUS_TO_STATUS_STRING[status];
  const capitalizedStatus = `${statusString[0].toUpperCase()}${statusString.slice(1)}`;

  return e2edSanitizeHtml`<article class="test-details">
  <p class="test-details__path">${filePath}</p>
  <h2 class="test-details__title">
    <span class="color-cell color-cell_status_${statusString} test-details__status">${capitalizedStatus}</span>
    ${name}
  </h2>
</article>`;
}
