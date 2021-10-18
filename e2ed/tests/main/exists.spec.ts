import {assertPage, expect, it, navigateToPage} from 'e2ed';
import {pressKey, scroll} from 'e2ed/actions';
import {getCurrentUrl} from 'e2ed/utils';

const query = 'foo';

it('exists', {meta: {testId: '1'}}, async () => {
  await scroll(0, 200);

  const mainPage = await navigateToPage('main', {language: 'en'});

  await expect(mainPage.searchString, 'search string is empty').eql('');

  await mainPage.typeIntoSearchInput(query);

  await expect(mainPage.searchString, 'search string has setted value').eql(query);

  await pressKey('enter');

  const searchPage = await assertPage('search', {query});
  const url = await getCurrentUrl();

  await expect(searchPage.route.getParams(url || ''), 'page url has expected params').eql({
    query,
  });

  await expect(searchPage.mobileDevice, 'search page has right device').eql('iphone');
});
