#!/usr/bin/env sh

cat ./bin/TestCafeFork/package/ts-defs/*.d.ts > ./bin/TestCafeFork/package/ts-defs/index

rm -rf ./bin/TestCafeFork/package/ts-defs/*.d.ts

mv ./bin/TestCafeFork/package/ts-defs/index ./bin/TestCafeFork/package/ts-defs/index.d.ts

sed -i "s/declare module 'testcafe'/declare module 'testcafe-without-typecheck'/" ./bin/TestCafeFork/package/ts-defs/index.d.ts

sed -i "s/global {/export namespace Inner {/" ./bin/TestCafeFork/package/ts-defs/index.d.ts
