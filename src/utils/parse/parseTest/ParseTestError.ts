import type {LineColumn} from '../../../types/internal';

/**
 * Parse test error.
 */
export class ParseTestError extends SyntaxError implements LineColumn {
  column = 1;

  line = 1;

  override name = 'ParseTestError';

  source: string | undefined = undefined;

  // eslint-disable-next-line @typescript-eslint/naming-convention
  toJSON(): object {
    return {...this, message: this.message, stack: this.stack};
  }

  override toString(): string {
    return JSON.stringify(this.toJSON());
  }
}
