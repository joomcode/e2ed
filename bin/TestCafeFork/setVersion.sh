#!/usr/bin/env sh

sed -i "s/\x22version\x22: \x22[^\x22]*\x22/\x22version\x22: \x22$1\x22/" ./bin/TestCafeFork/package/package.json
