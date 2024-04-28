import { PetModel } from '@/entities/pet/model';

export type PetFormType = Pick<PetModel.Pet, 'name' | 'type' | 'breed'>;
