import axios from 'axios';
import { StateCreator, create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { API } from '../API/petApi';
import { handlerError } from '@/shared/lib/handle-error';
import { PetModel } from '.';

export interface PetState {
    deletePet: (id: number) => Promise<void>;
    editPet: (id: number, pet: PetModel.pet) => Promise<void>;
}

const createPetSlice: StateCreator<
    PetState,
    [['zustand/devtools', never]],
    [],
    PetState
> = (set, get) => ({
    deletePet: async (id) => {
        try {
            await axios.delete(API.pet.byId(id));
        } catch (error) {
            handlerError(error);
        }
    },

    editPet: async (id, pet) => {
        try {
            await axios.put<PetModel.pet>(API.pet.byId(id), pet);
        } catch (error) {
            handlerError(error);
        }
    },
});

export const usePetStore = create<PetState>()(
    devtools((...args) => ({ ...createPetSlice(...args) }), {
        name: 'Pet',
    })
);
