import type {UserPhone} from 'e2ed/types';

const USER_PHONE_RE = /^\+\d{1,3}(-\d{2,3})+$/;

export function isValidUserPhone(maybeUserPhone: string): maybeUserPhone is UserPhone {
  if (!USER_PHONE_RE.test(maybeUserPhone)) {
    return false;
  }

  return maybeUserPhone.length >= 7 && maybeUserPhone.length <= 15;
}
