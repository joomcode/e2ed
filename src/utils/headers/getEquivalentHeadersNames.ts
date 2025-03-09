import type {Headers} from '../../types/internal';

/**
 * Get equivalent header names from headers object by header name.
 */
export const getEquivalentHeadersNames = (headers: Headers, name: string): readonly string[] => {
  const allNames = Object.keys(headers);
  const equivalentNames: string[] = [];
  const lowerCaseName = name.toLowerCase();

  for (const currentName of allNames) {
    if (lowerCaseName === currentName.toLowerCase()) {
      equivalentNames.push(currentName);
    }
  }

  return equivalentNames;
};
