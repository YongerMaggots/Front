import {Button, Input, Modal, Typography} from 'antd';
import {Controller, useForm} from 'react-hook-form';
import styles from './LoginForm.module.scss';
import {ILoginForm, IProps} from './types';

const {Text, Title, Link} = Typography;

export const LoginForm = ({isOpen, onClose, changeForm}: IProps) => {
    const {
        handleSubmit,
        control,
        formState: {errors},
    } = useForm<ILoginForm>();

    const submit = (data: ILoginForm) => {
        console.log(data);
    };

    return (
        <Modal footer={false} open={isOpen} onCancel={onClose}>
            <div className={styles.container}>
                <form onSubmit={handleSubmit(submit)} className={styles.form}>
                    <Title level={3}>Вход</Title>
                    <Text>Почта</Text>
                    <Controller name='email' control={control} defaultValue='' rules={{required: true}} render={({field}) => <Input {...field} type='text' placeholder='example@gmail.ru' status={errors.email ? 'error' : ''} />} />
                    <div className={styles.inputContainer}>
                        <Text>Пароль</Text>
                        <Controller name='password' control={control} defaultValue='' rules={{required: true}} render={({field}) => <Input {...field} type='password' placeholder='Пароль' status={errors.email ? 'error' : ''} />} />
                    </div>
                    <Button htmlType='submit' className={styles.button} type='primary'>
                        Войти
                    </Button>
                </form>
                <Text>
                    Нет аккаунта? <Link onClick={() => changeForm('register')}>Зарегистрироваться</Link>
                </Text>
            </div>
        </Modal>
    );
};