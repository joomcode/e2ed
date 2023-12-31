import {runEnvironment, startTimeInMs} from '../../configurator';
import {
  ABSOLUTE_PATH_TO_INSTALLED_E2ED_DIRECTORY,
  ABSOLUTE_PATH_TO_PROJECT_ROOT_DIRECTORY,
  e2edEnvironment,
  INSTALLED_E2ED_DIRECTORY_PATH,
} from '../../constants/internal';

import {getFullPackConfig} from '../config';
import {getPathToPack} from '../environment';
import {testCafeHammerheadUpPackagePath} from '../paths';

import {getPackageInfo} from './getPackageInfo';

import type {StartInfo} from '../../types/internal';

/**
 * Get complete start info (CLI params, e2ed environment variables
 * and full e2ed configuration) on start of tests run.
 * @internal
 */
export const getStartInfo = (): StartInfo => {
  const e2edEnvironmentVariables: Record<string, string | undefined> = {};

  for (const name of Object.keys(e2edEnvironment).sort()) {
    const value = e2edEnvironment[name];

    if (name.toUpperCase().includes('E2ED_')) {
      e2edEnvironmentVariables[name] = value;
    }
  }

  const e2ed = getPackageInfo('e2ed', ABSOLUTE_PATH_TO_INSTALLED_E2ED_DIRECTORY);
  const testCafeWithoutTypeCheck = getPackageInfo('testcafe-without-typecheck');
  const testCafeHammerheadUp = getPackageInfo(
    'testcafe-hammerhead-up',
    testCafeHammerheadUpPackagePath,
  );

  return {
    absolutePathToProjectRootDirectory: ABSOLUTE_PATH_TO_PROJECT_ROOT_DIRECTORY,
    'cwd()': process.cwd(),
    e2ed,
    e2edEnvironmentVariables,
    fullPackConfig: getFullPackConfig(),
    installedE2edDirectoryPath: INSTALLED_E2ED_DIRECTORY_PATH,
    nodeVersion: process.version,
    pathToPack: getPathToPack(),
    'process.argv': [...process.argv],
    pwd: e2edEnvironment.PWD,
    runEnvironment,
    startTimeInMs,
    testCafeHammerheadUp,
    testCafeWithoutTypeCheck,
  };
};
