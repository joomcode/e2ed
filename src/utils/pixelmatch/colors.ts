/* eslint-disable @typescript-eslint/no-magic-numbers */

/**
 * y-transform color.
 * @internal
 */
export const rgb2y = (r: number, g: number, b: number): number =>
  r * 0.29889531 + g * 0.58662247 + b * 0.11448223;

/**
 * i-transform color.
 * @internal
 */
export const rgb2i = (r: number, g: number, b: number): number =>
  r * 0.59597799 - g * 0.2741761 - b * 0.32180189;

/**
 * q-transform color.
 * @internal
 */
export const rgb2q = (r: number, g: number, b: number): number =>
  r * 0.21147017 - g * 0.52261711 + b * 0.31114694;

/**
 * Blend color.
 * @internal
 */
export const blend = (c: number, a: number): number => 255 + (c - 255) * a;
