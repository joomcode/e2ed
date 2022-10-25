/* eslint-disable no-new */

/**
 * @file Tests of TypeScript types for routes.
 */

import {CreateDevice, UserSignUp} from 'e2ed/routes/apiRoutes';
import {Search} from 'e2ed/routes/pageRoutes';

/**
 * RouteParams = Readonly<{model: MobileDevice}>
 */

// ok
new CreateDevice({model: 'samsung'});

// @ts-expect-error: wrong RouteParams type
new CreateDevice({model: 'foo'});

// @ts-expect-error: wrong RouteParams type
new CreateDevice(undefined);

// @ts-expect-error: wrong number of constructor arguments
new CreateDevice();

/**
 * RouteParams not setted (= undefined as default type parameter value)
 */

// ok
new UserSignUp();

// ok
new UserSignUp(undefined);

// @ts-expect-error: wrong number of constructor arguments
new UserSignUp('foo');

/**
 * RouteParams = Readonly<{query: string}> | undefined
 */

// ok
new Search({searchQuery: 'foo'});

// ok
new Search();

// ok
new Search(undefined);

// @ts-expect-error: wrong RouteParams type
new Search({query: 0});
