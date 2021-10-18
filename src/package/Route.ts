/* eslint-disable @typescript-eslint/no-unused-vars */

import type {Method, PARAMS} from './types/internal';

declare const PARAMS_KEY: PARAMS;

/**
 * Abstract route with base methods.
 */
export abstract class Route<RouteParams> {
  [PARAMS_KEY]: RouteParams;

  /**
   *  Return true if url matches the page with given parameters.
   */
  isMatchUrl(url: string, params?: RouteParams): boolean {
    return url.includes(this.getPath(params));
  }

  /**
   * Return the http-method of the route (for API requests).
   */
  getMethod(params?: RouteParams): Method {
    return 'GET';
  }

  /**
   * Return the origin of the route.
   */
  abstract getOrigin(params?: RouteParams): string;

  /**
   * Return the path-part of the route based on the passed parameters.
   */
  abstract getPath(params?: RouteParams): string;

  /**
   * Return route params object from the passed url.
   */
  getParams?(url: string): RouteParams;

  /**
   * Return the url of the route.
   */
  getUrl(params?: RouteParams): string {
    return `${this.getOrigin(params)}${this.getPath(params)}`;
  }
}
