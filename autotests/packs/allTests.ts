/**
 * @file Pack file (file with configuration of pack).
 * Do not import anything (from `utils`, etc) into this file other than
 * the types and values from `../configurator`, `e2ed/configurator` or other packs
 * (because the pack is compiled separately from the tests themselves and has separate scope).
 */

import {RunEnvironment, runEnvironment} from 'e2ed/configurator';

import {
  doAfterPack,
  doBeforePack,
  mapLogPayloadInConsole,
  mapLogPayloadInReport,
  skipTests,
} from '../configurator';

import type {FilterTestsIntoPack, Pack} from 'autotests/types/packSpecific';

const isLocalRun = runEnvironment === RunEnvironment.Local;

const browser = isLocalRun ? 'chrome:headless' : 'chromium:headless';
const browserFlags = ['--disable-dev-shm-usage', '--disable-web-security'];

const filterTestsIntoPack: FilterTestsIntoPack = ({options}) => options.meta.testId !== '13';

/**
 * Pack of tests or tasks (pack configuration object).
 */
export const pack: Pack = {
  ajaxRequestTimeout: 40_000,
  assertionTimeout: 10_000,
  browser: [browser, ...browserFlags].join(' '),
  browserInitTimeout: 60_000,
  concurrency: isLocalRun ? 1 : 2,
  customPackProperties: {internalPackRunId: 0, name: 'allTests'},
  disableNativeAutomation: true,
  doAfterPack,
  doBeforePack,
  dockerImage: 'e2edhub/e2ed',
  filterTestsIntoPack,
  liteReportFileName: 'lite-report.json',
  logFileName: 'pack-logs.log',
  mapBackendResponseErrorToLog: ({request, responseHeaders, statusCode}) =>
    statusCode >= 400 ? {request, responseHeaders, statusCode} : undefined,
  mapBackendResponseToLog: ({request, statusCode}) =>
    statusCode < 400 ? {statusCode, url: request?.url} : undefined,
  mapLogPayloadInConsole,
  mapLogPayloadInLogFile: (_message, payload) => payload,
  mapLogPayloadInReport,
  maxRetriesCountInDocker: 3,
  packTimeout: 90 * 60_000,
  pageRequestTimeout: 30_000,
  pageStabilizationInterval: 500,
  pathToScreenshotsDirectoryForReport: './screenshots',
  port1: 1337,
  port2: 1338,
  reportFileName: 'report.html',
  selectorTimeout: 10_000,
  skipTests,
  takeFullPageScreenshotOnError: false,
  takeViewportScreenshotOnError: true,
  testFileGlobs: ['./autotests/tests/**/*.ts', '!**/*.skip.ts'],
  testIdleTimeout: 20_000,
  testTimeout: 60_000,
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
