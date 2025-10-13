import {INTERNAL_DIRECTORY_NAME} from '../../../constants/internal';

import {getFullPackConfig} from '../../config';

import {SafeHtml} from '../client';

import {createLocatorOptions} from './locator';

import type {ReportClientState} from '../../../types/internal';

declare const jsx: JSX.Runtime;

/**
 * Renders JS constants for report page.
 * @internal
 */
export const ScriptGlobals: JSX.Component = () => {
  const locator = {} as unknown as ReportClientState['locator'];
  const {pathToScreenshotsDirectoryForReport} = getFullPackConfig();

  const reportClientState: ReportClientState = {
    createLocatorOptions,
    e2edRightColumnContainer: undefined,
    fullTestRuns: [],
    internalDirectoryName: INTERNAL_DIRECTORY_NAME,
    lengthOfReadedJsonReportDataParts: 0,
    locator,
    pathToScreenshotsDirectoryForReport,
    readJsonReportDataObservers: [],
  };

  const code = `var jsx;
const reportClientState = ${JSON.stringify(reportClientState)};
`;

  return <SafeHtml withoutSanitize={code} />;
};
