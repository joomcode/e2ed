/**
 * @file Writes actual Playwright version to `installBrowsers.sh` script.
 */

import {readFileSync, writeFileSync} from 'node:fs';
import {join} from 'node:path';

import packageJson from '../package.json';

const playwrightVersion = packageJson.dependencies['@playwright/test'];

const installBrowsersPath = join(__dirname, 'node_modules', 'e2ed', 'bin', 'installBrowsers.sh');

const installBrowsersText = readFileSync(installBrowsersPath, 'utf8');

const newInstallBrowsersText = installBrowsersText.replace('@latest', `@${playwrightVersion}`);

writeFileSync(installBrowsersPath, newInstallBrowsersText);
