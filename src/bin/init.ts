import {execFileSync} from 'node:child_process';
import {join} from 'node:path';

import {INSTALLED_E2ED_DIRECTORY_PATH} from '../constants/internal';

const pathToDirectoryWithInitialExample = join(INSTALLED_E2ED_DIRECTORY_PATH, 'autotests');

const outputOfInit = execFileSync('cp', ['-rv', pathToDirectoryWithInitialExample, '.'], {
  encoding: 'utf8',
});

// eslint-disable-next-line no-console
console.log(outputOfInit);
