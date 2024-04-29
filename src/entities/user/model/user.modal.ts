export enum RoleEnum {
    admin = 'admin',
    doctor = 'doctor',
    user = 'client',
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

export interface Doctor extends User {}

export interface IMyProfile extends User {
    token: string;
}

export type LoginResponse = {
    token: string;
};

export interface IUserProfile extends User {}

export type AuthFormType = 'login' | 'register';
