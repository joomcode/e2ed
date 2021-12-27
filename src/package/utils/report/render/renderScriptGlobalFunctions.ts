import {
  e2edAddOnClickOnClass,
  e2edChooseTestRun,
  e2edClickOnRetry,
  e2edClickOnStep,
  e2edClickOnTestRun,
  e2edCreateSafeHtmlWithoutSanitize,
  e2edRenderDatesInterval,
  e2edRenderDuration,
  e2edRenderSteps,
  e2edRenderTestRunDescription,
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
${e2edClickOnStep.toString()}
${e2edClickOnTestRun.toString()}
${e2edRenderDatesInterval.toString()}
${e2edRenderDuration.toString()}
${e2edRenderSteps.toString()}
${e2edRenderTestRunDescription.toString()}
${e2edRenderTestRunDetails.toString()}
${e2edSanitizeHtml.toString()}
`;
