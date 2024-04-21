import {UserModal} from '@/entities/user/model';

export interface IProps {
    isOpen: boolean;
    onClose: () => void;
    changeForm: (type: UserModal.AuthFormType) => void;
}

export interface ILoginForm {
    email: string;
    password: string;
}
