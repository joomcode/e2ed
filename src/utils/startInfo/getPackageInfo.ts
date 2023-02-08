import {join} from 'node:path';

import {assertValueIsTrue} from '../asserts';

import type {AbsolutePathToDirectory, PackageInfo} from '../../types/internal';

/**
 * Gets information about used installed npm package from dependencies by package name.
 * If the second argument packagePath is given, then we look for the package at this absolute path.
 */
export const getPackageInfo = (
  packageName: string,
  packagePath?: AbsolutePathToDirectory,
): PackageInfo => {
  let pathToSomePackageModule = packagePath ?? require.resolve(packageName);

  while (pathToSomePackageModule.length > 1) {
    if (pathToSomePackageModule.endsWith(packageName)) {
      break;
    }

    pathToSomePackageModule = join(pathToSomePackageModule, '..');
  }

  const definedPackagePath = pathToSomePackageModule as AbsolutePathToDirectory;

  assertValueIsTrue(
    definedPackagePath.endsWith(packageName),
    'definedPackagePath ends with packageName',
    {packageName, packagePath},
  );

  const packageJsonPath = join(definedPackagePath, 'package.json');

  // eslint-disable-next-line global-require, @typescript-eslint/no-var-requires, import/no-dynamic-require
  const {version} = require<{version: string}>(packageJsonPath);

  return {packagePath: definedPackagePath, version};
};
