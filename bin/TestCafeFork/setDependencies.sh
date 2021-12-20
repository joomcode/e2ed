#!/usr/bin/env sh

sed -i "s/\x22bin-v8-flags-filter\x22: \x22[^\x22]*\x22,/\x22bin-v8-flags-filter\x22: \x22>=1.2.0\x22,/" ./bin/TestCafeFork/package/package.json
sed -i "s/\x22pngjs\x22: \x22[^\x22]*\x22,//" ./bin/TestCafeFork/package/package.json
sed -i "s/\x22typescript\x22: \x22[^\x22]*\x22,//" ./bin/TestCafeFork/package/package.json

sed -i "s|\x22@types/node\x22: \x22[^\x22]*\x22,||" ./bin/TestCafeFork/package/package.json

sed -i "s|\x22devDependencies\x22|\x22peerDependencies\x22: {\x22@types/node\x22: \x22>=16\x22, \x22pngjs\x22: \x22>=6\x22, \x22typescript\x22: \x22>=4\x22},\x22devDependencies\x22|" ./bin/TestCafeFork/package/package.json

