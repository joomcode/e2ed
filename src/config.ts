/**
 * @file Full pack configuration for running tests.
 * Don't import this module. Instead, use `getFullPackConfig` from `utils/config`.
 */

import {join} from 'node:path';

import {
  ABSOLUTE_PATH_TO_PROJECT_ROOT_DIRECTORY,
  COMPILED_USERLAND_CONFIG_DIRECTORY,
} from './constants/internal';
import {assertValueIsTrue} from './utils/asserts';
import {getPathToPack} from './utils/environment';
import {setCustomInspectOnFunction} from './utils/fn';
import {isLocalRun} from './configurator';

import type {FullPackConfig, UserlandPack} from './types/internal';

import {defineConfig, devices} from '@playwright/test';

const pathToPack = getPathToPack();
const tsExtension = '.ts';

assertValueIsTrue(pathToPack.endsWith(tsExtension), `pathToPack ends with "${tsExtension}"`, {
  pathToPack,
});

const pathFromCompiledConfigDirectoryToCompiledPack = `${pathToPack.slice(0, -tsExtension.length)}.js`;

const absoluteCompiledUserlandPackPath = join(
  ABSOLUTE_PATH_TO_PROJECT_ROOT_DIRECTORY,
  COMPILED_USERLAND_CONFIG_DIRECTORY,
  pathFromCompiledConfigDirectoryToCompiledPack,
);

// eslint-disable-next-line @typescript-eslint/no-var-requires, import/no-dynamic-require
const userlandPack = require<{pack: UserlandPack}>(absoluteCompiledUserlandPackPath).pack;

const {
  doAfterPack,
  doBeforePack,
  filterTestsIntoPack,
  mapBackendResponseErrorToLog,
  mapBackendResponseToLog,
  mapLogPayloadInConsole,
  mapLogPayloadInLogFile,
  mapLogPayloadInReport,
} = userlandPack;

for (const fn of doAfterPack) {
  setCustomInspectOnFunction(fn);
}

for (const fn of doBeforePack) {
  setCustomInspectOnFunction(fn);
}

setCustomInspectOnFunction(filterTestsIntoPack);
setCustomInspectOnFunction(mapBackendResponseErrorToLog);
setCustomInspectOnFunction(mapBackendResponseToLog);
setCustomInspectOnFunction(mapLogPayloadInConsole);
setCustomInspectOnFunction(mapLogPayloadInLogFile);
setCustomInspectOnFunction(mapLogPayloadInReport);

const playwrightConfig = defineConfig({
  fullyParallel: true,

  outputDir: '../../autotests/reports/internal',

  projects: [
    {
      name: 'chromium',
      use: {...devices['Desktop Chrome']},
    },
  ],

  retries: isLocalRun ? 0 : userlandPack.maxRetriesCountInDocker - 1,

  testDir: '../../autotests/tests',
  testMatch: userlandPack.testFileGlobs as (typeof userlandPack.testFileGlobs)[number][],

  use: {
    navigationTimeout: userlandPack.pageRequestTimeout,

    trace: 'on-first-retry',
  },

  workers: userlandPack.concurrency,
});

const config: FullPackConfig = Object.assign(playwrightConfig, userlandPack);

// eslint-disable-next-line import/no-default-export
export default config;
