import type {Method} from '../types';

/**
 * Abstract route with base methods.
 */
export abstract class Route<Params = unknown> {
  /**
   *  Return true if url matches the page (with any parameters).
   */
  isMatchUrl(url: string): boolean {
    return url.includes(this.getPath());
  }

  /**
   * Return the http-method of the route (for API requests).
   */
  getMethod(params?: Params): Method {
    return 'GET';
  }

  /**
   * Return the origin of the route.
   */
  abstract getOrigin(params?: Params): string;

  /**
   * Return the path-part of the route based on the passed parameters.
   */
  abstract getPath(params?: Params): string;

  /**
   * Return the url of the route.
   */
  getUrl(params?: Params): string {
    return `${this.getOrigin(params)}${this.getPath(params)}`;
  }
}
