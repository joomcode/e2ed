import type {Request, Response} from './http';

/**
 * API mock function, that map request to mocked response.
 */
export type ApiMockFunction<RouteParams> = (
  routeParams: RouteParams,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  request: Request<any>,
) => Promise<Partial<Response<unknown>>> | Partial<Response<unknown>>;
