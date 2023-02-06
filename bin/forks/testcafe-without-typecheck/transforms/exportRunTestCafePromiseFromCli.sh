#!/usr/bin/env sh
set -eu

sed -i 's/process.exit/processExit/' ./bin/forks/testcafe-without-typecheck/package/lib/cli/cli.js

echo ';var processExit = code => process.exit(code);if (process.env.E2ED_RUN_LABEL) module.exports.runTestCafePromise = new Promise(resolve => {processExit = resolve});' >> ./bin/forks/testcafe-without-typecheck/package/lib/cli/cli.js
