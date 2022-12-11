import type {UserPhone} from 'autotests/types';

const USER_PHONE_RE = /^\+\d{1,3}(-\d{2,3})+$/;

/**
 * Returns true, if user phone is valid, and false otherwise.
 */
export function isValidUserPhone(maybeUserPhone: string): maybeUserPhone is UserPhone {
  if (!USER_PHONE_RE.test(maybeUserPhone)) {
    return false;
  }

  return maybeUserPhone.length >= 7 && maybeUserPhone.length <= 15;
}
