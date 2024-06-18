/**
 * @file Full pack configuration for running tests.
 * Don't import this module. Instead, use `getFullPackConfig` from `utils/config`.
 */

import {join, relative} from 'node:path';

import {
  ABSOLUTE_PATH_TO_INSTALLED_E2ED_DIRECTORY,
  ABSOLUTE_PATH_TO_PROJECT_ROOT_DIRECTORY,
  COMPILED_USERLAND_CONFIG_DIRECTORY,
  INTERNAL_REPORTS_DIRECTORY_PATH,
  isDebug,
  TESTS_DIRECTORY_PATH,
} from './constants/internal';
import {assertValueIsTrue} from './utils/asserts';
// eslint-disable-next-line import/no-internal-modules
import {assertUserlandPack} from './utils/config/assertUserlandPack';
import {getPathToPack} from './utils/environment';
import {setCustomInspectOnFunction} from './utils/fn';
import {setReadonlyProperty} from './utils/setReadonlyProperty';
import {isLocalRun} from './configurator';

import type {FullPackConfig, UserlandPack} from './types/internal';

import {defineConfig, devices} from '@playwright/test';

const maxTimeoutInMs = 3600_000;

const pathToPack = getPathToPack();
const relativePathFromInstalledE2edToRoot = relative(
  ABSOLUTE_PATH_TO_INSTALLED_E2ED_DIRECTORY,
  ABSOLUTE_PATH_TO_PROJECT_ROOT_DIRECTORY,
);
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

assertUserlandPack(userlandPack);

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

if (isDebug) {
  setReadonlyProperty(userlandPack, 'packTimeout', maxTimeoutInMs);
  setReadonlyProperty(userlandPack, 'testIdleTimeout', maxTimeoutInMs);
  setReadonlyProperty(userlandPack, 'testTimeout', maxTimeoutInMs);
}

const playwrightConfig = defineConfig({
  fullyParallel: true,

  outputDir: join(relativePathFromInstalledE2edToRoot, INTERNAL_REPORTS_DIRECTORY_PATH),

  projects: [
    {
      name: 'chromium',
      use: {...devices['Desktop Chrome']},
    },
  ],

  retries: isLocalRun ? 0 : userlandPack.maxRetriesCountInDocker - 1,

  testDir: join(relativePathFromInstalledE2edToRoot, TESTS_DIRECTORY_PATH),
  testIgnore: '**/*.skip.ts',
  testMatch: userlandPack.testFileGlobs as (typeof userlandPack.testFileGlobs)[number][],

  use: {
    actionTimeout: userlandPack.testIdleTimeout,

    // eslint-disable-next-line @typescript-eslint/naming-convention
    bypassCSP: true,

    headless: isLocalRun ? userlandPack.enableHeadlessMode : true,

    navigationTimeout: userlandPack.pageRequestTimeout,

    trace: 'on-first-retry',
  },

  workers: userlandPack.concurrency,
});

const config: FullPackConfig = Object.assign(playwrightConfig, userlandPack);

// eslint-disable-next-line import/no-default-export
export default config;
