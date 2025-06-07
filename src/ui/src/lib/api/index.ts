import { authApi } from "./endpoints/auth";

export const api = {
    auth: authApi,
} as const