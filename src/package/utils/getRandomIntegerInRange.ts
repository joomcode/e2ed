/**
 * Returns random integer between min and max.
 */
export const getRandomIntegerInRange = (min: number, max: number): number =>
  Math.floor(Math.random() * (max - min + 1)) + min;
