import {Button, Input, Typography} from 'antd';
import {Controller, useForm} from 'react-hook-form';
import styles from './AuthPage.module.scss';

interface ILoginForm {
    email: string;
    password: string;
}

export const Login = () => {
    const {
        handleSubmit,
        control,
        formState: {errors},
    } = useForm<ILoginForm>();

    const submit = (data: ILoginForm) => {
        console.log(data);
    };

    return (
        <div className={styles.container}>
            <form onSubmit={handleSubmit(submit)} className={styles.form}>
                <Typography.Title level={3}>Вход</Typography.Title>
                <Typography.Text>Почта</Typography.Text>
                <Controller name='email' control={control} defaultValue='' rules={{required: true}} render={({field}) => <Input {...field} type='text' placeholder='example@gmail.ru' status={errors.email ? 'error' : ''} />} />
                <div className={styles.inputContainer}>
                    <Typography.Text>Пароль</Typography.Text>
                    <Controller name='password' control={control} defaultValue='' rules={{required: true}} render={({field}) => <Input {...field} type='password' placeholder='Пароль' status={errors.email ? 'error' : ''} />} />
                </div>
                <Button htmlType='submit' className={styles.button} type='primary'>
                    Войти
                </Button>
            </form>
            <Typography.Text>
                Нет аккаунта? <Typography.Link href='/register'>Зарегистрироваться</Typography.Link>
            </Typography.Text>
        </div>
    );
};
