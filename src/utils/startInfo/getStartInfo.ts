import {availableParallelism, totalmem} from 'node:os';

import {runEnvironment, startTimeInMs} from '../../configurator';
import {
  ABSOLUTE_PATH_TO_INSTALLED_E2ED_DIRECTORY,
  ABSOLUTE_PATH_TO_PROJECT_ROOT_DIRECTORY,
  e2edEnvironment,
  INSTALLED_E2ED_DIRECTORY_PATH,
  IS_DEBUG,
} from '../../constants/internal';

import {getFullPackConfig} from '../config';
import {getPathToPack} from '../environment';
import {isUiMode} from '../uiMode';

import {getPackageInfo} from './getPackageInfo';

import type {StartInfo} from '../../types/internal';

type Options = Readonly<{configCompileTimeWithUnits: string}>;

/**
 * Get complete start info (CLI params, e2ed environment variables
 * and full e2ed configuration) on start of tests run.
 * @internal
 */
export const getStartInfo = ({configCompileTimeWithUnits}: Options): StartInfo => {
  const e2edEnvironmentVariables: Record<string, string | undefined> = {};

  for (const name of Object.keys(e2edEnvironment).sort()) {
    const value = e2edEnvironment[name];

    if (name.toUpperCase().includes('E2ED_')) {
      e2edEnvironmentVariables[name] = value;
    }
  }

  const e2ed = getPackageInfo('e2ed', ABSOLUTE_PATH_TO_INSTALLED_E2ED_DIRECTORY);
  const totalSystemMemoryInMb = Math.round(totalmem() / 1024 / 1024);

  return {
    absolutePathToProjectRootDirectory: ABSOLUTE_PATH_TO_PROJECT_ROOT_DIRECTORY,
    availableCpuCount: availableParallelism(),
    beforePackExecutionTimeWithUnits: '',
    configCompileTimeWithUnits,
    'cwd()': process.cwd(),
    e2ed,
    e2edEnvironmentVariables,
    fullPackConfig: getFullPackConfig(),
    installedE2edDirectoryPath: INSTALLED_E2ED_DIRECTORY_PATH,
    isDebug: IS_DEBUG,
    isUiMode,
    nodeVersion: process.version,
    pathToPack: getPathToPack(),
    'process.argv': [...process.argv],
    pwd: e2edEnvironment.PWD,
    runEnvironment,
    startTimeInMs,
    totalSystemMemoryInMb,
  };
};
