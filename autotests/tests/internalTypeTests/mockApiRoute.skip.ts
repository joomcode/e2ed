import {CreateDevice, CreateProduct} from 'autotests/routes/apiRoutes';
import {Main} from 'autotests/routes/pageRoutes';
import {mockApiRoute, unmockApiRoute} from 'e2ed/actions';

import type {ApiCreateDeviceRequest, ApiCreateDeviceResponse, DeviceId} from 'autotests/types';

const apiMockFunction = (
  routeParams: object,
  {method, query, requestBody, url}: ApiCreateDeviceRequest,
): Partial<ApiCreateDeviceResponse> => {
  const {input} = requestBody;

  const responseBody = {
    id: 12,
    method,
    output: String(input),
    payload: {id: '12' as DeviceId, ...requestBody},
    query,
    url,
  };

  return {responseBody};
};

// @ts-expect-error: mockApiRoute require API route as first argument
void mockApiRoute(Main, apiMockFunction);

// @ts-expect-error: unmockApiRoute require API route as first argument
void unmockApiRoute(Main);

// @ts-expect-error: mockApiRoute require API route with static method getParamsFromUrl
void mockApiRoute(CreateDevice, apiMockFunction);

// @ts-expect-error: unmockApiRoute require API route with static method getParamsFromUrl
void unmockApiRoute(CreateDevice);

// ok
void mockApiRoute(CreateProduct, apiMockFunction);

// ok
void unmockApiRoute(CreateProduct);

// ok
void mockApiRoute(
  CreateProduct,
  async (
    routeParams,
    {method, requestBody, query, url}, // eslint-disable-next-line @typescript-eslint/require-await
  ) => {
    const {input} = requestBody;

    const responseBody = {
      id: 7,
      method,
      output: `${input}${routeParams.id}`,
      payload: {id: '7' as DeviceId, ...requestBody},
      query,
      url,
    };
    const responseHeaders = {
      referer: String(query),
      'x-request-id': 'Gd8obEgq81x',
    };
    const statusCode = method === 'GET' ? 201 : 200;

    return {responseBody, responseHeaders, statusCode};
  },
);
