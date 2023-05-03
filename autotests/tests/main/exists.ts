import {it} from 'autotests';
import {Main, Search} from 'autotests/pageObjects/pages';
import {Search as SearchRoute} from 'autotests/routes/pageRoutes';
import {getFullPackConfig} from 'autotests/utils';
import {expect} from 'e2ed';
import {
  assertPage,
  navigateToPage,
  pressKey,
  scroll,
  waitForRequest,
  waitForResponse,
} from 'e2ed/actions';
import {getDocumentUrl} from 'e2ed/utils';

const language = 'en';
const searchQuery = 'foo';

it('exists', {meta: {testId: '1'}, testIdleTimeout: 35_000, testTimeout: 90_000}, async () => {
  await scroll(0, 200);

  await expect(1, 'throw an error when actual value do not fit expected value')
    .eql(2)
    .then(
      () => {
        throw new Error('the "expect" function did not throw an error');
      },
      () => undefined,
    );

  const {customPackProperties} = getFullPackConfig();

  await expect(customPackProperties.name, 'custom pack properties is correct').eql('allTests');

  const mainPage = await navigateToPage(Main, {language});

  await expect(mainPage.pageParams, 'pageParams is correct after navigateToPage').eql({language});

  await expect(mainPage.searchString, 'search string is empty').eql('');

  await mainPage.typeIntoSearchInput(searchQuery);

  await expect(mainPage.searchString, 'search string has setted value').eql(searchQuery);

  await pressKey('enter');

  const [requestWithQuery, successfulResponse] = await Promise.all([
    waitForRequest(({url}) => url.includes(searchQuery)),
    waitForResponse(({statusCode}) => statusCode === 200),
  ]);

  await expect(requestWithQuery.url, 'request with query contains search query').contains(
    searchQuery,
  );

  await expect(successfulResponse.statusCode, 'successful response has statusCode = 200').eql(200);

  const searchPage = await assertPage(Search, {searchQuery});

  await expect(searchPage.pageParams, 'pageParams is correct after assertPage').eql({searchQuery});

  const url = await getDocumentUrl();

  await expect(SearchRoute.getParamsFromUrl(url), 'page url has expected params').eql({
    searchQuery,
  });

  await expect(searchPage.mobileDevice, 'search page has right device').eql('iphone');
});
