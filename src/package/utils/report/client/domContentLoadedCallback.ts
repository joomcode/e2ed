import type {FullTestRun, ReportClientGlobal} from '../../../types/internal';

declare const e2edJsonReportData: HTMLScriptElement;

/**
 * DOMContentloaded callback for report page.
 * This client function should not use scope variables (except global functions).
 * @internal
 */
export const domContentLoadedCallback = (): void => {
  const e2edFullTestRuns = JSON.parse(
    e2edJsonReportData.textContent || 'Cannot parse JSON report data',
  ) as readonly FullTestRun[];

  const global: ReportClientGlobal = window;

  global.e2edFullTestRuns = e2edFullTestRuns;
};
