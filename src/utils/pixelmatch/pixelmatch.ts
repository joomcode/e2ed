/* eslint-disable max-depth */

import {DEFAULT_PIXELMATCH_OPTIONS} from '../../constants/internal';

import {colorDelta} from './colorDelta';
import {drawGrayPixel} from './drawGrayPixel';
import {drawPixel} from './drawPixel';
import {isAntialiased} from './isAntialiased';
import {isPixelData} from './isPixelData';

import type {ImgData, PixelmatchOptions} from '../../types/internal';

/**
 * A simple algorithm for comparing the proximity of two images.
 * {@link https://www.npmjs.com/package/pixelmatch/v/5.3.0}
 * @internal
 */
// eslint-disable-next-line complexity, max-statements
export const pixelmatch = (
  img1: ImgData,
  img2: ImgData,
  output: ImgData | undefined,
  width: number,
  height: number,
  originalOptions: Partial<PixelmatchOptions>,
  // eslint-disable-next-line max-params
): number => {
  if (!isPixelData(img1) || !isPixelData(img2) || (output && !isPixelData(output))) {
    throw new Error('Image data: Uint8Array, Uint8ClampedArray or Buffer expected.');
  }

  if (img1.length !== img2.length || (output && output.length !== img1.length)) {
    throw new Error('Image sizes do not match.');
  }

  if (img1.length !== width * height * 4) {
    throw new Error('Image data size does not match width/height.');
  }

  const options: PixelmatchOptions = {...DEFAULT_PIXELMATCH_OPTIONS, ...originalOptions};

  const len = width * height;
  const a32 = new Uint32Array(img1.buffer, img1.byteOffset, len);
  const b32 = new Uint32Array(img2.buffer, img2.byteOffset, len);
  let identical = true;

  for (let i = 0; i < len; i += 1) {
    if (a32[i] !== b32[i]) {
      identical = false;
      break;
    }
  }

  if (identical) {
    if (output && !options.diffMask) {
      for (let i = 0; i < len; i += 1) {
        drawGrayPixel(img1, 4 * i, options.alpha, output);
      }
    }

    return 0;
  }

  const maxDelta = 35215 * options.threshold * options.threshold;
  let diff = 0;

  for (let y = 0; y < height; y += 1) {
    for (let x = 0; x < width; x += 1) {
      const pos = (y * width + x) * 4;
      const delta = colorDelta(img1, img2, pos, pos, false);

      if (Math.abs(delta) > maxDelta) {
        if (
          !options.includeAa &&
          (isAntialiased(img1, x, y, width, height, img2) ||
            isAntialiased(img2, x, y, width, height, img1))
        ) {
          if (output && !options.diffMask) {
            drawPixel(output, pos, ...options.aaColor);
          }
        } else {
          if (output) {
            drawPixel(output, pos, ...((delta < 0 && options.diffColorAlt) || options.diffColor));
          }

          diff += 1;
        }
      } else if (output) {
        if (!options.diffMask) {
          drawGrayPixel(img1, pos, options.alpha, output);
        }
      }
    }
  }

  return diff;
};
