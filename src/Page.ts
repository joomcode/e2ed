// eslint-disable-next-line import/no-internal-modules
import {waitForAllRequestsComplete, waitForInterfaceStabilization} from './actions/waitFor';
import {CREATE_PAGE_TOKEN} from './constants/internal';
import {assertValueIsTrue} from './utils/asserts';
import {getFullPackConfig} from './utils/getFullPackConfig';

import type {PageRoute} from './PageRoute';
import type {AsyncVoid, PageClassTypeArgs, PARAMS_KEY_TYPE} from './types/internal';

/**
 * Inner key for parameters type.
 */
declare const PARAMS_KEY: PARAMS_KEY_TYPE;

/**
 * Abstract page with base methods.
 */
export abstract class Page<PageParams = undefined> {
  constructor(...args: PageClassTypeArgs<PageParams>) {
    const [createPageToken, pageParams] = args;

    assertValueIsTrue(createPageToken === CREATE_PAGE_TOKEN, 'createPageToken is correct', {
      createPageToken,
      pageParams,
    });

    this.pageParams = pageParams as PageParams;

    const {pageStabilizationInterval} = getFullPackConfig();

    this.pageStabilizationInterval = pageStabilizationInterval;
  }

  /**
   * Immutable page parameters.
   */
  readonly pageParams: PageParams;

  /**
   * After navigating to the page, `e2ed` will wait until
   * the page is stable for the specified time in millisecond,
   * and only after that it will consider the page loaded.
   */
  readonly pageStabilizationInterval: number;

  /**
   * Type of page parameters.
   */
  declare readonly [PARAMS_KEY]: PageParams;

  /**
   * Optional initialization (asynchronous or synchronous) of the page after
   * the synchronous constructor has run.
   */
  init?(): AsyncVoid;

  /**
   * Optional hook that runs after asserts the page.
   */
  afterAssertPage?(): AsyncVoid;

  /**
   * Optional hook that runs after navigation to the page.
   */
  afterNavigateToPage?(): AsyncVoid;

  /**
   * Optional hook that runs before asserts the page.
   */
  beforeAssertPage?(): AsyncVoid;

  /**
   * Optional hook that runs before navigation to the page (but after page initialization).
   */
  beforeNavigateToPage?(): AsyncVoid;

  /**
   * Get page route (for navigation to the page).
   */
  abstract getRoute(): PageRoute<unknown>;

  async waitForPageLoaded(): Promise<void> {
    await waitForAllRequestsComplete(() => true);

    await waitForInterfaceStabilization(this.pageStabilizationInterval);
  }
}
