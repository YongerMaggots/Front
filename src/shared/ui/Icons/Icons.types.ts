import { PetEnum } from '@/entities/pet/model/pet.modal';

export interface Icons {
    pet: {
        [key in PetEnum]: string;
    };
}
