import {URL} from 'node:url';

import {assertValueIsDefined} from '../asserts';

import {isIdentifier} from './isIdentifier';

import type {Url} from '../../types/internal';

const maxExtensionLength = 4;
const minExtensionLength = 2;

/**
 * Get url template from url (for API statistics).
 * `query` part is cut off, and all identifiers in the `pathname` are replaced with asterisks.
 * @internal
 */
export const getUrlTemplate = (url: Url): Url => {
  const {origin, pathname} = new URL(url);
  const parts = pathname.split('/');

  for (let index = 0; index < parts.length; index += 1) {
    const part = parts[index];

    assertValueIsDefined(part, 'part is defined', {url});

    if (index === parts.length - 1) {
      const indexOfPoint = part.lastIndexOf('.');
      const extensionLength = part.length - indexOfPoint - 1;

      if (
        indexOfPoint !== -1 &&
        extensionLength >= minExtensionLength &&
        extensionLength <= maxExtensionLength
      ) {
        const extension = part.slice(indexOfPoint + 1);

        // eslint-disable-next-line max-depth
        if (/^[a-z]+$/.test(extension)) {
          continue;
        }
      }
    }

    if (isIdentifier(part)) {
      parts[index] = '*';
    }
  }

  const newPathname = parts.join('/');

  return `${origin}${newPathname}` as Url;
};
