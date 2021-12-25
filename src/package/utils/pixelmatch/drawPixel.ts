import type {ImgData} from '../../types/internal';

/**
 * Draw one pixel on image data.
 * @internal
 */
export const drawPixel = (
  originalOutput: ImgData,
  pos: number,
  r: number,
  g: number,
  b: number,
): void => {
  const output = originalOutput;

  output[pos + 0] = r;
  output[pos + 1] = g;
  output[pos + 2] = b;
  output[pos + 3] = 255;
};
