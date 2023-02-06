#!/usr/bin/env sh
set -eu

./bin/forks/testcafe-hammerhead-up/create.sh $1

npm publish ./bin/forks/testcafe-hammerhead-up/package
