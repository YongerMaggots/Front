import { UserModel } from '@/entities/user/model';

export interface IProps {
    isOpen: boolean;
    onClose: () => void;
    changeForm: (type: UserModel.AuthFormType) => void;
}

export interface ILoginForm {
    email: string;
    password: string;
}
