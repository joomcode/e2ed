/**
 * @file Pack file (file with configuration of pack).
 * Do not import anything from common index files into this file other than
 * the types and values from configurator, or from point imports for pack configuration,
 * like `./skipTests` (because the pack config is compiled separately from the tests themselves).
 */

import {RunEnvironment, runEnvironment} from 'e2ed/configurator';

import {skipTests} from '../skipTests';

import type {Pack} from 'autotests/types/pack';

const isLocalRun = runEnvironment === RunEnvironment.Local;

const browser = isLocalRun ? 'chrome:headless' : 'chromium:headless';
const browserFlags = ['--disable-dev-shm-usage', '--disable-web-security'];

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
  doAfterPack: [
    ({endTimeInMs}) => ({externalPackRunId: endTimeInMs}),
    ({customReportProperties}) => ({
      externalPackRunId: customReportProperties ? customReportProperties.externalPackRunId + 1 : 0,
    }),
    ({customReportProperties, endTimeInMs}) => {
      if (customReportProperties?.externalPackRunId !== endTimeInMs + 1) {
        throw new Error('Custom report properties were calculated incorrectly');
      }
    },
  ],
  doBeforePack: [
    ({fullPackConfig, startTimeInMs}) => ({
      ...fullPackConfig,
      customPackProperties: {
        ...fullPackConfig.customPackProperties,
        internalPackRunId: startTimeInMs,
      },
    }),
    ({fullPackConfig}) => ({
      ...fullPackConfig,
      customPackProperties: {
        ...fullPackConfig.customPackProperties,
        internalPackRunId: fullPackConfig.customPackProperties.internalPackRunId + 1,
      },
    }),
    ({fullPackConfig, startTimeInMs}) => {
      if (fullPackConfig.customPackProperties.internalPackRunId !== startTimeInMs + 1) {
        throw new Error('Custom pack properties were calculated incorrectly');
      }
    },
  ],
  dockerImage: 'e2edhub/e2ed',
  isTestIncludedInPack: ({options}) => options.meta.testId !== '13',
  liteReportFileName: 'lite-report.json',
  maxRetriesCountInDocker: 3,
  packTimeout: 90 * 60_000,
  pageRequestTimeout: 30_000,
  pageStabilizationInterval: 1_000,
  port1: 1337,
  port2: 1338,
  printTestLogsInConsole: true,
  reportFileName: 'report.html',
  selectorTimeout: 10_000,
  skipTests,
  testFileGlobs: ['./autotests/tests/**/*.ts', '!**/*.skip.ts'],
  testIdleTimeout: 20_000,
  testLogsFileName: 'test-logs.log',
  testTimeout: 60_000,
  waitForRequestTimeout: 30_000,
  waitForResponseTimeout: 30_000,
};
