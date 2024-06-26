import axios from 'axios';
import { StateCreator, create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { API } from '../API/petApi';
import { handlerError } from '@/shared/lib/handle-error';
import { PetModel } from '.';

export interface PetState {
    addNewPet: (pet: Pick<PetModel.Pet, 'name' | 'kind' | 'breed'>) => Promise<void>;
    getPetsByUserId: (id: number) => Promise<PetModel.Pet[]>;
    deletePet: (id: number) => Promise<void>;
    editPet: (id: number, pet: PetModel.Pet) => Promise<void>;
}

const createPetSlice: StateCreator<PetState, [['zustand/devtools', never]], [], PetState> = () => ({
    addNewPet: async (pet) => {
        await axios.post<PetModel.Pet>(API.byUser, pet);
    },
    getPetsByUserId: async (id) => {
        const { data } = await axios.get<PetModel.Pet[]>(API.byUserId(id));
        return data;
    },
    deletePet: async (id) => {
        try {
            await axios.delete(API.byPetId(id));
        } catch (error) {
            handlerError(error);
        }
    },
    editPet: async (id, pet) => {
        try {
            await axios.put<PetModel.Pet>(API.byPetId(id), pet);
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
