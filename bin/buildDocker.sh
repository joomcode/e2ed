#!/usr/bin/env sh
set -eu

VERSION=`./bin/getVersion.sh`

docker build --tag e2edhub/e2ed:$VERSION --tag e2edhub/e2ed:latest .
