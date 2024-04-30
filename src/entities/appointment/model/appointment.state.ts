import axios from 'axios';
import { StateCreator, create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { API } from '../API/appointmentApi';
import { AppointmentModel } from '.';

export interface AppointmentState {
    getAppointmentByUserId: (id: number) => Promise<AppointmentModel.Appointment[]>;
    newAppointment: (data: AppointmentModel.NewAppointmentFormType) => Promise<void>;
    deleteAppointment: (id: number) => Promise<void>;
    getAppointmentByDoctorId: (id: number) => Promise<AppointmentModel.Appointment[]>;
}

const createAppointmentSlice: StateCreator<
    AppointmentState,
    [['zustand/devtools', never]],
    [],
    AppointmentState
> = () => ({
    getAppointmentByUserId: async (id) => {
        const { data } = await axios.get<AppointmentModel.Appointment[]>(API.byUserId(id));
        return data;
    },
    newAppointment: async (data) => {
        await axios.post(API.byUser, data);
    },
    deleteAppointment: async (id) => {
        await axios.delete(API.byId(id));
    },
    getAppointmentByDoctorId: async (id) => {
        const { data } = await axios.get<AppointmentModel.Appointment[]>(API.byDoctorId(id));

        return data;
    },
});

export const useAppointmentStore = create<AppointmentState>()(
    devtools((...args) => ({ ...createAppointmentSlice(...args) }), {
        name: 'Appointment',
    })
);
