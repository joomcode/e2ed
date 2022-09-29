import type {Expect, UserlandTypesAreCorrect} from 'e2ed/types';

export declare type check = Expect<UserlandTypesAreCorrect>;

export type {
  ApiDeviceAndProductRequest,
  ApiDeviceAndProductResponse,
  ApiUserRequest,
  ApiUserResponse,
} from './api';
export type {
  ApiDevice,
  ApiDeviceParams,
  ApiUser,
  ApiUserParams,
  Device,
  DeviceId,
  DeviceParams,
  Email,
  Language,
  MobileDevice,
  Password,
  User,
  UserId,
  UserParams,
  UserPhone,
} from './entities';
export type {TestMeta} from './testMeta';
