import { UserModal } from '@/entities/user/model';

type userType = UserModal.User;

export interface UserAppointmentProps {
    userData: Nullable<Pick<userType, 'appointments'>>;
    my?: boolean;
}
