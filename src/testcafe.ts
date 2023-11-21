import type {fixture as testCafeFixture, test as testCafeTest} from 'testcafe-without-typecheck';

declare const global: Readonly<{fixture?: unknown; test?: unknown}>;

Object.defineProperty(exports, 'fixture', {
  get() {
    return global.fixture;
  },
});

Object.defineProperty(exports, 'test', {
  get() {
    return global.test;
  },
});

export {
  default as createTestCafe,
  RequestHook,
  RequestLogger,
  RequestMock,
  Selector,
} from 'testcafe-without-typecheck';

export declare const fixture: typeof testCafeFixture;
export declare const test: typeof testCafeTest;
