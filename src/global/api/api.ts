import { authApi } from './endpoints/auth';
import { userApi } from './endpoints/user';

export const api = {
  auth: authApi,
  user: userApi,
} as const;
