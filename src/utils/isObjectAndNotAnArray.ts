/**
 * Returns `true`, if value is `object` (and return `false` for arrays).
 * @internal
 */
export function isObjectAndNotAnArray(x: unknown): x is object {
  return x !== null && typeof x === 'object' && Array.isArray(x) === false;
}
