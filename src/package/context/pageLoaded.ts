import {useContext} from '../useContext';

/**
 * Get and set internal pageLoaded flag.
 * @internal
 */
export const [getPageLoaded, setPageLoaded] = useContext<boolean>(false);
