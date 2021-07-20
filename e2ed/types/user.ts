import type {Brand} from 'e2ed/types';

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
  email: string;
}>;

export type User = Readonly<UserInfo & {id: UserId}>;
