import type {fixture as testcafeFixture, test as testcafeTest} from 'testcafe-without-typecheck';

declare const global: Record<string, unknown>;

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

export declare const fixture: typeof testcafeFixture;
export declare const test: typeof testcafeTest;
