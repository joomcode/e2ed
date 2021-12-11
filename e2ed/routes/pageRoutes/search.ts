import {URL} from 'url';

import {PageRoute} from 'e2ed';

import type {Url} from 'e2ed/types';

type Params = Readonly<{query: string}>;

/**
 * Route of the Search page.
 */
class Search extends PageRoute<Params> {
  override getParamsFromUrl(url: Url): Params {
    const {searchParams} = new URL(url);
    const query = searchParams.get('q') || '';

    return {query};
  }

  getPath({query}: Params): string {
    return `/search?q=${query}`;
  }
}

export const search = new Search();
