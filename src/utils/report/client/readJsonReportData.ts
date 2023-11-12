import {onFirstJsonReportDataLoad as clientOnFirstJsonReportDataLoad} from './onFirstJsonReportDataLoad';
import {readPartOfJsonReportData as clientReadPartOfJsonReportData} from './readPartOfJsonReportData';

import type {ReportClientState} from '../../../types/internal';

const onFirstJsonReportDataLoad = clientOnFirstJsonReportDataLoad;
const readPartOfJsonReportData = clientReadPartOfJsonReportData;

declare const reportClientState: ReportClientState;

/**
 * Reads JSON report data from script tags.
 * Not all tags can be loaded and inserted into the DOM by the time the function is called,
 * so it must be called several times until the DOM is loaded.
 * This client function should not use scope variables (except global functions).
 * @internal
 */
export function readJsonReportData(areAllScriptsLoaded = false): void {
  const {lengthOfReadedJsonReportDataParts} = reportClientState;
  const scripts = document.querySelectorAll('body > script.e2edJsonReportData');
  const {length} = scripts;

  if (length <= lengthOfReadedJsonReportDataParts) {
    return;
  }

  let isLastReadSuccessful = true;

  for (let index = lengthOfReadedJsonReportDataParts; index < length; index += 1) {
    isLastReadSuccessful = readPartOfJsonReportData({
      scriptToRead: scripts[index],
      shouldLogError: index < length - 1 || areAllScriptsLoaded,
    });
  }

  const newLength = areAllScriptsLoaded || isLastReadSuccessful ? length : length - 1;

  if (reportClientState.lengthOfReadedJsonReportDataParts === 0 && newLength > 0) {
    onFirstJsonReportDataLoad();
  }

  reportClientState.lengthOfReadedJsonReportDataParts = newLength;
}
