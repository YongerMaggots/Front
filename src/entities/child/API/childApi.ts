import { apiCore } from '@/shared/api';

const PREFIX = apiCore.PREFIX;

export const API = {
    byChildId: (id: number) => `${PREFIX}/child/${id}`,
    byUserId: (id: number) => `${PREFIX}/child/user/${id}`,
    byUser: `${PREFIX}/child/user`,
};
