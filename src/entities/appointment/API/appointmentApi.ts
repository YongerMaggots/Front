import { apiCore } from '@/shared/api';

const PREFIX = apiCore.PREFIX;

export const API = {
    byId: (id: number) => `${PREFIX}/appointment/${id}`,
    byUser: `${PREFIX}/appointment/user`,
    byUserId: (id: number) => `${PREFIX}/appointment/user/${id}`,
    byDoctorId: (id: number) => `${PREFIX}/appointment/doctor/${id}`,
};
