import {
  setPageCookiesAndNavigateToUrl,
  setPageRequestHeadersAndNavigateToUrl,
} from 'autotests/actions';
import {setPageCookies, setPageRequestHeaders} from 'autotests/context';
import {E2edReportExample as E2edReportExampleRoute} from 'autotests/routes/pageRoutes';
import {createSelector, locator} from 'autotests/selectors';
import {Page} from 'e2ed';
import {setReadonlyProperty} from 'e2ed/utils';

import {TestRunButton} from './TestRunButton';

import type {Cookie, Selector, StringHeaders, Url} from 'e2ed/types';

type CustomPageParams =
  | {pageCookies?: readonly Cookie[]; pageRequestHeaders?: StringHeaders}
  | undefined;

/**
 * The e2ed report example page.
 */
export class E2edReportExample extends Page<CustomPageParams> {
  /**
   * Page header.
   */
  readonly header: Selector = createSelector('.header');

  /**
   * Navigation bar with test retries.
   */
  readonly navigationRetries: Selector = locator('RetriesButtons');

  /**
   * Button tabs in navigation bar with test retries.
   */
  readonly navigationRetriesButton: Selector = this.navigationRetries.findByTestId('RetryButton');

  /**
   * Selected button tab in navigation bar with test retries.
   */
  readonly navigationRetriesButtonSelected: Selector =
    this.navigationRetriesButton.filterByLocatorParameter('selected', 'true');

  /**
   * Page navigation timeout.
   */
  override readonly navigationTimeout = 5_000;

  /**
   * Cookies that we set (additionally) on a page before navigating to it.
   */
  readonly pageCookies!: readonly Cookie[];

  /**
   * Request headers that we add to page request.
   */
  readonly pageRequestHeaders: StringHeaders | undefined;

  /**
   * Test run button.
   */
  readonly testRunButton: Selector = this.testRunsList.findByTestId('TestRunButton');

  /**
   * List of test runs of retry.
   */
  get testRunsList(): Selector {
    return locator('column1');
  }

  /**
   * Set page cookies and page request headers to context before navigate.
   */
  override beforeNavigateToPage(): void {
    if (this.pageCookies.length !== 0) {
      setPageCookies(this.pageCookies);
    }

    if (this.pageRequestHeaders !== undefined) {
      setPageRequestHeaders(this.pageRequestHeaders);
    }
  }

  getRoute(): E2edReportExampleRoute {
    return new E2edReportExampleRoute();
  }

  /**
   * Get `TestRunButton` hash (hashed by test `mainParams`).
   */
  async getTestRunButtons(): Promise<readonly TestRunButton[]> {
    const multiSelector = locator('TestRunButton');
    const numberOfPageObjects = await multiSelector.count;

    const buttons: TestRunButton[] = [];

    for (let index = 0; index < numberOfPageObjects; index += 1) {
      const selector = multiSelector.nth(index);

      buttons.push(new TestRunButton(selector));
    }

    return buttons;
  }

  override init(this: E2edReportExample): void {
    const {pageCookies = [], pageRequestHeaders} = this.pageParams ?? {};

    setReadonlyProperty(this, 'pageCookies', pageCookies);
    setReadonlyProperty(this, 'pageRequestHeaders', pageRequestHeaders);
  }

  override navigateToPage(url: Url): Promise<void> {
    if (this.pageRequestHeaders) {
      return setPageRequestHeadersAndNavigateToUrl(url, this.pageRequestHeaders);
    }

    return setPageCookiesAndNavigateToUrl(url, this.pageCookies);
  }

  override async waitForPageLoaded(): Promise<void> {
    await this.waitForDomContentLoaded();
  }
}
