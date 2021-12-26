import {readFileSync} from 'fs';
import {join} from 'path';

import {E2ED_PACKAGE_DIRECTORY_PATH, READ_FILE_OPTIONS} from '../../../constants/internal';

import {e2edCreateSafeHtmlWithoutSanitize} from '../client';

import type {SafeHtml} from '../../../types/internal';

/**
 * Render tag <style> with all CSS styles.
 * @internal
 */
export const renderCssStyles = (): SafeHtml => {
  const pathToCss = join(E2ED_PACKAGE_DIRECTORY_PATH, 'styles', 'report.css');

  const cssString = readFileSync(pathToCss, READ_FILE_OPTIONS);

  return e2edCreateSafeHtmlWithoutSanitize`<style>${cssString}</style>`;
};
