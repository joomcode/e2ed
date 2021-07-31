#!/usr/bin/env node

// eslint-disable-next-line import/no-extraneous-dependencies
import v8FlagsFilter from 'bin-v8-flags-filter';

v8FlagsFilter('./node_modules/e2ed/bin/runWithArgs.js', {useShutdownMessage: true});
