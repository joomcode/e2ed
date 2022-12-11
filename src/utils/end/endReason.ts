import type {EndE2edReason} from '../../constants/internal';

/**
 * e2ed end reason.
 * @internal
 */
// eslint-disable-next-line import/no-mutable-exports
export let endE2edReason: EndE2edReason | undefined;

/**
 * Set defined e2ed end reason (for global access).
 * @internal
 */
export const setEndE2edReason = (definedEndE2edReason: EndE2edReason): void => {
  endE2edReason = definedEndE2edReason;
};
