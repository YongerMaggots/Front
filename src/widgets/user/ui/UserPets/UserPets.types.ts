import { UserModel } from '@/entities/user/model';

export interface UserPetsProps {
    userId: UserModel.User['id'];
    my?: boolean;
}
