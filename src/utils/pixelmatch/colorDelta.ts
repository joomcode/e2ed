import {assertValueIsDefined} from '../asserts';

import {blend, rgb2i, rgb2q, rgb2y} from './colors';

import type {ImgData} from '../../types/internal';

/**
 * Returns delta of two pixels in images data.
 * @internal
 */
// eslint-disable-next-line max-statements
export const colorDelta = (
  img1: ImgData,
  img2: ImgData,
  k: number,
  m: number,
  yOnly: boolean,
  // eslint-disable-next-line max-params
): number => {
  let r1 = img1[k + 0];
  let g1 = img1[k + 1];
  let b1 = img1[k + 2];
  let a1 = img1[k + 3];

  let r2 = img2[m + 0];
  let g2 = img2[m + 1];
  let b2 = img2[m + 2];
  let a2 = img2[m + 3];

  assertValueIsDefined(r1, 'r1 is defined', {img1, img2, k, m, yOnly});
  assertValueIsDefined(g1, 'g1 is defined', {img1, img2, k, m, yOnly});
  assertValueIsDefined(b1, 'b1 is defined', {img1, img2, k, m, yOnly});
  assertValueIsDefined(a1, 'a1 is defined', {img1, img2, k, m, yOnly});

  assertValueIsDefined(r2, 'r2 is defined', {img1, img2, k, m, yOnly});
  assertValueIsDefined(g2, 'g2 is defined', {img1, img2, k, m, yOnly});
  assertValueIsDefined(b2, 'b2 is defined', {img1, img2, k, m, yOnly});
  assertValueIsDefined(a2, 'a2 is defined', {img1, img2, k, m, yOnly});

  if (a1 === a2 && r1 === r2 && g1 === g2 && b1 === b2) {
    return 0;
  }

  if (a1 < 255) {
    a1 /= 255;
    r1 = blend(r1, a1);
    g1 = blend(g1, a1);
    b1 = blend(b1, a1);
  }

  if (a2 < 255) {
    a2 /= 255;
    r2 = blend(r2, a2);
    g2 = blend(g2, a2);
    b2 = blend(b2, a2);
  }

  const y1 = rgb2y(r1, g1, b1);
  const y2 = rgb2y(r2, g2, b2);
  const y = y1 - y2;

  if (yOnly) {
    return y;
  }

  const i = rgb2i(r1, g1, b1) - rgb2i(r2, g2, b2);
  const q = rgb2q(r1, g1, b1) - rgb2q(r2, g2, b2);

  const delta = 0.5053 * y * y + 0.299 * i * i + 0.1957 * q * q;

  return y1 > y2 ? -delta : delta;
};
