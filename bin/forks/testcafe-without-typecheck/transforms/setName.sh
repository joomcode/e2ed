#!/usr/bin/env sh
set -eu

sed -i 's/"name": "testcafe"/"name": "testcafe-without-typecheck"/' ./bin/forks/testcafe-without-typecheck/package/package.json
