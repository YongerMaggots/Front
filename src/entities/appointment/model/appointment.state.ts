import { StateCreator, create } from 'zustand';
import { devtools } from 'zustand/middleware';

export interface AppointmentState {}

const createAppointmentSlice: StateCreator<
    AppointmentState,
    [['zustand/devtools', never]],
    [],
    AppointmentState
> = (set, get) => ({});

export const useAppointmentStore = create<AppointmentState>()(
    devtools((...args) => ({ ...createAppointmentSlice(...args) }), {
        name: 'Appointment',
    })
);
