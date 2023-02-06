#!/usr/bin/env sh
set -eu

sed -i "s/\x22prepublishOnly\x22: \x22[^\x22]*\x22/\x22do-nothing\x22: \x22\x22/" ./bin/forks/testcafe-without-typecheck/package/package.json
