#!/usr/bin/env sh
set -eu

echo '"use strict"; module.exports.testCafeHammerheadUpPath = require.resolve("testcafe-hammerhead-up");' > ./bin/forks/testcafe-without-typecheck/package/lib/testCafeHammerheadUpPath.js
