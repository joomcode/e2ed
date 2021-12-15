import {e2edRenderTestRunDetails} from './e2edRenderTestRunDetails';

/**
 * Render JS client global functions for report.
 * @internal
 */
export const renderScriptGlobalFunctions = (): string => `
${e2edRenderTestRunDetails.toString()}
`;
