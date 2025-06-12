import { UserDTO } from '@/types/user';
import { ax } from '../api.config';

export const userApi = {
  get: async () => {
    const { data } = await ax.get<UserDTO>('/user');
    return data;
  },
} as const;
