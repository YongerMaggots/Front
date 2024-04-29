import { AppointmentModel } from '@/entities/appointment/model';

export interface AppointmentFormProps {
    edit?: boolean;
}
export type AppointmentFormType = AppointmentModel.NewAppointmentFormType;
