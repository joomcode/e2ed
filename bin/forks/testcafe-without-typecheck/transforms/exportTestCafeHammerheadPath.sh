#!/usr/bin/env sh
set -eu

echo ';module.exports.testCafeHammerheadPath = require.resolve("testcafe-hammerhead");' >> ./bin/forks/testcafe-without-typecheck/package/lib/cli/cli.js
