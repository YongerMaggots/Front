import {Button, Input, Typography, message} from 'antd';
import {Controller, useForm} from 'react-hook-form';
import styles from './AuthPage.module.scss';

interface IRegisterForm {
    name: string;
    surname: string;
    email: string;
    password: string;
    repeatPassword: string;
}

export const Register = () => {
    const [messageApi, contextHolder] = message.useMessage();
    const {
        handleSubmit,
        control,
        formState: {errors},
    } = useForm<IRegisterForm>();

    const submit = (data: IRegisterForm) => {
        if (data.password !== data.repeatPassword) {
            return messageApi.open({
                type: 'error',
                content: 'Пароли не совпадают',
            });
        }
        console.log(data);
    };

    return (
        <div className={styles.container}>
            {contextHolder}
            <form onSubmit={handleSubmit(submit)} className={styles.form}>
                <Typography.Title level={3}>Регистрация</Typography.Title>
                <Typography.Text>Имя</Typography.Text>
                <Controller name='name' control={control} defaultValue='' rules={{required: true}} render={({field}) => <Input {...field} type='text' status={errors.name ? 'error' : ''} />} />
                <div className={styles.inputContainer}>
                    <Typography.Text>Фамилия</Typography.Text>
                    <Controller name='surname' control={control} defaultValue='' rules={{required: true}} render={({field}) => <Input {...field} type='text' status={errors.surname ? 'error' : ''} />} />
                </div>
                <div className={styles.inputContainer}>
                    <Typography.Text>Почта</Typography.Text>
                    <Controller name='email' control={control} defaultValue='' rules={{required: true}} render={({field}) => <Input {...field} type='email' status={errors.email ? 'error' : ''} />} />
                </div>
                <div className={styles.inputContainer}>
                    <Typography.Text>Пароль</Typography.Text>
                    <Controller name='password' control={control} defaultValue='' rules={{required: true}} render={({field}) => <Input {...field} type='password' status={errors.password ? 'error' : ''} />} />
                </div>
                <div className={styles.inputContainer}>
                    <Typography.Text>Повторите пароль</Typography.Text>
                    <Controller name='repeatPassword' control={control} defaultValue='' rules={{required: true}} render={({field}) => <Input {...field} type='password' status={errors.repeatPassword ? 'error' : ''} />} />
                </div>
                <Button htmlType='submit' className={styles.button} type='primary'>
                    Зарегистрироваться
                </Button>
            </form>
            <Typography.Text>
                Есть аккаунт? <Typography.Link href='/login'>Войти</Typography.Link>
            </Typography.Text>
        </div>
    );
};
