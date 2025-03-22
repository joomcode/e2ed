import {INTERNAL_DIRECTORY_NAME} from '../../../constants/internal';

import {getFullPackConfig} from '../../config';

import {createSafeHtmlWithoutSanitize} from '../client';

import {createLocatorOptions} from './locator';

import type {ReportClientState, SafeHtml} from '../../../types/internal';

/**
 * Renders JS constants for report page.
 * @internal
 */
export const renderScriptConstants = (): SafeHtml => {
  const e2edRightColumnContainer = {} as unknown as HTMLElement;
  const jsxRuntime = {} as unknown as JSX.Runtime;
  const locator = {} as unknown as ReportClientState['locator'];
  const {pathToScreenshotsDirectoryForReport} = getFullPackConfig();

  const reportClientState: ReportClientState = {
    createLocatorOptions,
    e2edRightColumnContainer,
    fullTestRuns: [],
    internalDirectoryName: INTERNAL_DIRECTORY_NAME,
    jsxRuntime,
    lengthOfReadedJsonReportDataParts: 0,
    locator,
    pathToScreenshotsDirectoryForReport,
    readJsonReportDataObservers: [],
  };

  return createSafeHtmlWithoutSanitize`
const reportClientState = ${JSON.stringify(reportClientState)};`;
};
