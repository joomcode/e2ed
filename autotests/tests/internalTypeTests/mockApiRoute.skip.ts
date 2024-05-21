import {CreateDevice, CreateProduct} from 'autotests/routes/apiRoutes';
import {Main} from 'autotests/routes/pageRoutes';
import {mockApiRoute, unmockApiRoute} from 'e2ed/actions';
import {CREATED_STATUS_CODE, OK_STATUS_CODE} from 'e2ed/constants';

import type {
  ApiCreateDeviceRequest,
  ApiCreateDeviceResponse,
  DeviceId,
  ProductId,
} from 'autotests/types';

const apiMockFunction = (
  routeParams: object,
  {method, query, requestBody, url}: ApiCreateDeviceRequest,
): Partial<ApiCreateDeviceResponse> => {
  const {input} = requestBody;
  const productId = 12;

  const responseBody = {
    id: productId as ProductId,
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
    const productId = 7;

    const responseBody = {
      id: productId as ProductId,
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
    const statusCode = method === 'GET' ? CREATED_STATUS_CODE : OK_STATUS_CODE;

    return {responseBody, responseHeaders, statusCode};
  },
);
