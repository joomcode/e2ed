import type {ApiDevice, MobileDeviceModel} from 'autotests/types';
import type {Brand, Method, Query, Url} from 'e2ed/types';

/**
 * Product id.
 */
export type ProductId = Brand<number, 'ProductId'>;

/**
 * Product object.
 */
export type Product = Readonly<{
  id: ProductId;
  input: number;
  model: MobileDeviceModel;
  size: string;
  version: string;
}>;

/**
 * Product object returned by API.
 */
export type ApiProduct = Readonly<{
  id: ProductId;
  method: Method;
  output: string;
  payload: ApiDevice;
  query: Query;
  url: Url;
}>;
