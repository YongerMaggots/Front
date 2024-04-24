import { AppointmentModel } from '@/entities/appointment/model';
import { PetModel } from '@/entities/pet/model';

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
    pets: PetModel.pet[];
    appointments: AppointmentModel.Appointment[];
}

export interface IMyProfile extends User {
    restoreToken?: string;
}

export interface IUserProfile extends User {}

export type AuthFormType = 'login' | 'register';
