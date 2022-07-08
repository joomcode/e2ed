import {doApiMock} from 'e2ed';
import {CreateDevice, CreateProduct} from 'e2ed/routes/apiRoutes';
import {Main} from 'e2ed/routes/pageRoutes';

import type {Request, Response, Url} from 'e2ed/types';

type RequestBody = Readonly<{
  foo: number;
}>;

type ResponseBody = Readonly<{
  bar: string;
  url: Url;
}>;

const apiMockFunction = (
  routeParams: object,
  {requestBody, url}: Request<RequestBody>,
): Partial<Response<ResponseBody>> => {
  const {foo} = requestBody;

  const responseBody = {bar: String(foo), url};

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
    {method, requestBody, query, url}: Request<RequestBody>, // eslint-disable-next-line @typescript-eslint/require-await
  ): Promise<Response<ResponseBody>> => {
    const {foo} = requestBody;

    const responseBody = {bar: `${foo}${routeParams.id}`, url};
    const responseHeaders = {
      'X-Request-Id': 'Gd8obEgq81x',
      referer: String(query),
    };
    const statusCode = method === 'GET' ? 201 : 200;

    return {responseBody, responseHeaders, statusCode};
  },
);
