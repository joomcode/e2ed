/**
 * @file Pack file (file with configuration of pack).
 * Do not import anything (from `utils`, etc) into this file other than
 * the types and values from `../configurator`, `e2ed/configurator`
 * or other packs (because the pack is compiled separately from the tests themselves
 * and has separate TypeScript scope).
 */

import {isLocalRun} from 'e2ed/configurator';

import {
  doAfterPack,
  doBeforePack,
  fullMocks,
  mapBackendResponseErrorToLog,
  mapBackendResponseToLog,
  mapLogPayloadInConsole,
  mapLogPayloadInLogFile,
  mapLogPayloadInReport,
  matchScreenshot,
  skipTests,
} from '../configurator';

import type {FilterTestsIntoPack, Pack} from 'autotests/configurator';

const browserFlags = [
  '--disable-dev-shm-usage',
  '--disable-web-security',
  '--ignore-certificate-errors',
];

const filterTestsIntoPack: FilterTestsIntoPack = ({options}) => options.meta.testId !== '13';

const userAgent =
  'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/133.0.0.0 Safari/537.36';

const msInMinute = 60_000;
const packTimeoutInMinutes = 5;

const waitBeforeRetryTimeout = 1_000;

/**
 * Pack of tests or tasks (pack configuration object).
 */
export const pack: Pack = {
  addLogsWithTags: [],
  assertionTimeout: 5_000,
  browserFlags,
  browserName: 'chromium',
  concurrency: isLocalRun ? 1 : 2,
  customPackProperties: {internalPackRunId: 0, name: 'allTests'},
  deviceScaleFactor: 1,
  doAfterPack,
  doBeforePack,
  enableCsp: false,
  enableHeadlessMode: true,
  enableMobileDeviceMode: false,
  enableTouchEventEmulation: false,
  filterTestsIntoPack,
  fullMocks,
  getTestNamePrefixInUiMode: (testOptions) => testOptions.meta.testId,
  liteReportFileName: 'lite-report.json',
  logFileName: 'pack-logs.log',
  mapBackendResponseErrorToLog,
  mapBackendResponseToLog,
  mapLogPayloadInConsole,
  mapLogPayloadInLogFile,
  mapLogPayloadInReport,
  matchScreenshot,
  maxRetriesCountInDocker: 3,
  navigationTimeout: 6_000,
  overriddenConfigFields: null,
  packTimeout: packTimeoutInMinutes * msInMinute,
  pathToScreenshotsDirectoryForReport: './screenshots',
  port1: 1337,
  port2: 1338,
  reportFileName: 'report.html',
  resourceUsageReadingInternal: 5_000,
  selectorTimeout: 10_000,
  skipTests,
  takeFullPageScreenshotOnError: false,
  takeViewportScreenshotOnError: true,
  testFileGlobs: ['**/autotests/tests/**/switchingPages.ts'],
  testIdleTimeout: 8_000,
  testTimeout: 15_000,
  userAgent,
  viewportHeight: 1080,
  viewportWidth: 1920,
  waitBeforeRetry: () => waitBeforeRetryTimeout,
  waitForAllRequestsComplete: {
    maxIntervalBetweenRequestsInMs: 500,
    timeout: 15_000,
  },
  waitForInterfaceStabilization: {
    stabilizationInterval: 500,
    timeout: 15_000,
  },
  waitForRequestTimeout: 15_000,
  waitForResponseTimeout: 15_000,
};
