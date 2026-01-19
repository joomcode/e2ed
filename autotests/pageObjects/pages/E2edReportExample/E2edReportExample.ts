import {
  setPageCookiesAndNavigateToUrl,
  setPageRequestHeadersAndNavigateToUrl,
} from 'autotests/actions';
import {setPageCookies, setPageRequestHeaders} from 'autotests/context';
import {E2edReportExample as E2edReportExampleRoute} from 'autotests/routes/pageRoutes';
import {locator} from 'autotests/selectors';
import {Page} from 'e2ed';
import {click} from 'e2ed/actions';
import {setReadonlyProperty} from 'e2ed/utils';

import {TestRunButton} from './TestRunButton';

import type {Cookie, NavigationReturn, Selector, StringHeaders, Url} from 'e2ed/types';

type CustomPageParams =
  | {pageCookies?: readonly Cookie[]; pageRequestHeaders?: StringHeaders}
  | undefined;

/**
 * The e2ed report example page.
 */
export class E2edReportExample extends Page<CustomPageParams> {
  /**
   * Page navigation timeout.
   */
  static override readonly navigationTimeout = 5_000;

  /**
   * Page header.
   */
  readonly header: Selector = locator('header');

  /**
   * Logo of `e2ed` in page header.
   */
  readonly logo: Selector = locator('logo');

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
    return locator('column-2');
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

  async clickLogo(): Promise<void> {
    await click(this.logo);
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

  override navigateToPage(url: Url): Promise<NavigationReturn> {
    if (this.pageRequestHeaders) {
      return setPageRequestHeadersAndNavigateToUrl(url, {
        pageRequestHeaders: this.pageRequestHeaders,
        timeout: E2edReportExample.navigationTimeout,
      });
    }

    return setPageCookiesAndNavigateToUrl(url, {
      pageCookies: this.pageCookies,
      timeout: E2edReportExample.navigationTimeout,
    });
  }

  override async waitForPageLoaded(): Promise<void> {
    await this.waitForDomContentLoaded();
  }
}
