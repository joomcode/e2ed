type WithLogEvents = {logEvents: unknown};

/**
 * Clone test run object without logEvents property (to reduce logs).
 * @internal
 */
export const cloneWithoutLogEvents = <T extends WithLogEvents>(
  withLogEvents: T,
): Omit<T, 'logEvents'> => {
  const {logEvents, ...withoutLogEvents} = withLogEvents ?? {};

  void logEvents;

  return withoutLogEvents;
};
