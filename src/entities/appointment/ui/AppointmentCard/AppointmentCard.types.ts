import { AppointmentModel } from '../../model';

export interface AppointmentCardProps {
    onDelete?: (id: number) => void;
    appointment: AppointmentModel.Appointment;
    my?: boolean;
}
