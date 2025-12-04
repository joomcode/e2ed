import type {FullTestRun, ReportClientState, ScriptJsonData} from '../../../types/internal';

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
export const readPartOfJsonReportData = ({scriptToRead, shouldLogError}: Options): boolean => {
  try {
    const data = JSON.parse(scriptToRead?.textContent ?? '') as ScriptJsonData;

    if ('apiStatistics' in data) {
      reportClientState.reportClientData = data;
    } else {
      (reportClientState.fullTestRuns as FullTestRun[]).push(...data);
    }
  } catch (error) {
    if (shouldLogError) {
      // eslint-disable-next-line no-console
      console.error('Cannot parse JSON report data from script', error);
    }

    return false;
  }

  return true;
};
