/**
 * Get printed client function name (for logs).
 * @internal
 */
export const getPrintedClientFunctionName = (name: string | undefined): string =>
  // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
  `client function${name ? ` "${name}"` : ''}`;
