import { UserModel } from '@/entities/user/model';

export interface IProps {
    isOpen: boolean;
    onClose: () => void;
    changeForm: (type: UserModel.AuthFormType) => void;
}

export interface IRegisterForm {
    name: string;
    surname: string;
    email: string;
    password: string;
    repeatPassword: string;
}
