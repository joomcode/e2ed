import {blend, rgb2y} from './colors';
import {drawPixel} from './drawPixel';

import type {ImgData} from '../../types/internal';

/**
 * Draw one gray pixel on image data.
 * @internal
 */
export const drawGrayPixel = (img: ImgData, i: number, alpha: number, output: ImgData): void => {
  const r = img[i + 0]!;
  const g = img[i + 1]!;
  const b = img[i + 2]!;
  const val = blend(rgb2y(r, g, b), (alpha * img[i + 3]!) / 255);

  drawPixel(output, i, val, val, val);
};
