/**
 * @file Userland configuration for e2ed.
 * Do not import anything into this file other than
 * the following types, environment or optional local overrideConfig
 * (because the config is compiled separately from the tests themselves).
 */

import {RunEnvironment, runEnvironment} from 'e2ed/environment';

import type {Config} from 'e2ed/types';

const isLocalRun = runEnvironment === RunEnvironment.Local;

const defaultConcurrency = isLocalRun ? 1 : 5;

const config: Config = {
  ajaxRequestTimeout: 40000,
  assertionTimeout: 10000,
  browserInitTimeout: 30000,
  browsers: 'chromium:headless',
  concurrency: Number(process.env.E2ED_CONCURRENCY) || defaultConcurrency,
  liteReportFileName: 'lite-report.json',
  pageRequestTimeout: 30000,
  port1: 1337,
  port2: 1338,
  printTestLogsInConsole: true,
  reportFileName: 'report.html',
  selectorTimeout: 10000,
  skipTests: ['3'],
  src: ['./e2ed/tests/**/*.spec.ts'],
  testLogsFileName: 'test-logs.log',
  testRunExecutionTimeout: 120000,
};

try {
  // eslint-disable-next-line
  const {overrideConfig} = require('./overrideConfig');

  Object.assign(config, overrideConfig);
} catch (error) {
  // no overrideConfig
}

export {config};
