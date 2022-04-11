/**
 * @file Full e2ed configuration (Extended TestCafe config) for running tests.
 * Don't import this module. Instead, use utils/getFullConfig.ts.
 */

import {join} from 'node:path';

import {COMPILED_USERLAND_CONFIG_PATH, JSON_REPORT_PATH} from './constants/internal';
import {deepMerge} from './utils/deepMerge';
import {generalLog} from './utils/generalLog';

import type {FullConfig, UserlandConfig} from './types/internal';

const relativeUserlandConfigPath = join('..', '..', COMPILED_USERLAND_CONFIG_PATH);

let userlandConfig: UserlandConfig;

try {
  // eslint-disable-next-line global-require, @typescript-eslint/no-var-requires, import/no-dynamic-require
  userlandConfig = (require(relativeUserlandConfigPath) as typeof import('../../e2ed/config'))
    .config;
} catch (error) {
  generalLog('Cannot load e2ed/config.ts', {error});

  userlandConfig = {};
}

const defaultConfig: FullConfig = {
  ajaxRequestTimeout: 40000,
  assertionTimeout: 10000,
  browserInitTimeout: 40000,
  browsers: 'chrome',
  color: true,
  compilerOptions: {
    typescript: {
      options: {esModuleInterop: true, resolveJsonModule: true},
    },
  },
  concurrency: 1,
  hostname: 'localhost',
  pageLoadTimeout: 0,
  pageRequestTimeout: 30000,
  port1: 1337,
  port2: 1338,
  reporter: [
    {
      name: 'spec',
    },
    {
      name: 'json',
      output: JSON_REPORT_PATH,
    },
    {
      name: 'xunit',
      output: './e2ed/reports/junit-report.xml',
    },
  ],
  retryTestPages: true,
  screenshots: {
    path: 'e2ed/reports/screenshots',
    // eslint-disable-next-line no-template-curly-in-string
    pathPattern: '${DATE}_${TIME}_${BROWSER}_${BROWSER_VERSION}/${TEST}/${FILE_INDEX}.png',
    takeOnFails: true,
    thumbnails: false,
  },
  selectorTimeout: 10000,
  skipJsErrors: true,
  src: ['./e2ed/tests/**/*.spec.ts'],
  testExecutionTimeout: 180000,
  testRunExecutionTimeout: 120000,
};

const fullConfig = deepMerge<FullConfig>(defaultConfig, userlandConfig);

Object.assign(exports, fullConfig);

// eslint-disable-next-line import/no-unused-modules
export {fullConfig};
