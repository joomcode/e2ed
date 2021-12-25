/**
 * Image data as buffer or typed array.
 * @internal
 */
export type ImgData = Buffer | Uint8Array | Uint8ClampedArray;

/**
 * RGB color representation (as three numbers).
 * @internal
 */
type RGBTuple = readonly [number, number, number];

/**
 * Pixelmatch options.
 * @internal
 */
export type PixelmatchOptions = Readonly<{
  aaColor: RGBTuple;
  alpha: number;
  diffColor: RGBTuple;
  diffColorAlt: RGBTuple | undefined;
  diffMask: boolean;
  includeAA: boolean;
  threshold: number;
}>;
