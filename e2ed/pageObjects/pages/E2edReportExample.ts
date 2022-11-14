import {Page} from 'e2ed';
import {setPageCookies} from 'e2ed/context';
import {E2edReportExample as E2edReportExampleRoute} from 'e2ed/routes/pageRoutes';

import type {Cookie} from 'e2ed/types';

type CustomPageParams = {pageCookies?: readonly Cookie[]} | undefined;

/**
 * The e2ed report example page.
 */
export class E2edReportExample extends Page<CustomPageParams> {
  /**
   * Cookies that we set (additionally) on a page before navigating to it.
   */
  readonly pageCookies!: readonly Cookie[];

  override init(): void {
    const {pageCookies = []} = this.pageParams ?? {};

    Object.assign<E2edReportExample, Partial<E2edReportExample>>(this, {pageCookies});
  }

  getRoute(): E2edReportExampleRoute {
    return new E2edReportExampleRoute();
  }

  override readonly pageStabilizationInterval = 20_000;

  /**
   * Set page cookies to context before navigate.
   */
  override beforeNavigateToPage(): void {
    if (this.pageCookies.length !== 0) {
      setPageCookies(this.pageCookies);
    }
  }
}
