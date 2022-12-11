import {colorDelta} from './colorDelta';
import {hasManySiblings} from './hasManySiblings';

import type {ImgData} from '../../types/internal';

/**
 * Returns true if the rectangle is in antialiased state.
 * @internal
 */
export const isAntialiased = (
  img: ImgData,
  x1: number,
  y1: number,
  width: number,
  height: number,
  img2: ImgData,
): boolean => {
  const x0 = Math.max(x1 - 1, 0);
  const y0 = Math.max(y1 - 1, 0);
  const x2 = Math.min(x1 + 1, width - 1);
  const y2 = Math.min(y1 + 1, height - 1);
  const pos = (y1 * width + x1) * 4;
  let zeroes = x1 === x0 || x1 === x2 || y1 === y0 || y1 === y2 ? 1 : 0;
  let min = 0;
  let max = 0;
  let minX!: number;
  let minY!: number;
  let maxX!: number;
  let maxY!: number;

  for (let x = x0; x <= x2; x += 1) {
    for (let y = y0; y <= y2; y += 1) {
      if (x === x1 && y === y1) {
        continue;
      }

      const delta = colorDelta(img, img, pos, (y * width + x) * 4, true);

      if (delta === 0) {
        zeroes += 1;
        if (zeroes > 2) {
          return false;
        }
      } else if (delta < min) {
        min = delta;
        minX = x;
        minY = y;
      } else if (delta > max) {
        max = delta;
        maxX = x;
        maxY = y;
      }
    }
  }

  if (min === 0 || max === 0) {
    return false;
  }

  return (
    (hasManySiblings(img, minX, minY, width, height) &&
      hasManySiblings(img2, minX, minY, width, height)) ||
    (hasManySiblings(img, maxX, maxY, width, height) &&
      hasManySiblings(img2, maxX, maxY, width, height))
  );
};
