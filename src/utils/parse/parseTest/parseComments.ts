import {parseSpace} from './parseSpace';

/**
 * Parses comments with spaces between them till first non-space symbol.
 * @internal
 */
export const parseComments = (
  start: number,
  comments: Readonly<Record<number, number>>,
  source: string,
): number => {
  let index = start;

  while (index < source.length) {
    index = parseSpace(index, source);

    const maybeCommentEnd = comments[index];

    if (maybeCommentEnd === undefined) {
      return index;
    }

    index = maybeCommentEnd;
  }

  return index < source.length ? index : -1;
};
