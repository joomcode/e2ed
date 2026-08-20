import type {CommentPair} from 'parse-statements';

/**
 * Strips comments from string interval from source.
 * @internal
 */
export const stripComments = (
  source: string,
  intervalStart: number,
  intervalEnd: number,
  comments: readonly CommentPair[] | undefined,
  // eslint-disable-next-line @typescript-eslint/max-params
): string => {
  if (comments === undefined) {
    return source.slice(intervalStart, intervalEnd);
  }

  let currentStart = intervalStart;
  const parts: string[] = [];

  for (const [{start, token}, {end}] of comments) {
    if (token === "'" || token === '"' || token === '`') {
      continue;
    }

    parts.push(source.slice(currentStart, start));

    currentStart = end;
  }

  parts.push(source.slice(currentStart, intervalEnd));

  return parts.join('');
};
