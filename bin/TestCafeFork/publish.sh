#!/usr/bin/env sh

./bin/TestCafeFork/clean.sh

cp -r ./node_modules/testcafe ./bin/TestCafeFork/package

./bin/TestCafeFork/transform.sh $1

#npm publish ./bin/TestCafeFork/package
