/**
 * Object with information for navigation delay.
 * @internal
 */
export type NavigationDelay = Readonly<
  | {promise: Promise<void>; reasonsCount: number; resolve: () => void}
  | {promise: undefined; reasonsCount: number; resolve: undefined}
>;
