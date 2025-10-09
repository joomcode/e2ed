import {assertValueIsDefined as clientAssertValueIsDefined} from '../assertValueIsDefined';
import {createSafeHtmlWithoutSanitize as clientCreateSafeHtmlWithoutSanitize} from '../sanitizeHtml';

import type {SafeHtml} from '../../../../types/internal';

const assertValueIsDefined: typeof clientAssertValueIsDefined = clientAssertValueIsDefined;
const createSafeHtmlWithoutSanitize = clientCreateSafeHtmlWithoutSanitize;

declare const jsx: JSX.Runtime;

type Props = Readonly<{
  elements?: readonly SafeHtml[];
  separator?: string;
  withoutSanitize?: readonly string[];
}>;

/**
 * Renders (join) list of any rendered elements.
 * This base client function should not use scope variables (except other base functions).
 * @internal
 */
export const List: JSX.Component<Props> = ({elements, separator = '', withoutSanitize}) => {
  const strings = elements || withoutSanitize;

  assertValueIsDefined(strings);

  return createSafeHtmlWithoutSanitize`${strings.join(separator)}`;
};
