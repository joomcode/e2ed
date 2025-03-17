import {test} from 'autotests';
import {E2edReportExample} from 'autotests/pageObjects/pages';
import {TestRunButton} from 'autotests/pageObjects/pages/E2edReportExample';
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

  const testRunButtons = await reportPage.getTestRunButtons();

  const retriesButtonsCount = await reportPage.navigationRetriesButton.count;

  const testRunButtonsCount = Object.keys(testRunButtons).length;

  await expect(reportPage.testRunButton.count, 'getTestRunButtons find all buttons').eql(
    testRunButtonsCount,
  );

  let buttonsIndex = 0;

  for (const testRunButton of Object.values(testRunButtons)) {
    const selector = reportPage.testRunButton.nth(buttonsIndex);

    const mainParams = await selector.find(TestRunButton.parameters).textContent;

    await expect(testRunButton.parameters.textContent, 'mainParams of test run button correct').eql(
      mainParams,
    );

    buttonsIndex += 1;
  }

  await expect(
    reportPage.navigationRetriesButtonSelected.getLocatorParameter('retry'),
    'last navigation retries button selected',
  ).eql(String(retriesButtonsCount - 1));

  await expect(
    reportPage.navigationRetriesButtonSelected.hasLocatorParameter('disabled'),
    'selected navigation retries button has "disabled" locator parameter',
  ).ok();

  await expect(
    reportPage.navigationRetriesButtonSelected.description,
    'selector has apropriate description',
  ).eql(
    '[data-testid="RetriesButtons"].find([data-testid="RetryButton"]).filter([data-test-selected="true"])',
  );

  await click(reportPage.navigationRetriesButton.nth(0));

  await expect(
    reportPage.testRunButton.nth(2).getLocatorParameter('status'),
    'nested selectors also get custom methods',
  ).match(/failed|passed/);
});
