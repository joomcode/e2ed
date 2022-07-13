import {doApiMock} from 'e2ed';
import {CreateDevice, CreateProduct} from 'e2ed/routes/apiRoutes';
import {Main} from 'e2ed/routes/pageRoutes';

import type {DeviceAndProductRequest, DeviceAndProductResponse} from 'e2ed/types';

const apiMockFunction = (
  routeParams: object,
  {method, query, requestBody, url}: DeviceAndProductRequest,
): Partial<DeviceAndProductResponse> => {
  const {input} = requestBody;

  const responseBody = {id: 13, method, output: String(input), query, url};

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

    const responseBody = {id: 7, method, output: `${input}${routeParams.id}`, query, url};
    const responseHeaders = {
      'X-Request-Id': 'Gd8obEgq81x',
      referer: String(query),
    };
    const statusCode = method === 'GET' ? 201 : 200;

    return {responseBody, responseHeaders, statusCode};
  },
);
