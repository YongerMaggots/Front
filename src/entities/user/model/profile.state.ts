import { StateCreator, create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { UserModal } from '.';

export interface ProfileState {
    profile: Nullable<UserModal.User>;
    resetProfile: () => void;
}

const createProfileSlice: StateCreator<
    ProfileState,
    [['zustand/devtools', never]],
    [],
    ProfileState
> = (set, get) => ({
    profile: null,
    resetProfile: () => {
        get().profile = null;
    },
});

export const useProfileStore = create<ProfileState>()(
    devtools((...args) => ({ ...createProfileSlice(...args) }), {
        name: 'Profile',
    })
);
