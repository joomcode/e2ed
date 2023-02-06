#!/usr/bin/env sh
set -eu

./bin/forks/testcafe-hammerhead-up/create.sh $1

rm -rf ./node_modules/testcafe-hammerhead-up

cp -r ./bin/forks/testcafe-hammerhead-up/package ./node_modules/testcafe-hammerhead-up
