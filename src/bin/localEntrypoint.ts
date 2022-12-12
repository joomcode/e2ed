import {join} from 'node:path';

// eslint-disable-next-line import/no-extraneous-dependencies
import v8FlagsFilter from 'bin-v8-flags-filter';

import {INSTALLED_E2ED_DIRECTORY_PATH} from '../constants/internal';

import type {E2edEnvironment} from '../types/internal';

if ((process.env as E2edEnvironment).E2ED_DEBUG) {
  process.argv.push('--inspect-brk');
}

const pathToRunE2edInLocalEnvironment = join(
  INSTALLED_E2ED_DIRECTORY_PATH,
  'bin',
  'runE2edInLocalEnvironment.js',
);

v8FlagsFilter(pathToRunE2edInLocalEnvironment, {useShutdownMessage: true});
