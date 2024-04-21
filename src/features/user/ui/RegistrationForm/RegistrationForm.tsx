import {IProps, IRegisterForm} from './types';
import {Controller, useForm} from 'react-hook-form';
import {App, Button, Input, Modal, Typography} from 'antd';
import styles from './RegistrationForm.module.scss';

const {Text, Title, Link} = Typography;

export const RegistrationForm = ({isOpen, onClose, changeForm}: IProps) => {
    const {message} = App.useApp();
    const {
        handleSubmit,
        control,
        formState: {errors},
    } = useForm<IRegisterForm>();

    const submit = (data: IRegisterForm) => {
        if (data.password !== data.repeatPassword) {
            message.error('Пароли не совпадают');
            return;
        }
        console.log(data);
    };

    return (
        <Modal footer={false} open={isOpen} onCancel={onClose}>
            <div className={styles.container}>
                <form onSubmit={handleSubmit(submit)} className={styles.form}>
                    <Title level={3}>Регистрация</Title>
                    <Text>Имя</Text>
                    <Controller name='name' control={control} defaultValue='' rules={{required: true}} render={({field}) => <Input {...field} type='text' status={errors.name ? 'error' : ''} />} />
                    <div className={styles.inputContainer}>
                        <Text>Фамилия</Text>
                        <Controller name='surname' control={control} defaultValue='' rules={{required: true}} render={({field}) => <Input {...field} type='text' status={errors.surname ? 'error' : ''} />} />
                    </div>
                    <div className={styles.inputContainer}>
                        <Text>Почта</Text>
                        <Controller name='email' control={control} defaultValue='' rules={{required: true}} render={({field}) => <Input {...field} type='email' status={errors.email ? 'error' : ''} />} />
                    </div>
                    <div className={styles.inputContainer}>
                        <Text>Пароль</Text>
                        <Controller name='password' control={control} defaultValue='' rules={{required: true}} render={({field}) => <Input {...field} type='password' status={errors.password ? 'error' : ''} />} />
                    </div>
                    <div className={styles.inputContainer}>
                        <Text>Повторите пароль</Text>
                        <Controller name='repeatPassword' control={control} defaultValue='' rules={{required: true}} render={({field}) => <Input {...field} type='password' status={errors.repeatPassword ? 'error' : ''} />} />
                    </div>
                    <Button htmlType='submit' className={styles.button} type='primary'>
                        Зарегистрироваться
                    </Button>
                </form>
                <Text>
                    Есть аккаунт? <Link onClick={() => changeForm('login')}>Войти</Link>
                </Text>
            </div>
        </Modal>
    );
};
