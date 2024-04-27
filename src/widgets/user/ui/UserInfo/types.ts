import { UserModel } from '@/entities/user/model';

type userType = UserModel.User;

export interface UserInfoProps {
    userData: Nullable<Pick<userType, 'id' | 'email' | 'name' | 'surname' | 'photo' | 'role'>>;
    my?: boolean;
    getUser?: () => Promise<void>;
}
