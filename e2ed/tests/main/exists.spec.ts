import {assertPage, expect, it, navigateToPage} from 'e2ed';
import {pressKey, scroll} from 'e2ed/actions';
import {assertValueIsDefined, getCurrentUrl} from 'e2ed/utils';

const language = 'en';
const query = 'foo';

it('exists', {meta: {testId: '1'}}, async () => {
  await scroll(0, 200);

  await expect(1, 'throw an error when actual value do not fit expected value')
    .eql(2)
    .then(
      () => {
        throw new Error('the "expect" function did not throw an error');
      },
      () => undefined,
    );

  const mainPage = await navigateToPage('main', {language});

  await expect(mainPage.pageParams, 'pageParams is correct after navigateToPage').eql({language});

  await expect(mainPage.routeParams, 'routeParams is correct after navigateToPage').eql({language});

  await expect(mainPage.searchString, 'search string is empty').eql('');

  await mainPage.typeIntoSearchInput(query);

  await expect(mainPage.searchString, 'search string has setted value').eql(query);

  await pressKey('enter');

  const searchPage = await assertPage('search', {query});

  await expect(searchPage.pageParams, 'pageParams is correct after assertPage').eql(undefined);

  await expect(searchPage.routeParams, 'routeParams is correct after assertPage').eql({query});

  const url = await getCurrentUrl();

  assertValueIsDefined(url);

  await expect(searchPage.route.getParamsFromUrl(url), 'page url has expected params').eql({
    query,
  });

  await expect(searchPage.mobileDevice, 'search page has right device').eql('iphone');
});
