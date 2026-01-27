import {test} from 'autotests';
import {E2edReportExample} from 'autotests/pageObjects/pages';
import {expect} from 'e2ed';
import {click, navigateToPage} from 'e2ed/actions';

test('correctly check screenshots via toMatchScreenshot', {meta: {testId: '20'}}, async () => {
  const reportPage = await navigateToPage(E2edReportExample);

  await expect(reportPage.logo, 'toMatchScreenshot check screenshot').toMatchScreenshot(
    'pwoZRA8i7O',
    {mask: []},
  );

  await click(reportPage.navigationRetriesButton.nth(0));

  await expect(reportPage.retryTitle.nth(0), 'toMatchScreenshot respect options').toMatchScreenshot(
    'q3QRewTUo2',
  );
});
