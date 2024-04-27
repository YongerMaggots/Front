import { Controller, useForm } from 'react-hook-form';
import { IEditProfileForm } from './EditProfileForm.types';
import { Button, Input, Typography } from 'antd';
import { useProfileStore } from '@/entities/user/model';
import styles from './EditProfileForm.module.scss';

const { Title } = Typography;

export const EditProfileForm = () => {
    const {
        handleSubmit,
        control,
        reset,
        formState: { errors },
    } = useForm<IEditProfileForm>();
    const { myProfile } = useProfileStore();
    const submit = (data: IEditProfileForm) => {
        console.log(data);
    };

    return (
        <form onSubmit={handleSubmit(submit)} className={styles.form}>
            <Title level={4} className={styles.formTitle}>
                Имя
            </Title>
            <Controller
                name="name"
                control={control}
                defaultValue={myProfile?.name}
                rules={{ required: true }}
                render={({ field }) => (
                    <Input {...field} type="text" status={errors.name ? 'error' : ''} />
                )}
            />
            <Title level={4} className={styles.formTitle}>
                Фамилия
            </Title>
            <Controller
                name="surname"
                control={control}
                defaultValue={myProfile?.surname}
                rules={{ required: false }}
                render={({ field }) => (
                    <Input {...field} type="text" status={errors.surname ? 'error' : ''} />
                )}
            />
            <Title level={4} className={styles.formTitle}>
                Почта
            </Title>
            <Controller
                name="email"
                control={control}
                defaultValue={myProfile?.email}
                rules={{ required: false }}
                render={({ field }) => (
                    <Input {...field} type="email" status={errors.email ? 'error' : ''} />
                )}
            />
            <Title level={4} className={styles.formTitle}>
                Номер телефона
            </Title>
            <Controller
                name="phone"
                control={control}
                defaultValue={myProfile?.phone}
                rules={{ required: false }}
                render={({ field }) => (
                    <Input {...field} type="number" status={errors.phone ? 'error' : ''} />
                )}
            />
            <div className={styles.actions}>
                <Button type="primary" htmlType="submit">
                    Сохранить
                </Button>
                <Button onClick={() => reset()}>Отменить</Button>
            </div>
        </form>
    );
};
