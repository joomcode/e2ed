import {readFileSync} from 'fs';
import {join} from 'path';

import {E2ED_PACKAGE_DIRECTORY_PATH, READ_FILE_OPTIONS} from '../../../constants/internal';

import {e2edCreateSafeHtmlWithoutSanitize} from '../client';

import type {SafeHtml} from '../../../types/internal';

/**
 * Render SVG logo for report page.
 * @internal
 */
export const renderLogo = (): SafeHtml => {
  const pathToLogo = join(E2ED_PACKAGE_DIRECTORY_PATH, 'logo.svg');

  const logoString = readFileSync(pathToLogo, READ_FILE_OPTIONS);

  return e2edCreateSafeHtmlWithoutSanitize`
<a class="logo" href="https://www.npmjs.com/package/e2ed" aria-label="e2ed package" rel="noopener noreferrer" target="_blank" title="e2ed package">${logoString}</a>`;
};
