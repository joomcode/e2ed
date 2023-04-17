import type {FullTestRun, ReportClientState} from '../../../types/internal';

declare const reportClientState: ReportClientState;

/**
 * Reads JSON report data from script tags.
 * Not all tags can be loaded and inserted into the DOM by the time the function is called,
 * so it must be called several times until the DOM is loaded.
 * This client function should not use scope variables (except global functions).
 * @internal
 */
export function readJsonReportData(areAllScriptsLoaded?: boolean): void {
  const {lengthOfReadedJsonReportDataParts} = reportClientState;
  const scripts = document.querySelectorAll('body > script.e2edJsonReportData');
  const {length} = scripts;

  if (length <= lengthOfReadedJsonReportDataParts) {
    return;
  }

  let hasParseErrorForLastScript = false;

  for (let i = lengthOfReadedJsonReportDataParts; i < length; i += 1) {
    try {
      const fullTestRuns = JSON.parse(scripts[i]?.textContent ?? '') as readonly FullTestRun[];

      (reportClientState.fullTestRuns as FullTestRun[]).push(...fullTestRuns);
    } catch (error) {
      if (i < length - 1 || areAllScriptsLoaded) {
        // eslint-disable-next-line no-console
        console.error(`Cannot parse JSON report data from script number ${i}`);
      }

      if (i === length - 1) {
        hasParseErrorForLastScript = true;
      }
    }
  }

  const newLength = !areAllScriptsLoaded && hasParseErrorForLastScript ? length - 1 : length;

  reportClientState.lengthOfReadedJsonReportDataParts = newLength;
}
