import {Selector} from 'testcafe';

export const TestIdSelector = (id: string): Selector => {
  return Selector(`[data-testid='${id}']`);
};
