import {useContext} from '../useContext';

/**
 * Get browser JS errors array.
 * @internal
 */
export const [getJsErrorsFromContext] = useContext<readonly Error[]>([]);
