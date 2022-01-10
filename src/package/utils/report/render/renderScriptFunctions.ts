import {
  addOnClickOnClass,
  chooseTestRun,
  clickOnRetry,
  clickOnStep,
  clickOnTestRun,
  createSafeHtmlWithoutSanitize,
  renderDatesInterval,
  renderDuration,
  renderSteps,
  renderTestRunDescription,
  renderTestRunDetails,
  renderTestRunErrors,
  sanitizeHtml,
} from '../client';

import type {SafeHtml} from '../../../types/internal';

/**
 * Render JS client functions for report.
 * @internal
 */
export const renderScriptFunctions = (): SafeHtml => createSafeHtmlWithoutSanitize`
${addOnClickOnClass.toString()}
${chooseTestRun.toString()}
${createSafeHtmlWithoutSanitize.toString()}
${clickOnRetry.toString()}
${clickOnStep.toString()}
${clickOnTestRun.toString()}
${renderDatesInterval.toString()}
${renderDuration.toString()}
${renderSteps.toString()}
${renderTestRunDescription.toString()}
${renderTestRunDetails.toString()}
${renderTestRunErrors.toString()}
${sanitizeHtml.toString()}
`;
