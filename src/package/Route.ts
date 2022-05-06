import type {PARAMS, Url} from './types/internal';

declare const PARAMS_KEY: PARAMS;

/**
 * Abstract route with base methods.
 */
export abstract class Route<RouteParams> {
  constructor(params: RouteParams) {
    this.params = params;
  }

  /**
   * Immutable route parameters.
   */
  readonly params: RouteParams;

  readonly [PARAMS_KEY]: RouteParams;

  /**
   *  Return true if url matches the page with given parameters.
   */
  isMatchUrl(url: Url): boolean {
    return url.includes(this.getPath());
  }

  /**
   * Return the origin of the route.
   */
  abstract getOrigin(): Url;

  /**
   * Return the path-part of the route.
   */
  abstract getPath(): string;

  /**
   * Return route params object from the passed url.
   */
  getParamsFromUrl?(url: Url): RouteParams;

  /**
   * Return the url of the route.
   */
  getUrl(): Url {
    return `${this.getOrigin()}${this.getPath()}` as Url;
  }
}
