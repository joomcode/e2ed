#!/usr/bin/env sh
set -eu

E2ED_VERSION=`./bin/getE2edVersion.sh`
PLAYWRIGHT_VERSION=`./bin/getPlaywrightVersion.sh`

docker build \
       --build-arg PLAYWRIGHT_VERSION=$PLAYWRIGHT_VERSION \
       --tag e2edhub/e2ed:$E2ED_VERSION \
       --tag e2edhub/e2ed:latest .
