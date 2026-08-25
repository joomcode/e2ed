// eslint-disable-next-line import/no-internal-modules
import {setReadonlyProperty} from '../../object/setReadonlyProperty';

import type {ScenarioReport, SourcePath} from '../../../types/internal';

type Entry = Pick<ScenarioReport, 'duplicatesByTestIdentifier' | 'path' | 'testIdentifier'>;

/**
 * Fills `duplicatesByTestIdentifier` field for features or tests.
 * @internal
 */
export const fillDuplicates = (entries: Readonly<Record<SourcePath, Entry>>): void => {
  const entriesPathsByTestId: Record<string, SourcePath[]> = Object.create(null) as {};

  for (const {path, testIdentifier} of Object.values(entries)) {
    if (testIdentifier === undefined) {
      continue;
    }

    let paths = entriesPathsByTestId[testIdentifier];

    if (paths === undefined) {
      paths = [];
      entriesPathsByTestId[testIdentifier] = paths;
    }

    paths.push(path);
  }

  for (const paths of Object.values(entriesPathsByTestId)) {
    if (paths.length <= 1) {
      continue;
    }

    for (const path of paths) {
      const entry = entries[path];

      if (entry === undefined) {
        throw new Error(`Cannot find entry by path "${path}"`);
      }

      const duplicates = new Set(paths);

      duplicates.delete(path);

      setReadonlyProperty(entry, 'duplicatesByTestIdentifier', [...duplicates]);
    }
  }
};
