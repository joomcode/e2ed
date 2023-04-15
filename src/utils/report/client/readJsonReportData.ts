import type {FullTestRun, ReportClientState} from '../../../types/internal';

declare const reportClientState: ReportClientState;

/**
 * Reads JSON report data from script tags.
 * Not all tags can be loaded and inserted into the DOM by the time the function is called,
 * so it must be called several times until the DOM is loaded.
 * This client function should not use scope variables (except global functions).
 * @internal
 */
export function readJsonReportData(): void {
  const {lengthOfReadedJsonReportDataParts} = reportClientState;
  const scripts = document.querySelectorAll('script.e2edJsonReportData');
  const {length} = scripts;

  if (length <= lengthOfReadedJsonReportDataParts) {
    return;
  }

  for (let i = lengthOfReadedJsonReportDataParts; i < length; i += 1) {
    const fullTestRuns = JSON.parse(
      scripts[i]?.textContent ?? `Cannot parse JSON report data from script number ${i}`,
    ) as readonly FullTestRun[];

    (reportClientState.fullTestRuns as FullTestRun[]).push(...fullTestRuns);
  }

  reportClientState.lengthOfReadedJsonReportDataParts = length;
}
