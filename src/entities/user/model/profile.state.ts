import { StateCreator, create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { UserModel } from '.';
import { RoleEnum } from './user.modal';
import axios from 'axios';
import { API } from '../API/userApi';
import { PetEnum } from '@/entities/pet/model/pet.modal';
import { PetModel, usePetStore } from '@/entities/pet/model';
import { AppointmentModel, useAppointmentStore } from '@/entities/appointment/model';

export interface ProfileState {
    myProfile: Nullable<UserModel.IMyProfile>;
    getMyProfile: (id: UserModel.User['id']) => Promise<void>;
    resetMyProfile: () => void;

    getUserProfile: (id: UserModel.User['id']) => Promise<UserModel.IUserProfile>;

    myPets: Nullable<PetModel.Pet[]>;
    setMyPets: (pets: PetModel.Pet[]) => void;

    myAppointments: Nullable<AppointmentModel.Appointment[]>;
    setMyAppointments: (appointments: AppointmentModel.Appointment[]) => void;
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
    },

    getMyProfile: async (id) => {
        const getPetsByUserId = usePetStore.getState().getPetsByUserId;
        const setMyPets = get().setMyPets;
        const getAppointmentsByUserId = useAppointmentStore.getState().getAppointmentById;
        const setMyAppointments = get().setMyAppointments;

        const { data } = await axios.get<UserModel.IUserProfile>(API.user.byId(id));
        const myPets = await getPetsByUserId(data.id);
        const myAppointments = await getAppointmentsByUserId(data.id);

        set({ myProfile: data });
        setMyPets(myPets);
        setMyAppointments(myAppointments);
    },

    getUserProfile: async (id) => {
        const { data } = await axios.get<UserModel.IUserProfile>(API.user.byId(id));
        return data;
    },

    resetMyProfile: () => {
        set({ myProfile: null, myPets: null, myAppointments: null });
    },

    myPets: [
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
    setMyPets: (pets) => {
        set({ myPets: pets });
    },
    myAppointments: [
        {
            id: 0,
            pet: {
                id: 1,
                name: 'Catty',
                type: PetEnum.cat,
                ownerId: 1,
            },
            date: '2022-12-12T12:00:00.000Z',
            ness: {
                id: 5,
                name: 'Доктор',
                surname: 'Айболит',
                role: RoleEnum.doctor,
                email: 'doctor@gmail.ru',
                phone: '+7 (619) 555-55-55',
            },
            description: 'У моей Маси ножка зудит',
        },
    ],
    setMyAppointments: (appointments) => {
        set({ myAppointments: appointments });
    },
});

export const useProfileStore = create<ProfileState>()(
    devtools((...args) => ({ ...createProfileSlice(...args) }), {
        name: 'Profile',
    })
);
