#!/usr/bin/env sh
set -eu

sed -i 's/DISCONNECT_THRESHOLD = 3;/DISCONNECT_THRESHOLD = 10;/' ./bin/forks/testcafe-without-typecheck/package/lib/runner/test-run-controller.js
