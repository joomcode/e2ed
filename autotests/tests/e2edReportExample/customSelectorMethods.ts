import {it} from 'autotests';
import {E2edReportExample} from 'autotests/pageObjects/pages';
import {expect} from 'e2ed';
import {navigateToPage} from 'e2ed/actions';

it('custom selector methods', {meta: {testId: '15'}}, async () => {
  const reportPage = await navigateToPage(E2edReportExample);

  await expect(reportPage.navigationRetries.exists, 'navigation retries exists').ok();

  await expect(reportPage.navigationRetriesButton.exists, ' exists').ok();

  await expect(
    reportPage.navigationRetriesButtonSelected.exists,
    'selected navigation retries button exists',
  ).ok();

  const buttonsCount = await reportPage.navigationRetriesButton.count;

  await expect(
    reportPage.navigationRetriesButtonSelected.getLocatorProperty('retry'),
    'last navigation retries button selected',
  ).eql(String(buttonsCount));

  await expect(
    reportPage.navigationRetriesButtonSelected.hasLocatorProperty('disabled'),
    'selected navigation retries button has "disabled" test prop',
  ).ok();

  await expect(
    reportPage.navigationRetriesButtonSelected.getDescription(),
    'selector has apropriate description',
  ).eql(
    '[data-testid="app-navigation-retries"].findByLocatorId(app-navigation-retries-button).filterByLocatorProperty(selected, true)',
  );
});
