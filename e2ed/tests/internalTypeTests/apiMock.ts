import {doApiMock} from 'e2ed';
import {CreateDevice, CreateProduct} from 'e2ed/routes/apiRoutes';
import {Main} from 'e2ed/routes/pageRoutes';

import type {Request, Response} from 'e2ed/types';

type RequestBody = Readonly<{
  foo: number;
}>;

type ResponseBody = Readonly<{
  bar: string;
}>;

const apiMockFunction = (
  routeParams: object,
  {requestBody}: Request<RequestBody>,
): Partial<Response<ResponseBody>> => {
  const {foo} = requestBody;

  const responseBody = {bar: String(foo)};

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
    {requestBody}: Request<RequestBody>, // eslint-disable-next-line @typescript-eslint/require-await
  ): Promise<Response<ResponseBody>> => {
    const {foo} = requestBody;

    const responseBody = {bar: `${foo}${routeParams.id}`};
    const responseHeaders = {
      'X-Request-Id': 'Gd8obEgq81x',
    };
    const statusCode = 201;

    return {responseBody, responseHeaders, statusCode};
  },
);
