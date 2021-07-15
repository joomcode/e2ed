import { t } from 'testcafe';
import { waitForInterfaceStabilization } from './actions';
import { pages } from './pageObjects';
import { log } from './utils';
export const navigateToPage = async (pageName, params) => {
    const startTime = Date.now();
    const page = pages[pageName];
    const fullParams = await page.willNavigateTo(params);
    const url = page.route.getUrl(fullParams);
    const startNavigateTime = Date.now();
    log(`Will navigate to the page "${String(pageName)}"`, {
        originParams: params,
        fullParams,
        url,
        willNavigateToExecutedInMs: startNavigateTime - startTime,
    });
    await t.navigateTo(url);
    await waitForInterfaceStabilization(2000);
    log(`Page "${String(pageName)}" loaded in ${Date.now() - startNavigateTime} ms`, { url });
    return page;
};
