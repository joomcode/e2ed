import {test} from 'autotests';
import {E2edReportExample} from 'autotests/pageObjects/pages';
import {expect} from 'e2ed';
import {navigateToPage} from 'e2ed/actions';

test('correctly check screenshots via toMatchScreenshot', {meta: {testId: '20'}}, async () => {
  const reportPage = await navigateToPage(E2edReportExample);

  await expect(
    reportPage.navigationRetries,
    'toMatchScreenshot check screenshot',
  ).toMatchScreenshot('');
});
