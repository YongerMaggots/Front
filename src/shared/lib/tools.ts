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

export const intlDateFormat = (date: string | Date, options?: Intl.DateTimeFormatOptions) => {
    const currentDate = typeof date === 'string' ? new Date(date) : date;
    const formatter = new Intl.DateTimeFormat('ru', options);
    return formatter.format(currentDate);
};
