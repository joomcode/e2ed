/**
 * @file Generates and writes pruned lightweight package.json for npm package.
 */

import {writeFileSync} from 'node:fs';
import {join} from 'node:path';

import originaPackageJson from '../package.json';

const prunedPackageJsonPath = join(__dirname, 'node_modules', 'e2ed', 'package.json');

const prunedPackageJson: Partial<typeof originaPackageJson> = {...originaPackageJson};

delete prunedPackageJson.devDependencies;
delete prunedPackageJson.scripts;

const prunedPackageJsonText = JSON.stringify(prunedPackageJson, null, 2);

writeFileSync(prunedPackageJsonPath, prunedPackageJsonText);
