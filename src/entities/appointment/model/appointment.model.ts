import { ChildModel } from '@/entities/child/model';
import { UserModel } from '@/entities/user/model';

export interface Appointment {
    id: number;
    child: ChildModel.Child;
    doctor: UserModel.Doctor;
    client: UserModel.User;
    description: string;
    date: string;
}

export type NewAppointmentFormType = Pick<Appointment, 'description' | 'date'> & {
    childId: number;
    doctorId: number;
};
