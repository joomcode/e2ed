import type {SafeHtml, TestRun} from '../../../types/internal';

import type {e2edSanitizeHtml as E2edSanitizeHtml} from './sanitizeHtml';

declare const e2edSanitizeHtml: typeof E2edSanitizeHtml;

/**
 * Render tag <article class="test-details"> with test run details.
 * This global client function should not use scope variables (except other global functions).
 * @internal
 */
export function e2edRenderTestRunDetails(testRun: TestRun): SafeHtml {
  void testRun;

  return e2edSanitizeHtml`<article class="test-details"></article>`;
}
