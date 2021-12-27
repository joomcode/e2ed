import {
  e2edAddOnClickOnClass,
  e2edChooseTestRun,
  e2edClickOnRetry,
  e2edClickOnTestRun,
  e2edCreateSafeHtmlWithoutSanitize,
  e2edRenderTestRunDetails,
  e2edSanitizeHtml,
} from '../client';

import type {SafeHtml} from '../../../types/internal';

/**
 * Render JS client global functions for report.
 * @internal
 */
export const renderScriptGlobalFunctions = (): SafeHtml => e2edCreateSafeHtmlWithoutSanitize`
${e2edAddOnClickOnClass.toString()}
${e2edChooseTestRun.toString()}
${e2edCreateSafeHtmlWithoutSanitize.toString()}
${e2edClickOnRetry.toString()}
${e2edClickOnTestRun.toString()}
${e2edRenderTestRunDetails.toString()}
${e2edSanitizeHtml.toString()}
`;
