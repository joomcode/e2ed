/**
 * @file Full e2ed configuration (Extended TestCafe config) for running tests.
 * Don't import this module. Instead, use utils/getFullConfig.ts.
 */

import {join} from 'node:path';

import {
  ABSOLUTE_PATH_TO_PROJECT_ROOT_DIRECTORY,
  COMPILED_USERLAND_CONFIG_PATH,
  REPORTS_DIRECTORY_PATH,
} from './constants/internal';

import type {FrozenPartOfTestCafeConfig, FullConfig, UserlandConfig} from './types/internal';

const absoluteCompiledUserlandConfigPath = join(
  ABSOLUTE_PATH_TO_PROJECT_ROOT_DIRECTORY,
  COMPILED_USERLAND_CONFIG_PATH,
);

const pathToScreenshotsDirectory = join(REPORTS_DIRECTORY_PATH, 'screenshots');

// eslint-disable-next-line @typescript-eslint/no-var-requires, import/no-dynamic-require
const userlandConfig = require<{config: UserlandConfig}>(absoluteCompiledUserlandConfigPath).config;

const frozenPartOfTestCafeConfig: FrozenPartOfTestCafeConfig = {
  color: true,
  compilerOptions: {
    typescript: {
      options: {esModuleInterop: true, resolveJsonModule: true},
    },
  },
  hostname: 'localhost',
  pageLoadTimeout: 0,
  reporter: [{name: 'spec'}],
  retryTestPages: true,
  screenshots: {
    path: pathToScreenshotsDirectory,
    // eslint-disable-next-line no-template-curly-in-string
    pathPattern: '${DATE}_${TIME}_${BROWSER}_${BROWSER_VERSION}/${TEST}/${FILE_INDEX}.png',
    takeOnFails: true,
    thumbnails: false,
  },
  skipJsErrors: true,
};

const fullConfig: FullConfig = {
  ...userlandConfig,
  browsers: userlandConfig.browser,
  src: userlandConfig.testFileGlobs,
  ...frozenPartOfTestCafeConfig,
};

Object.assign(exports, fullConfig);

// eslint-disable-next-line import/no-unused-modules
export {fullConfig};
