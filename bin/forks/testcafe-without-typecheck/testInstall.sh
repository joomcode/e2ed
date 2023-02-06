#!/usr/bin/env sh
set -eu

./bin/forks/testcafe-without-typecheck/create.sh $1

rm -rf ./node_modules/testcafe-without-typecheck

cp -r ./bin/forks/testcafe-without-typecheck/package ./node_modules/testcafe-without-typecheck
