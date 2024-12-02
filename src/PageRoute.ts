import {SLASHES_AT_THE_END_REGEXP} from './constants/internal';
import {Route} from './Route';

import type {Url} from './types/internal';

/**
 * Abstract route for page.
 */
export abstract class PageRoute<Params = undefined> extends Route<Params> {
  /**
   * Returns the origin of the route.
   */
  getOrigin(): Url {
    const {E2ED_ORIGIN} = process.env;

    // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
    if (E2ED_ORIGIN) {
      return E2ED_ORIGIN.replace(SLASHES_AT_THE_END_REGEXP, '') as Url;
    }

    return 'http://localhost' as Url;
  }
}
