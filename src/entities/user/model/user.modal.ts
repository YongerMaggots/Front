export enum RoleEnum {
    admin = 'admin',
}

export interface User {
    id: number;
    name: string;
    surname?: string;
    photo?: string;
    role: RoleEnum;
    email: string;
    restoreToken?: string;
}

export type AuthFormType = 'login' | 'register';
