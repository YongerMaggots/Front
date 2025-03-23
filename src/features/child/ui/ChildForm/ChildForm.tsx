import { Button, Input, Select, Typography } from 'antd';
import { Controller, useForm } from 'react-hook-form';
import { ChildFormType } from './ChildForm.types';
import { ChildModel, useChildStore } from '@/entities/child/model';
import { useNavigate } from 'react-router-dom';
import { handlerError } from '@/shared/lib/handle-error';
import styles from './ChildForm.module.scss';

const { Title } = Typography;

export const ChildForm = () => {
    const { addNewChild } = useChildStore();
    const navigate = useNavigate();
    const {
        formState: { errors },
        handleSubmit,
        control,
    } = useForm<ChildFormType>();

    const submit = async (data: ChildFormType) => {
        try {
            await addNewChild(data);
            navigate('/profile/my');
        } catch (error) {
            handlerError(error);
        }
    };

    return (
        <section className={styles.section}>
            <Title level={1} className={styles.title}>
                Добавить нового ребенка
            </Title>
            <form onSubmit={handleSubmit(submit)} className={styles.form}>
                <Title level={4} className={styles.formTitle}>
                    Имя
                </Title>
                <Controller
                    name="name"
                    control={control}
                    rules={{ required: true }}
                    render={({ field }) => (
                        <Input
                            {...field}
                            style={{ resize: 'none' }}
                            status={errors.name ? 'error' : ''}
                        />
                    )}
                />
                <Title level={4} className={styles.formTitle}>
                    Фамилия
                </Title>
                <Controller
                    name="surname"
                    control={control}
                    rules={{ required: true }}
                    render={({ field }) => (
                        <Input {...field} status={errors.surname ? 'error' : ''} />
                    )}
                />
                <Title level={4} className={styles.formTitle}>
                    Пол
                </Title>
                <Controller
                    name="gender"
                    control={control}
                    rules={{ required: true }}
                    render={({ field }) => (
                        <Select
                            placeholder="Выберите пол ребенка"
                            {...field}
                            status={errors.gender ? 'error' : ''}
                            options={[
                                { value: ChildModel.GenderEnum.Male, label: 'Мужской' },
                                { value: ChildModel.GenderEnum.Female, label: 'Женский' },
                            ]}
                        />
                    )}
                />
                <Title level={4} className={styles.formTitle}>
                    Возраст
                </Title>
                <Controller
                    name="age"
                    control={control}
                    rules={{ required: true }}
                    render={({ field }) => (
                        <Input
                            {...field}
                            type="number"
                            status={errors.age ? 'error' : ''}
                            onChange={(e) => field.onChange(Number(e.target.value))}
                            min={0}
                            max={18}
                        />
                    )}
                />

                <div className={styles.actions}>
                    <Button type="primary" htmlType="submit">
                        Добавить
                    </Button>
                </div>
            </form>
        </section>
    );
};
