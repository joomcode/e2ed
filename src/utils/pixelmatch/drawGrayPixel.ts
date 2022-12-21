import {assertValueIsDefined} from '../asserts';

import {blend, rgb2y} from './colors';
import {drawPixel} from './drawPixel';

import type {ImgData} from '../../types/internal';

/**
 * Draw one gray pixel on image data.
 * @internal
 */
// eslint-disable-next-line max-params
export const drawGrayPixel = (img: ImgData, i: number, alpha: number, output: ImgData): void => {
  const r = img[i + 0];
  const g = img[i + 1];
  const b = img[i + 2];
  const a = img[i + 3];

  assertValueIsDefined(r, 'r is defined', {alpha, i, img, output});
  assertValueIsDefined(g, 'g is defined', {alpha, i, img, output});
  assertValueIsDefined(b, 'b is defined', {alpha, i, img, output});
  assertValueIsDefined(a, 'a is defined', {alpha, i, img, output});

  const val = blend(rgb2y(r, g, b), (alpha * a) / 255);

  drawPixel(output, i, val, val, val);
};
