/**
 * Get run label string for printing in general logs.
 * @internal
 */
export const getPrintedRunLabel = (label: string | undefined): string =>
  label ? `[${label}]` : '';
