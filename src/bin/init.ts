import {execFileSync} from 'node:child_process';
import {join} from 'node:path';

import {EXEC_FILE_OPTIONS, INSTALLED_E2ED_DIRECTORY_PATH} from '../constants/internal';

const pathToDirectoryWithInitialExample = join(INSTALLED_E2ED_DIRECTORY_PATH, 'autotests');

const outputOfCopy = execFileSync(
  'cp',
  ['--recursive', '--verbose', pathToDirectoryWithInitialExample, '.'],
  EXEC_FILE_OPTIONS,
);

const outputOfMove = execFileSync(
  'mv',
  ['--verbose', join('autotests', 'gitignore'), join('autotests', '.gitignore')],
  EXEC_FILE_OPTIONS,
);

// eslint-disable-next-line no-console
console.log(outputOfCopy, outputOfMove);
