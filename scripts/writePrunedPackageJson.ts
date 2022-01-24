/**
 * @file Generate and write pruned package.json for npm package.
 */

import {writeFileSync} from 'fs';
import {join} from 'path';

import pkg from '../package.json';

const prunedPackageJsonPath = join(__dirname, 'node_modules', 'e2ed', 'package.json');

const prunedPackageJson: Partial<typeof pkg> = {...pkg};

delete prunedPackageJson.devDependencies;
delete prunedPackageJson.scripts;

const prunedPackageJsonText = JSON.stringify(prunedPackageJson, null, 2);

writeFileSync(prunedPackageJsonPath, prunedPackageJsonText);
