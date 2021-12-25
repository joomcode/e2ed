/**
 * @file Check that the version of testcafe-without-typecheck and the version of testcafe image
 * in the Dockerfile match the version of installed testcafe.
 */

import {readFileSync} from 'fs';

import pkg from '../package.json';

const testCafeVersion = pkg.devDependencies.testcafe;
const testCafeWithoutTypecheckVersion = pkg.dependencies['testcafe-without-typecheck'];

if (!testCafeWithoutTypecheckVersion.startsWith(testCafeVersion)) {
  throw new Error(
    `Version of testcafe-without-typecheck (${testCafeWithoutTypecheckVersion}) in not based on version of TestCafe (${testCafeVersion})`,
  );
}

const dockerfileText = readFileSync('Dockerfile', 'utf8');

if (!dockerfileText.includes(`testcafe:${testCafeVersion}`)) {
  throw new Error(`Dockerfile in not based on version of TestCafe (${testCafeVersion})`);
}

// eslint-disable-next-line no-console
console.log(
  `[OK] testcafe-without-typecheck and Dockerfile are based on the installed version of TestCafe (${testCafeVersion})`,
);
