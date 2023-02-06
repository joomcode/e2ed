#!/usr/bin/env sh
set -eu

./bin/forks/testcafe-hammerhead-up/transforms/setName.sh
./bin/forks/testcafe-hammerhead-up/transforms/setVersion.sh $1
./bin/forks/testcafe-hammerhead-up/transforms/removePrepublish.sh
./bin/forks/testcafe-hammerhead-up/transforms/setReadme.sh
./bin/forks/testcafe-hammerhead-up/transforms/fixSrcsetProxyUrl.sh
