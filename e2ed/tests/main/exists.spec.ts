import {navigateToPage} from 'e2ed';

fixture('main page exists');

test('search string is empty', async (t) => {
  const mainPage = await navigateToPage('main', {language: 'en'});

  await t.expect(mainPage.searchString).eql('');
});
