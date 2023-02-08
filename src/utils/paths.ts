import {join} from 'node:path';

// eslint-disable-next-line import/no-internal-modules
import {testCafeHammerheadUpPath} from 'testcafe-without-typecheck/lib/testCafeHammerheadUpPath';

import type {AbsolutePathToDirectory} from '../types/internal';

/**
 * Absolute path to lib directory in installed testcafe-hammerhead-up package.
 * @internal
 */
export const testCafeHammerheadUpLibPath = join(
  testCafeHammerheadUpPath,
  '..',
) as AbsolutePathToDirectory;

/**
 * Absolute path to installed testcafe-hammerhead-up package directory.
 * @internal
 */
export const testCafeHammerheadUpPackagePath = join(
  testCafeHammerheadUpLibPath,
  '..',
) as AbsolutePathToDirectory;
