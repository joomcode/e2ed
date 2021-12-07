import {useContext} from '../useContext';

/**
 * Get and set internal page routeParams when navigate/assert page.
 * @internal
 */
export const [getRouteParams, setRouteParams] = useContext<unknown>();
