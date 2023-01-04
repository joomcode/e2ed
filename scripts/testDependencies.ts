/**
 * @file Tests that the dependencies in testcafe-without-typecheck match the dependencies in e2ed.
 */

// eslint-disable-next-line import/no-internal-modules
import testCafeWithoutTypecheckPackageJson from '../node_modules/testcafe-without-typecheck/package.json';
import e2edPackageJson from '../package.json';

const e2edDependencies = e2edPackageJson.dependencies;
const testCafeWithoutTypecheckDependencies: Record<string, string> =
  testCafeWithoutTypecheckPackageJson.dependencies;
const testCafeWithoutTypecheckVersion = testCafeWithoutTypecheckPackageJson.version;

for (const [name, version] of Object.entries(e2edDependencies)) {
  if (name === 'testcafe-without-typecheck') {
    if (version !== testCafeWithoutTypecheckVersion) {
      throw new Error(
        `The version of the installed testcafe-without-typecheck package (${testCafeWithoutTypecheckVersion}) is different from the version of this dependency in the e2ed (${version})`,
      );
    }

    continue;
  }

  const checkedVersion = testCafeWithoutTypecheckDependencies[name];

  if (typeof checkedVersion !== 'string') {
    continue;
  }

  if (version !== checkedVersion) {
    throw new Error(
      `Dependency "${name}" has different versions in e2ed (${version}) and testcafe-without-typecheck (${checkedVersion})`,
    );
  }
}

// eslint-disable-next-line no-console
console.log('[OK] e2ed dependencies are correct');
