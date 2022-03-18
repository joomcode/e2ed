/**
 * Return true, if current node args for TestCafe has browsers arg.
 * @internal
 */
export const hasBrowsersArg = (): boolean => {
  const browsersArg = process.argv[2];

  if (browsersArg === undefined) {
    return false;
  }

  return !browsersArg.startsWith('-') && !browsersArg.startsWith('e2ed');
};
