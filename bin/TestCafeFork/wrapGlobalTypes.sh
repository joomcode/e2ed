#!/usr/bin/env sh

rm ./bin/TestCafeFork/package/ts-defs/*s.d.ts

sed -i "s/declare module 'testcafe'/declare module 'testcafe-without-typecheck'/" ./bin/TestCafeFork/package/ts-defs/index.d.ts

sed -i "s/global {/export namespace Inner {/" ./bin/TestCafeFork/package/ts-defs/index.d.ts

sed -ri "s/export const ([^:]*): /export const \1: Inner./" ./bin/TestCafeFork/package/ts-defs/index.d.ts

sed -i "s/const createTestCafe: /const createTestCafe: Inner./" ./bin/TestCafeFork/package/ts-defs/index.d.ts

sed -i "s/declare const fixture: [^;]*;//" ./bin/TestCafeFork/package/ts-defs/index.d.ts
sed -i "s/declare const test: [^;]*;//" ./bin/TestCafeFork/package/ts-defs/index.d.ts

sed -i "s/interface RequestHook {/interface RequestHook { _onConfigureResponse(event: Record<string, unknown>): Promise<void>;/" ./bin/TestCafeFork/package/ts-defs/index.d.ts
