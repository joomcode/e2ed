#!/usr/bin/env sh

./bin/TestCafeFork/create.sh $1

npm publish ./bin/TestCafeFork/package
