import {
  createSafeHtmlWithoutSanitize as clientCreateSafeHtmlWithoutSanitize,
  isSafeHtml as clientIsSafeHtml,
  sanitizeHtml as clientSanitizeHtml,
} from './sanitizeHtml';

import type {SafeHtml} from '../../../types/internal';

const createSafeHtmlWithoutSanitize = clientCreateSafeHtmlWithoutSanitize;
const isSafeHtml: typeof clientIsSafeHtml = clientIsSafeHtml;
const sanitizeHtml = clientSanitizeHtml;

/**
 * Creates JSX runtime (functions `createElement` and `Fragment`).
 * This client function should not use scope variables (except global functions).
 * @internal
 */
export function createJsxRuntime(): JSX.Runtime {
  const maxDepth = 8;

  const createElement: JSX.CreateElement = (type, properties, ...children) => {
    const flatChildren = children.flat(maxDepth);

    if (typeof type === 'function') {
      const propertiesWithChildren =
        flatChildren.length === 0 ? properties : {...properties, children: flatChildren};

      return type(propertiesWithChildren ?? undefined);
    }

    const childrenParts: readonly SafeHtml[] = flatChildren.map((child) =>
      isSafeHtml(child) ? child : sanitizeHtml`${child}`,
    );
    const childrenHtml = createSafeHtmlWithoutSanitize`${childrenParts.join('')}`;

    if (properties == null) {
      return sanitizeHtml`<${type}>${childrenHtml}</${type}>`;
    }

    const attributesParts: readonly SafeHtml[] = Object.entries(properties).map(
      ([key, value]) => sanitizeHtml`${key}="${value}"`,
    );
    const attributesHtml = createSafeHtmlWithoutSanitize`${attributesParts.join('')}`;

    return sanitizeHtml`<${type} ${attributesHtml}>${childrenHtml}</${type}>`;
  };

  const Fragment: JSX.Fragment = (properties) => {
    if (properties?.children == null) {
      return createSafeHtmlWithoutSanitize``;
    }

    if (!Array.isArray(properties.children)) {
      return sanitizeHtml`${properties.children}`;
    }

    const flatChildren: unknown[] = properties.children.flat(maxDepth);
    const childrenParts: readonly SafeHtml[] = flatChildren.map((child) =>
      isSafeHtml(child) ? child : sanitizeHtml`${child}`,
    );

    return createSafeHtmlWithoutSanitize`${childrenParts.join('')}`;
  };

  return {Fragment, createElement};
}
