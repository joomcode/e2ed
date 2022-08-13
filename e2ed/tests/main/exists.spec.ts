import {URL} from 'node:url';

import {ClientFunction, expect, it, mockApiRoute, unmockApiRoute} from 'e2ed';
import {assertPage, navigateToPage, pressKey, scroll} from 'e2ed/actions';
import {Main, Search} from 'e2ed/pageObjects/pages';
import {CreateProduct as CreateProductRoute} from 'e2ed/routes/apiRoutes';
import {Search as SearchRoute} from 'e2ed/routes/pageRoutes';
import {assertValueIsDefined, getCurrentUrl} from 'e2ed/utils';

import type {ApiDeviceAndProductResponse, DeviceId, Url} from 'e2ed/types';

const language = 'en';
const searchQuery = 'foo';

it('exists', {meta: {testId: '1'}, testIdleTimeout: 15_000, testTimeout: 50_000}, async () => {
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

  await scroll(0, 200);

  await expect(1, 'throw an error when actual value do not fit expected value')
    .eql(2)
    .then(
      () => {
        throw new Error('the "expect" function did not throw an error');
      },
      () => undefined,
    );

  const mainPage = await navigateToPage(Main, {language});

  await expect(mainPage.pageParams, 'pageParams is correct after navigateToPage').eql({language});

  await expect(mainPage.searchString, 'search string is empty').eql('');

  await mainPage.typeIntoSearchInput(searchQuery);

  await expect(mainPage.searchString, 'search string has setted value').eql(searchQuery);

  await pressKey('enter');

  const searchPage = await assertPage(Search, {searchQuery});

  await expect(searchPage.pageParams, 'pageParams is correct after assertPage').eql({searchQuery});

  const url = await getCurrentUrl();

  assertValueIsDefined(url, 'url is defined', {pageParams: searchPage.pageParams});

  await expect(SearchRoute.getParamsFromUrl(url), 'page url has expected params').eql({
    searchQuery,
  });

  await expect(searchPage.mobileDevice, 'search page has right device').eql('iphone');

  const getMockedProduct = ClientFunction(
    () =>
      fetch('/product/135865?size=13', {
        body: JSON.stringify({cookies: [], input: 17, model: 'samsung', version: '12'}),
        headers: {
          'Content-Type': 'application/json; charset=UTF-8',
        },
        method: 'POST',
      }).then((res) => res.json() as Promise<ApiDeviceAndProductResponse['responseBody']>),
    'getMockedProduct',
  );

  const mockedProduct = await getMockedProduct();

  const {origin} = new URL(url);
  const fetchUrl = `${origin}/product/135865?size=13` as Url;

  const productRouteParams = CreateProductRoute.getParamsFromUrl(fetchUrl);

  const productRouteFromUrl = new CreateProductRoute(productRouteParams);

  await expect(mockedProduct, 'mocked API returns correct result').eql({
    id: productRouteFromUrl.params.id,
    method: productRouteFromUrl.getMethod(),
    output: '17',
    payload: {
      cookies: [],
      id: String(productRouteFromUrl.params.id) as DeviceId,
      input: 17,
      model: 'samsung',
      version: '12',
    },
    query: {size: '13'},
    url: fetchUrl,
  });

  await unmockApiRoute(CreateProductRoute);

  await expect(await getMockedProduct(), 'API mock on CreateProductRoute was umocked').eql(
    undefined,
  );
});
