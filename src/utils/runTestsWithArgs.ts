import {join} from 'node:path';

import {EndE2edReason, INSTALLED_E2ED_DIRECTORY_PATH} from '../constants/internal';

import {endE2ed} from './end';
import {getFullConfig} from './getFullConfig';
import {hasBrowsersArg} from './hasBrowsersArg';
import {getPackTimeoutPromise} from './packTimeout';
import {getRunLabel} from './runLabel';

import type {E2edEnvironment} from '../types/internal';

const pathToTestcaferc = join(INSTALLED_E2ED_DIRECTORY_PATH, 'testcaferc.js');

/**
 * Run e2ed tests (tasks) with command line arguments.
 * @internal
 */
export const runTestsWithArgs = async (): Promise<void> => {
  const {browsers, concurrency} = getFullConfig();
  const runLabel = getRunLabel({concurrency, maxRetriesCount: 1, retryIndex: 1});

  (process.env as E2edEnvironment).E2ED_RUN_LABEL = runLabel;

  if (browsers.length > 0 && hasBrowsersArg() === false) {
    process.argv.splice(2, 0, String(browsers));
  }

  process.argv.push('--concurrency', String(concurrency));
  process.argv.push('--config-file', pathToTestcaferc);

  const packTimeoutPromise = getPackTimeoutPromise();

  type TestCafeWithoutTypeCheckCli = typeof import('testcafe-without-typecheck/lib/cli/cli');

  const {runTestCafePromise} =
    // eslint-disable-next-line global-require, import/no-internal-modules, @typescript-eslint/no-var-requires
    require<TestCafeWithoutTypeCheckCli>('testcafe-without-typecheck/lib/cli/cli');

  await Promise.race([runTestCafePromise, packTimeoutPromise]);

  endE2ed(EndE2edReason.LocalTestCafeRunEnded);
};