/**
 * @file Userland configuration for e2ed.
 * Do not import anything into this file other than
 * the types and values from configurator, or optional local overrideConfig
 * (because the config is compiled separately from the tests themselves).
 */

import {RunEnvironment, runEnvironment} from 'e2ed/configurator';

import type {Config} from 'e2ed/configurator';

const isLocalRun = runEnvironment === RunEnvironment.Local;

const defaultConcurrency = isLocalRun ? 1 : 5;

const config: Config = {
  ajaxRequestTimeout: 40_000,
  assertionTimeout: 10_000,
  browserInitTimeout: 30_000,
  browsers: 'chromium:headless',
  concurrency: Number(process.env.E2ED_CONCURRENCY) || defaultConcurrency,
  liteReportFileName: 'lite-report.json',
  maxRetriesCountInDocker: Number(process.env.E2ED_DOCKER_RETRIES) || 1,
  pageRequestTimeout: 30_000,
  pageStabilizationInterval: Number(process.env.E2ED_NAVIGATE_STABILIZATION_INTERVAL) || 2_000,
  port1: 1337,
  port2: 1338,
  printTestLogsInConsole: true,
  reportFileName: 'report.html',
  selectorTimeout: 10_000,
  skipTests: ['3'],
  src: ['./e2ed/tests/**/*.spec.ts'],
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
