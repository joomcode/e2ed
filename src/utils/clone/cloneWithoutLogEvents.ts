type WithLogEvents = Readonly<{logEvents: unknown}>;

/**
 * Clone test run object without `logEvents` property (to reduce logs).
 * @internal
 */
export const cloneWithoutLogEvents = <Type extends WithLogEvents>(
  withLogEvents: Type,
): Omit<Type, 'logEvents'> => {
  const {logEvents, ...withoutLogEvents} = withLogEvents ?? {};

  void logEvents;

  return withoutLogEvents;
};
