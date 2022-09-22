import type {PARAMS_KEY_TYPE, Url, ZeroOrOneArg} from './types/internal';

declare const PARAMS_KEY: PARAMS_KEY_TYPE;

/**
 * Abstract route with base methods.
 */
export abstract class Route<RouteParams> {
  /**
   * Returns route params from the passed url.
   * @throws {Error} If the route does not match on the url.
   */
  static getParamsFromUrl?(url: Url): unknown;

  constructor(...args: ZeroOrOneArg<RouteParams>) {
    [this.params] = args as [params: RouteParams];
  }

  /**
   * Immutable route parameters.
   */
  readonly params: RouteParams;

  declare readonly [PARAMS_KEY]: RouteParams;

  /**
   *  Returns true if url matches the page with given parameters.
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

  /**
   * Returns the url of the route.
   */
  getUrl(): Url {
    return `${this.getOrigin()}${this.getPath()}` as Url;
  }
}
