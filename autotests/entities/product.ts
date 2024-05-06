import {createClientFunction} from 'e2ed';

import type {ApiProduct, Product} from 'autotests/types';

/**
 * Adds product.
 */
export const addProduct = createClientFunction(
  (product: Product) =>
    fetch(`https://reqres.in/api/product/${product.id}?size=${product.size}`, {
      body: JSON.stringify({
        cookies: [],
        input: product.input,
        model: product.model,
        version: product.version,
      }),
      headers: {'Content-Type': 'application/json; charset=UTF-8'},
      method: 'POST',
    }).then((res) => res.json() as Promise<ApiProduct>),
  {name: 'addProduct', timeout: 2_000},
);
