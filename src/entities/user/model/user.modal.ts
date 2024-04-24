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
    appointments: {
        id: AppointmentModel.Appointment['id'];
        pet: PetModel.pet;
        ness: number; // TODO: Поменять, когда будет
        description: string;
    };
}

export interface IMyProfile extends User {
    restoreToken?: string;
}

export interface IUserProfile extends User {}

export type AuthFormType = 'login' | 'register';
