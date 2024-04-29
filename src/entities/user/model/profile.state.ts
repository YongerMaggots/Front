import { StateCreator, create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';
import { UserModel } from '.';
import { RoleEnum } from './user.modal';
import axios from 'axios';
import { API } from '../API/userApi';
import { PetModel, usePetStore } from '@/entities/pet/model';
import { AppointmentModel, useAppointmentStore } from '@/entities/appointment/model';

export interface ProfileState {
    token: string | null;
    auth: (data: { [key: string]: string }) => Promise<void>;

    myProfile: Nullable<UserModel.IMyProfile>;
    authMe: () => Promise<void>;
    resetMyProfile: () => void;

    getUserProfile: (id: UserModel.User['id']) => Promise<UserModel.IUserProfile>;

    getDoctor: (limit: number, offset: number) => Promise<UserModel.Doctor[]>;

    myPets: Nullable<PetModel.Pet[]>;
    setMyPets: (pets: PetModel.Pet[]) => void;

    myAppointments: Nullable<AppointmentModel.Appointment[]>;
    setMyAppointments: (appointments: AppointmentModel.Appointment[]) => void;

    changeUserRole: (id: UserModel.User['id'], role: RoleEnum) => Promise<void>;
}

const createProfileSlice: StateCreator<
    ProfileState,
    [['zustand/devtools', never]],
    [],
    ProfileState
> = (set, get) => ({
    token: null,
    myProfile: null,

    authMe: async () => {
        // const myProfile = get().myProfile;

        if (!get().token) return;

        const getPetsByUserId = usePetStore.getState().getPetsByUserId;
        const setMyPets = get().setMyPets;
        const getAppointmentsByUserId = useAppointmentStore.getState().getAppointmentById;
        const setMyAppointments = get().setMyAppointments;

        const { data } = await axios.get<UserModel.IMyProfile>(API.user.my);
        const myPets = await getPetsByUserId(data.id);
        const myAppointments = await getAppointmentsByUserId(data.id);

        set({ myProfile: data });
        setMyPets(myPets);
        setMyAppointments(myAppointments);
    },

    auth: async (data) => {
        const { data: dataRes } = await axios.post<UserModel.LoginResponse>(API.auth.login, data);

        set({ token: dataRes.token });
    },

    getUserProfile: async (id) => {
        const { data } = await axios.get<UserModel.IUserProfile>(API.user.byId(id));
        return data;
    },
    getDoctor: async (limit, offset) => {
        const { data } = await axios.get<UserModel.Doctor[]>(API.doctor.byParams, {
            params: {
                limit: limit,
                offset: offset,
            },
        });
        return data;
    },
    resetMyProfile: () => {
        set({ myProfile: null, myPets: null, myAppointments: null, token: null });
    },

    myPets: null,

    setMyPets: (pets) => {
        set({ myPets: pets });
    },
    myAppointments: null,
    setMyAppointments: (appointments) => {
        set({ myAppointments: appointments });
    },

    changeUserRole: async (id, role) => {
        await axios.put(API.user.role(id), {
            role,
        });
    },
});

export const useProfileStore = create<ProfileState>()(
    devtools(
        persist((...args) => ({ ...createProfileSlice(...args) }), {
            name: 'storage',
        }),
        {
            name: 'Profile',
        }
    )
);

export const useToken = (): string => {
    const token = useProfileStore.getState().token;

    return token || '';
};
