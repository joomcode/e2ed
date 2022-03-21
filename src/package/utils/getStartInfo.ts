import {RunEnvironment} from '../constants/internal';
import pkg from '../package.json';

import {getFullConfig} from './getFullConfig';

import type {StartInfo} from '../types/internal';

/**
 * Get complete start info (CLI params, e2ed environment variables
 * and full e2ed configuration) on start of tests run.
 * @internal
 */
export const getStartInfo = (): StartInfo => {
  const isDockerRun = Boolean(process.env.E2ED_IS_DOCKER_RUN);

  const e2edEnvironmentVariables: Record<string, string | undefined> = {};
  const runEnvironment = isDockerRun ? RunEnvironment.Docker : RunEnvironment.Local;

  for (const name of Object.keys(process.env).sort()) {
    const value = process.env[name];

    if (name.toUpperCase().startsWith('E2ED')) {
      e2edEnvironmentVariables[name] = value;
    }
  }

  return {
    PWD: process.env.PWD,
    'cwd()': process.cwd(),
    e2edEnvironmentVariables,
    e2edVersion: pkg.version,
    fullConfig: getFullConfig(),
    nodeVersion: process.version,
    'process.argv': [...process.argv],
    runEnvironment,
  };
};
