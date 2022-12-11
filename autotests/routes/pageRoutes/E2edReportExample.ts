import {PageRoute} from 'e2ed';

import type {Url} from 'e2ed/types';

/**
 * Route of the e2ed report example page.
 */
export class E2edReportExample extends PageRoute {
  override getOrigin(): Url {
    return 'https://uid11.github.io' as Url;
  }

  getPath(): string {
    return '/e2ed/';
  }
}
