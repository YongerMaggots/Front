import {UserModal} from '@/entities/user/model';

type userType = UserModal.User;

export type IProps = Pick<userType, 'id' | 'email' | 'name' | 'surname' | 'photo' | 'role'>;
