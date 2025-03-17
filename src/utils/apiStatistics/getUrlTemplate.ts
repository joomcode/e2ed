import {extname} from 'node:path';
import {URL} from 'node:url';

import {assertValueIsDefined} from '../asserts';

import {isIdentifier} from './isIdentifier';

import type {Url} from '../../types/internal';

const maxExtensionLength = 4;
const minExtensionLength = 2;

type Return = Readonly<{
  hasExtension: boolean;
  urlTemplate: Url;
}>;

/**
 * Get url template from url (for API statistics).
 * `query` part is cut off, and all identifiers in the `pathname` are replaced with asterisks.
 * @internal
 */
export const getUrlTemplate = (url: Url): Return => {
  const {origin, pathname} = new URL(url);
  const parts = pathname.split('/');

  const extension = extname(pathname).slice(1);

  if (
    extension.length >= minExtensionLength &&
    extension.length <= maxExtensionLength &&
    /^[a-z]+$/.test(extension)
  ) {
    return {hasExtension: true, urlTemplate: `${origin}${pathname}` as Url};
  }

  for (let index = 0; index < parts.length; index += 1) {
    const part = parts[index];

    assertValueIsDefined(part, 'part is defined', {url});

    if (isIdentifier(part)) {
      parts[index] = '*';
    }
  }

  const newPathname = parts.join('/');

  return {hasExtension: false, urlTemplate: `${origin}${newPathname}` as Url};
};
