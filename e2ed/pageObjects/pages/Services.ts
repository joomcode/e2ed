import {Page} from 'e2ed';
import {Services as ServicesRoute} from 'e2ed/routes/pageRoutes';

/**
 * The services page.
 */
export class Services extends Page {
  getRoute(): ServicesRoute {
    return new ServicesRoute();
  }
}
