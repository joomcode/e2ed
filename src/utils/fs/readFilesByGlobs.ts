import {glob, readFile} from 'node:fs/promises';
import {normalize} from 'node:path';

import type {SourceFile} from '../../types/internal';

type ReadResult = Readonly<
  {path: string} & ({error: unknown; ok: false} | {ok: true; text: string})
>;

/**
 * Reads files by glob patterns.
 */
// eslint-disable-next-line max-statements
export async function* readFilesByGlobs(
  patterns: readonly string[],
  filterByPath: (path: string) => boolean = () => true,
): AsyncGenerator<SourceFile> {
  const completedReads = new Set<ReadResult>();
  const seenPaths = new Set<string>();

  let globsInFlight = patterns.length;
  let isFinished = false;
  let readsInFlight = 0;
  let globError: unknown;

  let signalUpdate!: () => void;
  let update!: Promise<void>;

  const resetUpdate = (): void => {
    update = new Promise((resolve) => {
      signalUpdate = resolve;
    });
  };

  resetUpdate();

  const startRead = (path: string): void => {
    readsInFlight += 1;

    void readFile(path, 'utf8').then(
      (text) => {
        readsInFlight -= 1;

        if (!isFinished) {
          completedReads.add({ok: true, path, text});
        }

        signalUpdate();
      },
      (error: unknown) => {
        readsInFlight -= 1;

        if (!isFinished) {
          completedReads.add({error, ok: false, path});
        }

        signalUpdate();
      },
    );
  };

  for (const pattern of patterns) {
    // eslint-disable-next-line @typescript-eslint/no-loop-func
    void (async () => {
      try {
        for await (const rawPath of glob(pattern)) {
          if (isFinished) {
            return;
          }

          const path = normalize(rawPath);

          if (seenPaths.has(path)) {
            continue;
          }

          seenPaths.add(path);

          if (!filterByPath(path)) {
            continue;
          }

          startRead(path);
        }
      } catch (error) {
        globError ??= error;
      } finally {
        globsInFlight -= 1;
        signalUpdate();
      }
    })();
  }

  try {
    while (completedReads.size > 0 || readsInFlight > 0 || globsInFlight > 0) {
      if (globError !== undefined) {
        throw globError;
      }

      if (completedReads.size === 0) {
        await update;
        resetUpdate();

        continue;
      }

      for (const result of completedReads) {
        completedReads.delete(result);

        // eslint-disable-next-line max-depth
        if (result.ok) {
          yield {path: result.path, source: result.text};
        } else {
          throw result.error;
        }
      }
    }

    if (globError !== undefined) {
      throw globError;
    }
  } finally {
    isFinished = true;
  }
}
