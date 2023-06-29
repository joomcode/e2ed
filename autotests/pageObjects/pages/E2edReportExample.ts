import {setPageCookies} from 'autotests/context';
import {E2edReportExample as E2edReportExampleRoute} from 'autotests/routes/pageRoutes';
import {Page} from 'e2ed';
import {setReadonlyProperty} from 'e2ed/utils';

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

  override readonly pageStabilizationInterval = 1500;

  override init(): void {
    const {pageCookies = []} = this.pageParams ?? {};

    setReadonlyProperty(this as E2edReportExample, 'pageCookies', pageCookies);
  }

  getRoute(): E2edReportExampleRoute {
    return new E2edReportExampleRoute();
  }

  /**
   * Set page cookies to context before navigate.
   */
  override beforeNavigateToPage(): void {
    if (this.pageCookies.length !== 0) {
      setPageCookies(this.pageCookies);
    }
  }
}
