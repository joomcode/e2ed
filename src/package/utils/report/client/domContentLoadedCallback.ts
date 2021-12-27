import type {ReportClientGlobal, TestRunWithHooks} from '../../../types/internal';

declare const e2edJsonReportData: HTMLScriptElement;

/**
 * DOMContentloaded callback for report page.
 * This client function should not use scope variables (except global functions).
 * @internal
 */
export const domContentLoadedCallback = (): void => {
  const e2edTestRunsWithHooks = JSON.parse(
    e2edJsonReportData.textContent || 'Cannot parse JSON report data',
  ) as TestRunWithHooks[];

  const global: ReportClientGlobal = window;

  global.e2edTestRunsWithHooks = e2edTestRunsWithHooks;
};
