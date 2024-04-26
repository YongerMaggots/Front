import { UserModel } from '@/entities/user/model';

export const getUserRole = (role: UserModel.RoleEnum) => {
    switch (role) {
        case UserModel.RoleEnum.admin:
            return 'Администратор';
        case UserModel.RoleEnum.doctor:
            return 'Доктор';
        default:
            return 'Пользователь';
    }
};

export const getFirstLetter = (str: string) => {
    return str.charAt(0).toUpperCase();
};
