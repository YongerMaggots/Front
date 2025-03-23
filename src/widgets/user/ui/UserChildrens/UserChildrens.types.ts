import { UserModel } from '@/entities/user/model';

export interface UserProps {
    userId: UserModel.User['id'];
    my?: boolean;
}
