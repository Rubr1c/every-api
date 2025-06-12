import { ax } from "../api.config";


export const userApi = {
    get: async (id: number) => await ax.post('/auth/login', { id }),
}