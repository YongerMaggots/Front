import { Button, DatePicker, Input, Typography } from 'antd';
import { AppointmentFormProps, AppointmentFormType } from './AppointmentForm.types';
import styles from './AppointmentForm.module.scss';
import { Controller, useForm } from 'react-hook-form';
import { useProfileStore } from '@/entities/user/model';
import { PetCard } from '@/entities/pet/ui';
import { useNavigate } from 'react-router-dom';
import { AddNewPetButton } from '@/features/pet/ui';

const { Title } = Typography;
const { TextArea } = Input;
export const AppointmentForm = ({ edit = false }: AppointmentFormProps) => {
    const { myPets } = useProfileStore();
    console.log(edit);
    const {
        handleSubmit,
        control,
        formState: { errors },
    } = useForm<AppointmentFormType>();
    const navigate = useNavigate();

    const submit = (data: AppointmentFormType) => {
        console.log(data);
    };

    if (!myPets) {
        navigate('/404');
        return <></>;
    }

    return (
        <section>
            <Title level={1}>Запись на прием</Title>
            <form onSubmit={handleSubmit(submit)} className={styles.form}>
                <Title level={4} className={styles.formTitle}>
                    Выберите питомца:
                </Title>
                <Controller
                    name="petId"
                    control={control}
                    rules={{ required: true }}
                    defaultValue={myPets[0].id}
                    render={({ field }) => (
                        <div className={styles.petSelect}>
                            {myPets.map((pet) => (
                                <PetCard
                                    {...field}
                                    key={pet.id}
                                    pet={pet}
                                    selected={field.value === pet.id}
                                    onSelect={(id) => field.onChange(id)}
                                />
                            ))}
                            <AddNewPetButton />
                        </div>
                    )}
                />
                <Title level={4} className={styles.formTitle}>
                    Выберите врача:
                </Title>
                <Title level={4} className={styles.formTitle}>
                    Опишите проблему:
                </Title>
                <Controller
                    name="description"
                    control={control}
                    rules={{ required: true }}
                    render={({ field }) => (
                        <TextArea
                            {...field}
                            style={{ resize: 'none' }}
                            status={errors.description ? 'error' : ''}
                            rows={4}
                        />
                    )}
                />
                <Title level={4} className={styles.formTitle}>
                    Выберите дату и время:
                </Title>
                <Controller
                    name="date"
                    control={control}
                    rules={{ required: true }}
                    render={({ field }) => (
                        <DatePicker
                            onChange={(_date, dateString) => {
                                field.onChange(dateString);
                            }}
                            status={errors.date ? 'error' : ''}
                            placeholder="Выберите дату"
                        />
                    )}
                />
                <div className={styles.actions}>
                    <Button type="primary" htmlType="submit" className={styles.button}>
                        Записаться
                    </Button>
                </div>
            </form>
        </section>
    );
};
