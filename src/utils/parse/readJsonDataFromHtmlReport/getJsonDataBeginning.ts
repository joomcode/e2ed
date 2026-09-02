import {SCRIPT_TAG} from './constants';

/**
 * Get beginning of JSON data in HTML report partial source, if any.
 * @internal
 */
export const getJsonDataBeginning = (chunk: string, edge: string = ''): string | undefined => {
  if (edge !== '') {
    const border = edge + chunk.slice(0, SCRIPT_TAG.length - 1);

    // the border is checked first, because the chunk itself can contain the next <script> tag
    const borderIndex = border.indexOf(SCRIPT_TAG);

    if (borderIndex !== -1) {
      return chunk.slice(borderIndex + SCRIPT_TAG.length - edge.length);
    }
  }

  const index = chunk.indexOf(SCRIPT_TAG);

  if (index !== -1) {
    return chunk.slice(index + SCRIPT_TAG.length);
  }

  return undefined;
};
