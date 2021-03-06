import {readFileSync} from 'node:fs';
import {join} from 'node:path';

import {E2ED_PACKAGE_DIRECTORY_PATH, READ_FILE_OPTIONS} from '../../../constants/internal';

import {createSafeHtmlWithoutSanitize} from '../client';

import type {SafeHtml} from '../../../types/internal';

/**
 * Render tag <style> with all CSS styles.
 * @internal
 */
export const renderCssStyles = (): SafeHtml => {
  const pathToCss = join(E2ED_PACKAGE_DIRECTORY_PATH, 'styles', 'report.css');

  const cssString = readFileSync(pathToCss, READ_FILE_OPTIONS);

  return createSafeHtmlWithoutSanitize`<style>${cssString}</style>`;
};
