import type {Headers} from '../../types/internal';

/**
 * Get copy of headers object.
 * @internal
 */
export const getCopyOfHeaders = (headers: Headers): Headers => {
  const copyOfHeaders = {...headers};

  for (const [key, value] of Object.entries(copyOfHeaders)) {
    if (Array.isArray(value)) {
      copyOfHeaders[key] = [...value];
    }
  }

  return copyOfHeaders;
};
