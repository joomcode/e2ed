import {test} from 'autotests';
import {addProduct} from 'autotests/entities';
import {CreateProduct as CreateProductRoute} from 'autotests/routes/apiRoutes';
import {expect} from 'e2ed';
import {mockApiRoute, unmockApiRoute} from 'e2ed/actions';

import type {DeviceId, Product, ProductId} from 'autotests/types';
import type {Url} from 'e2ed/types';

test(
  'mockApiRoute correctly intercepts requests, and unmockApiRoute cancels the interception',
  {meta: {testId: '6'}, testIdleTimeout: 4_000},
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

    const productId = 135865;
    const product: Product = {
      id: productId as ProductId,
      input: 17,
      model: 'samsung',
      size: '13',
      version: '12',
    };

    const mockedProduct = await addProduct(product);

    const fetchUrl = `https://reqres.in/api/product/${productId}?size=${product.size}` as Url;

    const productRouteParams = CreateProductRoute.getParamsFromUrlOrThrow(fetchUrl);

    const productRouteFromUrl = new CreateProductRoute(productRouteParams);

    await expect(productRouteFromUrl.routeParams.id, 'route has correct params').eql(
      productId as ProductId,
    );

    await expect(mockedProduct, 'mocked API returns correct result').eql({
      id: productRouteFromUrl.routeParams.id,
      method: productRouteFromUrl.getMethod(),
      output: String(product.input),
      payload: {
        cookies: [],
        id: String(productRouteFromUrl.routeParams.id) as DeviceId,
        input: product.input,
        model: product.model,
        version: product.version,
      },
      query: {size: product.size},
      url: fetchUrl,
    });

    await unmockApiRoute(CreateProductRoute);

    const newMockedProduct = await addProduct(product);

    await expect(
      'createdAt' in newMockedProduct,
      'API mock on CreateProductRoute was umocked',
    ).ok();
  },
);
