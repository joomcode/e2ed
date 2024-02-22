import type {PixelmatchOptions} from '../types/internal';

const maxColorValue = 255;

/**
 * Pixelmatch default options.
 * @internal
 */
export const DEFAULT_PIXELMATCH_OPTIONS: PixelmatchOptions = {
  aaColor: [maxColorValue, maxColorValue, 0], // color of anti-aliased pixels in diff output
  alpha: 0.1, // opacity of original image in diff output
  diffColor: [maxColorValue, 0, 0], // color of different pixels in diff output
  /**
   * Whether to detect dark on light differences between img1 and img2 and
   * set an alternative color to differentiate between the two
   */
  diffColorAlt: undefined,
  diffMask: false, // draw the diff over a transparent background (a mask)
  includeAa: false, // whether to skip anti-aliasing detection
  threshold: 0.1, // matching threshold (0 to 1); smaller is more sensitive
};
