import type {ImgData} from '../../types/internal';

/**
 * Returns `true` if the rectangle has many sibling points, and `false` otherwise.
 * @internal
 */
// eslint-disable-next-line complexity
export const hasManySiblings = (
  img: ImgData,
  x1: number,
  y1: number,
  width: number,
  height: number,
  // eslint-disable-next-line max-params
): boolean => {
  const x0 = Math.max(x1 - 1, 0);
  const y0 = Math.max(y1 - 1, 0);
  const x2 = Math.min(x1 + 1, width - 1);
  const y2 = Math.min(y1 + 1, height - 1);
  const pos = (y1 * width + x1) * 4;
  let zeroes = x1 === x0 || x1 === x2 || y1 === y0 || y1 === y2 ? 1 : 0;

  for (let x = x0; x <= x2; x += 1) {
    for (let y = y0; y <= y2; y += 1) {
      if (x === x1 && y === y1) {
        continue;
      }

      const pos2 = (y * width + x) * 4;

      if (
        img[pos] === img[pos2] &&
        img[pos + 1] === img[pos2 + 1] &&
        img[pos + 2] === img[pos2 + 2] &&
        img[pos + 3] === img[pos2 + 3]
      ) {
        zeroes += 1;
      }

      if (zeroes > 2) {
        return true;
      }
    }
  }

  return false;
};
