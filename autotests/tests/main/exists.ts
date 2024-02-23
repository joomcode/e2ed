import {test} from 'autotests';
import {Main, Search} from 'autotests/pageObjects/pages';
import {Search as SearchRoute} from 'autotests/routes/pageRoutes';
import {getFullPackConfig} from 'autotests/utils';
import {expect} from 'e2ed';
import {
  assertPage,
  navigateToPage,
  pressKey,
  scroll,
  takeElementScreenshot,
  waitForRequest,
  waitForResponse,
} from 'e2ed/actions';
import {OK_STATUS_CODE} from 'e2ed/constants';
import {assertFunctionThrows, getDocumentUrl} from 'e2ed/utils';

const testScrollValue = 200;
const language = 'en';
const searchQuery = 'foo';

test('exists', {meta: {testId: '1'}, testIdleTimeout: 35_000, testTimeout: 90_000}, async () => {
  await scroll(0, testScrollValue);

  assertFunctionThrows(() => {
    void window.document;
  }, 'assertFunctionThrows works');

  const {customPackProperties} = getFullPackConfig();

  await expect(customPackProperties.name, 'custom pack properties is correct').eql('allTests');

  await expect(
    customPackProperties.internalPackRunId,
    'dynamic custom pack properties is correct',
  ).gt(0);

  const mainPage = await navigateToPage(Main, {language});

  await expect(mainPage.pageParams, 'pageParams is correct after navigateToPage').eql({
    language,
  });

  await expect(mainPage.searchQuery, 'search query on page is empty').eql('');

  await mainPage.typeIntoSearchInput(searchQuery);

  await expect(mainPage.searchQuery, 'search query on page has setted value').eql(searchQuery);

  await expect(mainPage.body.find('input').exists, 'page contains some input element').ok();

  await assertFunctionThrows(async () => {
    await takeElementScreenshot(mainPage.body, 'screenshot.png', {timeout: 100});
  }, 'takeElementScreenshot throws an error on timeout end');

  const requestsPromises = Promise.all([
    waitForRequest(({url}) => url.includes(searchQuery)),
    waitForResponse(({statusCode}) => statusCode === OK_STATUS_CODE),
  ]);

  await pressKey('enter', {stabilizationInterval: 300});

  const [requestWithQuery, successfulResponse] = await requestsPromises;

  await expect(requestWithQuery.url, 'request with query contains search query').contains(
    searchQuery,
  );

  await expect(successfulResponse.statusCode, 'successful response has statusCode = 200').eql(
    OK_STATUS_CODE,
  );

  const searchPage = await assertPage(Search, {searchQuery});

  /**
   * Do not use the following pageParams and url (by getParamsFromUrl) checks in your code.
   * These are e2ed internal checks. Use `assertPage` instead.
   */
  await expect(searchPage.pageParams, 'pageParams is correct after assertPage').eql({
    searchQuery,
  });

  const url = await getDocumentUrl();

  await expect(SearchRoute.getParamsFromUrl(url), 'page url has expected params').eql({
    searchQuery,
  });

  await expect(searchPage.mobileDevice, 'search page has right device').eql('iphone');
});
