import { apiCore } from '@/shared/api';

const PREFIX = apiCore.PREFIX;

export const API = {
    byPetId: (id: number) => `${PREFIX}/pet/${id}`,
    byUserId: (id: number) => `${PREFIX}/pet/user/${id}`,
    byUser: `${PREFIX}/pet/user`,
};
