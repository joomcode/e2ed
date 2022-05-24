import {CREATE_PAGE_TOKEN} from './constants/internal';
import {assertValueIsTrue} from './utils/asserts';

import type {Route} from './Route';
import type {PageClassTypeArgs, PARAMS} from './types/internal';

declare const PARAMS_KEY: PARAMS;

/**
 * Abstract page with base methods.
 */
export abstract class Page<PageParams = undefined> {
  constructor(...args: PageClassTypeArgs<PageParams>) {
    const [createPageToken, pageParams] = args;

    assertValueIsTrue(createPageToken === CREATE_PAGE_TOKEN);

    this.pageParams = pageParams as PageParams;
  }

  /**
   * Immutable page parameters.
   */
  readonly pageParams: PageParams;

  declare readonly [PARAMS_KEY]: PageParams;

  /**
   * Optional initialization (asynchronous or synchronous) of the page after
   * the synchronous constructor has run.
   */
  init?(): void | Promise<void>;

  /**
   * Optional hook that runs after asserts the page.
   */
  afterAssertPage?(): void | Promise<void>;

  /**
   * Optional hook that runs after navigation to the page.
   */
  afterNavigateToPage?(): void | Promise<void>;

  /**
   * Optional hook that runs before asserts the page.
   */
  beforeAssertPage?(): void | Promise<void>;

  /**
   * Optional hook that runs before navigation to the page (but after page initialization).
   */
  beforeNavigateToPage?(): void | Promise<void>;

  /**
   * Get page route (for navigation to the page).
   */
  abstract getRoute(): Route<unknown>;
}
