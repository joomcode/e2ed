import {getDurationWithUnits} from '../../getDurationWithUnits';

import {
  addDomContentLoadedHandler,
  addOnClickOnClass,
  assertValueIsDefined,
  chooseTestRun,
  clickOnRetry,
  clickOnStep,
  clickOnTestRun,
  createSafeHtmlWithoutSanitize,
  onDomContentLoad,
  onFirstJsonReportDataLoad,
  parseMarkdownLinks,
  readJsonReportData,
  readPartOfJsonReportData,
  renderDatesInterval,
  renderDuration,
  renderStep,
  renderStepContent,
  renderSteps,
  renderTestRunDescription,
  renderTestRunDetails,
  renderTestRunError,
  sanitizeHtml,
  setReadJsonReportDataObservers,
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
${onDomContentLoad.toString()}
${onFirstJsonReportDataLoad.toString()}
${getDurationWithUnits.toString()}
${parseMarkdownLinks.toString()}
${readJsonReportData.toString()}
${readPartOfJsonReportData.toString()}
${renderDatesInterval.toString()}
${renderDuration.toString()}
${renderStep.toString()}
${renderStepContent.toString()}
${renderSteps.toString()}
${renderTestRunDescription.toString()}
${renderTestRunDetails.toString()}
${renderTestRunError.toString()}
${sanitizeHtml.toString()}
${setReadJsonReportDataObservers.toString()}
`;
