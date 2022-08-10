import {useContext} from '../useContext';

/**
 * Get and set test run error.
 * @internal
 */
export const [getError, setError] = useContext<string | undefined>(undefined);
