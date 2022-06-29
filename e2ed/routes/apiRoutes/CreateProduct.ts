import {ApiRoute} from 'e2ed/routes';
import {assertValueIsTrue} from 'e2ed/utils';

import type {Url} from 'e2ed/types';

type Params = Readonly<{id: number}>;

const pathStart = '/product/';

/**
 * Test API route for creating a product.
 */
export class CreateProduct extends ApiRoute<Params> {
  static override getParamsFromUrl(url: Url): Params {
    const urlObject = new URL(url);

    assertValueIsTrue(
      urlObject.pathname.startsWith(pathStart),
      'url pathname starts with correct path',
      {urlObject},
    );

    const id = Number(urlObject.pathname.slice(pathStart.length));

    assertValueIsTrue(Number.isInteger(id), 'url has correct id', {id, urlObject});

    return {id};
  }

  getMethod(): 'POST' {
    return 'POST';
  }

  getPath(): string {
    const {id} = this.params;

    return `${pathStart}${id}`;
  }
}
