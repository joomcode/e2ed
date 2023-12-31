import {join} from 'node:path';

import {testCafeHammerheadUpLibPath} from '../paths';

import type {AbsolutePathToDirectory} from '../../types/internal';

/**
 * Path to encoding module in `testcafe-hammerhead-up`.
 * @internal
 */
export const encodingPath = join(
  testCafeHammerheadUpLibPath,
  'processing',
  'encoding',
) as AbsolutePathToDirectory;

/**
 * Path to charset module in `testcafe-hammerhead-up`.
 * @internal
 */
export const charsetPath = join(encodingPath, 'charset') as AbsolutePathToDirectory;

/**
 * Path to request-hooks events factory (from `testcafe-hammerhead-up`).
 * @internal
 */
export const eventsFactoryPath = join(
  testCafeHammerheadUpLibPath,
  'request-pipeline',
  'request-hooks',
  'events',
  'factory',
) as AbsolutePathToDirectory;
