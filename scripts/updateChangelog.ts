/**
 * @file Generates CHANGELOG.md with changes relative to the previous version.
 */

import {execFileSync} from 'node:child_process';
import {readFileSync, writeFileSync} from 'node:fs';
import {join} from 'node:path';
import {URL} from 'node:url';

import {repository, version} from '../package.json';

function assertValueIsDefined<T>(value: T): asserts value is Exclude<T, undefined> {
  if (value === undefined) {
    throw new TypeError('Asserted value is undefined');
  }
}

const {href: repoUrl, origin: repoOrigin} = new URL(repository.url);
const changelogPath = join(__dirname, '..', 'CHANGELOG.md');

const fullDate = new Date().toISOString().slice(0, 10);

const changelogText = readFileSync(changelogPath, 'utf8');

const previousVersion = changelogText.match(/\[v(\d+\.\d+\.\d+)\]/)?.[1] ?? '';
const SEPARATOR = '\n'.repeat(64);
const gitOptions = [
  'log',
  `HEAD...v${previousVersion}`,
  `--pretty=tformat:%H%aN %s%n%b${'%n'.repeat(SEPARATOR.length)}`,
];

const commits = execFileSync('git', gitOptions, {encoding: 'utf8'})
  .split(SEPARATOR)
  .map((part) => part.trim())
  .filter(Boolean);

const markdownCommits = commits.map((commit) => {
  const [firstLine, ...bodyLines] = commit.split('\n');

  assertValueIsDefined(firstLine);

  const firstSpaceIndex = firstLine.indexOf(' ');
  const subject = firstLine.slice(firstSpaceIndex + 1);

  if (/^\d+\.\d+\.\d+$/.test(subject)) {
    return '';
  }

  const hash = firstLine.slice(0, 40);
  const authorName = firstLine.slice(40, firstSpaceIndex);

  const body = bodyLines.length === 0 ? '' : `\n\n  ${bodyLines.join('\n\n  ')}\n`;

  return `- [${subject}](${repoUrl}/commit/${hash}) ([${authorName}](${repoOrigin}/${authorName}))${body}`;
});

const newChangelogText = `# Changelog

## [v${version}](${repoUrl}/tree/v${version}) (${fullDate})

[Full Changelog](${repoUrl}/compare/v${previousVersion}...v${version})

${markdownCommits.join('\n')}

${changelogText.slice(changelogText.search('##'))}`;

writeFileSync(changelogPath, newChangelogText);
