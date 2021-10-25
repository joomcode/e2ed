#!/usr/bin/env sh

sed -i 's/"name": "testcafe"/"name": "testcafe-without-typecheck"/' ./bin/TestCafeFork/package/package.json
