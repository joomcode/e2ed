import {
  addDomContentLoadedHandler,
  addOnClickOnClass,
  assertValueIsDefined,
  chooseTestRun,
  clickOnRetry,
  clickOnStep,
  clickOnTestRun,
  createSafeHtmlWithoutSanitize,
  domContentLoadedHandler,
  readJsonReportData,
  renderDatesInterval,
  renderDuration,
  renderSteps,
  renderTestRunDescription,
  renderTestRunDetails,
  renderTestRunError,
  sanitizeHtml,
} from '../client';

import type {SafeHtml} from '../../../types/internal';

/**
 * Renders JS client functions for report.
 * @internal
 */
export const renderScriptFunctions = (): SafeHtml => createSafeHtmlWithoutSanitize`
${addDomContentLoadedHandler.toString()}
${addOnClickOnClass.toString()}
${assertValueIsDefined.toString()}
${chooseTestRun.toString()}
${createSafeHtmlWithoutSanitize.toString()}
${clickOnRetry.toString()}
${clickOnStep.toString()}
${clickOnTestRun.toString()}
${domContentLoadedHandler.toString()}
${readJsonReportData.toString()}
${renderDatesInterval.toString()}
${renderDuration.toString()}
${renderSteps.toString()}
${renderTestRunDescription.toString()}
${renderTestRunDetails.toString()}
${renderTestRunError.toString()}
${sanitizeHtml.toString()}
`;
