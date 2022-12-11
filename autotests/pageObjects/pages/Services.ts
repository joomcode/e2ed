import {Services as ServicesRoute} from 'autotests/routes/pageRoutes';
import {Page} from 'e2ed';

/**
 * The Services page.
 */
export class Services extends Page {
  getRoute(): ServicesRoute {
    return new ServicesRoute();
  }
}
