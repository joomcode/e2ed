/**
 * @file Fix bug with circular require 'convert-source-map'.
 * {@link https://github.com/babel/babel/issues/11964}
 */

import {generalLog} from '../utils/generalLog';
import {getIntegerFromEnvVariable} from '../utils/getIntegerFromEnvVariable';
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
  generalLog(`Error in convert-source-map fix: ${String(error)}`);
}

process.env.E2ED_IS_LOCAL_RUN = 'true';

printStartParams();

const concurrency = getIntegerFromEnvVariable({
  defaultValue: 1,
  maxValue: 50,
  name: 'E2ED_CONCURRENCY',
});

process.argv.push('--concurrency', String(concurrency));

process.argv.push('--config-file', './node_modules/e2ed/testcaferc.js');

require('testcafe-without-typecheck/lib/cli/cli');
