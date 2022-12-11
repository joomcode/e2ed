import {join} from 'node:path';

// eslint-disable-next-line import/no-internal-modules
import {testCafeHammerheadPath} from 'testcafe-without-typecheck/lib/cli/cli';

/**
 * Path to encoding module in testcafe-hammerhead.
 * @internal
 */
export const encodingPath = join(testCafeHammerheadPath, '..', 'processing', 'encoding');

/**
 * Path to charset module in testcafe-hammerhead.
 * @internal
 */
export const charsetPath = join(encodingPath, 'charset');

/**
 * Path to request-hooks events factory (from testcafe-hammerhead).
 * @internal
 */
export const eventsFactoryPath = join(
  testCafeHammerheadPath,
  '..',
  'request-pipeline',
  'request-hooks',
  'events',
  'factory',
);
