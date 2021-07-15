"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.navigateToPage = void 0;
const testcafe_1 = require("testcafe");
const actions_1 = require("./actions");
const pageObjects_1 = require("./pageObjects");
const utils_1 = require("./utils");
__exportStar(require("./ApiRoute"), exports);
__exportStar(require("./Page"), exports);
__exportStar(require("./PageRoute"), exports);
__exportStar(require("./Route"), exports);
const navigateToPage = async (pageName, params) => {
    const startTime = Date.now();
    const page = pageObjects_1.pages[pageName];
    const fullParams = await page.willNavigateTo(params);
    const url = page.route.getUrl(fullParams);
    const startNavigateTime = Date.now();
    (0, utils_1.log)(`Will navigate to the page "${String(pageName)}"`, {
        originParams: params,
        fullParams,
        url,
        willNavigateToExecutedInMs: startNavigateTime - startTime,
    });
    await testcafe_1.t.navigateTo(url);
    await (0, actions_1.waitForInterfaceStabilization)(5000);
    (0, utils_1.log)(`Page "${String(pageName)}" loaded in ${Date.now() - startNavigateTime} ms`, { url });
    return page;
};
exports.navigateToPage = navigateToPage;
