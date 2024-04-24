import { UserModal } from '@/entities/user/model';

type userType = UserModal.User;

export interface UserPetsProps {
    userData: Nullable<Pick<userType, 'pets'>>;
    my?: boolean;
}
