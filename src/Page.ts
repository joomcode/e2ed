// eslint-disable-next-line import/no-internal-modules
import {navigateToUrl} from './actions/navigateToUrl';
// eslint-disable-next-line import/no-internal-modules
import {waitForStartOfPageLoad} from './actions/waitFor/waitForStartOfPageLoad';
import {CREATE_PAGE_TOKEN} from './constants/internal';
import {assertValueIsTrue} from './utils/asserts';
import {getFullPackConfig} from './utils/config';
import {reloadDocument} from './utils/document';
import {getPlaywrightPage} from './useContext';

import type {PageRoute} from './PageRoute';
import type {AsyncVoid, PageClassTypeArgs, Url} from './types/internal';

/**
 * Abstract page with base methods.
 */
export abstract class Page<PageParams = undefined> {
  /**
   * Type of page parameters.
   */
  // eslint-disable-next-line @typescript-eslint/naming-convention
  declare readonly __PARAMS_KEY: PageParams;

  /**
   * Default maximum interval (in milliseconds) between requests.
   * After navigating to the page, `e2ed` will wait until
   * all requests will complete, and only after that it will consider the page loaded.
   * If there are no new requests for more than this interval,
   * then we will consider that all requests completes
   * The default value is taken from the corresponding field of the pack config.
   */
  readonly maxIntervalBetweenRequestsInMs: number;

  /**
   * Immutable page parameters.
   */
  readonly pageParams: PageParams;

  /**
   * After navigating to the page, `e2ed` will wait until
   * the page is stable for the specified time in millisecond,
   * and only after that it will consider the page loaded.
   * The default value is taken from the corresponding field of the pack config.
   */
  readonly pageStabilizationInterval: number;

  constructor(...args: PageClassTypeArgs<PageParams>) {
    const [createPageToken, pageParams] = args;

    assertValueIsTrue(createPageToken === CREATE_PAGE_TOKEN, 'createPageToken is correct', {
      createPageToken,
      pageParams,
    });

    this.pageParams = pageParams as PageParams;

    const {
      pageStabilizationInterval,
      waitForAllRequestsComplete: {maxIntervalBetweenRequestsInMs},
    } = getFullPackConfig();

    this.maxIntervalBetweenRequestsInMs = maxIntervalBetweenRequestsInMs;
    this.pageStabilizationInterval = pageStabilizationInterval;
  }

  /**
   * Optional hook that runs after asserts the page.
   */
  afterAssertPage?(): AsyncVoid;

  /**
   * Optional hook that runs after navigation to the page.
   */
  afterNavigateToPage?(): AsyncVoid;

  /**
   * Optional hook that runs after reload to the page.
   */
  afterReloadPage?(): AsyncVoid;

  /**
   * Asserts that we are on the expected page by `isMatch` flage.
   * `isMatch` equals `true`, if url matches the page with given parameters, and `false` otherwise.
   */
  assertPage(isMatch: boolean, documentUrl: Url): AsyncVoid {
    assertValueIsTrue(isMatch, `the document url matches the page "${this.constructor.name}"`, {
      documentUrl,
      page: this,
    });
  }

  /**
   * Optional hook that runs before asserts the page.
   */
  beforeAssertPage?(): AsyncVoid;

  /**
   * Optional hook that runs before navigation to the page (but after page initialization).
   */
  beforeNavigateToPage?(): AsyncVoid;

  /**
   * Optional hook that runs before reload to the page.
   */
  beforeReloadPage?(): AsyncVoid;

  /**
   * Optional initialization (asynchronous or synchronous) of the page after
   * the synchronous constructor has run.
   */
  init?(): AsyncVoid;

  /**
   * Navigates to the page by url.
   */
  navigateToPage(url: Url): Promise<void> {
    return navigateToUrl(url, {skipLogs: true});
  }

  /**
   * Reloads the page.
   */
  async reloadPage(): Promise<void> {
    const startOfPageLoad = waitForStartOfPageLoad();

    await reloadDocument();

    await startOfPageLoad;
  }

  /**
   * Waits for `DOMContentLoaded` event.
   */
  async waitForDomContentLoaded(): Promise<void> {
    const playwrightPage = getPlaywrightPage();

    await playwrightPage.waitForLoadState('domcontentloaded');
  }

  /**
   * Waits for page loaded.
   */
  async waitForPageLoaded(): Promise<void> {
    await this.waitForDomContentLoaded();
  }

  /**
   * Get page route (for navigation to the page).
   */
  abstract getRoute(): PageRoute<unknown>;
}
