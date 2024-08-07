import {test} from 'autotests';
import {E2edReportExample} from 'autotests/pageObjects/pages';
import {expect} from 'e2ed';
import {click, navigateToPage} from 'e2ed/actions';

test('selector custom methods', {meta: {testId: '15'}}, async () => {
  const reportPage = await navigateToPage(E2edReportExample);

  await expect(reportPage.navigationRetries.exists, 'navigation retries exists').ok();

  await expect(reportPage.navigationRetriesButton.exists, 'navigation retries button exists').ok();

  await expect(
    reportPage.navigationRetriesButtonSelected.exists,
    'selected navigation retries button exists',
  ).ok();

  const testRunButtonsHash = await reportPage.getTestRunButtons();

  const retriesButtonsCount = await reportPage.navigationRetriesButton.count;

  const testRunButtonsCount = Object.keys(testRunButtonsHash).length;

  await expect(reportPage.testRunButton.count, 'getTestRunButtons find all buttons').eql(
    testRunButtonsCount,
  );

  let buttonsIndex = 0;

  for (const testRunButton of Object.values(testRunButtonsHash)) {
    const selector = reportPage.testRunButton.nth(buttonsIndex);
    const mainParams = await selector.findByLocatorId(String(testRunButton.locator.parameters))
      .textContent;

    await expect(testRunButton.parameters.textContent, 'mainParams of test run button correct').eql(
      mainParams,
    );

    buttonsIndex += 1;
  }

  await expect(
    reportPage.navigationRetriesButtonSelected.getLocatorParameter('retry'),
    'last navigation retries button selected',
  ).eql(String(retriesButtonsCount));

  await expect(
    reportPage.navigationRetriesButtonSelected.hasLocatorParameter('disabled'),
    'selected navigation retries button has "disabled" locator parameter',
  ).ok();

  await expect(
    reportPage.navigationRetriesButtonSelected.getDescription(),
    'selector has apropriate description',
  ).eql(
    '[data-testid="app-navigation-retries"].findByLocatorId(app-navigation-retries-button).filterByLocatorParameter(selected, true)',
  );

  await click(reportPage.navigationRetriesButton);

  await expect(
    reportPage.testRunButton.nth(2).getLocatorParameter('status'),
    'nested selectors also get custom methods',
  ).match(/broken|passed/);
});
