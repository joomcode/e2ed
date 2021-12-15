import type {TestRun} from '../../types/internal';

/**
 * Render tag <article class="test-detail"> with test run details.
 * This global client function should not use scope variables (except other global functions).
 * @internal
 */
export function e2edRenderTestRunDetails(testRun: TestRun): string {
  void testRun;

  return `<article class="test-detail"></article>`;
}
