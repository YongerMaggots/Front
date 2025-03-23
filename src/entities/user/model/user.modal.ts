export enum RoleEnum {
    admin = 'admin',
    doctor = 'doctor',
    user = 'client',
}

export interface User {
    id: number;
    email: string;
    name?: string;
    surname?: string;
    photo?: string;
    role: RoleEnum;
    phone?: string;
}

export interface Doctor extends User {}

export interface IMyProfile extends User {
    token: string;
}

export interface ILoginPayload extends Pick<User, 'email'> {
    password: string;
}

export interface IRegisterPayload extends Pick<User, 'email' | 'surname' | 'name'> {
    password: string;
    repeatPassword: string;
}

export type LoginResponse = {
    token: string;
};

export type EditProfileFormType = Pick<User, 'name' | 'surname' | 'email' | 'phone'>;

export interface IUserProfile extends User {}

export type AuthFormType = 'login' | 'register';
