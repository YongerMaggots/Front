import { useState } from 'react';
import { RegistrationForm, LoginForm } from '@/features/user/ui';
import { UserModal } from '@/entities/user/model';

interface IProps {
    isOpen: boolean;
    onClose: () => void;
}

export const AuthModal = ({ isOpen, onClose }: IProps) => {
    const [type, setType] = useState<UserModal.AuthFormType>('login');

    const handleChangeForm = (type: UserModal.AuthFormType) => {
        setType(type);
    };

    if (type === 'login') {
        return (
            <LoginForm
                onClose={onClose}
                isOpen={isOpen}
                changeForm={handleChangeForm}
            />
        );
    }

    return (
        <RegistrationForm
            onClose={onClose}
            isOpen={isOpen}
            changeForm={handleChangeForm}
        />
    );
};
