import {ClientFunction, doApiMock, expect, it} from 'e2ed';
import {assertPage, navigateToPage, pressKey, scroll} from 'e2ed/actions';
import {Main, Search} from 'e2ed/pageObjects/pages';
import {CreateProduct as CreateProductRoute} from 'e2ed/routes/apiRoutes';
import {Search as SearchRoute} from 'e2ed/routes/pageRoutes';
import {assertValueIsDefined, getCurrentUrl} from 'e2ed/utils';

import type {Method, Query, Request, Response, Url} from 'e2ed/types';

const language = 'en';
const searchQuery = 'foo';

type ResponseBody = Readonly<{id: number; method: Method; output: string; query: Query; url: Url}>;

it('exists', {meta: {testId: '1'}, testTimeout: 50_000}, async () => {
  await doApiMock(
    CreateProductRoute,
    (
      routeParams,
      {method, query, requestBody, url}: Request<{input: number}>,
    ): Partial<Response<ResponseBody>> => {
      const responseBody = {
        id: routeParams.id,
        method,
        output: String(requestBody.input),
        query,
        url,
      };

      return {responseBody};
    },
  );

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
        body: JSON.stringify({input: 17}),
        headers: {
          'Content-Type': 'application/json; charset=UTF-8',
        },
        method: 'POST',
      }).then((res) => res.json() as Promise<ResponseBody>),
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
    query: {size: '13'},
    url: fetchUrl,
  });
});
