import type {Headers, Response} from './http';

/**
 * Any API mock function.
 */
export type AnyApiMockFunction = ApiMockFunction<unknown, unknown, unknown>;

/**
 * API mock function, that map request to mocked response.
 */
export type ApiMockFunction<RequestBody, ResponseBody, RouteParams> = (
  request: Readonly<{
    requestBody: RequestBody;
    requestHeaders: Headers;
    routeParams: RouteParams;
  }>,
) => Promise<Partial<Response<ResponseBody>>>;
