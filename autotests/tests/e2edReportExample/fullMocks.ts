import {test} from 'autotests';
import {addProduct} from 'autotests/entities';
import {E2edReportExample} from 'autotests/pageObjects/pages';
import {CreateProduct as CreateProductRoute} from 'autotests/routes/apiRoutes';
import {expect} from 'e2ed';
import {mockApiRoute, navigateToPage, unmockApiRoute} from 'e2ed/actions';

import type {DeviceId, Product, ProductId} from 'autotests/types';
import type {Url} from 'e2ed/types';

test('full mocks works correctly', {enableCsp: false, meta: {testId: '18'}}, async () => {
  await navigateToPage(E2edReportExample);

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

  const productId = Number('135865') as ProductId;
  const product: Product = {
    id: productId,
    input: 17,
    model: 'samsung',
    size: '13',
    version: '12',
  };

  const mockedProduct = await addProduct(product);

  const fetchUrl = `https://dummyjson.com/products/add?id=${productId}&size=${product.size}` as Url;

  await expect(mockedProduct, 'mocked API returns correct result').eql({
    id: productId,
    method: 'POST',
    output: String(product.input),
    payload: {
      cookies: [],
      id: String(productId) as DeviceId,
      input: product.input,
      model: product.model,
      title: product.model,
      version: product.version,
    },
    query: {id: String(productId), size: product.size},
    url: fetchUrl,
  });

  await unmockApiRoute(CreateProductRoute);

  const newMockedProduct = await addProduct(product);

  await expect(
    'title' in newMockedProduct && newMockedProduct.title === product.model,
    'API mock on CreateProductRoute was umocked',
  ).ok();
});
