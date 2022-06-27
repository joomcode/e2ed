import {expect, it} from 'e2ed';
import {assertPage, navigateToPage, pressKey, scroll} from 'e2ed/actions';
import {Main, Search} from 'e2ed/pageObjects/pages';
import {Search as SearchRoute} from 'e2ed/routes/pageRoutes';
import {assertValueIsDefined, getCurrentUrl} from 'e2ed/utils';

const language = 'en';
const query = 'foo';

it('exists', {meta: {testId: '1'}, testTimeout: 50_000}, async () => {
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

  assertValueIsDefined(url, 'url is undefined', {pageParams: searchPage.pageParams});

  const searchRoute = new SearchRoute({query});

  await expect(searchRoute.getParamsFromUrl(url), 'page url has expected params').eql({
    query,
  });

  await expect(searchPage.mobileDevice, 'search page has right device').eql('iphone');
});
