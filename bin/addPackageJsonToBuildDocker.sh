#!/usr/bin/env sh
set -eu

VERSION=`./bin/getVersion.sh`

echo "{\n  \"dependencies\": {\n    \"e2ed\": \"$VERSION\"\n  }\n}" > ./build/docker/package.json
