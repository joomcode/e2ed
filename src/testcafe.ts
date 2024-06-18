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

export const createTestCafe = () => {};

export const RequestHook = function () {};

export const RequestLogger = function () {};

export const RequestMock = function () {};

export const Selector = () => {};

export declare const fixture: object;
export declare const test: object;
