export enum RoleEnum {
    admin = 'admin',
    doctor = 'doctor',
    user = 'user',
}

export interface User {
    id: number;
    email: string;
    name: string;
    surname?: string;
    photo?: string;
    role: RoleEnum;
    phone?: string;
}

export interface IMyProfile extends User {
    restoreToken?: string;
}

export interface IUserProfile extends User {}

export type AuthFormType = 'login' | 'register';
