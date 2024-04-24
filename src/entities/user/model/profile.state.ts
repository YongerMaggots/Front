import { StateCreator, create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { UserModal } from '.';
import { RoleEnum } from './user.modal';
import axios from 'axios';
import { API } from '../API/userApi';
import { PetEnum } from '@/entities/pet/model/pet.modal';

export interface ProfileState {
    myProfile: Nullable<UserModal.IMyProfile>;
    userProfile: Nullable<UserModal.IUserProfile>;
    getUserProfile: (id: UserModal.User['id']) => Promise<void>;
    resetUserProfile: () => void;
    resetMyProfile: () => void;
}

const createProfileSlice: StateCreator<
    ProfileState,
    [['zustand/devtools', never]],
    [],
    ProfileState
> = (set, get) => ({
    myProfile: {
        id: 1,
        email: 'example@gmail.ru',
        name: 'Mike',
        surname: 'Green',
        role: RoleEnum.user,
        restoreToken: '123',
        pets: [
            {
                id: 0,
                name: 'Doogy',
                type: PetEnum.dog,
                ownerId: 1,
            },
            {
                id: 1,
                name: 'Catty',
                type: PetEnum.cat,
                ownerId: 1,
            },
        ],
        appointments: [],
    },

    userProfile: {
        id: 1,
        email: 'example@gmail.ru',
        name: 'Mike',
        surname: 'Green',
        role: RoleEnum.user,
        pets: [],
        appointments: [],
    },

    getUserProfile: async (id) => {
        const { data } = await axios.get<UserModal.IUserProfile>(
            API.user.byId(id)
        );
        set({ userProfile: data });
        get().resetUserProfile();
    },
    resetUserProfile: () => {
        set({ userProfile: null });
    },
    resetMyProfile: () => {
        set({ myProfile: null });
    },
});

export const useProfileStore = create<ProfileState>()(
    devtools((...args) => ({ ...createProfileSlice(...args) }), {
        name: 'Profile',
    })
);
