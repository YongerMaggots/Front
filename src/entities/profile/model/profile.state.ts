import {StateCreator, create} from 'zustand';
import {devtools} from 'zustand/middleware';
import {UserModal} from '.';

export interface ProfileState {
    profile: Nullable<UserModal.User>;
}

const createProfileSlice: StateCreator<ProfileState, [['zustand/devtools', never]], [], ProfileState> = () => ({
    profile: null,
});

export const useProfileStore = create<ProfileState>()(devtools((...args) => ({...createProfileSlice(...args)}), {name: 'Profile'}));
