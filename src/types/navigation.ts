import type {Page} from '@playwright/test';

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
