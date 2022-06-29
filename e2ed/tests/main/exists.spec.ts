import {ClientFunction, doApiMock, expect, it} from 'e2ed';
import {assertPage, navigateToPage, pressKey, scroll} from 'e2ed/actions';
import {Main, Search} from 'e2ed/pageObjects/pages';
import {CreateProduct as CreateProductRoute} from 'e2ed/routes/apiRoutes';
import {Search as SearchRoute} from 'e2ed/routes/pageRoutes';
import {assertValueIsDefined, getCurrentUrl} from 'e2ed/utils';

import type {Request, Response} from 'e2ed/types';

const language = 'en';
const query = 'foo';

type ResponseBody = Readonly<{id: number; output: string}>;

it('exists', {meta: {testId: '1'}, testTimeout: 50_000}, async () => {
  await doApiMock(
    CreateProductRoute,
    (routeParams, {requestBody}: Request<{input: number}>): Partial<Response<ResponseBody>> => {
      const responseBody = {id: routeParams.id, output: String(requestBody.input)};

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

  await mainPage.typeIntoSearchInput(query);

  await expect(mainPage.searchString, 'search string has setted value').eql(query);

  await pressKey('enter');

  const searchPage = await assertPage(Search, {query});

  await expect(searchPage.pageParams, 'pageParams is correct after assertPage').eql({query});

  const url = await getCurrentUrl();

  assertValueIsDefined(url, 'url is defined', {pageParams: searchPage.pageParams});

  await expect(SearchRoute.getParamsFromUrl(url), 'page url has expected params').eql({
    query,
  });

  await expect(searchPage.mobileDevice, 'search page has right device').eql('iphone');

  const getMockedProduct = ClientFunction(
    () =>
      fetch('/product/135865', {
        body: JSON.stringify({input: 17}),
        headers: {
          'Content-Type': 'application/json; charset=UTF-8',
        },
        method: 'POST',
      }).then((res) => res.json() as Promise<ResponseBody>),
    'getMockedProduct',
  );

  await expect(await getMockedProduct(), 'mocked API returns correct result').eql({
    id: 135865,
    output: '17',
  });
});
