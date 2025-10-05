import {readFileSync} from 'node:fs';
import {join} from 'node:path';

import {INSTALLED_E2ED_DIRECTORY_PATH, READ_FILE_OPTIONS} from '../../../constants/internal';

import {SafeHtml} from '../client';

declare const jsx: JSX.Runtime;

/**
 * Renders SVG logo for report page.
 * @internal
 */
export const Logo: JSX.Component = () => {
  const pathToLogo = join(INSTALLED_E2ED_DIRECTORY_PATH, 'logo.svg');

  const logoString = readFileSync(pathToLogo, READ_FILE_OPTIONS);

  return (
    <a
      class="logo"
      href="https://www.npmjs.com/package/e2ed"
      rel="noreferrer"
      target="_blank"
      title="e2ed package"
      aria-label="e2ed package"
    >
      <SafeHtml withoutSanitize={logoString} />
    </a>
  );
};
