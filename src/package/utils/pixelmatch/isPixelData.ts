import type {ImgData} from '../../types/internal';

/**
 * Returns true for image pixel data.
 * @internal
 */
export const isPixelData = (img: ImgData): boolean =>
  ArrayBuffer.isView(img) &&
  (img.constructor as {BYTES_PER_ELEMENT?: number}).BYTES_PER_ELEMENT === 1;
