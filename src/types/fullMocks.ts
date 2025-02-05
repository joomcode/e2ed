import type {URL} from 'node:url';

import type {Brand} from './brand';
import type {Request, Response, ResponseWithRequest, StatusCode} from './http';
import type {TestStaticOptions} from './testRun';
import type {TestMetaPlaceholder} from './userland';

/**
 * Options of `getResponseFromFullMocks` function.
 */
type ResponseFromFullMocksOptions = Readonly<{
  request: Request;
  requestKind: RequestKind;
  responseWithRequest: ResponseWithRequest | undefined;
  testFullMocks: TestFullMocks;
}>;

/**
 * Functions that describe the "full mocks" functionality.
 */
export type FullMocksConfig<TestMeta = TestMetaPlaceholder> = Readonly<{
  /**
   * Filters tests by their static options —
   * full mocks will only be applied to tests for which the function returned `true`.
   */
  filterTests: (this: void, testStaticOptions: TestStaticOptions<TestMeta>) => boolean;

  /**
   * Get `RequestKind` of request by `method` and `urlObject`.
   */
  getRequestKind: (this: void, urlObject: URL) => RequestKind;

  /**
   * Get `response` on `request` by `requestKind` and by test full mocks.
   */
  getResponseFromFullMocks: (
    this: void,
    options: ResponseFromFullMocksOptions,
  ) => FullMocksResponse;

  /**
   * Get `responseWithRequest` of API request to write to full mocks.
   * If it returns `undefined`, the response is not written to full mocks.
   */
  getResponseToWriteToFullMocks: (
    this: void,
    requestKind: RequestKind,
    responseWithRequest: ResponseWithRequest,
  ) => ResponseWithRequest | undefined;

  /**
   * Reads full mocks of one test by `testId`.
   */
  readTestFullMocks: (this: void, testId: FullMocksTestId) => Promise<TestFullMocks | undefined>;

  /**
   * If `true`, then only writes mocks (but do not apply).
   */
  writeOnly: boolean;

  /**
   * Writes full mocks of one test by `testId`.
   */
  writeTestFullMocks: (
    this: void,
    testId: FullMocksTestId,
    testFullMocks: TestFullMocks,
  ) => Promise<void>;
}>;

/**
 * Mocked (generated) `response` for full mocks.
 */
export type FullMocksResponse = Partial<Response> & Readonly<{statusCode: StatusCode}>;

/**
 * Parameters of special `FullMocksRoute`.
 * @internal
 */
export type FullMocksRouteParams = Readonly<{
  fullMocksState: FullMocksState;
  requestKind: RequestKind;
  urlObject: URL;
}>;

/**
 * State of full mocks during concrete test.
 * @internal
 */
export type FullMocksState = Readonly<{
  appliedMocks: Record<RequestKind, number> | undefined;
  testFullMocks: TestFullMocks;
  testId: FullMocksTestId;
}>;

/**
 * Identifier of test (usually the hash of test file content).
 */
export type FullMocksTestId = Brand<string, 'FullMocksTestId'>;

/**
 * Identifier of request in set of requests for one test (usually just `path` of request url).
 */
export type RequestKind = Brand<string, 'RequestKind'>;

/**
 * Full mocks of one test.
 */
export type TestFullMocks = Readonly<Record<RequestKind, readonly ResponseWithRequest[]>>;
