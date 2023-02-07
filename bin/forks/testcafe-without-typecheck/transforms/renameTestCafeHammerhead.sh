#!/usr/bin/env sh
set -eu

find ./bin/forks/testcafe-without-typecheck/package/lib -type f -exec sed -i 's|"testcafe-hammerhead"|"testcafe-hammerhead-up"|' {} \;
find ./bin/forks/testcafe-without-typecheck/package/lib -type f -exec sed -i "s|'testcafe-hammerhead'|'testcafe-hammerhead-up'|" {} \;
