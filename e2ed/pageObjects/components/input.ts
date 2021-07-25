import {cssSelector} from 'e2ed/selectors';

class Input {
  /**
   *  Input element.
   */
  readonly input = cssSelector('input');

  /**
   * Input value.
   */
  get value() {
    return this.input.value as Promise<string>;
  }
}

export const input = new Input();
