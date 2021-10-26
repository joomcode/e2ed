#!/usr/bin/env sh

#"typescript": "^3.3.3",

sed -i "s/\x22typescript\x22: \x22[^\x22]*\x22,//" ./bin/TestCafeFork/package/package.json
