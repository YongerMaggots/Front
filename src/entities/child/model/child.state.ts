import axios from 'axios';
import { StateCreator, create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { API } from '../API/childApi';
import { handlerError } from '@/shared/lib/handle-error';
import { ChildModel } from '.';

export interface ChildState {
    addNewChild: (
        child: Pick<ChildModel.Child, 'name' | 'age' | 'gender' | 'surname'>
    ) => Promise<void>;
    getChildrensByUserId: (id: number) => Promise<ChildModel.Child[]>;
    deleteChild: (id: number) => Promise<void>;
    editChild: (id: number, child: ChildModel.Child) => Promise<void>;
}

const createChildSlice: StateCreator<
    ChildState,
    [['zustand/devtools', never]],
    [],
    ChildState
> = () => ({
    addNewChild: async (child) => {
        await axios.post<ChildModel.Child>(API.byUser, child);
    },
    getChildrensByUserId: async (id) => {
        const { data } = await axios.get<ChildModel.Child[]>(API.byUserId(id));
        return data;
    },
    deleteChild: async (id) => {
        try {
            await axios.delete(API.byChildId(id));
        } catch (error) {
            handlerError(error);
        }
    },
    editChild: async (id, child) => {
        try {
            await axios.put<ChildModel.Child>(API.byChildId(id), child);
        } catch (error) {
            handlerError(error);
        }
    },
});

export const useChildStore = create<ChildState>()(
    devtools((...args) => ({ ...createChildSlice(...args) }), {
        name: 'ChildStore',
    })
);
