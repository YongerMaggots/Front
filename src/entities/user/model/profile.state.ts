import { StateCreator, create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';
import { UserModel } from '.';
import { RoleEnum } from './user.modal';
import axios from 'axios';
import { API } from '../API/userApi';
import { ChildModel, useChildStore } from '@/entities/child/model';
import { AppointmentModel, useAppointmentStore } from '@/entities/appointment/model';

export interface ProfileState {
    token: string | null;
    login: (data: UserModel.ILoginPayload) => Promise<void>;
    register: (data: UserModel.IRegisterPayload) => Promise<void>;
    authMe: () => Promise<void>;

    myProfile: Nullable<UserModel.IMyProfile>;
    editProfile: (data: UserModel.EditProfileFormType) => Promise<void>;
    resetMyProfile: () => void;

    getUserProfile: (id: UserModel.User['id']) => Promise<UserModel.IUserProfile>;

    getDoctor: (limit: number, offset: number) => Promise<UserModel.Doctor[]>;

    myChildrens: Nullable<ChildModel.Child[]>;
    setMyChildrens: (childrens: ChildModel.Child[]) => void;

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
        if (!get().token) return;

        const getChildrensByUserId = useChildStore.getState().getChildrensByUserId;
        const setMyChildrens = get().setMyChildrens;
        const getAppointmentsByUserId = useAppointmentStore.getState().getAppointmentByUserId;
        const setMyAppointments = get().setMyAppointments;

        const { data } = await axios.get<UserModel.IMyProfile>(API.user.my);
        const myChildrens = await getChildrensByUserId(data.id);
        const myAppointments = await getAppointmentsByUserId(data.id);

        set({ myProfile: data });
        setMyChildrens(myChildrens);
        setMyAppointments(myAppointments);
    },

    login: async (data) => {
        const { data: dataRes } = await axios.post<UserModel.LoginResponse>(API.auth.login, data);

        set({ token: dataRes.token }, false, 'login');
        get().authMe();
    },

    register: async (data) => {
        const { data: dataRes } = await axios.post<UserModel.LoginResponse>(
            API.auth.register,
            data
        );
        set({ token: dataRes.token }, false, 'register');
    },

    getUserProfile: async (id) => {
        const { data } = await axios.get<UserModel.IUserProfile>(API.user.byId(id));
        return data;
    },
    editProfile: async (data) => {
        await axios.put(API.user.my, data);
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
        set(
            { myProfile: null, myChildrens: null, myAppointments: null, token: null },
            false,
            'reset'
        );
    },

    myChildrens: null,

    setMyChildrens: (childrens) => {
        set({ myChildrens: childrens }, false, 'setMyChildrens');
    },
    myAppointments: null,
    setMyAppointments: (appointments) => {
        set({ myAppointments: appointments }, false, 'setMyAppointments');
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
            name: 'ProfileStore',
        }
    )
);

export const useToken = (): string => {
    const token = useProfileStore.getState().token;

    return token || '';
};
