import {getFullPackConfig} from '../../config';

import {createSafeHtmlWithoutSanitize} from '../client';

import type {ReportClientState, SafeHtml} from '../../../types/internal';

/**
 * Renders JS constants for report page.
 * @internal
 */
export const renderScriptConstants = (): SafeHtml => {
  const {pathToScreenshotsDirectoryForReport} = getFullPackConfig();

  const reportClientState: ReportClientState = {
    fullTestRuns: [],
    lengthOfReadedJsonReportDataParts: 0,
    pathToScreenshotsDirectoryForReport,
    readJsonReportDataObservers: [],
  };

  return createSafeHtmlWithoutSanitize`
const reportClientState = ${JSON.stringify(reportClientState)};
`;
};
