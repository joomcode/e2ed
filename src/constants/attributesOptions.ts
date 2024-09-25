import type {AttributesOptions} from 'create-locator';

/**
 * Attributes options for locators.
 * @internal
 */
export const attributesOptions = {
  parameterAttributePrefix: 'data-test-',
  testIdAttribute: 'data-testid',
  testIdSeparator: '-',
} as const satisfies AttributesOptions;
