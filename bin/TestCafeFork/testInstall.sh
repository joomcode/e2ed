#!/usr/bin/env sh
set -eu

./bin/TestCafeFork/create.sh $1

rm -rf ./node_modules/testcafe-without-typecheck

cp -r ./bin/TestCafeFork/package ./node_modules/testcafe-without-typecheck
