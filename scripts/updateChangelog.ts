/**
 * @file Generate CHANGELOG.md with changes relative to the previous version.
 */

import {execFileSync} from 'node:child_process';
import {readFileSync, writeFileSync} from 'node:fs';
import {join} from 'node:path';

import pkg from '../package.json';

const baseUrl = `https://github.com/${pkg.repository}`;
const changelogPath = join(__dirname, '..', 'CHANGELOG.md');

const fullDate = new Date().toISOString().slice(0, 10);

const changelogText = readFileSync(changelogPath, 'utf8');

const previousVersion = changelogText.match(/\[v(\d+\.\d+\.\d+)\]/)?.[1] || '';
const gitOptions = ['log', `HEAD...v${previousVersion}`, '--pretty=tformat:%H %s'];

const commits = execFileSync('git', gitOptions, {encoding: 'utf8'})
  .split('\n')
  .map((text) => ({hash: text.slice(0, 40), message: text.slice(41)}))
  .filter(({hash, message}) => hash && message && !/^\d+\.\d+\.\d+$/.test(message));

const commitsLinks = commits
  .map(({hash, message}) => `- [${message}](${baseUrl}/commit/${hash})`)
  .join('\n');

writeFileSync(
  changelogPath,
  `# Changelog

## [v${pkg.version}](${baseUrl}/tree/v${pkg.version}) (${fullDate})

[Full Changelog](${baseUrl}/compare/v${previousVersion}...v${pkg.version})

${commitsLinks}

${changelogText.slice(changelogText.search('##'))}`,
);
