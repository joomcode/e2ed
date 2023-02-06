#!/usr/bin/env sh
set -eu

sed -i "s/\x22prepublish\x22: \x22[^\x22]*\x22/\x22do-nothing\x22: \x22\x22/" ./bin/forks/testcafe-hammerhead-up/package/package.json
