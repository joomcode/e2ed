import type {HeaderEntry} from '../../types/internal';

/**
 * Removes header from header entries by header name.
 * @internal
 */
export const removeHeaderFromEntries = (headerEntries: HeaderEntry[], headerName: string): void => {
  const lowerCaseName = headerName.toLowerCase();

  for (let index = 0; index < headerEntries.length; index += 1) {
    const entry = headerEntries[index];

    if (entry === undefined) {
      continue;
    }

    if (entry.name.toLowerCase() === lowerCaseName) {
      headerEntries.splice(index, 1);

      index -= 1;
    }
  }
};
