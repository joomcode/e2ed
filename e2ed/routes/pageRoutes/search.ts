import {URL} from 'url';

import {PageRoute} from 'e2ed';

type Params = Readonly<{query: string}>;

/**
 * Route of the Search page.
 */
class Search extends PageRoute<Params> {
  // eslint-disable-next-line class-methods-use-this
  override getParams(url: string): Params {
    const {searchParams} = new URL(url);
    const query = searchParams.get('q') || '';

    return {query};
  }

  getPath({query}: Params): string {
    return `/search?q=${query}`;
  }
}

export const search = new Search();
