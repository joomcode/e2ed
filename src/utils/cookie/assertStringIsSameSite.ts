import {assertValueIsNever} from '../asserts';

import type {SameSite} from '../../types/internal';

/**
 * Asserts that the string is cookie's sameSite property.
 */
export function assertStringIsSameSite(string: string): asserts string is SameSite {
  const sameSite = string as SameSite;

  switch (sameSite) {
    case 'Lax':
    case 'None':
    case 'Strict':
      return;

    // no default
  }

  // @ts-expect-error: unreachable code
  assertValueIsNever(
    sameSite satisfies never,
    'sameSite has invalid value in exhaustiveness check',
    {sameSite},
  );
}
