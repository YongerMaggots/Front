import { PetModel } from '@/entities/pet/model';
import { UserModel } from '@/entities/user/model';

export interface Appointment {
    id: number;
    pet: PetModel.Pet;
    ness: UserModel.User; // TODO: Поменять, когда будет
    description: string;
    date: string;
}

export type NewAppointmentFormType = Pick<Appointment, 'description'> & {
    petId: number;
    doctorId: number;
};
