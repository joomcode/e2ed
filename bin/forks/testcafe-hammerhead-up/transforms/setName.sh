#!/usr/bin/env sh
set -eu

sed -i 's/"name": "testcafe-hammerhead"/"name": "testcafe-hammerhead-up"/' ./bin/forks/testcafe-hammerhead-up/package/package.json
