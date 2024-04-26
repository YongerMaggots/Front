import { UserModel } from '@/entities/user/model';

export interface UserAppointmentProps {
    userId: UserModel.User['id'];
    my?: boolean;
}
