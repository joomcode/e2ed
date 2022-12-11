import type {PixelmatchOptions} from '../types/internal';

/**
 * Pixelmatch default options.
 * @internal
 */
export const DEFAULT_PIXELMATCH_OPTIONS: PixelmatchOptions = {
  aaColor: [255, 255, 0], // color of anti-aliased pixels in diff output
  alpha: 0.1, // opacity of original image in diff output
  diffColor: [255, 0, 0], // color of different pixels in diff output
  /**
   * Whether to detect dark on light differences between img1 and img2 and
   * set an alternative color to differentiate between the two
   */
  diffColorAlt: undefined,
  diffMask: false, // draw the diff over a transparent background (a mask)
  includeAA: false, // whether to skip anti-aliasing detection
  threshold: 0.1, // matching threshold (0 to 1); smaller is more sensitive
};
