/* eslint-disable no-console */

import {spawn} from 'node:child_process';

import packageJson from '../package.json';

const playwrightVersion = packageJson.dependencies['@playwright/test'];
const chromiumPackage = `@playwright/browser-chromium@${playwrightVersion}`;

console.log(`Install ${chromiumPackage}`);

const installation = spawn('npm', ['install', '--global', chromiumPackage], {
  shell: true,
  stdio: 'inherit',
});

installation.on('close', (code) => {
  if (code === 0) {
    console.log(`${chromiumPackage} has been installed successfully`);
  } else {
    console.log(`Installation of ${chromiumPackage} failed with code ${code}`);
  }
});
