import {join} from 'node:path';

import v8FlagsFilter from 'bin-v8-flags-filter';

import {e2edEnvironment, INSTALLED_E2ED_DIRECTORY_PATH} from '../constants/internal';

// eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
if (e2edEnvironment.E2ED_DEBUG) {
  process.argv.push('--inspect-brk');
}

const pathToRunE2edInLocalEnvironment = join(
  INSTALLED_E2ED_DIRECTORY_PATH,
  'bin',
  'runE2edInLocalEnvironment.js',
);

v8FlagsFilter(pathToRunE2edInLocalEnvironment, {useShutdownMessage: true});
