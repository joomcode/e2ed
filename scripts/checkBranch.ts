/**
 * @file Checks that current git branch is `main`.
 */

import {execFileSync} from 'node:child_process';

const currentBranch = execFileSync('git', ['branch', '--show-current'], {encoding: 'utf8'}).trim();

if (currentBranch !== 'main') {
  throw new Error(`Current branch in not "main": "${currentBranch}"`);
}

// eslint-disable-next-line no-console
console.log('[OK] Current branch is "main"');
