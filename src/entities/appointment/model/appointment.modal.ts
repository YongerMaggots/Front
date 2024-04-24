import { PetModel } from '@/entities/pet/model';

export interface Appointment {
    id: number;
    pet: PetModel.pet;
    ness: number; // TODO: Поменять, когда будет
    description: string;
    date: string;
}
