#!/usr/bin/env sh
set -eu

sed -i 's/rejectFn();/;/' ./bin/forks/testcafe-without-typecheck/package/lib/browser/connection/index.js
