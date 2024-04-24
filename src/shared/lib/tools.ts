import { UserModal } from '@/entities/user/model';

export const getUserRole = (role: UserModal.RoleEnum) => {
    switch (role) {
        case UserModal.RoleEnum.admin:
            return 'Администратор';
        case UserModal.RoleEnum.doctor:
            return 'Доктор';
        default:
            return 'Пользователь';
    }
};

export const getFirstLetter = (str: string) => {
    return str.charAt(0).toUpperCase();
};
