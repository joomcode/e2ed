import {readFileSync} from 'node:fs';
import {join} from 'node:path';

import {E2ED_PACKAGE_DIRECTORY_PATH, READ_FILE_OPTIONS} from '../../../constants/internal';

import {createSafeHtmlWithoutSanitize} from '../client';

import type {SafeHtml} from '../../../types/internal';

/**
 * Render SVG logo for report page.
 * @internal
 */
export const renderLogo = (): SafeHtml => {
  const pathToLogo = join(E2ED_PACKAGE_DIRECTORY_PATH, 'logo.svg');

  const logoString = readFileSync(pathToLogo, READ_FILE_OPTIONS);

  return createSafeHtmlWithoutSanitize`
<a class="logo" href="https://www.npmjs.com/package/e2ed" aria-label="e2ed package" rel="noopener noreferrer" target="_blank" title="e2ed package">${logoString}</a>`;
};
