import { StateCreator, create } from 'zustand';
import { devtools } from 'zustand/middleware';

export interface AppointmentState {}

const createAppointmentSlice: StateCreator<
    AppointmentState,
    [['zustand/devtools', never]],
    [],
    AppointmentState
> = () => ({});

export const useAppointmentStore = create<AppointmentState>()(
    devtools((...args) => ({ ...createAppointmentSlice(...args) }), {
        name: 'Appointment',
    })
);
