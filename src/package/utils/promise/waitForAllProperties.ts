import type {UnwrapPromise} from '../../types/internal';

type PromiseObject = Record<string, Promise<unknown>>;

type Return<PO extends PromiseObject> = Promise<{[Key in keyof PO]: UnwrapPromise<PO[Key]>}>;

/**
 * Wait for all object properties are resolved,
 * and return an object with those properties and their values.
 */
export const waitForAllProperties = async <PO extends PromiseObject>(
  promiseObject: PO,
): Return<PO> =>
  Object.fromEntries(
    await Promise.all(
      Object.entries(promiseObject).map(([key, maybePromise]) =>
        Promise.resolve(maybePromise).then((result) => [key, result]),
      ),
    ),
  ) as Return<PO>;
