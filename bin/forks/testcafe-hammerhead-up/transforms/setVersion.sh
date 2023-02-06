#!/usr/bin/env sh
set -eu

sed -i "s/\x22version\x22: \x22[^\x22]*\x22/\x22version\x22: \x22$1\x22/" ./bin/forks/testcafe-hammerhead-up/package/package.json
