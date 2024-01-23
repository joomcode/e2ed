type PromiseObject = Record<string, Promise<unknown>>;

type Return<Value extends PromiseObject> = Promise<{
  [Key in keyof Value]: Awaited<Value[Key]>;
}>;

/**
 * Waits for all object properties are resolved,
 * and returns an object with those properties and their values.
 */
export const waitForAllProperties = async <Value extends PromiseObject>(
  promiseObject: Value,
): Return<Value> =>
  Object.fromEntries(
    await Promise.all(
      Object.entries(promiseObject).map(([key, maybePromise]) =>
        Promise.resolve(maybePromise).then((result) => [key, result]),
      ),
    ),
  ) as Return<Value>;
