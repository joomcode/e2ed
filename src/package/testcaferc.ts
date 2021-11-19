import {deepMerge} from './utils/deepMerge';

import type {TestCafeConfig} from './types/internal';

let userConfig: Partial<TestCafeConfig>;

try {
  // eslint-disable-next-line global-require, import/extensions, @typescript-eslint/no-var-requires
  userConfig = require('../../e2ed/config.json') as Partial<TestCafeConfig>;
} catch (errors: unknown) {
  userConfig = {};
}

const defaultConfig: TestCafeConfig = {
  ajaxRequestTimeout: 40000,
  assertionTimeout: 10000,
  browserInitTimeout: 40000,
  browsers: 'chrome',
  color: true,
  compilerOptions: {
    typescript: {
      customCompilerModulePath: '../typescript',
      options: {esModuleInterop: true, resolveJsonModule: true},
    },
  },
  hostname: 'localhost',
  src: ['./e2ed/tests/**/*.spec.ts'],
  pageLoadTimeout: 0,
  pageRequestTimeout: 30000,
  runExecutionTimeout: 180000,
  reporter: [
    {
      name: 'spec',
    },
    {
      name: 'json',
      output: 'e2ed/reports/report.json',
    },
    {
      name: 'xunit',
      output: 'e2ed/reports/junit-report.xml',
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
  skipJsErrors: true,
  testExecutionTimeout: 120000,
  concurrency: 1,
  port1: 1337,
  port2: 1338,
};

export const config = deepMerge<TestCafeConfig>(defaultConfig, userConfig);

Object.assign(exports, config);
