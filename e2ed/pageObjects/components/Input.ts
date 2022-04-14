import {typeText} from 'e2ed/actions';
import {inputSelector} from 'e2ed/selectors';

import type {Selector} from 'e2ed/types';

export class Input {
  /**
   *  Input element.
   */
  readonly input: Selector;

  constructor(private readonly name: string) {
    this.input = inputSelector(this.name);
  }

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
