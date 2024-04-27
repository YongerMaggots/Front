import { RoleEnum } from '@/entities/user/model/user.modal';

export interface ChangeUserRoleProps {
    userId: number;
    currentRole: RoleEnum;
    getUser: () => Promise<void>;
}
