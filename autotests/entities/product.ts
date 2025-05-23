import {createClientFunction} from 'e2ed';

import type {ApiProduct, Product} from 'autotests/types';
import type {ClientFunction} from 'e2ed/types';

/**
 * Adds product.
 */
export const addProduct: ClientFunction<[Product], Promise<ApiProduct>> = createClientFunction(
  (product: Product) =>
    fetch(`https://dummyjson.com/products/add?id=${product.id}&size=${product.size}`, {
      body: JSON.stringify({
        cookies: [],
        input: product.input,
        model: product.model,
        title: product.model,
        version: product.version,
      }),
      headers: {'Content-Type': 'application/json; charset=UTF-8'},
      method: 'POST',
    }).then((res) => res.json() as Promise<ApiProduct>),
  {name: 'addProduct', timeout: 2_000},
);
