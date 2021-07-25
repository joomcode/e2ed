import {useContext} from 'e2ed';

import type {User} from 'e2ed/types';

/**
 * Get and set the current signing in user, if any.
 */
export const [getUser, setUser] = useContext<User>();
