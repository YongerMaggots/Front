import { useState } from 'react';
import { RegistrationForm, LoginForm } from '@/features/user/ui';
import { UserModel } from '@/entities/user/model';

interface IProps {
    isOpen: boolean;
    onClose: () => void;
}

export const AuthModal = ({ isOpen, onClose }: IProps) => {
    const [type, setType] = useState<UserModel.AuthFormType>('login');

    const handleChangeForm = (type: UserModel.AuthFormType) => {
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
