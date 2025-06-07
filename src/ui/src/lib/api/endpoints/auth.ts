import { axiosInstance } from "../api.config";

export const authApi = {
  authenticate: async (userId: number) => {
    const res = await axiosInstance.post(`api/auth/login`, { userId });
    localStorage.setItem("token", res.data.token);
    return res.data;
  },
};
