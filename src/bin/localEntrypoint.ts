import {fork} from 'node:child_process';
import {join} from 'node:path';

import {INSTALLED_E2ED_DIRECTORY_PATH, isDebug} from '../constants/internal';

const entrypoitFilePath = join(
  INSTALLED_E2ED_DIRECTORY_PATH,
  'bin',
  'runE2edInLocalEnvironment.js',
);

const execArgv = isDebug ? ['--inspect-brk'] : [];

fork(entrypoitFilePath, process.argv.slice(2), {execArgv, stdio: 'inherit'});
