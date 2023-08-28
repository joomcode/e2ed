import {execFileSync} from 'node:child_process';
import {join} from 'node:path';

import {
  AUTOTESTS_DIRECTORY_PATH,
  EXEC_FILE_OPTIONS,
  INSTALLED_E2ED_DIRECTORY_PATH,
} from '../constants/internal';

const pathToDirectoryWithInitialExample = join(
  INSTALLED_E2ED_DIRECTORY_PATH,
  AUTOTESTS_DIRECTORY_PATH,
);

const outputOfCopy = execFileSync(
  'cp',
  ['-R', '-v', pathToDirectoryWithInitialExample, '.'],
  EXEC_FILE_OPTIONS,
);

const pathToGitignore = join(AUTOTESTS_DIRECTORY_PATH, 'gitignore');
const pathToDotGitignore = join(AUTOTESTS_DIRECTORY_PATH, '.gitignore');

const outputOfMove = execFileSync(
  'mv',
  ['-v', pathToGitignore, pathToDotGitignore],
  EXEC_FILE_OPTIONS,
);

// eslint-disable-next-line no-console
console.log(outputOfCopy, outputOfMove);
