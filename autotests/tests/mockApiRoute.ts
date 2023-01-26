import {it} from 'autotests';
import {CreateProduct as CreateProductRoute} from 'autotests/routes/apiRoutes';
import {createClientFunction, expect} from 'e2ed';
import {mockApiRoute, unmockApiRoute} from 'e2ed/actions';

import type {ApiCreateDeviceResponse, DeviceId} from 'autotests/types';
import type {Url} from 'e2ed/types';

it(
  'mockApiRoute correctly intercepts requests, and unmockApiRoute cancels the interception',
  {meta: {testId: '6'}, testIdleTimeout: 15_000},
  async () => {
    await mockApiRoute(CreateProductRoute, (routeParams, {method, query, requestBody, url}) => {
      const responseBody = {
        id: routeParams.id,
        method,
        output: String(requestBody.input),
        payload: {id: String(routeParams.id) as DeviceId, ...requestBody},
        query,
        url,
      };

      return {responseBody};
    });

    const getMockedProduct = createClientFunction(
      () =>
        fetch('https://reqres.in/api/product/135865?size=13', {
          body: JSON.stringify({cookies: [], input: 17, model: 'samsung', version: '12'}),
          headers: {'Content-Type': 'application/json; charset=UTF-8'},
          method: 'POST',
        }).then((res) => res.json() as Promise<ApiCreateDeviceResponse['responseBody']>),
      {name: 'getMockedProduct', timeout: 2_000},
    );

    const mockedProduct = await getMockedProduct();

    const fetchUrl = 'https://reqres.in/api/product/135865?size=13' as Url;

    const productRouteParams = CreateProductRoute.getParamsFromUrl(fetchUrl);

    const productRouteFromUrl = new CreateProductRoute(productRouteParams);

    await expect(mockedProduct, 'mocked API returns correct result').eql({
      id: productRouteFromUrl.routeParams.id,
      method: productRouteFromUrl.getMethod(),
      output: '17',
      payload: {
        cookies: [],
        id: String(productRouteFromUrl.routeParams.id) as DeviceId,
        input: 17,
        model: 'samsung',
        version: '12',
      },
      query: {size: '13'},
      url: fetchUrl,
    });

    await unmockApiRoute(CreateProductRoute);

    const newMockedProduct = (await getMockedProduct().catch(() => undefined)) ?? {createdAt: ''};

    await expect(
      'createdAt' in newMockedProduct,
      'API mock on CreateProductRoute was umocked',
    ).ok();
  },
);
