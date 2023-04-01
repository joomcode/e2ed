import type {Inner} from 'testcafe-without-typecheck';

type MainOptionsKeys = 'headers' | 'method' | 'url';

type Return = Readonly<{
  [Key in MainOptionsKeys]: Inner.RequestOptions[Key] | undefined;
}>;

/**
 * Get main request options for display in logs.
 * @internal
 */
export const getMainRequestOptions = (requestOptions: Inner.RequestOptions): Return => {
  const {headers, method, url} = requestOptions;

  return {headers, method, url};
};
