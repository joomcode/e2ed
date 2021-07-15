"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SetHeadersRequestHook = void 0;
const testcafe_1 = require("testcafe");
const applyHeadersMapper_1 = require("./applyHeadersMapper");
const log_1 = require("./log");
const wrapInTestRunTracker_1 = require("./wrapInTestRunTracker");
class SetHeadersRequestHook extends testcafe_1.RequestHook {
    url;
    options;
    constructor(url, options) {
        super([url], { includeHeaders: true });
        this.url = url;
        this.options = options;
        this.resetMethods(this.onRequest, this._onConfigureResponse);
    }
    async onRequest(event) {
        const { headers } = event.requestOptions;
        (0, applyHeadersMapper_1.applyHeadersMapper)(headers, this.options.mapRequestHeaders);
        (0, log_1.log)(`Map request headers for ${this.url}`, { headers });
    }
    async onResponse() {
    }
    async _onConfigureResponse(event) {
        await super._onConfigureResponse(event);
        const { headers } = event._requestContext.destRes;
        (0, applyHeadersMapper_1.applyHeadersMapper)(headers, this.options.mapResponseHeaders);
        (0, log_1.log)(`Map response headers for ${this.url}`, { headers });
    }
    resetMethods(onRequest, _onConfigureResponse) {
        this.onRequest = onRequest;
        this._onConfigureResponse = _onConfigureResponse;
    }
}
exports.SetHeadersRequestHook = SetHeadersRequestHook;
SetHeadersRequestHook.prototype.resetMethods = (0, wrapInTestRunTracker_1.wrapInTestRunTracker)(SetHeadersRequestHook.prototype.resetMethods);
