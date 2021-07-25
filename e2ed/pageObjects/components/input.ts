import {cssSelector} from 'e2ed/selectors';

class Input {
  /**
   *  Input element.
   */
  readonly input = cssSelector('input[title=Search]');

  /**
   * Input value.
   */
  get value(): Promise<string> {
    return this.input.value as Promise<string>;
  }
}

export const input = new Input();
