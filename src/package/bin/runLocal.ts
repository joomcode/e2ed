#!/usr/bin/env node

// eslint-disable-next-line import/no-extraneous-dependencies
import v8FlagsFilter from 'bin-v8-flags-filter';

process.chdir('./node_modules/e2ed');

v8FlagsFilter('./bin/withArgs.js', {useShutdownMessage: true});
