// eslint-disable-next-line import/no-extraneous-dependencies
import v8FlagsFilter from 'bin-v8-flags-filter';

if (process.env.E2ED_DEBUG) {
  process.argv.push('--inspect-brk');
}

v8FlagsFilter('./node_modules/e2ed/bin/runWithArgs.js', {useShutdownMessage: true});
