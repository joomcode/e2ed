import {createSafeHtmlWithoutSanitize as clientCreateSafeHtmlWithoutSanitize} from '../sanitizeHtml';

const createSafeHtmlWithoutSanitize = clientCreateSafeHtmlWithoutSanitize;

declare const jsx: JSX.Runtime;

type Props = Readonly<{withoutSanitize: string}>;

/**
 * Renders any `SafeHtml` string.
 * This base client function should not use scope variables (except other base functions).
 * @internal
 */
export const SafeHtml: JSX.Component<Props> = ({withoutSanitize}) =>
  createSafeHtmlWithoutSanitize`${withoutSanitize}`;
