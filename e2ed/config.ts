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

const config: Config = {
  ajaxRequestTimeout: 40_000,
  assertionTimeout: 10_000,
  browserInitTimeout: 30_000,
  browsers: 'chromium:headless --no-sandbox --disable-dev-shm-usage --disable-web-security',
  concurrency: isLocalRun ? 1 : 2,
  liteReportFileName: 'lite-report.json',
  maxRetriesCountInDocker: 3,
  pageRequestTimeout: 30_000,
  pageStabilizationInterval: 2_000,
  port1: 1337,
  port2: 1338,
  printTestLogsInConsole: true,
  reportFileName: 'report.html',
  selectorTimeout: 10_000,
  skipTests,
  src: ['./e2ed/tests/**/*.spec.ts'],
  testIdleTimeout: 20_000,
  testLogsFileName: 'test-logs.log',
  testTimeout: 90_000,
};

try {
  // eslint-disable-next-line
  const {overrideConfig} = require('./overrideConfig');

  Object.assign(config, overrideConfig);
} catch (error) {
  // no overrideConfig
}

export {config};
