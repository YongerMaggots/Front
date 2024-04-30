import { Button, Input, Modal, Typography } from 'antd';
import { Controller, useForm } from 'react-hook-form';
import styles from './LoginForm.module.scss';
import { ILoginForm, IProps } from './types';
import { useState } from 'react';
import { useProfileStore } from '@/entities/user/model';
import { handlerError } from '@/shared/lib/handle-error';
import { useNavigate } from 'react-router-dom';

const { Text, Title, Link } = Typography;
const { Password } = Input;

export const LoginForm = ({ isOpen, onClose, changeForm }: IProps) => {
    const { auth, authMe } = useProfileStore();

    const [passwordVisible, setPasswordVisible] = useState(false);

    const navigate = useNavigate();

    const {
        handleSubmit,
        control,
        formState: { errors },
    } = useForm<ILoginForm>();

    const submit = async (data: ILoginForm) => {
        try {
            await auth(data);
            await authMe();
            onClose();
            navigate('/profile/my');
        } catch (error) {
            handlerError(error);
        }
    };

    return (
        <Modal footer={false} open={isOpen} onCancel={onClose}>
            <div className={styles.container}>
                <form onSubmit={handleSubmit(submit)} className={styles.form}>
                    <Title level={3}>Вход</Title>
                    <Text>Почта</Text>
                    <Controller
                        name="email"
                        control={control}
                        defaultValue=""
                        rules={{ required: true }}
                        render={({ field }) => (
                            <Input
                                {...field}
                                type="text"
                                placeholder="example@gmail.ru"
                                status={errors.email ? 'error' : ''}
                            />
                        )}
                    />
                    <div className={styles.inputContainer}>
                        <Text>Пароль</Text>
                        <Controller
                            name="password"
                            control={control}
                            defaultValue=""
                            rules={{ required: true }}
                            render={({ field }) => (
                                <Password
                                    {...field}
                                    visibilityToggle={{
                                        visible: passwordVisible,
                                        onVisibleChange: setPasswordVisible,
                                    }}
                                    type="password"
                                    placeholder="Пароль"
                                    status={errors.email ? 'error' : ''}
                                />
                            )}
                        />
                    </div>
                    <Button htmlType="submit" className={styles.button} type="primary">
                        Войти
                    </Button>
                </form>
                <Text>
                    Нет аккаунта?{' '}
                    <Link onClick={() => changeForm('register')}>Зарегистрироваться</Link>
                </Text>
            </div>
        </Modal>
    );
};
