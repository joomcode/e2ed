/**
 * RGB color presentation (as three numbers).
 * @internal
 */
type RgbTuple = readonly [number, number, number];

/**
 * Image data as buffer or typed array.
 * @internal
 */
export type ImgData = Buffer | Uint8Array | Uint8ClampedArray;

/**
 * Pixelmatch options.
 * @internal
 */
export type PixelmatchOptions = Readonly<{
  aaColor: RgbTuple;
  alpha: number;
  diffColor: RgbTuple;
  diffColorAlt: RgbTuple | undefined;
  diffMask: boolean;
  includeAa: boolean;
  threshold: number;
}>;
