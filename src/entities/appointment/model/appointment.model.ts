import { PetModel } from '@/entities/pet/model';
import { UserModel } from '@/entities/user/model';

export interface Appointment {
    id: number;
    pet: PetModel.Pet;
    doctor: UserModel.Doctor;
    client: UserModel.User;
    description: string;
    date: string;
}

export type NewAppointmentFormType = Pick<Appointment, 'description' | 'date'> & {
    petId: number;
    doctorId: number;
};
