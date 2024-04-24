import { apiCore } from '@/shared/api';

const PREFIX = apiCore.PREFIX;

export const API = {
    pet: {
        my: `${PREFIX}/user/me`,
        byId: (id: number) => `${PREFIX}/user/${id}`,
    },
};
