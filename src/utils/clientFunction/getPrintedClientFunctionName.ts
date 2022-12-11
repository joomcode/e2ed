/**
 * Get printed client function name (for logs).
 * @internal
 */
export const getPrintedClientFunctionName = (name: string | undefined): string =>
  `client function${name ? ` "${name}"` : ''}`;
