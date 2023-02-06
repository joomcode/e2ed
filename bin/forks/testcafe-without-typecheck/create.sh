#!/usr/bin/env sh
set -eu

./bin/forks/testcafe-without-typecheck/clean.sh

cp -r ./node_modules/testcafe ./bin/forks/testcafe-without-typecheck/package

rm -rf ./bin/forks/testcafe-without-typecheck/package/node_modules

./bin/forks/testcafe-without-typecheck/transform.sh $1
