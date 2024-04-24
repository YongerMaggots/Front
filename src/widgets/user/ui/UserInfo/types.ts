import { UserModal } from '@/entities/user/model';

type userType = UserModal.User;

export interface UserInfoProps {
    userData: Nullable<
        Pick<userType, 'id' | 'email' | 'name' | 'surname' | 'photo' | 'role'>
    >;
    my?: boolean;
}
