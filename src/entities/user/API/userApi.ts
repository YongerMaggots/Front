import { apiCore } from '@/shared/api';

const PREFIX = apiCore.PREFIX;

export const API = {
    user: {
        my: `${PREFIX}/user/me`,
        byId: (id: number) => `${PREFIX}/user/${id}`,
        role: (id: number) => `${PREFIX}/user/${id}/role`,
    },
};
