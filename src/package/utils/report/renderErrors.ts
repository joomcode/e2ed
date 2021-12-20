/**
 * Render report errors.
 * @internal
 */
export const renderErrors = (errors: readonly string[]): string => {
  if (errors.length === 0) {
    return '';
  }

  const renderedErrors = errors.map((error) => `<div class="__error">${error}</div>`);

  return `<div class="errors">${renderedErrors.join('')}</div>`;
};
