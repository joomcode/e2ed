import {SLASHES_AT_THE_END_REGEXP, SLASHES_AT_THE_START_REGEXP} from './constants/internal';

import type {Method, Url, ZeroOrOneArg} from './types/internal';

/**
 * Abstract route with base methods.
 */
export abstract class Route<RouteParams> {
  /**
   * Type of route parameters.
   */
  // eslint-disable-next-line @typescript-eslint/naming-convention
  declare readonly __PARAMS_KEY: RouteParams;

  /**
   * Immutable route parameters.
   */
  readonly routeParams: RouteParams;

  constructor(...args: ZeroOrOneArg<RouteParams>) {
    [this.routeParams] = args as [params: RouteParams];
  }

  /**
   * Returns route params from the passed url.
   * @throws {Error} If the route does not match on the url.
   */
  static getParamsFromUrlOrThrow?(url: Url, method?: Method): unknown;

  /**
   * Returns the url of the route.
   */
  getUrl(): Url {
    const originWithoutSlashesAtTheEnd = this.getOrigin().replace(SLASHES_AT_THE_END_REGEXP, '');
    const pathWithoutSlashesAtTheStart = this.getPath().replace(SLASHES_AT_THE_START_REGEXP, '');

    return `${originWithoutSlashesAtTheEnd}/${pathWithoutSlashesAtTheStart}` as Url;
  }

  /**
   *  Returns `true` if url matches the page with given parameters, and `false` otherwise.
   */
  isMatchUrl(url: Url): boolean {
    return url.includes(this.getPath());
  }

  /**
   * Returns the origin of the route.
   */
  abstract getOrigin(): Url;

  /**
   * Returns the path-part of the route.
   */
  abstract getPath(): string;
}
