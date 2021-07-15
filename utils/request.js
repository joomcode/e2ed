"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.request = void 0;
const http_1 = require("http");
const https_1 = require("https");
const querystring_1 = require("querystring");
const url_1 = require("url");
const E2EDError_1 = require("./E2EDError");
const getRandomId_1 = require("./getRandomId");
const log_1 = require("./log");
const wrapInTestRunTracker_1 = require("./wrapInTestRunTracker");
const defaultIsNeedRetry = ({ statusCode }) => statusCode >= 400;
const oneTryOfRequest = ({ urlObject, options, dataAsString, libRequest, timeout, logParams, }) => new Promise((resolve, reject) => {
    const fullOptions = {
        ...options,
        headers: {
            'X-Api-Token': (0, getRandomId_1.getRandomId)(),
            'X-Request-ID': (0, getRandomId_1.getRandomId)(),
            ...options.headers,
        },
    };
    const fullLogParams = { ...logParams, ...fullOptions };
    (0, log_1.log)(`Will be send a request to ${logParams.url}`, fullLogParams);
    let endTimeout;
    const req = libRequest(urlObject, fullOptions, (res) => {
        res.on = (0, wrapInTestRunTracker_1.wrapInTestRunTracker)(res.on);
        endTimeout = setTimeout(() => {
            req.destroy();
            req.emit('error', new E2EDError_1.E2EDError(`The request to ${logParams.url} is timed out in ${timeout} ms`, fullLogParams));
        }, timeout);
        res.setEncoding('utf8');
        const chunks = [];
        res.on('data', (chunk) => {
            chunks.push(chunk);
        });
        res.on('end', () => {
            const responseDataAsString = chunks.join('');
            try {
                const responseData = JSON.parse(responseDataAsString);
                const response = {
                    statusCode: res.statusCode || 400,
                    headers: res.headers,
                    data: responseData,
                };
                clearTimeout(endTimeout);
                resolve({ fullLogParams, response });
            }
            catch (cause) {
                clearTimeout(endTimeout);
                reject(new E2EDError_1.E2EDError(`The response data string to request ${logParams.url} is not valid JSON: ${responseDataAsString}`, { ...fullLogParams, cause }));
            }
        });
    });
    req.on = (0, wrapInTestRunTracker_1.wrapInTestRunTracker)(req.on);
    req.on('error', (cause) => {
        clearTimeout(endTimeout);
        reject(new E2EDError_1.E2EDError(`Error on request to ${logParams.url}`, { ...fullLogParams, cause }));
    });
    req.write(dataAsString);
    req.end();
});
const request = async ({ url, query, method = 'GET', headers, data = '', timeout = 30_000, maxRetriesCount = 5, isNeedRetry = defaultIsNeedRetry, }) => {
    const urlObject = new url_1.URL(url);
    const logParams = { url, query, method, headers, data, timeout };
    if (urlObject.search !== '') {
        throw new E2EDError_1.E2EDError(`Url for request to ${url} contains search part: ${urlObject.search}`, logParams);
    }
    urlObject.search = (0, querystring_1.stringify)(query);
    const dataAsString = typeof data === 'string' ? data : JSON.stringify(data);
    const options = {
        method,
        headers: {
            'Content-Length': String(Buffer.byteLength(dataAsString)),
            'Content-Type': 'application/json; charset=UTF-8',
            ...headers,
        },
    };
    const libRequest = (0, wrapInTestRunTracker_1.wrapInTestRunTracker)(urlObject.protocol === 'http:' ? http_1.request : https_1.request);
    logParams.headers = options.headers;
    for (let retryIndex = 1; retryIndex <= maxRetriesCount; retryIndex += 1) {
        const retry = `${retryIndex}/${maxRetriesCount}`;
        try {
            const { fullLogParams, response } = await oneTryOfRequest({
                urlObject,
                options,
                dataAsString,
                libRequest,
                timeout,
                logParams: { ...logParams, retry },
            });
            const needRetry = isNeedRetry(response);
            (0, log_1.log)(`Got a response to the request to ${url}`, { ...fullLogParams, needRetry, response });
            if (needRetry === false) {
                return response;
            }
        }
        catch (cause) {
            (0, log_1.log)(`An error was received during the request to ${url}`, { ...logParams, retry, cause });
        }
    }
    throw new E2EDError_1.E2EDError(`All ${maxRetriesCount} retries to request to ${url} have been exhausted`, logParams);
};
exports.request = request;
