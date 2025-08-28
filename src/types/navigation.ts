import type {Page} from '@playwright/test';

import type {StatusCode} from './http';

/**
 * Options for `navigateToUrl` action.
 */
export type NavigateToUrlOptions = Readonly<{skipLogs?: boolean} & Parameters<Page['goto']>[1]>;

/**
 * Object with information for navigation delay.
 * @internal
 */
export type NavigationDelay = Readonly<
  | {promise: Promise<void>; reasonsCount: number; resolve: () => void}
  | {promise: undefined; reasonsCount: number; resolve: undefined}
>;

/**
 * The object returned by navigation functions.
 */
export type NavigationReturn = Readonly<{statusCode: StatusCode | undefined}>;
