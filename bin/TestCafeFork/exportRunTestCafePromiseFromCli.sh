#!/usr/bin/env sh
set -eu

sed -i 's/process.exit/processExit/' ./bin/TestCafeFork/package/lib/cli/cli.js

echo ';var processExit = code => process.exit(code);if (process.env.E2ED_RUN_LABEL) exports.runTestCafePromise = new Promise(resolve => {processExit = resolve});' >> ./bin/TestCafeFork/package/lib/cli/cli.js
