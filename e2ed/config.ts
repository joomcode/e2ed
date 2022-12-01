/**
 * @file Userland configuration for e2ed.
 * Do not import anything into this file other than
 * the types and values from configurator, or optional local overrideConfig
 * (because the config is compiled separately from the tests themselves).
 */

import {RunEnvironment, runEnvironment} from 'e2ed/configurator';

import {skipTests} from './skipTests';

import type {Config} from 'e2ed/configurator';

const isLocalRun = runEnvironment === RunEnvironment.Local;

const browser = isLocalRun ? 'chrome:headless' : 'chromium:headless';
const browserFlags = ['--disable-dev-shm-usage', '--disable-web-security'];

/**
 * The complete config of pack of tests.
 */
const config: Config = {
  ajaxRequestTimeout: 40_000,
  assertionTimeout: 10_000,
  browser: [browser, ...browserFlags].join(' '),
  browserInitTimeout: 60_000,
  concurrency: isLocalRun ? 1 : 2,
  dockerImage: 'e2edhub/e2ed',
  liteReportFileName: 'lite-report.json',
  maxRetriesCountInDocker: 3,
  packTimeout: 90 * 60_000,
  pageRequestTimeout: 30_000,
  pageStabilizationInterval: 0,
  port1: 1337,
  port2: 1338,
  printTestLogsInConsole: true,
  reportFileName: 'report.html',
  selectorTimeout: 10_000,
  skipTests,
  testFileGlobs: ['./e2ed/tests/**/*.ts', '!**/*.skip.ts'],
  testIdleTimeout: 20_000,
  testLogsFileName: 'test-logs.log',
  testTimeout: 60_000,
  waitForRequestTimeout: 30_000,
  waitForResponseTimeout: 30_000,
};

try {
  // eslint-disable-next-line
  const {overrideConfig} = require('./overrideConfig');

  Object.assign(config, overrideConfig);
} catch {}

export {config};
