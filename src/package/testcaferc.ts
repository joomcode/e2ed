import {JSON_REPORT_PATH} from './constants/internal';
import {deepMerge} from './utils/deepMerge';

import type {Config, DeepPartial} from './types/internal';

let userConfig: DeepPartial<Config>;

try {
  // eslint-disable-next-line global-require, import/extensions, @typescript-eslint/no-var-requires
  userConfig = require('../../e2ed/config.json') as Partial<Config>;
} catch (errors: unknown) {
  userConfig = {};
}

const defaultConfig: Config = {
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
  skipJsErrors: true,
  src: ['./e2ed/tests/**/*.spec.ts'],
  testExecutionTimeout: 180000,
  testRunExecutionTimeout: 120000,
};

export const config = deepMerge<Config>(defaultConfig, userConfig);

Object.assign(exports, config);
