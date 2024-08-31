#!/usr/bin/env sh
set -eu

E2ED_VERSION=`./bin/getE2edVersion.sh`

echo "{\n  \"dependencies\": {\n    \"e2ed\": \"$E2ED_VERSION\"\n  }\n}" > ./build/docker/package.json
