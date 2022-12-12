import {runEnvironment, startTimeInMs} from '../configurator';
import {
  ABSOLUTE_PATH_TO_INSTALLED_E2ED_DIRECTORY,
  ABSOLUTE_PATH_TO_PROJECT_ROOT_DIRECTORY,
  INSTALLED_E2ED_DIRECTORY_PATH,
} from '../constants/internal';
import {version as e2edVersion} from '../package.json';

import {getFullConfig} from './getFullConfig';

import type {E2edEnvironment, StartInfo} from '../types/internal';

/**
 * Get complete start info (CLI params, e2ed environment variables
 * and full e2ed configuration) on start of tests run.
 * @internal
 */
export const getStartInfo = (): StartInfo => {
  const e2edEnvironmentVariables: Record<string, string | undefined> = {};

  for (const name of Object.keys(process.env).sort()) {
    const value = process.env[name];

    if (name.toUpperCase().startsWith('E2ED')) {
      e2edEnvironmentVariables[name] = value;
    }
  }

  return {
    PWD: (process.env as E2edEnvironment).PWD,
    absolutePathToInstalledE2edDirectory: ABSOLUTE_PATH_TO_INSTALLED_E2ED_DIRECTORY,
    absolutePathToProjectRootDirectory: ABSOLUTE_PATH_TO_PROJECT_ROOT_DIRECTORY,
    'cwd()': process.cwd(),
    e2edEnvironmentVariables,
    e2edVersion,
    fullConfig: getFullConfig(),
    installedE2edDirectoryPath: INSTALLED_E2ED_DIRECTORY_PATH,
    nodeVersion: process.version,
    'process.argv': [...process.argv],
    runEnvironment,
    startTimeInMs,
  };
};
