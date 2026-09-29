type Step = Readonly<{
  column: number;
  line: number;
}>;

/**
 * Get step reference (without step definition).
 */
export const getStepReference = ({column, line}: Step, path: string): string =>
  `in ${path}:${line}:${column}`;
