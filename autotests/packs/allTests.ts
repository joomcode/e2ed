/**
 * @file Pack file (file with configuration of pack).
 * Do not import anything (from `utils`, etc) into this file other than
 * the types and values from `../configurator`, `e2ed/configurator`, `e2ed/constants`
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
  'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.35 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.35';

const packTimeoutInMinutes = 5;
const msInMinute = 60_000;

/**
 * Pack of tests or tasks (pack configuration object).
 */
export const pack: Pack = {
  assertionTimeout: 5_000,
  browserFlags,
  browserName: 'chromium',
  concurrency: isLocalRun ? 1 : 2,
  customPackProperties: {internalPackRunId: 0, name: 'allTests'},
  deviceScaleFactor: 1,
  doAfterPack,
  doBeforePack,
  enableCsp: true,
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
  maxRetriesCountInDocker: 3,
  overriddenConfigFields: null,
  packTimeout: packTimeoutInMinutes * msInMinute,
  pageRequestTimeout: 30_000,
  pageStabilizationInterval: 500,
  pathToScreenshotsDirectoryForReport: './screenshots',
  port1: 1337,
  port2: 1338,
  reportFileName: 'report.html',
  resourceUsageReadingInternal: 5_000,
  selectorTimeout: 10_000,
  skipTests,
  takeFullPageScreenshotOnError: false,
  takeViewportScreenshotOnError: true,
  testFileGlobs: ['**/autotests/tests/**/*.ts'],
  testIdleTimeout: 8_000,
  testTimeout: 15_000,
  userAgent,
  viewportHeight: 1080,
  viewportWidth: 1920,
  waitBeforeRetry: () => 0,
  waitForAllRequestsComplete: {
    maxIntervalBetweenRequestsInMs: 500,
    timeout: 30_000,
  },
  waitForInterfaceStabilization: {
    stabilizationInterval: 500,
    timeout: 30_000,
  },
  waitForRequestTimeout: 30_000,
  waitForResponseTimeout: 30_000,
};
