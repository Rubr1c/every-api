import { ax } from '../api.config';

export const userApi = {
  login: async (id: number) => {
    const { data } = await ax.post<{ token: string }>('/auth/login', { id });
    return data;
  },
};
