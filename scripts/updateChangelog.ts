/**
 * @file Generate CHANGELOG.md with changes relative to the previous version.
 */

import {execFileSync} from 'node:child_process';
import {readFileSync, writeFileSync} from 'node:fs';
import {join} from 'node:path';

import pkg from '../package.json';

const gitHosterOrigin = 'https://github.com';
const baseUrl = `${gitHosterOrigin}/${pkg.repository}`;
const changelogPath = join(__dirname, '..', 'CHANGELOG.md');

const fullDate = new Date().toISOString().slice(0, 10);

const changelogText = readFileSync(changelogPath, 'utf8');

const previousVersion = changelogText.match(/\[v(\d+\.\d+\.\d+)\]/)?.[1] || '';
const gitOptions = ['log', `HEAD...v${previousVersion}`, '--pretty=tformat:%H%aN %s'];

const commitsLines = execFileSync('git', gitOptions, {encoding: 'utf8'}).split('\n');

const commits = commitsLines.map((commit) => {
  const firstSpaceIndes = commit.indexOf(' ');
  const hash = commit.slice(0, 40);
  const authorName = commit.slice(40, firstSpaceIndes);
  const subject = commit.slice(firstSpaceIndes + 1);

  return {authorName, hash, subject};
});

const commitsWithoutVersionUpdates = commits.filter(
  ({hash, subject}) => hash && subject && !/^\d+\.\d+\.\d+$/.test(subject),
);

const commitsLinksText = commitsWithoutVersionUpdates
  .map(
    ({authorName, hash, subject}) =>
      `- [${subject}](${baseUrl}/commit/${hash}) ([${authorName}](${gitHosterOrigin}/${authorName}))`,
  )
  .join('\n');

const newChangelogText = `# Changelog

## [v${pkg.version}](${baseUrl}/tree/v${pkg.version}) (${fullDate})

[Full Changelog](${baseUrl}/compare/v${previousVersion}...v${pkg.version})

${commitsLinksText}

${changelogText.slice(changelogText.search('##'))}`;

writeFileSync(changelogPath, newChangelogText);
