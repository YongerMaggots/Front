import { UserModel } from '@/entities/user/model';
import { AppointmentModel } from '../../model';

export interface AppointmentCardProps {
    onDelete?: (id: number) => void;
    appointment: AppointmentModel.Appointment;
    my?: boolean;
    isDoctor?: boolean;
}

export interface DoctorInfoProps {
    doctor: UserModel.Doctor;
}

export interface ClientInfoProps {
    client: UserModel.User;
}
