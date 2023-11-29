import {setPageCookies} from 'autotests/context';
import {E2edReportExample as E2edReportExampleRoute} from 'autotests/routes/pageRoutes';
import {locatorIdSelector} from 'autotests/selectors';
import {Page} from 'e2ed';
import {setReadonlyProperty} from 'e2ed/utils';

import type {Cookie, Selector} from 'e2ed/types';

type CustomPageParams = {pageCookies?: readonly Cookie[]} | undefined;

/**
 * The e2ed report example page.
 */
export class E2edReportExample extends Page<CustomPageParams> {
  /**
   * Cookies that we set (additionally) on a page before navigating to it.
   */
  readonly pageCookies!: readonly Cookie[];

  override readonly pageStabilizationInterval = 600;

  override init(this: E2edReportExample): void {
    const {pageCookies = []} = this.pageParams ?? {};

    setReadonlyProperty(this, 'pageCookies', pageCookies);
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
   * Set page cookies to context before navigate.
   */
  override beforeNavigateToPage(): void {
    if (this.pageCookies.length !== 0) {
      setPageCookies(this.pageCookies);
    }
  }
}
