/**
 * @file Full pack configuration (extended TestCafe configuration) for running tests.
 * Don't import this module. Instead, use utils/getFullPackConfig.
 */

import {join} from 'node:path';

import {
  ABSOLUTE_PATH_TO_PROJECT_ROOT_DIRECTORY,
  COMPILED_USERLAND_CONFIG_DIRECTORY,
  REPORTS_DIRECTORY_PATH,
} from './constants/internal';
import {assertValueIsTrue} from './utils/asserts';
import {getPathToPack} from './utils/environment';
import {setCustomInspectOnFunction} from './utils/fn';

import type {FrozenPartOfTestCafeConfig, FullPackConfig, UserlandPack} from './types/internal';

const pathToPack = getPathToPack();

assertValueIsTrue(pathToPack.endsWith('.ts'), 'pathToPack ends with ".ts"', {pathToPack});

const pathFromCompiledConfigDirectoryToCompiledPack = `${pathToPack.slice(0, -3)}.js`;

const absoluteCompiledUserlandPackPath = join(
  ABSOLUTE_PATH_TO_PROJECT_ROOT_DIRECTORY,
  COMPILED_USERLAND_CONFIG_DIRECTORY,
  pathFromCompiledConfigDirectoryToCompiledPack,
);

const pathToScreenshotsDirectory = join(REPORTS_DIRECTORY_PATH, 'screenshots');

// eslint-disable-next-line @typescript-eslint/no-var-requires, import/no-dynamic-require
const userlandPack = require<{pack: UserlandPack}>(absoluteCompiledUserlandPackPath).pack;

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

const fullPackConfig: FullPackConfig = {
  ...userlandPack,
  browsers: userlandPack.browser,
  src: userlandPack.testFileGlobs,
  ...frozenPartOfTestCafeConfig,
};

const {doAfterPack, doBeforePack, isTestIncludedInPack} = fullPackConfig;

for (const fn of doAfterPack) {
  setCustomInspectOnFunction(fn);
}

for (const fn of doBeforePack) {
  setCustomInspectOnFunction(fn);
}

setCustomInspectOnFunction(isTestIncludedInPack);

Object.assign(exports, fullPackConfig);

// eslint-disable-next-line import/no-unused-modules
export {fullPackConfig};
