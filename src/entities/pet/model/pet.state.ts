import axios from 'axios';
import { StateCreator, create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { API } from '../API/petApi';
import { handlerError } from '@/shared/lib/handle-error';
import { PetModel } from '.';

export interface PetState {
    getPetsByUserId: (id: number) => Promise<PetModel.Pet[]>;
    deletePet: (id: number) => Promise<void>;
    editPet: (id: number, pet: PetModel.Pet) => Promise<void>;
}

const createPetSlice: StateCreator<
    PetState,
    [['zustand/devtools', never]],
    [],
    PetState
> = () => ({
    getPetsByUserId: async (id) => {
        const { data } = await axios.get<PetModel.Pet[]>(API.byId(id));
        return data;
    },
    deletePet: async (id) => {
        try {
            await axios.delete(API.byId(id));
        } catch (error) {
            handlerError(error);
        }
    },

    editPet: async (id, pet) => {
        try {
            await axios.put<PetModel.Pet>(API.byId(id), pet);
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
