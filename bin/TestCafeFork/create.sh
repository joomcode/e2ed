#!/usr/bin/env sh
set -eu

./bin/TestCafeFork/clean.sh

cp -r ./node_modules/testcafe ./bin/TestCafeFork/package

rm -rf ./bin/TestCafeFork/package/node_modules

./bin/TestCafeFork/transform.sh $1
