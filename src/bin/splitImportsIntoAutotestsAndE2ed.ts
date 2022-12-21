/* eslint-disable max-lines */

/**
 * @file Temporary script for migrating to a splitted imports system (autotest/... and e2ed/...).
 */

import {readFileSync} from 'node:fs';
import {readdir, readFile, stat} from 'node:fs/promises';
import {join} from 'node:path';

import {
  ABSOLUTE_PATH_TO_INSTALLED_E2ED_DIRECTORY,
  ABSOLUTE_PATH_TO_PROJECT_ROOT_DIRECTORY,
  READ_FILE_OPTIONS,
} from '../constants/internal';
import {assertValueIsDefined} from '../utils/asserts';
import {writeFile} from '../utils/fs';
import {generalLog} from '../utils/generalLog';

type ParsedImportStatement = Readonly<{
  fromPath: string;
  isAutotestsImport: boolean;
  isImportType: boolean;
  names: readonly string[];
}>;

const e2edSourceCache: Record<string, string> = {};

function getIsE2edName(fromPath: string): (name: string) => boolean {
  return (name: string): boolean => {
    if (
      fromPath.startsWith('/configurator') ||
      fromPath.startsWith('/createTestId') ||
      fromPath.startsWith('/testcafe')
    ) {
      return true;
    }

    const pathToIndexDts = `${ABSOLUTE_PATH_TO_INSTALLED_E2ED_DIRECTORY}${fromPath}/index.d.ts`;

    let indexDtsSource = e2edSourceCache[fromPath];

    if (!indexDtsSource) {
      try {
        indexDtsSource = readFileSync(pathToIndexDts, 'utf8');

        e2edSourceCache[fromPath] = indexDtsSource;
      } catch {}
    }

    if (!indexDtsSource) {
      return false;
    }

    const nameWithoutAlias = name.split(' ')[0];

    assertValueIsDefined(nameWithoutAlias, 'nameWithoutAlias is defined', {fromPath, name});

    return (
      indexDtsSource.includes(` ${nameWithoutAlias} `) ||
      indexDtsSource.includes(` ${nameWithoutAlias}, `)
    );
  };
}

function getImport(isImportType: boolean, names: readonly string[], from: string): string {
  const rawNames = names.join(', ');
  const importString = isImportType ? 'import type' : 'import';

  return `${importString} {${rawNames}} from '${from}'`;
}

function getSplittedImports(
  parsedImportStatement: ParsedImportStatement,
  filePath: string,
): string[] {
  const {fromPath, isAutotestsImport, isImportType, names} = parsedImportStatement;
  const splittedImports: string[] = [];

  const isE2edName = getIsE2edName(fromPath);
  const autotestsNames = names.filter((name) => !isE2edName(name));
  const e2edNames = names.filter(isE2edName);

  const isNeedToFixImportType = !isImportType && fromPath.startsWith('/types');

  if (isNeedToFixImportType) {
    generalLog('Fix runtime import to types import', {e2edNames, filePath, parsedImportStatement});
  }

  const newIsImportType = isNeedToFixImportType ? true : isImportType;

  if (autotestsNames.length !== 0) {
    splittedImports.push(getImport(newIsImportType, autotestsNames, `autotests${fromPath}`));
  }

  if (e2edNames.length !== 0) {
    splittedImports.push(getImport(newIsImportType, e2edNames, `e2ed${fromPath}`));
  }

  const isImportChanged = isAutotestsImport ? e2edNames.length !== 0 : autotestsNames.length !== 0;

  return isImportChanged || isNeedToFixImportType ? splittedImports : [];
}

function parseStatement(statement: string, filePath: string): ParsedImportStatement | undefined {
  const trimmedStatement = statement.trim();

  if (!trimmedStatement.startsWith('import ') || trimmedStatement.startsWith('import *')) {
    return undefined;
  }

  const line = trimmedStatement.replace(/\s+/gm, ' ').trim();
  const parsedLine = line.match(
    /(import|import type) {(?<rawNames>[a-z\-_:0-9 ,]+)} from '(?<from>[a-z\-_:0-9./]+)'/i,
  );

  if (!parsedLine) {
    generalLog('Unformatted import', {filePath, line, statement});

    return undefined;
  }

  const {from, rawNames} = parsedLine.groups as {from: string; rawNames: string};

  if (!from.startsWith('e2ed') && !from.startsWith('autotests')) {
    if (!from.startsWith('.') && !from.startsWith('node:')) {
      generalLog('Unsupported bare import', {filePath, from, rawNames, statement});
    }

    return undefined;
  }

  const names = rawNames
    .split(', ')
    .map((name) => name.trim())
    .filter(Boolean);

  const isAutotestsImport = from.startsWith('autotests');
  const fromPath = from.slice(isAutotestsImport ? 'autotests'.length : 'e2ed'.length);
  const isImportType = line.startsWith('import type');

  return {fromPath, isAutotestsImport, isImportType, names};
}

function processStatement(statement: string, statements: string[], filePath: string): void {
  const parsedStatement = parseStatement(statement, filePath);

  if (!parsedStatement) {
    statements.push(statement);

    return;
  }

  const splittedImports = getSplittedImports(parsedStatement, filePath);

  if (splittedImports.length > 0) {
    // generalLog('Replace import statement', {parsedStatement, splittedImports});

    statements.push(...splittedImports);
  } else {
    statements.push(statement);
  }
}

function getSourceWithSplittedImports(source: string, filePath: string): string {
  const statements = source.split(';\n');
  const newStatements: string[] = [];

  for (const statement of statements) {
    processStatement(statement, newStatements, filePath);
  }

  return newStatements.join(';\n');
}

async function processFile(filePath: string): Promise<void> {
  const source = await readFile(filePath, READ_FILE_OPTIONS);

  const newSource = getSourceWithSplittedImports(source, filePath);

  if (source !== newSource) {
    // generalLog('Rewrite file', {filePath});

    await writeFile(filePath, newSource);
  }
}

async function processDir(dirPath: string): Promise<void> {
  const files = await readdir(dirPath);
  const promises = [];

  for (const file of files) {
    const filePath = join(dirPath, file);

    if (file.endsWith('.ts')) {
      promises.push(processFile(filePath));
    } else {
      const stats = await stat(filePath);

      if (stats.isDirectory()) {
        promises.push(processDir(filePath));
      }
    }
  }

  await Promise.all(promises);
}

const pathToAutotestsDir = join(ABSOLUTE_PATH_TO_PROJECT_ROOT_DIRECTORY, 'autotests');

void processDir(pathToAutotestsDir);
