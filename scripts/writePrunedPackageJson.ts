/**
 * @file Generates and writes pruned lightweight `package.json` for npm package.
 */

import {writeFileSync} from 'node:fs';
import {join} from 'node:path';

import originalPackageJson from '../package.json';

type OriginalPackageJson = typeof originalPackageJson;

type PrunedPackageJson = Omit<OriginalPackageJson, 'bin' | 'devDependencies' | 'scripts'> & {
  bin: OriginalPackageJson['bin'] & {['e2ed-install-browsers']: string};
  devDependencies: undefined;
  scripts: undefined;
};

const prunedPackageJsonPath = join(__dirname, 'node_modules', 'e2ed', 'package.json');

const playwrightVersion = originalPackageJson.dependencies['@playwright/test'];

const prunedPackageJson: PrunedPackageJson = {
  ...originalPackageJson,
  bin: {
    ...originalPackageJson.bin,
    'e2ed-install-browsers': `npm install --global @playwright/browser-chromium@${playwrightVersion}`,
  },
  devDependencies: undefined,
  scripts: undefined,
};

const prunedPackageJsonText = JSON.stringify(prunedPackageJson, null, 2);

writeFileSync(prunedPackageJsonPath, prunedPackageJsonText);
