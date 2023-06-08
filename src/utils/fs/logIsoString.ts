import {readFile} from 'node:fs/promises';
import {join} from 'node:path';

import {READ_FILE_OPTIONS, TMP_DIRECTORY_PATH} from '../../constants/internal';

import {writeFile} from './writeFile';

import type {FilePathFromRoot} from '../../types/internal';

/**
 * Relative (from root) path to text file with ISO string of last log event.
 */
const LOG_ISO_STRING_PATH = join(TMP_DIRECTORY_PATH, 'logIsoString.txt') as FilePathFromRoot;

/**
 * Get last log event time in ms (or zero, if there is no log events).
 * @internal
 */
export const getLastLogEventTimeInMs = async (): Promise<number> => {
  let logIsoStringFile = '';

  try {
    logIsoStringFile = await readFile(LOG_ISO_STRING_PATH, READ_FILE_OPTIONS);
  } catch {}

  const lastLogEventTimeInMs = new Date(logIsoStringFile.trim());

  return lastLogEventTimeInMs.valueOf() || 0;
};

/**
 * Write log event time.
 * @internal
 */
export const writeLogEventTime = async (): Promise<void> => {
  const logIsoString = new Date().toISOString();

  await writeFile(LOG_ISO_STRING_PATH, logIsoString);
};
