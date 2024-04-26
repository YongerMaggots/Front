import axios from 'axios';
import { StateCreator, create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { API } from '../API/appointmentApi';
import { AppointmentModel } from '.';

export interface AppointmentState {
    getAppointmentById: (id: number) => Promise<AppointmentModel.Appointment[]>;
}

const createAppointmentSlice: StateCreator<
    AppointmentState,
    [['zustand/devtools', never]],
    [],
    AppointmentState
> = () => ({
    getAppointmentById: async (id) => {
        const { data } = await axios.get<AppointmentModel.Appointment[]>(
            API.byId(id)
        );
        return data;
    },
});

export const useAppointmentStore = create<AppointmentState>()(
    devtools((...args) => ({ ...createAppointmentSlice(...args) }), {
        name: 'Appointment',
    })
);
