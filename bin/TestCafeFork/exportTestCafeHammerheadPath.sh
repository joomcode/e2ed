#!/usr/bin/env sh
set -eu

echo ';module.exports.testCafeHammerheadPath = require.resolve("testcafe-hammerhead");' >> ./bin/TestCafeFork/package/lib/cli/cli.js
