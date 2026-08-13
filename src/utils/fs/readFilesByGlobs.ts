import {glob, readFile} from 'node:fs/promises';
import {normalize} from 'node:path';

const POOL_UPDATED = Symbol('poolUpdated');

type File = Readonly<{path: string; source: string}>;

type ReadResult = Readonly<
  {key: number; path: string} & ({error: unknown; ok: false} | {ok: true; text: string})
>;

/**
 * Reads files by glob patterns.
 */
export async function* readFilesByGlobs(
  patterns: readonly string[],
  filterByPath: (path: string) => boolean = () => true,
): AsyncGenerator<File> {
  const readsInFlight = new Map<number, Promise<ReadResult>>();
  const seenPaths = new Set<string>();
  let nextKey = 0;

  let globsInFlight = patterns.length;
  let globError: unknown;

  let signalUpdate!: () => void;
  let update!: Promise<typeof POOL_UPDATED>;

  const resetUpdate = (): void => {
    update = new Promise((resolve) => {
      signalUpdate = () => resolve(POOL_UPDATED);
    });
  };

  resetUpdate();

  for (const pattern of patterns) {
    // eslint-disable-next-line @typescript-eslint/no-loop-func
    void (async () => {
      try {
        for await (const rawPath of glob(pattern)) {
          const path = normalize(String(rawPath));

          if (seenPaths.has(path)) {
            continue;
          }

          seenPaths.add(path);

          if (!filterByPath(path)) {
            continue;
          }

          nextKey += 1;

          const key = nextKey;

          readsInFlight.set(
            key,
            readFile(path, 'utf8').then(
              (text) => ({key, ok: true as const, path, text}),
              (error: unknown) => ({error, key, ok: false as const, path}),
            ),
          );
          signalUpdate();
        }
      } catch (error) {
        globError ??= error;
      } finally {
        globsInFlight -= 1;
        signalUpdate();
      }
    })();
  }

  while (readsInFlight.size > 0 || globsInFlight > 0) {
    const result = await Promise.race([update, ...readsInFlight.values()]);

    if (result === POOL_UPDATED) {
      resetUpdate();

      if (globError !== undefined) {
        throw globError;
      }

      continue;
    }

    readsInFlight.delete(result.key);

    if (result.ok) {
      yield {path: result.path, source: result.text};
    } else {
      throw result.error;
    }
  }
}
