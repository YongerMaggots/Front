import { AppointmentModel } from '../../model';

export interface AppointmentCardProps {
    appointment: AppointmentModel.Appointment;
    my?: boolean;
}
