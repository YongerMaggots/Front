import { apiCore } from '@/shared/api';

const PREFIX = apiCore.PREFIX;

export const API = {
    user: {
        my: `${PREFIX}/profile/my`,
        byId: (id: number) => `${PREFIX}/user/${id}`,
        role: (id: number) => `${PREFIX}/user/${id}/role`,
    },
    auth: {
        login: `${PREFIX}/auth/login`,
        register: `${PREFIX}/auth/register`,
    },
    doctor: {
        byParams: `${PREFIX}/doctors`,
    },
};
