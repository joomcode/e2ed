type Step = Readonly<{
  definition: string | undefined;
  kind: string;
}>;

/**
 * Get full definition of any step.
 */
export const getFullStepDefinition = ({definition, kind}: Step, count: number = 1): string => {
  const fullDefinition = `"${kind}${definition === undefined || definition === '' ? '' : ` ${definition}`}"`;

  return count > 1 ? `${fullDefinition} (occurrence ${count})` : fullDefinition;
};
