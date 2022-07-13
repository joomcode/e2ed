import {doApiMock} from 'e2ed';
import {CreateDevice, CreateProduct} from 'e2ed/routes/apiRoutes';
import {Main} from 'e2ed/routes/pageRoutes';

import type {ApiDeviceAndProductRequest, ApiDeviceAndProductResponse, DeviceId} from 'e2ed/types';

const apiMockFunction = (
  routeParams: object,
  {method, query, requestBody, url}: ApiDeviceAndProductRequest,
): Partial<ApiDeviceAndProductResponse> => {
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

// @ts-expect-error: doApiMock require API route as first argument
void doApiMock(Main, apiMockFunction);

// @ts-expect-error: doApiMock require API route with static method getParamsFromUrl
void doApiMock(CreateDevice, apiMockFunction);

// ok
void doApiMock(CreateProduct, apiMockFunction);

// ok
void doApiMock(
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
      'X-Request-Id': 'Gd8obEgq81x',
      referer: String(query),
    };
    const statusCode = method === 'GET' ? 201 : 200;

    return {responseBody, responseHeaders, statusCode};
  },
);
