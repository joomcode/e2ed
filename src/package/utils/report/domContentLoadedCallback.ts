import type {TestRun} from '../../types/internal';

declare const e2edJsonReportData: HTMLScriptElement;

/**
 * DOMContentloaded callback for report page.
 * This client function should not use scope variables (except global functions).
 * @internal
 */
export const domContentLoadedCallback = (): void => {
  const testRuns = JSON.parse(
    e2edJsonReportData.textContent || 'Cannot parse JSON report data',
  ) as TestRun[];

  // eslint-disable-next-line no-console
  console.log(testRuns);
};
