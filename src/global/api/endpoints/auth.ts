import { ax } from '../api.config';

export const authApi = {
  login: async (id: number) => {
    const { data } = await ax.post<{ token: string }>('/auth/login', { id });
    localStorage.setItem('token', data.token);
  },
} as const;
