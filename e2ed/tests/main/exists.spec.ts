import {expect, it, navigateToPage} from 'e2ed';
import {scroll} from 'e2ed/actions';

it('exists', {meta: {testId: '1'}}, async () => {
  await scroll(0, 200);

  const mainPage = await navigateToPage('main', {language: 'en'});

  await expect(mainPage.searchString, 'search string is empty').eql('');

  await mainPage.typeIntoSearchInput('foo');

  await expect(mainPage.searchString, 'search string has setted value').eql('foo');
});
