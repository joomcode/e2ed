import type {FullTestRun, ReportClientState} from '../../../types/internal';

declare const reportClientState: ReportClientState;

type Options = Readonly<{
  scriptToRead: Element | undefined;
  shouldLogError: boolean;
}>;

/**
 * Reads part of JSON report data from script tag.
 * Returns `true` if read successfully, and `false` if it has parse errors.
 * This client function should not use scope variables (except global functions).
 * @internal
 */
export function readPartOfJsonReportData({scriptToRead, shouldLogError}: Options): boolean {
  try {
    const fullTestRuns = JSON.parse(scriptToRead?.textContent ?? '') as readonly FullTestRun[];

    (reportClientState.fullTestRuns as FullTestRun[]).push(...fullTestRuns);
  } catch (error) {
    if (shouldLogError) {
      // eslint-disable-next-line no-console
      console.error('Cannot parse JSON report data from script', error);
    }

    return false;
  }

  return true;
}
