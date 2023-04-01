#!/usr/bin/env sh
set -eu

rm ./bin/forks/testcafe-without-typecheck/package/ts-defs/*s.d.ts

sed -i "s/declare module 'testcafe'/declare module 'testcafe-without-typecheck'/" ./bin/forks/testcafe-without-typecheck/package/ts-defs/index.d.ts

sed -i "s/global {/export namespace Inner {/" ./bin/forks/testcafe-without-typecheck/package/ts-defs/index.d.ts

sed -ri "s/export const ([^:]*): /export const \1: Inner./" ./bin/forks/testcafe-without-typecheck/package/ts-defs/index.d.ts

sed -i "s/const createTestCafe: /const createTestCafe: Inner./" ./bin/forks/testcafe-without-typecheck/package/ts-defs/index.d.ts

sed -i "s/declare const fixture: [^;]*;//" ./bin/forks/testcafe-without-typecheck/package/ts-defs/index.d.ts
sed -i "s/declare const test: [^;]*;//" ./bin/forks/testcafe-without-typecheck/package/ts-defs/index.d.ts

sed -i "s/interface RequestHook {/interface RequestHook { _onConfigureResponse(event: Readonly<Record<string, unknown>>): Promise<void>;/" ./bin/forks/testcafe-without-typecheck/package/ts-defs/index.d.ts
