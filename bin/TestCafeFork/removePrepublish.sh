#!/usr/bin/env sh

sed -i "s/\x22prepublishOnly\x22: \x22[^\x22]*\x22/\x22do-nothing\x22: \x22\x22/" ./bin/TestCafeFork/package/package.json
