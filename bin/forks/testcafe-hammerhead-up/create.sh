#!/usr/bin/env sh
set -eu

./bin/forks/testcafe-hammerhead-up/clean.sh

cp -r ./node_modules/testcafe-hammerhead ./bin/forks/testcafe-hammerhead-up/package

rm -rf ./bin/forks/testcafe-hammerhead-up/package/node_modules

./bin/forks/testcafe-hammerhead-up/transform.sh $1
