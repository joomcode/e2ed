import {PageRoute} from 'e2ed';

type Params = Readonly<{query: string}>;

/**
 * Route of the Search page.
 */
class Search extends PageRoute<Params> {
  getPath({query}: Params): string {
    return `/search?q=${query}`;
  }
}

export const search = new Search();
