/**
 * @file Fix bug with circular require 'convert-source-map'.
 * {@link https://github.com/babel/babel/issues/11964}
 */

import {printStartParams} from '../utils/printStartParams';

try {
  // eslint-disable-next-line
  require('@babel/core').transformSync('1', {
    sourceMaps: 'inline',
    configFile: false,
    babelrc: false,
  });
  delete require.cache[require.resolve('convert-source-map')];
} catch (error) {
  console.log('Error in convert-source-map fix', error);
}

process.env.E2ED_IS_LOCAL_RUN = 'true';

printStartParams();

process.argv.push('--config-file', './node_modules/e2ed/testcaferc.json');

require('testcafe/lib/cli/cli');
