#!/usr/bin/env sh
set -eu

sed -i "s/(opts.isUrlsSet/(opts.isUrlsSet || String(url).includes(' ')/" ./bin/forks/testcafe-hammerhead-up/package/lib/client/hammerhead.js

sed -i "s/isUrlsSet)/isUrlsSet||String(e).includes(' '))/" ./bin/forks/testcafe-hammerhead-up/package/lib/client/hammerhead.min.js
