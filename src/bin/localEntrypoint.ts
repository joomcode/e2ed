import {fork} from 'node:child_process';
import {join} from 'node:path';

import {DEBUG_PORT, INSTALLED_E2ED_DIRECTORY_PATH} from '../constants/internal';

const entrypoitFilePath = join(
  INSTALLED_E2ED_DIRECTORY_PATH,
  'bin',
  'runE2edInLocalEnvironment.js',
);

const execArgv = DEBUG_PORT !== undefined ? [`--inspect-brk=${DEBUG_PORT}`] : [];

const e2edProcess = fork(entrypoitFilePath, process.argv.slice(2), {execArgv, stdio: 'inherit'});

e2edProcess.on('exit', (code) => {
  process.on('exit', () => {
    process.exit(code);
  });
});
