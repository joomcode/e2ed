#!/usr/bin/env sh
set -eu

./bin/forks/testcafe-without-typecheck/create.sh $1

npm publish ./bin/forks/testcafe-without-typecheck/package
