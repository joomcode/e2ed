import type {Brand} from 'e2ed/types';

/**
 * User email.
 */
export type Email = Brand<string, 'Email'>;

/**
 * User password.
 */
export type Password = Brand<string, 'Password'>;

/**
 * User id.
 */
export type UserId = Brand<string, 'UserId'>;

/**
 * Main user info.
 */
export type UserInfo = Readonly<{
  name: string;
  email: Email;
}>;

export type User = Readonly<UserInfo & {id: UserId}>;
