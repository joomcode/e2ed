import {INTERNAL_DIRECTORY_NAME} from '../../../constants/internal';

import {getFullPackConfig} from '../../config';

import {createSafeHtmlWithoutSanitize} from '../client';

import {createLocatorOptions} from './locator';

import type {ReportClientState, SafeHtml} from '../../../types/internal';

/**
 * Renders JS constants for report page.
 * @internal
 */
export const renderScriptGlobals = (): SafeHtml => {
  const e2edRightColumnContainer = {} as unknown as HTMLElement;
  const locator = {} as unknown as ReportClientState['locator'];
  const {pathToScreenshotsDirectoryForReport} = getFullPackConfig();

  const reportClientState: ReportClientState = {
    createLocatorOptions,
    e2edRightColumnContainer,
    fullTestRuns: [],
    internalDirectoryName: INTERNAL_DIRECTORY_NAME,
    lengthOfReadedJsonReportDataParts: 0,
    locator,
    pathToScreenshotsDirectoryForReport,
    readJsonReportDataObservers: [],
  };

  return createSafeHtmlWithoutSanitize`
var jsx;
const reportClientState = ${JSON.stringify(reportClientState)};`;
};
