import {Route} from './Route';

/**
 * Abstract route for page.
 */
export abstract class PageRoute<Params> extends Route<Params> {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  getOrigin(params?: Params): string {
    const {E2ED_ORIGIN} = process.env;

    if (E2ED_ORIGIN) {
      return E2ED_ORIGIN.replace(/\/+$/, '');
    }

    return `http://localhost`;
  }
}
