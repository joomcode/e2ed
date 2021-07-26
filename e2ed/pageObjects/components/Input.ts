import {typeText} from 'e2ed/actions';
import {inputSelector} from 'e2ed/selectors';

export class Input {
  constructor(private readonly name: string) {}

  /**
   *  Input element.
   */
  readonly input = inputSelector(this.name);

  /**
   * Input value.
   */
  get value(): Promise<string> {
    return this.input.value as Promise<string>;
  }

  /**
   * Type text into an input.
   */
  type(text: string): Promise<void> {
    return typeText(this.input, text);
  }
}
