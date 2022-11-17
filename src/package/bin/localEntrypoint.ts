// eslint-disable-next-line import/no-extraneous-dependencies
import v8FlagsFilter from 'bin-v8-flags-filter';

import type {E2edEnvironment} from '../types/internal';

if ((process.env as E2edEnvironment).E2ED_DEBUG) {
  process.argv.push('--inspect-brk');
}

v8FlagsFilter('./node_modules/e2ed/bin/runE2edInLocalEnvironment.js', {useShutdownMessage: true});
