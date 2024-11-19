/**
 * @file Generates and writes pruned lightweight `package.json` for npm package.
 */

import {writeFileSync} from 'node:fs';
import {join} from 'node:path';

import originalPackageJson from '../package.json';

type OriginalPackageJson = typeof originalPackageJson;

type PrunedPackageJson = Omit<OriginalPackageJson, 'devDependencies' | 'scripts'> & {
  devDependencies: undefined;
  scripts: undefined;
};

const prunedPackageJsonPath = join(__dirname, 'node_modules', 'e2ed', 'package.json');

const prunedPackageJson: PrunedPackageJson = {
  ...originalPackageJson,
  devDependencies: undefined,
  scripts: undefined,
};

const prunedPackageJsonText = JSON.stringify(prunedPackageJson, null, 2);

writeFileSync(prunedPackageJsonPath, prunedPackageJsonText);
