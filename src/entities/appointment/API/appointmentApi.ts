import { apiCore } from '@/shared/api';

const PREFIX = apiCore.PREFIX;

export const API = {
    byUser: `${PREFIX}/appointment/user`,
    byId: (id: number) => `${PREFIX}/appointment/user/${id}`,
};
