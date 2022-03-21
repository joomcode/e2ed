/**
 * @file Userland configuration for e2ed.
 * Do not import anything into this file
 * other than the following optional local overrideConfig
 * (because the config is compiled separately from the tests themselves).
 */

import type {Config} from 'e2ed/types';

const config: Config = {
  browserInitTimeout: 30000,
  browsers: 'chromium:headless',
  concurrency: Number(process.env.E2ED_CONCURRENCY) || 5,
};

try {
  // eslint-disable-next-line
  const {overrideConfig} = require('./overrideConfig');

  Object.assign(config, overrideConfig);
} catch (error) {
  // no overrideConfig
}

export {config};
