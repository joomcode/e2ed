#!/usr/bin/env sh
set -eu

sed -i 's/"name": "testcafe"/"name": "testcafe-without-typecheck"/' ./bin/TestCafeFork/package/package.json
