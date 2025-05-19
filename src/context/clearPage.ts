import {useContext} from '../useContext';

/**
 * Get and set internal (maybe `undefined`) `clearPage` function.
 * @internal
 */
export const [getClearPage, setClearPage] = useContext<() => Promise<void>>();
