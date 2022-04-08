#!/usr/bin/env sh
set -eu

./bin/TestCafeFork/create.sh $1

npm publish ./bin/TestCafeFork/package
