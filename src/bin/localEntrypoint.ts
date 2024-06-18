import {join} from 'node:path';

import v8FlagsFilter from 'bin-v8-flags-filter';

import {INSTALLED_E2ED_DIRECTORY_PATH} from '../constants/internal';

const pathToRunE2edInLocalEnvironment = join(
  INSTALLED_E2ED_DIRECTORY_PATH,
  'bin',
  'runE2edInLocalEnvironment.js',
);

v8FlagsFilter(pathToRunE2edInLocalEnvironment, {useShutdownMessage: true});
