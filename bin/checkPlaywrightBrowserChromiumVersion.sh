#!/usr/bin/env sh
set -eu

PLAYWRIGHT_VERSION=`./bin/getPlaywrightVersion.sh`

grep "\"@playwright/browser-chromium\": \"$PLAYWRIGHT_VERSION\"" ./package.json
