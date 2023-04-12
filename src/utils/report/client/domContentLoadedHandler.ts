import type {FullTestRun, ReportClientState} from '../../../types/internal';

declare const e2edJsonReportData: HTMLScriptElement;
declare const reportClientState: ReportClientState;

/**
 * DOMContentloaded handler for report page.
 * This client function should not use scope variables (except global functions).
 * @internal
 */
export function domContentLoadedHandler(): void {
  const fullTestRuns = JSON.parse(
    e2edJsonReportData.textContent ?? 'Cannot parse JSON report data',
  ) as readonly FullTestRun[];

  reportClientState.fullTestRuns = fullTestRuns;
}
