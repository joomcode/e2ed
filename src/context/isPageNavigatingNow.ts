import {useContext} from '../useContext';

/**
 * Get and set `isPageNavigatingNow` flag.
 * @internal
 */
export const [getIsPageNavigatingNow, setIsPageNavigatingNow] = useContext<boolean>(false);
