import type {ImgData} from '../../types/internal';

/**
 * Returns `true` for image pixel data, and `false` otherwise.
 * @internal
 */
export const isPixelData = (img: ImgData): boolean =>
  ArrayBuffer.isView(img) &&
  // eslint-disable-next-line @typescript-eslint/naming-convention
  (img.constructor as {BYTES_PER_ELEMENT?: number}).BYTES_PER_ELEMENT === 1;
