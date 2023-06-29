import type {RequestOptions} from '../../types/internal';

type MainOptionsKeys = 'headers' | 'method' | 'url';

type Return = Readonly<{
  [Key in MainOptionsKeys]: RequestOptions[Key] | undefined;
}>;

/**
 * Get main request options for display in logs.
 * @internal
 */
export const getMainRequestOptions = (requestOptions: RequestOptions): Return => {
  const {headers, method, url} = requestOptions;

  return {headers, method, url};
};
