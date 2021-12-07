import {useContext} from '../useContext';

/**
 * Get and set internal pageParams when navigate/assert page.
 * @internal
 */
export const [getPageParams, setPageParams] = useContext<unknown>();
