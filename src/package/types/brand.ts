/**
 * Inner key for brand types.
 */
declare const BRAND: unique symbol;

/**
 * Brand<string, 'OrderId'> = OrderId (A string that can only be getting from the API).
 */
export type Brand<T, K extends string> = T & {readonly [BRAND]: K};

/**
 * Return true, if T is brand type.
 * IsBrand<3> = false.
 * IsBrand<Brand<3, 'foo'> = true.
 */
export type IsBrand<T> = [T] extends [{[BRAND]: unknown}] ? true : false;
