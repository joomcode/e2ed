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
  waitForStartOfPageLoad,
} from 'e2ed/actions';
import {OK_STATUS_CODE} from 'e2ed/constants';
import {assertFunctionThrows, getDocumentUrl} from 'e2ed/utils';

import type {Url} from 'e2ed/types';

const testScrollValue = 200;
const language = 'en';
const searchQuery = 'foo';

// eslint-disable-next-line max-statements
test('exists', {meta: {testId: '1'}, testIdleTimeout: 10_000, testTimeout: 15_000}, async () => {
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

  const urlObjectPromise = waitForStartOfPageLoad();

  const mainPage = await navigateToPage(Main, {language});

  await expect(mainPage.header.textContent, 'header text is ok').ok();

  const urlObject = await urlObjectPromise;

  await expect(getDocumentUrl(), 'waitForStartOfPageLoad returns correct url object').eql(
    urlObject.href as Url,
  );

  await expect(mainPage.pageParams, 'pageParams is correct after navigateToPage').eql({
    language,
  });

  await expect(mainPage.searchQuery, 'search query on page is empty').eql('');

  await mainPage.typeIntoSearchInput(searchQuery);

  await expect(mainPage.searchQuery, 'search query on page has setted value').eql(searchQuery);

  await expect(mainPage.body.find('input').exists, 'page contains some input element').ok();

  await assertFunctionThrows(async () => {
    await takeElementScreenshot(mainPage.body, {path: 'noScreenshot.png', timeout: 10});
  }, 'takeElementScreenshot throws an error on timeout end');

  await takeElementScreenshot(mainPage.searchInput.input, {path: 'screenshot.png'});

  const searchUrlObjectPromise = waitForStartOfPageLoad();

  const requestWithQueryPromise = waitForRequest(({url}) => url.includes(searchQuery));

  const successfulResponsePromise = waitForResponse(
    ({statusCode}) => statusCode === OK_STATUS_CODE,
  );

  await pressKey('Enter');

  const [requestWithQuery, successfulResponse] = await Promise.all([
    requestWithQueryPromise,
    successfulResponsePromise,
  ]);

  await expect(requestWithQuery.url, 'request with query contains search query').contains(
    searchQuery,
  );

  await expect(successfulResponse.statusCode, 'successful response has statusCode = 200').eql(
    OK_STATUS_CODE,
  );

  const searchPage = await assertPage(Search, {searchQuery});

  const searchUrlObject = await searchUrlObjectPromise;

  /**
   * Do not use the following pageParams and url (by getParamsFromUrlOrThrow) checks in your code.
   * These are e2ed internal checks. Use `assertPage` instead.
   */
  await expect(searchPage.pageParams, 'pageParams is correct after assertPage').eql({
    searchQuery,
  });

  const url = await getDocumentUrl();

  await expect(url, 'waitForStartOfPageLoad returns correct url object').eql(
    searchUrlObject.href as Url,
  );

  await expect(SearchRoute.getParamsFromUrlOrThrow(url), 'page url has expected params').eql({
    searchQuery,
  });

  await expect(searchPage.mobileDevice, 'search page has right device').eql('iphone');
});
