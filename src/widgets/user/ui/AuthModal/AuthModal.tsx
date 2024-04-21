import {useState} from 'react';
import {RegistrationForm} from '@/features/user/ui/RegistrationForm/RegistrationForm';
import {LoginForm} from '@/features/user/ui/LoginForm/LoginForm';
import {UserModal} from '@/entities/user/model';

interface IProps {
    isOpen: boolean;
    onClose: () => void;
}

export const AuthModal = ({isOpen, onClose}: IProps) => {
    const [type, setType] = useState<UserModal.AuthFormType>('login');

    const handleChangeForm = (type: UserModal.AuthFormType) => {
        setType(type);
    };

    if (type === 'login') {
        return <LoginForm onClose={onClose} isOpen={isOpen} changeForm={handleChangeForm} />;
    }

    return <RegistrationForm onClose={onClose} isOpen={isOpen} changeForm={handleChangeForm} />;
};
