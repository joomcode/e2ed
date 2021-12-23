import {e2edAddOnClickOnClass} from './client/e2edAddOnClickOnClass';
import {e2edClickOnRetry} from './client/e2edClickOnRetry';
import {e2edRenderTestRunDetails} from './client/e2edRenderTestRunDetails';

/**
 * Render JS client global functions for report.
 * @internal
 */
export const renderScriptGlobalFunctions = (): string => `
${e2edAddOnClickOnClass.toString()}
${e2edClickOnRetry.toString()}
${e2edRenderTestRunDetails.toString()}
`;
