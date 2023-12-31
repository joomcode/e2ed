import {setPageCookies, setPageRequestHeaders} from 'autotests/context';
import {E2edReportExample as E2edReportExampleRoute} from 'autotests/routes/pageRoutes';
import {locatorIdSelector} from 'autotests/selectors';
import {Page} from 'e2ed';
import {setReadonlyProperty} from 'e2ed/utils';

import type {Cookie, Headers, Selector} from 'e2ed/types';

type CustomPageParams = {pageCookies?: readonly Cookie[]; pageRequestHeaders?: Headers} | undefined;

/**
 * The e2ed report example page.
 */
export class E2edReportExample extends Page<CustomPageParams> {
  /**
   * Cookies that we set (additionally) on a page before navigating to it.
   */
  readonly pageCookies!: readonly Cookie[];

  /**
   * Request headers that we add to page request.
   */
  readonly pageRequestHeaders: Headers | undefined;

  override readonly pageStabilizationInterval = 600;

  override init(this: E2edReportExample): void {
    const {pageCookies = [], pageRequestHeaders} = this.pageParams ?? {};

    setReadonlyProperty(this, 'pageCookies', pageCookies);
    setReadonlyProperty(this, 'pageRequestHeaders', pageRequestHeaders);
  }

  getRoute(): E2edReportExampleRoute {
    return new E2edReportExampleRoute();
  }

  /** Navigation bar with test retries */
  readonly navigationRetries: Selector = locatorIdSelector('app-navigation-retries');

  /** Button tabs in navigation bar with test retries */
  readonly navigationRetriesButton: Selector = this.navigationRetries.findByLocatorId(
    'app-navigation-retries-button',
  );

  /** Selected button tab in navigation bar with test retries */
  readonly navigationRetriesButtonSelected: Selector =
    this.navigationRetriesButton.filterByLocatorParameter('selected', 'true');

  /**
   * List of test runs of retry.
   */
  readonly testRunsList: Selector = locatorIdSelector('app-column1');

  /**
   * Test run button.
   */
  readonly testRunButton: Selector = this.testRunsList.findByLocatorId('app-retries-retry-button');

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
}
